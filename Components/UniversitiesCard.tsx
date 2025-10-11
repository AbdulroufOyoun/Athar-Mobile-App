import { View, Text, TouchableWithoutFeedback } from 'react-native';

type NewsProps = {
  id: string;
  name: string;
  token: any;
  navigation: any;
};

const UniversitiesCard = ({ id, name, navigation, token }: NewsProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Years', {
          token: token,
          university_id: id,
        });
      }}>
      <View className="m-2  rounded-lg bg-white p-4 shadow">
        <Text className="text-text-dark text-lg">{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UniversitiesCard;
