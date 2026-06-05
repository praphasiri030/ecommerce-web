import { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
import ClayButton from "../../components/common/ClayButton";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "กรุณากรอกอีเมล").email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),
});

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleOnchane = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });

      setFormErrors(errors);
      toast.error("ข้อมูลไม่ถูกต้อง กรุณาเช็กอีกครั้ง");
      return;
    }

    try {
      const res = await actionLogin(form);
      const role = res.data.paylode.role;
      roleRedirect(role);
      toast.success("Welcome Back");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  const clayInput =
    "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] bg-slate-50/50";

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-sky tracking-tight drop-shadow-sm">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        {/* ช่องกรอก Email */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-black text-slate-500 pl-1">
            Email
          </label>
          <input
            onChange={handleOnchane}
            type="text"
            name="email"
            value={form.email}
            placeholder="example@mail.com"
            className={`w-full px-5 py-3 rounded-2xl font-bold text-slate-700 placeholder-slate-300 outline-none border-2 transition-all ${
              formErrors.email
                ? "border-rose-400 focus:border-rose-400"
                : "border-transparent focus:border-sky/40"
            } ${clayInput}`}
          />
          {formErrors.email && (
            <span className="text-xs font-bold text-rose-500 pl-2 animate-pulse">
              {formErrors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-black text-slate-500 pl-1">
            Password
          </label>
          <input
            onChange={handleOnchane}
            type="password"
            name="password"
            value={form.password}
            placeholder="••••••••"
            className={`w-full px-5 py-3 rounded-2xl font-bold text-slate-700 placeholder-slate-300 outline-none border-2 transition-all ${
              formErrors.password
                ? "border-rose-400 focus:border-rose-400"
                : "border-transparent focus:border-sky/40"
            } ${clayInput}`}
          />
          {formErrors.password && (
            <span className="text-xs font-bold text-rose-500 pl-2 animate-pulse">
              {formErrors.password}
            </span>
          )}
        </div>

        <div className="pt-2 text-center">
          <ClayButton type="submit" className="w-full" color="sky">
            Login
          </ClayButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
