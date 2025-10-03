import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import * as Device from 'expo-device';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUp } from '../router/data';
export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [universityId, setUniversityId] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [uid, setUid] = useState<any>(null);

  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData && JSON.parse(userData).token) {
        navigation.navigate('MainNavigator');
      }
    })();
    (async () => {
      const uid = await getDeviceId();
      setUid(uid);
    })();
  }, [navigation]);

  const getDeviceId = async () => {
    if (Device.osInternalBuildId) {
      return Device.osInternalBuildId; // Unique hardware identifier for Android devices
    } else {
      return Device.deviceName || 'Unknown Device';
    }
  };

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }
    if (universityId === null) {
      Alert.alert('Error', 'University ID is required');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password is required');
      return;
    }
    if (!passwordConfirmation.trim()) {
      Alert.alert('Error', 'Password confirmation is required');
      return;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Keyboard.dismiss();
    console.log(email);
    SignUp({
      email: email,
      name: name,
      phone: phone,
      university_id: universityId,
      password: password,
      password_confirmation: passwordConfirmation,
      mobile_uuid: uid,
    })
      .then((response) => {
        console.log(response.data);
        AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        navigation.navigate('MainNavigator');
      })
      .catch((error) => {
        console.log(error.data);
        Alert.alert('Wrong Data', error.response.data.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>مستخدم جديد</Text>
      <TextInput
        style={styles.input}
        placeholder="الأسم"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="رقم الهاتف"
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="البريد الالكتروني"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <RNPickerSelect
        style={{
          inputIOS: {
            width: '90%',
            marginStart: '5%',
            height: 50,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 12,
            marginBottom: 16,
            backgroundColor: '#fff',
          },
          inputAndroid: {
            width: '90%',
            color: 'black',

            marginStart: '5%',
            height: 50,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 12,
            marginBottom: 16,
            backgroundColor: '#fff',
          },
        }}
        placeholder={{
          label: 'الجامعة',
          value: null,
          color: '#aaa',
        }}
        onValueChange={(value: any) => setUniversityId(value)}
        items={[{ label: 'دمشق', value: 1 }]}
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="تأكيد كلمة المرور"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>انشاء الحساب </Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        لديك حساب بالفعل؟{' '}
        <TouchableNativeFeedback onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupLink}>تسجيل الدخول</Text>
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
