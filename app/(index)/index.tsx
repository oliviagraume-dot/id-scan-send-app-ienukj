
import React from "react";
import { Stack, router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
// Components
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { BodyScrollView } from "@/components/BodyScrollView";
import { Button } from "@/components/button";
// Constants & Hooks
import { backgroundColors } from "@/constants/Colors";

const ICON_COLOR = "#007AFF";

export default function HomeScreen() {

  const appFeatures = [
    {
      title: "Scanner ID",
      description: "Scanner une pièce d'identité et extraire les informations",
      route: "/scanner",
      color: "#007AFF",
      icon: "camera"
    },
    {
      title: "Standard Modal",
      description: "Full screen modal presentation",
      route: "/modal",
      color: "#34C759",
      icon: "square.grid.3x3"
    },
    {
      title: "Form Sheet",
      description: "Bottom sheet with detents and grabber",
      route: "/formsheet",
      color: "#FF9500",
      icon: "doc.text"
    },
    {
      title: "Transparent Modal",
      description: "Overlay without obscuring background",
      route: "/transparent-modal",
      color: "#FF3B30",
      icon: "eye"
    }
  ];

  const renderFeatureCard = ({ item }: { item: typeof appFeatures[0] }) => (
    <Pressable 
      style={styles.featureCard}
      onPress={() => router.push(item.route as any)}
    >
      <View style={[styles.featureIcon, { backgroundColor: item.color }]}>
        <IconSymbol name={item.icon as any} color="white" size={24} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{item.title}</Text>
        <Text style={styles.featureDescription}>{item.description}</Text>
      </View>
      <IconSymbol name="chevron.right" color="#666" size={20} />
    </Pressable>
  );

  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
      <IconCircle
        emoji=""
        backgroundColor={
          backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        }
      />
    </BodyScrollView>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {console.log("plus")}}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="plus" color={ICON_COLOR} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {console.log("gear")}}
      style={styles.headerButtonContainer}
    >
      <IconSymbol
        name="gear"
        color={ICON_COLOR}
      />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Scanner ID App",
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Bienvenue</Text>
          <Text style={styles.headerSubtitle}>
            Scannez vos pièces d'identité et extrayez facilement les informations importantes
          </Text>
        </View>
        
        <FlatList
          data={appFeatures}
          renderItem={renderFeatureCard}
          keyExtractor={(item) => item.route}
          contentContainerStyle={styles.listContainer}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
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
  headerSection: {
    padding: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyStateContainer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 100,
  },
  headerButtonContainer: {
    padding: 6, // Just enough padding around the 24px icon
  },
});
