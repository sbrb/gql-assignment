import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDetails as fetchUserDetailsAPI } from '@/app/services/index';

export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async () => {
        const response = await fetchUserDetailsAPI();
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.userProfile;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

