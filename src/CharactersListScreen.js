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
    <View style={styles.container}>

      <Text style={styles.title}>
        Lista de Personagens
      </Text>

      <FlatList
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("CharacterDetail", { personagem: item })}
            style={styles.card}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
            />

            <View>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardStatus}>Status: {item.status}</Text>
            </View>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a2e"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#97ce4c",
    textAlign: "center",
    textShadowColor: "#00d9ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16213e",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#00d9ff"
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#97ce4c"
  },
  cardName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff"
  },
  cardStatus: {
    fontSize: 14,
    color: "#00d9ff",
    marginTop: 4
  }
};