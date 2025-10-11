import { useRoute } from '@react-navigation/native';
import CourseCard from 'Components/CourseCard';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { showYearCourses } from 'router/data';

export default function YearCoursesScreen() {
  const route = useRoute();
  const [courses, setCourses] = useState([]);

  const {
    token = null,
    specialization_id = null,
    chapter = null,
    year = null,
  } = (route as any).params || {};

  useEffect(() => {
    getCourses();
  }, [token]);

  const getCourses = () => {
    showYearCourses(token, chapter, year, specialization_id)
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error: any) => {
        // ignore
        console.log(error.message);
      });
  };

  return (
    <View style={{ marginTop: 30 }}>
      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseCard data={item} />}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <View style={{ paddingTop: 100, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>لا يوجد محتوى هنا</Text>
          </View>
        )}
      />
    </View>
  );
}
