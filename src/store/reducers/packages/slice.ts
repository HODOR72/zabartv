import { IPackage } from '@/types/IPackage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPackages } from './thunks';

interface IState {
	data: IPackage[];
	isLoading: boolean;
	isError: boolean;
}

const initialState: IState = {
	data: [],
	isLoading: true,
	isError: false,
};

export const packagesSlice = createSlice({
	name: 'packages',
	initialState,
	reducers: {},
	extraReducers: {
		[getPackages.fulfilled.type]: (state, action: PayloadAction<IPackage[]>) => {
			state.isLoading = false;
			state.isError = false;
			state.data = action.payload;
		},
		[getPackages.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getPackages.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const packagesReducer = packagesSlice.reducer;
