import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { Alert } from "react-native";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";
import { Accessory } from "../../Components/Accessory";
import { Button } from "../../Components/Button";

import { getAccessoryIcons } from "../../utils/getAccessoryIcons";
import { getPlatformDate } from "../../utils/getPlatformDate";

import{
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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from "./styles";



interface Params {
    car: CarDTO;
    dates: string[];
}

interface RetalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails(){

    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RetalPeriod>({} as RetalPeriod);

    const theme = useTheme();
    
    const navigator = useNavigation<any>();
    
    const route = useRoute();
    const { car, dates } = route.params as Params;
    
    const rentalTotal = Number(dates.length * car.rent.price);

    function handleBack(){
        navigator.goBack();
    }

    async function handleConfirmRental(){
        setLoading(true);
        const response = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...response.data.unavailable_dates,
            ...dates,
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate:format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate:format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
        .then(()  => navigator.navigate("SchedulingComplete"))
        .catch(() => {
            setLoading(false)
            Alert.alert("N??o foi poss??vel fazer o agendamento");
        })
    }

    useEffect(()=>{
        setRentalPeriod({
            start:format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end:format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, [])
    return(
        <Container>

            <Header>
                <BackButton 
                    onPress={handleBack} 
                />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
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

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>{ rentalPeriod.start }</DateValue>
                    </DateInfo>

                    <Feather
                        name='chevron-right'
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>At??</DateTitle>
                        <DateValue>{ rentalPeriod.end }</DateValue>
                    </DateInfo>

                </RentalPeriod>
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} X${dates.length} di??rias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>

            <Footer>
                <Button 
                    title="Confirmar" 
                    color={theme.colors.success} 
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
            

        </Container>
    )
}