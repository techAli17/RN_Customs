import {StyleSheet, Animated, ViewStyle} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import CustomText from './CustomText';
import TouchableRipple from 'react-native-material-ripple';
import {FONTS} from '../constants/Fonts';
import {Colors as colorw} from '../constants/Colors';

interface CustomButtonProps {
  text: string;
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const CustomAnimatedButton: FC<CustomButtonProps> = ({
  text,
  loading,
  disabled,
  onPress,
  style,
}) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) {
      animatedValue.setValue(0);
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      animatedValue.stopAnimation();
    }
  }, [loading]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 500],
  });

  return (
    <TouchableRipple
      disabled={disabled}
      onPress={onPress}
      rippleColor="#fff"
      style={[
        styles.btn,
        {
          backgroundColor: loading || disabled ? '#DFDFDF' : colorw.profit,
        },
        style,
      ]}>
      <CustomText fontFamily={FONTS.Bold} variant="h6" style={{color: 'white'}}>
        {text}
      </CustomText>
      {loading && (
        <Animated.View
          style={[
            styles.loadingIndicator,
            {
              transform: [{translateX}],
            },
          ]}
        />
      )}
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 14,
    width: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 2,
    backgroundColor: colorw.profit,
    width: '100%',
  },
});

export default CustomAnimatedButton;
