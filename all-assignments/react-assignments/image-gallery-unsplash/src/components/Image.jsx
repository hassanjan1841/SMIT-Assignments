import React from "react";

const Image = ({ image, onClick }) => {
  return (
    <div className="lg:w-1/3 sm:w-1/2 p-4 w-full">
      <div className="flex flex-1">
        <img
          onClick={onClick}
          alt="gallery"
          className=" inset-0 w-full max-h-[300px] object-cover object-center"
          src={image}
        />
      </div>
    </div>
  );
};

export default Image;
