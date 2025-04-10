import React, { useContext } from "react";
import { Text } from "react-native";
import { CartContext } from "../../../services/cart/cart.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CreditCardComponent } from "../components/credit-card.component";

export const CheckoutScreen = () => {
  const { cart, restaurant } = useContext(CartContext);
  return (
    <SafeArea>
      <Text>{JSON.stringify(cart)}</Text>
      <Text>restaurant: {JSON.stringify(restaurant)}</Text>
      <CreditCardComponent />
    </SafeArea>
  );
};
