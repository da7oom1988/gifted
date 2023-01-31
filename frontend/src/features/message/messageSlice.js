import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import messageService from './messageService'


const initialState = {
    to: [],
    from: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// get user inbox
export const getUserInbox = createAsyncThunk('message/getTo', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await messageService.getUserInbox(token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString() 

       return thunkAPI.rejectWithValue(message)
    }
})

// get user inbox
export const getUserSent = createAsyncThunk('message/getFrom', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await messageService.getUserSent(token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString() 

       return thunkAPI.rejectWithValue(message)
    }
})

// create new message
export const createNewMessage = createAsyncThunk('message/create', async (messageData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await messageService.createMessage(messageData, token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString() 

       return thunkAPI.rejectWithValue(message)
    }
})


export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createNewMessage.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createNewMessage.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createNewMessage.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getUserInbox.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserInbox.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.to = action.payload
        })
        .addCase(getUserInbox.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getUserSent.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserSent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.from = action.payload
        })
        .addCase(getUserSent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
     }
})

export const {reset} = messageSlice.actions
export default messageSlice.reducer
