import { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";
import ClayButton from "../common/ClayButton";
import { FileEdit, ArrowLeft } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  images: [],
  categoryId: "",
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log("res from backend", res);
      setForm(res.data);
    } catch (error) {
      console.log("erroe fatch data", error);
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProduct(token, id, form);
      toast.success(`อัพเดทข้อมูล ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
      setForm(initialState);
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const clayCard =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.02)] shadow-[0_8px_24px_rgba(0,0,0,0.02)] bg-white";
  const clayInput =
    "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] bg-slate-50/50";

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/admin/product")}
          className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-sky-500 transition-colors cursor-pointer px-1 py-2"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>ย้อนกลับไปคลังสินค้าหลัก</span>
        </button>
      </div>

      {/* ฟอร์มแก้ไขข้อมูลสินค้า */}
      <div className={`p-8 rounded-[28px] border border-white ${clayCard}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-pink-100 rounded-xl text-pink-400">
            <FileEdit className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-slate-600 tracking-wide">
            แก้ไขรายละเอียดสินค้า
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase pl-1 mb-1.5">
                  ชื่อสินค้า
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2.5 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 transition-all ${clayInput}`}
                  placeholder="ระบุชื่อสินค้า..."
                  value={form.title}
                  name="title"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase pl-1 mb-1.5">
                  รายละเอียดสินค้า
                </label>
                <textarea
                  className={`w-full px-4 py-2.5 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 transition-all h-[116px] resize-none ${clayInput}`}
                  placeholder="รายละเอียดและข้อมูลสำคัญของสินค้า..."
                  value={form.description}
                  name="description"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase pl-1 mb-1.5">
                    ราคา (บาท)
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 transition-all ${clayInput}`}
                    placeholder="0.00"
                    value={form.price}
                    name="price"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase pl-1 mb-1.5">
                    จำนวนในคลัง
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 rounded-2xl font-normal text-slate-700 placeholder-slate-300 outline-none border-2 border-transparent focus:border-sky-300/40 transition-all ${clayInput}`}
                    placeholder="0"
                    value={form.quantity}
                    name="quantity"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase pl-1 mb-1.5">
                    หมวดหมู่
                  </label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    className={`w-full px-4 py-2.5 rounded-2xl font-normal text-slate-600 outline-none border-2 border-transparent focus:border-sky-300/40 transition-all bg-white cursor-pointer ${clayInput}`}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="" disabled>
                      เลือกหมวดหมู่
                    </option>
                    {categories.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center pt-2">
                <Uploadfile form={form} setForm={setForm} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <ClayButton
              type="submit"
              color="sky"
              className="w-full py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2"
            >
              <span>บันทึกการเปลี่ยนแปลงรายละเอียดสินค้า</span>
            </ClayButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditProduct;
