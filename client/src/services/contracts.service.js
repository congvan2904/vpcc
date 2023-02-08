import api from './configAxios'
const contractsService = {
    contracts: async () => {
        return (await api.get('contract/debt')).data
    },
    status_contract: async ({ name, status }) => {
        return (await api.patch('contract/find', { name, status })).data
    }
}

export default contractsService