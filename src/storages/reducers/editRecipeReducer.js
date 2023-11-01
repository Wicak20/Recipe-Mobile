const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const editReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'EDIT_RECIPE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'EDIT_RECIPE_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'EDIT_RECIPE_ERROR':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default editReducer;
