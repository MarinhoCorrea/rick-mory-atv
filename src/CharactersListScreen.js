import { useEffect, useState } from "react";
import { View, Text, Image, Alert, FlatList, TouchableOpacity } from "react-native";

export default function CharactersListScreen({ navigation }) {
  const [personagens, setPersonagens] = useState([]);

  const carregarPersonagens = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();

      if (!data.results) {
        throw new Error("Dados inválidos da API");
      }

      setPersonagens(data.results);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar a lista de personagens.");
    }
  };

  useEffect(() => {
    carregarPersonagens();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Lista de Personagens
      </Text>

      <FlatList
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("CharacterDetail", { personagem: item })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f2f2f2",
              padding: 10,
              borderRadius: 10,
              marginBottom: 10
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 90, height: 90, borderRadius: 10, marginRight: 12 }}
            />

            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name}</Text>
              <Text style={{ fontSize: 14 }}>Status: {item.status}</Text>
            </View>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}
