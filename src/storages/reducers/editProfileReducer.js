const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const editProfile = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'EDIT_PROFILE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'EDIT_PROFILE_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'EDIT_PROFILE_ERROR':
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

export default editProfile;
