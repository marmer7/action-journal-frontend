import React from "react";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import { Item } from "semantic-ui-react";
// TODO: map through all tasks and render as task items

class TaskList extends React.Component {
  renderTasks = () => {
    const todayDate = new Date().toISOString().slice(0, 10);
    return this.props.tasks.allIds
      .filter(id => {
        const task = this.props.tasks.byId[id];
        debugger;
        return (
          task.status === false && task.createdAt.slice(0, 10) === todayDate
        );
      })
      .map(id => {
        const task = this.props.tasks.byId[id];
        return <TaskItem key={id} task={task} id={id} />;
      });
  };
  render() {
    return <Item.Group divided>{this.renderTasks()}</Item.Group>;
  }
}

const mapStateToProps = state => ({ tasks: state.taskReducer.tasks });

export default connect(mapStateToProps, null)(TaskList);
