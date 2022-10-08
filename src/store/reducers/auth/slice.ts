import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIP } from '@/reducers/auth/thunks';
import type { IUser } from '@/types/IUser';

interface AuthState {
	user: IUser | {};
	ip: string;
	email: string;
	name: string;
}

const initialState: AuthState = {
	user: {},
	ip: '0.0.0.0',
	email: '',
	name: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			localStorage.setItem('zabar_user_id', String(action.payload.id));
			state.user = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setName: (state, action) => {
			state.name = action.payload;
		},
		logout: (state) => {
			localStorage.removeItem('zabar_user_id');
			state.user = {};
		},
	},
	extraReducers: {
		[getIP.fulfilled.type]: (state, action: PayloadAction<string>) => {
			state.ip = action.payload;
		},
	},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
