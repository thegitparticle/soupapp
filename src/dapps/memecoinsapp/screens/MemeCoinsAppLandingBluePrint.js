import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import LeverageEthProduct from '../../makerdao/products/leverageeth/LeverageEthProduct';
import Carousel from 'react-native-snap-carousel';
import {SquircleView} from 'react-native-figma-squircle';
import TrendingTokensProduct from '../products/trendingtokens/TrendingTokensProduct';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MemeCoinsAppLandingBluePrint() {
  const products = [
    {
      id: 1,
      product_name: 'Currently Trending Tokens',
      component: 'LeverageEthProduct',
    },
  ];

  function RenderProductMakerDao({item, index}) {
    if (index === 0) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>Currently Trending Tokens</Text>
          <SquircleView
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}
            style={styles.product_tile_view}>
            <TrendingTokensProduct />
          </SquircleView>
        </View>
      );
    } else {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}></Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <Carousel
        data={products}
        renderItem={RenderProductMakerDao}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
      />
    </View>
  );
}

export default MemeCoinsAppLandingBluePrint;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  product_view: {
    marginTop: 40,
    alignItems: 'center',
  },
  product_title: {
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginBottom: 40,
  },
  product_tile_view: {
    width: windowWidth - 40,
  },
});
