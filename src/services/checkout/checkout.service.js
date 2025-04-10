import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51QNAVUIX40YHdanxr6a36aRuEPDNs9waVydGarOaDhVLDDSHqXAubf0j4BB05e95srgMYlCdlEN4dq3zcX9rXQyL00lJHbCJiX"
);

export const cartTokenRequest = async (card) => stripe.createToken({ card });
