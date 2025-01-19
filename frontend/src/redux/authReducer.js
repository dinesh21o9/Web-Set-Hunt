import {createReducer} from '@reduxjs/toolkit'

export const authReducer = createReducer(
    {
        user: "Raaju",
    },
    (builder) => {
        builder
            .addCase('Sign-In', (state, action) =>{
                state.user = action.payload;
            })
            .addCase('Sign-Out', (state, action) =>{
                state.user = null;
            })
    }
);

export default authReducer;