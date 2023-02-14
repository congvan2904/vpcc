import api from './configAxios'
const contractsService = {
    contracts: async () => {
        return (await api.get('contract/debt')).data
    },
    status_contract: async ({ name, status }) => {
        return (await api.patch('contract/find', { name, status })).data
    },
    create_contract: async (payload) => {
        return (await api.post('contract/create-contract', payload)).data
    }
}

export default contractsService