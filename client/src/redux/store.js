import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import contractsReducer from './features/contractsSlice'
import showDataReducer from './features/showDataSlice'
import usersReducer from './features/usersSlice'
import modalItemContractReducer from './features/showModalItemContract'

const rootReducer = {
    auth: authReducer,
    contracts: contractsReducer,
    users: usersReducer,
    showRightBar: showDataReducer,
    showModalContractItem: modalItemContractReducer,
}
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export default store
