import React from "react";
import { connect } from "react-redux";
// import { OrderedSet } from "immutable";
import debounce from "lodash/debounce";
import { Editor, RichUtils, convertToRaw } from "draft-js";
import SideToolbar from "./SideToolbar";
// actions
import { updateEditor } from "../actions/editor";
import {
  getSelectionRange,
  getSelectedBlockElement
} from "../helpers/selection";
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
  state = {};
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

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.props.onSaveEditorState(editorState, this.props.currentEditorId);
    setTimeout(this.updateSelection, 0);
  };

  currentEditor = () => {
    return this.props.editors.byId[this.props.currentEditorId].editorState;
  };

  focus = () => this.refs.editor.focus();

  updateSelection = () => {
    const selectionRange = getSelectionRange();
    let selectedBlock;
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange);
    }
    this.setState({ selectedBlock, selectionRange });
  };

  handleKeyCommand = command => {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(this.currentEditor(), command);
    if (newState) {
      this.props.onSaveEditorState(newState, this.props.currentEditorId);
      return "handled";
    }
    return "not-handled";
  };

  toggleBlockType = blockType => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editors.byId[this.props.currentEditorId].editorState,
        blockType
      )
    );
  };

  blockStyler = block => {
    if (block.getType() === "unstyled") {
      return "paragraph";
    }
    return null;
  };

  render() {
    const { selectedBlock, selectionRange } = this.state;
    let sideToolbarOffsetTop = 0;
    if (selectedBlock) {
      const editor = document.getElementById("richEditor");
      const editorBounds = editor.getBoundingClientRect();
      const blockBounds = selectedBlock.getBoundingClientRect();

      sideToolbarOffsetTop = blockBounds.bottom - editorBounds.top - 31;
    }
    return (
      <Container className="editor" id="richEditor" onClick={this.focus}>
        {selectedBlock ? (
          <SideToolbar
            editorState={
              this.props.editors.byId[this.props.currentEditorId].editorState
            }
            style={{ top: sideToolbarOffsetTop }}
            onToggle={this.toggleBlockType}
          />
        ) : null}
        {this.props.editors.byId[this.props.currentEditorId] ? (
          <Editor
            customStyleMap={styleMap}
            editorState={
              this.props.editors.byId[this.props.currentEditorId].editorState
            }
            blockStyleFn={this.blockStyler}
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
