import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentEditor } from "../actions/editor";

class JournalItem extends React.Component {
  openJournal = () => {
    this.props.setCurrentEditor(this.props.id);
  };
  render() {
    return (
      <Link
        to={`/journals/${this.props.id}`}
        onClick={this.openJournal}
        key={this.props.id}
      >
        <div className="journal-item">{this.props.date.slice(0, 10)}</div>
      </Link>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentEditor: id => {
    dispatch(setCurrentEditor(id));
  }
});

export default connect(null, mapDispatchToProps)(JournalItem);
