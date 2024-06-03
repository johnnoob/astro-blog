import { atom, type WritableAtom } from "nanostores";

type IsSidebarOpen = boolean;
export const isSidebarOpenStore: WritableAtom<IsSidebarOpen> = atom(false);
