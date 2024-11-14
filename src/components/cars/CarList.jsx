import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carService } from '../../services/api';
import CarCard from './CarCard';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const response = await carService.getCars(search);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Cars</h1>
        <Link
          to="/cars/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Car
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cars..."
          className="w-full px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onDelete={fetchCars} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;