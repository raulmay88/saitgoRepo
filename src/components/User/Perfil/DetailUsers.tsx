import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../services/user/authService';
import { User } from '../../../types/UserTypes';
import { toast } from 'react-toastify';
import { useLoading } from '../../../context/LoadingContext';

const DetailUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const { setLoading } = useLoading();

  const fetchUser = useCallback(async () =>{
    setLoading(true);
    try {
        const userData = await getUserById(userId!);
        setUser(userData);
    } catch (error) {
        toast.error('Error al obtener usuario: ' + (error instanceof Error ? error.message : 'Error desconocido'));
        console.error('Error al obtener usuario: ', error);
    }finally{
        setLoading(false)
    }
  }, [userId, setLoading]);

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    user && (
        <div className=" rounded mx-auto p-4 bg-cyan-950 text-white">
            <table className="min-w-full  ">
            <h1 className="text-2xl font-bold mb-4">Detalles del Usuario</h1>
                <tbody className='uppercase'>
                    <tr>
                        <td className="px-6 py-4 border-b border-gray-200">ID</td>
                        <td className="px-6 py-4 border-b border-gray-200">{user.id}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 border-b border-gray-200">Nombre</td>
                        <td className="px-6 py-4 border-b border-gray-200">{user.name}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 border-b border-gray-200">Correo</td>
                        <td className="px-6 py-4 border-b border-gray-200">{user.email}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 border-b border-gray-200">Rol</td>
                        <td className="px-6 py-4 border-b border-gray-200">{user.roleName}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 border-b border-gray-200">Fecha de alta</td>
                        <td className="px-6 py-4 border-b border-gray-200">{new Date(user.createdDate).toLocaleString()}</td>
                    </tr>
                    </tbody>
            </table>
        </div>
      )
  );
};

export default DetailUser;
