import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type EmagovradinProps = {
  style?: StyleProp<ViewStyle>;
};

export const BlupinkShacleNoter: React.FC<EmagovradinProps> = ({ style }) => (
  <LinearGradient
    start={{ x: 0, y: 0.5 }}
    style={[
      {
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
      style,
    ]}
    colors={['#FA29F9', '#080399']}
    end={{ x: 1, y: 0.5 }}
  />
);
