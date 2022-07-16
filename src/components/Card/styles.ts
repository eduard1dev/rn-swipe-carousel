import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

interface CardContainerProps {
  height: number;
  width: number;
}

export const CardContainer = styled.View<CardContainerProps>`
  padding: 32px 24px;
  align-items: flex-start;
  justify-content: center;
  background-color: #0e177d;
  width: ${(props) => `${props.width}px}`};
  height: ${(props) => `${props.height}px`};
  border-radius: 38px;

  position: absolute;

  left: ${(props) => `${width / 2 - props.width / 2}px`};
`;

export const CardTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
`;

export const CardPriceContainer = styled.View`
  padding: 6px 16px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 12px;
`;

export const CardPriceText = styled.Text`
  font-size: 18px;
  color: black;
`;

export const CardDescription = styled.Text`
  font-size: 16px;
  color: grey;
  margin-bottom: auto;
`;

export const TagsContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const Tag = styled.View`
  border-radius: 10px;
  background-color: rgbargba(246, 246, 246, 0.2);
  padding: 4px 16px;
  margin-right: 8px;
`;

export const TagText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

export const IconContainer = styled.View`
  background-color: rgbargba(246, 246, 246, 0.2);
  position: absolute;
  right: 24px;
  top: 32px;
  border-radius: 16px;
  padding: 10px;
`;
