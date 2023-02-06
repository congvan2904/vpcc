import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contractsService from "../../services/contracts.service";

export const contracts = createAsyncThunk('contract/debt', async () => {
    const response = await contractsService.contracts()
    // console.log('------=>', params)
    return response
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
        },
    }
})
const { reducer: contractsReducer } = contractsSlice
export default contractsReducer