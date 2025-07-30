import { db } from '../utils/firebase';
import { 
  collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where, 
  Timestamp, DocumentReference, DocumentData, CollectionReference, serverTimestamp
} from 'firebase/firestore';
import {
  UserModel, LegalCaseModel, CaseDocumentModel, SpecializationModel,
  LawyerSpecializationModel, ConversationMessageModel,
  usersCollection, legalCasesCollection, caseDocumentsCollection,
  specializationsCollection, lawyerSpecializationsCollection, conversationMessagesCollection
} from './index';

// Generic service functions

/**
 * Generic function to add a document to a collection
 */
async function addDocument<T>(collectionRef: CollectionReference<T>, data: T): Promise<string> {
  const docRef = await addDoc(collectionRef, data);
  return docRef.id;
}

/**
 * Generic function to get a document by ID
 */
async function getDocumentById<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as unknown as T;
  } else {
    return null;
  }
}

/**
 * Generic function to update a document
 */
async function updateDocument<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

/**
 * Generic function to delete a document
 */
async function deleteDocument(collectionName: string, id: string): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

// User specific functions

/**
 * Add a new user
 */
export async function addUser(userData: Omit<UserModel, 'createdAt'>): Promise<string> {
  const userWithTimestamp = {
    ...userData,
    createdAt: serverTimestamp() as Timestamp
  };
  return addDocument(usersCollection, userWithTimestamp as UserModel);
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  return getDocumentById<UserModel & { id: string }>('User', id);
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const q = query(usersCollection, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  
  return null;
}

/**
 * Update user
 */
export async function updateUser(id: string, userData: Partial<UserModel>) {
  return updateDocument<UserModel>('User', id, userData);
}

/**
 * Get all users
 */
export async function getAllUsers() {
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Legal Case specific functions

/**
 * Add a new legal case
 */
export async function addLegalCase(caseData: Omit<LegalCaseModel, 'createdAt' | 'clientId'> & { clientId: string }): Promise<string> {
  const clientRef = doc(db, 'User', caseData.clientId);
  
  const caseWithReferences = {
    ...caseData,
    clientId: clientRef,
    createdAt: serverTimestamp() as Timestamp
  };
  
  // Remove the string clientId and replace with reference
  const { clientId, ...rest } = caseData;
  
  return addDocument(legalCasesCollection, caseWithReferences as unknown as LegalCaseModel);
}

/**
 * Get legal case by ID
 */
export async function getLegalCaseById(id: string) {
  return getDocumentById<LegalCaseModel & { id: string }>('LegalCase', id);
}

/**
 * Get legal cases by client ID
 */
export async function getLegalCasesByClientId(clientId: string) {
  const clientRef = doc(db, 'User', clientId);
  const q = query(legalCasesCollection, where('clientId', '==', clientRef));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Get legal cases by lawyer ID
 */
export async function getLegalCasesByLawyerId(lawyerId: string) {
  const lawyerRef = doc(db, 'User', lawyerId);
  const q = query(legalCasesCollection, where('lawyerId', '==', lawyerRef));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Get all legal cases
 */
export async function getAllLegalCases() {
  const querySnapshot = await getDocs(legalCasesCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Update legal case
 */
export async function updateLegalCase(id: string, caseData: Partial<LegalCaseModel>) {
  return updateDocument<LegalCaseModel>('LegalCase', id, caseData);
}

/**
 * Assign lawyer to case
 */
export async function assignLawyerToCase(caseId: string, lawyerId: string) {
  const lawyerRef = doc(db, 'User', lawyerId);
  return updateDocument<LegalCaseModel>('LegalCase', caseId, { 
    lawyerId: lawyerRef,
    status: 'in_progress',
    updatedAt: serverTimestamp() as Timestamp
  });
}

// Case Document specific functions

/**
 * Add a new case document
 */
export async function addCaseDocument(documentData: Omit<CaseDocumentModel, 'uploadedAt' | 'caseId'> & { caseId: string }): Promise<string> {
  const caseRef = doc(db, 'LegalCase', documentData.caseId);
  
  const documentWithReferences = {
    ...documentData,
    caseId: caseRef,
    uploadedAt: serverTimestamp() as Timestamp
  };
  
  // Remove the string caseId and replace with reference
  const { caseId, ...rest } = documentData;
  
  return addDocument(caseDocumentsCollection, documentWithReferences as unknown as CaseDocumentModel);
}

/**
 * Get documents by case ID
 */
export async function getDocumentsByCaseId(caseId: string) {
  const caseRef = doc(db, 'LegalCase', caseId);
  const q = query(caseDocumentsCollection, where('caseId', '==', caseRef));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Specialization specific functions

/**
 * Add a new specialization
 */
export async function addSpecialization(specializationData: Omit<SpecializationModel, 'createdAt'>): Promise<string> {
  const specializationWithTimestamp = {
    ...specializationData,
    createdAt: serverTimestamp() as Timestamp
  };
  return addDocument(specializationsCollection, specializationWithTimestamp as SpecializationModel);
}

/**
 * Get all specializations
 */
export async function getAllSpecializations() {
  const querySnapshot = await getDocs(specializationsCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Lawyer Specialization specific functions

/**
 * Add a lawyer specialization
 */
export async function addLawyerSpecialization(lawyerId: string, specializationId: string): Promise<string> {
  const lawyerRef = doc(db, 'User', lawyerId);
  const specializationRef = doc(db, 'Specialization', specializationId);
  
  const lawyerSpecialization = {
    lawyerId: lawyerRef,
    specializationId: specializationRef,
    createdAt: serverTimestamp() as Timestamp
  };
  
  return addDocument(lawyerSpecializationsCollection, lawyerSpecialization as LawyerSpecializationModel);
}

/**
 * Get lawyer specializations by lawyer ID
 */
export async function getLawyerSpecializationsByLawyerId(lawyerId: string) {
  const lawyerRef = doc(db, 'User', lawyerId);
  const q = query(lawyerSpecializationsCollection, where('lawyerId', '==', lawyerRef));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Get specializations by lawyer ID
 */
export async function getSpecializationsByLawyerId(lawyerId: string) {
  const lawyerRef = doc(db, 'User', lawyerId);
  const q = query(lawyerSpecializationsCollection, where('lawyerId', '==', lawyerRef));
  const querySnapshot = await getDocs(q);
  
  // Get the specialization IDs
  const specializationRefs = querySnapshot.docs.map(doc => doc.data().specializationId);
  
  // Fetch the actual specialization documents
  const specializations = await Promise.all(
    specializationRefs.map(async (specializationRef) => {
      const docSnap = await getDoc(specializationRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    })
  );
  
  return specializations.filter(spec => spec !== null);
}

/**
 * Get lawyers by specialization ID
 */
export async function getLawyersBySpecializationId(specializationId: string) {
  const specializationRef = doc(db, 'Specialization', specializationId);
  const q = query(lawyerSpecializationsCollection, where('specializationId', '==', specializationRef));
  const querySnapshot = await getDocs(q);
  
  // Get the lawyer IDs
  const lawyerRefs = querySnapshot.docs.map(doc => doc.data().lawyerId);
  
  // Fetch the actual lawyer documents
  const lawyers = await Promise.all(
    lawyerRefs.map(async (lawyerRef) => {
      const docSnap = await getDoc(lawyerRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    })
  );
  
  return lawyers.filter(lawyer => lawyer !== null);
}

// Conversation Message specific functions

/**
 * Add a new message
 */
export async function addMessage(messageData: Omit<ConversationMessageModel, 'sentAt' | 'caseId' | 'senderId' | 'receiverId'> & { 
  caseId: string, 
  senderId: string, 
  receiverId: string 
}): Promise<string> {
  const caseRef = doc(db, 'LegalCase', messageData.caseId);
  const senderRef = doc(db, 'User', messageData.senderId);
  const receiverRef = doc(db, 'User', messageData.receiverId);
  
  const messageWithReferences = {
    ...messageData,
    caseId: caseRef,
    senderId: senderRef,
    receiverId: receiverRef,
    sentAt: serverTimestamp() as Timestamp,
    isRead: false
  };
  
  // Remove the string IDs and replace with references
  const { caseId, senderId, receiverId, ...rest } = messageData;
  
  return addDocument(conversationMessagesCollection, messageWithReferences as unknown as ConversationMessageModel);
}

/**
 * Get messages by case ID
 */
export async function getMessagesByCaseId(caseId: string) {
  const caseRef = doc(db, 'LegalCase', caseId);
  const q = query(conversationMessagesCollection, where('caseId', '==', caseRef));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: string) {
  return updateDocument<ConversationMessageModel>('ConversationMessage', messageId, { isRead: true });
}