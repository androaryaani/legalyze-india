import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { 
  getLegalCasesByClientId, 
  getLegalCasesByLawyerId, 
  getDocumentsByCaseId,
  addLegalCase,
  addCaseDocument
} from '../models/services';
import { LegalCaseModel, CaseDocumentModel, CaseStatus } from '../models/index';
import { FileText, Plus, Upload, Eye, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface CaseManagementProps {
  t: any;
  showToast: (message: string) => void;
}

export const CaseManagement: React.FC<CaseManagementProps> = ({ t, showToast }) => {
  const { user } = useAuth();
  const [cases, setCases] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNewCaseForm, setShowNewCaseForm] = useState<boolean>(false);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  
  // New case form state
  const [newCaseTitle, setNewCaseTitle] = useState<string>('');
  const [newCaseDescription, setNewCaseDescription] = useState<string>('');
  
  // Upload document form state
  const [documentName, setDocumentName] = useState<string>('');
  const [documentDescription, setDocumentDescription] = useState<string>('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      fetchCases();
    }
  }, [user]);

  useEffect(() => {
    if (selectedCase) {
      fetchDocuments(selectedCase);
    }
  }, [selectedCase]);

  const fetchCases = async () => {
    setLoading(true);
    try {
      let fetchedCases;
      if (user?.role === 'user') {
        fetchedCases = await getLegalCasesByClientId(user.id);
      } else if (user?.role === 'lawyer') {
        fetchedCases = await getLegalCasesByLawyerId(user.id);
      } else {
        fetchedCases = [];
      }
      setCases(fetchedCases);
      if (fetchedCases.length > 0 && !selectedCase) {
        setSelectedCase(fetchedCases[0].id);
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
      showToast(t.caseManagement.errorFetchingCases);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async (caseId: string) => {
    try {
      const fetchedDocuments = await getDocumentsByCaseId(caseId);
      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
      showToast(t.caseManagement.errorFetchingDocuments);
    }
  };

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newCase = {
        title: newCaseTitle,
        description: newCaseDescription,
        status: 'open' as CaseStatus,
        clientId: user.id
      };

      await addLegalCase(newCase);
      showToast(t.caseManagement.caseCreatedSuccess);
      setNewCaseTitle('');
      setNewCaseDescription('');
      setShowNewCaseForm(false);
      fetchCases();
    } catch (error) {
      console.error('Error creating case:', error);
      showToast(t.caseManagement.errorCreatingCase);
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase || !documentFile) return;

    try {
      // In a real app, you would upload the file to Firebase Storage here
      // and get the download URL
      const fileUrl = 'https://example.com/placeholder-url';
      
      const newDocument = {
        fileName: documentName || documentFile.name,
        fileUrl: fileUrl,
        fileType: documentFile.type,
        description: documentDescription,
        caseId: selectedCase
      };

      await addCaseDocument(newDocument);
      showToast(t.caseManagement.documentUploadedSuccess);
      setDocumentName('');
      setDocumentDescription('');
      setDocumentFile(null);
      setShowUploadForm(false);
      fetchDocuments(selectedCase);
    } catch (error) {
      console.error('Error uploading document:', error);
      showToast(t.caseManagement.errorUploadingDocument);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="text-yellow-500" />;
      case 'in_progress':
        return <Clock className="text-blue-500" />;
      case 'closed':
        return <CheckCircle className="text-green-500" />;
      case 'pending':
        return <Clock className="text-orange-500" />;
      default:
        return <AlertTriangle className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return t.caseManagement.statusOpen;
      case 'in_progress':
        return t.caseManagement.statusInProgress;
      case 'closed':
        return t.caseManagement.statusClosed;
      case 'pending':
        return t.caseManagement.statusPending;
      default:
        return status;
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
          <h2 className="text-3xl font-bold text-gray-800">{t.caseManagement.heading}</h2>
          {user?.role === 'user' && (
            <button
              onClick={() => setShowNewCaseForm(!showNewCaseForm)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t.caseManagement.createNewCase}
            </button>
          )}
        </div>

        {showNewCaseForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">{t.caseManagement.newCaseFormTitle}</h3>
            <form onSubmit={handleCreateCase}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="case-title">
                  {t.caseManagement.caseTitle}
                </label>
                <input
                  id="case-title"
                  type="text"
                  value={newCaseTitle}
                  onChange={(e) => setNewCaseTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="case-description">
                  {t.caseManagement.caseDescription}
                </label>
                <textarea
                  id="case-description"
                  value={newCaseDescription}
                  onChange={(e) => setNewCaseDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewCaseForm(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {t.caseManagement.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {t.caseManagement.submit}
                </button>
              </div>
            </form>
          </div>
        )}

        {cases.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.caseManagement.noCases}</h3>
            <p className="text-gray-600 mb-4">{t.caseManagement.noCasesDescription}</p>
            {user?.role === 'user' && (
              <button
                onClick={() => setShowNewCaseForm(true)}
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t.caseManagement.createFirstCase}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-100 border-b">
                  <h3 className="font-semibold text-gray-800">{t.caseManagement.yourCases}</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {cases.map((legalCase) => (
                    <li key={legalCase.id}>
                      <button
                        onClick={() => setSelectedCase(legalCase.id)}
                        className={`w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors ${selectedCase === legalCase.id ? 'bg-blue-50' : ''}`}
                      >
                        <div className="mr-3">
                          {getStatusIcon(legalCase.status)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{legalCase.title}</h4>
                          <p className="text-sm text-gray-600">
                            {getStatusText(legalCase.status)}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedCase && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      {cases.find(c => c.id === selectedCase)?.title}
                    </h3>
                    <button
                      onClick={() => setShowUploadForm(!showUploadForm)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      {t.caseManagement.uploadDocument}
                    </button>
                  </div>

                  {showUploadForm && (
                    <div className="p-4 border-b bg-blue-50">
                      <h4 className="font-medium text-gray-800 mb-3">{t.caseManagement.uploadNewDocument}</h4>
                      <form onSubmit={handleUploadDocument}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-gray-700 mb-1 text-sm" htmlFor="document-name">
                              {t.caseManagement.documentName}
                            </label>
                            <input
                              id="document-name"
                              type="text"
                              value={documentName}
                              onChange={(e) => setDocumentName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder={t.caseManagement.documentNamePlaceholder}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1 text-sm" htmlFor="document-file">
                              {t.caseManagement.selectFile}
                            </label>
                            <input
                              id="document-file"
                              type="file"
                              onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-1 text-sm" htmlFor="document-description">
                            {t.caseManagement.documentDescription}
                          </label>
                          <textarea
                            id="document-description"
                            value={documentDescription}
                            onChange={(e) => setDocumentDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20"
                            placeholder={t.caseManagement.documentDescriptionPlaceholder}
                          ></textarea>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowUploadForm(false)}
                            className="mr-2 px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-sm"
                          >
                            {t.caseManagement.cancel}
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                            disabled={!documentFile}
                          >
                            {t.caseManagement.upload}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">{t.caseManagement.caseDetails}</h4>
                      <p className="text-gray-600">
                        {cases.find(c => c.id === selectedCase)?.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">{t.caseManagement.caseDocuments}</h4>
                      {documents.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                          <p className="text-gray-600">{t.caseManagement.noDocuments}</p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {documents.map((doc) => (
                            <li key={doc.id} className="py-3 flex items-start">
                              <div className="mr-3 mt-1">
                                <FileText className="w-5 h-5 text-blue-500" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-800">{doc.fileName}</h5>
                                {doc.description && (
                                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                                )}
                                <div className="mt-2 flex items-center text-sm">
                                  <span className="text-gray-500 mr-4">
                                    {new Date(doc.uploadedAt.toDate()).toLocaleDateString()}
                                  </span>
                                  <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    {t.caseManagement.viewDocument}
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseManagement;