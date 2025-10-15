import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
import { RootState } from "../../../lib/store";
import { Goal } from "@/types/goal";

// interface Goal {
//   _id?: string;
//   text: string;
//   createdAt?: string;
// }

interface GoalState {
  goals: Goal[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: GoalState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createGoal = createAsyncThunk<
  Goal,
  Partial<Goal>,
  { state: RootState }
  // { rejectValue: string }
>("goals/create", async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await goalService.createGoal(goalData, token);
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

// Get goals
export const getGoals = createAsyncThunk<Goal[], void, { state: RootState }>(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await goalService.getGoals(token);
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

// Delete goal
export const deleteGoal = createAsyncThunk<
  { id: string },
  string,
  { state: RootState }
  // { rejectValue: string }
>("goals/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await goalService.deleteGoal(id, token);
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

export const goalSlice = createSlice({
  name: "goal",
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
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Get goals slice
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Delete goals slice
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
