import React, { useState } from "react";
import { View, Text, TextField, Button } from "react-native-ui-lib";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apartment, setApartment] = useState("");
  const [role, setRole] = useState(""); // Morador, Funcionário, etc.

  const handleSave = () => {
    // Salve as alterações aqui (por exemplo, fazer uma chamada de API)
    console.log({ name, email, apartment, role });
  };

  return (
    <View flex padding-20>
      <Text text50M marginB-20>
        Editar Perfil
      </Text>
      <TextField
        text50
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        marginB-10
      />
      <TextField
        text50
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        marginB-10
      />
      <TextField
        text50
        placeholder="Apartamento"
        value={apartment}
        onChangeText={setApartment}
        marginB-10
      />
      <TextField
        text50
        placeholder="Função (Morador, Funcionário, etc.)"
        value={role}
        onChangeText={setRole}
        marginB-20
      />
      <Button label="Salvar" onPress={handleSave} />
    </View>
  );
}
