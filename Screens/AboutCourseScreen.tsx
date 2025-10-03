import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  Text,
  View,
  Platform,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const screenHeigh = Dimensions.get('window').height;

export default function AboutCourseScreen() {
  const route = useRoute();
  const { data = [] }: any = route.params || {};

  const ItemCard = ({ data, index }: any) => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'right',
            fontWeight: 'bold',
            fontSize: 30,
            marginRight: 20,
            marginTop: 30,
          }}>
          {data.title} :
        </Text>
        {data.descriptions.map((item: any, idx: any) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.text}>{item.description || item}</Text>
            <Text style={styles.bulletPoint}>•</Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }: any) => <ItemCard data={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // marginVertical: 1,
  },
  bulletPoint: {
    fontSize: 30,
    marginRight: 15, // Space between bullet and text
    textAlign: 'right',
  },
  text: {
    fontSize: 20,
    marginRight: 10,
    textAlign: 'right',
  },
});
