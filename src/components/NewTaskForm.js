import React from "react";
import { connect } from "react-redux";
import { createTask } from "../actions/task";

import { Input } from "semantic-ui-react";

class NewTaskForm extends React.Component {
  state = {
    content: "",
    invalidEntry: false
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.invalidEntry) {
      this.setState({ invalidEntry: false });
    }
  };
  onSubmit = event => {
    event.preventDefault();
    if (this.state.content.trim()) {
      const content = { content: this.state.content };
      this.props.onTaskSubmit(content);
      this.setState({ content: "" });
    } else {
      this.setState({ content: "", invalidEntry: true });
    }
  };

  render() {
    return (
      <div className="new-task-form">
        <form onSubmit={this.onSubmit}>
          <Input
            fluid
            error={this.state.invalidEntry}
            action="+"
            type="text"
            placeholder={
              !this.state.invalidEntry ? "Today, I want to..." : "Invalid Entry"
            }
            value={this.state.content}
            onChange={this.onChange}
            name="content"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onTaskSubmit: content => {
    dispatch(createTask(content));
  }
});

export default connect(null, mapDispatchToProps)(NewTaskForm);
