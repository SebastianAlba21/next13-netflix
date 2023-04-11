import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type = "text",
}) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        id={id}
        value={value}
        type={type}
        className="block rounded-md px-6 pt-4 pb-2 w-full text-md text-white bg-neutral-700 appearance-none foucs:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
