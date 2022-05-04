import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import EmojiIcon from '../../../../../bits/EmojiIcon';
import {useNavigation} from '@react-navigation/native';
import useEthFiatPrice from '../../../../../helpers/useEthFiatPrice';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
All states of this component
a. "Checking" - checking your wallet balances - useEffect runs during this time
c. "WalletHasEnough" - your have the needed amount in <symbol> - you can supply <amount><token_symbol> now
e. "WalletBalanceNotEnough" - you do not have the needed in wallet - reduce stake amount as per
 */

function ConfirmEarnCompound(props) {
  const [renderContext, setRenderContext] = useState('NoAmount');
  /*
    All render states: Checking | WalletHasAmount | WalletHasNoETHButERCs | NoAmount
  */

  const navigation = useNavigation();
  const {loadingEth, priceEth} = useEthFiatPrice();

  let ethBalanceInWallet =
    Number(props.State.MyProfileReducer.myProfileDetails.eth_balance) *
    10 ** -18;

  function checkIfWalletHasBalance() {
    if (Number(props.Amount) < Number(ethBalanceInWallet)) {
      setRenderContext('WalletHasAmount');
    } else {
      if (
        Number(props.Amount) * Number(priceEth) <
        Number(props.State.MyProfileReducer.myProfileDetails.portfolio_value)
      ) {
        setRenderContext('WalletHasNoETHButERCs');
      } else {
        setRenderContext('NoAmount');
      }
    }
  }

  useEffect(() => {
    // 1. check if wallet has the supply amount said
    // 2.1. if not, invoke - "WalletBalanceNotEnough" - in that particular token chosen
    // 2.2. else invoke - "WalletHasEnough" - in that particular token chosen

    checkIfWalletHasBalance();
  }, []);

  function MainBlock() {
    if (renderContext === 'Checking') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.mid_ground + '50'}
            size={80}
            emoji={'⌛'}
          />
          <Text style={styles.text_highlighted}>
            checking your wallet balances
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasAmount') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.success_green_dark}
            size={80}
            emoji={'👍'}
          />
          <Text style={styles.text_highlighted}>
            your wallet verification succeeded
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasNoETHButERCs') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            your do not have enough ETH but have the needed collateral in
            tokens. buy ETH on uniswap
          </Text>
        </View>
      );
    } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            your do not have enough balance in your wallet. reduce amount and
            try again
          </Text>
        </View>
      );
    } else {
      return <View />;
    }
  }

  function ButtonBlock() {
    if (renderContext === 'Checking') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => navigation.goBack()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.mid_ground + '50'],
            }}
          />
        </View>
      );
    } else if (renderContext === 'WalletHasAmount') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'start staking process'}
            type={'solid'}
            onPress={() => props.ChangeBodyTransaction()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                themeHere.colors.success_green_dark,
                themeHere.colors.success_green,
              ],
            }}
          />
        </View>
      );
    } else if (renderContext === 'WalletHasNoETHButERCs') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'buy on uniswap'}
            type={'solid'}
            // onPress={() => }  // uniswap redirect logic
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.pink, themeHere.colors.pink + '90'],
            }}
          />
        </View>
      );
    } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => props.ChangeBodyEnterAmount()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.mid_ground + '50'],
            }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }

  return (
    <View style={styles.parent_view}>
      <View />
      <MainBlock />
      <ButtonBlock />
    </View>
  );
}

export default ConfirmEarnCompound;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main_block_view: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  enter_amount_text: {
    ...themeHere.text.title_1,
    color: themeHere.colors.foreground,
  },
  text_highlighted: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
  },
  text_not_highlighted: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
  },
  unsupported_coins_context_suggestions_view: {
    flexDirection: 'column',
    marginVertical: 30,
    alignItems: 'center',
  },
  supported_coins_view: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  button_block_view: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  next_button_container: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  next_button_style: {
    width: windowWidth * 0.5,
    height: 50,
    borderRadius: 25,
  },
  next_button_title: {
    ...themeHere.text.body_medium,
    color: 'white',
  },
});
