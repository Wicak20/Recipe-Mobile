const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'USER_LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'USER_LOGIN_ERROR':
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

export default authReducer;
