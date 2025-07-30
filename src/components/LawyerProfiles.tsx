import React, { useState } from 'react';
import { Star, MapPin, Clock, Award, Filter } from 'lucide-react';

interface LawyerProfilesProps {
  t: any;
}

const LawyerProfiles: React.FC<LawyerProfilesProps> = ({ t }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  const lawyers = [
    {
      id: 1,
      name: "Adv. Rajesh Kumar",
      specialization: "Criminal Law",
      experience: 15,
      rating: 4.8,
      reviews: 124,
      location: "Delhi High Court",
      languages: ["Hindi", "English"],
      fee: "₹2,000/hour",
      image: "https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      verified: true
    },
    {
      id: 2,
      name: "Adv. Priya Sharma",
      specialization: "Family Law",
      experience: 12,
      rating: 4.9,
      reviews: 89,
      location: "Mumbai Sessions Court",
      languages: ["Hindi", "English", "Marathi"],
      fee: "₹1,800/hour",
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      verified: true
    },
    {
      id: 3,
      name: "Adv. Amit Patel",
      specialization: "Corporate Law",
      experience: 18,
      rating: 4.7,
      reviews: 156,
      location: "Bangalore Commercial Court",
      languages: ["English", "Hindi", "Gujarati"],
      fee: "₹3,500/hour",
      image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      verified: true
    },
    {
      id: 4,
      name: "Adv. Sunita Reddy",
      specialization: "Property Law",
      experience: 10,
      rating: 4.6,
      reviews: 67,
      location: "Hyderabad District Court",
      languages: ["Telugu", "English", "Hindi"],
      fee: "₹1,500/hour",
      image: "https://images.pexels.com/photos/5668774/pexels-photo-5668774.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      verified: true
    },
    {
      id: 5,
      name: "Adv. Vikram Singh",
      specialization: "Consumer Rights",
      experience: 8,
      rating: 4.5,
      reviews: 43,
      location: "Jaipur Consumer Court",
      languages: ["Hindi", "English"],
      fee: "₹1,200/hour",
      image: "https://images.pexels.com/photos/5668869/pexels-photo-5668869.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      verified: true
    },
    {
      id: 6,
      name: "Adv. Meera Nair",
      specialization: "Labour Law",
      experience: 14,
      rating: 4.8,
      reviews: 98,
      location: "Chennai Labour Court",
      languages: ["Tamil", "English", "Hindi"],
      fee: "₹2,200/hour",
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      verified: true
    }
  ];

  const categories = [
    { value: 'all', label: t.lawyers.categories.all },
    { value: 'criminal', label: t.lawyers.categories.criminal },
    { value: 'family', label: t.lawyers.categories.family },
    { value: 'corporate', label: t.lawyers.categories.corporate },
    { value: 'property', label: t.lawyers.categories.property },
    { value: 'consumer', label: t.lawyers.categories.consumer },
    { value: 'labour', label: t.lawyers.categories.labour }
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const categoryMatch = selectedCategory === 'all' || 
      lawyer.specialization.toLowerCase().includes(selectedCategory);
    const ratingMatch = selectedRating === 'all' || 
      lawyer.rating >= parseFloat(selectedRating);
    return categoryMatch && ratingMatch;
  });

  const handleBookConsultation = (lawyerId: number) => {
    alert(`Booking consultation with lawyer ID: ${lawyerId}`);
  };

  return (
    <section id="lawyers" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {t.lawyers.heading}
          </h2>
          <p className="text-lg text-gray-700 font-sans max-w-2xl mx-auto">
            {t.lawyers.subheading}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-black" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">{t.lawyers.filters.allRatings}</option>
            <option value="4.5">4.5+ {t.lawyers.filters.stars}</option>
            <option value="4.0">4.0+ {t.lawyers.filters.stars}</option>
            <option value="3.5">3.5+ {t.lawyers.filters.stars}</option>
          </select>
        </div>

        {/* Lawyer Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-bold font-serif text-black">
                        {lawyer.name}
                      </h3>
                      {lawyer.verified && (
                        <Award className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-sans">
                      {lawyer.specialization}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-sans">
                        {lawyer.rating} ({lawyer.reviews} {t.lawyers.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{lawyer.experience} {t.lawyers.yearsExp}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>{t.lawyers.languages}:</strong> {lawyer.languages.join(', ')}
                  </div>
                  <div className="text-lg font-bold text-black">
                    {lawyer.fee}
                  </div>
                </div>

                <button
                  onClick={() => handleBookConsultation(lawyer.id)}
                  className="w-full bg-black text-white py-3 rounded-lg font-sans font-medium hover:scale-105 transition-all"
                >
                  {t.lawyers.bookConsultation}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-sans text-lg">
              {t.lawyers.noResults}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export { LawyerProfiles };
export default LawyerProfiles;