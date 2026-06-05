import { useEffect, useState } from "react";
import { payment } from "../../api/payment";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";
import { CreditCard, Loader2, AlertCircle } from "lucide-react";

const Payment = () => {
  const token = useEcomStore((s) => s.token);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    payment(token)
      .then((res) => {
        // console.log("Mock Secret:", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const clayCard =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.02)] shadow-[0_8px_24px_rgba(0,0,0,0.02)] bg-white";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 w-full max-w-md mx-auto min-h-[300px]">
        <Loader2 className="w-8 h-8 text-sky-400 animate-spin stroke-[2.5] mb-3" />
        <p className="text-sm font-black text-slate-400 tracking-wide">
          กำลังเตรียมระบบชำระเงิน...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-md w-full mx-auto p-6 rounded-[28px] border border-white ${clayCard}`}
    >
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="p-3 bg-sky-100 rounded-2xl text-sky-500 shadow-inner">
          <CreditCard className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h2 className="text-xl font-black text-slate-600 tracking-wide mt-2">
          ชำระเงินผ่านบัตรเครดิต
        </h2>
        <p className="text-[10px] text-pink-400 font-black uppercase tracking-widest bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100/50">
          Sandbox Test Mode
        </p>
      </div>

      {clientSecret ? (
        <CheckoutForm clientSecret={clientSecret} />
      ) : (
        <div className="flex items-center justify-center gap-2 text-rose-500 font-black text-sm p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
          <AlertCircle className="w-4 h-4 stroke-[2.5]" />
          <span>เกิดข้อผิดพลาด ไม่สามารถดึงข้อมูลบิลได้</span>
        </div>
      )}
    </div>
  );
};

export default Payment;
