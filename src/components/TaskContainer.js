import React from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

const TaskContainer = props => {
  return (
    <div className="task-container">
      <NewTaskForm />
      <TaskList />
    </div>
  );
};

export default TaskContainer;
