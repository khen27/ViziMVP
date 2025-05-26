import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View, Platform, Dimensions, Text, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';
import { MapIcon, ChatIcon, HelpIcon, NotificationIcon, ProfileIcon } from '../../components/TabBarIcons';

// Get screen dimensions for precise positioning
const { width: screenWidth } = Dimensions.get('window');

// Calculate positions for each icon
const iconPositions = {
  firstIcon: screenWidth * 0.1,
  secondIcon: screenWidth * 0.3,
  thirdIcon: screenWidth * 0.5,
  fourthIcon: screenWidth * 0.7,
  fifthIcon: screenWidth * 0.9,
};

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

// Simple color scheme function to avoid the filename error
const getColorScheme = () => 'light';

export default function TabLayout() {
  // Use our simplified function
  const colorScheme = getColorScheme();
  
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

          // Get the correct position based on index
          const iconPosition = index === 0 ? iconPositions.firstIcon : 
                              index === 1 ? iconPositions.secondIcon :
                              index === 2 ? iconPositions.thirdIcon :
                              index === 3 ? iconPositions.fourthIcon :
                              iconPositions.fifthIcon;
          
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
              style={[
                styles.tabButton,
                {
                  position: 'absolute',
                  left: iconPosition - 30, // Center the 60px wide button on the position
                }
              ]}
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
    );
  }

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  customTabBarContainer: {
    height: 80,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 10, // Keep navbar raised
    left: 0,
    right: 0,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
});
