import axios from 'axios'

const httpClient = axios.create ({
    baseURL: ``,
    responseType: 'json',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
});

export default httpClient;