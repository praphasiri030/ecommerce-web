
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const LayoutUser = () => {
  return (
    <div>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUser;
