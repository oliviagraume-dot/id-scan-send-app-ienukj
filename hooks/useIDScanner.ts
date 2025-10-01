
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ExtractedIDInfo, ScanResult } from '../types/IDTypes';

export const useIDScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedIDInfo | null>(null);

  // Fonction simulée pour extraire les informations d'une pièce d'identité
  // Dans une vraie app, vous utiliseriez une API OCR comme Google Vision API ou AWS Textract
  const extractInfoFromImage = useCallback((imageUri: string): Promise<ExtractedIDInfo> => {
    return new Promise((resolve) => {
      // Simulation d'un délai de traitement OCR
      setTimeout(() => {
        // Données simulées - dans une vraie app, ceci viendrait de l'OCR
        const mockData: ExtractedIDInfo = {
          nom: "MARTIN",
          prenom: "Jean-Pierre",
          dateNaissance: "15/03/1985",
          numeroDocument: "123456789",
          dateExpiration: "15/03/2030"
        };
        resolve(mockData);
      }, 2000);
    });
  }, []);

  const scanFromCamera = useCallback(async (): Promise<ScanResult> => {
    try {
      setIsScanning(true);
      
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'L\'accès à la caméra est nécessaire pour scanner la pièce d\'identité.');
        return { success: false, error: 'Permission caméra refusée' };
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 10],
        quality: 1,
      });

      if (result.canceled) {
        return { success: false, error: 'Scan annulé' };
      }

      const imageUri = result.assets[0].uri;
      console.log('Image capturée:', imageUri);

      // Extraction des informations
      const extractedData = await extractInfoFromImage(imageUri);
      setExtractedInfo(extractedData);

      return {
        success: true,
        data: extractedData,
        imageUri
      };

    } catch (error) {
      console.error('Erreur lors du scan:', error);
      return { success: false, error: 'Erreur lors du scan' };
    } finally {
      setIsScanning(false);
    }
  }, [extractInfoFromImage]);

  const scanFromGallery = useCallback(async (): Promise<ScanResult> => {
    try {
      setIsScanning(true);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'L\'accès à la galerie est nécessaire pour sélectionner une image.');
        return { success: false, error: 'Permission galerie refusée' };
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 10],
        quality: 1,
      });

      if (result.canceled) {
        return { success: false, error: 'Sélection annulée' };
      }

      const imageUri = result.assets[0].uri;
      console.log('Image sélectionnée:', imageUri);

      // Extraction des informations
      const extractedData = await extractInfoFromImage(imageUri);
      setExtractedInfo(extractedData);

      return {
        success: true,
        data: extractedData,
        imageUri
      };

    } catch (error) {
      console.error('Erreur lors de la sélection:', error);
      return { success: false, error: 'Erreur lors de la sélection' };
    } finally {
      setIsScanning(false);
    }
  }, [extractInfoFromImage]);

  const clearExtractedInfo = useCallback(() => {
    setExtractedInfo(null);
  }, []);

  return {
    isScanning,
    extractedInfo,
    scanFromCamera,
    scanFromGallery,
    clearExtractedInfo
  };
};
