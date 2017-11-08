import React from "react";
import { connect } from "react-redux";
import { Item, Button } from "semantic-ui-react";
import { completeTask } from "../actions/task";

class TaskItem extends React.Component {
  completeTask = () => {
    const task = { content: this.props.task.content, id: this.props.id };
    this.props.completeTask(task);
  };
  render() {
    return (
      <Item>
        <Item.Content verticalAlign="bottom">
          <Item.Header>{this.props.task.content}</Item.Header>
          <Button floated="right" onClick={this.completeTask}>
            Complete
          </Button>
        </Item.Content>
      </Item>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  completeTask: task => {
    dispatch(completeTask(task));
  }
});

export default connect(null, mapDispatchToProps)(TaskItem);
