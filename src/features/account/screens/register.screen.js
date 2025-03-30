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

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    onRegister(email, password, confirmPassword);
  };

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
        <Spacer size="large">
          <AuthInput
            label="Confirm Password"
            value={confirmPassword}
            textContentType="ConfirmPassword"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(cp) => setConfirmPassword(cp)}
          />
        </Spacer>
        {(error || passwordError) && (
          <ErrorContainer size="large">
            <Text variant="error">{error || passwordError}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {isLoading ? (
            <ActivityIndicator animating={true} color={"#2196F3"} />
          ) : (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={handleRegister}
            >
              Register
            </AuthButton>
          )}
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
