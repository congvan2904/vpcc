import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import usersService from "../../services/users.service";
export const users = createAsyncThunk('users/get', async () => {
    const response = await usersService.users()
    // console.log('------=>', response)
    return response.data
})
export const createUser = createAsyncThunk('users/create', async (payload) => {
    const response = await usersService.create_user(payload)
    // console.log('------=>', response)
    return response.data
})
export const updateUser = createAsyncThunk('users/update', async (payload) => {
    const response = await usersService.update_user(payload)
    // console.log('Update USER------=>', response)
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
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            const getData = current(state.data)
            state.data = [...getData, action.payload];
        },
        [updateUser.fulfilled]: (state, action) => {
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

    }
})
const { reducer: usersReducer } = usersSlice
export default usersReducer