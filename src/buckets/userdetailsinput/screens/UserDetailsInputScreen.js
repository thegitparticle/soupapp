import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Appearance,
  Keyboard,
  Linking,
  Pressable,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import {AddMyProfileDetails} from '../../../redux/appcore/MyProfileActions';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SquircleButton from '../../../bits/SquircleButton';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Bounceable} from 'rn-bounceable';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import FormData from 'form-data';
import {Amplitude} from '@amplitude/react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function UserDetailsInputScreen({route, dispatch, navigation}) {
  const [username, setUsername] = useState('');
  const [renderInputBody, setRenderInputBody] = useState(true);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function SetUserDetailsToServer() {
    const data = new FormData();

    data.append(
      'wallet_address',
      state_here.WDeetsReducer.wdeets.wallet_address,
    );
    data.append('username', username);
    data.append('wallet_profile.erc20_token_holdings', '');
    data.append('wallet_profile.eth_balance', '');
    data.append('wallet_profile.portfolio_value', '');

    const config = {
      method: 'post',
      url: 'https://suprblack.xyz/api/users/register/',
      headers: {
        ...data.getHeaders,
      },
      data: data,
    };

    axios(config)
      .then(res => {
        Keyboard.dismiss();
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
        navigation.navigate('SettingUpAppScreen');
      })
      .catch(error => {
        console.log(error);
        ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
        showMessage({
          message: 'username already in use, try another',
          type: 'error',
          backgroundColor: themeHere.colors.danger_red,
        });
      });
  }

  function SaveButton() {
    if (renderInputBody) {
      return (
        <View
          style={{
            marginBottom: windowHeight * 0.1,
            marginTop: windowHeight * 0.05,
          }}>
          <Bounceable
            style={{
              marginVertical: windowHeight * 0.1,
            }}
            onPress={() => {
              setRenderInputBody(false);
              Amplitude.getInstance().logEvent(
                'SET_USERNAME_NEW_USER_API_CALL_BUTTON_CLICKED',
              );
              SetUserDetailsToServer();
            }}>
            <SquircleButton
              buttonColor={'#282828'}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'save'}
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
            />
          </Bounceable>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginVertical: windowHeight * 0.1,
          }}>
          <Bounceable
            style={{
              marginVertical: windowHeight * 0.1,
            }}>
            <SquircleButton
              buttonColor={'#28282825'}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'saving username ...'}
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
            />
          </Bounceable>
        </View>
      );
    }
  }

  function handleUserNameTyping(value) {
    setUsername(value.replace(/\s/g, ''));
  }

  function RenderBody() {
    return (
      <View style={styles.input_wallet_button_view}>
        <View style={styles.input_wrap_view}>
          <TextInput
            style={styles.username_text_input}
            onChangeText={handleUserNameTyping}
            value={username}
            multiline={true}
            autoFocus={true}
            textAlign={'center'}
            placeholder={'type username'}
            placeholderTextColor={'#FFFFFF50'}
          />
        </View>
        <Text style={styles.acknowledge_text}>
          By tapping the Next button below, you acknowledge that you have read
          the Privacy Policy{' '}
          <Pressable
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/ayespaces/Privacy-Policy-b2f432d16d88458281babd62457df2b4',
              )
            }>
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'GothamRounded-Book',
                color: '#008DFF',
              }}>
              Privacy Policy
            </Text>
          </Pressable>{' '}
          and agree to the{' '}
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/ayespaces/Terms-of-Service-93d01782de4042708a5c10decaa1484c',
              )
            }>
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'GothamRounded-Book',
                color: '#008DFF',
                alignSelf: 'center',
              }}>
              Terms of Service
            </Text>
          </Pressable>
          .
        </Text>
        <SaveButton />
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#050505', '#1F1F1F']}
        style={styles.gradient_background}>
        <TouchableOpacity>
          <Text style={styles.screen_header_text}>PICK A USERNAME</Text>
        </TouchableOpacity>
        <RenderBody />
      </LinearGradient>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(UserDetailsInputScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  overlay_gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waiting_text_showcase_view: {
    width: windowWidth * 0.8,
    alignItems: 'center',
  },
  input_wallet_button_view: {
    width: windowWidth,
    alignItems: 'center',
  },
  input_wrap_view: {
    backgroundColor: 'transparent',
    width: windowWidth,
    alignItems: 'center',
    marginVertical: windowHeight * 0.075,
  },
  screen_header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: windowHeight * 0.1,
  },
  username_text_input: {
    backgroundColor: 'transparent',
    maxWidth: windowWidth * 0.7,
    color: 'white',
  },
  acknowledge_text: {
    fontSize: 11,
    fontFamily: 'GothamRounded-Book',
    color: '#FFFFFF50',
    width: windowWidth * 0.8,
  },
});
