import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
// import { addUser } from "./thunks/addUser";
import  { setupListeners } from "@reduxjs/toolkit/query/react";
import { albumsApi } from "./apis/albumsAPI";
import { photosApi } from "./apis/photosAPI";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat(albumsApi.middleware)
    .concat(photosApi.middleware);
  }

});

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsAPI';
export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } from './apis/photosAPI';