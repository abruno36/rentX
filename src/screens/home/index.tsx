import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Ionicons } from "@expo/vector-icons";

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car }  from '../../Components/Car';

import { Load } from '../../Components/Load';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';
import { useTheme } from 'styled-components';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] =  useState(true);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const theme = useTheme();
  
  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', { car });
  } 

  function handleOpenMyCars(){
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);

      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {loading ? <Load /> :
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
        />
      }
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
            name="ios-car-sport"
            size={32}
            color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}