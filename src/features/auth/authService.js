import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

//const API_URL = '/proxy/'+encodeURIComponent('http://localhost:3001/api/users');
const buildProxyURL = (extra) => {
    let base = extra!=='' ? API_URL.concat(extra) : API_URL;
    let proxyUrl = '/proxy/' + encodeURIComponent(base);
    return proxyUrl;
}

const persistLocally = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}

//register user
const register = async(userData) => {
    const url = buildProxyURL('');
    const response = await axios.post(url, userData);
    if (response.data) {
        persistLocally(response.data);
    }
    return response.data;
};

//logout user
const logout = async() => {
    localStorage.removeItem('user');
};

//login user
const login = async(userData) => {
    const url = buildProxyURL('/login');
    const response = await axios.post(url, userData);
    if (response.data) {
        persistLocally(response.data);
    }
    return response.data;
};

const authService = {
    register,
    logout,
    login
};

export default authService;