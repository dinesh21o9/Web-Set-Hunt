import { createReducer } from '@reduxjs/toolkit'

const loaderReducer = createReducer(
	{
       isLoading: false,
	},
	(builder) => {
		builder
		    .addCase('Show-Loader', (state, action) => {
                state.isLoading = true;
			})
			.addCase('Hide-Loader', (state, action) => {
				state.isLoading = false;
			})
	}
);

export default loaderReducer;