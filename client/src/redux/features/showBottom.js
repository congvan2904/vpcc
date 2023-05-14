import { createSlice } from "@reduxjs/toolkit";

const showBottom = createSlice({
    name: 'show_bottom',
    initialState: {
        show: false,
        data: {}
    },
    reducers: {
        toggleBottom: (state, action) => {
            state.show = !state.show
            state.data = action.payload
        }
    }
})
const { reducer: showBottomReducer } = showBottom
export const { toggleBottom } = showBottom.actions
export default showBottomReducer