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

class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: {
      screen: ProfileScreen,
      path: 'people/:name',
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.name} profile`,
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
