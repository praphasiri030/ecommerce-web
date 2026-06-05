import axiosInstance from "./axiosInstance";

export const getOrderAdmin = async (token) => {
  return axiosInstance.get("/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axiosInstance.put(
    "/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const listAllUser = async (token) => {
  return axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changUserStatus = async (token,value,) => {
  return axiosInstance.post("/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changUserRole = async (token,value,) => {
  return axiosInstance.post("/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
