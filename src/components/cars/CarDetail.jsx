import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carService, getImageUrl } from '../../services/api';

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await carService.getCar(id);
      setCar(response.data);
      setEditData(response.data);
    } catch (error) {
      setError('Error fetching car details');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await carService.updateCar(id, editData);
      setIsEditing(false);
      fetchCar();
    } catch (error) {
      setError('Error updating car');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await carService.deleteCar(id);
        navigate('/cars');
      } catch (error) {
        setError('Error deleting car');
      }
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </div>
          <div>
            <textarea
              className="w-full px-4 py-2 border rounded-md"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              className="px-4 py-2 border rounded-md"
              value={editData.car_type}
              onChange={(e) => setEditData({ ...editData, car_type: e.target.value })}
            />
            <input
              type="text"
              className="px-4 py-2 border rounded-md"
              value={editData.company}
              onChange={(e) => setEditData({ ...editData, company: e.target.value })}
            />
            <input
              type="text"
              className="px-4 py-2 border rounded-md"
              value={editData.dealer}
              onChange={(e) => setEditData({ ...editData, dealer: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{car.title}</h1>
            <div className="space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-600">{car.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-200 rounded-full">{car.car_type}</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full">{car.company}</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full">{car.dealer}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={getImageUrl(image)}
                  alt={`${car.title} - ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;