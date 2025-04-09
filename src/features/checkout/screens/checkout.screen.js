import React from "react";
import { View, Text } from "react-native";
import { CreditCardComponent } from "../components/credit-card.component";

export const CheckoutScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CreditCardComponent />
    </View>
  );
};
