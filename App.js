import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => {
            navigation.navigate('Detail', {
              itemId: 3,
              otherParam: 'something else',
            });
          }}
          title="Go Details"
        />
      </View>
    );
  }
}

class DetailsScreen extends Component {
  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParams('itemId', 'No-Id');
    const otherParam = navigation.state.params(
      'otherParam',
      'some default value',
    );
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Text>Item Id: {JSON.stringify(itemId)}</Text>
        <Text>Other param: {JSON.stringify(otherParam)}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
        <Button
          title="Go Details again"
          onPress={() =>
            navigation.push('Detail', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
      </View>
    );
  }
}

class UserScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <logoTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParams('increaseCount')}
          title="+1"
          color="#fff"
        />
      ),
    };
  };

  state = {
    count: 0,
  };

  componentWillMount() {
    this.props.navigation.setParams({increaseCount: this._increaseCount});
  }

  _increaseCount = () => {
    this.setState({count: this.state.count + 1});
  };
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: {
      screen: DetailsScreen,
      path: 'detail/:name',
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.name} Detail`,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
    },
    navigationOptions: {
      tabBarLable: 'Home',
    },
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

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
