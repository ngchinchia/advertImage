// define action type
export const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX';


// action creators: function that returns an object
export const setActiveIndex = (index) => {
  return {
    type: SET_ACTIVE_INDEX,
    payload: index,
  };
};


