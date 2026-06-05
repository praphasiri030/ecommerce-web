import axiosInstance from "../api/axiosInstance";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  name: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      name: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },
  clearCart: () => set({ carts: [] }),
  actionAddtocart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    //step uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual);
    // console.log("click add zustan", updateCart);
    // console.log('unipe',uniqe)

    set({ carts: uniqe });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log("update click", productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item,
      ),
    }));
  },

  actionRemoveProduct: (productId) => {
    // console.log("remove",productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await axiosInstance.post("/login", form);
    // console.log(res.data.token);
    set({
      user: res.data.paylode,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
