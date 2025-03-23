import React, { useContext, useState } from "react";
import { FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../components/spacer/spacer.component";
import styled from "styled-components/native";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { Search } from "../components/search.component";

const RestaurantList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: {
    padding: 16,
  },
}))``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isloading, restaurants } = useContext(RestaurantsContext);
  const [searchHeight, setSearchHeight] = useState(0);

  return (
    <>
      {isloading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color="lightblue" />
        </LoadingContainer>
      )}
      <Search onHeightChange={setSearchHeight} />
      <RestaurantList
        data={restaurants}
        paddingTop={searchHeight}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </>
  );
};
