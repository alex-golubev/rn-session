import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import WebView from 'react-native-webview';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../index';
import {useNavigation} from '@react-navigation/native';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WebScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Web = () => {
  const uri = 'https://blizko.ru/';
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<WebScreenProp>();

  useEffect(() => {
    CookieManager.get(uri, true).then(success => {
      if (success.user_credentials) {
        AsyncStorage.setItem(
          'user_credentials',
          JSON.stringify(success.user_credentials),
        );
      }
    });
  }, []);

  const setUserCookie = async () => {
    const value = await AsyncStorage.getItem('user_credentials');
    if (value) {
      console.log(value);
      await CookieManager.set(uri, JSON.parse(value), true);
    }
  };

  setUserCookie();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <View style={styles.webView}>
        <WebView source={{uri}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webView: {
    width: '100%',
    height: '100%',
  },
});

export default Web;
