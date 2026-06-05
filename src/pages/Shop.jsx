import { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  const clayContainerShadow = "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.03)] shadow-[0_12px_24px_rgba(0,0,0,0.03)]";

  return (
    <div className="flex bg-gradient-to-br from-sky/10 via-white to-pink/10 min-h-[calc(100vh-64px)] p-6 gap-6">
      
      {/* Searchbar */}
      <div className={`w-1/4 bg-sky/20 border-4 border-white rounded-[32px] p-5 h-[calc(100vh-112px)] sticky top-20 overflow-y-auto ${clayContainerShadow}`}>
        <SearchCard />
      </div>
      
      {/* Product List */}
      <div className="w-1/2 flex flex-col h-[calc(100vh-112px)]">
        <div className="mb-4 pl-2">
          <h2 className="text-xl font-black text-slate-700 tracking-wide">สินค้าทั้งหมด</h2>
          <p className="text-xs font-bold text-slate-400 mt-0.5">สินค้า ({products.length} รายการ)</p>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 pb-6 flex flex-wrap gap-4 items-start content-start justify-center md:justify-start">
          {products.length > 0 ? (
            products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          ) : (
            <div className="w-full bg-white/60 text-slate-400 font-bold text-center py-12 border-4 border-dashed border-slate-200/60 rounded-[24px]">
              ไม่พบสินค้าที่คุณค้นหา
            </div>
          )}
        </div>
      </div>
      
      {/* Cart Sidebar */}
      <div className={`w-1/4 bg-pink/30 border-4 border-white rounded-[32px] p-5 h-[calc(100vh-112px)] sticky top-20 flex flex-col justify-between overflow-y-auto ${clayContainerShadow}`}>
        <CartCard />
      </div>
      
    </div>
  );
};

export default Shop;