import React from "react";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import { Item } from "semantic-ui-react";
// TODO: map through all tasks and render as task items

class TaskList extends React.Component {
  renderTasks = () => {
    const todayDate = new Date().toISOString().slice(0, 10);
    // const c = this.props.tasks.byId;
    return this.props.tasks.allIds.length > 0
      ? this.props.tasks.allIds
          .filter(id => {
            const task = this.props.tasks.byId[id];
            return (
              task.status === false
              // && task.createdAt.slice(0, 10) === todayDate
            );
          })
          .map(id => {
            const task = this.props.tasks.byId[id];
            return <TaskItem key={id} task={task} id={id} />;
          })
      : null;
  };
  render() {
    return <Item.Group divided>{this.renderTasks()}</Item.Group>;
  }
}

const mapStateToProps = state => ({ tasks: state.taskReducer.tasks });

export default connect(mapStateToProps, null)(TaskList);
