import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';

import { BackButton } from '../../Components/BackButton';
import { Button } from '../../Components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../Components/Calendar';

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

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;

}

export function Scheduling(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  
  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  
  function handleConfirmRental(){
    navigation.navigate('SchedulingDetails');
  } 
  
  function handleGoBack() {
    if (navigation.canGoBack())
      navigation.goBack()
  }

  function handleSelectDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
   }
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleGoBack}
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
          markedDates={markedDates}
          onDayPress={handleSelectDate}
        />
      </Content>

      <Footer>
        <Button 
          title="Confirmar" 
          onPress={handleConfirmRental}
          //enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}