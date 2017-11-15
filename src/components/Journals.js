import React from "react";
import { connect } from "react-redux";
import { addEditor } from "../actions/editor";
import JournalItem from "./JournalItem";

class Journals extends React.Component {
  renderJournals = () => {
    return this.props.editors.allIds
      .sort((idA, idB) => {
        if (
          this.props.editors.byId[idA].createdAt <
          this.props.editors.byId[idB].createdAt
        ) {
          return 1;
        } else if (
          this.props.editors.byId[idA].createdAt >
          this.props.editors.byId[idB].createdAt
        ) {
          return -1;
        }
        return 0;
      })
      .map(id => {
        return (
          <JournalItem
            id={id}
            key={id}
            date={this.props.editors.byId[id].createdAt}
          />
        );
      });
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/editors")
      .then(res => res.json())
      .then(editors => editors.forEach(editor => this.props.addEditor(editor)));
  }

  render() {
    return <div className="journals-container">{this.renderJournals()}</div>;
  }
}

const mapStateToProps = state => ({
  editors: state.editorReducer.editors
});

const mapDispatchToProps = dispatch => ({
  addEditor: editorData => {
    dispatch(addEditor(editorData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Journals);
