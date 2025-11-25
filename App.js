import CharactersList from './src/screens/CharactersList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharactersList">
        <Stack.Screen name="CharactersList" component={CharactersList} options={{ title: 'Characters' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
