import React from 'react';
import { Image, View, TouchableOpacity  } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Queue = () => {
  const handleEdit = () => {};

  const handleCancel = () => {};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0EEF7', paddingTop: 0, paddingBottom: 0 }}>
      <Image source={require('./HALP.png')} style={{ width: 100, height: 100, resizeMode: 'contain', marginBottom: 20, marginTop: -100 }} />
      <View style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 32, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '90%', height: screenHeight * 0.75, maxWidth: screenWidth * 0.9, maxHeight: screenHeight * 0.75, marginTop: 0 }}>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#000000' }}>Hi Charlie</Text>
          <Text style={{ fontSize: 20, color: '#000000' }}>You are number</Text>
          <Text style={{ fontSize: 120, color: '#000000' }}>1</Text>
          <Text style={{ fontSize: 20, color: '#000000' }}>in the queue</Text>
        </View>
        <View style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleEdit} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4, width: '45%', marginBottom: 8, backgroundColor: '#94CCFF' }}>
            <Text style={{ fontSize: 16, color: '#686464', textAlign: 'center' }}>Edit ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4, width: '45%', marginBottom: 8, backgroundColor: '#94CCFF' }}>
            <Text style={{ fontSize: 16, color: '#686464', textAlign: 'center' }}>Cancel ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: 60, backgroundColor: '#E0EEF7', position: 'absolute', bottom: 0, borderTopWidth: 1, borderTopColor: '#686464' }}>
        <Button mode="text" onPress={() => console.log("Create button pressed")}>Create</Button>
        <Button mode="text" onPress={() => console.log("Settings button pressed")}>Settings</Button>
      </View>
    </View>
  );
};

export default Queue;