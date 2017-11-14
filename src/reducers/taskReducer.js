const defaultState = {
  tasks: { byId: {}, allIds: [] }
};

const taskReducer = (state = defaultState, { payload, type }) => {
  switch (type) {
    case "IMPORT_TASK":
      var byId = {
        ...state.tasks.byId,
        [payload.id]: {
          userId: payload.user_id,
          content: payload.content,
          status: payload.status,
          createdAt: payload.created_at
        }
      };
      return {
        ...state,
        tasks: { byId, allIds: normalizeAllIds(state, payload.id) }
      };
    case "ADD_TASK":
      console.log("redux action: ", type, payload);
      byId = {
        ...state.tasks.byId,
        [payload.id]: {
          content: payload.content,
          status: payload.status,
          createdAt: payload.created_at
        }
      };

      return {
        ...state,
        tasks: { byId, allIds: normalizeAllIds(state, payload.id) }
      };
    case "ADD_TASK_TO_EDITOR":
      console.log("redux action: ", type, payload);
      byId = {
        ...state.tasks.byId,
        [payload.id]: {
          content: payload.content,
          status: payload.status,
          createdAt: payload.created_at
        }
      };

      return {
        ...state,
        tasks: { byId, allIds: normalizeAllIds(state, payload.id) }
      };
    default:
      return state;
  }
};

function normalizeAllIds(state, id) {
  var allIds = [...state.tasks.allIds];
  if (!allIds.includes(id)) {
    allIds = [...allIds, id];
  }
  return allIds;
}

export default taskReducer;
