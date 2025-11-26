import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";

export default function CharacterDetailScreen({ route }) {
  const { personagem } = route.params;
  const [episodios, setEpisodios] = useState([]);

  const getEpisodios = async () => {
    try {
      const eps = await Promise.all(
        personagem.episode.map(async (url) => {
          const res = await fetch(url);
          return res.json();
        })
      );
      setEpisodios(eps);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar episódios.");
    }
  };

  useEffect(() => {
    getEpisodios();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image
        source={{ uri: personagem.image }}
        style={{ width: 150, height: 150, borderRadius: 75, alignSelf: "center" }}
      />

      <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", marginTop: 12 }}>
        {personagem.name}
      </Text>

      <Text style={{ fontSize: 16, textAlign: "center", marginTop: 4 }}>
        Espécie: {personagem.species}
      </Text>

      <Text style={{ fontSize: 16, textAlign: "center", marginTop: 2 }}>
        Status: {personagem.status}
      </Text>

      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 16 }}>Episódios:</Text>

      <FlatList
        data={episodios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
            <Text style={{ fontSize: 15 }}>📺 {item.episode} - {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
