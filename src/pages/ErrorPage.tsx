import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="mt-12 mx-auto flex flex-col justify-center p-8 md:max-w-3xl md:p-10 bg-white shadow-2xl rounded-3xl">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col md:max-w-2xl md:relative md:p-8 rounded-md text-black">
          <div className="text-4xl font-bold m-4 text-[#1e0e4b] text-center">
            Error <span className="text-orange-400">SaitGo</span>
          </div>
          <div className="text-xl font-semibold m-6 text-center text-[#1e0e4b]">
            Page Not Found
          </div>
          <div className="text-2xl font-normal m-4 text-center text-[#1e0e4b]">
            <Link to='/' className="bg-orange-400 w-max m-auto px-8 py-2 rounded-xl text-white text-xl font-normal">Return Login</Link>
          </div>
        </div>
        <div className="md:flex justify-center items-center md:max-w-sm md:self-center">
          <img 
            className='rounded-3xl p-2 max-w-sm'
            src="https://img.freepik.com/psd-gratis/404-fondo-concepto-construccion_23-2150078629.jpg?t=st=1713996709~exp=1714000309~hmac=c34ae32b5418d926018fb4aee0c98c714c41a0496284586713f7fc413e7762fb&w=740"
            alt="errorPage" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
