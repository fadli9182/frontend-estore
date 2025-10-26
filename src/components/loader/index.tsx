import React from "react";

const Loader: React.FC = () => (
  <section className="bg-background relative place-items-center grid h-screen w-screen gap-4">
    <div className="bg-yellow-500 w-48 h-48 absolute animate-ping rounded-full delay-5s shadow-xl"></div>
    <div className="bg-yellow-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl"></div>
    <div className="w-24 h-24 absolute animate-pulse rounded-full shadow-xl"></div>
    <img
      src="/images/LogoLoading.JPG"
      alt="banner-login"
      className="z-50 w-20 h-20"
    />
  </section>
);

export default Loader;
