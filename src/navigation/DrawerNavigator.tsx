import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Setting from '../screens/DrawerScreen/Setting';
import TabNavigator from './TabNavigator';

const colors = {
  primary: '#4287f5',
  text: '#ffffff',
  drawerBackground: '#2a65cc',
};

const PrivacyPolicyScreen = () => (
  <View style={styles.privacyContainer}>
    <Text style={styles.privacyTitle}>Privacy & Policy</Text>
    <Text style={styles.privacyText}>
      Your privacy is important to us. This policy explains how we collect,
      use, and protect your personal information.
    </Text>
    <Text style={styles.privacyText}>
      We do not share your personal information with third parties.
      All data is anonymized and used for app improvement purposes only.
    </Text>
  </View>
);

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: colors.drawerBackground }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Novel App Menu</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.text,
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { marginLeft: 20, fontSize: 16 },
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text,
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Privacy & Policy" component={PrivacyPolicyScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#a3c2f0',
    marginBottom: 10,
  },
  drawerHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  privacyContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.drawerBackground,
  },
  privacyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default DrawerNavigator;
