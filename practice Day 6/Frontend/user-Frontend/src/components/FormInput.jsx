import React from "react";

const FormInput = ({label,type,placeholder,required,onChange,value,name}) => {
  return (
    <div>
      <label
        htmlFor={type}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default FormInput;
