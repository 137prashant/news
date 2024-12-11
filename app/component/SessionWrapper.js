"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../redux/store";
import { SessionProvider } from "next-auth/react";
export default function SessionWrapper({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <SessionProvider>
      <Provider store={storeRef.current}>{children}</Provider>
    </SessionProvider>
  );
}
