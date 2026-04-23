import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fen, setFen] = useState('start');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>AI CHESS MOBILE</Text>
      </View>
      
      <View style={styles.boardContainer}>
        <Chessboard 
          boardSize={350}
          onMove={({ nextFEN }) => setFen(nextFEN)}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.status}>Status: Ready to Play</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5C518',
    letterSpacing: 2,
  },
  boardContainer: {
    padding: 10,
    backgroundColor: '#161B22',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  footer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    width: '90%',
  },
  status: {
    color: '#8B949E',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
