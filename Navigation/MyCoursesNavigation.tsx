import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyCoursesScreen from '../Screens/MyCoursesScreen';
import CourseDetailScreen from '../Screens/CourseDetailScreen';

const Stack = createNativeStackNavigator();

export default function MyCoursesNavigation() {
  return (
    <Stack.Navigator initialRouteName="MyHome">
      <Stack.Screen name="MyHome" component={MyCoursesScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="CoursePlayList"
        component={CourseDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
