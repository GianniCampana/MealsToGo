import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";
export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
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
  const saveFavourites = async (favouritesToSave, uid) => {
    try {
      const jsonValue = JSON.stringify(favouritesToSave);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.error("Error saving favourites", e);
    }
  };
  const loadFavourites = async (uid) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (jsonValue != null) {
        setFavourites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error loading favourites", e);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

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
