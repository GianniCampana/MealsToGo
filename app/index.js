import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "../src/infrastructure/theme";
import { Navigation } from "../src/infrastructure/navigation";

import { RestaurantsContextProvider } from "../src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "../src/services/location/location.context";
import { FavouritesContextProvider } from "../src/services/favourites/favourites.context";
import { SafeArea } from "@/src/components/utility/safe-area.component";
import { initializeApp, getApps } from "firebase/app";
import { AuthenticationContextProvider } from "@/src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyAy7l7bt1x1gElZV5ArtgNV-eXTYJlh2ig",

  authDomain: "mealstogo-eea47.firebaseapp.com",

  projectId: "mealstogo-eea47",

  storageBucket: "mealstogo-eea47.firebasestorage.app",

  messagingSenderId: "202996628505",

  appId: "1:202996628505:web:283f8cecdf7728ff757e88",
};
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeArea>
          <AuthenticationContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <FavouritesContextProvider>
                  <Navigation />
                </FavouritesContextProvider>
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </AuthenticationContextProvider>
        </SafeArea>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
