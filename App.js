import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackList } from './src/screens/StackListScreen';

export default function App() {
  const data = [
    { value: 1},
    { value: 2},
    { value: 3},
    { value: 4},
  ];

  return (
    <View style={styles.container}>
      <StackList data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
