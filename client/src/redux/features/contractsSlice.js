import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import groupBy from "../../helpers/groupDataByKey";
import contractsService from "../../services/contracts.service";

export const contracts = createAsyncThunk('contract/debt', async () => {
    const response = await contractsService.contracts()
    // console.log('--contracts----=>', response.data)
    return response.data
})
export const update_status = createAsyncThunk('contract/update_status', async ({ name, status }) => {
    const response = await contractsService.status_contract({ name, status })
    // console.log('--update_status----=>', response.data)
    return response.data
})
export const createContract = createAsyncThunk('contract/create_contract', async (payload) => {
    const response = await contractsService.create_contract(payload)
    // console.log('---createContract---=>', response.data)
    return response.data
})
export const createContractToday = createAsyncThunk('contract/create_contract_today', async (payload) => {
    const response = await contractsService.create_contract_today(payload)
    // console.log('---createContract---=>', response.data)
    return response.data
})
export const getContractGroupSort = createAsyncThunk('contract/group_sort', async () => {
    const response = await contractsService.get_contract_group_sort()
    // const groupByDate = groupBy(response.data, 'date_create').reverse()
    // console.log('---getContractGroupSort---=>', response.data)
    return response.data
})

export const getContractsToday = createAsyncThunk('contract/today', async () => {
    const response = await contractsService.get_contracts_today()
    // const groupByDate = groupBy(response.data, 'date_create').reverse()
    // console.log('---getContractToday---=>', response.data)
    return response.data
})

export const getLastContract = createAsyncThunk('contract/last_contract', async () => {
    const response = await contractsService.get_last_contract()
    // const groupByDate = groupBy(response.data, 'date_create').reverse()
    // console.log('---getContractToday---=>', response.data)
    return response.data
})

export const deleteContracts = createAsyncThunk('contract/deletes', async () => {
    const response = await contractsService.delete_contracts()
    // console.log('---createContract---=>', response)
    return response.data.deletedCount
})

const contractsSlice = createSlice({
    name: 'contracts',
    initialState: {
        loading: false,
        data: [],
        number: 0,
        lastContract: {},
    },
    reducers: {},
    extraReducers: {
        [contracts.pending]: (state, action) => {
            state.loading = true;
        },
        [contracts.rejected]: (state, action) => {
            state.loading = false;
            state.data = [];
        },
        [contracts.fulfilled]: (state, action) => {
            state.loading = false;
            state.number = 0;
            state.data = action.payload;
            // console.log('redux', state.data)
        },
        [getContractGroupSort.fulfilled]: (state, action) => {
            state.loading = false;
            // state.data = action.payload;
            // console.log('redux', state.data)
        },
        [update_status.fulfilled]: (state, action) => {
            state.loading = false;
            state.number = 0;
            const getData = current(state.data)
            const getIdSecretary = action.payload.id_user_secretary
            const getIdContract = action.payload._id
            const getNumberContract = action.payload.id_contract
            const getDate = action.payload.date_create
            // console.log(getIdSecretary + '---' + getIdContract)
            // console.log('payload', action.payload)
            getData.map(user => {
                const getIdUser = user._id
                // const fil = getRrr.filter(item => item !== +getId)
                // console.log({ fil }
                if (getIdUser === getIdSecretary) {
                    const redata = getData.filter(item => item._id !== getIdSecretary)
                    const removeNumberContract = user.id_contract.filter(item => item[0] !== getIdContract)
                    state.data = [{ ...user, id_contract: removeNumberContract, count: user.id_contract.length - 1 }, ...redata]
                    // console.log('state---->update--->>>', state.data)
                }
                return state
            })

        },
        [createContract.fulfilled]: (state, action) => {
            state.loading = false;
            state.number = 0;
            const getData = current(state.data)
            const getIdSecretary = action.payload.id_user_secretary
            const getIdContract = action.payload._id
            const getNumberContract = action.payload.id_contract
            const getDate = action.payload.date_create
            const getUserName = action.payload.username
            // console.log('state', getData)
            const findUser = getData.findIndex(item => item._id === getIdSecretary)
            if (findUser < 0) {
                state.data = [{ _id: getIdSecretary, id_contract: [[getIdContract, +getNumberContract, getDate]], count: 1, username: getUserName }, ...getData]
                return state
            }
            // if (getData.length < 1) {
            //     state.data = [{ _id: getIdSecretary, id_contract: [[getIdContract, +getNumberContract, getDate]], count: 1, username: '' }]
            //     return state
            // }
            getData.map(user => {
                const getIdUser = user._id

                if (getIdUser === getIdSecretary) {
                    const redata = getData.filter(item => item._id !== getIdSecretary)
                    state.data = [{ ...user, id_contract: [[getIdContract, +getNumberContract, getDate], ...user.id_contract], count: user.id_contract.length + 1 }, ...redata]
                }
                return state
            })
            // state.data = [...getData, action.payload];
            // console.log('redux', state.data)
        },
        [deleteContracts.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = [];
            state.number = action.payload
        },
        [getContractsToday.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [createContractToday.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = [...state.data, action.payload];
        },
        [getLastContract.fulfilled]: (state, action) => {
            state.loading = false;
            state.lastContract = { ...action.payload };
        },
    }
})
const { reducer: contractsReducer } = contractsSlice
export default contractsReducer