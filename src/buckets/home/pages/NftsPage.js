import React from "react";
import { Appearance, Dimensions, StyleSheet, Text, View } from "react-native";
import { ButterThemeDark, ButterThemeLight } from "../../../../../../Desktop/soupapp/src/theme/ButterTheme";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function NftsPage() {
  return (
    <View style={styles.parent_view}>
      <Text>Nfts page</Text>
    </View>
  );
}

export default NftsPage;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
