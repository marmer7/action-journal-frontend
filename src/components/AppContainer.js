import React from "react";
import { connect } from "react-redux";
import AppEditor from "./AppEditor";
import TaskContainer from "./TaskContainer";
import { EditorState } from "draft-js";
import { createEditor } from "../actions/editor";

class AppContainer extends React.Component {
  componentDidMount() {
    const todayDate = new Date().toISOString().slice(0, 10);
    fetch("http://localhost:3000/api/v1/tasks")
      .then(res => res.json())
      .then(tasks => {
        tasks.forEach(task => {
          this.props.importTask(task);
        });
      });

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
          this.props.setCurrentEditor(editorData);
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

const mapDispatchToProps = dispatch => ({
  setCurrentEditor: editorData => {
    dispatch({ type: "SET_CURRENT_EDITOR", payload: editorData });
  },
  createEditor: editorState => {
    dispatch(createEditor(editorState));
  },
  importTask: task => {
    dispatch({ type: "IMPORT_TASK", payload: task });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
