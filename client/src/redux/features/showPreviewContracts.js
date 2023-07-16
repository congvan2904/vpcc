import { createSlice } from "@reduxjs/toolkit";

const showModalPreviewContractsSlice = createSlice({
    name: 'show_modal_preview_contracts',
    initialState: {
        show: false,
        data: ''
    },
    reducers: {
        toggleModalPreviewContracts: (state, action) => {
            state.show = !state.show
            state.data = action.payload
        }
    }
})
const { reducer: modalPreviewContractsReducer } = showModalPreviewContractsSlice
export const { toggleModalPreviewContracts } = showModalPreviewContractsSlice.actions
export default modalPreviewContractsReducer