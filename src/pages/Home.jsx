import BestSeller from "../components/home/BestSeller";
import ContentCarousel from "../components/home/ContentCarousel";
import NewProduct from "../components/home/NewProdect";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-sky/10 via-white to-pink/10 min-h-screen pb-16">
      {/*แบนเนอร์*/}
      <ContentCarousel />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-12 space-y-14">
        {/* สินค้าขายดี */}
        <div className="space-y-4">
          <div className="flex items-center justify-center pl-2">
            <h2 className="text-xl font-black text-slate-700 tracking-wide">
              สินค้าขายดีฮิตติดลมบน
            </h2>
          </div>
          <BestSeller />
        </div>

        {/* สินค้าใหม่ */}
        <div className="space-y-4">
          <div className="flex items-center justify-center pl-2">
            <h2 className="text-xl font-black text-slate-700 tracking-wide">
              สินค้ามาใหม่ล่าสุด
            </h2>
          </div>
          <NewProduct />
        </div>
      </div>
    </div>
  );
};

export default Home;
