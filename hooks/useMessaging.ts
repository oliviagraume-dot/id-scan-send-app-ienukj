
import { useState, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { ExtractedIDInfo, MessageData } from '../types/IDTypes';

export const useMessaging = () => {
  const [isSending, setIsSending] = useState(false);

  const formatInfoForMessage = useCallback((info: ExtractedIDInfo): string => {
    return `Informations de la pièce d'identité :

Nom : ${info.nom}
Prénom : ${info.prenom}
Date de naissance : ${info.dateNaissance}
${info.numeroDocument ? `Numéro de document : ${info.numeroDocument}` : ''}
${info.dateExpiration ? `Date d'expiration : ${info.dateExpiration}` : ''}

Envoyé depuis l'app Scanner ID`;
  }, []);

  const sendViaSMS = useCallback(async (info: ExtractedIDInfo, phoneNumber?: string) => {
    try {
      setIsSending(true);
      const message = formatInfoForMessage(info);
      const url = `sms:${phoneNumber || ''}?body=${encodeURIComponent(message)}`;
      
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        console.log('SMS ouvert avec succès');
        return { success: true };
      } else {
        console.log('Impossible d\'ouvrir l\'application SMS');
        return { success: false, error: 'Impossible d\'ouvrir l\'application SMS' };
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi SMS:', error);
      return { success: false, error: 'Erreur lors de l\'ouverture de l\'application SMS' };
    } finally {
      setIsSending(false);
    }
  }, [formatInfoForMessage]);

  const sendViaEmail = useCallback(async (info: ExtractedIDInfo, email?: string) => {
    try {
      setIsSending(true);
      const message = formatInfoForMessage(info);
      const subject = 'Informations pièce d\'identité scannée';
      const url = `mailto:${email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        console.log('Email ouvert avec succès');
        return { success: true };
      } else {
        console.log('Impossible d\'ouvrir l\'application email');
        return { success: false, error: 'Impossible d\'ouvrir l\'application email' };
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi email:', error);
      return { success: false, error: 'Erreur lors de l\'ouverture de l\'application email' };
    } finally {
      setIsSending(false);
    }
  }, [formatInfoForMessage]);

  const sendMessage = useCallback(async (info: ExtractedIDInfo) => {
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      Alert.alert(
        'Envoyer les informations',
        'Choisissez comment envoyer les informations',
        [
          {
            text: 'SMS',
            onPress: async () => {
              const result = await sendViaSMS(info);
              resolve(result);
            }
          },
          {
            text: 'Email',
            onPress: async () => {
              const result = await sendViaEmail(info);
              resolve(result);
            }
          },
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: () => resolve({ success: false, error: 'Envoi annulé' })
          }
        ]
      );
    });
  }, [sendViaSMS, sendViaEmail]);

  const shareInfo = useCallback(async (info: ExtractedIDInfo) => {
    try {
      setIsSending(true);
      const message = formatInfoForMessage(info);
      
      // Utilisation du partage natif si disponible
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Informations pièce d\'identité',
          text: message,
        });
        return { success: true };
      } else {
        // Fallback vers le choix SMS/Email
        return await sendMessage(info);
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      return { success: false, error: 'Erreur lors du partage des informations' };
    } finally {
      setIsSending(false);
    }
  }, [formatInfoForMessage, sendMessage]);

  return {
    isSending,
    sendViaSMS,
    sendViaEmail,
    sendMessage,
    shareInfo,
    formatInfoForMessage
  };
};
