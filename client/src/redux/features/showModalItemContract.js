import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
    name: 'modal_slice',
    initialState: {
        showModal: false,
        dataModal: {}
    },
    reducers: {
        toggleModal: (state, action) => {
            state.showModal = !state.showModal;
            state.dataModal = action.payload;
        }
    }
})
const { reducer: modalItemContractReducer } = modalSlice
export const { toggleModal } = modalSlice.actions
export default modalItemContractReducer