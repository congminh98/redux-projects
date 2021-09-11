import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from 'api/userApi';

// First, create the thunk
export const getMe = createAsyncThunk('user/getMe',
  async (userId, thunkAPI) => {
    const response = await userApi.getMe();
    return response;
  }
)
const userSlice = createSlice({
  name: 'user',
  // initialState: { entities: [], loading: 'idle' },
  initialState: {
    current: {},
  },
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getMe.fulfilled]: (state, action) => {
      // state.entities.push(action.payload) || # from docs;
      state.current = action.payload;
    }
  }
});

const { reducer: userReducer } = userSlice;
export default userReducer;