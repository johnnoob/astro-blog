// nano store
import { atom, type WritableAtom } from "nanostores";
// types
import { type AugmentedPost } from "@/types";

export const postsStore: WritableAtom<AugmentedPost[]> = atom([]);
