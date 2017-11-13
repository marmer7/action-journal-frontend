import React from "react";
import { connect } from "react-redux";
import { Editor, RichUtils, convertToRaw } from "draft-js";
import debounce from "lodash/debounce";
import { updateEditor } from "../actions/editor"; // actions
import BlockStyleControls from "./BlockStyleControls";
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

class JournalItem extends React.Component {
  saveContent = debounce(content => {
    fetch(
      `http://localhost:3000/api/v1/editors/${this.props.match.params.id}`,
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
    ).then(res => res.json());
  }, 1000);

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.props.onSaveEditorState(
      editorState,
      parseInt(this.props.match.params.id)
    );
  };

  toggleBlockType = blockType => {
    this.onChange(
      RichUtils.toggleBlockType(this.props.editor.editorState, blockType)
    );
  };

  handleKeyCommand = command => {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(
      this.props.editor.editorState,
      command
    );
    if (newState) {
      this.props.onSaveEditorState(
        newState,
        parseInt(this.props.match.params.id)
      );
      return "handled";
    }
    return "not-handled";
  };

  focus = () => this.refs.editor.focus();

  render() {
    return (
      <div id="edit-container">
        <Container className="editor-root">
          <h1>{new Date(this.props.editor.createdAt).toDateString()}</h1>
          <BlockStyleControls
            editorState={this.props.editor.editorState}
            onToggle={this.toggleBlockType}
          />
          <div className="editor" onClick={this.focus}>
            <Editor
              customStyleMap={styleMap}
              editorState={this.props.editor.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              placeholder="Today, I..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  editor: state.editorReducer.editors.byId[props.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  onSaveEditorState: (editorState, id) => {
    dispatch(updateEditor(editorState, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalItem);
