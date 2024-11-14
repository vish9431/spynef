import React, { useRef } from 'react';

const ImageUpload = ({ onImageSelect, maxImages, currentImages }) => {
  const fileInputRef = useRef();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + currentImages.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }
    onImageSelect(files);
    fileInputRef.current.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length + currentImages.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }
    onImageSelect(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Select Images
        </button>
        <p className="mt-2 text-sm text-gray-600">
          or drag and drop images here (max {maxImages} images)
        </p>
      </div>
      
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const newImages = [...currentImages];
                  newImages.splice(index, 1);
                  onImageSelect(newImages);
                }}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;