import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MapIcon, ChatIcon, HelpIcon, NotificationIcon, ProfileIcon } from '@/app/components/TabBarIcons';

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
        tabBarActiveTintColor: '#0B228C',
        tabBarInactiveTintColor: '#90C2FF',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#4694FD', '#3269E1']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 0 }}
          />
        ),
        tabBarItemStyle: {
          height: 60,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => <MapIcon color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ color, focused }) => <ChatIcon color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          tabBarIcon: ({ color, focused }) => <HelpIcon color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          tabBarIcon: ({ color, focused }) => <NotificationIcon color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="five"
        options={{
          tabBarIcon: ({ color, focused }) => <ProfileIcon color={color} focused={focused} />,
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
    paddingTop: 8,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        paddingBottom: 30,
      }
    }),
    overflow: 'visible'
  },
});
