import React from "react";
import { connect } from "react-redux";
import { Editor, RichUtils, convertToRaw } from "draft-js";
import debounce from "lodash/debounce";
import { updateEditor } from "../actions/editor"; // actions

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
    console.log(this.props.match.params.id);
    this.props.onSaveEditorState(
      editorState,
      parseInt(this.props.match.params.id)
    );
  };

  render() {
    console.log(this.props);
    return (
      <Editor
        editorState={this.props.editor.editorState}
        onChange={this.onChange}
      />
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
