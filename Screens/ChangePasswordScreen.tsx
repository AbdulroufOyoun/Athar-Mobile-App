import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { changePassword, Login } from '../router/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [token, setToken] = useState(null);

  const navigation = useNavigation<any>();
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed.token != null && parsed.token_expire_at > formattedDate) {
          setToken(parsed.token);
        }
      }
    } catch {
      navigation.navigate('Login');
    }
  };
  useEffect(() => {
    getUserData();
  }, [token]);
  // useEffect(() => {
  //   getUserData();
  // }, [uid]);
  const handleLogin = async () => {
    if (!oldPassword.trim()) {
      Alert.alert('Error', 'Old Password is required');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password is required');
      return;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    changePassword(
      {
        old_password: oldPassword,
        new_password: password,
        new_password_confirmation: passwordConfirmation,
      },
      token
    )
      .then((response) => {
        setLoading(false);

        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert('Wrong Data', error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" />

      <TextInput
        style={styles.input}
        placeholder="كلمة المرور القديمة"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={oldPassword}
        onChangeText={(text) => setOldPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        // secureTextEntry
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="تأكيد كلمة المرور"
        // secureTextEntry
        placeholderTextColor="#aaa"
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.buttonText, loading && styles.buttonDisabled]}>تسجيل الدخول</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 24,
    lineHeight: 45,
    letterSpacing: 1,
  },

  input: {
    width: '90%',
    color: 'black',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#0066cc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 16,
    color: '#555',
    fontSize: 17,
  },
  signupLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
