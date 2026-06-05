import { Link, NavLink, useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, ShoppingCart, LogOut, History } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import profileMockup from "../assets/9334240.jpg";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const [isOpen, setIsOpen] = useState(false);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const clayShadowNormal =
    "shadow-[inset_4px_4px_8px_rgba(255,255,255,0.5),inset_-4px_-4px_8px_rgba(0,0,0,0.15)] shadow-[0_8px_16px_rgba(0,0,0,0.06)]";
  const clayShadowDropdown =
    "shadow-[inset_6px_6px_10px_rgba(255,255,255,0.6),inset_-6px_-6px_10px_rgba(0,0,0,0.1)] shadow-[0_12px_24px_rgba(0,0,0,0.08)]";
  const clayActive =
    "active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] active:scale-[0.96]";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & เมนูหลัก */}
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className={`bg-sky text-white text-xl font-black tracking-wider px-5 py-1.5 rounded-2xl transition-all duration-150 ${clayShadowNormal} hover:scale-105`}
            >
              LOGO
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-black tracking-wide">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky transition-colors duration-200"
                    : "text-slate-500 hover:text-sky transition-colors duration-200"
                }
              >
                Home
              </NavLink>

              <NavLink
                to={"/shop"}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky transition-colors duration-200"
                    : "text-slate-500 hover:text-sky transition-colors duration-200"
                }
              >
                Shop
              </NavLink>
            </div>
          </div>

          {/* ตะกร้าสินค้า & โปรไฟล์/ปุ่มล็อกอิน */}
          <div className="flex items-center gap-6">
            <Link
              to={"cart"}
              className={`relative p-2.5 bg-mint text-slate-700 rounded-full transition-all duration-150 ${clayShadowNormal} ${clayActive}`}
            >
              <ShoppingCart className="w-5 h-5 text-teal-800" />
              {carts.length > 0 && (
                <span
                  className={`absolute -top-1 -right-1 bg-pink text-rose-700 font-black rounded-full h-5 min-w-[20px] px-1 text-xs flex items-center justify-center border border-white shadow-sm`}
                >
                  {carts.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className={`flex items-center gap-2 p-1 pr-3 bg-slate-50 text-slate-700 font-bold rounded-full transition-all duration-150 ${clayShadowNormal} ${clayActive}`}
                  onClick={toggleDropdown}
                >
                  <img
                    src={profileMockup}
                    alt="User profile"
                    className="w-8 h-8 object-cover rounded-full border-2 border-white shadow-sm"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div
                    className={`absolute right-0 mt-3 w-48 bg-white text-slate-700 p-2 rounded-2xl border-4 border-white z-50 ${clayShadowDropdown} animate-in fade-in slide-in-from-top-2 duration-150`}
                  >
                    <div className="px-3 py-1.5 text-xs font-black text-slate-400 uppercase tracking-wider border-b-2 border-slate-100 mb-1">
                      My Account
                    </div>
                    <Link
                      to={"user/history"}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-bold rounded-xl hover:bg-mint/40 text-slate-600 hover:text-teal-900 transition-colors"
                    >
                      <History className="w-4 h-4" />
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-black rounded-xl text-rose-500 hover:bg-pink/40 transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={"auth"}
                className={`bg-pink text-white text-sm font-black px-6 py-2 rounded-full transition-all duration-150 ${clayShadowNormal} ${clayActive}`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
