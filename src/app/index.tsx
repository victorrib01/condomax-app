import React, { useState, useEffect, FC } from "react";
import { View, Text, Checkbox, TouchableOpacity } from "react-native-ui-lib";
import { ImageBackground } from "react-native";

import { useSession } from "~/contexts/auth";
import { router } from "expo-router";
import { Input } from "~/components/Input/Input";
import { ButtonCustom } from "~/components/Button/Button";

// Cores poderiam ser mantidas em um arquivo separado
const colors = {
  primaryBackground: "rgba(0, 151, 178, 0.8)",
  secondaryBackground: "#5CE1E6",
  primaryText: "#0097B2",
  secondaryText: "white",
};

interface LoginFormProps {
  handleSignIn: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Função que gerencia o processo de login.
 */
const SignIn: FC = () => {
  const { signIn, session } = useSession();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    try {
      signIn({ usuario: username, senha: password });
    } catch (error) {
      console.error("Falha ao fazer login:", error);
    }
  };

  useEffect(() => {
    if (session) {
      router.replace("/sindico/home");
    }
  }, [session]);

  return (
    <ImageBackground
      source={require("../../assets/login-background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        backgroundColor={colors.primaryBackground}
        flex
        center
        padding-20
        style={{ position: "relative" }}
      >
        <LoginForm
          handleSignIn={handleSignIn}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <View style={{ position: "absolute", bottom: 20 }}>
          <Text color={colors.secondaryText}>v1.0</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

/**
 * Componente do Formulário de Login
 */
const LoginForm: FC<LoginFormProps> = ({
  handleSignIn,
  setUsername,
  setPassword,
}) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
      height: "35%",
    }}
  >
    <Text
      text20
      center
      color={colors.secondaryText}
      style={{ fontWeight: "700" }}
    >
      CONDOMAX
    </Text>
    <View
      padding-20
      style={{
        backgroundColor: colors.secondaryBackground,
        width: 280,
        height: 280,
        borderRadius: 20,
        justifyContent: "space-around",
      }}
    >
      <Text
        center
        color={colors.primaryText}
        style={{ fontWeight: "700", textTransform: "uppercase", fontSize: 14 }}
      >
        Preencha os campos abaixo
      </Text>

      <Input placeholder="LOGIN" onChangeText={setUsername} />
      <Input placeholder="SENHA" secureTextEntry onChangeText={setPassword} />

      <ButtonCustom
        size={"medium"}
        text90
        backgroundColor={colors.primaryText}
        label="LOGIN"
        style={{
          width: "40%",
          alignSelf: "center",
          borderRadius: 8,
        }}
        onPress={handleSignIn}
      />
      <RememberLoginCheckbox />
      {/* <RegisterLink /> */}
    </View>
  </View>
);

/**
 * Checkbox para lembrar login
 */
const RememberLoginCheckbox: FC = () => (
  <View
    row
    centerV
    style={{
      alignSelf: "center",
    }}
  >
    <Checkbox
      label={"MANTER LOGIN"}
      size={18}
      value={true}
      color={colors.primaryText}
      labelStyle={{
        color: colors.primaryText,
        fontWeight: "bold",
        fontSize: 10,
      }}
    />
  </View>
);

/**
 * Link para a página de registro
 */
const RegisterLink: FC = () => (
  <TouchableOpacity onPress={() => router.replace("/register")}>
    <Text
      center
      color={colors.secondaryText}
      style={{
        fontSize: 12,
      }}
    >
      NÃO TEM CADASTRO? REGISTRE-SE
    </Text>
  </TouchableOpacity>
);

export default SignIn;
