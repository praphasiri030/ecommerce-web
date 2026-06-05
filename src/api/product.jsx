import axiosInstance from "./axiosInstance";

export const createProduct = async (token, form) => {
  return axiosInstance.post("/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listProduct = async (count = 20) => {
  return axiosInstance.get("/products/" + count);
};
export const readProduct = async (token, id) => {
  return axiosInstance.get("/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = async (token, id, form) => {
  return axiosInstance.put("/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, id) => {
  return axiosInstance.delete("/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  return axiosInstance.post(
    "/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const removeFiles = async (token, public_id) => {
  return axiosInstance.post(
    "/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const searchFilters = async (arg) => {
  return axiosInstance.post("/search/filters", arg);
};

export const listProductBy = async (sort, order, limit) => {
  return axiosInstance.post("/productby", {
    sort,
    order,
    limit,
  });
};
