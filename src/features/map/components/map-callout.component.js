import React from "react";
import styled from "styled-components/native";
import { Text } from "../../restaurants/components/typography/text.component";

const CalloutContainer = styled.View`
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  min-width: 150px;
  min-height: 50px;
  align-items: center;
`;

export const MapCallout = ({ restaurant }) => {
  return (
    <CalloutContainer>
      <Text variant="label">{restaurant.name}</Text>
    </CalloutContainer>
  );
};
