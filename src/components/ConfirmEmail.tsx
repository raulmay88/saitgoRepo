import { useState, useEffect, useRef } from 'react';
import { confirmEmail } from '../services/user/authService';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmEmail: React.FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const hasFetched = useRef(false); 

  useEffect(() => {
    if (hasFetched.current) return; 
    hasFetched.current = true; 

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    if (token && email) {
      confirmEmail(token, email).then(response => {
        if (response.isSuccess) {
          setMessage(response.result);
          setError('');
        } else {
          setError(response.errorMessages?.join(', ') || 'Invalid token');
          setMessage('');
        }
      }).catch(error => {
        setError('An unexpected error occurred while confirming the email. ' + error);
        setMessage('');
      });
    } else {
      setError('Invalid confirmation parameters.');
      setMessage('');
    }
  }, [location.search]);

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="bg-cyan-950 rounded shadow-md flex p-12 items-center">
        {error ? (
          <div className="flex items-center justify-center flex-col space-y-4 p-8">
            <div className='flex flex-col items-center space-y-2'>
              <h1 className="text-4xl font-bold mb-4">
                Lo sentimos
              </h1>
            </div>

            <p>{error}</p>
          </div>
        ) : (
          <div className='flex items-center justify-center flex-col space-y-4 p-8'>
            <div className='flex flex-col items-center space-y-2'>
              <h1 className="text-4xl font-bold mb-4">
                ¡Felicitaciones!
              </h1>
            </div>
            <p>{message}</p>
            <button 
              onClick={handleLoginRedirect}
              className="flex justify-center items-center w-full sm:w-auto m-2 px-6 sm:text-base h-11 rounded text-white bg-cyan-800 hover:bg-cyan-900 transition-colors duration-300"
            >
              Iniciar sesión
            </button>
          </div>
        )}
        <div className='flex items-center justify-center max-w-48 h-44'>
          <img src="/saitgo.jpg" alt="Confirmation" className="h-full rounded" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
