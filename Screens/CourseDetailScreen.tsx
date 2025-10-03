import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoursePlayList from '../Components/CoursePlayList';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const screenHeigh = Dimensions.get('window').height;

export default function CourseDetailScreen() {
  const route = useRoute();
  const { item = null }: any = route.params || {};
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground source={{ uri: item.image }} style={styles.background}>
        <View style={styles.overlay}>
          <View>
            <View style={styles.background}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ flexDirection: 'row' }}>
                <Ionicons name="chevron-back" size={28} color="white" />
                <Text style={{ fontSize: 20, color: 'white' }}> رجوع </Text>
              </TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'center', marginTop: -70 }}>
                <Text style={{ fontSize: 40, color: 'white', textAlign: 'right' }}>
                  {item.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flex: 1, height: 500, backgroundColor: 'red' }}>
        <Tab.Navigator
          initialRouteName="CourseLicture"
          style={{ flex: 1, backgroundColor: 'green', height: '100%' }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: 'blue' },
          }}>
          <Tab.Screen
            name="CoursePlay"
            options={{ tabBarLabel: 'عملي' }}
            initialParams={{
              data: item.practical,
              isSubscribed: true,
            }}
            component={CoursePlayList}
          />
          <Tab.Screen
            name="CourseLicture"
            options={{ tabBarLabel: 'نظري' }}
            initialParams={{
              data: item.theoretical || [],
              isSubscribed: true,
            }}
            component={CoursePlayList}
          />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  background: {
    height: screenHeigh * 0.3,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adds a semi-transparent overlay
    padding: 15,
    width: '100%',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#303030',
    height: APPBAR_HEIGHT,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
