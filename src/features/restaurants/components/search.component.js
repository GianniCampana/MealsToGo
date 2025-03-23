import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

export const Search = ({ onHeightChange }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const searchRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.measure((x, y, width, height, pageX, pageY) => {
          onHeightChange(height);
        });
      }
    }, 0);
  }, [searchRef.current]);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer ref={searchRef}>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
