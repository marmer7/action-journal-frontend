export function addTask(content) {
  return {
    type: "ADD_TASK",
    payload: content
  };
}

export function createTask(content) {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/tasks/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(content)
    })
      .then(res => res.json())
      .then(task => dispatch(addTask(task)));
  };
}

export function completeTask(task) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(task =>
        dispatch({
          type: "ADD_TASK_TO_EDITOR",
          payload: task
        })
      );
  };
}

export function uncompleteTask(task) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(task =>
        dispatch({
          type: "IMPORT_TASK",
          payload: task
        })
      );
  };
}

export function deleteTask(task) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(task => dispatch(removeTask(task)));
  };
}

export function removeTask(task) {
  return { type: "REMOVE_TASK", payload: task };
}

export function importTask(task) {
  return { type: "IMPORT_TASK", payload: task };
}

export function fetchTasks() {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/tasks")
      .then(res => res.json())
      .then(tasks => {
        tasks.forEach(task => dispatch(importTask(task)));
      });
  };
}
