import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIP } from '@/reducers/auth/thunks';

interface AuthState {
	ip: string;
	email: string;
	name: string;
}

const initialState: AuthState = {
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
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setName: (state, action) => {
			state.name = action.payload;
		},
		logout: () => {
			localStorage.removeItem('zabar_user_id');
			localStorage.removeItem("zabar_session_id")
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
