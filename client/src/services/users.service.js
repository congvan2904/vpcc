import api from './configAxios'
const usersService = {
    users: async () => {
        return (await api.get('user/getlists')).data
    },
    create_user: async (payload) => {
        return (await api.post('user/create', payload)).data
    },
    update_user: async ({ name, status }) => {
        return (await api.patch('user/find', { name, status })).data
    },
    delete_user: async (payload) => {
        return (await api.post('user/create-user', payload)).data
    },
}

export default usersService