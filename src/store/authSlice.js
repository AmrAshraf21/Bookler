import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInter from "../network/interceptor";

const loadInitialState = () => {
	const storedAuth = localStorage.getItem("auth");
	return storedAuth ? JSON.parse(storedAuth) : { registerError:null,loginError:null,user: null, isLoggedIn: false, loading: false, error: null };
};

const storedUserData = (userData) => {
	const { password, confirmPassword, ...safeUserData } = userData;
	localStorage.setItem(
		"auth",
		JSON.stringify({
			user: safeUserData,
			isLoggedIn: true,
		})
	);
};
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
	try {
		const checkEmail =await axiosInter.get("users", { params: { email: userData.email } });
		
		
		if (checkEmail.data.some((user) => user.email === userData.email)) {
			throw new Error("Email already exists. Please login instead.");
		}

		const response = await axiosInter.post("users", userData);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data?.message || error.message);
	}
});

export const loginUser = createAsyncThunk("auth/loginUser", async (loginData, { rejectWithValue }) => {
	try {
		// Assuming json-server, so we fetch users and check credentials client-side
		const response = await axiosInter.get("users", {
			params: { email: loginData.email },
		});
		const user = response.data.find((u) => u.email === loginData.email && u.password === loginData.password);

		if (!user) {
			throw new Error("Invalid email or password");
		}
		const { password, confirmPassword, ...safeUserData } = user;
		return safeUserData;
	} catch (error) {
		return rejectWithValue(error.response?.data?.message || error.message);
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState: loadInitialState(),
	reducers: {
		logout: (state) => {
			state.user = null;
			state.isLoggedIn = false;
			localStorage.removeItem("auth");
		},
		initializeAuth: (state) => {
			const storedAuth = localStorage.getItem("auth");
			if (storedAuth) {
				const { user, isLoggedIn } = JSON.parse(storedAuth);
				state.user = user;
				state.isLoggedIn = isLoggedIn;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// Register
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isLoggedIn = false;
				
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Login
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isLoggedIn = true;
				state.error = null;
				storedUserData(action.payload);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
