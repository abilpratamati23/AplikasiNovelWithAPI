import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const colors = {
  primary: '#4287f5',
  text: '#333333',
  background: '#f0f2f5',
};

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>There are no favorite novels yet. Find and add your favorite novels to your favorite list!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
});

export default FavoriteScreen;
