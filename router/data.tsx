import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const url = 'http://192.168.1.5:8888/api/';

export async function getUserData(): Promise<string | null> {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData !== null) {
      return JSON.parse(userData).token ?? null;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

// Auth
export function Login(data: any) {
  return axios.post(url + 'login', data);
}
export function SignUp(data: any) {
  return axios.post(url + 'signUp', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
// Collections
export function showCollections(token: any, page = 1, perPage = 3) {
  return axios.get(url + 'show_collections', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      perPage: perPage,
    },
    params: {
      page: page,
    },
  });
}
export function checkSubscribeCollection(token: any, collectionId: any) {
  return axios.get(url + 'check_subscribe_collection', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    params: {
      collectionId: collectionId,
    },
  });
}

// Course
export function showCourses(token: any, page = 1) {
  return axios.get(url + 'show_courses', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    params: {
      page: page,
    },
  });
}
export function showMyCourses(token: any) {
  return axios.get(url + 'show_user_courses', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}
export function SearchCourses(token: any, name: any) {
  return axios.get(url + 'search_course', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    params: {
      name: name,
    },
  });
}

export function coursesContain(token: any, courseId: any) {
  return axios.get(url + 'show_course_contain', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    params: {
      courseId: courseId,
    },
  });
}
export function ShowPdf(token: any, pdf: any) {
  return axios.get(url + 'pdf', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    params: {
      pdf: pdf,
    },
  });
}

export function ShowVideo(token: any, video: any) {
  return axios.get(url + 'video', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    params: {
      video: video,
    },
  });
}
export function showAboutCourse(token: any, courseId: any) {
  return axios.get(url + 'show_course_details', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    params: {
      courseId: courseId,
    },
  });
}
// Course Codes
export function subscribe(data: any, token: any) {
  return axios.post(url + 'add_user_code', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}
export function logout(token: any) {
  return axios.delete(url + 'logout', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}
