import { useEffect, useState } from "react";
import { getsOrder } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { CalendarDays, CalendarClock, ShoppingBag } from "lucide-react";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  const hdlgetOrders = async (token) => {
    try {
      const res = await getsOrder(token);
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      hdlgetOrders(token);
    }
  }, [token]);

  const clayCardShadow =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.8),inset_-6px_-6px_12px_rgba(0,0,0,0.04)] shadow-[0_12px_24px_rgba(0,0,0,0.03)]";
  const clayBadgeShadow =
    "shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]";

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
      case "สำเร็จ":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "NotProcess":
      case "รอดำเนินการ":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Processing":
      case "กำลังผลิต":
        return "bg-sky/30 text-sky-800 border-sky/40";
      case "Cancelled":
      case "ยกเลิก":
        return "bg-pink text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* ส่วนหัวข้อหน้าจอ */}
      <div className="mb-8 pl-2 flex items-center gap-3">
        <div className="p-3 bg-pink/20 rounded-2xl text-rose-800 border border-white shadow-sm">
          <CalendarClock className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-700 tracking-wide">
            ประวัติการสั่งซื้อ
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-0.5">
            ตรวจสอบและติดตามสถานะรายการสั่งซื้อทั้งหมดของคุณ
          </p>
        </div>
      </div>

      {orders && orders.length > 0 ? (
        // ใช้ .slice().reverse() เพื่อกลับด้านอาเรย์ เอาข้อมูลใหม่ล่าสุด (ท้ายอาเรย์) ขึ้นมาแสดงด้านบนสุด
        orders
          .slice()
          .reverse()
          .map((item, index) => {
            return (
              <div key={index} className="mb-8">
                <div
                  className={`bg-white rounded-[32px] border-[3px] border-white overflow-hidden transition duration-200 hover:scale-[1.01] ${clayCardShadow}`}
                >
                  {/* หัวบิล */}
                  <div className="bg-sky/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b-2 border-white">
                    <div className="flex items-center gap-2 text-sky-900">
                      <CalendarDays className="w-4 h-4 stroke-[2.5]" />
                      <p className="text-xs font-black tracking-wide flex flex-wrap items-center gap-1">
                        <span>วันที่สั่งซื้อ:</span>
                        <span className="text-slate-700 font-bold ml-0.5">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                "th-TH",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "-"}
                        </span>
                      </p>
                    </div>

                    {/* สถานะบิล */}
                    <div>
                      <span
                        className={`text-[11px] font-black px-3 py-1 rounded-xl border-2 uppercase tracking-wider ${getStatusStyle(item.orderStatus)} ${clayBadgeShadow}`}
                      >
                        {item.orderStatus || "สำเร็จ"}
                      </span>
                    </div>
                  </div>

                  {/* รายการสินค้าในบิล */}
                  <div className="px-6 py-2 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b-2 border-slate-100 text-[11px] text-slate-400 font-black uppercase tracking-wider">
                          <th className="py-4 font-black">ชื่อสินค้า</th>
                          <th className="py-4 px-4 font-black text-center">
                            จำนวน
                          </th>
                          <th className="py-4 px-4 font-black text-right">
                            ราคา / ชิ้น
                          </th>
                          <th className="py-4 font-black text-right">
                            ราคารวม
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100 text-sm">
                        {item.products?.map((p, idx) => {
                          const totalProductPrice =
                            (p.product?.price || 0) * (p.count || 0);

                          return (
                            <tr
                              key={idx}
                              className="text-slate-600 hover:bg-slate-50/50 transition"
                            >
                              <td className="py-4.5">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-pink/20 text-rose-800 rounded-xl border border-white flex-shrink-0 flex items-center justify-center shadow-inner">
                                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                                  </div>
                                  <div>
                                    <h3 className="font-black text-slate-700 text-sm line-clamp-1">
                                      {p.product?.title || "สินค้าไม่มีชื่อ"}
                                    </h3>
                                  </div>
                                </div>
                              </td>

                              <td className="py-4.5 px-4 text-center font-black text-slate-700">
                                <span className="bg-slate-100 px-2.5 py-0.5 rounded-lg text-xs border border-slate-200/40">
                                  {p.count || 0}
                                </span>
                              </td>

                              <td className="py-4.5 px-4 text-right font-bold text-slate-400 text-xs">
                                ฿{(p.product?.price || 0).toLocaleString()}
                              </td>

                              <td className="py-4.5 text-right font-black text-slate-700">
                                ฿{totalProductPrice.toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* ท้ายบิล */}
                  <div className="bg-slate-50/50 px-6 py-4 flex items-center justify-end border-t-2 border-slate-100">
                    <div className="flex items-center gap-2 bg-white/80 border border-slate-200/50 px-4 py-1.5 rounded-xl shadow-sm">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                        ราคารวมสุทธิ:
                      </span>
                      <span className="text-base font-black text-rose-900">
                        ฿{(item.cartTotal || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div
          className={`bg-white/60 border-4 border-dashed border-slate-200 p-16 rounded-[32px] text-center text-slate-400 font-bold ${clayCardShadow}`}
        >
          ยังไม่มีประวัติการสั่งซื้อ
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
