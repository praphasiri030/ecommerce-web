import axiosInstance from "./axiosInstance";

export const payment = async (token) => {
  return axiosInstance.post("/user/create-payment-intent", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
