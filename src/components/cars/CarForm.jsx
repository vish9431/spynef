import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { carService } from '../../services/api';
import ImageUpload from './ImageUpload';

const CarForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    car_type: '',
    company: '',
    dealer: '',
    images: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('car_type', formData.car_type);
    data.append('company', formData.company);
    data.append('dealer', formData.dealer);
  
    formData.images.forEach((file) => {
      if (file) data.append('images', file); 
    });
    
      for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
  
    try {
      await carService.createCar(data);
      navigate('/cars');
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage =
        err.response?.data?.detail?.map((error) => error.msg).join(", ") ||
        "Error creating car";
      setError(errorMessage);
    }
  };
  

  const handleImageChange = (files) => {
    if (files.length + formData.images.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUpload
          onImageSelect={handleImageChange}
          maxImages={10}
          currentImages={formData.images}
        />
        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Car Type"
            className="px-4 py-2 border rounded-md"
            value={formData.car_type}
            onChange={(e) => setFormData({ ...formData, car_type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Company"
            className="px-4 py-2 border rounded-md"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dealer"
            className="px-4 py-2 border rounded-md"
            value={formData.dealer}
            onChange={(e) => setFormData({ ...formData, dealer: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarForm;