import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { listUserCart, saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClayButton from "../../components/common/ClayButton";
import { MapPin, ShoppingBag, CreditCard } from "lucide-react";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, seCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  const handleGetUserCart = async (token) => {
    try {
      const res = await listUserCart(token);
      setProducts(res.data.products);
      seCartTotal(res.data.cartTotal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      handleGetUserCart(token);
    }
  }, []);

  const handleSaveAddress = async () => {
    if (!address) {
      return toast.warning("กรุณากรอกที่อยู่");
    }

    try {
      const res = await saveAddress(token, address);
      toast.success(res.data.message);
      setAddressSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่");
    }
    navigate("/user/payment");
  };

  const clayCard =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.02)] shadow-[0_8px_24px_rgba(0,0,0,0.02)] bg-white";
  const clayInput =
    "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] bg-slate-50/50";
  const innerItem =
    "shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.01)] border border-slate-100/80";

  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* ฝั่งซ้าย */}
        <div className="w-full lg:w-1/2">
          <div className={`p-6 rounded-[28px] border border-white ${clayCard}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 bg-sky-100 rounded-xl text-sky-500">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-lg font-black text-slate-600 tracking-wide">
                  ที่อยู่จัดส่ง
                </h1>
              </div>

              <textarea
                onChange={(e) => setAddress(e.target.value)}
                placeholder="กรุณากรอกที่อยู่จัดส่งของคุณ..."
                required
                rows={6}
                className={`w-full px-4 py-3.5 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 transition-all resize-none h-48 ${clayInput}`}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <ClayButton
                onClick={handleSaveAddress}
                color={addressSaved ? "pink" : "sky"}
                className="w-fit px-8 py-3 rounded-2xl text-xs font-black tracking-wide"
              >
                <span>
                  {addressSaved
                    ? "อัปเดตที่อยู่จัดส่งสำเร็จ"
                    : "บันทึกที่อยู่จัดส่ง"}
                </span>
              </ClayButton>
            </div>
          </div>
        </div>

        {/* ฝั่งขวา */}
        <div className="w-full lg:w-1/2">
          <div
            className={`p-6 rounded-[28px] border border-white flex flex-col justify-between h-full ${clayCard}`}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-pink-100 rounded-xl text-pink-400">
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-lg font-black text-slate-600 tracking-wide">
                  คำสั่งซื้อของคุณ
                </h1>
              </div>

              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                {products?.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white p-4 rounded-2xl flex justify-between items-center ${innerItem}`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-black text-slate-700 text-sm tracking-wide">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-slate-400 font-bold">
                        จำนวน:{" "}
                        <span className="text-slate-600">{item.count}</span> × ฿
                        {Number(item.product.price).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-700 text-sm">
                        ฿
                        {Number(
                          item.count * item.product.price,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-100 space-y-4">
              <div className="space-y-2 text-slate-500 font-bold text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">ค่าส่ง</span>
                  <span className="text-slate-600 font-black">฿50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">ส่วนลด</span>
                  <span className="text-pink-400 font-black">- ฿50</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-black text-slate-500">
                  รวมสุทธิ
                </span>
                <span className="text-xl font-black text-sky-500 tracking-tight">
                  ฿{Number(cartTotal).toLocaleString()}
                </span>
              </div>

              <div className="pt-2 flex justify-center">
                <ClayButton
                  onClick={handleToPayment}
                  color="sky"
                  className="w-fit px-10 py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 stroke-[2.5]" />
                  <span>ดำเนินการชำระเงิน</span>
                </ClayButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
