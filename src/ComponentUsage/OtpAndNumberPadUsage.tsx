import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../utils/NavigationUtil';
import CustomOTPInput from '../Components/CustomOTPInput';
import {FONTS} from '../constants/Fonts';
import CustomText from '../Components/CustomText';
import CustomSafeAreaView from '../Components/CustomSafeAreaView';
import CustomNumberPad from '../Components/CustomNumberPad';

const PinScreen = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [otpError, setOtpError] = useState<string | null>(null);
  const handlePressNumber = (number: number | string) => {
    if (focusedIndex < otpValues.length) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex] = number.toString();
      setOtpError(null);
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex + 1);
    }
  };

  const handlePressBackspace = () => {
    if (focusedIndex > 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex - 1] = '';
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex - 1);
    }
  };

  const handlePressCheckmark = () => {
    let valid = false;
    const isNotEmpty = otpValues.map(i => {
      if (i == '') {
        valid = true;
        setOtpError('Enter all PIN');
      }
    });

    //for confirmation otp input screen
    // if (otpValues.toString() != route.params.pin) {
    //   valid = true;
    //   setOtpValues(["", "", "", ""]);
    //   setFocusedIndex(0);
    //   setOtpError("PIN not matching");
    // }
    if (!valid) {
      navigate('ConfirmPinScreen', {
        pin: otpValues.toString(),
      });
    }
  };

  return (
    <CustomSafeAreaView>
      <CustomText
        variant="h5"
        fontFamily={FONTS.Medium}
        style={styles.mainContainer}>
        Set up Your PIN
      </CustomText>
      <CustomText style={styles.subText}>
        To keep your Pin secure, we'll ask for this PIN every time you open the
        app
      </CustomText>
      <CustomOTPInput
        otpValues={otpValues}
        error={otpError}
        focusedIndex={focusedIndex}
      />

      <CustomNumberPad
        onPressNumber={handlePressNumber}
        onPressBackspace={handlePressBackspace}
        onPressCheckmark={handlePressCheckmark}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  subText: {
    opacity: 0.8,
    fontSize: RFValue(9.5),
  },
});

export default PinScreen;
