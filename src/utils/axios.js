import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/galletas-back/',
    // baseURL: 'https://galletasqro.com/galletas-back/',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance;