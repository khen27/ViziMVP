import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View, Platform, Dimensions, Text } from 'react-native';
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
  
  // Custom tab bar that ensures perfect spacing
  function CustomTabBar({ state, descriptors, navigation }: any) {
    return (
      <View style={styles.customTabBarContainer}>
        <LinearGradient
          colors={['#7389EC', '#4694FD']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={styles.homeIndicator} />
        
        <View style={styles.iconsContainer}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            // Custom icon rendering based on route name
            let icon;
            const color = isFocused ? '#FFFFFF' : '#90C2FF';
            
            if (route.name === 'index') {
              icon = <MapIcon color={color} focused={isFocused} />;
            } else if (route.name === 'two') {
              icon = <ChatIcon color={color} focused={isFocused} />;
            } else if (route.name === 'three') {
              icon = <HelpIcon color={color} focused={isFocused} />;
            } else if (route.name === 'four') {
              icon = <NotificationIcon color={color} focused={isFocused} />;
            } else if (route.name === 'five') {
              icon = <ProfileIcon color={color} focused={isFocused} />;
            }

            return (
              <Pressable
                key={index}
                style={styles.tabButton}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
              >
                {icon}
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="two" />
      <Tabs.Screen name="three" />
      <Tabs.Screen name="four" />
      <Tabs.Screen name="five" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  customTabBarContainer: {
    height: 80,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  iconsContainer: {
    flexDirection: 'row',
    height: '100%',
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    paddingTop: 5,
  },
  tabButton: {
    flex: 1,
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
    zIndex: 1,
  }
});
