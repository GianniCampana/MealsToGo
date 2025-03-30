import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        {error && !error.includes("email") && !error.includes("password") && (
          <ErrorContainer size="large">
            <Text variant="error">Incorrect email or password</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {isLoading ? (
            <ActivityIndicator animating={true} color={"#2196F3"} />
          ) : (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          )}
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
