import { Route, Navigate } from "react-router-dom";

const RutaProtegida: React.FC<{ element: React.ReactNode } & any> = ({ element: Component, ...rest }) => {
  const usuarioAutenticado = !!localStorage.getItem("token");

  return usuarioAutenticado ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RutaProtegida;
