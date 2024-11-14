import React from 'react';
import { Link } from 'react-router-dom';
import { carService } from '../../services/api';

const CarCard = ({ car, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await carService.deleteCar(car.id);
        onDelete();
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={car.images[0] || '/placeholder-car.jpg'}
          alt={car.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">{car.car_type}</span>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">{car.company}</span>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">{car.dealer}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
        <div className="flex justify-between items-center">
          <Link
            to={`/cars/${car.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;