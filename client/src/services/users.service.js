import api from './configAxios'
const usersService = {
    users: async () => {
        return (await api.get('user/getlists')).data
    },
    get_user_login: async (payload) => {
        return (await api.post('user/get-user-login', payload)).data
    },
    create_user: async (payload) => {
        return (await api.post('user/create', payload)).data
    },
    update_user: async (payload) => {
        return (await api.patch('user/update', payload)).data
    },
    update_user1: async ({ name, status }) => {
        return (await api.patch('user/find', { name, status })).data
    },
    delete_user: async (payload) => {
        return (await api.post('user/create-user', payload)).data
    },
}

export default usersService