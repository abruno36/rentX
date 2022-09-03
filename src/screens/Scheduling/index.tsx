import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../Components/BackButton';
import { Button } from '../../Components/Button';
import { Calendar } from '../../Components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DataInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';


export function Scheduling(){
  const theme = useTheme();
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => {}}
          color={theme.colors.shape}
        />
        <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim do aluguel
        </Title>

        <RentalPeriod>
          <DataInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>
              03/09/2022
            </DateValue>
          </DataInfo>
    
        <ArrowSvg/>
       
          <DataInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={true}>
              07/09/2022
            </DateValue>
          </DataInfo>
        </RentalPeriod>

      </Header>
      <Content>
        <Calendar
          //markedDates={markedDates}
          //onDayPress={handleSelectDate}
        />
      </Content>

      <Footer>
        <Button 
          title="Confirmar" 
          //onPress={handleConfirmRental}
          //enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}