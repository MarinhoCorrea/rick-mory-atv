import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";

export default function CharacterDetailScreen({ route }) {
  const { personagem } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: personagem.image }}
        style={styles.image}
      />

      <Text style={styles.name}>
        {personagem.name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          🧬 Espécie: <Text style={styles.highlightGreen}>{personagem.species}</Text>
        </Text>

        <Text style={styles.infoText}>
          💚 Status: <Text style={personagem.status === "Alive" ? styles.highlightGreen : styles.highlightRed}>{personagem.status}</Text>
        </Text>

        <Text style={styles.infoText}>
          🌍 Localização de Origem: <Text style={styles.highlightBlue}>{personagem.origin.name}</Text>
        </Text>

        <Text style={styles.infoText}>
          📍 Localização Atual: <Text style={styles.highlightBlue}>{personagem.location.name}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a2e"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: "#00d9ff"
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    color: "#97ce4c",
    textShadowColor: "#00d9ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  infoContainer: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#00d9ff"
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    color: "#ffffff",
    fontWeight: "600"
  },
  highlightGreen: {
    color: "#97ce4c"
  },
  highlightBlue: {
    color: "#00d9ff"
  },
  highlightRed: {
    color: "#ff6b6b"
  }
};