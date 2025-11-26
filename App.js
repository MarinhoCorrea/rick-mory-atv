import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersListScreen from './src/CharactersListScreen';
import CharacterDetailScreen from './src/CharacterDetailScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CharactersList"
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Stack.Screen
          name="CharactersList"
          component={CharactersListScreen}
          options={{ title: 'Rick and Morty' }}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
          options={{ title: 'Rick and Morty' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
