import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import ClayButton from "../common/ClayButton";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtocart);

  const isOutOfStock = item.quantity <= 0;

  const clayCard =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.8),inset_-6px_-6px_12px_rgba(0,0,0,0.06)] shadow-[0_10px_20px_rgba(0,0,0,0.04)]";

  return (
    <div
      className={`bg-white rounded-[24px] border-[3px] border-white p-3 w-[180px] transition-all duration-200 ${
        isOutOfStock ? "opacity-75" : "hover:-translate-y-1"
      } ${clayCard}`}
    >
      {/* Image Container */}
      <div className="overflow-hidden w-full h-28 bg-slate-50 rounded-2xl border-2 border-slate-100 shadow-inner relative group">
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center p-2">
            <span className="bg-pink text-rose-700 text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.15)] shadow-[0_4px_10px_rgba(225,29,72,0.2)] animate-pulse">
              สินค้าหมด
            </span>
          </div>
        )}

        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className={`w-full h-full rounded-2xl object-cover object-center transition duration-300 ${
              isOutOfStock ? "grayscale-[40%]" : "group-hover:scale-110"
            }`}
          />
        ) : (
          <div className="w-full h-full bg-sky/30 text-sky-800 font-black text-xs text-center flex items-center justify-center tracking-wider uppercase">
            No Image
          </div>
        )}
      </div>

      {/* Product Specs */}
      <div className="py-2.5 px-1 flex flex-col justify-between min-h-[76px]">
        <div>
          <h3
            className={`text-sm font-bold ${isOutOfStock ? "text-slate-400" : "text-slate-700"}`}
          >
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Price & Cart Actions */}
      <div className="flex justify-between items-center bg-slate-50/70 p-1.5 rounded-xl border border-slate-100 mt-1">
        <span
          className={`text-sm font-black pl-1 ${isOutOfStock ? "text-slate-400" : "text-slate-700"}`}
        >
          ฿{Number(item.price).toLocaleString()}
        </span>

        <ClayButton
          onClick={() => !isOutOfStock && actionAddtoCart(item)}
          className="!p-2 rounded-xl disabled:opacity- disabled:pointer-events-none"
          disabled={isOutOfStock}
          color={isOutOfStock ? "gray" : "sky"}
        >
          <ShoppingCart className="w-4 h-4" />
        </ClayButton>
      </div>
    </div>
  );
};

export default ProductCard;
