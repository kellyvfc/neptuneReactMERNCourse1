import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalsService from './goalsService';

const initialState = {
    goals : [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const getGoals = createAsyncThunk('goals/getAll', async(_,thunkAPI)=>{
    try {
        let user = thunkAPI.getState().auth.user;
        return await goalsService.getGoals(user);
    } catch(error) {
        const message = (error.message 
                    && error.response.data 
                    && error.response.data.message) 
                    || error.message 
                    || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const addGoal = createAsyncThunk('goals/add', async(goalData, thunkAPI)=>{
    try {
        let user = thunkAPI.getState().auth.user;
        return await goalsService.addGoal(user, goalData);
    } catch(error) {
        const message = (error.message 
                    && error.response.data 
                    && error.response.data.message) 
                    || error.message 
                    || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const removeGoal = createAsyncThunk('goals/remove', async(goalData, thunkAPI)=> {
    try {
        let user = thunkAPI.getState().auth.user;
        return await goalsService.removeGoal(user, goalData);
    } catch(error) {
        const message = (error.message 
                    && error.response.data 
                    && error.response.data.message) 
                    || error.message 
                    || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGoals.pending, (state)=> {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action)=> {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addGoal.pending, (state)=> {
                state.isLoading = true;
            })
            .addCase(addGoal.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(addGoal.rejected, (state, action)=> {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeGoal.pending, (state)=> {
                state.isLoading = true;
            })
            .addCase(removeGoal.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter((goal)=>goal._id !== action.payload._id);
            })
            .addCase(removeGoal.rejected, (state, action)=> {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const {reset} = goalSlice.actions;

export default goalSlice.reducer;