import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
  isLoading: true,
  isSignout: false,

  LongUbication: null,
  LatUbication: null,
  LatUbicationMove: null,
  LatUbicationMove: null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: (state, action) => {
      state.userToken = action.payload;
      state.isLoading = false;
    },
    signIn: (state, action) => {
      state.isSignout = false;
      state.userToken = action.payload;
    },
    signOut: state => {
      state.isSignout = true;
      state.userToken = null;
    },
    setLon: (state, action) => {
      state.LongUbication = action.payload;
    },
    setLat: (state, action) => {
      state.LatUbication = action.payload;
    },
    setLonmove: (state, action) => {
      state.LatUbication = action.payload;
    },
    setLatmove: (state, action) => {
      state.LatUbication = action.payload;
    },
    setId: (state, action) => {
      state.LatUbication = action.payload;
    }

  },
});

export const { restoreToken, signIn, signOut , setLon , setLat, setId, setLonmove, setLatmove} = authSlice.actions;
export default authSlice.reducer;
 