import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';

const API_URL = 'https://rickandmortyapi.com/api/character';

export default function CharactersListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = async (url = API_URL, append = false) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      const results = json?.results ?? [];
      setData(prev => (append ? [...prev, ...results] : results));
      setNextPage(json?.info?.next ?? null);
      setError(null);
    } catch (e) {
      setError('Falha ao carregar personagens.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCharacters(API_URL, false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCharacters(API_URL, false);
  }, []);

  const loadMore = () => {
    if (loadingMore || !nextPage) return;
    setLoadingMore(true);
    fetchCharacters(nextPage, true);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CharacterDetail', { id: item.id })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>
            {item.status} • {item.species}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando personagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => fetchCharacters(API_URL, false)}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator />
              <Text style={styles.footerText}>Carregando mais...</Text>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101316' },
  listContent: { padding: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a1f24',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  cardContent: { flex: 1 },
  name: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  meta: { color: '#a8b0ba', fontSize: 14 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  loadingText: { color: '#a8b0ba', marginTop: 8 },
  error: { color: '#ff6b6b', fontSize: 16, marginBottom: 12 },
  retryBtn: {
    backgroundColor: '#2dba4e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#0b0f12', fontWeight: '700' },
  footer: { paddingVertical: 16, alignItems: 'center' },
  footerText: { color: '#a8b0ba', marginTop: 6 },
});
