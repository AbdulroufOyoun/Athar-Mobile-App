import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
// import messaging from '@react-native-firebase/messaging';

import { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { Login, updateFcmToken } from '../router/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState<any>(null);

  const navigation = useNavigation<any>();

  // const requestUserPermission = async () => {
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     return;
  //   }
  // };

  // const fcm = async (userToken: any) => {
  //   try {
  //     console.log(userToken);
  //     const fcm_token = await AsyncStorage.getItem('fcm_token');
  //     if (!fcm_token) {
  //       requestUserPermission();
  //       if (Platform.OS === 'android') {
  //         Notifications.setNotificationChannelAsync('default', {
  //           name: 'default',
  //           importance: Notifications.AndroidImportance.HIGH,
  //           vibrationPattern: [0, 250, 250, 250],
  //           lightColor: '#FF231F7C',
  //         });
  //       }

  //       messaging()
  //         .getToken()
  //         .then((fcm_token: any) => {
  //           console.log('test');

  //           console.log(fcm_token);
  //           AsyncStorage.setItem('fcm_token', fcm_token);
  //           updateFcmToken(userToken, fcm_token).then((_res: any) => {
  //             navigation.navigate('MainNavigator');
  //           });
  //         })
  //         .catch((error: any) => {
  //           console.log(error);
  //         });

  //       messaging()
  //         .getInitialNotification()
  //         .then((remoteMessage: any) => {});

  //       messaging().onNotificationOpenedApp((remoteMessage: any) => {});

  //       messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {});

  //       const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
  //         Alert.alert('New FCM message!', JSON.stringify(remoteMessage));
  //       });

  //       return unsubscribe;
  //     }
  //   } catch (error) {}
  // };
  useEffect(() => {
    getUserData();
  }, [uid]);
  const handleLogin = async () => {
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
        // fcm(response.data.data.token);
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
      <StatusBar translucent barStyle="dark-content" />

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
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>تسجيل الدخول</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        ليس لديك حساب؟
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
