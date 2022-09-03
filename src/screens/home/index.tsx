import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from '../../assets/logo.svg';

import { Car } from '../../Components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

export function Home(){
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupe',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  } 

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  
  function handleCarDetails(){
    navigation.navigate('CarDetails');
  } 

  // const carDataTwo = {
  //   brand: 'Porsche',
  //   name: 'Panamera',
  //   rent: {
  //     period: 'Ao dia',
  //     price: 340,
  //   },
  //   thumbnail: 'https://purepng.com/public/uploads/large/purepng.com-porsche-panamera-white-carcarvehicletransportporsche-961524659258pfvb8.png'
  // } 

  return (
    <Container>
      <StatusBar 
      barStyle="light-content"
      backgroundColor="transparent"
      translucent/>
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList 
        data={[1,2,3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carData} onPress={handleCarDetails}/>}
      />
   
    </Container>
  );
}