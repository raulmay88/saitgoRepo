import React, { useState, useEffect } from 'react';
import { Role } from '../types/RolTypes';

interface FormProps {
  initialData?: Role;
  onSubmit: (data: Role) => void;
}

const FormCreate: React.FC<FormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Role>({
    id: initialData?.id || 0, 
    name: initialData?.name || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'id' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-cyan-950 rounded shadow-2xl p-8">
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col text-white space-y-4">
        <label htmlFor="name" className="cursor-text text-xl font-normal">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="rounded border border-gray-200 text-xl font-normal text-black h-11 p-2 focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
        />
      </div>
      <button 
        type="submit"
        className="bg-cyan-700 hover:bg-cyan-800 w-full px-8 py-2 rounded-xl text-white text-xl font-normal"
      >
        Guardar
      </button>
    </form>
      </div>
  );
};

export default FormCreate;
