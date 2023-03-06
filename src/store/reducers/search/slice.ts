import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	search: '',
	isSearchVisible: false,
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearch: (state, action) => {
			state.search = action.payload;
		},
		setVisibleSearch: (state, action) => {
			state.isSearchVisible = action.payload;
		},
	},
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
