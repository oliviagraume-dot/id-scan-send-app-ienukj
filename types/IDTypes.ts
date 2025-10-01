
export interface ExtractedIDInfo {
  nom: string;
  prenom: string;
  dateNaissance: string;
  numeroDocument?: string;
  dateExpiration?: string;
}

export interface ScanResult {
  success: boolean;
  data?: ExtractedIDInfo;
  error?: string;
  imageUri?: string;
}

export interface MessageData {
  recipient: string;
  subject: string;
  body: string;
}
