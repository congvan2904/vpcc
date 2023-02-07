import api from './configAxios'
const contractsService = {
    contracts: async () => {
        return (await api.get('contract/debt')).data
    },
    status_contract: async () => {
        return (await api.patch('contract/find')).data
    }
}

export default contractsService