# expo-gl Android Crash Reproduction

Minimal reproduction for expo-gl crash on Android.

## Bug Summary

`expo-gl` crashes with SIGSEGV on Android before `onContextCreate` is ever called. The crash occurs in native code (`ensurePrototypes`) with a null pointer dereference.

## Environment

- Expo SDK: 54.0.31
- expo-gl: 16.0.9
- Android: Tested on physical device and emulator
- Architecture: Crashes on **both** New Architecture and Legacy Architecture

## Steps to Reproduce

```bash
npm install
npx expo prebuild -p android --clean
npx expo run:android
```

## Expected Behavior

Green screen should appear (GLView renders successfully).

## Actual Behavior

App crashes immediately with native SIGSEGV.

## Crash Log

```
Fatal signal 11 (SIGSEGV), code 1 (SEGV_MAPERR), fault addr 0x0 in tid (mqt_js)

Backtrace:
#03 libexpo-gl.so (expo::gl_cpp::ensurePrototypes(facebook::jsi::Runtime&)+124)
#04 libexpo-gl.so (createWebGLRenderer)
#05 libexpo-gl.so (EXGLContext::prepareContext)
```

## Key Observations

1. Crash happens **before** `onContextCreate` callback is invoked
2. Crash occurs in `ensurePrototypes()` - null pointer dereference
3. Happens with both `newArchEnabled: true` and `newArchEnabled: false`
4. iOS works perfectly with the same code
5. No third-party libraries involved - pure expo-gl

## Minimal Code

```tsx
import { GLView } from 'expo-gl';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={(gl) => {
          gl.clearColor(0, 1, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.flush();
          gl.endFrameEXP();
        }}
      />
    </View>
  );
}
```
