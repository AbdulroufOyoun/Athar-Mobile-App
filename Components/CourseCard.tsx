import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
// import { styles } from '../theme';

const screenWidth = Dimensions.get('window').width;
const screenHeigh = Dimensions.get('window').height;

export default function CourseCard({ data }: any) {
  const navigation = useNavigation<any>();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('CoursePlayList', {
          data: data.id,
          item: data,
        })
      }>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <Text style={styles.price}>{data.price} ألف</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeigh * 0.22,
    backgroundColor: '#dbdbdb',
    flexDirection: 'row',
    marginHorizontal: '2%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  image: { borderRadius: 24, width: screenWidth * 0.4, height: screenHeigh * 0.22 },
  collectionTitle: {
    fontSize: 25,
  },
  title: { textAlign: 'right', width: screenWidth * 0.5, margin: 5, fontSize: 20 },
  description: { textAlign: 'right', width: screenWidth * 0.5, height: screenHeigh * 0.12 },
  price: { width: screenWidth * 0.5, marginTop: 5, paddingLeft: 25, fontWeight: 'bold' },
});
