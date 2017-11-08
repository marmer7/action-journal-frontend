import React from "react";
import { connect } from "react-redux";
// import { OrderedSet } from "immutable";
import debounce from "lodash/debounce";
import { Editor, RichUtils, convertToRaw } from "draft-js";

import { updateEditor } from "../actions/editor"; // actions
import { Container } from "semantic-ui-react";

const styleMap = (function() {
  return {
    immutable: {
      backgroundColor: "rgba(24,28,99,0.2)"
    },
    none: {
      backgroundColor: "#FFF"
    }
  };
})();

class AppEditor extends React.Component {
  saveContent = debounce(content => {
    fetch(
      `http://localhost:3000/api/v1/editors/${this.props.currentEditorId}`,
      {
        method: "POST",
        body: JSON.stringify({
          content: convertToRaw(content)
        }),
        headers: {
          Application: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(editorData => this.props.onSaveEditorState(editorData));
  }, 1000);

  handleKeyCommand = command => {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(this.currentEditor(), command);
    if (newState) {
      this.props.onSaveEditorState(newState, this.props.currentEditorId);
      return "handled";
    }
    return "not-handled";
  };

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.props.onSaveEditorState(editorState, this.props.currentEditorId);
  };

  currentEditor = () => {
    return this.props.editors.byId[this.props.currentEditorId].editorState;
  };

  focus = () => this.refs.editor.focus();

  render() {
    return (
      <Container className="editor-root" onClick={this.focus}>
        {this.props.editors.byId[this.props.currentEditorId] ? (
          <Editor
            customStyleMap={styleMap}
            editorState={
              this.props.editors.byId[this.props.currentEditorId].editorState
            }
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            ref="editor"
            placeholder="Today, I want to..."
          />
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  editorState: state.editorReducer.editorState,
  editors: state.editorReducer.editors,
  currentEditorId: state.editorReducer.currentEditorId
});

const mapDispatchToProps = dispatch => ({
  onSaveEditorState: (editorState, id) => {
    dispatch(updateEditor(editorState, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppEditor);
