import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const Abc = ({data}) => {
    console.log(":>>>> Abc");
    
  return (
    <View>
      <Text>Abc</Text>
    </View>
  )
}

export default memo(Abc)

const styles = StyleSheet.create({})