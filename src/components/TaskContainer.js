import React from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import { Container } from "semantic-ui-react";

const TaskContainer = props => {
  return (
    <Container className="task-container">
      <NewTaskForm />
      <TaskList />
    </Container>
  );
};

export default TaskContainer;
