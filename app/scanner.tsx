
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { Button } from '@/components/button';
import { ScannerCard } from '@/components/ScannerCard';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { useIDScanner } from '@/hooks/useIDScanner';
import { zincColors } from '@/constants/Colors';

export default function ScannerScreen() {
  const { isScanning, scanFromCamera, scanFromGallery } = useIDScanner();

  const handleCameraScan = async () => {
    console.log('Démarrage du scan par caméra');
    const result = await scanFromCamera();
    
    if (result.success && result.data) {
      console.log('Scan réussi:', result.data);
      router.push({
        pathname: '/results',
        params: {
          nom: result.data.nom,
          prenom: result.data.prenom,
          dateNaissance: result.data.dateNaissance,
          numeroDocument: result.data.numeroDocument || '',
          dateExpiration: result.data.dateExpiration || '',
          imageUri: result.imageUri || ''
        }
      });
    } else {
      console.log('Échec du scan:', result.error);
      if (result.error && result.error !== 'Scan annulé') {
        Alert.alert('Erreur', result.error);
      }
    }
  };

  const handleGalleryScan = async () => {
    console.log('Démarrage du scan depuis la galerie');
    const result = await scanFromGallery();
    
    if (result.success && result.data) {
      console.log('Scan réussi:', result.data);
      router.push({
        pathname: '/results',
        params: {
          nom: result.data.nom,
          prenom: result.data.prenom,
          dateNaissance: result.data.dateNaissance,
          numeroDocument: result.data.numeroDocument || '',
          dateExpiration: result.data.dateExpiration || '',
          imageUri: result.imageUri || ''
        }
      });
    } else {
      console.log('Échec du scan:', result.error);
      if (result.error && result.error !== 'Sélection annulée') {
        Alert.alert('Erreur', result.error);
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Scanner ID',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: zincColors.zinc900 },
        }}
      />
      
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Scanner une pièce d&apos;identité</Text>
            <Text style={styles.subtitle}>
              Choisissez comment vous souhaitez scanner votre document
            </Text>
          </View>

          <View style={styles.cardsContainer}>
            <ScannerCard
              title="Prendre une photo"
              description="Utilisez l'appareil photo pour scanner directement"
              iconName="camera"
              onPress={handleCameraScan}
              disabled={isScanning}
            />

            <ScannerCard
              title="Choisir depuis la galerie"
              description="Sélectionnez une photo existante"
              iconName="photo"
              onPress={handleGalleryScan}
              disabled={isScanning}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Informations extraites :</Text>
            <View style={styles.infoList}>
              <Text style={styles.infoItem}>• Nom et prénom</Text>
              <Text style={styles.infoItem}>• Date de naissance</Text>
              <Text style={styles.infoItem}>• Numéro de document</Text>
              <Text style={styles.infoItem}>• Date d&apos;expiration</Text>
            </View>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>

        <LoadingOverlay 
          visible={isScanning} 
          message="Analyse de la pièce d'identité en cours..."
        />
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
  cardsContainer: {
    marginTop: 24,
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: zincColors.zinc900,
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    fontSize: 14,
    color: zincColors.zinc600,
    lineHeight: 20,
  },
  bottomSpace: {
    height: 32,
  },
});
