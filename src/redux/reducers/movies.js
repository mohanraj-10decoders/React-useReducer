const movieReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, ...action.payload];
      break;
    case 'DELETEALL':
      return [];
      break;
    default:
      return state;
      break;
  }
};

export default movieReducer;
