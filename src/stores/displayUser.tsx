
import { User } from "@/app/user/type";
import { createStore } from "zustand/vanilla";

export type DisplayUserStore = {
  displayUser: User[],
  actions: {
    updateDisplayUser: (displayUser:User[]) => void
  }
}

export const createDisplayUserStore = () => {
  return createStore<DisplayUserStore>()((set) => ({
    displayUser: [],
    actions: {
      updateDisplayUser: (displayUser:User[]) => set((state) => ({ displayUser: [...state.displayUser, ...displayUser]})),
    }
  }))
}
