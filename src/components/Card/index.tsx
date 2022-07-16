import React from 'react';
import { AntDesign as Icon } from '@expo/vector-icons';
import * as S from './styles';

export interface CardProps {
  width: number;
  height: number;
}

export function Card({ width, height }: CardProps) {
  return (
    <S.CardContainer width={width} height={height}>
      <S.IconContainer>
        <Icon name="staro" size={22} color="white" />
      </S.IconContainer>
      <S.CardTitle>Sports Photos</S.CardTitle>
      <S.CardPriceContainer>
        <S.CardPriceText>$120/h</S.CardPriceText>
      </S.CardPriceContainer>
      <S.CardDescription>
        Action sports photography. Strongs atlhetic skills are mandatory.
      </S.CardDescription>
      <S.TagsContainer>
        <S.Tag>
          <S.TagText>Photography</S.TagText>
        </S.Tag>
        <S.Tag>
          <S.TagText>Sports</S.TagText>
        </S.Tag>
      </S.TagsContainer>
    </S.CardContainer>
  );
}
