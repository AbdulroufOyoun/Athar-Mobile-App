import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showSpecialization } from 'router/data';

export default function SpecializationScreen() {
  const route = useRoute();
  const { token = null, university_id = null } = (route as any).params || {};

  const [specializations, setSpeclizations] = useState<any>([]);
  useEffect(() => {
    getCourses();
  }, []);
  const getCourses = () => {
    showSpecialization(token, university_id)
      .then((response) => {
        setSpeclizations(response.data.data);
      })
      .catch((error: any) => {
        // ignore
        console.log(error.message);
      });
  };

  const navigation = useNavigation<any>();
  const Card = ({ id, name }: { id: number; name: string }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Years', {
          token: token,
          specialization_id: id,
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
      data={specializations}
      renderItem={({ item }) => <Card id={item.id} name={item.name} />}
      keyExtractor={(item: any) => item.id}
      style={{ marginTop: 15, marginHorizontal: 10 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}
