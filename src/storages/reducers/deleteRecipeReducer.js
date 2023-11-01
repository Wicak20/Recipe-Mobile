const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const deleteReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'DELETE_RECIPE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'DELETE_RECIPE_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'DELETE_RECIPE_ERROR':
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

export default deleteReducer;
