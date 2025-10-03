import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
// import { ShowPdf } from '../router/data';
export default function CoursePlayList() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  // const [pdf, setPdf] = useState(null);

  const { data = [], isSubscribed, token = null }: any = route.params || {};
  useEffect(() => {
    console.log(data);
  }, [data, isSubscribed]);
  const downloadPDF = async (pdfName: any) => {
    const pdfUrl = 'http://192.168.1.3:8888/api/pdf?pdf=' + pdfName;

    const baseDir =
      (FileSystem as any).cacheDirectory || (FileSystem as any).documentDirectory || '';
    const fileUri = baseDir + pdfName;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (fileInfo.exists) {
      navigation.navigate('Pdf', {
        pdf: fileInfo.uri,
        token: token,
      });
    } else {
      try {
        const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fileInfo = await FileSystem.getInfoAsync(uri);
        navigation.navigate('Pdf', {
          pdf: fileInfo.uri,
        });
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  const showVideo = (videoName: string) => {
    navigation.navigate('Video', {
      videoName: videoName,
      token: token,
    });
  };

  const ItemCard = ({ data, index }: any) => {
    return (
      <View style={styles.cardContainer}>
        <View style={{ flexDirection: 'row' }}>
          <>
            {isSubscribed || data.is_free ? (
              <>
                <TouchableWithoutFeedback key={index + 1000} onPress={() => showVideo(data.video)}>
                  <Ionicons name="play" size={25} color="blue" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback key={data.id} onPress={() => downloadPDF(data.pdf)}>
                  <MaterialCommunityIcons
                    name="file-document"
                    size={25}
                    color="red"
                    style={{ marginHorizontal: 10 }}
                  />
                </TouchableWithoutFeedback>
              </>
            ) : (
              <TouchableWithoutFeedback key={index + 100} onPress={() => console.log('test play')}>
                <Ionicons name="ban" size={25} color="blue" />
              </TouchableWithoutFeedback>
            )}
          </>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20 }}>{data.name}</Text>
          <Text style={styles.itemIndex}> {index + 1} </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <ItemCard data={item} index={index} />}
        keyExtractor={(item: any) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginHorizontal: '2%',
    borderRadius: 20,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemIndex: {
    fontSize: 20,
    backgroundColor: 'red',
    borderRadius: 100,
    marginLeft: 10,
    color: 'white',
  },
});
