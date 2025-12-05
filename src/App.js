import React, { useState, useEffect } from 'react';
import { Calendar, Users, Activity, ClipboardList, UserCircle, LogOut, Home, FileText, Bell, Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';

const HospitalManagementApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', doctor: 'Dr. Smith', room: '101', status: 'Stable', admissionDate: '2024-12-01' },
    { id: 2, name: 'Jane Smith', age: 32, condition: 'Diabetes', doctor: 'Dr. Johnson', room: '203', status: 'Critical', admissionDate: '2024-12-03' },
    { id: 3, name: 'Mike Wilson', age: 58, condition: 'Cardiac Issue', doctor: 'Dr. Smith', room: '305', status: 'Recovering', admissionDate: '2024-11-28' },
  ]);
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Sarah Brown', doctor: 'Dr. Smith', date: '2024-12-06', time: '10:00 AM', type: 'Consultation' },
    { id: 2, patient: 'Tom Davis', doctor: 'Dr. Johnson', date: '2024-12-06', time: '02:30 PM', type: 'Follow-up' },
    { id: 3, patient: 'Emily White', doctor: 'Dr. Lee', date: '2024-12-07', time: '11:00 AM', type: 'Surgery' },
  ]);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Login form state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
  // Patient form state
  const [patientForm, setPatientForm] = useState({
    name: '', age: '', condition: '', doctor: '', room: '', status: 'Stable'
  });
  
  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    patient: '', doctor: '', date: '', time: '', type: 'Consultation'
  });

  // Real-time clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Login handler
  const handleLogin = () => {
    // Trim whitespace from inputs
    const username = loginForm.username.trim();
    const password = loginForm.password.trim();
    
    // Check if fields are not empty
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    
    // Allow login with any credentials
    const role = (username === 'admin' || username === 'doctor') ? username : 'user';
    setCurrentUser({ username: username, role: role });
    setIsLoggedIn(true);
    setLoginForm({ username: '', password: '' });
  };

  // Add patient
  const handleAddPatient = () => {
    if (patientForm.name && patientForm.age && patientForm.condition && patientForm.doctor && patientForm.room) {
      const newPatient = {
        id: patients.length + 1,
        ...patientForm,
        admissionDate: new Date().toISOString().split('T')[0]
      };
      setPatients([...patients, newPatient]);
      setShowAddPatient(false);
      setPatientForm({ name: '', age: '', condition: '', doctor: '', room: '', status: 'Stable' });
    }
  };

  // Add appointment
  const handleAddAppointment = () => {
    if (appointmentForm.patient && appointmentForm.doctor && appointmentForm.date && appointmentForm.time) {
      const newAppointment = {
        id: appointments.length + 1,
        ...appointmentForm
      };
      setAppointments([...appointments, newAppointment]);
      setShowAddAppointment(false);
      setAppointmentForm({ patient: '', doctor: '', date: '', time: '', type: 'Consultation' });
    }
  };

  // Delete patient
  const deletePatient = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  // Filter patients based on search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Hospital Management</h1>
            <p className="text-gray-600 mt-2">Secure Login Portal</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Sign In
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo Credentials:</strong><br />
              Admin: admin / admin123<br />
              Doctor: doctor / doctor123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Content
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Patients</p>
              <h3 className="text-3xl font-bold mt-2">{patients.length}</h3>
            </div>
            <Users className="opacity-80" size={40} />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Appointments</p>
              <h3 className="text-3xl font-bold mt-2">{appointments.length}</h3>
            </div>
            <Calendar className="opacity-80" size={40} />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Critical Cases</p>
              <h3 className="text-3xl font-bold mt-2">
                {patients.filter(p => p.status === 'Critical').length}
              </h3>
            </div>
            <Activity className="opacity-80" size={40} />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Available Rooms</p>
              <h3 className="text-3xl font-bold mt-2">24</h3>
            </div>
            <Home className="opacity-80" size={40} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {patients.slice(0, 3).map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <UserCircle className="text-indigo-600" size={28} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.condition}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  patient.status === 'Critical' ? 'bg-red-100 text-red-700' :
                  patient.status === 'Stable' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Appointments</h3>
          <div className="space-y-3">
            {appointments.slice(0, 3).map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold text-gray-800">{apt.patient}</p>
                  <p className="text-sm text-gray-600">{apt.doctor} • {apt.time}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {apt.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Patients List
  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
        <button
          onClick={() => setShowAddPatient(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition"
        >
          <Plus size={20} />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Condition</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Doctor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Room</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{patient.name}</td>
                  <td className="px-4 py-3 text-gray-600">{patient.age}</td>
                  <td className="px-4 py-3 text-gray-600">{patient.condition}</td>
                  <td className="px-4 py-3 text-gray-600">{patient.doctor}</td>
                  <td className="px-4 py-3 text-gray-600">{patient.room}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      patient.status === 'Critical' ? 'bg-red-100 text-red-700' :
                      patient.status === 'Stable' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deletePatient(patient.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Patient</h3>
            <div className="space-y-4">
              <input 
                value={patientForm.name}
                onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                placeholder="Patient Name" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <input 
                value={patientForm.age}
                onChange={(e) => setPatientForm({...patientForm, age: e.target.value})}
                type="number" 
                placeholder="Age" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <input 
                value={patientForm.condition}
                onChange={(e) => setPatientForm({...patientForm, condition: e.target.value})}
                placeholder="Condition" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <input 
                value={patientForm.doctor}
                onChange={(e) => setPatientForm({...patientForm, doctor: e.target.value})}
                placeholder="Doctor" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <input 
                value={patientForm.room}
                onChange={(e) => setPatientForm({...patientForm, room: e.target.value})}
                placeholder="Room Number" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <select 
                value={patientForm.status}
                onChange={(e) => setPatientForm({...patientForm, status: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
                <option value="Recovering">Recovering</option>
              </select>
              <div className="flex space-x-3">
                <button 
                  onClick={handleAddPatient}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add Patient
                </button>
                <button 
                  onClick={() => {
                    setShowAddPatient(false);
                    setPatientForm({ name: '', age: '', condition: '', doctor: '', room: '', status: 'Stable' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Appointments
  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
        <button
          onClick={() => setShowAddAppointment(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition"
        >
          <Plus size={20} />
          <span>Schedule Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {appointments.map(apt => (
            <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <Calendar className="text-indigo-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{apt.patient}</p>
                  <p className="text-sm text-gray-600">{apt.doctor}</p>
                  <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                {apt.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showAddAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Schedule Appointment</h3>
            <div className="space-y-4">
              <input 
                value={appointmentForm.patient}
                onChange={(e) => setAppointmentForm({...appointmentForm, patient: e.target.value})}
                placeholder="Patient Name" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <input 
                value={appointmentForm.doctor}
                onChange={(e) => setAppointmentForm({...appointmentForm, doctor: e.target.value})}
                placeholder="Doctor Name" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <input 
                value={appointmentForm.date}
                onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                type="date" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <input 
                value={appointmentForm.time}
                onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                type="time" 
                className="w-full px-4 py-2 border rounded-lg" 
              />
              <select 
                value={appointmentForm.type}
                onChange={(e) => setAppointmentForm({...appointmentForm, type: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Surgery">Surgery</option>
                <option value="Check-up">Check-up</option>
              </select>
              <div className="flex space-x-3">
                <button 
                  onClick={handleAddAppointment}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Schedule
                </button>
                <button 
                  onClick={() => {
                    setShowAddAppointment(false);
                    setAppointmentForm({ patient: '', doctor: '', date: '', time: '', type: 'Consultation' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Main App Layout
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Activity className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Hospital Management System</h1>
              <p className="text-sm text-gray-600">{currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-600 cursor-pointer hover:text-indigo-600" size={24} />
            <div className="flex items-center space-x-2">
              <UserCircle className="text-gray-600" size={32} />
              <div>
                <p className="font-semibold text-gray-800">{currentUser.username}</p>
                <p className="text-xs text-gray-600">{currentUser.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-red-600 hover:text-red-700"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-6 flex space-x-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition ${
              activeTab === 'patients' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            <span>Patients</span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition ${
              activeTab === 'appointments' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar size={20} />
            <span>Appointments</span>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'patients' && renderPatients()}
        {activeTab === 'appointments' && renderAppointments()}
      </div>
    </div>
  );
};

export default HospitalManagementApp;