const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const getMyReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_MY_RECIPE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'GET_MY_RECIPE_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'GET_MY_RECIPE_ERROR':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case 'DELETE_STORE_TOKEN':
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};

export default getMyReducer;
