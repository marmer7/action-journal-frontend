import { EditorState, convertFromRaw } from "draft-js";
import { addTaskToEndOfEditor } from "../helpers/addTextToEditor";
import { saveContent } from "../helpers/fetches";

const defaultState = {
  editors: { byId: {}, allIds: [] },
  currentEditorId: null
};

const editorReducer = (state = defaultState, { payload, type }) => {
  switch (type) {
    case "ADD_EDITOR":
      var allIds = [...state.editors.allIds];
      var id = parseInt(payload.id, 10);
      if (!state.editors.allIds.includes(id)) {
        allIds = [...state.editors.allIds, id];
      }
      return {
        ...state,
        editors: { byId: returnById(state, payload), allIds }
      };
    case "ADD_TASK_TO_EDITOR":
      const editorState = addTaskToEndOfEditor(
        state.editors.byId[state.currentEditorId].editorState,
        payload
      );
      saveContent(editorState.getCurrentContent(), state.currentEditorId);
      return {
        ...state,
        editors: {
          byId: {
            ...state.editors.byId,
            [state.currentEditorId]: {
              editorState,
              createdAt: state.editors.byId[state.currentEditorId].createdAt
            }
          },
          allIds: state.editors.allIds
        }
      };
    case "UPDATE_EDITOR_STATE":
      const byId = {
        ...state.editors.byId,
        [payload.id]: {
          editorState: payload.editorState,
          createdAt: state.editors.byId[payload.id].createdAt
        }
      };
      allIds = [...state.editors.allIds];
      return {
        ...state,
        editors: { byId, allIds }
      };
    case "SET_CURRENT_EDITOR":
      allIds = [...state.editors.allIds];
      id = parseInt(payload.id, 10);
      if (!state.editors.allIds.includes(id)) {
        allIds = [...state.editors.allIds, id];
      }
      return {
        ...state,
        editors: { ...state.editors, allIds },
        currentEditorId: id
      };
    default:
      return state;
  }
};

export default editorReducer;

function returnById(state, payload) {
  return {
    ...state.editors.byId,
    [payload.id]: {
      editorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(payload.raw_content_state))
      ),
      createdAt: payload.created_at,
      userId: payload.userId
    }
  };
}
