import { useState } from "react";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClayButton from "../components/common/ClayButton";
import { Loader2, ShieldCheck } from "lucide-react";

const CheckoutForm = ({ clientSecret }) => {
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);

  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    setTimeout(() => {
      let payload = {};
      const cleanCardNumber = cardNumber.replace(/\s/g, "");

      if (cleanCardNumber === "4242424242424242") {
        payload = {
          paymentIntent: {
            status: "succeeded",
          },
        };
      } else if (cleanCardNumber === "5555555555555555") {
        payload = {
          error: { message: "วงเงินในบัตรของคุณไม่พอสำหรับการชำระเงิน" },
        };
      } else {
        payload = {
          error: { message: "ข้อมูลหมายเลขบัตรไม่ถูกต้อง" },
        };
      }

      if (payload.error) {
        setMessage(payload.error.message);
        toast.error(payload.error.message);
        setIsLoading(false);
      } else if (payload.paymentIntent.status === "succeeded") {
        const mockDataForBackend = {
          clientSecret: clientSecret,
          cardNumber: cardNumber,
        };

        saveOrder(token, mockDataForBackend)
          .then((res) => {
            // console.log(res);
            toast.success("ชำเงินสำเร็จ!!!");
            clearCart();
            navigate("/user/history");
          })
          .catch((err) => {
            console.log(err);
            if (err.response && err.response.data) {
              toast.error(`จ่ายเงินไม่สำเร็จ: ${err.response.data.message}`);
            } else {
              toast.error("เซิร์ฟเวอร์ขัดข้อง ไม่สามารถบันทึกรายการได้");
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        toast.warning("ชำระเงินไม่สำเร็จ");
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleCardFormat = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = input.match(/.{1,4}/g)?.join(" ") || input;
    setCardNumber(formatted.substring(0, 19));
  };

  const clayInput =
    "shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] bg-slate-50/50";

  return (
    <div className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black text-slate-400 block mb-1.5 uppercase tracking-wider pl-1">
              Card Number
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 transition-all ${clayInput}`}
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={handleCardFormat}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-slate-400 block mb-1.5 uppercase tracking-wider pl-1">
                Expiration Date
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 text-center transition-all ${clayInput}`}
                placeholder="MM / YY"
                maxLength="5"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 block mb-1.5 uppercase tracking-wider pl-1">
                CVC
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 text-center transition-all ${clayInput}`}
                placeholder="•••"
                maxLength="3"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <ClayButton
            type="submit"
            color="sky"
            disabled={isLoading || !cardNumber || !cardExpiry || !cardCvc}
            className={`w-fit px-12 py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 ${
              isLoading || !cardNumber || !cardExpiry || !cardCvc
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                <span>กำลังประมวลผล</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>ยืนยันยอดชำระเงิน</span>
              </>
            )}
          </ClayButton>
        </div>

        {/* บล็อกแสดงข้อความ Error แจ้งเตือนใต้ฟอร์ม */}
        {message && (
          <div className="text-xs text-center font-bold mt-2 p-3 bg-rose-50 text-rose-500 border border-rose-100 rounded-xl">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
