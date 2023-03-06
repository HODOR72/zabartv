import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisibleRegisterModal: false,
	isVisibleSubscribeModal: false,
	isVisibleSubscribeEmptyModal: false,
	isVisibleSubscriptionModal: false,
	isVisibleGradeModal: false,
	isVisibleAuthModal: false,
	isVisibleForgotPasswordModal: false,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showRegisterModal: (state, action) => ({
			...state,
			isVisibleRegisterModal: action.payload,
		}),
		showSubscribeModal: (state, action) => ({
			...state,
			isVisibleSubscribeModal: action.payload,
		}),
		showSubscribeEmptyModal: (state, action) => ({
			...state,
			isVisibleSubscribeEmptyModal: action.payload,
		}),
		showSubscriptionModal: (state, action) => ({
			...state,
			isVisibleSubscriptionModal: action.payload,
		}),
		showGradeModal: (state, action) => ({
			...state,
			isVisibleGradeModal: action.payload,
		}),
		showAuthModal: (state, action) => ({
			...state,
			isVisibleAuthModal: action.payload,
		}),
		showForgotPasswordModal: (state, action) => ({
			...state,
			isVisibleForgotPasswordModal: action.payload,
		}),
	},
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
