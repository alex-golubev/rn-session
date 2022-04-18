import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../index';

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Web'>;

const Home = () => {
  const [cookie, setCookie] = useState<null | string>(null);

  const navigation = useNavigation<HomeScreenProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    AsyncStorage.getItem('user_credentials').then(val => {
      if (val) {
        return setCookie(val);
      }
      setCookie(null);
    });
  }, [isFocused]);

  return (
    <View style={styles.wrap}>
      {cookie ? (
        <Text style={styles.authText}>Успешная авторизация</Text>
      ) : null}
      <Button title="Open WebView" onPress={() => navigation.navigate('Web')} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authText: {
    marginBottom: 40,
  },
});

export default Home;
