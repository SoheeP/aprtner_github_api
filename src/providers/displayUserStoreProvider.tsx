"use client";

import {
  createDisplayUserStore,
  type DisplayUserStore,
} from "@/stores/displayUser";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type DisplayUserStoreApi = ReturnType<typeof createDisplayUserStore>;

export const DisplayUserStoreContext = createContext<
  DisplayUserStoreApi | undefined
>(undefined);

export interface DisplayUserStoreProviderProps {
  children: ReactNode;
}

export const DisplayUserStoreProvider = ({
  children,
}: DisplayUserStoreProviderProps) => {
  const storeRef = useRef<DisplayUserStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createDisplayUserStore();
  }

  return (
    <DisplayUserStoreContext.Provider value={storeRef.current}>
      {children}
    </DisplayUserStoreContext.Provider>
  );
};

export const useDisplayUserStore = <T,>(
  selector: (store: DisplayUserStore) => T
): T => {
  const displayUserStoreContext = useContext(DisplayUserStoreContext);

  if (!displayUserStoreContext) {
    throw new Error(
      `useCounterStore must be used within DisplayUserStoreProvider`
    );
  }

  return useStore(displayUserStoreContext, selector);
};
