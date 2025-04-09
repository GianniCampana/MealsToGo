import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51QNAVUIX40YHdanxr6a36aRuEPDNs9waVydGarOaDhVLDDSHqXAubf0j4BB05e95srgMYlCdlEN4dq3zcX9rXQyL00lJHbCJiX"
);

export const CreditCardComponent = () => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    console.log(isIncomplete);
    const card = {
      number: "4242424242424242", // Utilizza un numero di carta di test
      exp_month: "12", // Assicurati che il formato sia corretto
      exp_year: "25", // Aggiungi il prefisso per l'anno
      cvc: "123",
      name: "John", // Nome del titolare della carta
    };
    const info = await stripe.createToken({ card });
    console.log(info);
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
