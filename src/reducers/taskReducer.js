const defaultState = {
  tasks: { byId: {}, allIds: [] }
};

const taskReducer = (state = defaultState, { payload, type }) => {
  switch (type) {
    case "IMPORT_TASK":
      console.log("redux action: ", type, payload);
      var byId = {
        ...state.tasks.byId,
        [payload.id]: {
          userId: payload.user_id,
          content: payload.content,
          status: payload.status,
          createdAt: payload.created_at
        }
      };
    case "ADD_TASK":
      console.log("redux action: ", type, payload);
      byId = {
        ...state.tasks.byId,
        [payload.id]: { content: payload.content, status: false }
      };
      const allIds = [...state.tasks.allIds, payload.id];
      return {
        ...state,
        tasks: { byId, allIds }
      };
    case "COMPLETE_TASK":
      console.log("redux action: ", type, payload);

      return state;
    default:
      return state;
  }
};

export default taskReducer;
