import type { CartProduct } from "../../interfaces";
import { create } from "zustand";

interface State { 
    cart: CartProduct[];
    // add
    // update
    // remove
};

export const useCartStore = create<State>(
    (set) => ({
        cart: [],
    })
);