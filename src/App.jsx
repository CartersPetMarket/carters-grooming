import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, Dog, User, LogOut, Phone, Mail, Check, CheckCircle2, PawPrint, Clock, Star, ArrowRight, Menu, X } from 'lucide-react';

const supabase = createClient(
  'https://wpvoejdfvuhsrfderhpo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm9lamRmdnVoc3JmZGVyaHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNjY3NjIsImV4cCI6MjA4Mzg0Mjc2Mn0.Pwe7wnUITAdxlKYaEFUrDud4Ij4EwULzdH3WAwn4m7g'
);

const BREED_DATABASE = {
  'Chihuahua': 6, 'Yorkshire Terrier': 7, 'Pomeranian': 7, 'Maltese': 8,
  'Shih Tzu': 12, 'Pug': 16, 'Boston Terrier': 18, 'French Bulldog': 22,
  'Dachshund': 24, 'Beagle': 26, 'Cocker Spaniel': 28, 'Corgi': 30,
  'Border Collie': 40, 'Australian Shepherd': 55, 'Boxer': 65,
  'Labrador Retriever': 70, 'Golden Retriever': 70, 'German Shepherd': 75,
  'Rottweiler': 110, 'Great Dane': 140, 'Bernese Mountain Dog': 90,
  'Mixed Breed': null
};

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing');
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dogs, setDogs] = useState([]);
  const [services, setServices] = useState([]);
  const [groomers, setGroomers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDogs, setSelectedDogs] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [showAddDog, setShowAddDog] = useState(false);
  const [newDog, setNewDog] = useState({ name: '', breed: '', weight: '' });
  const [showCallPopup, setShowCallPopup] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setUser(data.session.user);
      await loadUserData(data.session.user.id);
      setView('booking');
    }
    setLoading(false);
  };

  const loadUserData = async (userId) => {
    const { data: dogsData } = await supabase.from('dogs').select('*').eq('customer_id', userId);
    setDogs(dogsData || []);
    
    const { data: servicesData } = await supabase.from('services').select('*');
    setServices(servicesData || []);
    
    const { data: groomersData } = await supabase.from('groomers').select('*').eq('active', true);
    setGroomers(groomersData || []);
    
    const { data: schedulesData } = await supabase.from('groomer_schedules').select('*, groomers(name)').eq('active', true);
    setSchedules(schedulesData || []);
    
    const { data: bookingsData } = await supabase
      .from('bookings')
      .select('*, dogs(name), groomers(name), services(name)')
      .eq('customer_id', userId)
      .gte('appointment_date', new Date().toISOString().split('T')[0])
      .order('appointment_date', { ascending: true });
    setBookings(bookingsData || []);
  };

  const handleSignup = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email, password, options: { data: { name, phone } }
      });
      if (authError) throw authError;
      
      const { error: customerError } = await supabase.from('customers').insert([{
        id: authData.user.id, email, name, phone, password_hash: 'handled_by_auth'
      }]);
      if (customerError) throw customerError;
      alert('Account created! Please check your email to verify.');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      await loadUserData(data.user.id);
      setView('booking');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setView('landing');
  };

  const handleAddDog = async () => {
    if (!newDog.name || !newDog.breed) {
      alert('Please fill in dog name and breed');
      return;
    }
    if (newDog.breed === 'Mixed Breed' && !newDog.weight) {
      alert('Please enter weight for mixed breed');
      return;
    }
    
    const weight = newDog.breed === 'Mixed Breed' ? newDog.weight : BREED_DATABASE[newDog.breed];
    const size = weight < 35 ? 'small' : 'large';
    
    try {
      const { data, error } = await supabase.from('dogs').insert([{
        customer_id: user.id, name: newDog.name, breed: newDog.breed, weight, size
      }]).select();
      if (error) throw error;
      setDogs([...dogs, data[0]]);
      setNewDog({ name: '', breed: '', weight: '' });
      setShowAddDog(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const getAvailableSlots = () => {
    if (!selectedDate || selectedDogs.length === 0) return [];
    const dayOfWeek = new Date(selectedDate + 'T00:00:00').getDay();
    const slots = [];
    const timeGroomerMap = {};
    
    schedules.forEach(schedule => {
      if (schedule.day_of_week === dayOfWeek) {
        const key = `${schedule.time}-${schedule.groomer_id}`;
        timeGroomerMap[key] = {
          time: schedule.time,
          groomer: schedule.groomers.name,
          groomerId: schedule.groomer_id,
          maxSmall: schedule.max_small,
          maxLarge: schedule.max_large,
          totalMax: schedule.total_max
        };
      }
    });
    
    Object.values(timeGroomerMap).forEach(slot => {
      let smallNeeded = 0, largeNeeded = 0;
      selectedDogs.forEach(dogId => {
        const dog = dogs.find(d => d.id === dogId);
        if (dog) {
          if (dog.size === 'small') smallNeeded++;
          else largeNeeded++;
        }
      });
      
      if (smallNeeded <= slot.maxSmall && largeNeeded <= slot.maxLarge && 
          (smallNeeded + largeNeeded) <= slot.totalMax) {
        slots.push(slot);
      }
    });
    
    return slots.sort((a, b) => {
      const getMinutes = (time) => {
        const [t, period] = time.split(' ');
        let [h, m] = t.split(':').map(Number);
        if (period === 'PM' && h !== 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        return h * 60 + (m || 0);
      };
      return getMinutes(a.time) - getMinutes(b.time);
    });
  };

  const handleBooking = async (slot) => {
    if (!selectedService) {
      alert('Please select a service');
      return;
    }
    try {
      const familyBookingId = crypto.randomUUID();
      for (const dogId of selectedDogs) {
        const { error } = await supabase.from('bookings').insert([{
          customer_id: user.id, dog_id: dogId, groomer_id: slot.groomerId,
          service_id: selectedService, appointment_date: selectedDate,
          appointment_time: slot.time, status: 'scheduled',
          family_booking_id: selectedDogs.length > 1 ? familyBookingId : null
        }]);
        if (error) throw error;
      }
      alert('Booking confirmed!');
      await loadUserData(user.id);
      setSelectedDogs([]);
      setSelectedDate('');
      setSelectedService('');
    } catch (error) {
      alert(error.message);
    }
  };

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <PawPrint className="animate-bounce text-red-600 mx-auto mb-4" size={48} />
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  // Landing Page
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Dog className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">Carter's Pet Market</h1>
                  <p className="text-xs text-gray-600 font-semibold">Professional Grooming</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView('login')}
                  className="px-6 py-2 text-gray-700 font-bold hover:text-red-600 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setView('login')}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-28 pb-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-red-100 text-red-700 font-bold rounded-full text-sm mb-6">
                  🐾 Proudly Serving Houston Since 2008
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                  Houston's Most Trusted <span className="text-red-600">Pet Grooming</span>
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Family-owned and locally loved for over 17 years. Our expert groomers treat every pet like their own — because your furry family deserves nothing less.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setView('login')}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    Book Appointment
                  </button>
                  <a
                    href="tel:+17132537718"
                    className="px-8 py-4 bg-white text-red-600 text-lg font-bold rounded-xl border-2 border-red-600 hover:bg-red-50 transition shadow-lg flex items-center gap-2"
                  >
                    <Phone size={20} />
                    (713) 253-7718
                  </a>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/hero-image.png"
                  alt="Professional dog grooming at Carter's Pet Market"
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-4xl font-black text-center text-gray-900 mb-4">Why Houston Chooses Us</h3>
            <p className="text-center text-gray-600 mb-16 text-lg">Locally owned. Expertly groomed. Genuinely loved.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-red-200">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">17+ Years Experience</h4>
                <p className="text-gray-700">Proudly serving Houston pet families since 2008</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-red-200">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PawPrint className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">We Actually Care</h4>
                <p className="text-gray-700">Your pet isn't just an appointment — they're family</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-red-200">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dog className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">All Breeds Welcome</h4>
                <p className="text-gray-700">From tiny Chihuahuas to Great Danes — we love them all</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-4xl font-black text-center text-gray-900 mb-4">Book in 3 Easy Steps</h3>
            <p className="text-center text-gray-600 mb-16 text-lg">Online booking available 24/7</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black">
                  1
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">Add Your Pet</h4>
                <p className="text-gray-700">Create an account and tell us about your furry friend</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black">
                  2
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">Choose Service</h4>
                <p className="text-gray-700">Select from our range of grooming services</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black">
                  3
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">Pick a Time</h4>
                <p className="text-gray-700">Book your slot and we'll take care of the rest!</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-red-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Ready to Pamper Your Pup?
            </h3>
            <p className="text-xl text-red-100 mb-8">
              Join thousands of Houston pet parents who trust Carter's Pet Market!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setView('login')}
                className="px-12 py-5 bg-white text-red-600 text-xl font-black rounded-xl hover:bg-gray-100 transition shadow-2xl transform hover:scale-105"
              >
                Book Online Now
              </button>
              <a
                href="tel:+17132537718"
                className="px-12 py-5 bg-transparent text-white text-xl font-black rounded-xl border-3 border-white hover:bg-white/10 transition shadow-2xl transform hover:scale-105 flex items-center gap-2"
              >
                <Phone size={24} />
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h5 className="text-xl font-black mb-4">Carter's Pet Market</h5>
                <p className="text-gray-400">Houston's trusted pet grooming since 2008. Family-owned, locally loved.</p>
              </div>
              <div>
                <h5 className="text-xl font-black mb-4">Contact</h5>
                <a href="tel:+17132537718" className="text-gray-400 mb-2 flex items-center gap-2 hover:text-white transition">
                  <Phone size={16} />
                  (713) 253-7718
                </a>
                <a href="mailto:Team@carterspetmarket.com" className="text-gray-400 flex items-center gap-2 hover:text-white transition">
                  <Mail size={16} />
                  Team@carterspetmarket.com
                </a>
              </div>
              <div>
                <h5 className="text-xl font-black mb-4">Hours</h5>
                <p className="text-gray-400">Monday - Saturday: 8am - 6pm</p>
                <p className="text-gray-400">Sunday: Closed</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Carter's Pet Market. All rights reserved. | Houston, TX</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Login/Signup Page
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setView('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition font-semibold text-gray-700"
          >
            ← Back to Home
          </button>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-red-600">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Dog className="text-white" size={48} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Carter's Pet Market</h1>
            <p className="text-gray-600 font-medium">Professional Grooming Services</p>
          </div>
          
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                authMode === 'login' 
                  ? 'bg-red-600 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                authMode === 'signup' 
                  ? 'bg-red-600 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>
          
          <div className="space-y-4">
            {authMode === 'signup' && (
              <>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition"
                />
              </>
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition"
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition"
            />
            
            <button
              onClick={authMode === 'login' ? handleLogin : handleSignup}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {authMode === 'login' ? 'Login to Book' : 'Create Account'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const availableSlots = getAvailableSlots();

  // Booking Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Call Us Popup */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-red-600">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">
                Can't Find a Time?
              </h3>
              <p className="text-gray-700 text-lg mb-6">
                Give us a call and we'll do our best to accommodate you!
              </p>
              <a
                href="tel:+17132537718"
                className="block w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold text-xl mb-4 hover:from-red-700 hover:to-red-800 transition shadow-lg"
              >
                (713) 253-7718
              </a>
              <button
                onClick={() => setShowCallPopup(false)}
                className="w-full py-3 text-gray-600 font-semibold hover:text-gray-900 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Dog className="text-red-600" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">Carter's Pet Market</h1>
                <p className="text-red-100 text-sm font-medium">Welcome back, {user.user_metadata?.name || user.email}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition font-semibold backdrop-blur-sm"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${selectedDogs.length > 0 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                selectedDogs.length > 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {selectedDogs.length > 0 ? <Check size={24} /> : '1'}
              </div>
              <span className="font-semibold text-gray-700">Select Pet</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <div className={`flex items-center gap-3 ${selectedService ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                selectedService ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {selectedService ? <Check size={24} /> : '2'}
              </div>
              <span className="font-semibold text-gray-700">Choose Service</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <div className={`flex items-center gap-3 ${selectedDate ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                selectedDate ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {selectedDate ? <Check size={24} /> : '3'}
              </div>
              <span className="font-semibold text-gray-700">Pick Date & Time</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Step 1: Select Your Pet */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">My Pets</h2>
                <button
                  onClick={() => setShowAddDog(!showAddDog)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-md hover:shadow-lg"
                >
                  {showAddDog ? 'Cancel' : '+ Add Pet'}
                </button>
              </div>

              {showAddDog && (
                <div className="mb-6 p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 space-y-4">
                  <input
                    type="text"
                    placeholder="Pet's Name"
                    value={newDog.name}
                    onChange={(e) => setNewDog({...newDog, name: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500"
                  />
                  <select
                    value={newDog.breed}
                    onChange={(e) => setNewDog({...newDog, breed: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500"
                  >
                    <option value="">Select Breed</option>
                    {Object.keys(BREED_DATABASE).map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  {newDog.breed === 'Mixed Breed' && (
                    <input
                      type="number"
                      placeholder="Weight (lbs)"
                      value={newDog.weight}
                      onChange={(e) => setNewDog({...newDog, weight: e.target.value})}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500"
                    />
                  )}
                  <button
                    onClick={handleAddDog}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-xl font-bold shadow-md transition"
                  >
                    Save Pet
                  </button>
                </div>
              )}

              {dogs.length === 0 ? (
                <div className="text-center py-12">
                  <PawPrint className="mx-auto mb-4 text-gray-300" size={48} />
                  <p className="text-gray-500 font-medium">No pets added yet</p>
                  <p className="text-gray-400 text-sm mt-2">Click "+ Add Pet" to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dogs.map(dog => (
                    <button
                      key={dog.id}
                      onClick={() => {
                        if (selectedDogs.includes(dog.id)) {
                          setSelectedDogs(selectedDogs.filter(id => id !== dog.id));
                        } else {
                          setSelectedDogs([...selectedDogs, dog.id]);
                        }
                      }}
                      className={`w-full p-5 rounded-2xl border-3 transition-all transform hover:scale-105 text-left ${
                        selectedDogs.includes(dog.id)
                          ? 'border-red-600 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-red-300 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedDogs.includes(dog.id) ? 'bg-red-600' : 'bg-gray-200'
                          }`}>
                            <Dog className={selectedDogs.includes(dog.id) ? 'text-white' : 'text-gray-500'} size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-lg text-gray-900">{dog.name}</div>
                            <div className="text-sm text-gray-600">{dog.breed}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {dog.size === 'small' ? 'Small' : 'Large'} • {dog.weight} lbs
                            </div>
                          </div>
                        </div>
                        {selectedDogs.includes(dog.id) && (
                          <CheckCircle2 className="text-red-600" size={28} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedDogs.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-600" size={20} />
                    <span className="font-bold text-green-900">
                      {selectedDogs.length} pet{selectedDogs.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 2 & 3: Service Selection and Booking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Choose Your Service</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-6 rounded-2xl border-3 transition-all transform hover:scale-105 text-left ${
                      selectedService === service.id
                        ? 'border-red-600 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-red-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-2xl font-black text-red-600 mb-2">${service.base_price}</p>
                        <p className="text-sm text-gray-600">~{service.estimated_duration} minutes</p>
                      </div>
                      {selectedService === service.id && (
                        <CheckCircle2 className="text-red-600 flex-shrink-0" size={28} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Selection */}
            {selectedDogs.length > 0 && selectedService && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Select Date & Time</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-3 text-gray-700">Choose a Date</label>
                  <input
                    type="date"
                    min={getTodayDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 text-lg font-semibold"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Available Appointments</h3>
                    {availableSlots.length === 0 ? (
                      <div>
                        <div className="text-center py-12 bg-gray-50 rounded-2xl mb-4">
                          <Calendar className="mx-auto mb-4 text-gray-300" size={48} />
                          <p className="text-gray-600 font-semibold mb-2">No appointments available</p>
                          <p className="text-gray-500 text-sm">Please try a different date</p>
                        </div>
                        <button
                          onClick={() => setShowCallPopup(true)}
                          className="w-full p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-3"
                        >
                          <Phone size={24} />
                          Can't Find a Time? Call Us!
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {availableSlots.map((slot, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleBooking(slot)}
                              className="p-6 rounded-2xl border-2 border-gray-200 hover:border-red-500 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all transform hover:scale-105 text-left shadow-md hover:shadow-xl"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl font-black text-gray-900">{slot.time}</span>
                                <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                                  Available
                                </div>
                              </div>
                              <div className="text-sm text-gray-600 font-semibold">
                                with {slot.groomer}
                              </div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowCallPopup(true)}
                          className="w-full p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-semibold transition border-2 border-blue-200 flex items-center justify-center gap-2"
                        >
                          <Phone size={20} />
                          Don't see a time that works? Call us!
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Bookings */}
            {bookings.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Your Upcoming Appointments</h2>
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-black text-lg text-gray-900">{booking.dogs.name}</h3>
                          <p className="text-gray-700 font-semibold mt-2">
                            📅 {new Date(booking.appointment_date).toLocaleDateString('en-US', { 
                              weekday: 'long', month: 'long', day: 'numeric' 
                            })}
                          </p>
                          <p className="text-gray-700 font-semibold">
                            🕐 {booking.appointment_time}
                          </p>
                          <p className="text-gray-600 text-sm mt-2">
                            with {booking.groomers.name} • {booking.services.name}
                          </p>
                        </div>
                        <div className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full">
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
