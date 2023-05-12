import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/v1',
    timeout: 3 * 1000,
    headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data',
    }
})
const getrefreshToken = async (refToken) => {
    try {
        return await instance.post('user/refresh-token', { refreshToken: refToken })
    } catch (error) {
        console.log(error)
    }
}
instance.interceptors.request.use(async (config) => {
    // Do something before request is sent
    if (config.url.indexOf('user/login') >= 0 || config.url.indexOf('user/refresh-token') >= 0) {
        return config
    }
    if (config.url.indexOf('user/create') >= 0 || config.url.indexOf('user/update') >= 0) {
        config.headers["Content-Type"] = "multipart/form-data";
        // return config
    }
    const accessToken = await instance.getLocalAccessToken()
    config.headers['authorization'] = `Bearer ${accessToken}`

    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});
instance.interceptors.response.use(async (response) => {
    // Do something before response is sent
    // console.log('response', response.data)
    const config = response.config
    if (config.url.indexOf('user/login') >= 0 || config.url.indexOf('user/refresh-token') >= 0) {
        // console.log('0 can check')
        return response
    }
    // console.log('truoc mess--')
    const { message } = await response.data
    if (message && message === "jwt expired") {
        const refreshToken1 = await instance.getLocalRefreshToken()
        // console.log(refreshToken)
        const { accessToken, refreshToken } = (await getrefreshToken(refreshToken1)).data
        console.log('newToken.accessToken', accessToken)
        if (!refreshToken) {
            throw new Error('jwt expired')
        }

        if (accessToken) {
            console.log('da lay accesstoken thanh cong')
            config.headers['authorization'] = `Bearer ${accessToken}`
            await instance.setLocalToken(accessToken, refreshToken)

            return instance(config)
        }
    }
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});
instance.setLocalToken = async (accessToken, refreshToken) => {
    window.localStorage.setItem('accessToken', JSON.stringify(accessToken))
    window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
}
instance.getLocalAccessToken = async () => {
    const accessToken = await window.localStorage.getItem('accessToken')
    return JSON.parse(accessToken)
}
instance.getLocalRefreshToken = async () => {
    const refreshToken = await window.localStorage.getItem('refreshToken')
    return JSON.parse(refreshToken)
}


export default instance