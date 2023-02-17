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
    },
    get_contract_group_sort: async () => {
        return (await api.get('contract/group-sort')).data
    },
    delete_contracts: async () => {
        return (await api.delete('contract/deletes')).data
    }
}

export default contractsService