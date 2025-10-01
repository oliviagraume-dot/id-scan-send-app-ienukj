
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { zincColors } from '@/constants/Colors';

interface ValidationStatusProps {
  isValid: boolean;
  message: string;
}

export const ValidationStatus: React.FC<ValidationStatusProps> = ({ 
  isValid, 
  message 
}) => {
  return (
    <View style={[styles.container, isValid ? styles.validContainer : styles.invalidContainer]}>
      <IconSymbol
        name={isValid ? "checkmark.circle.fill" : "exclamationmark.triangle.fill"}
        size={20}
        color={isValid ? "#059669" : "#dc2626"}
      />
      <Text style={[styles.text, isValid ? styles.validText : styles.invalidText]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  validContainer: {
    backgroundColor: '#d1fae5',
  },
  invalidContainer: {
    backgroundColor: '#fee2e2',
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  validText: {
    color: '#065f46',
  },
  invalidText: {
    color: '#991b1b',
  },
});
