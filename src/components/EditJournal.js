import React from "react";
import AppEditor from "./AppEditor";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchEditor } from "../actions/editor";

class EditJournal extends React.Component {
  componentDidMount() {
    if (!this.props.currentEditorId) {
      this.props.fetchEditor(this.props.match.params.id);
    }
  }

  date = () => {
    if (this.props.currentEditorId) {
      return this.props.editors[this.props.currentEditorId].createdAt.slice(
        0,
        10
      );
    }
    return null;
  };
  render() {
    return (
      <div className="edit-journal">
        <AppEditor date={this.date()} print={true} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentEditorId: state.editorReducer.currentEditorId,
  editors: state.editorReducer.editors.byId
});

const mapDispatchToProps = dispatch => ({
  fetchEditor: id => dispatch(fetchEditor(id))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditJournal)
);
