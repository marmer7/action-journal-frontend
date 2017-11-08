import { EditorState, convertFromRaw } from "draft-js";
import { addTaskToEndOfEditor } from "../helpers/addTextToEditor";

const defaultState = {
  editorState: EditorState.createEmpty(),
  editors: { byId: {}, allIds: [] },
  currentEditorId: null
};

const editorReducer = (state = defaultState, { payload, type }) => {
  switch (type) {
    case "ADD_EDITOR":
      var allIds = [...state.editors.allIds, payload.id];
      return {
        ...state,
        editors: { byId: returnById(state, payload), allIds },
        currentEditorId: payload.id
      };
    case "ADD_TASK_TO_EDITOR":
      console.log(type);
      const editorState = addTaskToEndOfEditor(
        state.editors.byId[state.currentEditorId].editorState,
        payload
      );
      return {
        ...state,
        editors: { byId: { [state.currentEditorId]: { editorState } } }
      };
    case "UPDATE_EDITOR_STATE":
      const byId = {
        ...state.editors.byId,
        [payload.id]: { editorState: payload.editorState }
      };
      return {
        ...state,
        editors: { byId }
      };
    case "SET_CURRENT_EDITOR":
      allIds = [...state.editors.allIds, payload.id];
      return {
        ...state,
        editors: { byId: returnById(state, payload), allIds },
        currentEditorId: payload.id
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
