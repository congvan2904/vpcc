import { createSlice } from "@reduxjs/toolkit";

const showDataSlice = createSlice({
    name: 'data_select',
    initialState: {
        select: ''

    },
    reducers: {
        setSelect(state, action) {
            state.select = action.payload
        },
    },
})
const { reducer: showDataReducer } = showDataSlice
export const { setSelect } = showDataSlice.actions
export default showDataReducer