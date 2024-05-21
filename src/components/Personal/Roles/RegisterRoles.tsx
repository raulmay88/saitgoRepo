import React from "react";
import Form from "../../FormCreate";
import { registerRole } from "../../../services/rol/RolService";

const RegisterRol: React.FC = () => {
  const fields = [
    { name: "name", label: "Nombre de rol", type: "text" },
  ];

  const handleSubmit = async (formData: { [key: string]: any }) => {
    const roleData = { name: formData.name };
    const result = await registerRole(roleData);
    return result;
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-white text-center">Registrar Rol</h2>
      <Form fields={fields} onSubmit={handleSubmit} submitButtonText="Registrar" />
    </div>
  );
};

export default RegisterRol;
