import axios from 'axios';

export const authToken = (token: string | null) => {
  if (token) {
    return (axios.defaults.headers.common['auth-token'] = token);
  } else {
    delete axios.defaults.headers.common['auth-token'];
  }
};
