
import { Alert } from 'react-native';

export interface ErrorResult {
  success: false;
  error: string;
  code?: string;
}

export interface SuccessResult<T = any> {
  success: true;
  data?: T;
}

export type Result<T = any> = SuccessResult<T> | ErrorResult;

export const handleError = (error: any, context: string = 'Opération'): ErrorResult => {
  console.error(`Erreur dans ${context}:`, error);
  
  let errorMessage = 'Une erreur inattendue s\'est produite';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  return {
    success: false,
    error: errorMessage,
    code: error?.code || 'UNKNOWN_ERROR'
  };
};

export const showErrorAlert = (error: string, title: string = 'Erreur') => {
  Alert.alert(title, error, [{ text: 'OK' }]);
};

export const createSuccessResult = <T>(data?: T): SuccessResult<T> => ({
  success: true,
  data
});

export const createErrorResult = (error: string, code?: string): ErrorResult => ({
  success: false,
  error,
  code
});

export const isErrorResult = (result: Result): result is ErrorResult => {
  return !result.success;
};

export const isSuccessResult = <T>(result: Result<T>): result is SuccessResult<T> => {
  return result.success;
};
