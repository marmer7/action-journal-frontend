import React from "react";
import { connect } from "react-redux";
import { createTask } from "../actions/task";

import { Input } from "semantic-ui-react";

class NewTaskForm extends React.Component {
  state = {
    content: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const content = { content: this.state.content };
    this.props.onTaskSubmit(content);
    this.setState({ content: "" });
  };

  render() {
    return (
      <div className="new-task-form">
        <form onSubmit={this.onSubmit}>
          <Input
            fluid
            action={{
              color: "teal",
              labelPosition: "right",
              icon: "pencil square",
              content: "Add"
            }}
            type="text"
            placeholder="Today, I want to..."
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
