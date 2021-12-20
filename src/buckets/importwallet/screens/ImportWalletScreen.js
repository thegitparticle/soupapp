import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ImportWalletScreen({dispatch, navigation}) {
  return (
    <View style={styles.screen_view}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: windowHeight,
          width: windowWidth,
          backgroundColor: '#333',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: windowHeight * 0.015,
            backgroundColor: '#FFFFFF50',
            width: 200,
            height: 50,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('WalletSetupOptionsScreen');
          }}>
          <Text style={{color: 'white'}}>import your wallet</Text>
        </TouchableOpacity>
      </View>
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

export default connect(mapDispatchToProps)(ImportWalletScreen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
});
