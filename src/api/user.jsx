import axiosInstance from "./axiosInstance";

export const createUserCart = async (token, cart) => {
  return axiosInstance.post("/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listUserCart = async (token) => {
  return axiosInstance.get("/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveAddress = async (token, address) => {
  return axiosInstance.post(
    "/user/address",
    {
      address,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const saveOrder = async (token, payload) => {
  return axiosInstance.post(
    "/user/order",
    {
      payload,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const getsOrder = async (token) => {
  return axiosInstance.get("/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
