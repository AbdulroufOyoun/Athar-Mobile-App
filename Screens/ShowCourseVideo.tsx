// import { useEffect, useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Video } from 'expo-av';
// import { ShowVideo } from '../router/data';

// export default async function ShowCourseVideo({ route }) {
//     const { videoName = null, token = null } = route.params || {};

//     // useEffect(() => {
//     //     initializePlayer();
//     // }, []);

//     const initializePlayer = async () => {
//         try {
//             const response = await ShowVideo(token, videoName);
//             console.log('Video URL:', response.data);
//             setPlayer(response.data); // Update the state with the video URL
//         } catch (error) {
//             console.error("Error fetching data: ", error);
//         }
//     };

//     // const getVideoUrl = async () => {
//     //     const response = await fetch('https://your-api.com/get-video-url', {
//     //         headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` }
//     //     });
//     //     const data = await response.json();
//     //     return data.videoUrl; // API should return the correct video URL
//     // };

//     // // Then use it inside `expo-video`
//     // const videoUrl = await getVideoUrl();

//     return (
//         <View style={styles.container}>
//             <Video
//                 source={{ uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }}
//                 useNativeControls
//                 resizeMode="contain"
//                 shouldPlay
//                 isLooping
//                 style={styles.video}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' },
//     video: { width: '100%', height: 300 },
//     loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

// import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';

export default function ShowCourseVideo({ route }: any) {
  const { videoName = null, token = null } = route.params || {};
  const videoSource = {
    uri: 'http://192.168.1.3:8888/api/video?video=41480457012Iron Man.m3u8',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 50,
    backgroundColor: 'gray',
  },
  video: {
    width: '100%',
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
