import { IMovie } from '@/types/IMovie';
import { IHistoryPayment, IUser } from '@/types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFavorites, getHistoryPayments, getMe, getViewed, updateUser } from './thunks';

interface UserMovies {
	items: [IMovie[]];
}

interface IState {
	data: IUser;
	viewed: UserMovies | null;
	favorites: UserMovies | null;
	history: IHistoryPayment[] | [];
	isLoading: boolean;
	isError: boolean;
}

const initialState: IState = {
	data: {
		subscribe_on_news: 0,
		avatar_base_url: '',
		avatar_path: '',
		date_of_birth: '',
		email: '',
		first_name: '',
		last_name: '',
		username: '',
	},
	history: [],
	viewed: null,
	favorites: null,
	isLoading: true,
	isError: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[getMe.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
			state.isLoading = false;
			state.isError = false;
			state.data = action.payload;
		},
		[getMe.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getMe.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
		[getHistoryPayments.fulfilled.type]: (state, action: PayloadAction<IHistoryPayment[]>) => {
			state.isLoading = false;
			state.isError = false;
			state.history = action.payload;
		},
		[getHistoryPayments.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getHistoryPayments.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
		[updateUser.fulfilled.type]: (state) => {
			state.isLoading = false;
			state.isError = false;
		},
		[updateUser.pending.type]: (state) => {
			state.isLoading = true;
		},
		[updateUser.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},

		[getViewed.fulfilled.type]: (state, action: PayloadAction<UserMovies>) => {
			state.isLoading = false;
			state.isError = false;
			state.viewed = action.payload;
		},
		[getViewed.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getViewed.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},

		[getFavorites.fulfilled.type]: (state, action: PayloadAction<UserMovies>) => {
			state.isLoading = false;
			state.isError = false;
			state.favorites = action.payload;
		},
		[getFavorites.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getFavorites.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
