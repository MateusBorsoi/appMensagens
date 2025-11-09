"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../store/store";
import { useEffect } from "react";
import { restoreSession } from "../store/slices/authSlice";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    
    store.dispatch(restoreSession());
  }, []);

  return (
    <Provider store={store}>
      {children}
      <ToastContainer position="top-center" />
    </Provider>
  );
};

export default Providers;
