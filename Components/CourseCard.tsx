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
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.doctor}>{data.doctor}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.university} numberOfLines={1} ellipsizeMode="tail">
              {data.university}
            </Text>
            <Text style={styles.price} numberOfLines={1}>
              {data.price} ألف
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeigh * 0.22,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: '2%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  image: { borderRadius: 24, width: screenWidth * 0.4, height: screenHeigh * 0.22 },
  collectionTitle: {
    fontSize: 25,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  title: { textAlign: 'right', margin: 5, marginBottom: 0, fontSize: 20 },
  doctor: {
    textAlign: 'right',
    fontSize: 15,
    color: '#999',
  },
  description: { textAlign: 'right', height: screenHeigh * 0.11 },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  university: {
    flex: 1,
    textAlign: 'left',
    fontSize: 15,
    color: '#333',
    marginRight: 8,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
