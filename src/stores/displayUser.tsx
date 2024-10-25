import { User } from "@/app/user/type";
import { createStore } from "zustand/vanilla";

export type DisplayUserStore = {
  displayUser: User[];
  actions: {
    addDisplayUsers: (displayUser: User[]) => void;
    updateDisplayUser: (displayUser: User) => void;
    initDisplayUser: () => void;
  };
};

export const createDisplayUserStore = () => {
  return createStore<DisplayUserStore>()((set) => ({
    displayUser: [],
    actions: {
      addDisplayUsers: (displayUser: User[]) =>
        set((state) => ({
          displayUser: [...state.displayUser, ...displayUser],
        })),
      updateDisplayUser: (displayUser: User) =>
        set((state) => {
          const userIndex = state.displayUser.findIndex(
            (user) => user.id === displayUser.id
          );
          const newDisplayUser = [...state.displayUser];
          newDisplayUser.splice(userIndex, 1, displayUser);
          return {
            displayUser: newDisplayUser,
          };
        }),
      initDisplayUser: () => set({ displayUser: [] }),
    },
  }));
};
