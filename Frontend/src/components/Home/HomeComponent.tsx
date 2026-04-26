import React from "react";

import logo from "../../images/logo.png";

const HomeComponent: React.FC = () => {
  return (
    <>
      <div className="relative pt-[2%] m-auto flex justify-center items-center">
        <img className="logo-image" src={logo} alt="3D factory logo" />
      </div>
    </>
  );
};

export default HomeComponent;
