import React from "react";
import { AppNavigator } from "./app.navigator";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

export const Navigation = () => {
  return (
    <FavouritesContextProvider>
      <AppNavigator />
    </FavouritesContextProvider>
  );
};
