import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';


import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../Components/ConfirmButton';

import {
  Container, 
  Content,
  Title,
  Message,
  Footer
} from './styles';

export function SchedulingComplete(){

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  
  function handleConfirmRental(){
    navigation.navigate('Home');
  } 

  function handleGoBack() {
    if (navigation.canGoBack())
      navigation.goBack()
  }
  
    const { width } = useWindowDimensions();
  return (
    <Container>
        <StatusBar
            barStyle='light-content'
            translucent
            backgroundColor='transparent'
        />
        
        <LogoSvg width={width} />

        <Content>
            <DoneSvg width={80} height={80}/>
            <Title>Carro Alugado!</Title>
            <Message> Agora você só precisa ir {'\n'}
                      até a concessionária da RENTX {'\n'}
                      pegar o seu automóvel.
            </Message>
        </Content>
        <Footer>
           <ConfirmButton title='Ok' onPress={handleConfirmRental}/>
        </Footer>

    </Container>
  );
}