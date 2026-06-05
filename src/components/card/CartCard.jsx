import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import ClayButton from "../common/ClayButton";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity,
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct,
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const isCartEmpty = carts.length === 0;

  const clayInput =
    "shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] bg-slate-50";

  return (
    <div className="flex flex-col h-full text-slate-700 justify-between">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header ตะกร้า */}
        <div className="flex items-center gap-2 pb-1 border-b-2 border-white/40 mb-3">
          <ShoppingBag className="w-5 h-5 text-rose-800" />
          <h1 className="text-lg font-black text-rose-900 tracking-wide">
            ตะกร้าสินค้า
          </h1>
        </div>

        {/* รายการสินค้าในตะกร้า  */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 pb-4">
          {carts.length > 0 ? (
            carts.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 rounded-2xl p-2.5 border border-white/60 shadow-sm flex flex-col gap-2.5"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex gap-2.5">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].url}
                        className="w-14 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-14 h-12 bg-pink/20 rounded-xl text-[10px] font-black text-rose-800 text-center flex items-center justify-center">
                        No Pic
                      </div>
                    )}

                    <div className="max-w-[120px]">
                      <p className="text-xs font-black text-slate-700 truncate">
                        {item.title}
                      </p>
                      <span className="text-[10px] font-bold text-slate-400 line-clamp-1">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => actionRemoveProduct(item.id)}
                    className="text-rose-500 hover:text-rose-700 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* ตัวปรับจำนวนและราคา */}
                <div className="flex justify-between items-center bg-slate-50/60 p-1 rounded-xl border border-slate-100/50">
                  <div
                    className={`flex items-center rounded-lg px-1 ${clayInput}`}
                  >
                    <button
                      className="p-1 text-slate-500 hover:text-slate-800 transition-colors active:scale-75"
                      onClick={() =>
                        actionUpdateQuantity(item.id, item.count - 1)
                      }
                    >
                      <Minus size={12} className="stroke-[3]" />
                    </button>
                    <span className="text-xs font-black text-slate-700 px-2 min-w-[16px] text-center">
                      {item.count}
                    </span>
                    <button
                      className="p-1 text-slate-500 hover:text-slate-800 transition-colors active:scale-75"
                      onClick={() =>
                        actionUpdateQuantity(item.id, item.count + 1)
                      }
                    >
                      <Plus size={12} className="stroke-[3]" />
                    </button>
                  </div>
                  <div className="text-xs font-black text-slate-700 pr-1">
                    ฿{(item.price * item.count).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xs font-bold text-rose-700/60 py-12">
              ตะกร้าว่างเปล่าอยู่นะจ๊ะ
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t-2 border-white/40 bg-pink/5 space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-black text-rose-950">
            ราคารวมทั้งสิ้น
          </span>
          <span className="text-base font-black text-rose-900">
            ฿{Number(getTotalPrice()).toLocaleString()}
          </span>
        </div>

        {isCartEmpty ? (
          <ClayButton
            disabled={true}
            color="pink"
            className="w-full font-black text-sm rounded-2xl"
          >
            ชำระเงิน
          </ClayButton>
        ) : (
          <Link to="/cart" className="block w-full">
            <ClayButton
              color="pink"
              className="w-full font-black text-sm rounded-2xl hover:scale-[1.02]"
            >
              ชำระเงิน
            </ClayButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartCard;
