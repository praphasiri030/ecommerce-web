import axiosInstance from "./axiosInstance";

export const createCategory = async (token, form) => {
  return axiosInstance.post("/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async () => {
  return axiosInstance.get("/category");
};

export const removeCategory = async (token, id) => {
  return axiosInstance.delete("/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
