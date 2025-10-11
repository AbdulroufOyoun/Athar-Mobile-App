import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// export default function AdsComponent({ data }) {
export default function AdsComponent() {
  const [entries, setEntries] = useState([
    { id: '1', image: 'http://192.168.1.3:8888/Images/Courses/87494605972download.jpg' },
    { id: '2', image: 'http://192.168.1.3:8888/Images/Courses/87494605972download.jpg' },
    { id: '3', image: 'http://192.168.1.3:8888/Images/Courses/87494605972download.jpg' },
    { id: '4', image: 'http://192.168.1.3:8888/Images/Courses/87494605972download.jpg' },
  ]);
  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  const screenWidth = Dimensions.get('window').width;
  const screenHeigh = Dimensions.get('window').height;

  const Ad = (image: any) => (
    <View className="mt-2 ">
      <Image
        source={{ uri: 'http://192.168.1.5:8888/Images/Courses/87494605972download.jpg' }}
        className="me-3 h-52 w-80 rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
  return (
    <FlatList
      data={entries}
      renderItem={({ item }) => <Ad image={item.image} />}
      keyExtractor={(item) => item.id}
      horizontal
      inverted
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 8 }}
    />
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  itemText: {
    fontSize: 20,
  },
});
