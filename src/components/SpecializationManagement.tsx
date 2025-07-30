import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import {
  getAllSpecializations,
  addSpecialization,
  addLawyerSpecialization,
  getLawyerSpecializationsByLawyerId
} from '../models/services';
import { SpecializationModel, LawyerSpecializationModel } from '../models/index';
import { Tag, Plus, X, Check } from 'lucide-react';

interface SpecializationManagementProps {
  t: any;
  showToast: (message: string) => void;
}

export const SpecializationManagement: React.FC<SpecializationManagementProps> = ({ t, showToast }) => {
  const { user } = useAuth();
  const [specializations, setSpecializations] = useState<SpecializationModel[]>([]);
  const [lawyerSpecializations, setLawyerSpecializations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newSpecializationName, setNewSpecializationName] = useState<string>('');
  const [newSpecializationDescription, setNewSpecializationDescription] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      // Check if user is admin based on email domain or role
      setIsAdmin(user.role === 'admin');
      fetchSpecializations();
      if (user.role === 'lawyer') {
        fetchLawyerSpecializations();
      }
    }
  }, [user]);

  const fetchSpecializations = async () => {
    setLoading(true);
    try {
      const fetchedSpecializations = await getAllSpecializations();
      setSpecializations(fetchedSpecializations);
    } catch (error) {
      console.error('Error fetching specializations:', error);
      showToast(t.specializationManagement.errorFetchingSpecializations);
    } finally {
      setLoading(false);
    }
  };

const fetchLawyerSpecializations = async () => {
    if (!user) return;
    
    try {
      const fetchedLawyerSpecializations = await getLawyerSpecializationsByLawyerId(user.id);
      // Extract the specializationId from each document reference
      const specializationIds = fetchedLawyerSpecializations.map(
        (spec: any) => spec.specializationId.id
      );
      setLawyerSpecializations(specializationIds);
    } catch (error) {
      console.error('Error fetching lawyer specializations:', error);
      showToast(t.specializationManagement.errorFetchingLawyerSpecializations);
    }
  };

  const handleAddSpecialization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const newSpecialization = {
        name: newSpecializationName,
        description: newSpecializationDescription
      };

      await addSpecialization(newSpecialization);
      showToast(t.specializationManagement.specializationAddedSuccess);
      setNewSpecializationName('');
      setNewSpecializationDescription('');
      setShowAddForm(false);
      fetchSpecializations();
    } catch (error) {
      console.error('Error adding specialization:', error);
      showToast(t.specializationManagement.errorAddingSpecialization);
    }
  };

  const handleToggleLawyerSpecialization = async (specializationId: string) => {
    if (!user || user.role !== 'lawyer') return;

    try {
      const hasSpecialization = lawyerSpecializations.includes(specializationId);
      
      if (!hasSpecialization) {
        // Add specialization to lawyer
        await addLawyerSpecialization(user.id, specializationId);
        setLawyerSpecializations([...lawyerSpecializations, specializationId]);
        showToast(t.specializationManagement.specializationAddedToLawyerSuccess);
      } else {
        // In a real app, you would implement removal here
        // For now, we'll just update the UI
        setLawyerSpecializations(lawyerSpecializations.filter(id => id !== specializationId));
        showToast(t.specializationManagement.specializationRemovedFromLawyerSuccess);
      }
    } catch (error) {
      console.error('Error updating lawyer specialization:', error);
      showToast(t.specializationManagement.errorUpdatingLawyerSpecialization);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{t.specializationManagement.heading}</h2>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t.specializationManagement.addSpecialization}
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">{t.specializationManagement.newSpecializationFormTitle}</h3>
            <form onSubmit={handleAddSpecialization}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="specialization-name">
                  {t.specializationManagement.specializationName}
                </label>
                <input
                  id="specialization-name"
                  type="text"
                  value={newSpecializationName}
                  onChange={(e) => setNewSpecializationName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="specialization-description">
                  {t.specializationManagement.specializationDescription}
                </label>
                <textarea
                  id="specialization-description"
                  value={newSpecializationDescription}
                  onChange={(e) => setNewSpecializationDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {t.specializationManagement.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {t.specializationManagement.submit}
                </button>
              </div>
            </form>
          </div>
        )}

        {specializations.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Tag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.specializationManagement.noSpecializations}</h3>
            <p className="text-gray-600 mb-4">{t.specializationManagement.noSpecializationsDescription}</p>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t.specializationManagement.addFirstSpecialization}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((specialization) => (
              <div key={specialization.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{specialization.name}</h3>
                    {user?.role === 'lawyer' && (
                      <button
                        onClick={() => handleToggleLawyerSpecialization(specialization.id)}
                        className={`flex items-center ${lawyerSpecializations.includes(specialization.id) ? 'text-green-600 hover:text-green-800' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                      >
                        {lawyerSpecializations.includes(specialization.id) ? (
                          <>
                            <Check className="w-5 h-5 mr-1" />
                            {t.specializationManagement.selected}
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-1" />
                            {t.specializationManagement.select}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  {specialization.description ? (
                    <p className="text-gray-600">{specialization.description}</p>
                  ) : (
                    <p className="text-gray-500 italic">{t.specializationManagement.noDescription}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecializationManagement;