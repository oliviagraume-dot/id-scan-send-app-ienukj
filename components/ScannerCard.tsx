
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { appleBlue, zincColors } from '@/constants/Colors';

interface ScannerCardProps {
  title: string;
  description: string;
  iconName: string;
  onPress: () => void;
  disabled?: boolean;
}

export const ScannerCard: React.FC<ScannerCardProps> = ({
  title,
  description,
  iconName,
  onPress,
  disabled = false
}) => {
  return (
    <Pressable
      style={[styles.card, disabled && styles.cardDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.iconContainer}>
        <IconSymbol
          name={iconName as any}
          size={32}
          color={disabled ? zincColors.zinc400 : appleBlue}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, disabled && styles.textDisabled]}>
          {title}
        </Text>
        <Text style={[styles.description, disabled && styles.textDisabled]}>
          {description}
        </Text>
      </View>
      <IconSymbol
        name="chevron.right"
        size={20}
        color={disabled ? zincColors.zinc400 : zincColors.zinc600}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
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
  cardDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: zincColors.zinc900,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: zincColors.zinc600,
    lineHeight: 20,
  },
  textDisabled: {
    color: zincColors.zinc400,
  },
});
