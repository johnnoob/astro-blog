import { atom } from "nanostores";

type IsSidebarOpen = boolean;
export const isSidebarOpenStore = atom<IsSidebarOpen>(false);
