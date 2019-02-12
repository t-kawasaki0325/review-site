// action type
const GET_USER = 'GET_USER';
const REGISTER_USER = 'REGISTER_USER';

const initialState = {
  userId: '',
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return state.userId;
    case REGISTER_USER:
      break;
    default:
      return state;
  }
};

// action creator
export const getUser = () => {
  return { type: GET_USER };
};

export default reducer;
