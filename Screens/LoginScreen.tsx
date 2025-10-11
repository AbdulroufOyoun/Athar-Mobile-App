import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { Login } from '../router/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState<any>(null);

  const navigation = useNavigation<any>();
  useEffect(() => {
    getUserData();
  }, [uid]);
  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password is required');
      return;
    }
    Keyboard.dismiss();
    Login({ email: email, password: password, mobile_uuid: uid })
      .then((response) => {
        AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        navigation.navigate('MainNavigator');
      })
      .catch((error) => {
        Alert.alert('Wrong Data', error.response.data.message);
      });
  };

  const getDeviceId = async () => {
    if (Device.osInternalBuildId) {
      return Device.osInternalBuildId + Device.modelId; // Unique hardware identifier for Android devices
    } else {
      return Device.deviceName || 'Unknown Device';
    }
  };
  const getUserData = async () => {
    try {
      const userData = (await AsyncStorage.getItem('user')) ?? null;
      if (userData != null) {
        navigation.replace('MainNavigator');
      } else {
        const id = await getDeviceId();
        setUid(id);
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الالكتروني"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>تسجيل الدخول</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        ليس لديك حساب؟{' '}
        <TouchableNativeFeedback onPress={() => navigation.navigate('SingUp')}>
          <Text style={styles.signupLink}>انشاء حساب</Text>
        </TouchableNativeFeedback>
      </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 16,
    color: '#555',
  },
  signupLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});
