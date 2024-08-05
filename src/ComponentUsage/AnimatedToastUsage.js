import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AnimatedToast from '../Components/AnimatedToast';

const AnimatedToastUsage = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000); // Same duration as the toast animation
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderColor: 'blue',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          showToast();
        }}>
        <Text style={{color: 'blue'}}>Show Animated Toast</Text>
      </TouchableOpacity>
      <AnimatedToast
        message="This is a custom animated toast!"
        visible={toastVisible}
        type={'SUCCESS'}
      />
    </View>
  );
};

export default AnimatedToastUsage;
