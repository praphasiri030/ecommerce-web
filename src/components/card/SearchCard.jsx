import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Search, SlidersHorizontal, Tag } from "lucide-react";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters,
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 5000]);

  useEffect(() => {
    getCategory();
  }, []);

  // Search by Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // Search by Category
  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const instate = [...categorySelected];
    const findCheck = instate.indexOf(inCheck);

    if (findCheck === -1) {
      instate.push(inCheck);
    } else {
      instate.splice(findCheck, 1);
    }
    setCategorySelected(instate);

    if (instate.length > 0) {
      actionSearchFilters({ category: instate });
    } else {
      getProduct();
    }
  };

  // Search by Price
  useEffect(() => {
    const delay = setTimeout(() => {
      actionSearchFilters({ price });
    }, 300);
    return () => clearTimeout(delay);
  }, [price]);

  const clayInput =
    "shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] bg-white/70";

  return (
    <div className="space-y-5 text-slate-700">
      <div className="flex items-center gap-2 pb-1 border-b-2 border-white/40">
        <SlidersHorizontal className="w-5 h-5 text-sky-800" />
        <h1 className="text-lg font-black text-sky-900 tracking-wide">
          ค้นหาสินค้า
        </h1>
      </div>

      {/* ค้นหาข้อความ */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="ค้นหาสินค้าชิ้นโปรด..."
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 placeholder-slate-400 outline-none border-2 border-transparent focus:border-sky/40 transition-all ${clayInput}`}
        />
      </div>

      {/* ค้นหาหมวดหมู่ */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 pl-1">
          <Tag className="w-4 h-4 text-sky-800" />
          <h2 className="text-sm font-black text-sky-900 uppercase tracking-wider">
            หมวดหมู่สินค้า
          </h2>
        </div>
        <div className="bg-white/50 border border-white/60 p-3 rounded-2xl space-y-2 max-h-40 overflow-y-auto shadow-sm">
          {categories.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer group py-0.5"
            >
              <input
                onChange={handleCheck}
                value={item.id}
                type="checkbox"
                className="w-4 h-4 accent-sky rounded-md cursor-pointer transition-transform group-hover:scale-110"
              />
              <span className="text-xs font-bold text-slate-600 group-hover:text-sky-900 transition-colors">
                {item.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ค้นหาราคา */}
      <div className="space-y-3">
        <h2 className="text-sm font-black text-sky-900 pl-1">ช่วงราคา (บาท)</h2>
        <div className="bg-white/50 border border-white/60 p-3 rounded-2xl shadow-sm space-y-4">
          <div className="flex gap-2.5">
            <input
              type="number"
              value={price[0]}
              onChange={(e) => setPrice([Number(e.target.value), price[1]])}
              placeholder="ต่ำสุด"
              className={`w-full px-3 py-1.5 rounded-xl font-bold text-xs text-center outline-none border border-transparent focus:border-sky/40 ${clayInput}`}
            />
            <span className="text-slate-400 self-center font-bold text-xs">
              ถึง
            </span>
            <input
              type="number"
              value={price[1]}
              onChange={(e) => setPrice([price[0], Number(e.target.value)])}
              placeholder="สูงสุด"
              className={`w-full px-3 py-1.5 rounded-xl font-bold text-xs text-center outline-none border border-transparent focus:border-sky/40 ${clayInput}`}
            />
          </div>

          <div className="px-2 pb-1.5">
            <Slider
              onChange={(value) => setPrice(value)}
              range
              min={0}
              max={100000}
              value={price}
              trackStyle={[{ backgroundColor: "#0284c7", height: 6 }]}
              handleStyle={[
                {
                  backgroundColor: "#ffffff",
                  borderColor: "#0284c7",
                  height: 16,
                  width: 16,
                  marginTop: -5,
                  opacity: 1,
                  boxShadow: "1px 2px 4px rgba(0,0,0,0.1)",
                },
                {
                  backgroundColor: "#ffffff",
                  borderColor: "#0284c7",
                  height: 16,
                  width: 16,
                  marginTop: -5,
                  opacity: 1,
                  boxShadow: "1px 2px 4px rgba(0,0,0,0.1)",
                },
              ]}
              railStyle={{ backgroundColor: "#e2e8f0", height: 6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
