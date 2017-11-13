import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Journals extends React.Component {
  renderJournals = () => {
    return this.props.editors.allIds.map(id => {
      return (
        <Link to={`/journals/${id}`}>
          <div className="journal-item">
            {this.props.editors.byId[id].createdAt.slice(0, 10)}{" "}
          </div>
        </Link>
      );
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/editors")
      .then(res => res.json())
      .then(editors => editors.forEach(editor => this.props.addEditor(editor)));
  }

  render() {
    return (
      <div className="journals-container">
        {this.renderJournals()}
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
        <div className="journal-item">DATE</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editors: state.editorReducer.editors
});

const mapDispatchToProps = dispatch => ({
  addEditor: editorData => {
    dispatch({ type: "ADD_EDITOR", payload: editorData });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Journals);
