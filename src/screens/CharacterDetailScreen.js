import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, ScrollView } from 'react-native';

export default function CharacterDetailScreen({ route }) {
  const { id } = route.params || {};
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacter = async () => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const json = await res.json();
      setCharacter(json);
      setError(null);
    } catch (e) {
      setError('Falha ao carregar detalhes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id == null) {
      setError('ID do personagem não fornecido.');
      setLoading(false);
      return;
    }
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Personagem não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>

      <View style={styles.row}>
        <Info label="Status" value={character.status} />
        <Info label="Espécie" value={character.species} />
      </View>

      <View style={styles.row}>
        <Info label="Gênero" value={character.gender} />
      </View>

      <View style={styles.block}>
        <Info label="Origem" value={character?.origin?.name} />
        <Info label="Localização atual" value={character?.location?.name} />
      </View>
    </ScrollView>
  );
}

function Info({ label, value }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value ?? '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101316' },
  content: { padding: 16, alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  loadingText: { color: '#a8b0ba', marginTop: 8 },
  error: { color: '#ff6b6b', fontSize: 16 },
  image: { width: 220, height: 220, borderRadius: 12, marginBottom: 16 },
  name: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  row: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  block: { width: '100%', marginTop: 8 },
  infoItem: { flex: 1, backgroundColor: '#1a1f24', borderRadius: 12, padding: 12, marginHorizontal: 6, marginBottom: 8 },
  infoLabel: { color: '#a8b0ba', fontSize: 12, marginBottom: 4 },
  infoValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
