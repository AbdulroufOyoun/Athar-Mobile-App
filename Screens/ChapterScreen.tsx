import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function ChapterScreen() {
  const route = useRoute();
  const { token = null, specialization_id = null, year = null } = (route as any).params || {};

  const [years, setYears] = useState([
    { id: '1', name: 'الفصل الأول' },
    { id: '2', name: 'الفصل الثاني' },
  ]);

  const navigation = useNavigation<any>();

  const Card = ({ id, name }: { id: number; name: string }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Courses', {
          token: token,
          specialization_id: specialization_id,
          year: year,
          chapter: id,
        });
      }}
      style={{ margin: 15 }}>
      <View
        className="rounded-lg bg-white"
        style={{
          marginTop: 15,
          padding: 15,
          marginHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 8,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 5,
            },
          }),
        }}>
        <Text style={{ textAlign: 'right', fontSize: 20 }} className="text-right text-2xl">
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList
      data={years}
      renderItem={({ item }) => <Card id={item.id} name={item.name} />}
      keyExtractor={(item: any) => item.id}
      style={{ marginTop: 15, marginHorizontal: 10 }}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
}
