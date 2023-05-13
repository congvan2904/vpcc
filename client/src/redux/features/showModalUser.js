import { createSlice } from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: 'show_modal_user',
    initialState: {
        show: false,
        data: {}
    },
    reducers: {
        toggleModalUser: (state, action) => {
            state.show = !state.show
            state.data = action.payload
        }
    }
})
const { reducer: modalUserReducer } = showModalSlice
export const { toggleModalUser } = showModalSlice.actions
export default modalUserReducer