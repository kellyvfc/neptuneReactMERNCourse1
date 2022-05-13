import axios from 'axios';

const API_URL = 'http://localhost:3001/api/goals';

const buildProxyURL = (extra) => {
    let base = extra!=='' ? API_URL.concat(extra) : API_URL;
    let proxyUrl = '/proxy/' + encodeURIComponent(base);
    return proxyUrl;
}

const buildHeader = (token) => {
    return {
        headers: {
            "Authorization": "Bearer ".concat(token)
        }
    }
}

const getGoals = async (userData) => {
    let url = buildProxyURL('');
    let headers = buildHeader(userData.token);
    const response = await axios.get(url, headers);
    return response.data;
}

const addGoal = async (userData, goalData) => {
    let url = buildProxyURL('');
    let headers = buildHeader(userData.token);
    const response = await axios.post(url, goalData, headers);
    return response.data;
}

const removeGoal =  async (userData, goalData) => {
    let url = buildProxyURL('/'+goalData._id);
    let headers = buildHeader(userData.token);
    const response = await axios.delete(url, headers);
    return response.data;
}

const goalsService = {
    getGoals,
    addGoal,
    removeGoal
}

export default goalsService;