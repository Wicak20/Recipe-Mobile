import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashView from '../views/Home/SplashView';
import LoginView from '../views/Auth/LoginView';
import RegisterView from '../views/Auth/RegisterView';
import HomeView from '../views/Home/HomeView';
import ForgetView from '../views/Auth/ForgetView';
import AddView from '../views/Recipe/addView';
import MyRecipeView from '../views/Recipe/myRecipeView';
import ProfileView from '../views/Profile/ProfileView';
import SearchView from '../views/Recipe/searchView';
import PopularView from '../views/Recipe/popularView';
import DetailView from '../views/Recipe/detailView';
import EditView from '../views/Recipe/editView';
import EditProfileView from '../views/Profile/editProfileView';
import CategoryView from '../views/Recipe/categoryView';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddRecipe"
        component={AddView}
        options={{
          tabBarLabel: 'Add Menu',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyMenu"
        component={MyRecipeView}
        options={{
          tabBarLabel: 'My Menu',
          tabBarButton: () => null,
          tabBarVisible: true,
        }}
      />
      <Tab.Screen
        name="Popular"
        component={PopularView}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchView}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={DetailView}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: true,
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryView}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfileView}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: true,
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditView}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: true,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export default function MainNavigator() {
  const auth = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Auth Group */}
        {auth.data == null ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginView}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterView}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Splash"
              component={SplashView}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Forget"
              component={ForgetView}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
        {/* Main Group */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
