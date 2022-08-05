import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
  isLoading: true,
  isSignout: false,

  LongUbication: null,

  LatUbication: null,
  isLoadingGPS: true,
  isdeletedGPS: false,
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
      state.isLoadingGPS = false;

    },
    setLat: (state, action) => {
      state.LatUbication = action.payload;
      state.isLoadingGPS = false;

    },
    deleteGPS: state => {
      state.isdeletedGPS = true;
      state.LatUbication = null;
          
    },
    restoreGPS:  (state, action) =>  {
      state.LatUbication = action.payload;
      state.isLoadingGPS = false;
    },
  },
});

export const { restoreToken, signIn, signOut , setLon , setLat, deleteGPS, restoreGPS } = authSlice.actions;
export default authSlice.reducer;
