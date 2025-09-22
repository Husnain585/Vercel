import React from "react";
const Loader = () => {
  return (
    <div className="w-52 h-16 relative flex justify-between items-end">
      {/* Circles */}
      <div className="w-5 h-5 bg-white dark:bg-gray-200 rounded-full animate-bounce-custom origin-bottom"></div>
      <div className="w-5 h-5 bg-white dark:bg-gray-200 rounded-full animate-bounce-custom animation-delay-200 origin-bottom"></div>
      <div className="w-5 h-5 bg-white dark:bg-gray-200 rounded-full animate-bounce-custom animation-delay-300 origin-bottom"></div>

      {/* Shadows */}
      <div className="w-5 h-1 bg-black/90 dark:bg-gray-700 rounded-full absolute bottom-0 left-1/6 blur-sm animate-shadow-custom"></div>
      <div className="w-5 h-1 bg-black/90 dark:bg-gray-700 rounded-full absolute bottom-0 left-1/2 blur-sm animate-shadow-custom animation-delay-200"></div>
      <div className="w-5 h-1 bg-black/90 dark:bg-gray-700 rounded-full absolute bottom-0 right-1/6 blur-sm animate-shadow-custom animation-delay-300"></div>
    </div>
  );
};

export default Loader;
