import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
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
  const [auth, setAuth] = useState<null | string>(null);

  const getAuthCookie = () => {
    CookieManager.get(uri, true).then(success => {
      if (success.user_credentials) {
        setAuth(JSON.stringify(success.user_credentials));
        return AsyncStorage.setItem(
          'user_credentials',
          JSON.stringify(success.user_credentials),
        );
      }
      setAuth(null);
      AsyncStorage.removeItem('user_credentials').catch(err =>
        console.log(err),
      );
    });
  };

  const setUserCookie = async () => {
    const value = await AsyncStorage.getItem('user_credentials');
    if (value) {
      await CookieManager.set(uri, JSON.parse(value), true);
    }
    AsyncStorage.removeItem('user_credentials').catch(err => console.log(err));
  };

  useEffect(() => {
    getAuthCookie();
  }, []);

  useEffect(() => {
    setUserCookie();
  }, [auth]);

  const webVueNavigationChange = () => {
    getAuthCookie();
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
      {auth ? <Text style={styles.authText}>Успешная авторизация</Text> : null}
      <View style={styles.webView}>
        <WebView
          source={{uri}}
          onNavigationStateChange={webVueNavigationChange}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webView: {
    width: '100%',
    height: '100%',
  },
  authText: {
    height: 24,
    textAlign: 'center',
  },
});

export default Web;
