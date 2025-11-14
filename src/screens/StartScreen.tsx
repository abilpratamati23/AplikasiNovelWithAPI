import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';

const colors = {
  primary: '#4287f5', // Blue theme
  secondary: '#ffffff',
  text: '#ffffff',
  inputBackground: '#a3c2f0',
  buttonText: '#ffffff',
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Main' as never);
  };

  return (
    <ImageBackground source={require('../../assets/Background.webp')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Novel App</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ffffff"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 52,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 40,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'System',
  },
  input: {
    width: '80%',
    backgroundColor: colors.inputBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#4287f5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
  forgotPasswordContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.text,
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '500',
    letterSpacing: 0.2,
    fontFamily: 'System',
  },
});

export default LoginScreen;