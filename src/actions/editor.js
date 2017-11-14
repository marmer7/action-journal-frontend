import { convertToRaw } from "draft-js";

export function updateEditor(editorState, id) {
  return {
    type: "UPDATE_EDITOR_STATE",
    payload: { editorState, id }
  };
}

export function addEditor(editorData) {
  return {
    type: "ADD_EDITOR",
    payload: editorData
  };
}

export function setCurrentEditor(id) {
  return {
    type: "SET_CURRENT_EDITOR",
    payload: { id }
  };
}

export function fetchEditor(id) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/editors/${id}`)
      .then(res => res.json())
      .then(editorData => dispatch(addEditor(editorData)))
      .then(() => dispatch(setCurrentEditor(id)));
  };
}

export function createEditor(contentState) {
  return dispatch => {
    // Abstract away
    fetch("http://localhost:3000/api/v1/editors", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ content: convertToRaw(contentState) })
    })
      .then(res => res.json())
      .then(editorData => dispatch(addEditor(editorData)));
  };
}
