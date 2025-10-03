import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
// import { findMovies } from '../data';
import Loading from '../Components/loading';
import { SearchCourses } from '../router/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseCard from '../Components/CourseCard';

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getUser();
  }, [token]);
  const getUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    setToken(userData ? (JSON.parse(userData).token ?? null) : null);
  };
  const searchCourses = (title: any) => {
    if (title !== '') {
      setLoading(true);
      SearchCourses(token, title)
        .then((response) => {
          setResults(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    } else {
      setResults([]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <StatusBar style="dark" /> */}

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Course"
          // placeholderTextColor="lightgray"
          onChangeText={(text) => searchCourses(text)}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.closeButton}>
          <Ionicons name="close" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.resultsText}>Results ( {results.length} )</Text>
          <View>
            <FlatList
              data={results}
              renderItem={({ item }) => <CourseCard data={item} />}
              keyExtractor={(item: any) => item.id}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../assets/images/family-enjoying-picnic.png')}
            style={styles.emptyImage}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#dbdbdb', // Neutral-800 equivalent
    paddingTop: 16,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#dbdbdb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6B7280', // Neutral-500 equivalent
    borderRadius: 50,
  },
  textInput: {
    paddingBottom: 4,
    paddingLeft: 24,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 1.2,
  },
  closeButton: {
    borderRadius: 50,
    padding: 12,
    margin: 4,
    backgroundColor: '#6B7280', // Neutral-500 equivalent
  },
  scrollContainer: {
    // paddingHorizontal: 15,
  },
  resultsText: {
    color: 'black',
    marginLeft: 15,
    fontWeight: '900',
    marginBottom: 10,
    fontSize: 15,
  },

  resultItem: {
    marginBottom: 16,
  },
  resultImage: {
    borderRadius: 24,
  },
  resultTitle: {
    marginRight: 8,
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 384,
    height: 384,
  },
});
