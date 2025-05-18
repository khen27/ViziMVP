import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { View, Text } from 'react-native';

interface TabIconProps {
  color: string;
  focused: boolean;
}

export const MapIcon = ({ color, focused }: TabIconProps) => {
  const strokeColor = focused ? '#0B228C' : '#90C2FF';
  
  return (
    <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <Path 
        d="M18.6716 36.4283C18.6716 38.645 20.2466 39.555 22.16 38.4583L24.9016 36.895C25.4966 36.5567 26.4883 36.5217 27.1066 36.8367L33.2316 39.905C33.85 40.2083 34.8416 40.185 35.4366 39.8467L40.4883 36.9533C41.13 36.58 41.6666 35.67 41.6666 34.9233V23.5717C41.6666 21.355 40.0916 20.445 38.1783 21.5417L35.4366 23.105C34.8416 23.4433 33.85 23.4783 33.2316 23.1633L27.1066 20.1067C26.4883 19.8033 25.4966 19.8267 24.9016 20.165L19.85 23.0583C19.1966 23.4317 18.6716 24.3417 18.6716 25.0767V36.4283Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M25.9867 20.6667V35.8334" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M34.3516 23.7234V39.3334" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ChatIcon = ({ color, focused }: TabIconProps) => {
  const strokeColor = focused ? '#0B228C' : '#90C2FF';
  
  return (
    <View>
      <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <Path 
          d="M96.0833 38.1666C91.4167 38.1666 89.0833 37 89.0833 31.1666V25.3333C89.0833 20.6666 91.4167 18.3333 96.0833 18.3333H105.417C110.083 18.3333 112.417 20.6666 112.417 25.3333V31.1666C112.417 35.8333 110.083 38.1666 105.417 38.1666H104.833C104.472 38.1666 104.122 38.3416 103.9 38.6333L102.15 40.9666C101.38 41.9933 100.12 41.9933 99.35 40.9666L97.6 38.6333C97.4133 38.3766 96.9817 38.1666 96.6667 38.1666H96.0833Z" 
          stroke={strokeColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          transform="translate(-79, 0)"
        />
        <Path 
          d="M94.9167 25.3333H106.583" 
          stroke={strokeColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          transform="translate(-79, 0)"
        />
        <Path 
          d="M94.9167 31.1667H101.917" 
          stroke={strokeColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          transform="translate(-79, 0)"
        />
      </Svg>
      <View style={{
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ 
          fontSize: 10, 
          fontWeight: 'bold', 
          color: 'black',
        }}>
          5
        </Text>
      </View>
    </View>
  );
};

export const HelpIcon = ({ color, focused }: TabIconProps) => {
  const strokeColor = focused ? '#FFFFFF' : '#90C2FF';
  const bgColor = focused ? '#0B228C' : 'transparent';
  
  return (
    <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <Circle cx="30" cy="30" r="24" fill={bgColor} />
      <Path 
        d="M177.333 37.5017H172.667L167.475 40.955C166.705 41.4683 165.667 40.92 165.667 39.9867V37.5017C162.167 37.5017 159.833 35.1684 159.833 31.6684V24.6683C159.833 21.1683 162.167 18.835 165.667 18.835H177.333C180.833 18.835 183.167 21.1683 183.167 24.6683V31.6684C183.167 35.1684 180.833 37.5017 177.333 37.5017Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="translate(-154, 0)"
      />
      <Path 
        d="M171.5 29.2533V29.0083C171.5 28.215 171.99 27.795 172.48 27.4567C172.958 27.13 173.437 26.71 173.437 25.94C173.437 24.8667 172.573 24.0033 171.5 24.0033C170.427 24.0033 169.563 24.8667 169.563 25.94" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="translate(-154, 0)"
      />
      <Path 
        d="M171.495 32.0416H171.505" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="translate(-154, 0)"
      />
    </Svg>
  );
};

export const NotificationIcon = ({ color, focused }: TabIconProps) => {
  const strokeColor = focused ? '#0B228C' : '#90C2FF';
  const bgColor = focused ? '#0B228C' : 'transparent';
  
  return (
    <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      {focused && <Circle cx="30" cy="30" r="24" fill={bgColor} />}
      <Path 
        d="M235.273 26.3949V29.7666C235.273 30.4782 234.97 31.5632 234.608 32.1699L233.267 34.3982C232.438 35.7749 233.01 37.3032 234.527 37.8166C239.555 39.4966 244.98 39.4966 250.008 37.8166C251.42 37.3499 252.038 35.6816 251.268 34.3982L249.927 32.1699C249.577 31.5632 249.273 30.4782 249.273 29.7666V26.3949C249.273 22.5449 246.123 19.3949 242.273 19.3949C238.412 19.3949 235.273 22.5332 235.273 26.3949Z" 
        stroke={focused ? '#FFFFFF' : strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round"
        transform="translate(-212, 0)"
      />
      <Path 
        d="M243.312 19.4999C242.192 19.3599 241.118 19.4416 240.115 19.7332C240.453 18.8699 241.293 18.2632 242.273 18.2632C243.253 18.2632 244.093 18.8699 244.432 19.7332C244.07 19.6282 243.697 19.5466 243.312 19.4999Z" 
        stroke={focused ? '#FFFFFF' : strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="translate(-212, 0)"
      />
      <Path 
        d="M245.773 38.2368C245.773 40.1618 244.198 41.7368 242.273 41.7368C241.317 41.7368 240.43 41.3401 239.8 40.7101C239.17 40.0801 238.773 39.1934 238.773 38.2368" 
        stroke={focused ? '#FFFFFF' : strokeColor}
        strokeWidth="1.5"
        transform="translate(-212, 0)"
      />
    </Svg>
  );
};

export const ProfileIcon = ({ color, focused }: TabIconProps) => {
  const strokeColor = focused ? '#0B228C' : '#90C2FF';
  const bgColor = focused ? '#0B228C' : 'transparent';
  
  return (
    <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      {focused && <Circle cx="30" cy="30" r="24" fill={bgColor} />}
      <Path 
        d="M312.86 30.91C310.807 30.84 309.173 29.16 309.173 27.095C309.173 24.9833 310.877 23.2683 313 23.2683C315.112 23.2683 316.827 24.9833 316.827 27.095C316.815 29.16 315.193 30.84 313.14 30.91C313.058 30.8983 312.953 30.8983 312.86 30.91Z" 
        stroke={focused ? '#FFFFFF' : strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="translate(-283, 0)"
      />
      <Path 
        d="M313 41.6667C309.967 41.6667 307.213 40.5117 305.137 38.6101C305.253 37.5134 305.953 36.4401 307.202 35.6001C310.398 33.4767 315.625 33.4767 318.798 35.6001C320.047 36.4401 320.747 37.5134 320.863 38.6101C318.787 40.5117 316.033 41.6667 313 41.6667Z" 
        stroke={focused ? '#FFFFFF' : strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="translate(-283, 0)"
      />
      <Path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M313 41.6666C306.557 41.6666 301.333 36.4433 301.333 30C301.333 23.5567 306.557 18.3333 313 18.3333C319.443 18.3333 324.667 23.5567 324.667 30C324.667 36.4433 319.443 41.6666 313 41.6666Z" 
        stroke={focused ? '#FFFFFF' : strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="translate(-283, 0)"
      />
    </Svg>
  );
}; 