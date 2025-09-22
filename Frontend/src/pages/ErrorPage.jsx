import React from "react";

const ErrorPage = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col transition-colors duration-300">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 mt-14">
        {/* Headline */}
        <h1
          className="text-[5rem] md:text-[12rem] lg:text-[20rem] leading-tight font-normal font-serif text-black dark:text-white transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          404
        </h1>

        {/* CTA Button */}
        <button
          onClick={goHome}
          className="mt-6 text-black dark:text-white text-lg font-medium hover:opacity-70 transition"
        >
          BACK HOME
          <hr className="border-black dark:border-white mt-1" />
        </button>
      </main>
    </div>
  );
};

export default ErrorPage;
