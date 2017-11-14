import React from "react";
import { connect } from "react-redux";
import { List, Button, Icon } from "semantic-ui-react";
import { completeTask, deleteTask } from "../actions/task";

class TaskItem extends React.Component {
  completeTask = () => {
    const task = { content: this.props.task.content, id: this.props.id };
    this.props.completeTask(task);
  };

  deleteTask = () => {
    const task = { content: this.props.task.content, id: this.props.id };
    this.props.deleteTask(task);
  };

  render() {
    return (
      <List.Item>
        <List.Content floated="right">
          <Button icon onClick={this.deleteTask}>
            <Icon name="remove" />
          </Button>
          <Button icon onClick={this.completeTask}>
            <Icon name="checkmark" />
          </Button>
        </List.Content>
        <List.Content>{this.props.task.content}</List.Content>
      </List.Item>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  completeTask: task => {
    dispatch(completeTask(task));
  },
  deleteTask: task => {
    dispatch(deleteTask(task));
  }
});

export default connect(null, mapDispatchToProps)(TaskItem);
