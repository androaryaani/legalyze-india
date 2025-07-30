import { db } from '../utils/firebase';
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where, Timestamp, DocumentReference, DocumentData, CollectionReference } from 'firebase/firestore';

// Type definitions for Firestore schema

export type UserType = 'user' | 'lawyer' | 'admin';

export interface UserModel {
  email: string;
  passwordHash: string;
  displayName: string;
  userType: UserType;
  createdAt: Timestamp;
  bio?: string;
  contactNumber?: string;
  profilePictureUrl?: string;
  updatedAt?: Timestamp;
}

export type CaseStatus = 'open' | 'in_progress' | 'closed' | 'pending';

export interface LegalCaseModel {
  title: string;
  description: string;
  status: CaseStatus;
  createdAt: Timestamp;
  clientId: DocumentReference;
  lawyerId?: DocumentReference;
  submittedAt?: Timestamp;
  closedAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CaseDocumentModel {
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: Timestamp;
  caseId: DocumentReference;
  description?: string;
}

export interface SpecializationModel {
  name: string;
  createdAt: Timestamp;
  description?: string;
  updatedAt?: Timestamp;
}

export interface LawyerSpecializationModel {
  lawyerId: DocumentReference;
  specializationId: DocumentReference;
  createdAt: Timestamp;
}

export interface ConversationMessageModel {
  content: string;
  sentAt: Timestamp;
  caseId: DocumentReference;
  senderId: DocumentReference;
  receiverId: DocumentReference;
  isRead?: boolean;
  attachmentUrl?: string;
}

// Collection references
export const usersCollection = collection(db, 'User') as CollectionReference<UserModel>;
export const legalCasesCollection = collection(db, 'LegalCase') as CollectionReference<LegalCaseModel>;
export const caseDocumentsCollection = collection(db, 'CaseDocument') as CollectionReference<CaseDocumentModel>;
export const specializationsCollection = collection(db, 'Specialization') as CollectionReference<SpecializationModel>;
export const lawyerSpecializationsCollection = collection(db, 'LawyerSpecialization') as CollectionReference<LawyerSpecializationModel>;
export const conversationMessagesCollection = collection(db, 'ConversationMessage') as CollectionReference<ConversationMessageModel>;