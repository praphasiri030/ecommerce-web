import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { getOrderAdmin, changeOrderStatus } from "../../api/admin";
import { toast } from "react-toastify";
import { ClipboardList } from "lucide-react";

const OrderTable = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  const handleGetOrder = async (token) => {
    try {
      const res = await getOrderAdmin(token);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeOrderStatus = async (token, orderId, orderStatus) => {
    try {
      const res = await changeOrderStatus(token, orderId, orderStatus);
      handleGetOrder(token);
      toast.success("อัปเดตสถานะคำสั่งซื้อเรียบร้อย");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      handleGetOrder(token);
    }
  }, []);

  const changeStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-purple-50 text-purple-500 border-purple-100";
      case "Processing":
        return "bg-sky-50 text-sky-500 border-sky-100";
      case "Completed":
        return "bg-emerald-50 text-emerald-500 border-emerald-100";
      case "Cancel":
        return "bg-pink-50 text-pink-500 border-pink-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  const clayCard =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.015)] shadow-[0_8px_24px_rgba(0,0,0,0.02)] bg-white";
  const claySelect =
    "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] bg-slate-50/60";
  const innerItem =
    "shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.01)]";

  return (
    <div
      className={`max-w-6xl mx-auto space-y-6 ${clayCard}`}
    >
      {/* ส่วนหัวของหน้ารายการจัดการบิล */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-pink-100 rounded-2xl text-pink-400">
          <ClipboardList className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-700 tracking-wide">
            ระบบจัดการคำสั่งซื้อ
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            Order Management System
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100/80 shadow-[0_4px_16px_rgba(0,0,0,0.01)] bg-white/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-black text-xs tracking-wider uppercase">
              <th className="px-6 py-4 text-center w-16">ลำดับ</th>
              <th className="px-6 py-4">ข้อมูลผู้สั่งซื้อ</th>
              <th className="px-6 py-4">รายการสินค้า</th>
              <th className="px-6 py-4">ยอดรวมสุทธิ</th>
              <th className="px-6 py-4">วันที่สั่งซื้อ</th>
              <th className="px-6 py-4 text-center w-36">สถานะบิล</th>
              <th className="px-6 py-4 text-center w-40">ปรับสถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70 text-sm font-bold text-slate-600">
            {orders?.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50/40 transition-colors"
              >
                {/* ลำดับ */}
                <td className="px-6 py-5 text-center text-slate-400 font-black">
                  {index + 1}
                </td>

                {/* ข้อมูลผู้สั่งซื้อ */}
                <td className="px-6 py-5">
                  <div className="space-y-1 max-w-sm">
                    <p className="text-slate-700 font-bold tracking-wide break-all">
                      {item.orderedBy?.email}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                      {item.orderedBy?.address || "ไม่ได้ระบุที่อยู่"}
                    </p>
                  </div>
                </td>

                {/* รายการสินค้าภายในบิล */}
                <td className="px-6 py-5 w-85">
                  <ul className="space-y-1.5">
                    {item.products?.map((p, idx) => (
                      <li
                        key={idx}
                        className={`bg-slate-50/40 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 border border-slate-100/50 inline-flex items-center gap-1.5 mr-2 ${innerItem}`}
                      >
                        <span className="font-black text-slate-700">
                          {p.product?.title}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          ({p.count} × ฿
                          {Number(p.product?.price).toLocaleString()})
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>

                {/* ราคารวมสุทธิ */}
                <td className="px-6 py-5 text-base font-bold text-sky-500 tracking-tight">
                  ฿{Number(item.amount).toLocaleString()}
                </td>

                {/* วันที่และเวลาที่อัปเดตบิล */}
                <td className="px-6 py-5 text-xs text-slate-400 font-bold">
                  {new Date(item.updatedAt).toLocaleString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                {/* แสดงสถานะปัจจุบัน */}
                <td className="px-6 py-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border inline-block w-28 text-center ${changeStatusColor(item.orderStatus)}`}
                  >
                    {item.orderStatus}
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  <div className="relative inline-block w-full">
                    <select
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                      value={item.orderStatus}
                      className={`w-full px-3 py-1.5 rounded-xl font-bold text-xs text-slate-600 outline-none border border-transparent focus:border-sky-300/40 transition-all cursor-pointer appearance-none text-center ${claySelect}`}
                    >
                      <option value="Not Process">Not Process</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
