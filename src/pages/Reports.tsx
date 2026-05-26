import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormSelect from '../components/FormSelect';
import { doctors } from '../data/doctors';
import { appointments } from '../data/appointments';
import { invoices } from '../data/invoices';

const Reports: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('January 2024');
  const [selectedReport, setSelectedReport] = useState('revenue');

  const monthOptions = [
    { value: 'January 2024', label: 'January 2024' },
    { value: 'December 2023', label: 'December 2023' },
    { value: 'November 2023', label: 'November 2023' },
    { value: 'October 2023', label: 'October 2023' }
  ];

  const reportOptions = [
    { value: 'revenue', label: 'Revenue Report' },
    { value: 'appointments', label: 'Appointment Analytics' },
    { value: 'doctors', label: 'Doctor Performance' }
  ];

  const doctorPerformance = doctors.map(doctor => ({
    name: doctor.name,
    patients: doctor.patients,
    rating: doctor.rating,
    revenue: Math.floor(Math.random() * 50000) + 20000
  }));

  const appointmentStats = [
    { label: 'Total Appointments', value: appointments.length, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Completed', value: appointments.filter(a => a.status === 'Completed').length, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Pending', value: appointments.filter(a => a.status === 'Pending').length, icon: Users, color: 'bg-yellow-500' },
    { label: 'Cancelled', value: appointments.filter(a => a.status === 'Cancelled').length, icon: BarChart3, color: 'bg-red-500' }
  ];

  const totalRevenue = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handleExport = () => {
    console.log('Exporting report...');
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="View clinic analytics and performance reports"
        actions={
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <FormSelect
              label="Report Type"
              options={reportOptions}
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Month"
              options={monthOptions}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Revenue Report */}
      {selectedReport === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-green-500">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">+18%</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</h3>
              <p className="mt-1 text-sm text-gray-600">Total Revenue</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-blue-500">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-600">+12%</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">{invoices.length}</h3>
              <p className="mt-1 text-sm text-gray-600">Total Invoices</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-purple-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-600">+8%</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">{invoices.length * 15}</h3>
              <p className="mt-1 text-sm text-gray-600">Unique Patients</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-orange-500">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-orange-600">+5%</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">$450</h3>
              <p className="mt-1 text-sm text-gray-600">Avg. Revenue/Patient</p>
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>Revenue Chart Placeholder</p>
                <p className="text-sm">Chart visualization would be rendered here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Analytics */}
      {selectedReport === 'appointments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {appointmentStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className={`p-3 rounded-lg ${stat.color} w-fit`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Appointment Chart Placeholder */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2" />
                <p>Appointment Analytics Chart Placeholder</p>
                <p className="text-sm">Chart visualization would be rendered here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Performance */}
      {selectedReport === 'doctors' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Doctor Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Patients
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctorPerformance.map((doctor, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {doctor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {doctor.patients}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {doctor.rating} ⭐
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${doctor.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
