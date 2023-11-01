const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const getCategoriesReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_CATEGORIES_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'GET_CATEGORIES_ERROR':
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

export default getCategoriesReducer;
