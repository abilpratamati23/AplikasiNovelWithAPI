import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  primary: '#4287f5', 
  secondary: '#ffffff',
  text: '#333333',
  background: '#f0f2f5',
  cardBackground: '#ffffff',
  iconColor: '#666666',
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../../assets/Flower.webp')} 
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Abil Pratama</Text>
        <Text style={styles.profileEmail}>abil.pratama_ti23@nusaputra.ac.id</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="person" size={24} color={colors.iconColor} />
          <Text style={styles.menuItemText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="notifications" size={24} color={colors.iconColor} />
          <Text style={styles.menuItemText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="settings" size={24} color={colors.iconColor} />
          <Text style={styles.menuItemText}>App Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help" size={24} color={colors.iconColor} />
          <Text style={styles.menuItemText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="info" size={24} color={colors.iconColor} />
          <Text style={styles.menuItemText}>About Us</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    backgroundColor: colors.primary,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.secondary,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 6,
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
  profileEmail: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '400',
    opacity: 0.9,
    fontFamily: 'System',
  },
  section: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 17,
    color: '#1f2937',
    marginLeft: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
    fontFamily: 'System',
  },
  logoutButton: {
    backgroundColor: '#ff6347', 
    padding: 16,
    margin: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ff6347',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: colors.secondary,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
});

export default ProfileScreen;
