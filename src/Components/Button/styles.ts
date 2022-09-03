import styled from 'styled-components/native';
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren<RectButtonProps> {
    color?: string;
} 

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 19px;
  background-color: ${({ color }) => color };
`

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
`;