
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/button';
import { InfoCard } from '@/components/InfoCard';
import { useMessaging } from '@/hooks/useMessaging';
import { zincColors } from '@/constants/Colors';
import { ExtractedIDInfo } from '@/types/IDTypes';

export default function ResultsScreen() {
  const params = useLocalSearchParams();
  const { sendMessage, isSending } = useMessaging();
  const [isValidated, setIsValidated] = useState(false);

  console.log('Paramètres reçus:', params);

  const extractedInfo: ExtractedIDInfo = {
    nom: params.nom as string || '',
    prenom: params.prenom as string || '',
    dateNaissance: params.dateNaissance as string || '',
    numeroDocument: params.numeroDocument as string || '',
    dateExpiration: params.dateExpiration as string || '',
  };

  const imageUri = params.imageUri as string;

  const handleSendMessage = async () => {
    console.log('Envoi du message avec les informations:', extractedInfo);
    
    const result = await sendMessage(extractedInfo);
    
    if (result.success) {
      Alert.alert(
        'Message envoyé',
        'Les informations ont été envoyées avec succès.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/')
          }
        ]
      );
    } else {
      Alert.alert('Erreur', result.error || 'Impossible d\'envoyer le message');
    }
  };

  const handleValidateInfo = () => {
    console.log('Validation des informations');
    setIsValidated(true);
    Alert.alert(
      'Informations validées',
      'Les informations extraites ont été validées avec succès.'
    );
  };

  const handleRetry = () => {
    console.log('Retour au scanner');
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Résultats du scan',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: zincColors.zinc900 },
        }}
      />
      
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Informations extraites</Text>
            <Text style={styles.subtitle}>
              Vérifiez les informations avant de les envoyer
            </Text>
          </View>

          {imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.scannedImage} />
            </View>
          )}

          <View style={styles.infoContainer}>
            <InfoCard
              label="Nom"
              value={extractedInfo.nom || 'Non détecté'}
              iconName="person"
            />
            
            <InfoCard
              label="Prénom"
              value={extractedInfo.prenom || 'Non détecté'}
              iconName="person.fill"
            />
            
            <InfoCard
              label="Date de naissance"
              value={extractedInfo.dateNaissance || 'Non détectée'}
              iconName="calendar"
            />
            
            {extractedInfo.numeroDocument && (
              <InfoCard
                label="Numéro de document"
                value={extractedInfo.numeroDocument}
                iconName="doc.text"
              />
            )}
            
            {extractedInfo.dateExpiration && (
              <InfoCard
                label="Date d'expiration"
                value={extractedInfo.dateExpiration}
                iconName="clock"
              />
            )}
          </View>

          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, isValidated && styles.statusBadgeValidated]}>
              <Text style={[styles.statusText, isValidated && styles.statusTextValidated]}>
                {isValidated ? '✓ Informations validées' : '⚠ En attente de validation'}
              </Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <Button
              onPress={handleValidateInfo}
              variant="secondary"
              disabled={isValidated}
              style={styles.actionButton}
            >
              {isValidated ? 'Validé' : 'Valider les informations'}
            </Button>

            <Button
              onPress={handleSendMessage}
              loading={isSending}
              disabled={!isValidated || isSending}
              style={styles.actionButton}
            >
              Envoyer par message
            </Button>

            <Button
              onPress={handleRetry}
              variant="outline"
              style={styles.actionButton}
            >
              Scanner à nouveau
            </Button>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: zincColors.zinc900,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: zincColors.zinc600,
    lineHeight: 24,
  },
  imageContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scannedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginBottom: 24,
  },
  statusContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  statusBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statusBadgeValidated: {
    backgroundColor: '#d1fae5',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  statusTextValidated: {
    color: '#065f46',
  },
  actionsContainer: {
    marginHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
  bottomSpace: {
    height: 32,
  },
});
