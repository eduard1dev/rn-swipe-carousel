import styled from 'styled-components/native';

export const StackListContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  background-color: '#000';
`;

export const ReactionsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 60px;
  margin-bottom: 40px;
`;

export const Reaction = styled.View`
  align-items: center;
`;

export const ReactionText = styled.Text`
  font-size: 20px;
  color: #0e177d;
`;

export const BottomTab = styled.View`
  position: relative;

  width: 100%;
  padding: 36px;
`;

export const BottomTabBg = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  padding: 32px 36px;

  background-color: #f6f6f6;
  border-radius: 24px;
`;

export const ResultsText = styled.Text`
  width: 100%;
  padding: 32px 36px;

  font-size: 26px;
  font-weight: bold;
`;

export const SelectedItem = styled.View`
  position: relative;
`;

export const SelectedDot = styled.View`
  position: absolute;
  bottom: -12px;
  align-self: center;

  background-color: #0e177d;
  height: 6px;
  width: 6px;
  border-radius: 3px;
`;
