
### 认识 React Native
传统开发的痛点，人员稀缺、开发成本高、代码复用率低、无法动态更新
RN 优点，跨平台、低投入高回报、代码复用率高、性能高、支持动态更新

### 使用 React Native Cli 
Android Studio 或 Xcode 开发

* nvm 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

* node
nvm install node ,或者 brew install node

* watchman
brew install watchman   监视文件系统变更的工具。可以提高开发时的性能（packager 可以快速捕捉文件的变化从而实现实时刷新）

* jdk
brew tap AdoptOpenJDK/openjdk  
brew cask install adoptopenjdk8

* yarn
npm i -g yarn
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global


* Android Studio
Download and install Android Studio.

Choose a "Custom" setup 
Android SDK
Android SDK Platform
Performance (Intel ® HAXM) (See here for AMD)
Android Virtual Device

Install the Android SDK
Android 9 (Pie) SDK
Android SDK Platform 28
Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
SDK Tools, make sure that 28.0.3 is selected.

Configure the ANDROID_HOME environment variable
```js
// $HOME/.bash_profile or $HOME/.bashrc 
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
source $HOME/.bash_profile,   load the config into your current shell
echo $PATH,  Verify that ANDROID_HOME has been added to your path 


* react native cli
npm i -g react-native-cli

* Creating a new application
react-native init simple

* Preparing the Android device
Using a virtual device
use Android Studio to open ./AwesomeProject/android

create a new AVD. 
Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Pie API Level 28 image.

* Run
react-native run-ios
react-native run-android

### 布局  FleBox 弹性框
* 在React Native中尺寸是没有单位的，它代表了设备独立像素
在Android上时，View的长和宽被解释成：100dp 100dp单位是dp，字体被解释成16sp 单位是sp，运行在iOS上时尺寸单位被解释称了pt，这些单位确保了在任何不同dpi的手机屏幕上显示不会发生改变。

* React Native中的FlexBox 和Web CSS上FlexBox的不同之处
flexDirection: React Native中flexDirection:'column' 对应 Web CSS 的 flex-direction:'row'
alignItems: React Native中alignItems:'stretch' 对应 Web CSS 的align-items:'flex-start'
flex: 相比 Web CSS 的 flex 接受多参数，如:flex: 2 2 10%;，但在 React Native 中 flex 只接受一个参数


* 父视图属性(容器属性)
flexDirection enum('row', 'column','row-reverse','column-reverse')
flexWrap enum('wrap', 'nowrap')
justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
alignItems enum('flex-start', 'flex-end', 'center', 'stretch')

* 子视图属性
alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')
flex number


### createStackNavigator
yarn add react-navigation-stack
yarn add react-native-gesture-handler
yarn add react-native-reanimated 
yarn add react-native-screens@^1.0.0-alpha.23

```js
// To finalize installation of react-native-screens for Android, add the following two lines to dependencies section in: 
// android/app/build.gradle
implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'


// To finalize installation of react-native-gesture-handler for Android, make the following modifications to:
// android/app/src/main/java/com/simple/MainActivity.java
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```


### 项目搭建
```js
// index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


// App.js
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```




### FQA
* installing required CocoaPods dependencies
cd ./simple/ios && pod install

* Enable Live Reload vs Enable Hot Reloading
Enable Live Reload : 修改代码保存后，app自动Reload代码，app会回到A页面，并且app上所有的状态都丢失。
Enable Hot Reloading:修改代码保存后，app自动Reload代码，app还是在C页面，并且app上所有的状态都保留。

* Errors and Warnings
console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: ...']

* 通过 Chrome调试React Native程序
在Developer Menu下单击"Debug JS Remotely" 启动JS远程调试功能。此时Chrome会被打开，同时会创建一个“http://localhost:8081/debugger-ui.” 
打开Chrome开发者工具, Command⌘ + Option⌥ + I on Mac

* 真机调试
在iOS上
打开"RCTWebSocketExecutor.m "文件，将“localhost”改为你的电脑的ip，然后在Developer Menu下单击"Debug JS Remotely" 启动JS远程调试功能

在Android上
方式一：在Android5.0以上设备上，将手机通过usb连接到你的电脑，然后通过adb命令行工具运行如下命令来设置端口转发。
      adb reverse tcp:8081 tcp:8081
方式二：你也可以通过在“Developer Menu”下的“Dev Settings”中设置你的电脑ip来进行调试。


* rcteventemitter is not a registered callable module
react-native start --reset-cache
sudo lsof -i :8081 , 或者 ps aux | grep node
kill -9 {PID}

