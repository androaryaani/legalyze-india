import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface ConsultationCalendarProps {
  t: any;
  isLoggedIn: boolean;
}

const ConsultationCalendar: React.FC<ConsultationCalendarProps> = ({ t, isLoggedIn }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const consultationTypes = [
    { value: 'video', label: t.calendar.types.video, icon: Video },
    { value: 'phone', label: t.calendar.types.phone, icon: Phone },
    { value: 'office', label: t.calendar.types.office, icon: MapPin }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const isDateSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getDay() !== 0; // Not Sunday and not in the past
  };

  const handleBookConsultation = () => {
    if (!isLoggedIn) {
      alert(t.calendar.loginRequired);
      return;
    }
    
    if (!selectedTime) {
      alert(t.calendar.selectTime);
      return;
    }

    alert(`${t.calendar.bookingConfirmed}: ${selectedDate.toDateString()} at ${selectedTime}`);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {t.calendar.heading}
          </h2>
          <p className="text-lg text-gray-700 font-sans max-w-2xl mx-auto">
            {t.calendar.subheading}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold font-serif">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => (
                <button
                  key={index}
                  onClick={() => date && isDateAvailable(date) && setSelectedDate(date)}
                  disabled={!date || !isDateAvailable(date)}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                    ${!date ? 'invisible' : ''}
                    ${isDateSelected(date) ? 'bg-black text-white' : ''}
                    ${isDateAvailable(date) && !isDateSelected(date) ? 'hover:bg-gray-200 cursor-pointer' : ''}
                    ${!isDateAvailable(date) && date ? 'text-gray-400 cursor-not-allowed' : ''}
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-black mb-4">
                {t.calendar.selectedDate}
              </h3>
              <div className="flex items-center space-x-2 text-lg">
                <Calendar className="w-5 h-5 text-black" />
                <span className="font-sans">{selectedDate.toDateString()}</span>
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <h4 className="text-lg font-bold font-serif text-black mb-3">
                {t.calendar.consultationType}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {consultationTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setConsultationType(type.value)}
                    className={`
                      p-3 rounded-lg border-2 transition-all flex flex-col items-center space-y-2
                      ${consultationType === type.value 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    <type.icon className="w-6 h-6" />
                    <span className="text-sm font-sans">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <h4 className="text-lg font-bold font-serif text-black mb-3">
                {t.calendar.availableSlots}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      p-3 rounded-lg border-2 transition-all flex items-center justify-center space-x-2
                      ${selectedTime === time 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="font-sans">{time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookConsultation}
              className="w-full bg-black text-white py-4 rounded-lg font-sans font-medium text-lg hover:scale-105 transition-all"
            >
              {t.calendar.bookConsultation}
            </button>

            {!isLoggedIn && (
              <p className="text-sm text-gray-600 text-center font-sans">
                {t.calendar.loginNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCalendar;