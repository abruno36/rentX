import { Text, View } from 'react-native'
import React, { Component } from 'react'

interface Props {
  title: string;
}
export function Welcome({title}: Props) {
  
    return (
      <View>
        <Text>{title}</Text>
      </View>
    )

}