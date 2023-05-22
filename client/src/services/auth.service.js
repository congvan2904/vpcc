import api from './configAxios'
const authService = {
    login: async ({ username, password }) => {
        return await api.post('user/login', { username, password })
    },
    logout: async () => {
        const token = await api.getLocalRefreshToken()
        return await api.delete(`user/logout/${token}`)
    },
}
export default authService