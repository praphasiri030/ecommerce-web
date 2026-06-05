import { useEffect, useState } from "react";
import { listAllUser, changUserStatus, changUserRole } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import {
  Users,
  ShieldCheck,
  Power,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const UserTable = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  const handleGetUsers = async (token) => {
    try {
      const res = await listAllUser(token);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeUserStatus = async (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    try {
      const res = await changUserStatus(token, value);
      handleGetUsers(token);
      toast.success("อัปเดตสถานะผู้ใช้งานสำเร็จ");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeUserRole = async (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    try {
      const res = await changUserRole(token, value);
      handleGetUsers(token);
      toast.success("เปลี่ยนสิทธิ์ผู้ใช้สำเร็จ");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const clayCard =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.02)] shadow-[0_8px_24px_rgba(0,0,0,0.02)] bg-white";
  const clayInput =
    "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] bg-slate-50/70";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className={`p-6 rounded-[28px] border border-white ${clayCard}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-100 rounded-xl text-sky-500">
            <Users className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-600 tracking-wide">
              จัดการสิทธิ์ผู้ใช้งาน
            </h2>
            <p className="text-xs text-slate-400 font-bold mt-0.5 uppercase tracking-wider">
              บัญชีสมาชิกในระบบทั้งหมด ({users?.length || 0} รายชื่อ)
            </p>
          </div>
        </div>
      </div>

      {/* รายชื่อผู้ใช้งาน */}
      <div
        className={`p-6 rounded-[28px] border border-white overflow-hidden ${clayCard}`}
      >
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-inner">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-50/80 border-b-2 border-white text-slate-400 text-xs font-black uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-center w-20">ลำดับ</th>
                <th className="px-6 py-4">อีเมลผู้ใช้งาน</th>
                <th className="px-6 py-4 w-44">ระดับสิทธิ์ (Role)</th>
                <th className="px-6 py-4 text-center w-40">สถานะระบบ</th>
                <th className="px-6 py-4 text-center w-40">ปรับเปลี่ยนสถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 font-bold text-sm">
              {users?.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* ลำดับ */}
                  <td className="px-6 py-4 text-center text-slate-400 font-semibold">
                    {index + 1}
                  </td>

                  {/* ชื่ออีเมล */}
                  <td className="px-6 py-4">
                    <div className="font-black text-slate-700 tracking-wide break-all">
                      {item.email}
                    </div>
                  </td>

                  {/* สิทธิ์ผู้ใช้ */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`w-4 h-4 ${item.role === "admin" ? "text-pink-400" : "text-slate-400"}`}
                      />
                      <select
                        value={item.role}
                        onChange={(e) =>
                          handleChangeUserRole(item.id, e.target.value)
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-black outline-none border border-transparent focus:border-sky-300/40 cursor-pointer text-slate-600 ${clayInput}`}
                      >
                        <option value="user">User Mode</option>
                        <option value="admin">Admin Mode</option>
                      </select>
                    </div>
                  </td>

                  {/* สถานะปัจจุบัน */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {item.enabled ? (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100/50 rounded-full text-xs font-black tracking-wide">
                          เปิดใช้งานปกติ
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-rose-50 text-rose-500 border border-rose-100/50 rounded-full text-xs font-black tracking-wide">
                          ระงับการใช้งาน
                        </span>
                      )}
                    </div>
                  </td>

                  {/* ปุ่มควบคุมเปิด/ปิดสถานะ */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleChangeUserStatus(item.id, item.enabled)
                        }
                        className={`px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer border ${
                          item.enabled
                            ? "bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border-slate-200/60"
                            : "bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-100"
                        }`}
                      >
                        <Power className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{item.enabled ? "ปิดใช้งาน" : "เปิดใช้งาน"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
