import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  token?: string;
  // password?: string;
  // confirmPassword?: string;
  // message?: string;
}

interface UserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

// Get user from localStorage
const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

const user: User | null = storedUser ? JSON.parse(storedUser) : null;
// const user =
//
//      JSON.parse(localStorage.getItem("user"));

interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk<
  User,
  UserData,
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error: unknown) {
    type AxiosErrorResponse = {
      response?: {
        data?: {
          message?: string;
        };
      };
      message?: string;
      toString: () => string;
    };

    const err = error as AxiosErrorResponse;

    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk<User, UserData, { rejectValue: string }>(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error: unknown) {
      type AxiosErrorResponse = {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
        toString: () => string;
      };

      const err = error as AxiosErrorResponse;

      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Register fulfilled payload:", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Register fulfilled payload:", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
