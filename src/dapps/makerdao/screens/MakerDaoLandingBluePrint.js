import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MakerDaoLandingBluePrint() {
  const products = [
    {
      id: 1,
      product_name: 'Leverage Up ETH',
      component: 'LeverageEthProduct',
    },
    {
      id: 2,
      product_name: 'Borrow Stablecoin DAI',
      component: 'BorrowDaiProduct',
    },
  ];

  return (
    <View style={styles.parent_view}>
      <Text style={{color: 'white'}}>blueprint</Text>
    </View>
  );
}

export default MakerDaoLandingBluePrint;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
