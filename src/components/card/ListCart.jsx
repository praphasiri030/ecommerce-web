import { ListCheck, ArrowLeft, ShieldCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import ClayButton from "../common/ClayButton";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const token = useEcomStore((state) => state.token);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    try {
      const res = await createUserCart(token, { cart });
      toast.success("บันทึกใส่ตะกร้าแล้ว ");
      navigate("/checkout");
    } catch (error) {
      console.log(error);
      toast.warning(error.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  const clayBoxShadow =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.8),inset_-6px_-6px_12px_rgba(0,0,0,0.04)] shadow-[0_12px_24px_rgba(0,0,0,0.03)]";
  const isCartEmpty = cart.length < 1;

  return (
    <div className="space-y-6">
      {/* ส่วนหัวของหน้าสรุปรายการ */}
      <div className="flex items-center gap-3 pl-2">
        <div className="p-2.5 bg-sky/20 rounded-2xl text-sky-900 border border-white">
          <ListCheck className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-700 tracking-wide">
            ตะกร้าสินค้าของคุณ
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-0.5">
            มีนาทีทองรอคุณอยู่ทั้งหมด {cart.length} รายการ
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ==================== ฝั่งซ้าย: ลิสต์รายการสินค้า ==================== */}
        <div className="w-full lg:w-2/3 space-y-3">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className={`bg-white border-[3px] border-white p-4 rounded-[24px] flex items-center justify-between transition-all hover:scale-[1.01] ${clayBoxShadow}`}
              >
                <div className="flex items-center gap-4">
                  {/* รูปภาพสินค้า */}
                  <div className="w-20 h-16 bg-slate-50 border-2 border-slate-100 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full bg-sky/20 text-[10px] font-black text-sky-800 flex items-center justify-center tracking-wider">
                        NO IMAGE
                      </div>
                    )}
                  </div>

                  {/* รายละเอียดสินค้า */}
                  <div>
                    <h3 className="text-base font-black text-slate-700">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">
                      ฿{Number(item.price).toLocaleString()} x{" "}
                      <span className="text-sky-600 font-bold px-1.5 py-0.5 rounded-md text-[11px]">
                        {item.count} ชิ้น
                      </span>
                    </p>
                  </div>
                </div>

                {/* ราคารวมรวมรายชิ้น */}
                <div className="text-right pr-2">
                  <span className="text-sm font-bold text-slate-400 block text-[10px] uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="text-base font-black text-slate-700">
                    ฿{(item.price * item.count).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`bg-white/60 border-4 border-dashed border-slate-200 p-12 rounded-[32px] text-center text-slate-400 font-bold ${clayBoxShadow}`}
            >
              ไม่มีสินค้าในตะกร้า
            </div>
          )}
        </div>

        {/*สรุปยอดรวม*/}
        <div
          className={`w-full lg:w-1/3 bg-pink/20 border-4 border-white p-6 rounded-[32px] flex flex-col justify-between ${clayBoxShadow}`}
        >
          <div>
            <h2 className="text-lg font-black text-rose-900 border-b-2 border-white/40 pb-2 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-800" />
              สรุปคำสั่งซื้อ
            </h2>

            <div className="space-y-3 bg-white/50 border border-white/60 p-4 rounded-2xl mb-5 shadow-sm">
              <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                <span>จำนวนรวม</span>
                <span>
                  {cart.reduce((acc, item) => acc + item.count, 0)} ชิ้น
                </span>
              </div>
              <div className="border-t border-dashed border-slate-300/60 my-2"></div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-black text-rose-950">
                  รวมสุทธิ
                </span>
                <span className="text-xl font-black text-rose-900">
                  ฿{Number(getTotalPrice()).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {user ? (
              <ClayButton
                disabled={isCartEmpty}
                onClick={handleSaveCart}
                color="pink"
                className="w-full text-base py-3 rounded-2xl hover:scale-[1.02]"
              >
                สั่งซื้อสินค้า
              </ClayButton>
            ) : (
              <ClayButton
                color="sky"
                className="w-full text-base py-3 rounded-2xl hover:scale-[1.02]"
                onClick={() => navigate("/auth")} // ใช้ navigate ตรงนี้แทนการใช้ <Link> ครอบ
              >
                เข้าสู่ระบบเพื่อสั่งซื้อ
              </ClayButton>
            )}

            <Link to="/shop" className="block w-full">
              <button className="w-full flex items-center justify-center gap-1.5 text-xs font-black text-slate-500 hover:text-sky-800 transition-colors py-2 group">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
