import React from 'react';
import { useLoading } from '../context/LoadingContext';
import Spinner from '../components/Spinner';

const GlobalSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Spinner />
    </div>
  );
};

export default GlobalSpinner;
