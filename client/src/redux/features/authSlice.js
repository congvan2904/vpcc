import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

export const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
    const response = await authService.login(params)
    // console.log('------=>', params)
    return response.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isLogin: false,
        data: []
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [login.fulfilled]: (state, action) => {
            if (action.payload.accessToken) {
                state.loading = false;
                state.isLogin = true;
                state.data = action.payload;
            }
            else {
                state.isLogin = false;
                state.data = action.payload;
            }
        },
    }
})
const { reducer: authReducer } = authSlice
export default authReducer