import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisibleRegisterModal: false,
	isVisibleSubscribeModal: false,
	isVisibleGradeModal: false,
	isVisibleAuthModal: false
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showRegisterModal: (state, action) => {
			state.isVisibleRegisterModal = action.payload;
		},
		showSubscribeModal: (state, action) => {
			state.isVisibleSubscribeModal = action.payload;
		},
		showGradeModal: (state, action) => {
			state.isVisibleGradeModal = action.payload;
		},
		showAuthModal: (state, action) => {
			state.isVisibleAuthModal = action.payload
		}
	},
});


export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
