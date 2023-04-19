import api from './configAxios'
const contractsService = {
    contracts: async () => {
        return (await api.get('contract/debt')).data
    },
    group_debt_contracts: async () => {
        return (await api.get('contract/group-debt')).data
    },
    status_contract: async ({ name, status }) => {
        return (await api.patch('contract/find', { name, status })).data
    },
    create_contract: async (payload) => {
        return (await api.post('contract/create-contract', payload)).data
    },
    create_contract_today: async (payload) => {
        return (await api.post('contract/create-contract-today', payload)).data
    },
    update_contract_today: async (payload) => {
        return (await api.patch('contract/update-contract-today', payload)).data
    },
    delete_contract_today: async (payload) => {
        const { id } = payload
        return (await api.delete(`contract/delete-contract-today/${id}`)).data
    },
    get_contract_group_sort: async () => {
        return (await api.get('contract/group-sort')).data
    },
    delete_contracts: async () => {
        return (await api.delete('contract/deletes')).data
    },
    get_contracts_today: async () => {
        return (await api.get('contract/today')).data
    },
    get_last_contract: async () => {
        return (await api.get('contract/last-contract')).data
    }
}

export default contractsService