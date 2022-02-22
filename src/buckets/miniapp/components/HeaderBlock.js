import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS, runOnUI, useDerivedValue} from 'react-native-reanimated';
import GestureRecognizer from 'react-native-swipe-gestures';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;
const statusBarHeight = getStatusBarHeight();

function HeaderBlock({app_details}) {
  const navigation = useNavigation();

  function ButtonsSubBlock() {
    return (
      <View style={styles.buttons_subblock_view}>
        <Pressable style={styles.close_icon_view}>
          <Iconly
            name="CloseSquareBold"
            color={themeHere.colors.icon + '00'}
            size={30}
          />
        </Pressable>
        <Pressable
          style={styles.close_icon_view}
          onPress={() => navigation.goBack()}>
          <Iconly
            name="CloseSquareBold"
            color={themeHere.colors.icon}
            size={30}
          />
        </Pressable>
      </View>
    );
  }

  function TitleSubBlock() {
    return (
      <LinearGradient
        colors={[
          themeHere.colors.background + '00',
          themeHere.colors.background,
        ]}
        style={styles.title_subblock_view}>
        <View style={styles.title_subblock_items_wrap_view}>
          <Text style={styles.app_name_text}>{app_details.name}</Text>
          <Text style={styles.app_description_text}>
            {app_details.extra_message}
          </Text>
        </View>
      </LinearGradient>
    );
  }

  const onSwipeDown = gestureState => {
    console.log('You swiped down!');
    navigation.goBack();
  };

  const onSwipeRight = gestureState => {
    console.log('You swiped left!');
    navigation.goBack();
  };

  const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 50,
  };

  return (
    <View style={styles.parent_view}>
      <GestureRecognizer
        onSwipeRight={state => onSwipeRight(state)}
        onSwipeDown={state => onSwipeDown(state)}
        config={config}>
        <FastImage
          style={styles.cover_image}
          source={{
            uri: app_details.dapp_icon,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <TitleSubBlock />
        </FastImage>
      </GestureRecognizer>
    </View>
  );
}

export default HeaderBlock;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    width: windowWidth,
    height: 300,
    top: 0,
  },
  cover_image: {
    width: windowWidth,
    height: 300,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttons_subblock_view: {
    width: windowWidth - 20,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: statusBarHeight,
  },
  close_icon_view: {
    // backgroundColor: themeHere.colors.icon_background,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title_subblock_view: {
    width: windowWidth,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title_subblock_items_wrap_view: {
    width: windowWidth - 40,
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 30,
  },
  app_name_text: {
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    marginVertical: 10,
    textAlign: 'center',
  },
  app_description_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 10,
    textAlign: 'center',
  },
});
