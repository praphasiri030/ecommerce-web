import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ClayButton from "../../components/common/ClayButton";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const clayContainerShadow =
    "shadow-[inset_12px_12px_24px_rgba(255,255,255,0.7),inset_-12px_-12px_24px_rgba(0,0,0,0.06)] shadow-[0_20px_40px_rgba(0,0,0,0.05)]";

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-50 to-blue-100 p-4 overflow-hidden">
      <div
        className={`relative w-full max-w-4xl h-[550px] bg-white rounded-[50px] border-4 border-white overflow-hidden transition-all duration-300 ${clayContainerShadow}`}
      >
        <div
          className="absolute top-0 w-1/2 h-full flex flex-col justify-center px-8 md:px-12 transition-all duration-500 ease-in-out z-10"
          style={{
            left: isLogin ? "0%" : "50%",
          }}
        >
          {isLogin ? <Login /> : <Register />}
        </div>

        <div
          className="absolute top-0 w-1/2 h-full bg-sky text-white flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-500 ease-in-out z-20"
          style={{
            left: isLogin ? "50%" : "0%",
            borderTopLeftRadius: isLogin ? "180px" : "50px",
            borderBottomLeftRadius: isLogin ? "180px" : "50px",
            borderTopRightRadius: isLogin ? "50px" : "180px",
            borderBottomRightRadius: isLogin ? "50px" : "180px",
            boxShadow: isLogin
              ? "inset 10px 10px 18px rgba(255, 255, 255, 0.47), inset -10px -10px 18px rgba(0, 0, 0, 0.2)"
              : "inset -10px 10px 18px rgba(255, 255, 255, 0.47), inset 10px -10px 18px rgba(0, 0, 0, 0.2)",
          }}
        >
          {isLogin ? (
            <div className="text-center space-y-5">
              <h2 className="text-4xl font-black text-white drop-shadow-sm tracking-wide">
                Welcome Back!
              </h2>
              <p className="text-sm font-bold opacity-90">
                Please enter your details to stay connected with us
              </p>
              <p className="text-xs font-bold opacity-75">
                Don't have an account yet?
              </p>
              <div className="pt-2">
                <ClayButton onClick={() => setIsLogin(false)} color="pink">
                  Sign Up
                </ClayButton>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-5">
              <h2 className="text-4xl font-black text-white drop-shadow-sm tracking-wide">
                Get Started!
              </h2>
              <p className="text-sm font-bold opacity-90">
                Create an account to starting shopping
              </p>
              <p className="text-xs font-bold opacity-75">
                Already have an account?
              </p>
              <div className="pt-2">
                <ClayButton onClick={() => setIsLogin(true)} color="pink">
                  Log In
                </ClayButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
