import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMyCourses } from '../router/data';
import CourseCard from '../Components/CourseCard';
import * as Network from 'expo-network';
import Loading from '../Components/loading';

const currentDate = new Date();

const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
export default function MyCoursesScreen() {
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigation = useNavigation<any>();
  useEffect(() => {
    checkInternet();
    getUserData();
    if (token) {
      getCourses();
    }
  }, [token]);
  const checkInternet = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setIsConnected(!!networkState.isInternetReachable);
  };
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed.token != null && parsed.token_expire_at > formattedDate) {
          setToken(parsed.token);
        }
      } else {
        navigation.navigate('Login');
      }
    } catch {
      navigation.navigate('Login');
    }
  };

  const getCourses = async () => {
    checkInternet();
    if (isConnected) {
      showMyCourses(token)
        .then((response) => {
          setCourses(response.data.data);
          setLoading(false);
          AsyncStorage.setItem('myCourses', JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      const userData = await AsyncStorage.getItem('myCourses');
      setCourses(userData ? JSON.parse(userData) : []);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getCourses();
    setRefreshing(false);
  };
  return (
    <>
      {loading ? (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Loading />
        </View>
      ) : (
        <>
          <View style={{ marginTop: 30 }}>
            <FlatList
              data={courses}
              renderItem={({ item }) => <CourseCard data={item} />}
              keyExtractor={(item: any) => String(item.id)}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              ListEmptyComponent={() => (
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20 }}>
                  لم تشترك بأي دورة بعد
                </Text>
              )}
            />
          </View>
        </>
      )}
    </>
  );
}
