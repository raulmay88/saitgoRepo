import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <img
        src="/saitgoIconoColor.svg"
        alt="Loading..."
        className="animate-spin h-16 w-24" 
      />
    </div>
  );
};

export default Spinner;
