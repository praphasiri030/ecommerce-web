import React, { useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { CircleX, Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const handleOnChange = async (e) => {
    const files = e.target.files;

    if (!files) return;

    setIsLoading(true);

    let allFiles = [
      ...form.images
    ];

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`);
          return;
        }

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 720,
          useWebWorker: true,
        };

        // compress
        const compressedFile = await imageCompression(file, options);

        // convert base64
        const base64data = await new Promise((resolve) => {
          const reader = new FileReader();

          reader.readAsDataURL(compressedFile);

          reader.onloadend = () => {
            resolve(reader.result);
          };
        });

        // upload
        const res = await uploadFiles(token, base64data);

        return res.data;
      });

      const uploadedImages = await Promise.all(uploadPromises);

      allFiles = [
        ...allFiles,
         ...uploadedImages.filter(Boolean)
        ];

      setForm({
        ...form,
        images: allFiles,
      });
    } catch (err) {
      console.log(err);
      toast.error("Upload ไม่สำเร็จ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (public_id) => {
    try {
      setLoadingId(public_id);

      await removeFiles(token, public_id);

      const filterImages = form.images.filter(
        (item) => item.public_id !== public_id,
      );

      setForm({
        ...form,
        images: filterImages,
      });

      toast.success("ลบรูปสำเร็จ");
    } catch (error) {
      console.log(error);
      toast.error("ลบรูปไม่สำเร็จ");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="my-4">
      <div className="flex my-4 gap-4">
        {isLoading && <Loader className="h-10 w-10 animate-spin" />}

        {form.images.map((item, index) => (
          <div
            className={`relative ${
              loadingId === item.public_id
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
            key={index}
          >
            <img
              src={item.secure_url || item.url}
              alt=""
              className="w-24 h-24 object-cover hover:scale-105 transition"
            />

            {loadingId === item.public_id ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <CircleX
                onClick={() => handleDelete(item.public_id)}
                className="absolute top-0 right-0 text-red-500 cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>
      <div>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default Uploadfile;
