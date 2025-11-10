"use client";
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <ToastContainer position="top-center" />
      </PersistGate>
    </Provider>
  );
}
