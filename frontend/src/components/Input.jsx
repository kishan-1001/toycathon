import React from 'react';

const Input = ({ icon: Icon, error, ...props }) => (
  <div className="mb-4">
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
      <input
        {...props}
        className={`w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border ${
          error ? 'border-red-400' : 'border-purple-300/30'
        } rounded-xl text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all`}
      />
    </div>
    {error && <p className="text-red-300 text-sm mt-1 ml-1">{error}</p>}
  </div>
);

export default Input;
