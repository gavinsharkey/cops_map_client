import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/rootReducer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import IncidentScreen from './screens/IncidentScreen';

const store = createStore(reducer, applyMiddleware(thunk))

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="Incident" component={IncidentScreen} options={{
            headerStyle: {
              backgroundColor: '#243447'
            },
            headerTitleStyle: {
              color: '#fff'
            }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
