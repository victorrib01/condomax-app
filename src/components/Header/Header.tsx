import React from "react";
import { View, Text } from "react-native";
import { Avatar, DrawerButton, View as UIView } from "react-native-ui-lib";

const AppHeader = ({ userName }) => {
  return (
    <UIView row paddingH-20 paddingV-10>
      {/* Avatar à esquerda */}
      <Avatar
        containerStyle={{ flex: 1 }}
        source={{ uri: "https://seu-avatar.com/imagem.jpg" }}
      />

      {/* Informações do usuário no meio */}
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <Text>{userName}</Text>
      </View>

      {/* Botão do menu hambúrguer à direita */}
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <DrawerButton
          drawerIconColor="black"
          onPress={() => {
            // Adicione a lógica para abrir o Drawer aqui
          }}
        />
      </View>
    </UIView>
  );
};

export default AppHeader;
