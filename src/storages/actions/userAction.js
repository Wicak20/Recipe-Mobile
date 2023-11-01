import axios from 'axios';
const url = `https://good-cap-newt.cyclic.cloud/users`;

export const editProfile = (token, data, id) => async dispatch => {
  try {
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    };
    dispatch({ type: 'EDIT_PROFILE_PENDING' });
    const result = await axios.put(url, data, config);
    const payload = result.data;
    dispatch({ type: 'EDIT_PROFILE_SUCCESS', payload });
  } catch (err) {
    dispatch({ type: 'EDIT_PROFILE_FAILED', payload: err.response.data.message });
    console.log('Edit Profile error');
    console.log('data = ', data);
    console.log(err);
  }
};
