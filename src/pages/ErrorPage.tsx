import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="mt-12 mx-auto flex flex-col justify-center p-8 md:max-w-3xl md:p-10 bg-cyan-950 shadow-2xl rounded-3xl">
      <div className="flex flex-col md:flex-row md:justify-between items-center text-white">
        <div className="flex flex-col md:max-w-2xl md:relative md:p-8 rounded-md text-center items-center md:text-left">
          <h1 className="text-4xl font-bold m-4">
            Error <span className="">SaitGo</span>
          </h1>
          <p className="text-xl font-semibold m-6">
            Page Not Found
          </p>
          <Link to='/' className="bg-cyan-700 hover:bg-cyan-800 w-max mx-auto md:mx-0 px-8 py-2 rounded-xl  text-xl font-normal mt-4 md:mt-0">
            Return Login
          </Link>
        </div>
        <div className="md:flex justify-center items-center md:max-w-sm md:self-center mt-8 md:mt-0">
          <img 
            className='rounded-3xl p-2 max-w-sm'
            src="https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?t=st=1716400523~exp=1716404123~hmac=5130990ec02995b8016caba153138f2ea718bbfabf53ad7bcb5cc065c0eb7c39&w=826"
            alt="Error page illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
