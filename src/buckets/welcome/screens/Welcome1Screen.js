import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Appearance,
} from 'react-native';
import {LOGIN, LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SquircleButton from '../../../bits/SquircleButton';
import window from '@react-navigation/native/src/__mocks__/window';
import IntroTextsAnimation from '../components/IntroTextsAnimation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import BackgroundNftsAnimation from '../components/BackgroundNftsAnimation';
import Spacer from '../../../bits/Spacer';
import {Bounceable} from 'rn-bounceable';
import {Amplitude} from '@amplitude/react-native';
import SquircleGlassButton from '../../../bits/SquircleGlassButton';
import {BlurView} from '@react-native-community/blur';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;
const statusBarHeight = getStatusBarHeight();

function Welcome1Screen({dispatch, navigation}) {
  const buttonOpacity = useSharedValue(0);
  const introTextsOpacity = useSharedValue(1);
  const skipOpacity = useSharedValue(1);

  const animatedButton = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const animatedIntroTexts = useAnimatedStyle(() => {
    return {
      opacity: introTextsOpacity.value,
    };
  });

  const animatedSkipButton = useAnimatedStyle(() => {
    return {
      opacity: skipOpacity.value,
      width: windowWidth,
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginVertical: statusBarHeight + 20,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      buttonOpacity.value = withTiming(1);
    }, 7500);
  });

  const skipStory = () => {
    buttonOpacity.value = withTiming(1);
    introTextsOpacity.value = withSpring(0);
    skipOpacity.value = withSpring(0);
  };

  function SkipButton() {
    return (
      <Animated.View style={[animatedSkipButton]}>
        <Bounceable onPress={() => skipStory()}>
          <BlurView
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
            style={{
              width: 60,
              height: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                ...themeHere.text.body_medium,
                color: 'white',
                alignSelf: 'center',
              }}>
              Skip
            </Text>
          </BlurView>
        </Bounceable>
      </Animated.View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/space_bg_1.jpeg')}
        style={styles.background_image}>
        <View style={styles.bottom_block}>
          <View>
            <BackgroundNftsAnimation />
          </View>
          <View>
            <Animated.View style={[animatedIntroTexts]}>
              <IntroTextsAnimation />
            </Animated.View>
            <Animated.View style={[animatedButton]}>
              <View
                style={{
                  marginVertical: windowHeight * 0.1,
                  alignSelf: 'center',
                }}>
                <Bounceable
                  onPress={() => {
                    navigation.navigate('WalletSetupOptionsScreen');
                    Amplitude.getInstance().logEvent(
                      'LFG_WELCOME_BUTTON_CLICKED',
                    );
                  }}>
                  <SquircleGlassButton
                    buttonColor={themeHere.colors.light}
                    width={windowWidth * 0.7}
                    height={50}
                    buttonText={'LFG! 🚀'}
                    font={themeHere.text.title_3}
                    textColor={themeHere.colors.red}
                  />
                </Bounceable>
              </View>
            </Animated.View>
          </View>
        </View>
        <SkipButton />
      </ImageBackground>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGIN});
    },
  };
};

export default connect(mapDispatchToProps)(Welcome1Screen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  background_image: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  bottom_block: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
