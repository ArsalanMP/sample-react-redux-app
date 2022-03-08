import Axios from 'axios';

Axios.interceptors.request.use(
  function (config) {
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
