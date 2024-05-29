import { atom, type WritableAtom } from "nanostores";
// main navsidebar
type IsSidebarOpen = boolean;

export const isSidebarOpenStore: WritableAtom<IsSidebarOpen> = atom(false);
