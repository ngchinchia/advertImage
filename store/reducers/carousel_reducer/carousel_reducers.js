import { SET_ACTIVE_INDEX } from "../../actions/carousel_actions/carousel_actions";

const initialState = {
  activeIndex: 0,
};

// reducer: function that accepts state and action as parameters & return next state

const activeIndexReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: action.payload,
      };

    default:
      return state;
  }
};

export default activeIndexReducer;
