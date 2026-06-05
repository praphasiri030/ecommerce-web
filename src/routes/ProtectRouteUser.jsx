import React, { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentUser } from "../api/auth";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user && token) {
        try {
          await currentUser(token);
          setOk(true);
        } catch (error) {
          console.log(error);
          setOk(false);
        }
      }
    };

    checkUserStatus();
  }, [user, token]);

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
