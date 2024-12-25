import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value : false
}
export const CounterSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loggedin: (state) => {
            state.value = true;
        }
    }
})
export const {loggedin} = CounterSlice.actions;
export default CounterSlice.reducer;