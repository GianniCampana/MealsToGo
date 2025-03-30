import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
    saveFavourites([...favourites, restaurant]);
  };
  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
    saveFavourites(newFavourites);
  };
  const saveFavourites = async (favouritesToSave) => {
    try {
      const jsonValue = JSON.stringify(favouritesToSave);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (e) {
      console.error("Error saving favourites", e);
    }
  };
  const loadFavourites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favourites");
      if (jsonValue != null) {
        setFavourites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error loading favourites", e);
    }
  };
  useEffect(() => {
    loadFavourites();
  }, []);
  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);
  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
