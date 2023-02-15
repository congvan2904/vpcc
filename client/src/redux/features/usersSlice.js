import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import usersService from "../../services/users.service";
export const users = createAsyncThunk('users/get', async () => {
    const response = await usersService.users()
    // console.log('------=>', response)
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        data: []
    },
    reducers: {},
    extraReducers: {
        [users.pending]: (state, action) => {
            state.loading = true;
        },
        [users.rejected]: (state, action) => {
            state.loading = false;
            state.data = [];
        },
        [users.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },

    }
})
const { reducer: usersReducer } = usersSlice
export default usersReducer