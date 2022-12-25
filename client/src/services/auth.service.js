import api from './configAxios'
const authService = {
    login: async ({ username, password }) => {
        return await api.post('user/login', { username, password })
    }
}
export default authService