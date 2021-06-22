import axios from 'axios';

const ApiService = {
  init(baseURL: string): any {
    axios.defaults.baseURL = baseURL;
  },

  get(resource: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(resource)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  },

  post(resource: string, data: any, headers?: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(resource, data, { headers })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          if (error && error.response && error.response.data) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
  },

  put(resource: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .put(resource, data)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error.response.data.message);
        });
    });
  },

  delete(resource: string) {
    return new Promise((resolve, reject) => {
      axios
        .delete(resource)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error.response.data.message);
        });
    });
  },
};

export default ApiService;
