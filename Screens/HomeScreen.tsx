import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AdsComponent from '../Components/AdsComponents';
import { showCollections, showCourses, showUniversities } from '../router/data';
import CollectionList from '../Components/CollectionList';
import CourseCard from '../Components/CourseCard';

import Loading from '../Components/loading';
import { useNavigation } from '@react-navigation/native';
import UniversitiesCard from 'Components/UniversitiesCard';
const currentDate = new Date();

const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
export default function HomeScreen() {
  const [collections, setCollections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const [universities, setUniversities] = useState<any>([]);

  useEffect(() => {
    if (!token) {
      getUserData();
    }
    if (token) {
      getUniversities();
      getCollections();
    }
  }, [token]);
  const getUniversities = () => {
    showUniversities(token)
      .then((response) => {
        setUniversities(response.data.data);
      })
      .catch((error: any) => {
        // ignore
        console.log(error.message);
      });
  };
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
      // ignore
    }
  };

  const getCollections = () => {
    if (collections.length === 0) {
      showCollections(token)
        .then((response) => {
          setCollections(response.data.data);
          getCourses();
          setLoading(false);
        })
        .catch((error: any) => {
          // ignore
          console.log(error.message);
        });
    }
  };

  const getCourses = () => {
    if (courses.length === 0) {
      showCourses(token)
        .then((response) => {
          setCourses(response.data.data);
        })
        .catch(() => {});
    }
  };
  return (
    <ScrollView>
      <StatusBar translucent barStyle="dark-content" />

      <View>
        <AdsComponent />
      </View>
      {loading ? (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Loading />
        </View>
      ) : (
        <>
          <View>
            <FlatList
              data={universities}
              renderItem={({ item }) => (
                <UniversitiesCard
                  name={item.name}
                  id={item.id}
                  navigation={navigation}
                  token={token}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              inverted
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 8 }}
            />
          </View>
          <View>
            <View
              style={[
                { flexDirection: 'row', justifyContent: 'space-between' },
                styles.discountTitle,
              ]}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('AllCollections', { token: token });
                }}>
                <Text style={{ fontSize: 20, color: '#001A6E', marginTop: 3 }}>عرض الكل</Text>
              </TouchableWithoutFeedback>
              <Text style={styles.collectionTitle}>العروض</Text>
            </View>
            <FlatList
              data={collections}
              renderItem={({ item }) => <CollectionList data={item} token={token} />}
              keyExtractor={(item: any) => item.id}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              inverted={true}
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: 'right',
                marginRight: 15,
                marginBottom: 20,
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              شائع الان
            </Text>
            <FlatList
              data={courses}
              renderItem={({ item }) => <CourseCard data={item} />}
              keyExtractor={(item: any) => item.id}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
  },
  discountTitle: {
    fontWeight: 'bold',
    backgroundColor: '#dbdbdb',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: '5%',
    marginBottom: 10,
  },
  collectionTitle: {
    fontSize: 25,
  },
});
