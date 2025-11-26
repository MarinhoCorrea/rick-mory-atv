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
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="CharactersList"
          component={CharactersListScreen}
          options={listScreenOptions}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
          options={detailScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#1a1a2e'
  },
  headerTintColor: '#97ce4c',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: '#00d9ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8
  }
};

const listScreenOptions = {
  title: '🛸 Rick and Morty'
};

const detailScreenOptions = {
  title: '👽 Detalhes'
};