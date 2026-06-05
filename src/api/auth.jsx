import axiosInstance from "./axiosInstance";

export const currentUser = (token) =>
  axiosInstance.post(
    "/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const currentAdmin = (token) => {
  return axiosInstance.post(
    "/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
