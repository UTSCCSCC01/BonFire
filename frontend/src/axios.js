import axios from 'axios';

const client = axios.create({
    baseUrl: process.env.VUE_APP_BACKEND_URL
});

console.log(process.env.VUE_APP_BACKEND_URL)
client.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

export function register(params) {
    // debugger;
    return client.post('auth/register', params)
        .then(res => {
            login(params)
            return res;
        })
}

export function login(params) {
    // debugger;
    return client.post('auth/login', params)
        .then(res => {
            axios.defaults.headers['authorization'] = res.accessToken;
            return res;
        })
}

export function logout() {
    delete axios.defaults.headers['authorization'];
    // return client.post('auth/logout', params)
}

export default client;