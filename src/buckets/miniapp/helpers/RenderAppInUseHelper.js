import React from 'react';
import {
  Appearance,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MakerDaoUsageShowCase from '../../../dapps/makerdao/screens/MakerDaoUsageShowCase';
import CompoundFinanceUsageShowCase from '../../../dapps/compoundfinance/screens/CompoundFinanceUsageShowCase';
import UniswapUsageShowCase from '../../../dapps/uniswap/screens/UniswapUsageShowCase';
import MemeCoinsUsageShowCase from '../../../dapps/memecoinsapp/screens/MemeCoinsUsageShowCase';
import LiquityUsageShowCase from '../../../dapps/liquity/screens/LiquityUsageShowCase';
import PoolTogetherUsageShowCase from '../../../dapps/pooltogether/screens/PoolTogetherUsageShowCase';
import IndexFundsUsageShowCase from '../../../dapps/indexfunds/screens/IndexFundsUsageShowCase';
import SpacerVertical from '../../../bits/SpacerVertical';
import WormholeBridgeUsageShowCase from '../../../dapps/wormholebridge/screens/WormholeBridgeUsageShowCase';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppInUseHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MakerDaoUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CompoundFinanceUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <UniswapUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MemeCoinsUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <LiquityUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'PoolTogetherLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <PoolTogetherUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'IndexFundsLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <IndexFundsUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'WormholeBridgeLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <WormholeBridgeUsageShowCase />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.parent_view}>
        <Text style={{color: 'white'}}>nothing</Text>
      </View>
    );
  }
}

export default RenderAppInUseHelper;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
