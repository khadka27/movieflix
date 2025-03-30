import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
    </div>
  );
};

export default Loader;