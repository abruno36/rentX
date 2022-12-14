import React from "react";
import { ParamListBase, NavigationProp, useNavigation, useRoute } from "@react-navigation/native";

import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";
import { Accessory } from "../../Components/Accessory";
import { Button } from "../../Components/Button";

import { getAccessoryIcons } from "../../utils/getAccessoryIcons";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from "./styles";

import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO;
}


export function CarDetails(){

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car } = route.params as Params;
  
  function handleConfirmRental(){
    navigation.navigate('Scheduling', { car });
  } 

  function handleGoBack() {
    if (navigation.canGoBack())
      navigation.goBack()
  }
  
  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}/>
      </Header>

      <CarImages>
         <ImageSlider imagesUrl={car.photos}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          { 
            car.accessories.map(accessory => (
               <Accessory 
                  key={accessory.type}
                  name={accessory.name} 
                  icon={getAccessoryIcons(accessory.type)}
               />
            ))
          }
        </Accessories>
        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>

    </Container>
  );
}