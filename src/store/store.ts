import { Action, configureStore, ThunkAction, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { reducer, RootState } from './reducer';

export const makeStore = () => {
	return configureStore({
		reducer,
	});
};

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type NextThunkDispatch = ThunkDispatch<AppDispatch, void, AnyAction>;

export const wrapper = createWrapper(makeStore, { debug: false });
