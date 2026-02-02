import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, Dog, User, LogOut, Phone, Mail, Check, CheckCircle2, PawPrint, Clock, Star, ArrowRight, Menu, X, Plus, Minus, Upload, FileText, AlertTriangle, Settings, ChevronLeft, ChevronRight, Search, UserPlus, ShieldAlert, Trash2 } from 'lucide-react';

const supabase = createClient(
  'https://wpvoejdfvuhsrfderhpo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm9lamRmdnVoc3JmZGVyaHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNjY3NjIsImV4cCI6MjA4Mzg0Mjc2Mn0.Pwe7wnUITAdxlKYaEFUrDud4Ij4EwULzdH3WAwn4m7g'
);

const BREED_DATABASE = {
  'Affenpinscher': { bath: 45, groom: 65, weight: 9 },
  'Afghan Hound': { bath: 65, groom: 85, weight: 55 },
  'Airedale Terrier': { bath: 65, groom: 85, weight: 55 },
  'Akita': { bath: '75-82', groom: 120, weight: 100 },
  'Alaskan Malamute': { bath: '75-85', groom: 120, weight: 85 },
  'American Eskimo': { bath: 58, groom: 75, weight: 25 },
  'American Water Spaniel': { bath: 55, groom: 70, weight: 40 },
  'Anatolian Shepherd': { bath: 72, groom: 90, weight: 120 },
  'Aussiedoodle': { bath: '68-85', groom: '105-125', weight: 45 },
  'Aussiedoodle (Mini)': { bath: 68, groom: 105, weight: 20 },
  'Aussiedoodle (Standard)': { bath: 85, groom: 125, weight: 55 },
  'Australian Cattle Dog': { bath: 60, groom: 85, weight: 35 },
  'Australian Shepherd': { bath: 65, groom: 90, weight: 55 },
  'Australian Terrier': { bath: 48, groom: 65, weight: 15 },
  'Basenji': { bath: 48, groom: null, weight: 23 },
  'Basset Hound': { bath: 48, groom: 63, weight: 55 },
  'Beagle': { bath: 48, groom: 58, weight: 25 },
  'Beauceron': { bath: 60, groom: null, weight: 85 },
  'Bedlington Terrier': { bath: 50, groom: 75, weight: 20 },
  'Bernedoodle': { bath: '70-88', groom: '105-125', weight: 60 },
  'Bernedoodle (Mini)': { bath: 70, groom: 105, weight: 30 },
  'Bernedoodle (Medium)': { bath: 78, groom: 115, weight: 50 },
  'Bernedoodle (Standard)': { bath: 88, groom: 125, weight: 80 },
  'Bernese Mountain Dog': { bath: 76, groom: 115, weight: 95 },
  'Bichon Frise': { bath: 55, groom: 75, weight: 12 },
  'Black And Tan Coonhound': { bath: 48, groom: 60, weight: 70 },
  'Black Russian Terrier': { bath: '75-90', groom: 120, weight: 110 },
  'Bloodhound': { bath: 60, groom: 60, weight: 100 },
  'Border Collie': { bath: 55, groom: 85, weight: 40 },
  'Border Terrier': { bath: 48, groom: 65, weight: 14 },
  'Borzoi': { bath: 58, groom: 85, weight: 85 },
  'Boston Terrier': { bath: 48, groom: null, weight: 18 },
  'Bouvier des Flandres': { bath: '68-88', groom: 115, weight: 90 },
  'Boxer': { bath: 50, groom: 55, weight: 65 },
  'Briard': { bath: 78, groom: 100, weight: 80 },
  'Brittany Spaniel': { bath: 50, groom: 70, weight: 35 },
  'Brussels Griffon': { bath: 48, groom: 66, weight: 10 },
  'Bull Mastiff': { bath: 58, groom: 78, weight: 120 },
  'Bull Terrier': { bath: 50, groom: 80, weight: 60 },
  'Cairn Terrier': { bath: 48, groom: 65, weight: 14 },
  'Canaan Dog': { bath: 48, groom: 70, weight: 45 },
  'Cavalier King Charles Spaniel': { bath: 55, groom: 70, weight: 15 },
  'Cavapoo': { bath: 55, groom: 70, weight: 15 },
  'Chesapeake Bay Retriever': { bath: 55, groom: 85, weight: 70 },
  'Chihuahua (Long Hair)': { bath: 48, groom: 65, weight: 6 },
  'Chihuahua (Short Hair)': { bath: 45, groom: 60, weight: 6 },
  'Chinese Crested (Hairless)': { bath: 45, groom: null, weight: 10 },
  'Chinese Crested (Powder Puff)': { bath: 48, groom: 65, weight: 10 },
  'Clumber Spaniel': { bath: 55, groom: 80, weight: 70 },
  'Cocker Spaniel': { bath: 60, groom: 75, weight: 28 },
  'Cockapoo': { bath: 55, groom: 75, weight: 20 },
  'Collie (Rough)': { bath: 75, groom: 88, weight: 65 },
  'Collie (Smooth)': { bath: 58, groom: 88, weight: 65 },
  'Corgi (Cardigan Welsh)': { bath: 50, groom: 68, weight: 28 },
  'Corgi (Pembroke)': { bath: 50, groom: 68, weight: 28 },
  'Curly Coated Retriever': { bath: 60, groom: 80, weight: 70 },
  'Dachshund (Long Hair)': { bath: 48, groom: 65, weight: 20 },
  'Dachshund (Short Hair)': { bath: 45, groom: 60, weight: 20 },
  'Dalmatian': { bath: 55, groom: null, weight: 55 },
  'Dandie Dinmont Terrier': { bath: 48, groom: 65, weight: 20 },
  'Doberman Pinscher': { bath: 55, groom: null, weight: 80 },
  'English Bull Dog': { bath: 55, groom: null, weight: 50 },
  'English Cocker Spaniel': { bath: 60, groom: 75, weight: 28 },
  'English Setter': { bath: 60, groom: 85, weight: 65 },
  'English Toy Spaniel': { bath: 48, groom: 65, weight: 12 },
  'Field Spaniel': { bath: 60, groom: 80, weight: 45 },
  'Finnish Spitz': { bath: 55, groom: 80, weight: 28 },
  'Flat Coated Retriever': { bath: 65, groom: 86, weight: 65 },
  'Foxhound': { bath: 50, groom: null, weight: 65 },
  'French Bulldog': { bath: 55, groom: null, weight: 25 },
  'German Pinscher': { bath: 50, groom: null, weight: 35 },
  'German Shepherd': { bath: '75-80', groom: 95, weight: 75 },
  'German Shorthair Pointer': { bath: 48, groom: null, weight: 60 },
  'German Wirehair Pointer': { bath: 50, groom: 78, weight: 65 },
  'Glen of Imaal Terrier': { bath: 48, groom: 60, weight: 35 },
  'Goldendoodle': { bath: '70-90', groom: '90-130', weight: 55 },
  'Goldendoodle (Mini)': { bath: 70, groom: 90, weight: 25 },
  'Goldendoodle (Medium)': { bath: 78, groom: 105, weight: 45 },
  'Goldendoodle (Standard)': { bath: 90, groom: 130, weight: 65 },
  'Golden Retriever': { bath: 65, groom: 86, weight: 70 },
  'Gordon Setter': { bath: 58, groom: 85, weight: 65 },
  'Great Dane': { bath: 70, groom: null, weight: 140 },
  'Great Pyrenees': { bath: '80-95', groom: 120, weight: 100 },
  'Greater Swiss Mountain Dog': { bath: 60, groom: 85, weight: 115 },
  'Greyhound': { bath: 55, groom: null, weight: 65 },
  'Harrier': { bath: 50, groom: null, weight: 50 },
  'Havanese': { bath: 55, groom: 70, weight: 12 },
  'Ibizan Hound': { bath: 48, groom: 60, weight: 50 },
  'Irish Setter': { bath: 60, groom: 85, weight: 65 },
  'Irish Terrier': { bath: 48, groom: 65, weight: 27 },
  'Irish Water Spaniel': { bath: 70, groom: 125, weight: 58 },
  'Irish Wolfhound': { bath: 68, groom: 88, weight: 120 },
  'Italian Greyhound': { bath: 55, groom: null, weight: 65 },
  'Jack Russell Terrier (Rough)': { bath: 50, groom: 65, weight: 15 },
  'Jack Russell Terrier (Smooth)': { bath: 48, groom: 65, weight: 15 },
  'Japanese Chin': { bath: 48, groom: 65, weight: 9 },
  'Keeshond': { bath: 70, groom: 90, weight: 40 },
  'Kerry Blue Terrier': { bath: '70-93', groom: 120, weight: 35 },
  'Komondor Corded': { bath: 130, groom: 145, weight: 100 },
  'Kuvasz': { bath: '80-95', groom: 105, weight: 100 },
  'Labrador Retriever': { bath: 60, groom: 85, weight: 70 },
  'Labradoodle': { bath: '70-90', groom: '95-130', weight: 55 },
  'Labradoodle (Mini)': { bath: 70, groom: 95, weight: 25 },
  'Labradoodle (Medium)': { bath: 78, groom: 110, weight: 45 },
  'Labradoodle (Standard)': { bath: 90, groom: 130, weight: 65 },
  'Lakeland Terrier': { bath: 68, groom: 85, weight: 17 },
  'Lhasa Apso': { bath: 50, groom: 65, weight: 14 },
  'Maltese': { bath: 50, groom: 68, weight: 6 },
  'Manchester Terrier': { bath: 48, groom: null, weight: 18 },
  'Mastiff': { bath: 72, groom: null, weight: 175 },
  'Maltipoo': { bath: 55, groom: 75, weight: 12 },
  'Newfoundland': { bath: '85-95', groom: 120, weight: 130 },
  'Norfolk Terrier': { bath: 48, groom: 65, weight: 12 },
  'Norwegian Elkhound': { bath: '70-75', groom: 85, weight: 50 },
  'Nova Scotia Duck Tolling Retriever': { bath: 58, groom: 78, weight: 45 },
  'Old English Sheepdog': { bath: '70-92', groom: '100-120', weight: 80 },
  'Otterhound': { bath: '65-75', groom: '85-105', weight: 100 },
  'Papillion': { bath: 50, groom: 65, weight: 8 },
  'Pekingese': { bath: 55, groom: 68, weight: 12 },
  'Petit Basset Griffon Vendeen': { bath: 58, groom: 78, weight: 55 },
  'Pharaoh Hound': { bath: 45, groom: 75, weight: 50 },
  'Pit Bull': { bath: 55, groom: 83, weight: 55 },
  'Plott Hound': { bath: 48, groom: null, weight: 55 },
  'Pointer': { bath: 50, groom: null, weight: 60 },
  'Polish Lowland Sheepdog': { bath: '70-90', groom: '90-115', weight: 45 },
  'Poodle (Toy)': { bath: 55, groom: 65, weight: 8 },
  'Poodle (Miniature)': { bath: 55, groom: 70, weight: 15 },
  'Poodle (Standard)': { bath: 75, groom: '125-135', weight: 55 },
  'Pomeranian': { bath: 55, groom: 70, weight: 6 },
  'Portuguese Water Dog': { bath: '65-82', groom: '85-95', weight: 50 },
  'Pug': { bath: 50, groom: 65, weight: 16 },
  'Puli': { bath: 110, groom: 125, weight: 30 },
  'Rhodesian Ridgeback': { bath: 60, groom: 85, weight: 80 },
  'Rottweiler': { bath: 60, groom: 85, weight: 100 },
  'Saint Bernard': { bath: '85-95', groom: '95-120', weight: 150 },
  'Saluki': { bath: 48, groom: 75, weight: 50 },
  'Samoyed': { bath: '70-85', groom: '85-95', weight: 55 },
  'Schipperke': { bath: 45, groom: 60, weight: 14 },
  'Schnauzer (Miniature)': { bath: 55, groom: 68, weight: 15 },
  'Schnauzer (Standard)': { bath: 60, groom: 80, weight: 40 },
  'Schnauzer (Giant)': { bath: 72, groom: 108, weight: 70 },
  'Scottish Deerhound': { bath: 68, groom: 90, weight: 95 },
  'Scottish Terrier': { bath: 50, groom: 65, weight: 20 },
  'Sealyham Terrier': { bath: 48, groom: 62, weight: 22 },
  'Shar Pei': { bath: 50, groom: null, weight: 50 },
  'Shetland Sheepdog': { bath: 65, groom: 80, weight: 22 },
  'Sheepadoodle': { bath: '75-95', groom: '100-125', weight: 65 },
  'Sheepadoodle (Mini)': { bath: 75, groom: 100, weight: 35 },
  'Sheepadoodle (Standard)': { bath: 95, groom: 125, weight: 75 },
  'Shih Tzu': { bath: 55, groom: 70, weight: 12 },
  'Siberian Husky': { bath: '68-78', groom: 100, weight: 50 },
  'Silky Terrier': { bath: 45, groom: 60, weight: 10 },
  'Smooth Fox Terrier': { bath: 42, groom: null, weight: 17 },
  'Soft Coated Wheaten Terrier': { bath: '58-68', groom: '80-90', weight: 38 },
  'Spinone Italiano': { bath: 60, groom: 86, weight: 10 },
  'Staffordshire Bull Terrier': { bath: 45, groom: 75, weight: 35 },
  'Sussex Spaniel': { bath: 55, groom: 75, weight: 40 },
  'Swedish Vallhund': { bath: 55, groom: 72, weight: 28 },
  'Tibetan Mastiff': { bath: '80-95', groom: 115, weight: 175 },
  'Tibetan Spaniel': { bath: 50, groom: 65, weight: 12 },
  'Tibetan Terrier': { bath: '55-65', groom: 75, weight: 25 },
  'Toy Fox Terrier': { bath: 48, groom: null, weight: 6 },
  'Vizsla': { bath: 50, groom: 72, weight: 55 },
  'Weimaraner': { bath: 60, groom: 78, weight: 70 },
  'Welsh Spinger Spaniel': { bath: 53, groom: 78, weight: 35 },
  'Welsh Terrier': { bath: 62, groom: 85, weight: 20 },
  'West Highland White Terrier': { bath: 48, groom: 60, weight: 18 },
  'Whippet': { bath: 50, groom: null, weight: 30 },
  'Wire Fox Terrier': { bath: 50, groom: 65, weight: 17 },
  'Wirehaired Pointer Griffon': { bath: 58, groom: 78, weight: 60 },
  'Yorkshire Terrier': { bath: 55, groom: 75, weight: 7 },
  'Mixed Breed (Small, under 20 lbs)': { bath: 48, groom: 65, weight: 15 },
  'Mixed Breed (Medium, 20-50 lbs)': { bath: 55, groom: 75, weight: 35 },
  'Mixed Breed (Large, 50-80 lbs)': { bath: 65, groom: 90, weight: 65 },
  'Mixed Breed (XL, over 80 lbs)': { bath: 75, groom: 105, weight: 100 },
};

const ADD_ON_SERVICES = [
  { id: 'nail_grind', name: 'Nail Grind', price: 12 },
  { id: 'flea_treatment', name: 'Flea Treatment', price: 15 },
  { id: 'teeth_cleaning', name: 'Teeth Cleaning', price: 12 },
  { id: 'whitening_shampoo', name: 'Whitening Shampoo', price: 12 },
  { id: 'medicated_shampoo', name: 'Medicated Shampoo', price: 12 },
  { id: 'deep_conditioner', name: 'Deep Conditioner Mask', price: 12 },
  { id: 'paw_nose_butter', name: 'Paw & Nose Butter', price: 10 },
  { id: 'tick_removal', name: 'Tick Removal', price: 15 },
];

// Walk-in services (includes add-ons plus walk-in specific services)
const WALK_IN_SERVICES = [
  { id: 'nail_trim', name: 'Nail Trim', price: 15 },
  { id: 'nail_grind', name: 'Nail Grind', price: 20 },
  { id: 'anal_glands', name: 'Anal Glands', price: 15 },
  { id: 'teeth_cleaning', name: 'Teeth Cleaning', price: 12 },
  { id: 'ear_cleaning', name: 'Ear Cleaning', price: 10 },
  { id: 'paw_nose_butter', name: 'Paw & Nose Butter', price: 10 },
  { id: 'flea_treatment', name: 'Flea Treatment', price: 15 },
  { id: 'tick_removal', name: 'Tick Removal', price: 15 },
];

// Admin emails - add your email here
const ADMIN_EMAILS = ['jordan@carterspetmarket.com', 'team@carterspetmarket.com'];

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
  const [groomers, setGroomers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDog, setSelectedDog] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [showAddDog, setShowAddDog] = useState(false);
  const [newDog, setNewDog] = useState({ name: '', breed: '', size: 'small' });
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [hasSpecialNeeds, setHasSpecialNeeds] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');
  const [petVaccinations, setPetVaccinations] = useState({});
  const [showVaccinationModal, setShowVaccinationModal] = useState(false);
  const [vaccinationDog, setVaccinationDog] = useState(null);
  const [adminView, setAdminView] = useState('calendar');
  const [adminDate, setAdminDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingNotes, setEditingNotes] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [adminTab, setAdminTab] = useState('calendar');
  const [groomerFilter, setGroomerFilter] = useState('all');
  const [allCustomers, setAllCustomers] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petHistory, setPetHistory] = useState([]);
  const [editingPetNotes, setEditingPetNotes] = useState(false);
  const [petNotesText, setPetNotesText] = useState('');
  const [editingGroomerNotes, setEditingGroomerNotes] = useState(null);
  const [groomerNotesText, setGroomerNotesText] = useState('');
  const [reportStartDate, setReportStartDate] = useState(new Date().toISOString().slice(0, 8) + '01');
  const [reportEndDate, setReportEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportGroomer, setReportGroomer] = useState('all');
  const [reportData, setReportData] = useState([]);
  const [allGroomers, setAllGroomers] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [editingGroomer, setEditingGroomer] = useState(null);
  const [newGroomerName, setNewGroomerName] = useState('');
  const [groomerSchedules, setGroomerSchedules] = useState([]);
  const [editingScheduleGroomer, setEditingScheduleGroomer] = useState(null);
  const [newSlotDay, setNewSlotDay] = useState(1);
  const [newSlotTime, setNewSlotTime] = useState('9:00 AM');
  const [newSlotMaxDogs, setNewSlotMaxDogs] = useState(2);
  const [newSlotMaxLarge, setNewSlotMaxLarge] = useState(1);
  
  // Custom charges for bookings
  const [addingChargeToBooking, setAddingChargeToBooking] = useState(null);
  const [newChargeName, setNewChargeName] = useState('');
  const [newChargePrice, setNewChargePrice] = useState('');
  
  // Date-based scheduling
  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [scheduleViewDate, setScheduleViewDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduleViewMode, setScheduleViewMode] = useState('week'); // 'week' or 'day'
  const [groomerTemplates, setGroomerTemplates] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateGroomer, setTemplateGroomer] = useState(null);
  const [newTemplateSlot, setNewTemplateSlot] = useState({ day: 1, time: '9:00 AM', maxDogs: 2, maxLarge: 1 });
  const [bulkAddMode, setBulkAddMode] = useState(false);
  const [bulkStartDate, setBulkStartDate] = useState('');
  const [bulkEndDate, setBulkEndDate] = useState('');
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [addSlotData, setAddSlotData] = useState({ groomerId: null, date: '', time: '9:00 AM', maxDogs: 2, maxLarge: 1 });
  const [activityLog, setActivityLog] = useState([]);
  const [activityFilter, setActivityFilter] = useState('all');
  const [editingBookingPrice, setEditingBookingPrice] = useState(null);
  const [bookingPriceValue, setBookingPriceValue] = useState('');
  
  // Front Desk Booking States
  const [fdPhoneSearch, setFdPhoneSearch] = useState('');
  const [fdSearchResults, setFdSearchResults] = useState([]);
  const [fdSelectedCustomer, setFdSelectedCustomer] = useState(null);
  const [fdSelectedPets, setFdSelectedPets] = useState([]);
  const [fdSelectedService, setFdSelectedService] = useState('');
  const [fdSelectedAddOns, setFdSelectedAddOns] = useState([]);
  const [fdSelectedDate, setFdSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [fdBookingNotes, setFdBookingNotes] = useState('');
  const [fdShowNewCustomer, setFdShowNewCustomer] = useState(false);
  const [fdNewCustomer, setFdNewCustomer] = useState({ name: '', phone: '', email: '' });
  const [fdShowNewPet, setFdShowNewPet] = useState(false);
  const [fdNewPet, setFdNewPet] = useState({ name: '', breed: '' });
  const [fdOverrideMode, setFdOverrideMode] = useState(false);
  
  // Notification Settings
  const [twilioSettings, setTwilioSettings] = useState({ accountSid: '', authToken: '', phoneNumber: '', enabled: false });
  const [notificationPrefs, setNotificationPrefs] = useState({ 
    confirmationText: true, 
    reminderText: true, 
    completionText: true,
    reminderTiming: 'day_before' // 'day_before' or 'morning_of'
  });

  // Staff PIN System
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [currentStaff, setCurrentStaff] = useState(null);
  const [allStaff, setAllStaff] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPin, setNewStaffPin] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('front_desk');
  
  // Booking PIN verification
  const [showBookingPinModal, setShowBookingPinModal] = useState(false);
  const [bookingPinInput, setBookingPinInput] = useState('');
  const [bookingPinError, setBookingPinError] = useState('');
  const [pendingBookingSlot, setPendingBookingSlot] = useState(null);

  // Booking confirmation
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [confirmationSlot, setConfirmationSlot] = useState(null);
  const [smsConsent, setSmsConsent] = useState(true); // SMS opt-in checkbox

  // Booking success
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);

  // Walk-in Sales
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInServices, setWalkInServices] = useState([]);
  const [walkInCustomerName, setWalkInCustomerName] = useState('');
  const [walkInPetName, setWalkInPetName] = useState('');
  const [walkInNotes, setWalkInNotes] = useState('');
  const [walkInPriceOverrides, setWalkInPriceOverrides] = useState({}); // { service_id: custom_price }
  const [walkInGroomer, setWalkInGroomer] = useState(''); // groomer id

  // Edit Booking Services
  const [showEditServicesModal, setShowEditServicesModal] = useState(false);
  const [editingBookingServices, setEditingBookingServices] = useState(null);
  const [editBookingAddOns, setEditBookingAddOns] = useState([]);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email?.toLowerCase());
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => { 
    // Check if this is a password reset link FIRST
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');
    
    if (type === 'recovery' && accessToken) {
      setShowResetPassword(true);
      setLoading(false);
      return; // Don't check user, show reset form
    }
    
    // Handle error from expired link
    const error = hashParams.get('error');
    if (error === 'access_denied') {
      alert('Password reset link has expired. Please request a new one.');
      window.location.hash = '';
    }
    
    checkUser();
    
    // Listen for auth state changes (handles OAuth redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        
        // Upsert customer record (handles both new and existing users safely)
        await supabase.from('customers').upsert({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Customer',
          phone: session.user.user_metadata?.phone || ''
        }, { onConflict: 'id', ignoreDuplicates: true });
        
        await loadUserData(session.user.id);
        setView('booking');
        setLoading(false);
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handlePasswordReset = async () => {
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      alert('Error resetting password: ' + error.message);
    } else {
      alert('Password updated successfully! You can now log in.');
      setShowResetPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      window.location.hash = '';
      setView('auth');
    }
  };

  const checkUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const user = data.session.user;
      setUser(user);
      
      // Upsert customer record (handles both new and existing users safely)
      await supabase.from('customers').upsert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Customer',
        phone: user.user_metadata?.phone || ''
      }, { onConflict: 'id', ignoreDuplicates: true });
      
      await loadUserData(user.id);
      setView('booking');
    }
    setLoading(false);
  };

  const loadUserData = async (userId) => {
    const { data: dogsData } = await supabase.from('dogs').select('*').eq('customer_id', userId).neq('active', false);
    setDogs(dogsData || []);
    const { data: groomersData } = await supabase.from('groomers').select('*').eq('active', true);
    setGroomers(groomersData || []);
    // Load date-based schedule slots for customer booking
    const today = new Date().toISOString().split('T')[0];
    const twoMonthsOut = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const { data: slotsData } = await supabase.from('schedule_slots').select('*, groomers(name)').eq('active', true).gte('date', today).lte('date', twoMonthsOut);
    setSchedules(slotsData || []);
    const { data: servicesData } = await supabase.from('services').select('*');
    setAllServices(servicesData || []);
    const { data: bookingsData } = await supabase.from('bookings').select('*, dogs(name, breed), groomers(name), services(name)').eq('customer_id', userId).gte('appointment_date', new Date().toISOString().split('T')[0]).order('appointment_date', { ascending: true });
    setBookings(bookingsData || []);
    // Load ALL bookings for capacity checking (minimal fields, non-canceled only)
    const { data: capacityBookings } = await supabase
      .from('bookings')
      .select('id, appointment_date, appointment_time, groomer_id, groomers(id, name), dogs(id, size)')
      .gte('appointment_date', today)
      .lte('appointment_date', twoMonthsOut)
      .not('status', 'in', '("canceled","no_show")');
    setAllBookings(capacityBookings || []);
    // Load past completed bookings
    const { data: pastData } = await supabase.from('bookings').select('*, dogs(name, breed), groomers(name), services(name)').eq('customer_id', userId).lt('appointment_date', new Date().toISOString().split('T')[0]).eq('status', 'completed').order('appointment_date', { ascending: false }).limit(10);
    setPastBookings(pastData || []);
    // Load vaccinations from database
    const { data: vaxData } = await supabase.from('pet_vaccinations').select('*').eq('customer_id', userId);
    const vaxMap = {};
    (vaxData || []).forEach(v => {
      vaxMap[v.dog_id] = {
        rabies: !!v.rabies_status,
        rabiesMethod: v.rabies_status,
        rabiesFile: v.rabies_file,
        dhpp: !!v.dhpp_status,
        dhppMethod: v.dhpp_status,
        dhppFile: v.dhpp_file,
        bordetella: !!v.bordetella_status,
        bordetellaMethod: v.bordetella_status,
        bordetellaFile: v.bordetella_file
      };
    });
    setPetVaccinations(vaxMap);
  };

  const loadAllBookings = async () => {
    const { data } = await supabase.from('bookings').select('*, dogs(id, name, breed, size, customer_id, notes), groomers(id, name), services(name), customers(name, phone, email)').gte('appointment_date', new Date().toISOString().split('T')[0]).order('appointment_date', { ascending: true });
    const { data: allVax } = await supabase.from('pet_vaccinations').select('*');
    const vaxMap = {};
    (allVax || []).forEach(v => { vaxMap[v.dog_id] = v; });
    setAllBookings((data || []).map(b => ({ ...b, vaccination: vaxMap[b.dogs?.id] })));
    
    // Load all customers for admin
    const { data: customersData } = await supabase.from('customers').select('*').order('name');
    setAllCustomers(customersData || []);
    
    // Load all pets for admin
    const { data: petsData } = await supabase.from('dogs').select('*, customers(name, phone, email)').order('name');
    setAllPets((petsData || []).map(p => ({ ...p, vaccination: vaxMap[p.id] })));

    // Load all groomers for admin
    const { data: groomersData } = await supabase.from('groomers').select('*').order('name');
    setAllGroomers(groomersData || []);

    // Load all services
    const { data: servicesData } = await supabase.from('services').select('*');
    setAllServices(servicesData || []);

    // Load date-based schedule slots (next 3 months)
    const today = new Date().toISOString().split('T')[0];
    const threeMonthsOut = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const { data: slotsData } = await supabase.from('schedule_slots').select('*, groomers(name)').gte('date', today).lte('date', threeMonthsOut).order('date, time');
    setScheduleSlots(slotsData || []);
    
    // Also set schedules for backwards compatibility
    setGroomerSchedules(slotsData || []);

    // Load groomer templates
    const { data: templatesData } = await supabase.from('groomer_templates').select('*, groomers(name)').order('groomer_id, day_of_week, time');
    setGroomerTemplates(templatesData || []);

    // Load all staff
    const { data: staffData } = await supabase.from('staff').select('*').order('name');
    setAllStaff(staffData || []);

    // Load recent activity log (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: activityData } = await supabase.from('activity_log').select('*').gte('created_at', weekAgo).order('created_at', { ascending: false }).limit(200);
    setActivityLog(activityData || []);
  };

  // Staff PIN functions
  const handleAdminAccess = () => {
    if (currentStaff) {
      // Already authenticated, go to admin
      setView('admin');
    } else {
      // Show PIN modal
      setShowPinModal(true);
      setPinInput('');
      setPinError('');
    }
  };

  const verifyPin = async () => {
    if (!pinInput || pinInput.length < 4) {
      setPinError('Please enter a valid PIN');
      return;
    }
    
    const { data: staffMember } = await supabase
      .from('staff')
      .select('*')
      .eq('pin', pinInput)
      .eq('active', true)
      .single();
    
    if (staffMember) {
      setCurrentStaff(staffMember);
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
      setView('admin');
      
      // Log the staff login
      await logActivity(
        'staff_login',
        'staff',
        staffMember.id,
        `${staffMember.name} logged into admin dashboard`,
        { staffName: staffMember.name, role: staffMember.role }
      );
    } else {
      setPinError('Invalid PIN');
      setPinInput('');
    }
  };

  const staffLogout = () => {
    setCurrentStaff(null);
    setView('booking');
  };

  const addStaffMember = async () => {
    if (!newStaffName || !newStaffPin || newStaffPin.length < 4) {
      alert('Please enter name and a PIN (min 4 digits)');
      return;
    }
    
    // Check if PIN already exists
    const { data: existing } = await supabase
      .from('staff')
      .select('id')
      .eq('pin', newStaffPin);
    
    if (existing && existing.length > 0) {
      alert('This PIN is already in use');
      return;
    }
    
    const { error } = await supabase.from('staff').insert([{
      name: newStaffName,
      pin: newStaffPin,
      role: newStaffRole
    }]);
    
    if (error) {
      alert('Error adding staff: ' + error.message);
    } else {
      setNewStaffName('');
      setNewStaffPin('');
      setNewStaffRole('front_desk');
      loadAllBookings(); // Reload staff list
    }
  };

  const updateStaffMember = async (staffId, updates) => {
    const { error } = await supabase
      .from('staff')
      .update(updates)
      .eq('id', staffId);
    
    if (error) {
      alert('Error updating staff: ' + error.message);
    } else {
      setEditingStaff(null);
      loadAllBookings();
    }
  };

  const toggleStaffActive = async (staffId, currentActive) => {
    await updateStaffMember(staffId, { active: !currentActive });
  };

  useEffect(() => { if (isAdmin && view === 'admin') { loadAllBookings(); loadNotificationSettings(); } }, [view, isAdmin]);

  const handleSignup = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password, options: { data: { name, phone } } });
      if (authError) throw authError;
      // Use upsert to handle edge cases where customer record might already exist
      const { error: customerError } = await supabase.from('customers').upsert({ 
        id: authData.user.id, 
        email, 
        name, 
        phone, 
        password_hash: 'handled_by_auth' 
      }, { onConflict: 'id' });
      if (customerError) {
        // Check for duplicate phone number
        if (customerError.code === '23505' && customerError.message.includes('phone')) {
          throw new Error('This phone number is already registered. Please use a different number or log in to your existing account.');
        }
        throw customerError;
      }
      // Auto-login after signup (no email verification required)
      setUser(authData.user);
      await loadUserData(authData.user.id);
      setView('booking');
    } catch (error) { alert(error.message); }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      await loadUserData(data.user.id);
      setView('booking');
    } catch (error) { alert(error.message); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setView('landing'); setPetVaccinations({}); };

  const handleAddDog = async () => {
    if (!newDog.name || !newDog.breed) { alert('Please fill in dog name and breed'); return; }
    try {
      // Auto-calculate size from breed weight (35 and under = small, 36+ = large)
      const breedWeight = BREED_DATABASE[newDog.breed]?.weight || 35;
      const autoSize = breedWeight <= 35 ? 'small' : 'large';
      const { data, error } = await supabase.from('dogs').insert([{ customer_id: user.id, name: newDog.name, breed: newDog.breed, weight: breedWeight, size: autoSize }]).select();
      if (error) throw error;
      setDogs([...dogs, data[0]]);
      setNewDog({ name: '', breed: '', size: 'small' });
      setShowAddDog(false);
    } catch (error) { alert(error.message); }
  };

  const handleRemoveDog = async (dog) => {
    const confirmed = window.confirm(`Remove ${dog.name} from your account?\n\nThis will hide ${dog.name} from your pet list. This action can be undone by contacting us.`);
    if (!confirmed) return;
    try {
      // Soft delete - mark as inactive rather than deleting
      const { error } = await supabase.from('dogs').update({ active: false }).eq('id', dog.id);
      if (error) throw error;
      setDogs(dogs.filter(d => d.id !== dog.id));
      if (selectedDog?.id === dog.id) setSelectedDog(null);
    } catch (error) { alert('Error removing pet: ' + error.message); }
  };

  const getVaccinationFileUrl = async (filePath) => {
    if (!filePath) return null;
    const { data, error } = await supabase.storage.from('vaccinations').createSignedUrl(filePath, 3600); // 1 hour expiry
    if (error) { console.error('Error getting signed URL:', error); return null; }
    return data.signedUrl;
  };

  const saveVaccinations = async (dogId, vaxData) => {
    // Check if record exists
    const { data: existing } = await supabase.from('pet_vaccinations').select('id').eq('dog_id', dogId).single();
    
    const record = {
      dog_id: dogId,
      customer_id: user.id,
      rabies_status: vaxData.rabiesMethod || null,
      rabies_file: vaxData.rabiesFile || null,
      dhpp_status: vaxData.dhppMethod || null,
      dhpp_file: vaxData.dhppFile || null,
      bordetella_status: vaxData.bordetellaMethod || null,
      bordetella_file: vaxData.bordetellaFile || null,
      updated_at: new Date().toISOString()
    };

    if (existing) {
      await supabase.from('pet_vaccinations').update(record).eq('dog_id', dogId);
    } else {
      await supabase.from('pet_vaccinations').insert([record]);
    }

    // Update local state
    const updated = { ...petVaccinations, [dogId]: vaxData };
    setPetVaccinations(updated);
  };

  const getDogVaxStatus = (dogId) => {
    const vax = petVaccinations[dogId];
    if (!vax) return { rabies: false, rabiesMethod: null, dhpp: false, dhppMethod: null, bordetella: false, bordetellaMethod: null };
    return vax;
  };

  const canBookOnline = (dogId) => {
    const vax = getDogVaxStatus(dogId);
    return vax.rabies;
  };

  const getAvailableSlots = () => {
    if (!selectedDate || !selectedDog) return [];
    const breedInfo = BREED_DATABASE[selectedDog.breed];
    const isLarge = breedInfo && breedInfo.weight > 35;
    
    const slots = [];
    const seen = new Set();
    
    // Filter schedule slots for the selected date
    const dateSlots = schedules.filter(s => s.date === selectedDate && s.active);
    
    dateSlots.forEach(schedule => {
      const key = schedule.time + '-' + schedule.groomer_id;
      if (seen.has(key)) return;
      seen.add(key);
      
      // Count current bookings
      const slotBookings = allBookings.filter(b => 
        b.groomers?.id === schedule.groomer_id && 
        b.appointment_time === schedule.time && 
        b.appointment_date === selectedDate
      );
      const totalDogs = slotBookings.length;
      const largeCount = slotBookings.filter(b => b.dogs?.size === 'large').length;
      
      const maxDogs = schedule.max_dogs ?? 2;
      const maxLarge = schedule.max_large ?? 1;
      
      // Check if there's room: total dogs < max AND (if large dog, large count < max large)
      const hasRoom = (totalDogs < maxDogs) && (!isLarge || largeCount < maxLarge);
      
      if (hasRoom) {
        slots.push({ 
          time: schedule.time, 
          groomer: schedule.groomers?.name || 'Unknown', 
          groomerId: schedule.groomer_id,
          totalDogs,
          largeCount,
          maxDogs,
          maxLarge
        });
      }
    });
    
    return slots.sort((a, b) => {
      const getMinutes = (time) => { const [t, period] = time.split(' '); let [h, m] = t.split(':').map(Number); if (period === 'PM' && h !== 12) h += 12; if (period === 'AM' && h === 12) h = 0; return h * 60 + (m || 0); };
      return getMinutes(a.time) - getMinutes(b.time);
    });
  };

  const handleBooking = async (slot) => {
    if (!selectedService) { alert('Please select a service'); return; }
    if (!canBookOnline(selectedDog.id)) { alert('Please complete vaccination records first'); return; }
    try {
      const vax = getDogVaxStatus(selectedDog.id);
      const vaxNotes = `Rabies: ${vax.rabiesMethod === 'upload' ? 'Uploaded' : 'Bringing physical copy'}`;
      const addOnNotes = selectedAddOns.length > 0 ? 'Add-ons: ' + selectedAddOns.map(id => ADD_ON_SERVICES.find(s => s.id === id)?.name).join(', ') + ' | ' : '';
      const specialNotes = hasSpecialNeeds && bookingNotes ? '⚠️ SPECIAL NEEDS: ' + bookingNotes + ' | ' : '';
      const { error } = await supabase.from('bookings').insert([{ customer_id: user.id, dog_id: selectedDog.id, groomer_id: slot.groomerId, service_id: selectedService, appointment_date: selectedDate, appointment_time: slot.time, status: 'scheduled', notes: specialNotes + addOnNotes + vaxNotes, sms_consent: smsConsent }]);
      if (error) throw error;
      
      // Send confirmation notification ONLY if customer opted in
      if (smsConsent) {
        const { data: customerData } = await supabase.from('customers').select('phone').eq('id', user.id).single();
        if (customerData?.phone) {
          sendNotification('confirmation', {
            dogName: selectedDog.name,
            date: new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
            time: slot.time,
            groomer: slot.groomer
          }, customerData.phone);
        }
      }
      
      // Store completed booking details for success screen
      const serviceName = allServices.find(s => s.id === selectedService)?.name || 'Service';
      setCompletedBooking({
        petName: selectedDog.name,
        petBreed: selectedDog.breed,
        petId: selectedDog.id,
        service: serviceName,
        serviceId: selectedService,
        date: selectedDate,
        time: slot.time,
        groomer: slot.groomer,
        addOns: selectedAddOns.map(id => ADD_ON_SERVICES.find(s => s.id === id)?.name).filter(Boolean),
        addOnIds: [...selectedAddOns]
      });
      
      setShowBookingConfirmation(false);
      setConfirmationSlot(null);
      setShowBookingSuccess(true);
      
      await loadUserData(user.id);
      setSelectedDog(null); setSelectedDate(''); setSelectedService(''); setSelectedAddOns([]); setHasSpecialNeeds(false); setBookingNotes(''); setSmsConsent(true);
    } catch (error) { alert(error.message); }
  };

  const handleCancelBooking = async (booking) => {
    // Check if appointment is more than 24 hours away
    const appointmentDateTime = new Date(booking.appointment_date + 'T' + convertTo24Hour(booking.appointment_time));
    const now = new Date();
    const hoursUntil = (appointmentDateTime - now) / (1000 * 60 * 60);
    
    if (hoursUntil < 24) {
      // Less than 24 hours - must call
      setShowCallPopup(true);
      return;
    }
    
    // More than 24 hours - can cancel online
    const confirmed = window.confirm(`Cancel your appointment for ${booking.dogs?.name} on ${new Date(booking.appointment_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${booking.appointment_time}?\n\nThis cannot be undone.`);
    if (!confirmed) return;
    
    try {
      const { error } = await supabase.from('bookings').update({ status: 'canceled' }).eq('id', booking.id);
      if (error) throw error;
      await loadUserData(user.id);
      alert('Appointment canceled successfully.');
    } catch (error) {
      alert('Error canceling appointment: ' + error.message);
    }
  };

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${String(hours).padStart(2, '0')}:${minutes || '00'}:00`;
  };

  const bookAgainInWeeks = (weeks) => {
    if (!completedBooking) return;
    
    // Find the dog
    const dog = dogs.find(d => d.id === completedBooking.petId);
    if (dog) {
      setSelectedDog(dog);
      setSelectedService(completedBooking.serviceId);
      setSelectedAddOns(completedBooking.addOnIds || []);
      
      // Calculate date X weeks from original booking
      const futureDate = new Date(completedBooking.date);
      futureDate.setDate(futureDate.getDate() + (weeks * 7));
      setSelectedDate(futureDate.toISOString().split('T')[0]);
    }
    
    setShowBookingSuccess(false);
    setCompletedBooking(null);
  };

  const showConfirmation = (slot) => {
    setConfirmationSlot(slot);
    setShowBookingConfirmation(true);
  };

  const getServicePrice = (serviceType) => {
    if (!selectedDog) return null;
    const breedInfo = BREED_DATABASE[selectedDog.breed];
    if (!breedInfo) return null;
    return serviceType === 'bath' ? breedInfo.bath : breedInfo.groom;
  };

  const formatPrice = (price) => {
    if (price === null) return 'N/A';
    if (typeof price === 'string') return '$' + price.split('-')[0] + '+';
    return '$' + price;
  };

  const getAddOnsTotal = () => selectedAddOns.reduce((total, id) => { const addon = ADD_ON_SERVICES.find(s => s.id === id); return total + (addon ? addon.price : 0); }, 0);
  const toggleAddOn = (id) => { if (selectedAddOns.includes(id)) { setSelectedAddOns(selectedAddOns.filter(a => a !== id)); } else { setSelectedAddOns([...selectedAddOns, id]); } };
  const toggleFdAddOn = (id) => { if (fdSelectedAddOns.includes(id)) { setFdSelectedAddOns(fdSelectedAddOns.filter(a => a !== id)); } else { setFdSelectedAddOns([...fdSelectedAddOns, id]); } };
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // Activity Log function
  const logActivity = async (action, entityType, entityId, description, details = {}) => {
    try {
      await supabase.from('activity_log').insert({
        action,
        entity_type: entityType,
        entity_id: entityId,
        description,
        details,
        staff_id: currentStaff?.id || null,
        staff_name: currentStaff?.name || null,
        user_id: user?.id || null,
        user_email: user?.email || null
      });
    } catch (err) {
      console.error('Failed to log activity:', err);
    }
  };
  
  // Get the Sunday of the week containing a given date
  const getWeekStart = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const day = date.getDay();
    const diff = date.getDate() - day;
    const sunday = new Date(date);
    sunday.setDate(diff);
    return sunday;
  };

  // Front Desk: Get ALL slots (shows full slots too for override)
  const getFrontDeskSlots = () => {
    if (!fdSelectedDate) return [];
    
    // Count how many dogs (and large dogs) are being booked
    const newDogsCount = fdSelectedPets.length;
    const newLargeCount = fdSelectedPets.filter(p => BREED_DATABASE[p.breed]?.weight > 35).length;
    
    const slots = [];
    const seen = new Set();
    
    // Filter schedule slots for the selected date
    const dateSlots = scheduleSlots.filter(s => s.date === fdSelectedDate && s.active !== false);
    
    dateSlots.forEach(schedule => {
      const key = schedule.time + '-' + schedule.groomer_id;
      if (seen.has(key)) return;
      seen.add(key);
      
      const slotBookings = allBookings.filter(b => 
        b.groomers?.id === schedule.groomer_id && 
        b.appointment_time === schedule.time && 
        b.appointment_date === fdSelectedDate
      );
      const totalDogs = slotBookings.length;
      const largeCount = slotBookings.filter(b => b.dogs?.size === 'large').length;
      
      const maxDogs = schedule.max_dogs ?? 2;
      const maxLarge = schedule.max_large ?? 1;
      
      // Check if there's room for all selected pets
      const hasRoom = (totalDogs + newDogsCount <= maxDogs) && (largeCount + newLargeCount <= maxLarge);
      const isFull = totalDogs >= maxDogs;
      const isLargeFull = largeCount >= maxLarge;
      
      slots.push({ 
        time: schedule.time, 
        groomer: schedule.groomers?.name || 'Unknown', 
        groomerId: schedule.groomer_id,
        totalDogs,
        largeCount,
        maxDogs,
        maxLarge,
        hasRoom,
        isFull,
        isLargeFull
      });
    });
    
    return slots.sort((a, b) => {
      const getMinutes = (time) => { const [t, period] = time.split(' '); let [h, m] = t.split(':').map(Number); if (period === 'PM' && h !== 12) h += 12; if (period === 'AM' && h === 12) h = 0; return h * 60 + (m || 0); };
      return getMinutes(a.time) - getMinutes(b.time);
    });
  };

  // Front Desk: Search customers by phone
  const searchCustomersByPhone = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) {
      setFdSearchResults([]);
      return;
    }
    const normalizedSearch = searchTerm.replace(/\D/g, '');
    const results = allCustomers.filter(c => {
      const normalizedPhone = (c.phone || '').replace(/\D/g, '');
      return normalizedPhone.includes(normalizedSearch) || 
             c.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFdSearchResults(results);
  };

  // Front Desk: Create new customer
  const createFdCustomer = async () => {
    if (!fdNewCustomer.name || !fdNewCustomer.phone) {
      alert('Name and phone are required');
      return;
    }
    try {
      const tempId = crypto.randomUUID();
      const { data, error } = await supabase.from('customers')
        .insert([{ id: tempId, name: fdNewCustomer.name, phone: fdNewCustomer.phone, email: fdNewCustomer.email || null }])
        .select();
      if (error) throw error;
      await loadAllBookings();
      setFdSelectedCustomer(data[0]);
      setFdShowNewCustomer(false);
      setFdNewCustomer({ name: '', phone: '', email: '' });
    } catch (error) { alert(error.message); }
  };

  // Front Desk: Create new pet
  const createFdPet = async () => {
    if (!fdNewPet.name || !fdNewPet.breed || !fdSelectedCustomer) {
      alert('Pet name and breed are required');
      return;
    }
    try {
      const breedInfo = BREED_DATABASE[fdNewPet.breed];
      const size = breedInfo && breedInfo.weight > 35 ? 'large' : 'small';
      const { data, error } = await supabase.from('dogs')
        .insert([{ customer_id: fdSelectedCustomer.id, name: fdNewPet.name, breed: fdNewPet.breed, size }])
        .select();
      if (error) throw error;
      await loadAllBookings();
      setFdSelectedPets([...fdSelectedPets, data[0]]);
      setFdShowNewPet(false);
      setFdNewPet({ name: '', breed: '' });
    } catch (error) { alert(error.message); }
  };

  // Front Desk: Initiate booking (shows PIN modal)
  const initiateBooking = (slot) => {
    if (!fdSelectedCustomer || fdSelectedPets.length === 0 || !fdSelectedService) {
      alert('Please select customer, pet(s), and service');
      return;
    }
    
    // Check capacity unless override mode
    if (!fdOverrideMode && !slot.hasRoom) {
      alert('This slot is full. Enable Admin Override to book anyway.');
      return;
    }
    
    // Store the slot and show PIN modal
    setPendingBookingSlot(slot);
    setBookingPinInput('');
    setBookingPinError('');
    setShowBookingPinModal(true);
  };

  // Verify PIN and complete booking
  const verifyBookingPin = async () => {
    if (!bookingPinInput || bookingPinInput.length < 4) {
      setBookingPinError('Please enter a valid PIN');
      return;
    }
    
    const { data: staffMember } = await supabase
      .from('staff')
      .select('*')
      .eq('pin', bookingPinInput)
      .eq('active', true)
      .single();
    
    if (staffMember) {
      setShowBookingPinModal(false);
      setBookingPinInput('');
      setBookingPinError('');
      await handleFrontDeskBooking(pendingBookingSlot, staffMember);
      setPendingBookingSlot(null);
    } else {
      setBookingPinError('Invalid PIN');
      setBookingPinInput('');
    }
  };

  // Booking PIN Modal (for Front Desk bookings)
  const BookingPinModal = () => {
    if (!showBookingPinModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-green-600">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="text-white" size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Confirm Booking</h3>
            <p className="text-gray-600 mb-6">Enter your PIN to complete this booking</p>
            
            <input
              type="password"
              maxLength={6}
              placeholder="Enter PIN"
              value={bookingPinInput}
              onChange={(e) => setBookingPinInput(e.target.value.replace(/\D/g, ''))}
              onKeyPress={(e) => e.key === 'Enter' && verifyBookingPin()}
              className="w-full p-4 text-center text-3xl font-bold tracking-widest border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 mb-4"
              autoFocus
            />
            
            {bookingPinError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 font-semibold">
                {bookingPinError}
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowBookingPinModal(false); setBookingPinInput(''); setBookingPinError(''); setPendingBookingSlot(null); }}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={verifyBookingPin}
                disabled={bookingPinInput.length < 4}
                className={`flex-1 py-3 font-bold rounded-xl transition ${
                  bookingPinInput.length >= 4 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Customer Booking Confirmation Modal
  const BookingConfirmationModal = () => {
    if (!showBookingConfirmation || !confirmationSlot) return null;
    
    const serviceName = allServices.find(s => s.id === selectedService)?.name || 'Service';
    const servicePrice = serviceName.includes('Bath') ? bathPrice : groomPrice;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full border-4 border-red-600 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-white" size={32} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Confirm Your Appointment</h3>
            <p className="text-gray-600 mt-2">Please review your booking details</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Pet</p>
                  <p className="text-lg font-bold text-gray-900">{selectedDog?.name}</p>
                  <p className="text-sm text-gray-600">{selectedDog?.breed}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Service</p>
                  <p className="text-lg font-bold text-gray-900">{serviceName}</p>
                  <p className="text-sm text-red-600 font-semibold">{formatPrice(servicePrice)}*</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                  <p className="text-lg font-bold text-gray-900">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Time</p>
                  <p className="text-lg font-bold text-gray-900">{confirmationSlot.time}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200">
                <p className="text-xs text-gray-500 uppercase font-bold">Groomer</p>
                <p className="text-lg font-bold text-gray-900">{confirmationSlot.groomer}</p>
              </div>
            </div>
            
            {selectedAddOns.length > 0 && (
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <p className="text-xs text-gray-500 uppercase font-bold mb-2">Add-Ons</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAddOns.map(id => {
                    const addon = ADD_ON_SERVICES.find(s => s.id === id);
                    return <span key={id} className="px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">{addon?.name} (+${addon?.price})</span>;
                  })}
                </div>
                <p className="text-right font-bold text-green-700 mt-2">Add-ons: +${getAddOnsTotal()}</p>
              </div>
            )}
            
            {hasSpecialNeeds && bookingNotes && (
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Special Notes</p>
                <p className="text-sm text-gray-700">{bookingNotes}</p>
              </div>
            )}
          </div>
          
          <p className="text-xs text-gray-400 italic text-center mb-4">*Price is an estimate. Final price may vary based on coat condition.</p>
          
          {/* SMS Consent Checkbox - Required for Twilio A2P compliance */}
          <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={smsConsent} 
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <div>
                <span className="font-semibold text-gray-900">Text me updates about this appointment</span>
                <p className="text-xs text-gray-500 mt-1">
                  Receive confirmation & pickup notifications. Msg & data rates may apply. Reply STOP to unsubscribe. 
                  <a href="https://cpm0.goodbarber.app/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>
                </p>
              </div>
            </label>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => handleBooking(confirmationSlot)}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-lg rounded-xl transition shadow-lg"
            >
              ✓ Confirm Booking
            </button>
            <button 
              onClick={() => { setShowBookingConfirmation(false); setConfirmationSlot(null); }}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
            >
              ← Go Back & Edit
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Booking Success Modal
  const BookingSuccessModal = () => {
    if (!showBookingSuccess || !completedBooking) return null;
    
    const formattedDate = new Date(completedBooking.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className="w-20 sm:w-24 h-20 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="text-white" size={48} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">You're All Set! 🎉</h3>
            <p className="text-gray-600 mt-2">Your appointment has been booked</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 sm:p-6 border-2 border-green-200 mb-6">
            <div className="text-center mb-4 pb-4 border-b border-green-200">
              <p className="text-sm text-green-700 font-semibold uppercase">Appointment Details</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Pet</span>
                <span className="font-bold text-gray-900">{completedBooking.petName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Service</span>
                <span className="font-bold text-gray-900">{completedBooking.service}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Date</span>
                <span className="font-bold text-gray-900">{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Time</span>
                <span className="font-bold text-gray-900">{completedBooking.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Groomer</span>
                <span className="font-bold text-gray-900">{completedBooking.groomer}</span>
              </div>
              {completedBooking.addOns.length > 0 && (
                <div className="pt-3 border-t border-green-200">
                  <span className="text-gray-600 font-medium">Add-Ons</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {completedBooking.addOns.map((addon, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">{addon}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200 mb-6">
            <div className="flex items-start gap-3">
              <Phone className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-bold text-blue-900">Need to make changes?</p>
                <p className="text-sm text-blue-700">You can cancel online (24+ hrs notice) or call us at <a href="tel:+17132537718" className="font-bold underline">(713) 253-7718</a>.</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200 mb-6">
            <p className="font-bold text-purple-900 mb-3">📅 Book {completedBooking.petName}'s next groom?</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => bookAgainInWeeks(4)} className="py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold rounded-lg text-sm transition">4 weeks</button>
              <button onClick={() => bookAgainInWeeks(6)} className="py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold rounded-lg text-sm transition">6 weeks</button>
              <button onClick={() => bookAgainInWeeks(8)} className="py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold rounded-lg text-sm transition">8 weeks</button>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => { setShowBookingSuccess(false); setCompletedBooking(null); }}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-lg rounded-xl transition shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Front Desk: Book appointment (supports multiple pets)
  const handleFrontDeskBooking = async (slot, staffMember) => {
    try {
      const addOnNotes = fdSelectedAddOns.length > 0 
        ? 'Add-ons: ' + fdSelectedAddOns.map(id => ADD_ON_SERVICES.find(s => s.id === id)?.name).join(', ') + ' | ' 
        : '';
      const overrideNote = !slot.hasRoom ? '⚠️ ADMIN OVERRIDE - Slot was full | ' : '';
      const staffNote = fdBookingNotes ? `📝 ${fdBookingNotes} | ` : '';
      const bookedByNote = staffMember ? `Booked by ${staffMember.name}` : 'Booked by staff';
      const notesText = overrideNote + staffNote + addOnNotes + bookedByNote;
      
      // Create a booking for each selected pet
      for (const pet of fdSelectedPets) {
        const bookingData = {
          customer_id: fdSelectedCustomer.id,
          dog_id: pet.id,
          groomer_id: slot.groomerId,
          service_id: fdSelectedService,
          appointment_date: fdSelectedDate,
          appointment_time: slot.time,
          status: 'scheduled',
          created_by_staff_id: staffMember?.id || null,
          created_by_staff_name: staffMember?.name || null
        };
        
        // Try with notes first, fall back to without if column doesn't exist
        let result = await supabase.from('bookings').insert([{ ...bookingData, notes: notesText }]).select();
        if (result.error && result.error.message.includes('notes')) {
          result = await supabase.from('bookings').insert([bookingData]).select();
        }
        if (result.error) throw result.error;

        // Log the activity
        const serviceName = allServices.find(s => s.id === fdSelectedService)?.name || 'Service';
        await logActivity(
          'booking_created',
          'booking',
          result.data?.[0]?.id,
          `Booked ${pet.name} (${fdSelectedCustomer.name}) for ${serviceName} on ${fdSelectedDate} at ${slot.time} with ${slot.groomer}`,
          { petName: pet.name, customerName: fdSelectedCustomer.name, service: serviceName, date: fdSelectedDate, time: slot.time, groomer: slot.groomer, override: !slot.hasRoom }
        );
      }
      
      alert(`${fdSelectedPets.length} booking(s) confirmed!`);
      
      // Send confirmation notification
      if (fdSelectedCustomer.phone) {
        const petNames = fdSelectedPets.map(p => p.name).join(' & ');
        sendNotification('confirmation', {
          dogName: petNames,
          date: new Date(fdSelectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
          time: slot.time,
          groomer: slot.groomer
        }, fdSelectedCustomer.phone);
      }
      
      await loadAllBookings();
      
      // Reset form
      setFdSelectedPets([]);
      setFdSelectedService('');
      setFdSelectedAddOns([]);
      setFdBookingNotes('');
      setFdOverrideMode(false);
    } catch (error) { alert(error.message); }
  };

  // Send notification via Supabase Edge Function
  const sendNotification = async (type, booking, customerPhone) => {
    console.log('📱 sendNotification called:', { type, booking, customerPhone });
    try {
      const { data: settings, error: settingsError } = await supabase.from('settings').select('*').eq('key', 'twilio').single();
      console.log('📱 Twilio settings:', settings, settingsError);
      if (!settings?.value?.enabled) {
        console.log('📱 SMS disabled - skipping');
        return;
      }
      
      const { data: prefs, error: prefsError } = await supabase.from('settings').select('*').eq('key', 'notifications').single();
      console.log('📱 Notification prefs:', prefs, prefsError);
      if (!prefs?.value?.[type + 'Text']) {
        console.log('📱 Notification type disabled:', type + 'Text', prefs?.value);
        return;
      }

      const messages = {
        confirmation: `🐾 Booking Confirmed!\n\nHi! Your grooming appointment for ${booking.dogName} is scheduled for ${booking.date} at ${booking.time} with ${booking.groomer}.\n\n- Carter's Pet Market`,
        reminder: `🐾 Appointment Reminder!\n\nDon't forget! ${booking.dogName}'s grooming appointment is ${booking.isToday ? 'TODAY' : 'tomorrow'} at ${booking.time} with ${booking.groomer}.\n\nSee you soon!\n- Carter's Pet Market`,
        completion: `🐾 ${booking.dogName} is Ready!\n\nGreat news! ${booking.dogName} is all done and looking fabulous! You can pick them up anytime.\n\nSee you soon!\n- Carter's Pet Market`
      };

      console.log('📱 Sending SMS to:', customerPhone);
      // Direct fetch with proper headers
      const response = await fetch('https://wpvoejdfvuhsrfderhpo.supabase.co/functions/v1/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm9lamRmdnVoc3JmZGVyaHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNjY3NjIsImV4cCI6MjA4Mzg0Mjc2Mn0.Pwe7wnUITAdxlKYaEFUrDud4Ij4EwULzdH3WAwn4m7g',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm9lamRmdnVoc3JmZGVyaHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNjY3NjIsImV4cCI6MjA4Mzg0Mjc2Mn0.Pwe7wnUITAdxlKYaEFUrDud4Ij4EwULzdH3WAwn4m7g'
        },
        body: JSON.stringify({ to: customerPhone, message: messages[type] })
      });
      const result = await response.json();
      console.log('📱 SMS response:', response.status, result);
    } catch (error) {
      console.error('📱 Notification error:', error);
    }
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, newStatus, booking) => {
    try {
      const oldStatus = booking?.status;
      await supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
      
      // Log the status change
      await logActivity(
        'booking_status',
        'booking',
        bookingId,
        `Changed ${booking?.dogs?.name || 'Pet'}'s appointment status from ${oldStatus} to ${newStatus}`,
        { petName: booking?.dogs?.name, customerName: booking?.customers?.name, oldStatus, newStatus, date: booking?.appointment_date }
      );
      
      // Send completion notification (only if customer opted in)
      if (newStatus === 'completed' && booking && booking.sms_consent !== false) {
        await sendNotification('completion', {
          dogName: booking.dogs?.name,
          date: booking.appointment_date,
          time: booking.appointment_time,
          groomer: booking.groomers?.name
        }, booking.customers?.phone);
      }
      
      await loadAllBookings();
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  // Mark as no-show
  const markNoShow = async (bookingId, booking) => {
    if (!confirm('Mark this appointment as a no-show?')) return;
    try {
      await supabase.from('bookings').update({ status: 'no_show' }).eq('id', bookingId);
      
      // Log the no-show
      await logActivity(
        'booking_noshow',
        'booking',
        bookingId,
        `Marked ${booking?.dogs?.name || 'Pet'} (${booking?.customers?.name || 'Customer'}) as NO SHOW`,
        { petName: booking?.dogs?.name, customerName: booking?.customers?.name, date: booking?.appointment_date, time: booking?.appointment_time }
      );
      
      // Increment no-show count on the dog (fixed: was using broken RPC syntax)
      const dogId = booking?.dogs?.id || booking?.dog_id;
      if (dogId) {
        const { data: dog } = await supabase.from('dogs').select('no_show_count').eq('id', dogId).single();
        await supabase.from('dogs').update({ 
          no_show_count: (dog?.no_show_count || 0) + 1 
        }).eq('id', dogId);
      }
      await loadAllBookings();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Load notification settings
  const loadNotificationSettings = async () => {
    try {
      const { data: twilio } = await supabase.from('settings').select('*').eq('key', 'twilio').single();
      if (twilio?.value) setTwilioSettings(twilio.value);
      
      const { data: prefs } = await supabase.from('settings').select('*').eq('key', 'notifications').single();
      if (prefs?.value) setNotificationPrefs(prefs.value);
    } catch (error) {
      console.log('No notification settings yet');
    }
  };

  // Save notification settings
  const saveNotificationSettings = async () => {
    try {
      await supabase.from('settings').upsert({ key: 'twilio', value: twilioSettings });
      await supabase.from('settings').upsert({ key: 'notifications', value: notificationPrefs });
      alert('Notification settings saved!');
    } catch (error) {
      alert('Error saving: ' + error.message);
    }
  };

  const getBookingsForDate = (date) => allBookings.filter(b => b.appointment_date === date && b.status !== 'canceled' && b.status !== 'no_show');

  // Password Reset Page - check FIRST before anything else
  if (showResetPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-red-600">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Carter's Pet Market" className="h-20 w-auto mx-auto mb-4" />
            <h1 className="text-3xl font-black text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your new password below</p>
          </div>
          <div className="space-y-4">
            <input 
              type="password" 
              placeholder="New Password (min 6 characters)" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition" 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition" 
            />
            <button 
              onClick={handlePasswordReset} 
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
            >
              Update Password
            </button>
            <button 
              onClick={() => { setShowResetPassword(false); window.location.hash = ''; window.location.href = '/'; }} 
              className="w-full text-gray-600 hover:text-gray-800 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return (<div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center"><div className="text-center"><PawPrint className="animate-bounce text-red-600 mx-auto mb-4" size={48} /><div className="text-xl font-semibold text-gray-700">Loading...</div></div></div>);

  // Landing Page
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white w-full overflow-x-hidden">
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50"><div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2 sm:gap-3"><img src="/logo.png" alt="Carter's Pet Market" className="h-10 sm:h-12 w-auto" /><div className="hidden sm:block"><h1 className="text-xl sm:text-2xl font-black text-gray-900">Carter's Pet Market</h1><p className="text-xs text-gray-600 font-semibold">Professional Grooming</p></div></div><div className="flex items-center gap-2 sm:gap-3"><button onClick={() => setView('login')} className="hidden sm:block px-6 py-2 text-gray-700 font-bold hover:text-red-600 transition">Sign In</button><button onClick={() => setView('login')} className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition shadow-lg text-sm sm:text-base">Book Now</button></div></div></div></nav>
        <div className="pt-20 sm:pt-28 pb-12 sm:pb-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 w-full"><div className="max-w-6xl mx-auto px-4 sm:px-6"><div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"><div><div className="inline-block px-3 sm:px-4 py-2 bg-red-100 text-red-700 font-bold rounded-full text-xs sm:text-sm mb-4 sm:mb-6">🐾 Proudly Serving Houston Since 2008</div><h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">Houston's Most Trusted <span className="text-red-600">Pet Grooming</span></h2><p className="text-base sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">Family-owned and locally loved for over 17 years. Our expert groomers treat every pet like their own — because your furry family deserves nothing less.</p><div className="flex flex-col sm:flex-row gap-3 sm:gap-4"><button onClick={() => setView('login')} className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-base sm:text-lg font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition shadow-xl hover:shadow-2xl transform hover:scale-105">Book Appointment</button><a href="tel:+17132537718" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 text-base sm:text-lg font-bold rounded-xl border-2 border-red-600 hover:bg-red-50 transition shadow-lg flex items-center justify-center gap-2"><Phone size={20} />(713) 253-7718</a></div></div><div className="relative mt-8 lg:mt-0"><img src="/hero-image.png" alt="Professional dog grooming" className="rounded-2xl sm:rounded-3xl shadow-2xl w-full" /></div></div></div></div>
        <div className="py-12 sm:py-20 bg-white w-full"><div className="max-w-6xl mx-auto px-4 sm:px-6"><h3 className="text-2xl sm:text-4xl font-black text-center text-gray-900 mb-3 sm:mb-4">Why Houston Chooses Us</h3><p className="text-center text-gray-600 mb-8 sm:mb-16 text-base sm:text-lg">Locally owned. Expertly groomed. Genuinely loved.</p><div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8"><div className="text-center p-6 sm:p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl border-2 border-red-200"><div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"><Star className="text-white" size={24} /></div><h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3">17+ Years Experience</h4><p className="text-gray-700 text-sm sm:text-base">Proudly serving Houston pet families since 2008</p></div><div className="text-center p-6 sm:p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl border-2 border-red-200"><div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"><PawPrint className="text-white" size={24} /></div><h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3">We Actually Care</h4><p className="text-gray-700 text-sm sm:text-base">Your pet isn't just an appointment — they're family</p></div><div className="text-center p-6 sm:p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl border-2 border-red-200 sm:col-span-2 md:col-span-1"><div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"><Dog className="text-white" size={24} /></div><h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3">All Breeds Welcome</h4><p className="text-gray-700 text-sm sm:text-base">From tiny Chihuahuas to Great Danes — we love them all</p></div></div></div></div>
        <div className="py-12 sm:py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 w-full"><div className="max-w-6xl mx-auto px-4 sm:px-6"><h3 className="text-2xl sm:text-4xl font-black text-center text-gray-900 mb-3 sm:mb-4">Book in 3 Easy Steps</h3><p className="text-center text-gray-600 mb-8 sm:mb-16 text-base sm:text-lg">Online booking available 24/7</p><div className="grid sm:grid-cols-3 gap-6 sm:gap-8"><div className="text-center"><div className="w-14 sm:w-20 h-14 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-2xl sm:text-3xl font-black">1</div><h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3">Add Your Pet</h4><p className="text-gray-700 text-sm sm:text-base">Create an account and tell us about your furry friend</p></div><div className="text-center"><div className="w-14 sm:w-20 h-14 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-2xl sm:text-3xl font-black">2</div><h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3">Choose Service</h4><p className="text-gray-700 text-sm sm:text-base">Select from our grooming services and add-ons</p></div><div className="text-center"><div className="w-14 sm:w-20 h-14 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-2xl sm:text-3xl font-black">3</div><h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3">Pick a Time</h4><p className="text-gray-700 text-sm sm:text-base">Book your slot and we'll take care of the rest!</p></div></div></div></div>
        <div className="py-12 sm:py-20 bg-red-600 w-full"><div className="max-w-4xl mx-auto px-4 sm:px-6 text-center"><h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">Ready to Pamper Your Pup?</h3><p className="text-base sm:text-xl text-red-100 mb-6 sm:mb-8">Join thousands of Houston pet parents who trust Carter's Pet Market!</p><div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"><button onClick={() => setView('login')} className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-red-600 text-lg sm:text-xl font-black rounded-xl hover:bg-gray-100 transition shadow-2xl transform hover:scale-105">Book Online Now</button><a href="tel:+17132537718" className="px-8 sm:px-12 py-4 sm:py-5 bg-transparent text-white text-lg sm:text-xl font-black rounded-xl border-2 border-white hover:bg-white/10 transition flex items-center justify-center gap-2"><Phone size={24} />Call Us</a></div></div></div>
        <footer className="bg-gray-900 text-white py-8 sm:py-12 w-full"><div className="max-w-6xl mx-auto px-4 sm:px-6"><div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8"><div><h5 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">Carter's Pet Market</h5><p className="text-gray-400 text-sm sm:text-base">Houston's trusted pet grooming since 2008. Family-owned, locally loved.</p></div><div><h5 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">Contact</h5><a href="tel:+17132537718" className="text-gray-400 mb-2 flex items-center gap-2 hover:text-white transition text-sm sm:text-base"><Phone size={16} />(713) 253-7718</a><a href="mailto:Team@carterspetmarket.com" className="text-gray-400 flex items-center gap-2 hover:text-white transition text-sm sm:text-base"><Mail size={16} />Team@carterspetmarket.com</a></div><div><h5 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">Grooming Hours</h5><p className="text-gray-400 text-sm sm:text-base">Open 7 Days a Week</p><p className="text-gray-400 text-sm sm:text-base">First Appointment at 7am</p></div></div><div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base"><p>© 2025 Carter's Pet Market. All rights reserved. | Houston, TX</p></div></div></footer>
      </div>
    );
  }

  // Login Page
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="absolute top-4 left-4"><button onClick={() => setView('landing')} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition font-semibold text-gray-700 text-sm sm:text-base">← Back</button></div>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md border-2 sm:border-4 border-red-600">
          <div className="text-center mb-6 sm:mb-8"><img src="/logo.png" alt="Carter's Pet Market" className="h-16 sm:h-20 w-auto mx-auto mb-3 sm:mb-4" /><h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2">Carter's Pet Market</h1><p className="text-gray-600 font-medium text-sm sm:text-base">Professional Grooming Services</p></div>
          
          {authMode === 'forgot' ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 text-center">Reset Password</h2>
              <p className="text-gray-600 text-center text-sm">Enter your email and we'll send you a link to reset your password.</p>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition" />
              <button 
                onClick={async () => {
                  if (!email) { alert('Please enter your email'); return; }
                  const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/reset-password'
                  });
                  if (error) {
                    alert(error.message);
                  } else {
                    alert('Check your email for the password reset link!');
                    setAuthMode('login');
                  }
                }} 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
              >
                Send Reset Link
              </button>
              <button onClick={() => setAuthMode('login')} className="w-full text-gray-600 hover:text-gray-800 font-semibold">
                ← Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-3 mb-6"><button onClick={() => setAuthMode('login')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${authMode === 'login' ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Login</button><button onClick={() => setAuthMode('signup')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${authMode === 'signup' ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Sign Up</button></div>
              
              {/* Google Sign-In Button */}
              <button 
                onClick={async () => {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: { redirectTo: window.location.origin }
                  });
                  if (error) alert(error.message);
                }}
                className="w-full mb-4 p-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {authMode === 'signup' && (<><input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition" /><input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition" /></>)}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition" />
                <button onClick={authMode === 'login' ? handleLogin : handleSignup} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-105">{authMode === 'login' ? 'Login to Book' : 'Create Account'}</button>
                {authMode === 'login' && (
                  <button onClick={() => setAuthMode('forgot')} className="w-full text-gray-500 hover:text-red-600 text-sm font-medium transition">
                    Forgot your password?
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (view === 'admin' && isAdmin) {
    const filteredBookings = groomerFilter === 'all' 
      ? getBookingsForDate(adminDate) 
      : getBookingsForDate(adminDate).filter(b => b.groomers?.name === groomerFilter);
    
    // Calculate slot usage (small = 1 point, large = 2 points)
    const getSlotUsage = (groomerId, time, date) => {
      const slotBookings = allBookings.filter(b => 
        b.groomers?.id === groomerId && 
        b.appointment_time === time && 
        b.appointment_date === date
      );
      const totalDogs = slotBookings.length;
      const largeCount = slotBookings.filter(b => b.dogs?.size === 'large').length;
      const schedule = groomerSchedules.find(s => 
        s.groomer_id === groomerId && 
        s.time === time && 
        s.day_of_week === new Date(date + 'T00:00:00').getDay()
      );
      const maxDogs = schedule?.max_dogs ?? schedule?.max_small ?? schedule?.capacity ?? 2;
      const maxLarge = schedule?.max_large ?? 1;
      return { totalDogs, largeCount, maxDogs, maxLarge, bookings: slotBookings };
    };

    const changeDate = (days) => {
      const d = new Date(adminDate);
      d.setDate(d.getDate() + days);
      setAdminDate(d.toISOString().split('T')[0]);
    };

    const saveNotes = async (bookingId) => {
      await supabase.from('bookings').update({ notes: noteText }).eq('id', bookingId);
      await loadAllBookings();
      setEditingNotes(null);
      setNoteText('');
    };

    const savePetNotes = async (dogId) => {
      await supabase.from('dogs').update({ notes: petNotesText }).eq('id', dogId);
      await loadAllBookings();
      setEditingPetNotes(false);
      setSelectedPet({ ...selectedPet, notes: petNotesText });
    };

    const saveGroomerNotesFromCard = async (dogId) => {
      await supabase.from('dogs').update({ notes: groomerNotesText }).eq('id', dogId);
      await loadAllBookings();
      setEditingGroomerNotes(null);
      setGroomerNotesText('');
    };

    const addCustomCharge = async (bookingId) => {
      if (!newChargeName || !newChargePrice) return;
      const booking = allBookings.find(b => b.id === bookingId);
      const existingCharges = booking?.extra_charges || [];
      const newCharges = [...existingCharges, { name: newChargeName, price: parseFloat(newChargePrice) }];
      await supabase.from('bookings').update({ extra_charges: newCharges }).eq('id', bookingId);
      await loadAllBookings();
      setAddingChargeToBooking(null);
      setNewChargeName('');
      setNewChargePrice('');
    };

    const removeCustomCharge = async (bookingId, chargeIndex) => {
      const booking = allBookings.find(b => b.id === bookingId);
      const existingCharges = booking?.extra_charges || [];
      const newCharges = existingCharges.filter((_, idx) => idx !== chargeIndex);
      await supabase.from('bookings').update({ extra_charges: newCharges }).eq('id', bookingId);
      await loadAllBookings();
    };

    const getTodayBookings = () => {
      const today = new Date().toISOString().split('T')[0];
      return allBookings.filter(b => b.appointment_date === today && b.status !== 'canceled' && b.status !== 'no_show').sort((a, b) => {
        const getMinutes = (time) => { const [t, period] = time.split(' '); let [h, m] = t.split(':').map(Number); if (period === 'PM' && h !== 12) h += 12; if (period === 'AM' && h === 12) h = 0; return h * 60 + (m || 0); };
        return getMinutes(a.appointment_time) - getMinutes(b.appointment_time);
      });
    };

    const loadPetHistory = async (dogId) => {
      const { data } = await supabase.from('bookings').select('*, groomers(name), services(name)').eq('dog_id', dogId).order('appointment_date', { ascending: false });
      setPetHistory(data || []);
    };

    const filteredCustomers = allCustomers.filter(c => 
      c.name?.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone?.includes(customerSearch) ||
      c.email?.toLowerCase().includes(customerSearch.toLowerCase())
    );

    const customerPets = selectedCustomer ? allPets.filter(p => p.customer_id === selectedCustomer.id) : [];
    const fdCustomerPets = fdSelectedCustomer ? allPets.filter(p => p.customer_id === fdSelectedCustomer.id) : [];

    const uniqueGroomers = [...new Set(allBookings.map(b => b.groomers?.name).filter(Boolean))];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <BookingPinModal />
        
        {/* Walk-In Sale Modal */}
        {showWalkInModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-900">💵 Walk-In Sale</h2>
                  <button onClick={() => { setShowWalkInModal(false); setWalkInServices([]); setWalkInCustomerName(''); setWalkInPetName(''); setWalkInNotes(''); setWalkInPriceOverrides({}); setWalkInGroomer(''); }} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name (optional)</label>
                      <input 
                        type="text" 
                        value={walkInCustomerName}
                        onChange={(e) => setWalkInCustomerName(e.target.value)}
                        placeholder="Walk-in customer"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Pet Name (optional)</label>
                      <input 
                        type="text" 
                        value={walkInPetName}
                        onChange={(e) => setWalkInPetName(e.target.value)}
                        placeholder="Pet name"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  {/* Groomer Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Groomer <span className="text-red-500">*</span></label>
                    <select
                      value={walkInGroomer}
                      onChange={(e) => setWalkInGroomer(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl"
                    >
                      <option value="">Select groomer...</option>
                      {groomers.filter(g => g.active !== false).map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Services</label>
                    <div className="grid grid-cols-2 gap-2">
                      {WALK_IN_SERVICES.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setWalkInServices(prev => 
                              prev.includes(service.id) 
                                ? prev.filter(s => s !== service.id)
                                : [...prev, service.id]
                            );
                          }}
                          className={`p-3 rounded-xl border-2 transition text-left flex items-center justify-between ${
                            walkInServices.includes(service.id) 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${walkInServices.includes(service.id) ? 'bg-green-500' : 'bg-gray-200'}`}>
                              {walkInServices.includes(service.id) && <Check className="text-white" size={12} />}
                            </div>
                            <span className="font-semibold text-sm">{service.name}</span>
                          </div>
                          <span className="font-bold text-green-600 text-sm">${service.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selected services with editable prices */}
                  {walkInServices.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Adjust Prices (tap to edit)</label>
                      <div className="space-y-2">
                        {walkInServices.map(id => {
                          const service = WALK_IN_SERVICES.find(s => s.id === id);
                          const currentPrice = walkInPriceOverrides[id] !== undefined ? walkInPriceOverrides[id] : service?.price;
                          return (
                            <div key={id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                              <span className="font-semibold text-gray-900">{service?.name}</span>
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500">$</span>
                                <input
                                  type="number"
                                  value={currentPrice}
                                  onChange={(e) => setWalkInPriceOverrides(prev => ({
                                    ...prev,
                                    [id]: parseFloat(e.target.value) || 0
                                  }))}
                                  className="w-20 p-2 border-2 border-gray-300 rounded-lg text-right font-bold text-green-600"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (optional)</label>
                    <textarea 
                      value={walkInNotes}
                      onChange={(e) => setWalkInNotes(e.target.value)}
                      placeholder="Any notes..."
                      className="w-full p-3 border-2 border-gray-300 rounded-xl"
                      rows={2}
                    />
                  </div>
                  
                  {walkInServices.length > 0 && (
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Total:</span>
                        <span className="text-2xl font-black text-green-600">
                          ${walkInServices.reduce((total, id) => {
                            const service = WALK_IN_SERVICES.find(s => s.id === id);
                            const price = walkInPriceOverrides[id] !== undefined ? walkInPriceOverrides[id] : service?.price;
                            return total + (price || 0);
                          }, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={async () => {
                      if (walkInServices.length === 0) {
                        alert('Please select at least one service');
                        return;
                      }
                      if (!walkInGroomer) {
                        alert('Please select a groomer');
                        return;
                      }
                      const selectedGroomer = groomers.find(g => g.id === walkInGroomer);
                      const total = walkInServices.reduce((t, id) => {
                        const service = WALK_IN_SERVICES.find(s => s.id === id);
                        const price = walkInPriceOverrides[id] !== undefined ? walkInPriceOverrides[id] : service?.price;
                        return t + (price || 0);
                      }, 0);
                      const serviceNames = walkInServices.map(id => WALK_IN_SERVICES.find(s => s.id === id)?.name).join(', ');
                      
                      // Create a walk-in record
                      const { error } = await supabase.from('walk_in_sales').insert({
                        customer_name: walkInCustomerName || 'Walk-in',
                        pet_name: walkInPetName || null,
                        services: walkInServices,
                        service_names: serviceNames,
                        total_price: total,
                        notes: walkInNotes || null,
                        staff_name: currentStaff?.name || 'Staff',
                        groomer_id: walkInGroomer,
                        groomer_name: selectedGroomer?.name || 'Unknown',
                        created_at: new Date().toISOString()
                      });
                      
                      if (error) {
                        // Table might not exist, just show success anyway
                        console.log('Walk-in sale recorded (table may not exist):', { serviceNames, total, groomer: selectedGroomer?.name });
                      }
                      
                      alert(`✅ Walk-in sale recorded!\n\nGroomer: ${selectedGroomer?.name}\nServices: ${serviceNames}\nTotal: $${total.toFixed(2)}`);
                      
                      // Reset all state and close modal
                      setWalkInServices([]);
                      setWalkInCustomerName('');
                      setWalkInPetName('');
                      setWalkInNotes('');
                      setWalkInPriceOverrides({});
                      setWalkInGroomer('');
                      setShowWalkInModal(false);
                    }}
                    disabled={walkInServices.length === 0 || !walkInGroomer}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                      walkInServices.length > 0 && walkInGroomer
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Complete Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Edit Booking Services Modal */}
        {showEditServicesModal && editingBookingServices && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-900">➕ Add Services</h2>
                  <button onClick={() => { setShowEditServicesModal(false); setEditingBookingServices(null); }} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                  <p className="font-semibold text-gray-900">{editingBookingServices.dogs?.name}</p>
                  <p className="text-sm text-gray-600">{editingBookingServices.services?.name} • {editingBookingServices.appointment_time}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Add-On Services</label>
                    <div className="grid grid-cols-2 gap-2">
                      {ADD_ON_SERVICES.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setEditBookingAddOns(prev => 
                              prev.includes(service.id) 
                                ? prev.filter(s => s !== service.id)
                                : [...prev, service.id]
                            );
                          }}
                          className={`p-3 rounded-xl border-2 transition text-left flex items-center justify-between ${
                            editBookingAddOns.includes(service.id) 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${editBookingAddOns.includes(service.id) ? 'bg-green-500' : 'bg-gray-200'}`}>
                              {editBookingAddOns.includes(service.id) && <Check className="text-white" size={12} />}
                            </div>
                            <span className="font-semibold text-sm">{service.name}</span>
                          </div>
                          <span className="font-bold text-green-600 text-sm">+${service.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {editBookingAddOns.length > 0 && (
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Add-Ons Total:</span>
                        <span className="text-xl font-black text-green-600">
                          +${editBookingAddOns.reduce((total, id) => {
                            const service = ADD_ON_SERVICES.find(s => s.id === id);
                            return total + (service?.price || 0);
                          }, 0)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={async () => {
                      const addOnNames = editBookingAddOns.map(id => ADD_ON_SERVICES.find(s => s.id === id)?.name).filter(Boolean);
                      const addOnsTotal = editBookingAddOns.reduce((t, id) => {
                        const service = ADD_ON_SERVICES.find(s => s.id === id);
                        return t + (service?.price || 0);
                      }, 0);
                      
                      // Update the booking with new add-ons
                      const { error } = await supabase
                        .from('bookings')
                        .update({ 
                          add_ons: editBookingAddOns,
                          add_on_names: addOnNames,
                          add_ons_total: addOnsTotal
                        })
                        .eq('id', editingBookingServices.id);
                      
                      if (error) {
                        alert('Error updating booking: ' + error.message);
                        return;
                      }
                      
                      await loadAllBookings();
                      setShowEditServicesModal(false);
                      setEditingBookingServices(null);
                      alert('✅ Services updated!');
                    }}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <img src="/logo.png" alt="Carter's Pet Market" className="h-10 sm:h-14 w-auto bg-white rounded-xl p-1" />
                <div>
                  <h1 className="text-xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
                  {currentStaff && (
                    <p className="text-red-100 text-xs sm:text-sm font-medium">
                      👤 Logged in as: <span className="font-bold text-white">{currentStaff.name}</span>
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs">{currentStaff.role === 'admin' ? 'Admin' : 'Front Desk'}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button onClick={() => setShowWalkInModal(true)} className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition font-semibold text-sm sm:text-base">💵 Walk-In Sale</button>
                <button onClick={() => setView('booking')} className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition font-semibold text-sm sm:text-base">Back to Booking</button>
                <button onClick={staffLogout} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition font-semibold text-sm sm:text-base"><LogOut size={18} /><span className="hidden sm:inline">Staff Logout</span><span className="sm:hidden">Logout</span></button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 bg-white rounded-2xl p-2 shadow-lg">
            <button onClick={() => { setAdminTab('today'); }} className={`py-2 sm:py-3 px-1 sm:px-4 rounded-xl font-bold transition text-lg sm:text-base ${adminTab === 'today' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sm:hidden">📍</span><span className="hidden sm:inline">📍 Today</span>
            </button>
            <button onClick={() => { setAdminTab('calendar'); setSelectedCustomer(null); setSelectedPet(null); }} className={`py-2 sm:py-3 px-1 sm:px-4 rounded-xl font-bold transition text-lg sm:text-base ${adminTab === 'calendar' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sm:hidden">📅</span><span className="hidden sm:inline">📅 Schedule</span>
            </button>
            <button onClick={() => { setAdminTab('frontdesk'); setFdSelectedCustomer(null); setFdSelectedPet(null); setFdPhoneSearch(''); }} className={`py-2 sm:py-3 px-1 sm:px-4 rounded-xl font-bold transition text-lg sm:text-base ${adminTab === 'frontdesk' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sm:hidden">📞</span><span className="hidden sm:inline">📞 Front Desk</span>
            </button>
            <button onClick={() => { setAdminTab('customers'); setSelectedCustomer(null); setSelectedPet(null); }} className={`py-2 sm:py-3 px-1 sm:px-4 rounded-xl font-bold transition text-lg sm:text-base ${adminTab === 'customers' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sm:hidden">👤</span><span className="hidden sm:inline">👤 Customers</span>
            </button>
            <button onClick={() => { setAdminTab('reports'); }} className={`py-2 sm:py-3 px-1 sm:px-4 rounded-xl font-bold transition text-lg sm:text-base ${adminTab === 'reports' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sm:hidden">📊</span><span className="hidden sm:inline">📊 Reports</span>
            </button>
            <button onClick={() => { setAdminTab('activity'); }} className={`py-2 sm:py-3 px-1 sm:px-4 rounded-xl font-bold transition text-lg sm:text-base ${adminTab === 'activity' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sm:hidden">📋</span><span className="hidden sm:inline">📋 Activity</span>
            </button>
            <button onClick={() => { setAdminTab('settings'); }} className={`py-2 sm:py-3 px-1 sm:px-4 rounded-xl font-bold transition text-lg sm:text-base ${adminTab === 'settings' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sm:hidden">⚙️</span><span className="hidden sm:inline">⚙️ Settings</span>
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* TODAY VIEW TAB */}
          {adminTab === 'today' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-black text-gray-900">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
                <p className="text-xl text-gray-600 mt-2">{getTodayBookings().length} appointments today</p>
              </div>
              
              {getTodayBookings().length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <Calendar className="mx-auto mb-4 text-gray-300" size={64} />
                  <p className="text-2xl font-bold text-gray-400">No appointments today</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {getTodayBookings().map(booking => (
                    <div key={booking.id} className={`p-6 rounded-2xl shadow-lg border-l-8 ${
                      booking.status === 'completed' ? 'bg-green-50 border-green-500' :
                      booking.status === 'in_progress' ? 'bg-blue-50 border-blue-500' :
                      booking.status === 'checked_in' ? 'bg-purple-50 border-purple-500' :
                      'bg-white border-yellow-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <span className="text-3xl font-black text-gray-900">{booking.appointment_time}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-gray-900">{booking.dogs?.name}</h3>
                            <p className="text-lg text-gray-600">{booking.dogs?.breed} • {booking.services?.name}</p>
                            <p className="text-gray-500">{booking.customers?.name} • {booking.customers?.phone}</p>
                            {booking.dogs?.notes && <p className="mt-2 text-purple-700 bg-purple-100 px-3 py-1 rounded-lg text-sm inline-block">🐕 {booking.dogs.notes}</p>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <span className={`px-4 py-2 text-lg font-bold rounded-full ${
                            booking.status === 'completed' ? 'bg-green-500 text-white' :
                            booking.status === 'in_progress' ? 'bg-blue-500 text-white' :
                            booking.status === 'checked_in' ? 'bg-purple-500 text-white' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'checked_in' ? '✓ Checked In' :
                             booking.status === 'in_progress' ? '🔄 In Progress' : 
                             booking.status === 'completed' ? '✅ Done' :
                             '📅 Scheduled'}
                          </span>
                          <div className="flex gap-2">
                            {booking.status === 'scheduled' && (
                              <button onClick={() => updateBookingStatus(booking.id, 'checked_in', booking)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg">✓ Check In</button>
                            )}
                            {booking.status === 'checked_in' && (
                              <button onClick={() => updateBookingStatus(booking.id, 'in_progress', booking)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">🔄 Start</button>
                            )}
                            {booking.status === 'in_progress' && (
                              <button onClick={() => updateBookingStatus(booking.id, 'completed', booking)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">✅ Complete</button>
                            )}
                          </div>
                          <span className="text-lg font-bold text-gray-600">{booking.groomers?.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CALENDAR TAB */}
          {adminTab === 'calendar' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => changeDate(-1)} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition"><ChevronLeft size={24} /></button>
                <div className="text-center">
                  <h2 className="text-3xl font-black text-gray-900">{new Date(adminDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h2>
                  <p className="text-gray-600">{filteredBookings.length} appointment{filteredBookings.length !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => changeDate(1)} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition"><ChevronRight size={24} /></button>
              </div>
              
              <div className="flex gap-4 mb-6">
                <input type="date" value={adminDate} onChange={(e) => setAdminDate(e.target.value)} className="flex-1 p-3 border-2 border-gray-300 rounded-xl" />
                <select value={groomerFilter} onChange={(e) => setGroomerFilter(e.target.value)} className="p-3 border-2 border-gray-300 rounded-xl font-semibold">
                  <option value="all">All Groomers</option>
                  {uniqueGroomers.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl"><Calendar className="mx-auto mb-4 text-gray-300" size={48} /><p className="text-gray-600 font-semibold">No appointments scheduled</p></div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.sort((a, b) => {
                    const getMinutes = (time) => { const [t, period] = time.split(' '); let [h, m] = t.split(':').map(Number); if (period === 'PM' && h !== 12) h += 12; if (period === 'AM' && h === 12) h = 0; return h * 60 + (m || 0); };
                    return getMinutes(a.appointment_time) - getMinutes(b.appointment_time);
                  }).map(booking => (
                    <div key={booking.id} className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                        {/* Header row - time and status */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl sm:text-2xl font-black text-gray-900">{booking.appointment_time}</span>
                          <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold rounded-full ${
                            booking.status === 'completed' ? 'bg-green-500 text-white' :
                            booking.status === 'in_progress' ? 'bg-blue-500 text-white' :
                            booking.status === 'checked_in' ? 'bg-purple-500 text-white' :
                            booking.status === 'no_show' ? 'bg-red-500 text-white' :
                            booking.status === 'cancelled' ? 'bg-gray-500 text-white' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'checked_in' ? '✓ Checked In' :
                             booking.status === 'in_progress' ? '🔄 In Progress' : 
                             booking.status === 'completed' ? '✅ Done' :
                             booking.status === 'no_show' ? '❌ No Show' :
                             booking.status === 'cancelled' ? '🚫 Cancelled' :
                             '📅 Scheduled'}
                          </span>
                        </div>
                        
                        {/* Badges row */}
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">{booking.groomers?.name}</span>
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${booking.dogs?.size === 'large' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                            {booking.dogs?.size === 'large' ? '🐕‍🦺' : '🐕'}
                          </span>
                          {(() => {
                            const usage = getSlotUsage(booking.groomers?.id, booking.appointment_time, booking.appointment_date);
                            const isOverTotal = usage.totalDogs > usage.maxDogs;
                            const isOverLarge = usage.largeCount > usage.maxLarge;
                            return (
                              <span className={`hidden sm:inline px-2 py-1 text-xs font-bold rounded-full ${isOverTotal ? 'bg-red-100 text-red-800' : usage.totalDogs === usage.maxDogs ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {usage.totalDogs}/{usage.maxDogs} dogs {isOverLarge ? '⚠️' : ''}
                              </span>
                            );
                          })()}
                        </div>
                        
                        {/* Pet info */}
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900">{booking.dogs?.name} <span className="font-normal text-gray-600">({booking.dogs?.breed})</span></h3>
                        <p className="text-gray-700 text-sm sm:text-base">Service: <span className="font-semibold">{booking.services?.name}</span></p>
                        <p className="text-gray-700 text-sm sm:text-base">
                          Price: {(() => {
                            const breedInfo = BREED_DATABASE[booking.dogs?.breed];
                            const basePrice = booking.services?.name === 'Full Groom' ? breedInfo?.groom : breedInfo?.bath;
                            const basePriceNum = typeof basePrice === 'string' ? parseInt(basePrice.split('-')[0]) : (basePrice || 0);
                            const displayPrice = booking.actual_price !== null ? booking.actual_price : basePriceNum;
                            const addOnsTotal = booking.add_ons_total || 0;
                            const totalWithAddOns = displayPrice + addOnsTotal;
                            return editingBookingPrice === booking.id ? (
                                <span className="inline-flex items-center gap-1 ml-1">
                                  $<input type="number" value={bookingPriceValue} onChange={(e) => setBookingPriceValue(e.target.value)} className="w-20 p-1 border rounded" />
                                  <button onClick={async () => {
                                    await supabase.from('bookings').update({ actual_price: parseFloat(bookingPriceValue) }).eq('id', booking.id);
                                    await loadAllBookings();
                                    setEditingBookingPrice(null);
                                  }} className="text-green-600 font-bold">✓</button>
                                  <button onClick={() => setEditingBookingPrice(null)} className="text-red-600 font-bold">×</button>
                                </span>
                              ) : (
                                <button onClick={() => { setEditingBookingPrice(booking.id); setBookingPriceValue(displayPrice.toString()); }} className="font-semibold text-green-700 hover:underline">
                                  ${displayPrice}{addOnsTotal > 0 && <span className="text-orange-600"> + ${addOnsTotal} add-ons</span>}{booking.actual_price !== null && <span className="text-xs ml-1">✓</span>}
                                </button>
                              );
                            })()}
                          </p>
                          
                          {/* Display Add-Ons */}
                          {booking.add_on_names && booking.add_on_names.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {booking.add_on_names.map((name, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                                  {name}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {/* Custom Charges / Add-ons - hidden on mobile unless has charges */}
                          <div className={`mt-2 p-2 sm:p-3 bg-orange-50 rounded-xl border-2 border-orange-200 ${(booking.extra_charges || []).length === 0 ? 'hidden sm:block' : ''}`}>
                            <p className="text-xs font-bold text-orange-700 uppercase mb-2">💰 Extra Charges</p>
                            {(booking.extra_charges || []).length > 0 && (
                              <div className="space-y-1 mb-2">
                                {booking.extra_charges.map((charge, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-white px-2 py-1 rounded">
                                    <span className="text-sm text-gray-700">{charge.name}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-green-700">+${charge.price}</span>
                                      <button onClick={() => removeCustomCharge(booking.id, idx)} className="text-red-500 hover:text-red-700 text-xs">✕</button>
                                    </div>
                                  </div>
                                ))}
                                <div className="text-right font-bold text-orange-700 text-sm pt-1 border-t border-orange-200">
                                  Extra Total: +${booking.extra_charges.reduce((sum, c) => sum + c.price, 0)}
                                </div>
                              </div>
                            )}
                            {addingChargeToBooking === booking.id ? (
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input type="text" value={newChargeName} onChange={(e) => setNewChargeName(e.target.value)} placeholder="Matting, Skunk, etc." className="flex-1 p-2 border rounded text-sm" />
                                <div className="flex gap-2 items-center">
                                  <span className="text-gray-500">$</span>
                                  <input type="number" value={newChargePrice} onChange={(e) => setNewChargePrice(e.target.value)} placeholder="0" className="w-20 p-2 border rounded text-sm" />
                                  <button onClick={() => addCustomCharge(booking.id)} className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded text-sm">Add</button>
                                  <button onClick={() => { setAddingChargeToBooking(null); setNewChargeName(''); setNewChargePrice(''); }} className="px-2 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded text-sm">✕</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setAddingChargeToBooking(booking.id)} className="text-orange-600 hover:text-orange-800 font-semibold text-sm">+ Add Extra Charge</button>
                            )}
                          </div>
                          
                          {/* Checkout Total */}
                          {(() => {
                            const breedInfo = BREED_DATABASE[booking.dogs?.breed];
                            const basePrice = booking.services?.name === 'Full Groom' ? breedInfo?.groom : breedInfo?.bath;
                            const basePriceNum = typeof basePrice === 'string' ? parseInt(basePrice.split('-')[0]) : (basePrice || 0);
                            const displayPrice = booking.actual_price !== null ? booking.actual_price : basePriceNum;
                            const addOnsTotal = booking.add_ons_total || 0;
                            const extraChargesTotal = (booking.extra_charges || []).reduce((sum, c) => sum + c.price, 0);
                            const grandTotal = displayPrice + addOnsTotal + extraChargesTotal;
                            
                            return (
                              <div className="mt-3 p-3 bg-green-100 rounded-xl border-2 border-green-300">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-xs font-bold text-green-700 uppercase">💵 Checkout Total</p>
                                    <p className="text-xs text-green-600 mt-1">
                                      ${displayPrice} base
                                      {addOnsTotal > 0 && ` + $${addOnsTotal} add-ons`}
                                      {extraChargesTotal > 0 && ` + $${extraChargesTotal} extra`}
                                    </p>
                                  </div>
                                  <span className="text-2xl font-black text-green-700">${grandTotal}</span>
                                </div>
                              </div>
                            );
                          })()}
                          
                          <div className="text-gray-600 text-xs sm:text-sm mt-2">
                            <span className="font-semibold">Owner:</span> {booking.customers?.name}
                            <span className="hidden sm:inline"> • {booking.customers?.phone} • {booking.customers?.email}</span>
                            <div className="sm:hidden text-xs mt-1">{booking.customers?.phone}</div>
                          </div>
                          {/* Groomer Notes - condensed on mobile */}
                          <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-purple-50 rounded-xl border-2 border-purple-200">
                            {booking.dogs?.notes ? (
                              <div>
                                <p className="text-xs font-bold text-purple-700 uppercase mb-1">🐕 Notes</p>
                                <p className="text-gray-700 text-sm">{booking.dogs.notes}</p>
                                <button onClick={() => { setEditingGroomerNotes(booking.dogs?.id); setGroomerNotesText(booking.dogs?.notes || ''); }} className="text-purple-600 hover:text-purple-800 font-semibold text-xs mt-1">✏️ Edit</button>
                              </div>
                            ) : editingGroomerNotes === booking.dogs?.id ? (
                              <div className="space-y-2">
                                <p className="text-xs font-bold text-purple-700 uppercase">🐕 Add Groomer Notes</p>
                                <textarea value={groomerNotesText} onChange={(e) => setGroomerNotesText(e.target.value)} placeholder="Sensitive ears, use #4 blade, etc." className="w-full p-2 border-2 border-gray-300 rounded-lg text-sm" rows={2} />
                                <div className="flex gap-2">
                                  <button onClick={() => saveGroomerNotesFromCard(booking.dogs?.id)} className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">Save</button>
                                  <button onClick={() => { setEditingGroomerNotes(null); setGroomerNotesText(''); }} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg text-sm">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => { setEditingGroomerNotes(booking.dogs?.id); setGroomerNotesText(''); }} className="text-purple-600 hover:text-purple-800 font-semibold text-sm">🐕 + Add Groomer Notes</button>
                            )}
                          </div>
                          {booking.notes && <p className="text-gray-500 text-xs sm:text-sm mt-2 bg-yellow-50 p-2 rounded-lg">📝 {booking.notes}</p>}
                          
                          {/* Booking notes edit - desktop only */}
                          <div className="hidden sm:block mt-3">
                            {editingNotes === booking.id ? (
                              <div className="space-y-2">
                                <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add notes about this appointment..." className="w-full p-3 border-2 border-gray-300 rounded-xl text-sm" rows={3} />
                                <div className="flex gap-2">
                                  <button onClick={() => saveNotes(booking.id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm">Save</button>
                                  <button onClick={() => { setEditingNotes(null); setNoteText(''); }} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg text-sm">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => { setEditingNotes(booking.id); setNoteText(booking.notes || ''); }} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">✏️ {booking.notes ? 'Edit Notes' : 'Add Notes'}</button>
                            )}
                          </div>
                          
                          {/* Vaccination Status - desktop only */}
                          <div className="hidden sm:block mt-4 p-3 bg-white rounded-xl border border-gray-200">
                            <p className="font-bold text-sm text-gray-700 mb-2">Vaccination Status:</p>
                            <div className="flex flex-wrap gap-2">
                              {booking.vaccination?.rabies_status ? (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1">
                                  <Check size={12} /> Rabies: {booking.vaccination.rabies_status === 'upload' ? 'Uploaded' : 'Bringing copy'}
                                  {booking.vaccination.rabies_file && <button onClick={async () => { const url = await getVaccinationFileUrl(booking.vaccination.rabies_file); if(url) window.open(url, '_blank'); }} className="ml-1 underline">View</button>}
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">Rabies: Not provided</span>
                              )}
                              {booking.vaccination?.dhpp_status && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full flex items-center gap-1">
                                  <Check size={12} /> DHPP: {booking.vaccination.dhpp_status === 'upload' ? 'Uploaded' : 'Bringing'}
                                  {booking.vaccination.dhpp_file && <button onClick={async () => { const url = await getVaccinationFileUrl(booking.vaccination.dhpp_file); if(url) window.open(url, '_blank'); }} className="ml-1 underline">View</button>}
                                </span>
                              )}
                              {booking.vaccination?.bordetella_status && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full flex items-center gap-1">
                                  <Check size={12} /> Bordetella: {booking.vaccination.bordetella_status === 'upload' ? 'Uploaded' : 'Bringing'}
                                  {booking.vaccination.bordetella_file && <button onClick={async () => { const url = await getVaccinationFileUrl(booking.vaccination.bordetella_file); if(url) window.open(url, '_blank'); }} className="ml-1 underline">View</button>}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Status Action Buttons */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                              {booking.status === 'scheduled' && (
                                <>
                                  <button 
                                    onClick={() => updateBookingStatus(booking.id, 'checked_in', booking)}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm flex items-center gap-2"
                                  >
                                    ✓ Check In
                                  </button>
                                  <button 
                                    onClick={() => updateBookingStatus(booking.id, 'no_show', booking)}
                                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg text-sm"
                                  >
                                    No Show
                                  </button>
                                </>
                              )}
                              {booking.status === 'checked_in' && (
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'in_progress', booking)}
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm flex items-center gap-2"
                                >
                                  🔄 Start Groom
                                </button>
                              )}
                              {booking.status === 'in_progress' && (
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'completed', booking)}
                                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm flex items-center gap-2"
                                >
                                  ✅ Mark Complete & Notify
                                </button>
                              )}
                              {(booking.status === 'completed' || booking.status === 'no_show') && (
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'scheduled', booking)}
                                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg text-sm"
                                >
                                  ↩️ Reset to Scheduled
                                </button>
                              )}
                              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                <button 
                                  onClick={() => {
                                    if (confirm('Cancel this appointment?')) {
                                      updateBookingStatus(booking.id, 'cancelled', booking);
                                    }
                                  }}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg text-sm"
                                >
                                  Cancel
                                </button>
                              )}
                              {/* Add Services Button */}
                              {(booking.status === 'checked_in' || booking.status === 'in_progress' || booking.status === 'scheduled') && (
                                <button 
                                  onClick={() => {
                                    setEditingBookingServices(booking);
                                    setEditBookingAddOns(booking.add_ons || []);
                                    setShowEditServicesModal(true);
                                  }}
                                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-sm flex items-center gap-2"
                                >
                                  ➕ Add Services
                                </button>
                              )}
                            </div>
                          </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Notification Settings */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-2">📱 Text Notifications</h2>
                <p className="text-gray-600 mb-6">Send automatic text messages to customers</p>

                {/* Twilio Credentials */}
                <div className="p-4 bg-gray-50 rounded-xl mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Twilio Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Account SID</label>
                      <input 
                        type="text" 
                        value={twilioSettings.accountSid}
                        onChange={(e) => setTwilioSettings({ ...twilioSettings, accountSid: e.target.value })}
                        placeholder="ACxxxxxxxxxx"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Auth Token</label>
                      <input 
                        type="password" 
                        value={twilioSettings.authToken}
                        onChange={(e) => setTwilioSettings({ ...twilioSettings, authToken: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Twilio Phone Number</label>
                      <input 
                        type="text" 
                        value={twilioSettings.phoneNumber}
                        onChange={(e) => setTwilioSettings({ ...twilioSettings, phoneNumber: e.target.value })}
                        placeholder="+1234567890"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-gray-300 cursor-pointer hover:bg-gray-50 w-full">
                        <input 
                          type="checkbox" 
                          checked={twilioSettings.enabled}
                          onChange={(e) => setTwilioSettings({ ...twilioSettings, enabled: e.target.checked })}
                          className="w-5 h-5 text-green-600 rounded"
                        />
                        <span className="font-semibold text-gray-700">Enable Text Notifications</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="p-4 bg-blue-50 rounded-xl mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Notification Types</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-blue-200 cursor-pointer hover:bg-blue-50">
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.confirmationText}
                        onChange={(e) => setNotificationPrefs({ ...notificationPrefs, confirmationText: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <div>
                        <span className="font-semibold text-gray-900">📅 Booking Confirmation</span>
                        <p className="text-sm text-gray-600">Send text when appointment is booked</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-blue-200 cursor-pointer hover:bg-blue-50">
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.reminderText}
                        onChange={(e) => setNotificationPrefs({ ...notificationPrefs, reminderText: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-gray-900">⏰ Appointment Reminder</span>
                        <p className="text-sm text-gray-600">Send reminder before appointment</p>
                      </div>
                      <select 
                        value={notificationPrefs.reminderTiming}
                        onChange={(e) => setNotificationPrefs({ ...notificationPrefs, reminderTiming: e.target.value })}
                        className="p-2 border rounded-lg text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="day_before">Day before</option>
                        <option value="morning_of">Morning of</option>
                      </select>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-blue-200 cursor-pointer hover:bg-blue-50">
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.completionText}
                        onChange={(e) => setNotificationPrefs({ ...notificationPrefs, completionText: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <div>
                        <span className="font-semibold text-gray-900">✅ Groom Complete</span>
                        <p className="text-sm text-gray-600">Send text when grooming is finished</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={saveNotificationSettings}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {/* FRONT DESK TAB */}
          {adminTab === 'frontdesk' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Customer Lookup */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <Phone className="text-red-600" /> Front Desk Booking
                </h2>
                
                {!fdSelectedCustomer ? (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Search by Phone or Name</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="text" 
                          placeholder="Enter phone number or name..." 
                          value={fdPhoneSearch}
                          onChange={(e) => { setFdPhoneSearch(e.target.value); searchCustomersByPhone(e.target.value); }}
                          className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500"
                        />
                      </div>
                    </div>

                    {fdSearchResults.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <p className="text-sm font-semibold text-gray-600">{fdSearchResults.length} customer(s) found:</p>
                        {fdSearchResults.map(customer => (
                          <button 
                            key={customer.id}
                            onClick={() => { setFdSelectedCustomer(customer); setFdSearchResults([]); setFdPhoneSearch(''); }}
                            className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition text-left"
                          >
                            <p className="font-bold text-gray-900">{customer.name}</p>
                            <p className="text-gray-600 text-sm">{customer.phone}</p>
                          </button>
                        ))}
                      </div>
                    )}

                    {fdPhoneSearch.length >= 3 && fdSearchResults.length === 0 && (
                      <div className="text-center py-8 bg-gray-50 rounded-xl mb-6">
                        <p className="text-gray-600 mb-4">No customer found</p>
                        <button 
                          onClick={() => { setFdShowNewCustomer(true); setFdNewCustomer({ ...fdNewCustomer, phone: fdPhoneSearch }); }}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition flex items-center gap-2 mx-auto"
                        >
                          <UserPlus size={20} /> Create New Customer
                        </button>
                      </div>
                    )}

                    {fdShowNewCustomer && (
                      <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200 space-y-3">
                        <h3 className="font-bold text-gray-900">New Customer</h3>
                        <input type="text" placeholder="Name *" value={fdNewCustomer.name} onChange={(e) => setFdNewCustomer({ ...fdNewCustomer, name: e.target.value })} className="w-full p-3 border-2 border-gray-300 rounded-xl" />
                        <input type="tel" placeholder="Phone *" value={fdNewCustomer.phone} onChange={(e) => setFdNewCustomer({ ...fdNewCustomer, phone: e.target.value })} className="w-full p-3 border-2 border-gray-300 rounded-xl" />
                        <input type="email" placeholder="Email (optional)" value={fdNewCustomer.email} onChange={(e) => setFdNewCustomer({ ...fdNewCustomer, email: e.target.value })} className="w-full p-3 border-2 border-gray-300 rounded-xl" />
                        <div className="flex gap-2">
                          <button onClick={createFdCustomer} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl">Create</button>
                          <button onClick={() => setFdShowNewCustomer(false)} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold">Cancel</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-black text-xl text-gray-900">{fdSelectedCustomer.name}</p>
                          <p className="text-gray-600">{fdSelectedCustomer.phone}</p>
                          {fdSelectedCustomer.email && <p className="text-gray-500 text-sm">{fdSelectedCustomer.email}</p>}
                        </div>
                        <button onClick={() => { setFdSelectedCustomer(null); setFdSelectedPets([]); }} className="text-red-600 hover:text-red-800 font-bold">Change</button>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-3">Select Pet(s) <span className="text-gray-500 font-normal text-sm">- click to toggle</span></h3>
                    {fdSelectedPets.length > 0 && (
                      <div className="mb-3 p-2 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800 font-semibold">
                          {fdSelectedPets.length} pet(s) selected ({fdSelectedPets.filter(p => p.size === 'large').length} large)
                        </p>
                      </div>
                    )}
                    <div className="space-y-2 mb-4">
                      {fdCustomerPets.map(pet => {
                        const isSelected = fdSelectedPets.some(p => p.id === pet.id);
                        return (
                          <button key={pet.id} onClick={() => {
                            if (isSelected) {
                              setFdSelectedPets(fdSelectedPets.filter(p => p.id !== pet.id));
                            } else {
                              setFdSelectedPets([...fdSelectedPets, pet]);
                            }
                          }} className={`w-full p-4 rounded-xl border-2 transition text-left ${isSelected ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-red-600' : 'bg-gray-200'}`}>
                                  {isSelected && <Check className="text-white" size={14} />}
                                </div>
                                <div><p className="font-bold text-gray-900">{pet.name}</p><p className="text-gray-600 text-sm">{pet.breed}</p></div>
                              </div>
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${pet.size === 'large' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>{pet.size === 'large' ? '🐕‍🦺 Large' : '🐕 Small'}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {!fdShowNewPet ? (
                      <button onClick={() => setFdShowNewPet(true)} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 font-semibold transition flex items-center justify-center gap-2"><Plus size={20} /> Add New Pet</button>
                    ) : (
                      <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200 space-y-3">
                        <h3 className="font-bold text-gray-900">New Pet</h3>
                        <input type="text" placeholder="Pet Name *" value={fdNewPet.name} onChange={(e) => setFdNewPet({ ...fdNewPet, name: e.target.value })} className="w-full p-3 border-2 border-gray-300 rounded-xl" />
                        <select value={fdNewPet.breed} onChange={(e) => setFdNewPet({ ...fdNewPet, breed: e.target.value })} className="w-full p-3 border-2 border-gray-300 rounded-xl">
                          <option value="">Select Breed *</option>
                          {Object.keys(BREED_DATABASE).filter(b => !b.startsWith('Mixed')).sort().map(breed => (<option key={breed} value={breed}>{breed}</option>))}
                          <option disabled>──────────</option>
                          {Object.keys(BREED_DATABASE).filter(b => b.startsWith('Mixed')).map(breed => (<option key={breed} value={breed}>{breed}</option>))}
                        </select>
                        {fdNewPet.breed && (<div className={`p-2 rounded-lg text-center text-sm font-semibold ${BREED_DATABASE[fdNewPet.breed]?.weight <= 35 ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>{BREED_DATABASE[fdNewPet.breed]?.weight <= 35 ? '🐕 Small Dog' : '🐕‍🦺 Large Dog'}</div>)}
                        <div className="flex gap-2">
                          <button onClick={createFdPet} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl">Add Pet</button>
                          <button onClick={() => setFdShowNewPet(false)} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold">Cancel</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Middle Column - Service Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4">Service & Add-ons</h2>
                {fdSelectedPets.length > 0 ? (
                  <>
                    {fdSelectedPets.length > 1 && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-800">📝 Booking {fdSelectedPets.length} pets: {fdSelectedPets.map(p => p.name).join(', ')}</p>
                      </div>
                    )}
                    <div className="space-y-3 mb-6">
                      {(() => {
                        // Calculate price estimate from first selected pet
                        const firstPet = fdSelectedPets[0];
                        const breedInfo = firstPet ? BREED_DATABASE[firstPet.breed] : null;
                        const estBathPrice = breedInfo?.bath;
                        const estGroomPrice = breedInfo?.groom;
                        
                        return (
                          <>
                            <button onClick={() => {
                              const bathService = allServices.find(s => s.name === 'Bath Only' || s.name === 'Bath');
                              setFdSelectedService(bathService?.id || 'bath');
                            }} className={`w-full p-4 rounded-xl border-2 transition text-left ${fdSelectedService && allServices.find(s => s.id === fdSelectedService && (s.name === 'Bath Only' || s.name === 'Bath')) ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                              <div className="flex justify-between items-center">
                                <div><p className="font-bold text-gray-900">Bath</p><p className="text-sm text-gray-600">Bath, brush & blowout, light trim</p></div>
                                <span className="font-black text-red-600">{estBathPrice ? (typeof estBathPrice === 'string' ? `$${estBathPrice.split('-')[0]}+` : `$${estBathPrice}+`) : 'Select pet'}</span>
                              </div>
                            </button>
                            <button onClick={() => {
                              const groomService = allServices.find(s => s.name === 'Full Groom');
                              setFdSelectedService(groomService?.id || 'groom');
                            }} disabled={!estGroomPrice && firstPet} className={`w-full p-4 rounded-xl border-2 transition text-left ${fdSelectedService && allServices.find(s => s.id === fdSelectedService && s.name === 'Full Groom') ? 'border-red-600 bg-red-50' : !estGroomPrice && firstPet ? 'border-gray-200 bg-gray-50 opacity-50' : 'border-gray-200 hover:border-red-300'}`}>
                              <div className="flex justify-between items-center">
                                <div><p className="font-bold text-gray-900">Full Groom</p><p className="text-sm text-gray-600">Bath + haircut, nails, glands</p></div>
                                <span className="font-black text-red-600">{estGroomPrice ? (typeof estGroomPrice === 'string' ? `$${estGroomPrice.split('-')[0]}+` : `$${estGroomPrice}+`) : (firstPet ? 'N/A' : 'Select pet')}</span>
                              </div>
                            </button>
                            {firstPet && !estGroomPrice && (
                              <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded-lg">ℹ️ Full groom not available for {firstPet.breed}</p>
                            )}
                            {firstPet && (
                              <p className="text-xs text-gray-500 italic">* Prices are estimates based on breed. Final price may vary.</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3">Add-ons</h3>
                    <div className="space-y-2 mb-6">
                      {ADD_ON_SERVICES.map(addon => (
                        <button key={addon.id} onClick={() => toggleFdAddOn(addon.id)} className={`w-full p-3 rounded-xl border-2 transition text-left flex items-center justify-between ${fdSelectedAddOns.includes(addon.id) ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                          <div className="flex items-center gap-2"><div className={`w-5 h-5 rounded-full flex items-center justify-center ${fdSelectedAddOns.includes(addon.id) ? 'bg-green-500' : 'bg-gray-200'}`}>{fdSelectedAddOns.includes(addon.id) && <Check className="text-white" size={12} />}</div><span className="font-semibold text-sm">{addon.name}</span></div>
                          <span className="font-bold text-green-600 text-sm">+${addon.price}</span>
                        </button>
                      ))}
                    </div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Staff Notes</label><textarea value={fdBookingNotes} onChange={(e) => setFdBookingNotes(e.target.value)} placeholder="Any notes for this appointment..." className="w-full p-3 border-2 border-gray-300 rounded-xl" rows={3} /></div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl"><Dog className="mx-auto mb-4 text-gray-300" size={48} /><p className="text-gray-500">Select a customer and pet(s) first</p></div>
                )}
              </div>

              {/* Right Column - Date & Time */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4">Date & Time</h2>
                <div className="mb-4"><input type="date" value={fdSelectedDate} onChange={(e) => setFdSelectedDate(e.target.value)} min={getTodayDate()} className="w-full p-3 border-2 border-gray-300 rounded-xl font-semibold" /></div>
                {/* Admin Override Toggle */}
                <div className="mb-4 p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={fdOverrideMode} onChange={(e) => setFdOverrideMode(e.target.checked)} className="w-5 h-5 text-amber-600 rounded" />
                    <div className="flex items-center gap-2"><ShieldAlert className="text-amber-600" size={20} /><div><p className="font-bold text-amber-900 text-sm">Admin Override</p><p className="text-xs text-amber-700">Book even when slot is full</p></div></div>
                  </label>
                </div>
                {fdSelectedPets.length > 0 && fdSelectedService ? (
                  <div className="space-y-2">
                    {getFrontDeskSlots().length === 0 ? (<div className="text-center py-8 bg-gray-50 rounded-xl"><p className="text-gray-500">No slots available for this day</p></div>) : (
                      getFrontDeskSlots().map((slot, idx) => (
                        <button key={idx} onClick={() => initiateBooking(slot)} disabled={!slot.hasRoom && !fdOverrideMode} className={`w-full p-4 rounded-xl border-2 transition text-left ${!slot.hasRoom && !fdOverrideMode ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed' : slot.isFull ? 'border-amber-400 bg-amber-50 hover:border-amber-500' : 'border-gray-200 hover:border-green-500 hover:bg-green-50'}`}>
                          <div className="flex items-center justify-between">
                            <div><p className="font-bold text-gray-900">{slot.time}</p><p className="text-sm text-gray-600">{slot.groomer}</p></div>
                            <div className="text-right flex flex-col gap-1">
                              <div className="flex gap-2 justify-end">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${slot.isFull ? 'bg-red-100 text-red-800' : slot.totalDogs > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{slot.totalDogs}/{slot.maxDogs} dogs</span>
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${slot.isLargeFull ? 'bg-red-100 text-red-800' : slot.largeCount > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'}`}>🐕‍🦺 {slot.largeCount}/{slot.maxLarge}</span>
                              </div>
                              {!slot.hasRoom && fdOverrideMode && (<p className="text-xs text-amber-600 font-semibold">⚠️ Override</p>)}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl"><Clock className="mx-auto mb-4 text-gray-300" size={48} /><p className="text-gray-500">Select pet and service to see times</p></div>
                )}
              </div>
            </div>
          )}

          {/* CUSTOMERS TAB */}
          {adminTab === 'customers' && !selectedCustomer && !selectedPet && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Customer Database</h2>
              <input 
                type="text" 
                placeholder="Search by name, phone, or email..." 
                value={customerSearch} 
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl mb-6 text-lg"
              />
              <div className="space-y-3">
                {filteredCustomers.map(customer => {
                  const pets = allPets.filter(p => p.customer_id === customer.id);
                  return (
                    <button 
                      key={customer.id} 
                      onClick={() => setSelectedCustomer(customer)}
                      className="w-full p-5 rounded-xl border-2 border-gray-200 hover:border-red-400 bg-white hover:bg-red-50 transition text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{customer.name}</h3>
                          <p className="text-gray-600">{customer.phone} • {customer.email}</p>
                          <p className="text-sm text-gray-500 mt-1">{pets.length} pet{pets.length !== 1 ? 's' : ''}: {pets.map(p => p.name).join(', ') || 'None'}</p>
                        </div>
                        <ChevronRight className="text-gray-400" size={24} />
                      </div>
                    </button>
                  );
                })}
                {filteredCustomers.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <User className="mx-auto mb-4 text-gray-300" size={48} />
                    <p className="text-gray-600 font-semibold">No customers found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CUSTOMER DETAIL VIEW */}
          {adminTab === 'customers' && selectedCustomer && !selectedPet && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <button onClick={() => setSelectedCustomer(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-6">
                <ChevronLeft size={20} /> Back to Customers
              </button>
              
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900">{selectedCustomer.name}</h2>
                <p className="text-lg text-gray-600 mt-2">📞 {selectedCustomer.phone}</p>
                <p className="text-lg text-gray-600">✉️ {selectedCustomer.email}</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Pets</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {customerPets.map(pet => (
                  <button 
                    key={pet.id}
                    onClick={() => { setSelectedPet(pet); loadPetHistory(pet.id); }}
                    className="p-5 rounded-xl border-2 border-gray-200 hover:border-red-400 bg-gradient-to-br from-gray-50 to-white hover:from-red-50 hover:to-orange-50 transition text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <Dog className="text-red-600" size={32} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">{pet.name}</h4>
                        <p className="text-gray-600">{pet.breed}</p>
                        {pet.vaccination?.rabies_status ? (
                          <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">✓ Rabies</span>
                        ) : (
                          <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">No Rabies</span>
                        )}
                      </div>
                    </div>
                    {pet.notes && <p className="mt-3 text-sm text-gray-500 bg-yellow-50 p-2 rounded-lg">📝 {pet.notes}</p>}
                  </button>
                ))}
                {customerPets.length === 0 && (
                  <div className="col-span-2 text-center py-8 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">No pets registered</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PET DETAIL VIEW */}
          {adminTab === 'customers' && selectedPet && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <button onClick={() => setSelectedPet(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-6">
                <ChevronLeft size={20} /> Back to {selectedCustomer?.name}
              </button>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                  <Dog className="text-red-600" size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{selectedPet.name}</h2>
                  <p className="text-xl text-gray-600">{selectedPet.breed}</p>
                  <p className="text-gray-500">Owner: {selectedPet.customers?.name} • {selectedPet.customers?.phone}</p>
                </div>
              </div>

              {/* Vaccination Status */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Vaccination Status</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedPet.vaccination?.rabies_status ? (
                    <span className="px-3 py-2 bg-green-100 text-green-800 font-bold rounded-lg flex items-center gap-2">
                      <Check size={16} /> Rabies: {selectedPet.vaccination.rabies_status === 'upload' ? 'Uploaded' : 'Bringing copy'}
                      {selectedPet.vaccination.rabies_file && <button onClick={async () => { const url = await getVaccinationFileUrl(selectedPet.vaccination.rabies_file); if(url) window.open(url, '_blank'); }} className="underline">View</button>}
                    </span>
                  ) : (
                    <span className="px-3 py-2 bg-red-100 text-red-800 font-bold rounded-lg">❌ Rabies: Not provided</span>
                  )}
                  {selectedPet.vaccination?.dhpp_status && (
                    <span className="px-3 py-2 bg-blue-100 text-blue-800 font-bold rounded-lg flex items-center gap-2">
                      <Check size={16} /> DHPP
                      {selectedPet.vaccination.dhpp_file && <button onClick={async () => { const url = await getVaccinationFileUrl(selectedPet.vaccination.dhpp_file); if(url) window.open(url, '_blank'); }} className="underline">View</button>}
                    </span>
                  )}
                  {selectedPet.vaccination?.bordetella_status && (
                    <span className="px-3 py-2 bg-blue-100 text-blue-800 font-bold rounded-lg flex items-center gap-2">
                      <Check size={16} /> Bordetella
                      {selectedPet.vaccination.bordetella_file && <button onClick={async () => { const url = await getVaccinationFileUrl(selectedPet.vaccination.bordetella_file); if(url) window.open(url, '_blank'); }} className="underline">View</button>}
                    </span>
                  )}
                </div>
              </div>

              {/* Permanent Pet Notes */}
              <div className="mb-8 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">🐕 Permanent Pet Notes</h3>
                <p className="text-sm text-gray-600 mb-3">Notes here apply to ALL appointments (behavior, preferences, health conditions)</p>
                {editingPetNotes ? (
                  <div className="space-y-3">
                    <textarea 
                      value={petNotesText} 
                      onChange={(e) => setPetNotesText(e.target.value)}
                      placeholder="e.g., Sensitive ears, bites during nail trim, loves the blue bandana, needs breaks..."
                      className="w-full p-3 border-2 border-gray-300 rounded-xl"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => savePetNotes(selectedPet.id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">Save Notes</button>
                      <button onClick={() => setEditingPetNotes(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {selectedPet.notes ? (
                      <p className="text-gray-700 mb-3">{selectedPet.notes}</p>
                    ) : (
                      <p className="text-gray-400 italic mb-3">No permanent notes yet</p>
                    )}
                    <button onClick={() => { setEditingPetNotes(true); setPetNotesText(selectedPet.notes || ''); }} className="text-blue-600 hover:text-blue-800 font-semibold">
                      ✏️ {selectedPet.notes ? 'Edit Notes' : 'Add Notes'}
                    </button>
                  </div>
                )}
              </div>

              {/* Groom History */}
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">Groom History</h3>
                {petHistory.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">No groom history yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {petHistory.map(h => (
                      <div key={h.id} className="p-4 rounded-xl border border-gray-200 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900">{new Date(h.appointment_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {h.appointment_time}</p>
                            <p className="text-gray-600">{h.services?.name} with {h.groomers?.name}</p>
                          </div>
                          <span className={`px-3 py-1 text-sm font-bold rounded-full ${h.status === 'completed' ? 'bg-green-100 text-green-800' : h.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {h.status}
                          </span>
                        </div>
                        {h.notes && <p className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">📝 {h.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* REPORTS TAB */}
          {adminTab === 'reports' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Commission Reports</h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                  <input type="date" value={reportStartDate} onChange={(e) => setReportStartDate(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                  <input type="date" value={reportEndDate} onChange={(e) => setReportEndDate(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Groomer</label>
                  <select value={reportGroomer} onChange={(e) => setReportGroomer(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-xl">
                    <option value="all">All Groomers</option>
                    {allGroomers.filter(g => g.active).map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={async () => {
                      let query = supabase.from('bookings').select('*, dogs(name, breed), groomers(name), services(name)').gte('appointment_date', reportStartDate).lte('appointment_date', reportEndDate).order('appointment_date', { ascending: true });
                      const { data } = await query;
                      const filtered = reportGroomer === 'all' ? data : data?.filter(b => b.groomers?.name === reportGroomer);
                      setReportData(filtered || []);
                    }}
                    className="w-full p-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition"
                  >
                    Run Report
                  </button>
                </div>
              </div>

              {reportData.length > 0 && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left p-3 font-bold">Date</th>
                          <th className="text-left p-3 font-bold">Time</th>
                          <th className="text-left p-3 font-bold">Pet</th>
                          <th className="text-left p-3 font-bold">Breed</th>
                          <th className="text-left p-3 font-bold">Service</th>
                          <th className="text-left p-3 font-bold">Groomer</th>
                          <th className="text-right p-3 font-bold">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map(b => {
                          const breedInfo = BREED_DATABASE[b.dogs?.breed];
                          const basePrice = b.services?.name === 'Full Groom' ? breedInfo?.groom : breedInfo?.bath;
                          const basePriceNum = typeof basePrice === 'string' ? parseInt(basePrice.split('-')[0]) : (basePrice || 0);
                          const displayPrice = b.actual_price !== null ? b.actual_price : basePriceNum;
                          
                          return (
                            <tr key={b.id} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="p-3">{new Date(b.appointment_date).toLocaleDateString()}</td>
                              <td className="p-3">{b.appointment_time}</td>
                              <td className="p-3 font-semibold">{b.dogs?.name}</td>
                              <td className="p-3">{b.dogs?.breed}</td>
                              <td className="p-3">{b.services?.name}</td>
                              <td className="p-3">{b.groomers?.name}</td>
                              <td className="p-3 text-right">
                                {editingBookingPrice === b.id ? (
                                  <div className="flex items-center justify-end gap-2">
                                    <span>$</span>
                                    <input 
                                      type="number" 
                                      value={bookingPriceValue} 
                                      onChange={(e) => setBookingPriceValue(e.target.value)}
                                      className="w-20 p-1 border rounded text-right"
                                    />
                                    <button 
                                      onClick={async () => {
                                        await supabase.from('bookings').update({ actual_price: parseFloat(bookingPriceValue) }).eq('id', b.id);
                                        const updated = reportData.map(r => r.id === b.id ? { ...r, actual_price: parseFloat(bookingPriceValue) } : r);
                                        setReportData(updated);
                                        setEditingBookingPrice(null);
                                      }}
                                      className="text-green-600 font-bold"
                                    >✓</button>
                                    <button onClick={() => setEditingBookingPrice(null)} className="text-red-600 font-bold">×</button>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => { setEditingBookingPrice(b.id); setBookingPriceValue(displayPrice.toString()); }}
                                    className="font-semibold hover:text-blue-600"
                                  >
                                    ${displayPrice}
                                    {b.actual_price !== null && <span className="text-xs text-green-600 ml-1">✓</span>}
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">{reportData.length} appointments</p>
                        <p className="text-sm text-gray-500">{reportStartDate} to {reportEndDate} {reportGroomer !== 'all' && `• ${reportGroomer}`}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-3xl font-black text-green-700">
                          ${reportData.reduce((sum, b) => {
                            const breedInfo = BREED_DATABASE[b.dogs?.breed];
                            const basePrice = b.services?.name === 'Full Groom' ? breedInfo?.groom : breedInfo?.bath;
                            const basePriceNum = typeof basePrice === 'string' ? parseInt(basePrice.split('-')[0]) : (basePrice || 0);
                            return sum + (b.actual_price !== null ? b.actual_price : basePriceNum);
                          }, 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {reportData.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <FileText className="mx-auto mb-4 text-gray-300" size={48} />
                  <p className="text-gray-600 font-semibold">Select date range and click "Run Report"</p>
                </div>
              )}
            </div>
          )}

          {/* ACTIVITY LOG TAB */}
          {adminTab === 'activity' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">📋 Activity Log</h2>
                  <p className="text-gray-600">Track all changes and actions (last 7 days)</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="p-2 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="all">All Activity</option>
                    <option value="booking_created">Bookings Created</option>
                    <option value="booking_status">Status Changes</option>
                    <option value="booking_noshow">No Shows</option>
                    <option value="staff_login">Staff Logins</option>
                  </select>
                  <button
                    onClick={async () => {
                      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
                      const { data } = await supabase.from('activity_log').select('*').gte('created_at', weekAgo).order('created_at', { ascending: false }).limit(200);
                      setActivityLog(data || []);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition"
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {activityLog
                  .filter(a => activityFilter === 'all' || a.action === activityFilter)
                  .map(activity => (
                  <div key={activity.id} className={`p-4 rounded-xl border-2 ${
                    activity.action === 'booking_created' ? 'border-green-200 bg-green-50' :
                    activity.action === 'booking_status' ? 'border-blue-200 bg-blue-50' :
                    activity.action === 'booking_noshow' ? 'border-red-200 bg-red-50' :
                    activity.action === 'staff_login' ? 'border-purple-200 bg-purple-50' :
                    'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            activity.action === 'booking_created' ? 'bg-green-200 text-green-800' :
                            activity.action === 'booking_status' ? 'bg-blue-200 text-blue-800' :
                            activity.action === 'booking_noshow' ? 'bg-red-200 text-red-800' :
                            activity.action === 'staff_login' ? 'bg-purple-200 text-purple-800' :
                            'bg-gray-200 text-gray-800'
                          }`}>
                            {activity.action === 'booking_created' && '📅 NEW BOOKING'}
                            {activity.action === 'booking_status' && '🔄 STATUS CHANGE'}
                            {activity.action === 'booking_noshow' && '❌ NO SHOW'}
                            {activity.action === 'staff_login' && '👤 STAFF LOGIN'}
                            {!['booking_created', 'booking_status', 'booking_noshow', 'staff_login'].includes(activity.action) && activity.action.toUpperCase()}
                          </span>
                          {activity.staff_name && (
                            <span className="text-xs text-gray-500">by {activity.staff_name}</span>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900">{activity.description}</p>
                        {activity.details?.override && (
                          <span className="text-xs text-orange-600 font-bold">⚠️ OVERRIDE - Slot was full</span>
                        )}
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>{new Date(activity.created_at).toLocaleDateString()}</p>
                        <p>{new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {activityLog.filter(a => activityFilter === 'all' || a.action === activityFilter).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg font-semibold">No activity found</p>
                    <p className="text-sm">Activity will appear here as actions are taken</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {adminTab === 'settings' && (
            <div className="space-y-6">
              {/* Groomers Management */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Manage Groomers</h2>
                
                <div className="flex gap-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="New groomer name..." 
                    value={newGroomerName}
                    onChange={(e) => setNewGroomerName(e.target.value)}
                    className="flex-1 p-3 border-2 border-gray-300 rounded-xl"
                  />
                  <button 
                    onClick={async () => {
                      if (!newGroomerName.trim()) return;
                      await supabase.from('groomers').insert([{ name: newGroomerName.trim(), active: true }]);
                      setNewGroomerName('');
                      await loadAllBookings();
                    }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
                  >
                    Add Groomer
                  </button>
                </div>

                <div className="space-y-3">
                  {allGroomers.map(groomer => (
                    <div key={groomer.id} className={`p-4 rounded-xl border-2 flex items-center justify-between ${groomer.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${groomer.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="font-bold text-lg">{groomer.name}</span>
                        <span className={`text-sm ${groomer.active ? 'text-green-600' : 'text-gray-500'}`}>
                          {groomer.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={async () => {
                            await supabase.from('groomers').update({ active: !groomer.active }).eq('id', groomer.id);
                            await loadAllBookings();
                          }}
                          className={`px-4 py-2 rounded-lg font-semibold transition ${groomer.active ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                        >
                          {groomer.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date-Based Schedule Builder */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">📅 Schedule Builder</h2>
                    <p className="text-gray-600">Set availability for specific dates</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowTemplateModal(true)}
                      className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg font-semibold transition"
                    >
                      📋 Manage Templates
                    </button>
                  </div>
                </div>

                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                  <button
                    onClick={() => {
                      const d = new Date(scheduleViewDate);
                      d.setDate(d.getDate() - 7);
                      setScheduleViewDate(d.toISOString().split('T')[0]);
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="text-center">
                    <input
                      type="date"
                      value={scheduleViewDate}
                      onChange={(e) => setScheduleViewDate(e.target.value)}
                      className="p-2 border-2 border-gray-300 rounded-lg font-semibold text-center"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Week of {new Date(scheduleViewDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const d = new Date(scheduleViewDate);
                      d.setDate(d.getDate() + 7);
                      setScheduleViewDate(d.toISOString().split('T')[0]);
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={async () => {
                      const weekStart = getWeekStart(scheduleViewDate);
                      const weekEnd = new Date(weekStart);
                      weekEnd.setDate(weekEnd.getDate() + 6);
                      
                      // Apply templates for all active groomers
                      for (const groomer of allGroomers.filter(g => g.active)) {
                        const templates = groomerTemplates.filter(t => t.groomer_id === groomer.id && t.active);
                        for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
                          const dayOfWeek = d.getDay();
                          const dateStr = d.toISOString().split('T')[0];
                          const dayTemplates = templates.filter(t => t.day_of_week === dayOfWeek);
                          
                          for (const template of dayTemplates) {
                            await supabase.from('schedule_slots').upsert({
                              groomer_id: groomer.id,
                              date: dateStr,
                              time: template.time,
                              max_dogs: template.max_dogs,
                              max_large: template.max_large,
                              active: true
                            }, { onConflict: 'groomer_id,date,time' });
                          }
                        }
                      }
                      await loadAllBookings();
                      alert('Templates applied to week!');
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                  >
                    ✨ Apply Templates to This Week
                  </button>
                  <button
                    onClick={async () => {
                      const sourceStart = getWeekStart(scheduleViewDate);
                      const targetStart = new Date(sourceStart);
                      targetStart.setDate(targetStart.getDate() + 7);
                      
                      // Get all slots from source week
                      const sourceEnd = new Date(sourceStart);
                      sourceEnd.setDate(sourceEnd.getDate() + 6);
                      
                      const sourceSlots = scheduleSlots.filter(s => {
                        const slotDate = new Date(s.date);
                        return slotDate >= sourceStart && slotDate <= sourceEnd && s.active;
                      });
                      
                      for (const slot of sourceSlots) {
                        const dayOffset = Math.floor((new Date(slot.date) - sourceStart) / (24 * 60 * 60 * 1000));
                        const newDate = new Date(targetStart);
                        newDate.setDate(newDate.getDate() + dayOffset);
                        
                        await supabase.from('schedule_slots').upsert({
                          groomer_id: slot.groomer_id,
                          date: newDate.toISOString().split('T')[0],
                          time: slot.time,
                          max_dogs: slot.max_dogs,
                          max_large: slot.max_large,
                          active: true
                        }, { onConflict: 'groomer_id,date,time' });
                      }
                      await loadAllBookings();
                      alert('Week copied to next week!');
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                  >
                    📋 Copy Week → Next Week
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm('Clear ALL slots for this week? This cannot be undone.')) return;
                      const weekStart = getWeekStart(scheduleViewDate);
                      const weekEnd = new Date(weekStart);
                      weekEnd.setDate(weekEnd.getDate() + 6);
                      
                      await supabase.from('schedule_slots')
                        .delete()
                        .gte('date', weekStart.toISOString().split('T')[0])
                        .lte('date', weekEnd.toISOString().split('T')[0]);
                      await loadAllBookings();
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-semibold transition"
                  >
                    🗑️ Clear Week
                  </button>
                </div>

                {/* Weekly Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {(() => {
                    const weekStart = getWeekStart(scheduleViewDate);
                    const days = [];
                    for (let i = 0; i < 7; i++) {
                      const d = new Date(weekStart);
                      d.setDate(d.getDate() + i);
                      days.push(d);
                    }
                    return days.map((day, idx) => {
                      const dateStr = day.toISOString().split('T')[0];
                      const daySlots = scheduleSlots.filter(s => s.date === dateStr);
                      const dayBookings = allBookings.filter(b => b.appointment_date === dateStr);
                      const isToday = dateStr === new Date().toISOString().split('T')[0];
                      const isPast = day < new Date(new Date().setHours(0,0,0,0));
                      
                      return (
                        <div key={idx} className={`rounded-xl p-2 min-h-[200px] ${isToday ? 'bg-blue-50 border-2 border-blue-300' : isPast ? 'bg-gray-100' : 'bg-gray-50'}`}>
                          <div className="text-center mb-2 pb-2 border-b">
                            <p className="text-xs text-gray-500">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][idx]}</p>
                            <p className={`font-bold ${isToday ? 'text-blue-600' : ''}`}>{day.getDate()}</p>
                          </div>
                          
                          {/* Slots by groomer */}
                          <div className="space-y-2">
                            {allGroomers.filter(g => g.active).map(groomer => {
                              const groomerSlots = daySlots.filter(s => s.groomer_id === groomer.id).sort((a, b) => {
                                const getMin = (t) => { const [time, p] = t.split(' '); let [h, m] = time.split(':').map(Number); if (p === 'PM' && h !== 12) h += 12; if (p === 'AM' && h === 12) h = 0; return h * 60 + (m || 0); };
                                return getMin(a.time) - getMin(b.time);
                              });
                              
                              if (groomerSlots.length === 0 && isPast) return null;
                              
                              return (
                                <div key={groomer.id} className="text-xs">
                                  <p className="font-semibold text-gray-700 truncate" title={groomer.name}>{groomer.name.split(' ')[0]}</p>
                                  <div className="space-y-1 mt-1">
                                    {groomerSlots.map(slot => {
                                      const booked = dayBookings.filter(b => b.groomer_id === slot.groomer_id && b.appointment_time === slot.time).length;
                                      const largeBooked = dayBookings.filter(b => b.groomer_id === slot.groomer_id && b.appointment_time === slot.time && b.dogs?.size === 'large').length;
                                      return (
                                        <div key={slot.id} className={`p-1 rounded ${booked >= slot.max_dogs ? 'bg-red-100' : booked > 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium">{slot.time.replace(':00', '')}</span>
                                            {!isPast && (
                                              <button
                                                onClick={async () => {
                                                  await supabase.from('schedule_slots').delete().eq('id', slot.id);
                                                  await loadAllBookings();
                                                }}
                                                className="text-red-500 hover:text-red-700 font-bold text-xs"
                                              >
                                                ×
                                              </button>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-1 mt-1">
                                            <span className="text-gray-500">{booked}/</span>
                                            {!isPast ? (
                                              <select
                                                value={slot.max_dogs}
                                                onChange={async (e) => {
                                                  await supabase.from('schedule_slots').update({ max_dogs: parseInt(e.target.value) }).eq('id', slot.id);
                                                  await loadAllBookings();
                                                }}
                                                className="text-xs p-0 border rounded w-8 bg-white"
                                              >
                                                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                              </select>
                                            ) : (
                                              <span>{slot.max_dogs}</span>
                                            )}
                                            <span className="text-gray-400 ml-1">🐕‍🦺{largeBooked}/</span>
                                            {!isPast ? (
                                              <select
                                                value={slot.max_large}
                                                onChange={async (e) => {
                                                  await supabase.from('schedule_slots').update({ max_large: parseInt(e.target.value) }).eq('id', slot.id);
                                                  await loadAllBookings();
                                                }}
                                                className="text-xs p-0 border rounded w-8 bg-white"
                                              >
                                                {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                                              </select>
                                            ) : (
                                              <span>{slot.max_large}</span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                    {!isPast && (
                                      <button
                                        onClick={() => {
                                          setAddSlotData({ groomerId: groomer.id, groomerName: groomer.name, date: dateStr, time: '9:00 AM', maxDogs: 2, maxLarge: 1 });
                                          setShowAddSlotModal(true);
                                        }}
                                        className="w-full text-center text-xs text-green-600 hover:bg-green-50 rounded py-1"
                                      >
                                        + Add
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
                
                {/* Legend */}
                <div className="flex gap-4 mt-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-100"></div> Available</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-100"></div> Partially booked</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-100"></div> Full</div>
                </div>
              </div>

              {/* Template Modal */}
              {showTemplateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-black text-gray-900">📋 Groomer Templates</h2>
                      <button onClick={() => setShowTemplateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={24} />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-6">Templates define each groomer's "typical" week. Apply them to quickly set up schedules.</p>
                    
                    {allGroomers.filter(g => g.active).map(groomer => {
                      const templates = groomerTemplates.filter(t => t.groomer_id === groomer.id);
                      return (
                        <div key={groomer.id} className="mb-6 p-4 bg-gray-50 rounded-xl">
                          <h3 className="font-bold text-lg mb-4">{groomer.name}'s Template</h3>
                          
                          {/* Add template slot */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <select
                              value={templateGroomer === groomer.id ? newTemplateSlot.day : 1}
                              onChange={(e) => { setTemplateGroomer(groomer.id); setNewTemplateSlot({...newTemplateSlot, day: parseInt(e.target.value)}); }}
                              className="p-2 border rounded-lg text-sm"
                            >
                              {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((d, i) => (
                                <option key={i} value={i}>{d}</option>
                              ))}
                            </select>
                            <select
                              value={templateGroomer === groomer.id ? newTemplateSlot.time : '9:00 AM'}
                              onChange={(e) => { setTemplateGroomer(groomer.id); setNewTemplateSlot({...newTemplateSlot, time: e.target.value}); }}
                              className="p-2 border rounded-lg text-sm"
                            >
                              {['7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM'].map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            <select
                              value={templateGroomer === groomer.id ? newTemplateSlot.maxDogs : 2}
                              onChange={(e) => { setTemplateGroomer(groomer.id); setNewTemplateSlot({...newTemplateSlot, maxDogs: parseInt(e.target.value)}); }}
                              className="p-2 border rounded-lg text-sm"
                            >
                              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} dogs</option>)}
                            </select>
                            <select
                              value={templateGroomer === groomer.id ? newTemplateSlot.maxLarge : 1}
                              onChange={(e) => { setTemplateGroomer(groomer.id); setNewTemplateSlot({...newTemplateSlot, maxLarge: parseInt(e.target.value)}); }}
                              className="p-2 border rounded-lg text-sm"
                            >
                              {[0,1,2,3].map(n => <option key={n} value={n}>{n} large</option>)}
                            </select>
                            <button
                              onClick={async () => {
                                const slot = templateGroomer === groomer.id ? newTemplateSlot : { day: 1, time: '9:00 AM', maxDogs: 2, maxLarge: 1 };
                                const { error } = await supabase.from('groomer_templates').insert({
                                  groomer_id: groomer.id,
                                  day_of_week: slot.day,
                                  time: slot.time,
                                  max_dogs: slot.maxDogs,
                                  max_large: slot.maxLarge,
                                  active: true
                                });
                                if (error && error.code === '23505') {
                                  alert('This slot already exists in the template');
                                } else if (error) {
                                  alert(error.message);
                                } else {
                                  await loadAllBookings();
                                }
                              }}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm"
                            >
                              Add to Template
                            </button>
                          </div>
                          
                          {/* Show template grid */}
                          <div className="grid grid-cols-7 gap-2">
                            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day, dayIdx) => {
                              const dayTemplates = templates.filter(t => t.day_of_week === dayIdx).sort((a, b) => {
                                const getMin = (t) => { const [time, p] = t.split(' '); let [h, m] = time.split(':').map(Number); if (p === 'PM' && h !== 12) h += 12; if (p === 'AM' && h === 12) h = 0; return h * 60 + (m || 0); };
                                return getMin(a.time) - getMin(b.time);
                              });
                              return (
                                <div key={dayIdx} className="bg-white rounded-lg p-2">
                                  <p className="text-xs font-bold text-center text-gray-500 mb-2">{day}</p>
                                  <div className="space-y-1">
                                    {dayTemplates.map(t => (
                                      <div key={t.id} className="flex items-center justify-between bg-blue-50 rounded p-1 text-xs">
                                        <span>{t.time.replace(':00', '')}</span>
                                        <button
                                          onClick={async () => {
                                            await supabase.from('groomer_templates').delete().eq('id', t.id);
                                            await loadAllBookings();
                                          }}
                                          className="text-red-500 hover:text-red-700"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                    {dayTemplates.length === 0 && <p className="text-xs text-gray-300 text-center">-</p>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add Slot Modal */}
              {showAddSlotModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-black text-gray-900">Add Time Slot</h2>
                      <button onClick={() => setShowAddSlotModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Groomer</p>
                        <p className="font-bold text-lg">{addSlotData.groomerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Date</p>
                        <p className="font-bold">{new Date(addSlotData.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                        <select
                          value={addSlotData.time}
                          onChange={(e) => setAddSlotData({...addSlotData, time: e.target.value})}
                          className="w-full p-3 border-2 border-gray-300 rounded-xl"
                        >
                          {['7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Max Dogs</label>
                          <select
                            value={addSlotData.maxDogs}
                            onChange={(e) => setAddSlotData({...addSlotData, maxDogs: parseInt(e.target.value)})}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl"
                          >
                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} dog{n > 1 ? 's' : ''}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Max Large 🐕‍🦺</label>
                          <select
                            value={addSlotData.maxLarge}
                            onChange={(e) => setAddSlotData({...addSlotData, maxLarge: parseInt(e.target.value)})}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl"
                          >
                            {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                      </div>
                      
                      <button
                        onClick={async () => {
                          const { error } = await supabase.from('schedule_slots').insert({
                            groomer_id: addSlotData.groomerId,
                            date: addSlotData.date,
                            time: addSlotData.time,
                            max_dogs: addSlotData.maxDogs,
                            max_large: addSlotData.maxLarge,
                            active: true
                          });
                          if (error) {
                            if (error.code === '23505') {
                              alert('This slot already exists!');
                            } else {
                              alert(error.message);
                            }
                          } else {
                            await loadAllBookings();
                            setShowAddSlotModal(false);
                          }
                        }}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
                      >
                        Add Slot
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Staff Management */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-2">👥 Staff Management</h2>
                <p className="text-gray-600 mb-6">Manage staff access with PIN codes</p>

                {/* Add New Staff */}
                <div className="p-4 bg-gray-50 rounded-xl mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Add New Staff Member</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      className="p-3 border-2 border-gray-300 rounded-xl"
                    />
                    <input 
                      type="text" 
                      placeholder="PIN (4-6 digits)" 
                      maxLength={6}
                      value={newStaffPin}
                      onChange={(e) => setNewStaffPin(e.target.value.replace(/\D/g, ''))}
                      className="p-3 border-2 border-gray-300 rounded-xl"
                    />
                    <select 
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value)}
                      className="p-3 border-2 border-gray-300 rounded-xl"
                    >
                      <option value="front_desk">Front Desk</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button 
                      onClick={addStaffMember}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
                    >
                      Add Staff
                    </button>
                  </div>
                </div>

                {/* Staff List */}
                <div className="space-y-3">
                  {allStaff.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No staff members yet. Add one above.</p>
                  ) : (
                    allStaff.map(staff => (
                      <div key={staff.id} className={`p-4 rounded-xl border-2 flex items-center justify-between ${staff.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-100'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${staff.active ? 'bg-green-600' : 'bg-gray-400'}`}>
                            <User className="text-white" size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-lg">{staff.name}</div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${staff.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                {staff.role === 'admin' ? 'Admin' : 'Front Desk'}
                              </span>
                              <span className="text-gray-500 text-sm">PIN: ****</span>
                              <span className={`text-sm ${staff.active ? 'text-green-600' : 'text-gray-500'}`}>
                                {staff.active ? '● Active' : '○ Inactive'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              const newPin = prompt('Enter new PIN (4-6 digits):');
                              if (newPin && newPin.length >= 4 && /^\d+$/.test(newPin)) {
                                updateStaffMember(staff.id, { pin: newPin });
                              } else if (newPin) {
                                alert('PIN must be 4-6 digits');
                              }
                            }}
                            className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-semibold transition"
                          >
                            Change PIN
                          </button>
                          <button 
                            onClick={() => toggleStaffActive(staff.id, staff.active)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${staff.active ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                          >
                            {staff.active ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Current Session Info */}
                {currentStaff && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-blue-900">Current Session</p>
                          <p className="text-blue-700 text-sm">{currentStaff.name} ({currentStaff.role})</p>
                        </div>
                      </div>
                      <button 
                        onClick={staffLogout}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                      >
                        End Session
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vaccination Modal
  const VaccinationModal = () => {
    if (!showVaccinationModal || !vaccinationDog) return null;
    const currentVax = getDogVaxStatus(vaccinationDog.id);
    const [rabiesMethod, setRabiesMethod] = useState(currentVax.rabiesMethod || '');
    const [dhppMethod, setDhppMethod] = useState(currentVax.dhppMethod || '');
    const [bordetellaMethod, setBordetellaMethod] = useState(currentVax.bordetellaMethod || '');
    const [rabiesFile, setRabiesFile] = useState(null);
    const [dhppFile, setDhppFile] = useState(null);
    const [bordetellaFile, setBordetellaFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (file, type) => {
      if (!file) return null;
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${vaccinationDog.id}/${type}_${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('vaccinations').upload(fileName, file);
      if (error) { console.error('Upload error:', error); return null; }
      return fileName;
    };

    const handleSave = async () => {
      setUploading(true);
      let rabiesFileName = currentVax.rabiesFile || null;
      let dhppFileName = currentVax.dhppFile || null;
      let bordetellaFileName = currentVax.bordetellaFile || null;

      if (rabiesMethod === 'upload' && rabiesFile) {
        rabiesFileName = await uploadFile(rabiesFile, 'rabies');
      }
      if (dhppMethod === 'upload' && dhppFile) {
        dhppFileName = await uploadFile(dhppFile, 'dhpp');
      }
      if (bordetellaMethod === 'upload' && bordetellaFile) {
        bordetellaFileName = await uploadFile(bordetellaFile, 'bordetella');
      }

      saveVaccinations(vaccinationDog.id, {
        rabies: !!rabiesMethod,
        rabiesMethod,
        rabiesFile: rabiesFileName,
        dhpp: !!dhppMethod,
        dhppMethod,
        dhppFile: dhppFileName,
        bordetella: !!bordetellaMethod,
        bordetellaMethod,
        bordetellaFile: bordetellaFileName
      });
      setUploading(false);
      setShowVaccinationModal(false);
      setVaccinationDog(null);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-black text-gray-900 mb-2">Vaccination Records</h3>
          <p className="text-gray-600 mb-6">for {vaccinationDog.name}</p>
          
          <div className="space-y-6">
            <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">Rabies</span>
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">Required</span>
              </div>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${rabiesMethod === 'upload' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-400'}`}>
                  <input type="radio" name="rabies" value="upload" checked={rabiesMethod === 'upload'} onChange={(e) => setRabiesMethod(e.target.value)} className="w-5 h-5 text-red-600" />
                  <Upload size={20} className="text-gray-500" />
                  <span className="font-medium">Upload vaccination records</span>
                </label>
                {rabiesMethod === 'upload' && (
                  <div className="ml-8 p-3 bg-gray-50 rounded-xl">
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setRabiesFile(e.target.files[0])} className="w-full text-sm" />
                    {rabiesFile && <p className="text-green-600 text-sm mt-2">✓ {rabiesFile.name}</p>}
                    {!rabiesFile && currentVax.rabiesFile && <p className="text-green-600 text-sm mt-2">✓ Previously uploaded</p>}
                  </div>
                )}
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${rabiesMethod === 'bring' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-400'}`}>
                  <input type="radio" name="rabies" value="bring" checked={rabiesMethod === 'bring'} onChange={(e) => setRabiesMethod(e.target.value)} className="w-5 h-5 text-red-600" />
                  <FileText size={20} className="text-gray-500" />
                  <span className="font-medium">I'll bring physical records to my appointment</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">DHPP</span>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">Recommended</span>
              </div>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${dhppMethod === 'upload' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}>
                  <input type="radio" name="dhpp" value="upload" checked={dhppMethod === 'upload'} onChange={(e) => setDhppMethod(e.target.value)} className="w-5 h-5 text-blue-600" />
                  <Upload size={20} className="text-gray-500" />
                  <span className="font-medium">Upload vaccination records</span>
                </label>
                {dhppMethod === 'upload' && (
                  <div className="ml-8 p-3 bg-gray-50 rounded-xl">
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setDhppFile(e.target.files[0])} className="w-full text-sm" />
                    {dhppFile && <p className="text-green-600 text-sm mt-2">✓ {dhppFile.name}</p>}
                    {!dhppFile && currentVax.dhppFile && <p className="text-green-600 text-sm mt-2">✓ Previously uploaded</p>}
                  </div>
                )}
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${dhppMethod === 'bring' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}>
                  <input type="radio" name="dhpp" value="bring" checked={dhppMethod === 'bring'} onChange={(e) => setDhppMethod(e.target.value)} className="w-5 h-5 text-blue-600" />
                  <FileText size={20} className="text-gray-500" />
                  <span className="font-medium">I'll bring physical records</span>
                </label>
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${dhppMethod === '' ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <input type="radio" name="dhpp" value="" checked={dhppMethod === ''} onChange={(e) => setDhppMethod(e.target.value)} className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-500">Skip for now</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">Bordetella</span>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">Recommended</span>
              </div>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${bordetellaMethod === 'upload' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}>
                  <input type="radio" name="bordetella" value="upload" checked={bordetellaMethod === 'upload'} onChange={(e) => setBordetellaMethod(e.target.value)} className="w-5 h-5 text-blue-600" />
                  <Upload size={20} className="text-gray-500" />
                  <span className="font-medium">Upload vaccination records</span>
                </label>
                {bordetellaMethod === 'upload' && (
                  <div className="ml-8 p-3 bg-gray-50 rounded-xl">
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setBordetellaFile(e.target.files[0])} className="w-full text-sm" />
                    {bordetellaFile && <p className="text-green-600 text-sm mt-2">✓ {bordetellaFile.name}</p>}
                    {!bordetellaFile && currentVax.bordetellaFile && <p className="text-green-600 text-sm mt-2">✓ Previously uploaded</p>}
                  </div>
                )}
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${bordetellaMethod === 'bring' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}>
                  <input type="radio" name="bordetella" value="bring" checked={bordetellaMethod === 'bring'} onChange={(e) => setBordetellaMethod(e.target.value)} className="w-5 h-5 text-blue-600" />
                  <FileText size={20} className="text-gray-500" />
                  <span className="font-medium">I'll bring physical records</span>
                </label>
                <label className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition ${bordetellaMethod === '' ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <input type="radio" name="bordetella" value="" checked={bordetellaMethod === ''} onChange={(e) => setBordetellaMethod(e.target.value)} className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-500">Skip for now</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => { setShowVaccinationModal(false); setVaccinationDog(null); }} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition">Cancel</button>
            <button onClick={handleSave} disabled={!rabiesMethod || uploading} className={`flex-1 py-3 font-bold rounded-xl transition ${rabiesMethod && !uploading ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>{uploading ? 'Saving...' : 'Save Records'}</button>
          </div>
        </div>
      </div>
    );
  };

  // PIN Entry Modal
  const PinModal = () => {
    if (!showPinModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-red-600">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="text-white" size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Staff Access</h3>
            <p className="text-gray-600 mb-6">Enter your PIN to access the Admin Dashboard</p>
            
            <input
              type="password"
              maxLength={6}
              placeholder="Enter PIN"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              onKeyPress={(e) => e.key === 'Enter' && verifyPin()}
              className="w-full p-4 text-center text-3xl font-bold tracking-widest border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 mb-4"
              autoFocus
            />
            
            {pinError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 font-semibold">
                {pinError}
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowPinModal(false); setPinInput(''); setPinError(''); }}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={verifyPin}
                disabled={pinInput.length < 4}
                className={`flex-1 py-3 font-bold rounded-xl transition ${
                  pinInput.length >= 4 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const availableSlots = getAvailableSlots();
  const bathPrice = getServicePrice('bath');
  const groomPrice = getServicePrice('groom');

  // Main Booking Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <VaccinationModal />
      <PinModal />
      <BookingPinModal />
      <BookingConfirmationModal />
      <BookingSuccessModal />
      {showCallPopup && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-red-600"><div className="text-center"><div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><Phone className="text-white" size={40} /></div><h3 className="text-3xl font-black text-gray-900 mb-4">Can't Find a Time?</h3><p className="text-gray-700 text-lg mb-6">Give us a call and we'll do our best to accommodate you!</p><a href="tel:+17132537718" className="block w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold text-xl mb-4 hover:from-red-700 hover:to-red-800 transition shadow-lg">(713) 253-7718</a><button onClick={() => setShowCallPopup(false)} className="w-full py-3 text-gray-600 font-semibold hover:text-gray-900 transition">Close</button></div></div></div>)}
      
      <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl"><div className="max-w-7xl mx-auto px-4 py-4 sm:py-6"><div className="flex items-center justify-between"><div className="flex items-center gap-2 sm:gap-4"><img src="/logo.png" alt="Carter's Pet Market" className="h-10 sm:h-14 w-auto bg-white rounded-xl p-1" /><div><h1 className="text-xl sm:text-3xl font-black text-white">Carter's Pet Market</h1><p className="text-red-100 text-xs sm:text-sm font-medium hidden sm:block">Welcome back, {user.user_metadata?.name || user.email}!</p></div></div><div className="flex gap-2 sm:gap-3">{isAdmin && <button onClick={handleAdminAccess} className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition font-semibold text-sm sm:text-base"><Settings size={18} /><span className="hidden sm:inline">Admin</span></button>}<button onClick={handleLogout} className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition font-semibold backdrop-blur-sm text-sm sm:text-base"><LogOut size={18} /><span className="hidden sm:inline">Logout</span></button></div></div></div></div>
      
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6"><div className="flex items-center justify-between"><div className={`flex items-center gap-2 sm:gap-3 ${selectedDog ? 'opacity-100' : 'opacity-50'}`}><div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${selectedDog ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{selectedDog ? <Check size={18} /> : '1'}</div><span className="font-semibold text-gray-700 text-xs sm:text-base">Select<br className="sm:hidden"/> Pet</span></div><div className="flex-1 h-1 bg-gray-200 mx-2 sm:mx-4"></div><div className={`flex items-center gap-2 sm:gap-3 ${selectedService ? 'opacity-100' : 'opacity-50'}`}><div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${selectedService ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{selectedService ? <Check size={18} /> : '2'}</div><span className="font-semibold text-gray-700 text-xs sm:text-base">Choose<br className="sm:hidden"/> Service</span></div><div className="flex-1 h-1 bg-gray-200 mx-2 sm:mx-4"></div><div className={`flex items-center gap-2 sm:gap-3 ${selectedDate ? 'opacity-100' : 'opacity-50'}`}><div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${selectedDate ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{selectedDate ? <Check size={18} /> : '3'}</div><span className="font-semibold text-gray-700 text-xs sm:text-base">Pick Date<br className="sm:hidden"/> & Time</span></div></div></div>
        
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1"><div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-4"><div className="flex justify-between items-center mb-4 sm:mb-6"><h2 className="text-xl sm:text-2xl font-black text-gray-900">My Pets</h2><button onClick={() => setShowAddDog(!showAddDog)} className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition shadow-md hover:shadow-lg">{showAddDog ? 'Cancel' : '+ Add Pet'}</button></div>
            {showAddDog && (<div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 space-y-3 sm:space-y-4"><input type="text" placeholder="Pet's Name" value={newDog.name} onChange={(e) => setNewDog({...newDog, name: e.target.value})} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500" /><select value={newDog.breed} onChange={(e) => setNewDog({...newDog, breed: e.target.value})} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500"><option value="">Select Breed</option>{Object.keys(BREED_DATABASE).filter(b => !b.startsWith('Mixed')).sort().map(breed => (<option key={breed} value={breed}>{breed}</option>))}<option disabled>──────────</option>{Object.keys(BREED_DATABASE).filter(b => b.startsWith('Mixed')).map(breed => (<option key={breed} value={breed}>{breed}</option>))}</select>{newDog.breed && (<div className={`p-3 rounded-xl text-center font-semibold text-sm ${BREED_DATABASE[newDog.breed]?.weight <= 35 ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>{BREED_DATABASE[newDog.breed]?.weight <= 35 ? '🐕 Small Dog' : '🐕‍🦺 Large Dog'} (avg {BREED_DATABASE[newDog.breed]?.weight} lbs)</div>)}<button onClick={handleAddDog} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-xl font-bold shadow-md transition">Save Pet</button></div>)}
            {dogs.length === 0 ? (<div className="text-center py-8 sm:py-12"><PawPrint className="mx-auto mb-4 text-gray-300" size={48} /><p className="text-gray-500 font-medium">No pets added yet</p><p className="text-gray-400 text-sm mt-2">Click "+ Add Pet" to get started</p></div>) : (<div className="space-y-3">{dogs.map(dog => { const vaxStatus = getDogVaxStatus(dog.id); return (<div key={dog.id} className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${selectedDog?.id === dog.id ? 'border-red-600 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg' : 'border-gray-200 bg-white shadow-md'}`}><button onClick={() => { setSelectedDog(selectedDog?.id === dog.id ? null : dog); setSelectedService(''); setSelectedAddOns([]); setHasSpecialNeeds(false); }} className="w-full text-left"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center ${selectedDog?.id === dog.id ? 'bg-red-600' : 'bg-gray-200'}`}><Dog className={selectedDog?.id === dog.id ? 'text-white' : 'text-gray-500'} size={20} /></div><div><div className="font-bold text-base sm:text-lg text-gray-900">{dog.name}</div><div className="text-sm text-gray-600">{dog.breed}</div></div></div>{selectedDog?.id === dog.id && (<CheckCircle2 className="text-red-600" size={24} />)}</div></button><div className="mt-3 pt-3 border-t border-gray-200"><div className="flex items-center justify-between"><div className="flex items-center gap-2">{vaxStatus.rabies ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1"><Check size={12} />Rabies</span> : <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">Rabies needed</span>}</div><div className="flex items-center gap-2"><button onClick={() => handleRemoveDog(dog)} className="text-gray-400 hover:text-red-500 transition p-1" title="Remove pet"><Trash2 size={16} /></button><button onClick={() => { setVaccinationDog(dog); setShowVaccinationModal(true); }} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">{vaxStatus.rabies ? 'Edit' : 'Add'} Records</button></div></div></div></div>);})}</div>)}
            {selectedDog && (<div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200"><div className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={20} /><span className="font-bold text-green-900">{selectedDog.name} selected</span></div></div>)}
          </div></div>
          
          <div className="lg:col-span-2 space-y-6">
            {selectedDog && !canBookOnline(selectedDog.id) && (<div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6"><div className="flex items-start gap-4"><AlertTriangle className="text-amber-600 flex-shrink-0" size={32} /><div><h3 className="font-bold text-lg text-amber-900 mb-2">Rabies Acknowledgment Required</h3><p className="text-amber-800 mb-4">Please confirm vaccination status for {selectedDog.name} to continue booking.</p><button onClick={() => { setVaccinationDog(selectedDog); setShowVaccinationModal(true); }} className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition">View Rabies Acknowledgment</button></div></div></div>)}
            
            <div className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 ${!selectedDog || !canBookOnline(selectedDog?.id) ? 'opacity-50' : ''}`}>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Choose Your Service</h2>
              <p className="text-gray-500 text-sm mb-4 sm:mb-6">{!selectedDog ? 'Select a pet first to see pricing' : 'Prices shown are estimates based on breed. Final price may vary.'}</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button onClick={() => {
                  if (!selectedDog || !canBookOnline(selectedDog.id)) return;
                  const bathService = allServices.find(s => s.name === 'Bath Only' || s.name === 'Bath');
                  bathPrice && setSelectedService(bathService?.id || 'bath');
                }} disabled={!selectedDog || !canBookOnline(selectedDog?.id) || !bathPrice} className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${selectedService && allServices.find(s => s.id === selectedService && (s.name === 'Bath Only' || s.name === 'Bath')) ? 'border-red-600 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg' : !selectedDog || !bathPrice ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-200 bg-white hover:border-red-300 shadow-md hover:shadow-lg'}`}><div className="flex items-start justify-between"><div><h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">Bath</h3><p className="text-2xl sm:text-3xl font-black text-red-600 mb-1 sm:mb-2">{selectedDog ? formatPrice(bathPrice) : '$--'}</p><p className="text-xs text-gray-600">Bath, brush & blowout, light trim, general cleanup</p></div>{selectedService && allServices.find(s => s.id === selectedService && (s.name === 'Bath Only' || s.name === 'Bath')) && (<CheckCircle2 className="text-red-600 flex-shrink-0" size={24} />)}</div></button>
                <button onClick={() => {
                  if (!selectedDog || !canBookOnline(selectedDog.id)) return;
                  const groomService = allServices.find(s => s.name === 'Full Groom');
                  groomPrice && setSelectedService(groomService?.id || 'groom');
                }} disabled={!selectedDog || !canBookOnline(selectedDog?.id) || !groomPrice} className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${selectedService && allServices.find(s => s.id === selectedService && s.name === 'Full Groom') ? 'border-red-600 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg' : !selectedDog || !groomPrice ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-200 bg-white hover:border-red-300 shadow-md hover:shadow-lg'}`}><div className="flex items-start justify-between"><div><h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">Full Groom</h3><p className="text-2xl sm:text-3xl font-black text-red-600 mb-1 sm:mb-2">{selectedDog && groomPrice ? formatPrice(groomPrice) : '$--'}</p><p className="text-xs text-gray-600">Everything in bath + haircut, nails clipped, glands expressed</p></div>{selectedService && allServices.find(s => s.id === selectedService && s.name === 'Full Groom') && (<CheckCircle2 className="text-red-600 flex-shrink-0" size={24} />)}</div></button>
              </div>
              <p className="mt-3 text-xs text-gray-400 italic">*Prices are estimates only. Final price may vary based on coat condition, matting, and size.</p>
              {selectedDog && !groomPrice && (<p className="mt-4 text-sm text-amber-700 bg-amber-50 p-3 rounded-xl">ℹ️ Full groom is not available for {selectedDog.breed}. Bath only for this breed.</p>)}
            </div>

            <div className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 ${!selectedDog ? 'opacity-50' : ''}`}>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Add-On Services</h2>
              <p className="text-gray-500 text-sm mb-4 sm:mb-6">Optional extras to pamper your pup even more</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">{ADD_ON_SERVICES.map(addon => (<button key={addon.id} onClick={() => selectedDog && toggleAddOn(addon.id)} disabled={!selectedDog} className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${selectedAddOns.includes(addon.id) ? 'border-green-500 bg-green-50' : !selectedDog ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-200 bg-white hover:border-green-300'}`}><div className="flex items-center gap-2 sm:gap-3"><div className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center ${selectedAddOns.includes(addon.id) ? 'bg-green-500' : 'bg-gray-200'}`}>{selectedAddOns.includes(addon.id) && <Check className="text-white" size={12} />}</div><span className="font-semibold text-gray-900 text-sm sm:text-base">{addon.name}</span></div><span className="font-bold text-green-600 text-sm sm:text-base">+${addon.price}</span></button>))}</div>
              {selectedAddOns.length > 0 && (<div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-xl border-2 border-green-200"><div className="flex justify-between items-center"><span className="font-semibold text-green-900">Add-ons total:</span><span className="font-black text-green-600 text-lg sm:text-xl">+${getAddOnsTotal()}</span></div></div>)}
            </div>

            <div className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 ${!selectedDog ? 'opacity-50' : ''}`}>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">Any Special Needs?</h2>
              <label className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl ${selectedDog ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed'} transition`}>
                <input type="checkbox" checked={hasSpecialNeeds} onChange={(e) => selectedDog && setHasSpecialNeeds(e.target.checked)} disabled={!selectedDog} className="w-5 sm:w-6 h-5 sm:h-6 mt-1 text-red-600 rounded" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">My pet has special needs, health concerns, or behavioral considerations</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Including: aggression, anxiety, medical conditions, severe matting, elderly pets, etc.</p>
                </div>
              </label>
              {hasSpecialNeeds && (<div className="mt-4"><label className="block text-sm font-bold mb-2 text-gray-700">Please describe your pet's needs:</label><textarea value={bookingNotes} onChange={(e) => setBookingNotes(e.target.value)} placeholder="e.g., My dog is anxious around other dogs, has sensitive ears, needs breaks during grooming..." className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 text-sm sm:text-base" rows={3} /></div>)}
            </div>

            <div className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 ${!selectedDog || !selectedService ? 'opacity-50' : ''}`}>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Select Date & Time</h2>
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-bold mb-2 sm:mb-3 text-gray-700">Choose a Date</label>
                <input type="date" min={getTodayDate()} value={selectedDate} onChange={(e) => (selectedDog && selectedService) && setSelectedDate(e.target.value)} disabled={!selectedDog || !selectedService} className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 text-base sm:text-lg font-semibold" />
                {(!selectedDog || !selectedService) && <p className="text-sm text-gray-500 mt-2">Select a pet and service first</p>}
              </div>
              {selectedDate && selectedDog && selectedService && (<div><h3 className="font-bold text-lg text-gray-900 mb-4">Available Appointments</h3>{availableSlots.length === 0 ? (<div><div className="text-center py-8 sm:py-12 bg-gray-50 rounded-2xl mb-4"><Calendar className="mx-auto mb-4 text-gray-300" size={48} /><p className="text-gray-600 font-semibold mb-2">No appointments available</p><p className="text-gray-500 text-sm">Please try a different date</p></div><button onClick={() => setShowCallPopup(true)} className="w-full p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold text-base sm:text-lg transition shadow-lg flex items-center justify-center gap-3"><Phone size={24} />Can't Find a Time? Call Us!</button></div>) : (<><div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">{availableSlots.map((slot, idx) => (<button key={idx} onClick={() => showConfirmation(slot)} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-red-500 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all text-left shadow-md hover:shadow-xl"><div className="flex items-center justify-between mb-2 sm:mb-3"><span className="text-xl sm:text-2xl font-black text-gray-900">{slot.time}</span></div><div className="text-xs sm:text-sm text-gray-600 font-semibold">with {slot.groomer}</div></button>))}</div><button onClick={() => setShowCallPopup(true)} className="w-full p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-semibold transition border-2 border-blue-200 flex items-center justify-center gap-2 text-sm sm:text-base"><Phone size={20} />Don't see a time that works? Call us!</button></>)}</div>)}
            </div>

            {bookings.length > 0 && (<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"><h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Your Upcoming Appointments</h2><div className="space-y-3 sm:space-y-4">{bookings.filter(b => b.status === 'scheduled' || b.status === 'in_progress').map(booking => (<div key={booking.id} className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md"><div className="flex items-start justify-between gap-3"><div className="flex-1"><h3 className="font-black text-base sm:text-lg text-gray-900">{booking.dogs?.name}</h3><p className="text-gray-700 font-semibold mt-2 text-sm sm:text-base">📅 {new Date(booking.appointment_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p><p className="text-gray-700 font-semibold text-sm sm:text-base">🕐 {booking.appointment_time}</p><p className="text-gray-600 text-xs sm:text-sm mt-2">with {booking.groomers?.name} • {booking.services?.name}</p>{booking.notes && (<p className="text-gray-500 text-xs sm:text-sm mt-2 bg-white/50 p-2 rounded">📝 {booking.notes}</p>)}</div><div className="flex flex-col items-end gap-2"><div className="px-2 sm:px-4 py-1 sm:py-2 bg-green-500 text-white text-xs sm:text-sm font-bold rounded-full whitespace-nowrap">{booking.status === 'in_progress' ? 'In Progress' : 'Scheduled'}</div>{booking.status === 'scheduled' && <button onClick={() => handleCancelBooking(booking)} className="text-xs text-red-500 hover:text-red-700 font-semibold">Cancel</button>}</div></div></div>))}</div></div>)}

            {pastBookings.length > 0 && (<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"><h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Past Appointments</h2><div className="space-y-3 sm:space-y-4">{pastBookings.map(booking => (<div key={booking.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200"><div className="flex items-center justify-between gap-3"><div className="flex-1"><div className="flex items-center gap-2"><h3 className="font-bold text-gray-900">{booking.dogs?.name}</h3><span className="text-gray-400">•</span><span className="text-sm text-gray-600">{booking.services?.name}</span></div><p className="text-sm text-gray-500 mt-1">{new Date(booking.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} with <span className="font-semibold text-gray-700">{booking.groomers?.name}</span></p></div><div className="flex-shrink-0 flex flex-col items-end gap-1"><span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">Completed</span><button onClick={() => { const dog = dogs.find(d => d.id === booking.dog_id); if (dog) { setSelectedDog(dog); setSelectedService(booking.service_id); }}} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Book again</button></div></div></div>))}</div><p className="text-xs text-gray-400 mt-4 text-center">Showing last 10 completed appointments</p></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
