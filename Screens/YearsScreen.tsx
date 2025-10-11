import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showSpecializationYears } from 'router/data';

export default function YearScreen() {
  const route = useRoute();
  const { token = null, specialization_id = null } = (route as any).params || {};

  const [years, setYears] = useState<any>([]);
  useEffect(() => {
    getYears();
  }, []);
  const getYears = () => {
    showSpecializationYears(token, specialization_id)
      .then((response) => {
        setYears(response.data.data);
      })
      .catch((error: any) => {
        // ignore
        console.log(error.message);
      });
  };
  const navigation = useNavigation<any>();
  const Card = ({ id, name }: { id: number; name: any }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Chapter', {
          token: token,
          specialization_id: specialization_id,
          year: name,
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
          {name === 1
            ? 'السنة الأولى'
            : name === 2
              ? 'السنة الثانية'
              : name === 3
                ? 'السنة الثالثة'
                : name === 4
                  ? 'السنة الرابعة'
                  : name === 5
                    ? 'السنة الخامسة'
                    : `السنة رقم ${name}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList
      data={years}
      renderItem={({ item }) => <Card id={item.id} name={item.year} />}
      keyExtractor={(item: any) => item.id}
      style={{ marginTop: 15, marginHorizontal: 10 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}
