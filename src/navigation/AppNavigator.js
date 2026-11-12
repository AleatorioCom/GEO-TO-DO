import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: theme.primary,
      tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
      headerStyle: { backgroundColor: theme.surface },
      headerTintColor: theme.text
    }}>
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Configurações" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { mode, theme } = useTheme();
  const navigationTheme = mode === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={{
      ...navigationTheme,
      colors: {
        ...navigationTheme.colors,
        background: theme.background,
        card: theme.surface,
        text: theme.text,
        border: theme.border,
        primary: theme.primary
      }
    }}>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.background }
      }}>
        <Stack.Screen name="Principal" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Adicionar tarefa" component={AddTaskScreen} />
        <Stack.Screen name="Detalhes da tarefa" component={TaskDetailsScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Mapa' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
