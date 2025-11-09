import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getAuth = (state: RootState) => state.auth;
const getSession = createSelector([getAuth], (session) => ({
  isAuthenticated: session.isAuthenticated,
  lembrar: session.lembrar,
  loading: session.loading,
  user: session.user,
}));

export { getSession };
