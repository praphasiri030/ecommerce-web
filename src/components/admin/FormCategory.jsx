import { useState, useEffect } from "react";
import { createCategory, removeCategory } from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import ClayButton from "../common/ClayButton"; // ดึงปุ่มดินน้ำมันสุดคิวต์มาใช้
import { Plus, Trash2, FolderOpen  } from "lucide-react";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("กรุณากรอกชื่อหมวดหมู่");
    }

    try {
      const res = await createCategory(token, { name });
      toast.success(`เพิ่มหมวดหมู่ ${res.data.name} สำเร็จ !!`);
      setName("");
      getCategory(token);
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่");
    }
  };

  const handleRemove = async (id, catName) => {
    // ใส่กล่อง Confirm ป้องกันมือลั่นกดโดนโดยไม่ตั้งใจ
    if (!window.confirm(`คุณแน่ใจนะว่าจะลบหมวดหมู่ "${catName}" ?`)) return;

    try {
      const res = await removeCategory(token, id);
      toast.success(`ลบหมวดหมู่เรียบร้อยแล้ว`);
      getCategory(token);
    } catch (error) {
      console.log(error);
      toast.error("ลบไม่สำเร็จ มีสินค้าผูกกับหมวดหมู่นี้อยู่หรือเปล่า?");
    }
  };


  const clayCard = "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.02)] shadow-[0_8px_24px_rgba(0,0,0,0.03)]";
  const clayInput = "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] bg-slate-50/50";
  const itemShadow = "shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),0_4px_10px_rgba(0,0,0,0.02)]";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* ส่วนหัวการ์ดเพิ่มหมวดหมู่ */}
      <div className={`bg-white p-6 rounded-[28px] border border-white ${clayCard}`}>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 bg-sky-100 rounded-xl text-sky-500">
            <FolderOpen  className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-slate-600 tracking-wide">
            จัดการหมวดหมู่สินค้า
          </h2>
        </div>

        <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
          <div className="flex-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="พิมพ์ชื่อหมวดหมู่ใหม่ที่นี่... (เช่น โดนัท, เค้ก)"
              className={`w-full px-5 py-3 rounded-2xl font-bold text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/50 transition-all ${clayInput}`}
            />
          </div>
          

          <ClayButton 
            type="submit" 
            color="sky" 
            className="w-full sm:w-auto px-6 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>เพิ่มหมวดหมู่</span>
          </ClayButton>
        </form>
      </div>


      <div className={`bg-white p-6 rounded-[28px] border border-white ${clayCard}`}>
        <div className="mb-4">
          <h3 className="text-sm font-black text-slate-400 tracking-wider uppercase">
            หมวดหมู่ทั้งหมด ({categories.length})
          </h3>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-10 text-slate-300 font-bold text-sm">
            ยังไม่มีหมวดหมู่สินค้าในระบบ
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white border border-slate-100 p-3.5 pl-5 rounded-2xl flex justify-between items-center ${itemShadow} hover:scale-[1.01] transition-transform`}
              >
                {/* ชื่อหมวดหมู่ */}
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-pink-300 animate-pulse" />
                  <span className="font-black text-slate-600 text-sm tracking-wide">
                    {item.name}
                  </span>
                </div>
                

                <ClayButton
                  onClick={() => handleRemove(item.id, item.name)}
                  color="pink"
                  className=" rounded-xl text-xs flex items-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>ลบ</span>
                </ClayButton>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default FormCategory;