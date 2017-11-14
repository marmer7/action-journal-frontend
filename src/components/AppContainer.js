import React from "react";
import { connect } from "react-redux";
import AppEditor from "./AppEditor";
import TaskContainer from "./TaskContainer";
import { EditorState } from "draft-js";
import { createEditor, addEditor, setCurrentEditor } from "../actions/editor";

class AppContainer extends React.Component {
  componentDidMount() {
    const todayDate = new Date().toISOString().slice(0, 10);
    // add to reducer use thunk
    // put this in separate files
    /// if you're going to use redux within reason use it every where

    fetch("http://localhost:3000/api/v1/show_last_editor")
      .then(res => res.json())
      .then(editorData => {
        if (
          editorData.created_at === "no journals found" ||
          editorData.created_at.slice(0, 10) !== todayDate
        ) {
          console.log("creating new editor");
          const contentState = EditorState.createEmpty().getCurrentContent();
          // console.log(convertToRaw(contentState));
          this.props.createEditor(contentState);
        } else {
          console.log("setting editor");
          this.props.addEditor(editorData);
          this.props.setCurrentEditor(editorData.id);
        }
      });
  }

  render() {
    return (
      <div className="app-container">
        <TaskContainer />
        <AppEditor />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentEditorId: state.editorReducer.currentEditorId
});

// use bind action creators
const mapDispatchToProps = dispatch => ({
  setCurrentEditor: id => {
    /// where is the action creator
    dispatch(setCurrentEditor(id));
  },
  createEditor: editorState => {
    dispatch(createEditor(editorState));
  },
  addEditor: editorData => {
    dispatch(addEditor(editorData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
