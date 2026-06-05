import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import {
  ChartPie,
  Layers,
  ShoppingBag,
  ClipboardList,
  UserCog,
  LogOut,
  User,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const actionLogout = useEcomStore((state) => state.logout);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-pink-300 text-white flex items-center p-3 rounded-2xl gap-3 font-black text-sm transition-all scale-[1.02] shadow-[inset_3px_3px_6px_rgba(255,255,255,0.6),3px_3px_8px_rgba(244,143,177,0.4)] border border-pink-200"
      : "text-slate-500 hover:text-sky-500 hover:bg-sky-100/60 flex items-center p-3 rounded-2xl gap-3 font-bold text-sm border border-transparent transition-all";

  const handleLogout = () => {
    try {
      actionLogout();
      toast.success("ออกจากระบบสำเร็จ");
      navigate("/");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
      console.log(error);
    }
  };


  const claySidebarShadow =
    "shadow-[inset_-4px_0_8px_rgba(255,255,255,0.8),inset_4px_4px_8px_rgba(0,0,0,0.02)]";

  return (
    <div
      className={`bg-sky-50 w-64 h-screen flex flex-col border-r-4 border-sky-100/80 ${claySidebarShadow}`}
    >

      <div className="pt-6 pb-4 flex flex-col items-center justify-center border-b-2 border-white">
        <h1 className="text-xl font-black bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent tracking-widest uppercase drop-shadow-sm">
          Admin Panel
        </h1>
        <p className="text-[10px] font-black text-sky-400/80 mt-0.5 tracking-wider">
          SWEET SHOP SYSTEM
        </p>
      </div>


      <div className="px-4 py-4 border-b-2 border-white">
        <div className="flex items-center gap-3 bg-white/70 p-3 rounded-2xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.02),2px_4px_8px_rgba(0,0,0,0.03)] border border-white">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-400 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)] border border-pink-200">
            <User className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-sky-400">
              สถานะ: ผู้ดูแลระบบ
            </span>
          </div>
        </div>
      </div>


      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavLink to={"/admin"} end className={navLinkClass}>
          <ChartPie className="w-5 h-5 stroke-[2.5]" /> หน้าแรกแผงควบคุม
        </NavLink>

        <NavLink to={"category"} end className={navLinkClass}>
          <Layers className="w-5 h-5 stroke-[2.5]" /> หมวดหมู่สินค้า
        </NavLink>

        <NavLink to={"product"} end className={navLinkClass}>
          <ShoppingBag className="w-5 h-5 stroke-[2.5]" /> คลังสินค้าหลัก
        </NavLink>

        <NavLink to={"orders"} end className={navLinkClass}>
          <ClipboardList className="w-5 h-5 stroke-[2.5]" /> รายการคำสั่งซื้อ
        </NavLink>

        <NavLink to={"manage"} end className={navLinkClass}>
          <UserCog className="w-5 h-5 stroke-[2.5]" /> สิทธิ์พนักงาน
        </NavLink>
      </nav>


      <footer className="p-4 border-t-2 border-white">
        <button
          onClick={handleLogout}
          className="w-full text-rose-400 bg-white hover:bg-rose-50 flex items-center justify-center p-3 rounded-2xl gap-2 font-black text-sm shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),2px_4px_6px_rgba(0,0,0,0.04)] border-2 border-rose-100 active:scale-95 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 stroke-[2.5]" /> ออกจากระบบหลังบ้าน
        </button>
      </footer>
    </div>
  );
};

export default Sidebar;
