import React, { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../api/auth";

const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user && token) {
        try {
          await currentAdmin(token);
          setOk(true);
        } catch (error) {
          console.log(error);
          setOk(false);
        }
      }
    };

    checkAdminStatus();
  }, [user, token]);

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteAdmin;
