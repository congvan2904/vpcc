import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import contractsService from "../../services/contracts.service";

export const contracts = createAsyncThunk('contract/debt', async () => {
    const response = await contractsService.contracts()
    // console.log('--contracts----=>', response)
    return response.data
})
export const update_status = createAsyncThunk('contract/update_status', async ({ name, status }) => {
    const response = await contractsService.status_contract({ name, status })
    // console.log('------=>', response.data.response.id_contract)
    return response.data.response.id_contract
})
export const createContract = createAsyncThunk('contract/create_contract', async (payload) => {
    const response = await contractsService.create_contract(payload)
    // console.log('---createContract---=>', response)
    return response.data
})

const contractsSlice = createSlice({
    name: 'contracts',
    initialState: {
        loading: false,
        data: []
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
            state.data = action.payload;
            // console.log('redux', state.data)
        },
        [update_status.fulfilled]: (state, action) => {
            state.loading = false;
            const getId = action.payload;
            // console.log({ getId })
            const getData = current(state.data)
            // console.log('data-->', getData)
            getData.map(contract => {
                const getRrr = contract.id_contract
                const fil = getRrr.filter(item => item !== +getId)
                // console.log({ fil })
                state.data = [{ ...contract, id_contract: fil, count: fil.length }]
                // console.log('update-->', state.data)
                return state.data
            })

        },
        [createContract.fulfilled]: (state, action) => {
            state.loading = false;
            const getData = current(state.data)
            const getIdSecretary = action.payload.id_user_secretary
            const getIdContract = action.payload.id_contract
            // console.log('state', getData)
            // console.log('payload', action.payload)
            getData.map(contract => {
                const getIdUser = contract._id
                // const fil = getRrr.filter(item => item !== +getId)
                // console.log({ fil })
                if (getIdUser === getIdSecretary) {
                    state.data = [{ ...contract, id_contract: [+getIdContract, ...contract.id_contract], count: contract.id_contract.length + 1 }]
                    // console.log('update-->', state.data)
                }
                return state.data
            })
            // state.data = [...getData, action.payload];
            // console.log('redux', state.data)
        },
    }
})
const { reducer: contractsReducer } = contractsSlice
export default contractsReducer