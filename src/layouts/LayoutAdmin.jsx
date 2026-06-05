import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Headerbar from "../components/admin/Headerbar";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen overflow-hidden font-sans antialiased">
      {/* แถบด้านซ้ายมือ */}
      <Sidebar />

      {/* ฝั่งขวามือทั้งหมด */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Headerbar />

        {/* บริเวณเนื้อหาหลักด้านล่างที่จะเปลี่ยนไปตามหน้าลูก */}
        <main className="flex-1 p-6 bg-slate-50/60 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
