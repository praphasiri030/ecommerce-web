const ClayButton = ({
  children,
  color = "sky",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) => {
  const colorVariants = {
    pink: "bg-pink text-rose-800",
    sky: "bg-sky text-white",
    gray: "bg-slate-200 text-slate-400",
  };

  const shadowNormal =
    "shadow-[inset_8px_8px_12px_rgba(255,255,255,0.47),inset_-8px_-8px_12px_rgba(0,0,0,0.2)]";

  const shadowActive =
    "active:shadow-[inset_8px_8px_16px_rgba(0,0,0,0.27),inset_-8px_-8px_16px_rgba(255,255,255,0.53)]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
      className={`
        ${disabled ? colorVariants.gray : colorVariants[color] || colorVariants.sky}
        ${disabled ? "shadow-inner opacity-60 cursor-not-allowed pointer-events-none" : `${shadowNormal} ${shadowActive} cursor-pointer active:scale-[0.97]`}
        px-8 py-3
        font-black
        rounded-full
        outline-none
        border-none
        transition-all
        duration-150
        ease-out
        ${className}

      `}
    >
      {children}
    </button>
  );
};

export default ClayButton;
