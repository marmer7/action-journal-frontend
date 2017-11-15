import React from "react";
import { connect } from "react-redux";
// import { OrderedSet } from "immutable";
import { Editor, RichUtils } from "draft-js";
import { updateEditor } from "../actions/editor"; // actions
import { uncompleteTask } from "../actions/task"; // actions
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import { Container } from "semantic-ui-react";
import { saveContent } from "../helpers/fetches";

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
  handleKeyCommand = command => {
    if (command === "backspace") {
      const editorState = this.currentEditorState();
      const selection = editorState.getSelection();

      const startKey = selection.getStartKey();
      const endOffset = selection.getEndOffset();
      const selectedBlock = editorState
        .getCurrentContent()
        .getBlockForKey(startKey);
      const prevEntityKey = selectedBlock.getEntityAt(endOffset - 1);
      if (prevEntityKey) {
        const id = editorState
          .getCurrentContent()
          .getEntity(prevEntityKey)
          .get("data").taskId;
        this.props.uncompleteTask(id);
      }
    }
    const newState = RichUtils.handleKeyCommand(
      this.currentEditorState(),
      command
    );
    if (newState) {
      this.onChange(newState, this.props.currentEditorId);
      return "handled";
    }
    return "not-handled";
  };

  // handleBeforeInput = chars => {
  //   console.log(chars);
  //   return "handled";
  // };

  toggleBlockType = blockType => {
    this.onChange(
      RichUtils.toggleBlockType(this.currentEditorState(), blockType)
    );
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.currentEditorState(), inlineStyle)
    );
  };

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    saveContent(contentState, this.props.currentEditorId);
    this.props.onSaveEditorState(editorState, this.props.currentEditorId);
  };

  currentEditorState = () => {
    try {
      return this.props.editors.byId[this.props.currentEditorId].editorState;
    } catch (err) {
      return false;
    }
  };

  focus = () => this.refs.editor.focus();
  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.currentEditorState(), maxDepth));
  };

  render() {
    return (
      <Container className="editor-root">
        {this.props.editors.byId[this.props.currentEditorId] ? (
          <div>
            {this.props.print ? (
              <div className="print-menu">
                <div>{this.props.date}</div>
                <a
                  onClick={function() {
                    window.print();
                  }}
                  className="print-button"
                >
                  Print
                </a>
              </div>
            ) : null}
            <BlockStyleControls
              editorState={this.currentEditorState()}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={this.currentEditorState()}
              onToggle={this.toggleInlineStyle}
            />
            <div className="editor" onClick={this.focus}>
              <Editor
                customStyleMap={styleMap}
                editorState={
                  this.props.editors.byId[this.props.currentEditorId]
                    .editorState
                }
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                placeholder="Today, I..."
                ref="editor"
                spellCheck={true}
              />
            </div>
          </div>
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
  },
  uncompleteTask: id => {
    dispatch(uncompleteTask({ id }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppEditor);
