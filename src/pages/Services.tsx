import React, { useState } from 'react';
import { Search, Plus, Clock, DollarSign, Activity } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { services } from '../data/services';

const Services: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(services.map(s => s.category)));

  const handleAddService = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const categoryOptions = categories.map(cat => ({ value: cat, label: cat }));

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage dental services and pricing"
        actions={
          <Button onClick={handleAddService}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {service.category}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-semibold">${service.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {service.duration}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => handleEditService(service)}
              >
                Edit Service
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedService ? 'Edit Service' : 'Add Service'}
        size="lg"
      >
        <form className="space-y-4">
          <FormInput
            label="Service Name"
            placeholder="Enter service name"
            defaultValue={selectedService?.name}
          />
          <FormSelect
            label="Category"
            options={categoryOptions}
            defaultValue={selectedService?.category}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Price"
              type="number"
              placeholder="Enter price"
              defaultValue={selectedService?.price}
            />
            <FormInput
              label="Duration"
              placeholder="e.g., 30 min"
              defaultValue={selectedService?.duration}
            />
          </div>
          <FormInput
            label="Description"
            placeholder="Enter service description"
            defaultValue={selectedService?.description}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedService ? 'Update' : 'Add'} Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Services;
