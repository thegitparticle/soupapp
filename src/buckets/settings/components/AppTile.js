import React from "react";
import { Appearance, Dimensions, Linking, TouchableOpacity } from "react-native";
import { Image, Text, View } from "dripsy";
import { ButterThemeDark, ButterThemeLight } from "../../../theme/ButterTheme";
import Iconly from "../../../miscsetups/customfonts/Iconly";
import { connect } from "react-redux";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AppTile() {
  function NotificationsChange() {
    // https://stackoverflow.com/questions/44582694/react-native-open-settings-through-linking-openurl-in-ios
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL('app-settings://notification/soupapp')}>
        <View
          sx={{
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          variant="layout.sub_view_50_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              variant="images.small_icon_25_round"
              source={require('../../../../assets/notification_icon.png')}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'foreground'}}>
              Notifications
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      sx={{
        backgroundColor: 'off_background',
        borderRadius: 15,
        marginBottom: '$6',
        alignItems: 'center',
      }}
      variant="layout.sub_view_20_margin">
      <Text
        variant="subhead_medium"
        sx={{
          paddingVertical: '$5',
          color: 'foreground',
          opacity: 0.25,
        }}>
        APP
      </Text>
      <NotificationsChange />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(AppTile);
