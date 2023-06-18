import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import groupBy from "../../helpers/groupDataByKey";
import contractsService from "../../services/contracts.service";

export const contracts = createAsyncThunk('contract/debt', async () => {
    const response = await contractsService.contracts()
    // console.log('--contracts----=>', response.data)
    return response.data
})
export const groupDebtContracts = createAsyncThunk('contract/group_debt', async () => {
    const response = await contractsService.group_debt_contracts()
    // console.log('--contracts----=>', response.data)
    return response.data
})
export const update_status = createAsyncThunk('contract/update_status', async ({ name, status }) => {
    const response = await contractsService.status_contract({ name, status })
    // console.log('--update_status----=>', response.data)
    return response.data
})
export const updateStatusDebtContract = createAsyncThunk('contract/update_status_debt_contract', async ({ id, status }) => {
    const response = await contractsService.update_status_debt_contract({ id, status })
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
export const updateContractToday = createAsyncThunk('contract/update_contract_today', async (payload) => {
    const response = await contractsService.update_contract_today(payload)
    // console.log('---UpdateContract---=>', response.data)
    return response.data
})

export const deleteContractToday = createAsyncThunk('contract/delete_contract_today', async (payload) => {
    // console.log(payload)
    const response = await contractsService.delete_contract_today(payload)
    // console.log('---DeleteContract---=>', response.data)
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

export const getAllContract = createAsyncThunk('contract/getall', async ({ page, page_size }) => {
    const response = await contractsService.get_all_contract({ page, page_size })
    // console.log('---createContract---=>', response)
    return response.data
})

export const findContract = createAsyncThunk('contract/find', async (payload) => {
    const response = await contractsService.find_contract(payload)
    // console.log('---createContract---=>', response)
    return response.data
})

const contractsSlice = createSlice({
    name: 'contracts',
    initialState: {
        loading: false,
        data: [],
        number: 0,
        lastContract: {},
        groupData: [],
        allContract: [],
        findData: []
    },
    reducers: {
        sort_secretary: (state) => {
            // console.log(current(state.data))
            // const getData = [...current(state.data)]
            state.data.sort((a, b) => a["id_user_secretary"].username.toLowerCase().localeCompare(b["id_user_secretary"].username.toLowerCase()))
            // console.log(getData)
            return state
        },
        sort_key: (state, action) => {
            const get_key = action.payload
            // console.log({ get_key })
            state.data.sort((a, b) => {
                if (a[get_key].username) {
                    const getLastNameA = a[get_key].username.split(' ').pop()
                    const getLastNameB = b[get_key].username.split(' ').pop()
                    return getLastNameA.toLowerCase().localeCompare(getLastNameB.toLowerCase())
                } else {
                    try {

                        const getLastNameA = a[get_key].split(' ').pop()
                        const getLastNameB = b[get_key].split(' ').pop()
                        return getLastNameA.toLowerCase().localeCompare(getLastNameB.toLowerCase())
                    }
                    catch {

                        return a[get_key] - b[get_key]
                    }
                }

            }
            )
            return state

        }
    },
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
        [getAllContract.fulfilled]: (state, action) => {
            state.loading = false;
            state.allContract = [...state.allContract, ...action.payload];
            // state.allContract = [...data]
            // console.log('redux', state.data)
        },
        [groupDebtContracts.fulfilled]: (state, action) => {
            state.loading = false;
            state.groupData = action.payload;
        },
        [updateStatusDebtContract.fulfilled]: (state, action) => {
            state.loading = false;
            const getId = action.payload?._id
            // state.groupData = state.groupData.filter(item => {
            //     const data = item.list_day.filter(day => {
            //         const filter = day.list_contract.filter(contract => contract.id_contract !== getId)
            //         return filter
            //     })
            //     return data
            // });

            const filter = (id_contract) =>
                state.groupData.map((ld) => {
                    return {
                        ...ld,
                        list_day: ld.list_day.map((e) => ({
                            ...e,
                            list_contract: e.list_contract.filter(
                                (l) => l.id_contract !== id_contract
                            ),
                        })),
                    };
                });

            if (filter(getId).length > 0) {
                const arrResult = [];
                filter(getId).forEach((ld) => {
                    if (ld.list_day.length > 0) {
                        const addListday = [];
                        ld.list_day.forEach((item) => {
                            if (item.list_contract.length > 0) {
                                addListday.push(item);
                            }
                        });
                        arrResult.push({
                            _id: ld._id,
                            username: ld.username,
                            list_day: addListday,
                        });
                    }
                });
                state.groupData = arrResult
                return state
            }
            state.groupData = []
            return state

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
        [updateContractToday.fulfilled]: (state, action) => {
            state.loading = false;
            const getId = action.payload._id
            const index = state.data.findIndex(item => item._id === getId)
            // console.log({ index })
            if (index === 0) {
                state.data = [action.payload, ...state.data.slice(index + 1)]
                return state
            }
            if (index === state.data.length - 1) {
                state.data = [...state.data.slice(0, index), action.payload]
                return state
            }
            state.data = [...state.data.slice(0, index), action.payload, ...state.data.slice(index + 1)]
            // const filter = state.data.filter(item => item._id !== getId)
            // state.data = [...filter, action.payload];
            return state
        },
        [deleteContractToday.fulfilled]: (state, action) => {
            state.loading = false;
            const getId = action.payload._id
            state.data = state.data.filter(item => item._id !== getId)
            return state
        },
        [getLastContract.fulfilled]: (state, action) => {
            state.loading = false;
            state.lastContract = { ...action.payload };
        },
        [findContract.fulfilled]: (state, action) => {
            state.loading = false;
            state.findData = [...action.payload];
        },
    }
})
const { reducer: contractsReducer } = contractsSlice
export const { sort_secretary, sort_key } = contractsSlice.actions

export default contractsReducer