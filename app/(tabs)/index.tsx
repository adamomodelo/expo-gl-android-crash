import { GLView } from 'expo-gl';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Text style={{ color: '#fff', padding: 20 }}>
        If you see green below, expo-gl works.
      </Text>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={(gl) => {
          // Simple green screen - most minimal GL code possible
          gl.clearColor(0, 1, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.flush();
          gl.endFrameEXP();
        }}
      />
    </View>
  );
}
