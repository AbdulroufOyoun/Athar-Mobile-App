import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// export default function AdsComponent({ data }) {
export default function AdsComponent() {
  const [entries, setEntries] = useState([
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
    { title: 'Item 4' },
  ]);
  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <Carousel
      data={entries}
      renderItem={renderItem}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={300}
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
