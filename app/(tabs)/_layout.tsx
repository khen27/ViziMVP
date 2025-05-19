import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MapIcon, ChatIcon, HelpIcon, NotificationIcon, ProfileIcon } from '@/app/components/TabBarIcons';

// Get screen dimensions
const { width } = Dimensions.get('window');

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// This component adds padding to the bottom of each screen to avoid overlap with the tab bar
function TabBarSpacer() {
  return <View style={{ height: 80 }} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#90C2FF',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <View style={{ height: '100%', width: '100%' }}>
            <LinearGradient
              colors={['#7389EC', '#4694FD']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.homeIndicator} />
          </View>
        ),
        tabBarItemStyle: styles.tabBarItem
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <MapIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <ChatIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <HelpIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <NotificationIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="five"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <ProfileIcon color={color} focused={focused} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 0,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  tabBarItem: {
    height: 60,
    width: 60,
    marginHorizontal: 8,
    // No background color when active/focused
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
  }
});
