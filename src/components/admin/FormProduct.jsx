import { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useNavigate } from "react-router-dom";
import ClayButton from "../common/ClayButton";
import { PackagePlus, Edit3, Trash2 } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  images: [],
  categoryId: "",
};

const FormProduct = () => {
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      setForm(initialState);
      await getProduct(20);
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ยืนยันการลบข้อมูลสินค้าชิ้นนี้?")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success(`ลบสินค้า ${res.data.title} สำเร็จ`);
        await getProduct(20);
      } catch (error) {
        console.log(error);
        toast.error("ไม่สามารถลบสินค้าได้");
      }
    }
  };

  const clayCard =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.02)] shadow-[0_8px_24px_rgba(0,0,0,0.02)] bg-white";
  const clayInput =
    "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] bg-slate-50/50";
  const itemShadow =
    "shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.02)]";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* เพิ่มข้อมูลสินค้า */}
      <div className={`p-8 rounded-[28px] border border-white ${clayCard}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-sky-100 rounded-xl text-sky-500">
            <PackagePlus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-slate-600 tracking-wide">
            เพิ่มรายการสินค้าใหม่
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

              {/* อัปโหลดไฟล์รูปภาพ */}
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
              <span>บันทึกข้อมูลสินค้าเข้าสู่คลัง</span>
            </ClayButton>
          </div>
        </form>
      </div>

      {/* ตารางแสดงรายการสินค้า */}
      <div
        className={`p-6 rounded-[28px] border border-white overflow-hidden ${clayCard}`}
      >
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-inner">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-50/80 border-b-2 border-white text-slate-400 text-xs font-black uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-center w-16">ลำดับ</th>
                <th className="px-6 py-4">ข้อมูลสินค้า</th>
                <th className="px-6 py-4 text-center w-28">รูปภาพ</th>
                <th className="px-6 py-4 w-32">หมวดหมู่</th>
                <th className="px-6 py-4 w-28">ราคา</th>
                <th className="px-6 py-4 w-32">คลัง / ขายแล้ว</th>
                <th className="px-6 py-4 w-40">วันที่อัปเดต</th>
                <th className="px-6 py-4 text-center w-28">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 font-bold text-sm">
              {products.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-center text-slate-400 font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-black text-slate-700">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 font-medium truncate max-w-[200px] mt-0.5">
                      {item.description || "- ไม่มีคำอธิบาย -"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className={`w-16 h-16 object-cover rounded-xl border border-white ${itemShadow}`}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-slate-100 border border-dashed border-slate-200 text-xs font-medium text-slate-400">
                          ไม่มีรูปภาพ
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-black border border-sky-100/40">
                      {item.category?.name || "ทั่วไป"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-black">
                    ฿{Number(item.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 max-w-[100px]">

                      <div className="px-2 py-0.5 bg-slate-100/80 border border-slate-200/40 rounded-md text-[11px] font-black text-slate-600 flex justify-between">
                        <span className="text-slate-400 font-medium">คลัง</span>
                        <span>{item.quantity}</span>
                      </div>

      
                      <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100/60 rounded-md text-[11px] font-black flex justify-between">
                        <span className="text-emerald-400 font-medium">
                          ขาย
                        </span>
                        <span>{item.sold || 0}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                    {new Date(item.updatedAt).toLocaleString("th-TH", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => navigate(`/admin/product/${item.id}`)}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                        title="แก้ไขสินค้า"
                      >
                        <Edit3 className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                        title="ลบสินค้า"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormProduct;
