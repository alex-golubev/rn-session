import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../index';

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Web'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenProp>();
  return (
    <View style={styles.wrap}>
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
});

export default Home;
