import React, { useState, useEffect } from "react";
import {
  View,
  TextField,
  Text,
  Button,
  Card,
  Checkbox,
  TouchableOpacity,
} from "react-native-ui-lib";
import { useSession } from "~/contexts/auth";
import httpClient from "~/configs/httpClient";
import useApi from "~/configs/useApi";
import { router } from "expo-router";
import { Input } from "~/components/Input/Input";
import { ButtonCustom } from "~/components/Button/Button";

export default function Register() {
  const { signIn, session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      // Você ainda pode usar axios ou qualquer cliente HTTP diretamente para operações mais complexas ou específicas
      // const response = await httpClient.post("/login", {
      //   usuario: username,
      //   senha: password,
      // });

      // const sessionData = response; // Assumindo que os dados da sessão são retornados como resultado
      // console.log(sessionData);
      signIn({
        usuario: username,
        senha: password,
      });
    } catch (error) {
      console.error("Falha ao fazer login:", error);
    }
  };

  useEffect(() => {
    if (session) {
      // Aqui, você pode navegar para a tela inicial após o login bem-sucedido
      router.replace("/sindico/home");
    }
  }, [session]);

  return (
    <View backgroundColor="#0097B2" flex center padding-20>
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
          color="white"
          uppercase
          text
          style={{ fontWeight: "700" }}
        >
          Condomax
        </Text>
        <View
          padding-20
          style={{
            backgroundColor: "#5CE1E6",
            width: 350,
            height: 300,
            justifyContent: "space-between",
          }}
        >
          <Text
            text70
            center
            color="#0097B2"
            uppercase
            text
            style={{ fontWeight: "700" }}
          >
            Registro
          </Text>
          <Input
            placeholder="LOGIN"
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            placeholder="SENHA"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <ButtonCustom
            size={Button.sizes.medium}
            text70
            white
            backgroundColor="#0097B2"
            label="Cadastrar"
            onPress={handleSignIn}
          />

          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text center white>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
