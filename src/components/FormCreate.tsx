import React, { useState } from "react";
import { toast } from "react-toastify";

interface Field {
  name: string;
  label: string;
  type: string;
  options?: { value: any; label: string }[];
  initialValue?: any;
}

interface FormProps {
  fields: Field[];
  onSubmit: (formData: { [key: string]: any }) => Promise<{ success: boolean; message?: string }>;
  submitButtonText: string;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitButtonText }) => {
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = field.initialValue || "";
    return acc;
  }, {} as { [key: string]: any });

  const [formData, setFormData] = useState<{ [key: string]: any }>(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await onSubmit(formData);
      setLoading(false);
      if (result.success) {
        toast.success('¡Usuario registrado exitosamente!', {
          autoClose: 3000,
      });
      } else {
        toast.error('Hubo un error en el registro', {
          autoClose: 3000
      });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Hubo un error en el registro' + error, {
        autoClose: 3000
    }); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col text-white space-y-4 my-2">
          <label htmlFor={field.name} className="cursor-text text-xl font-normal">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="rounded border border-gray-200 text-xl font-normal text-black h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="rounded border border-gray-200 text-xl font-normal text-black h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="bg-cyan-700 hover:bg-cyan-800 w-max m-auto px-8 py-2 rounded-xl text-white text-xl font-normal"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default Form;
