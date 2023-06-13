import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisiblePlayer: false,
	url: '',
};

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		openPlayer: (state, action) => {
			state.isVisiblePlayer = action.payload;
		},
		setUrl: (state, action) => {
			state.url = action.payload;
		},
	},
});

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
