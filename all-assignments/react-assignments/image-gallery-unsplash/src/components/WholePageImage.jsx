import React, { useState } from "react";

const WholePageImage = ({ image, showImage = true, onClick }) => {
  return (
    showImage && (
      <div
        className="flex justify-center items-center min-h-screen fixed top-0 bottom-0 left-0 right-0 backdrop-blur-md"
        onClick={onClick}
      >
        <div className="p-5">
          <img src={image} alt={image} className="w-50 h-50 object-cover" />
        </div>
      </div>
    )
  );
};

export default WholePageImage;
