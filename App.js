import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackList } from './src/screens/StackListScreen';

export default function App() {
  const data = [
    { value: 1, isVisible: true },
    { value: 2, isVisible: true },
    { value: 3, isVisible: true },
    { value: 4, isVisible: true },
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
