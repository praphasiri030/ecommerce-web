import { useLocation } from "react-router-dom";

const Headerbar = () => {
  const location = useLocation();

  const getPageTitle = (path) => {
    if (path === "/admin") return "หน้าแรกแผงควบคุม (Dashboard)";
    if (path.includes("category")) return "จัดการหมวดหมู่สินค้า";
    if (path.includes("product")) return "จัดการคลังสินค้าหลัก";
    if (path.includes("orders")) return "รายการสั่งซื้อทั้งหมด";
    if (path.includes("manage")) return "จัดการสิทธิ์ผู้ใช้งาน";
    return "ผู้ดูแลระบบ";
  };

  const clayShadow =
    "shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] shadow-[0_4px_12px_rgba(0,0,0,0.03)]";

  return (
    <header
      className={`bg-white/80 backdrop-blur-md h-16 flex items-center justify-center px-6 border-b-2 border-sky-100/40 ${clayShadow}`}
    >
      <h1 className="text-base font-black text-slate-600 tracking-wide">
        {getPageTitle(location.pathname)}
      </h1>
    </header>
  );
};

export default Headerbar;
