import { useVideoPlayer, VideoView } from 'expo-video';
import { Text } from 'react-native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { getUrl } from 'router/data';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
export default function ShowCourseVideo({ route }: any) {
  const { videoName = null, token = null } = route.params || {};
  const videoSource = {
    uri: getUrl() + 'video/' + videoName,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <>
      {isTablet ? (
        <View>
          <Text>This app is not designed for tablets.</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <VideoView
            style={styles.video}
            player={player}
            fullscreenOptions={{ enabled: true }}
            allowsPictureInPicture
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: 275,
  },
  controlsContainer: {
    // padding: 10,
  },
});
