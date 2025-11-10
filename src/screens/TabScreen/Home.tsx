import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator, TextInput } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchNovels, fetchChapters, Novel, ChapterData } from '../../api/data';

const { width } = Dimensions.get('window');
const novelImageWidth = (width - 40) / 2 - 10;

const colors = {
  primary: '#4287f5',
  secondary: '#ffffff',
  text: '#333333',
  background: '#f0f2f5',
  cardBackground: '#ffffff',
};

// Type definition untuk navigation parameters
type RootStackParamList = {
  Home: undefined;
  DetailScreen: { novelId: string };
};

// Type untuk navigation props
type HomeNavigationProps = NavigationProp<RootStackParamList, 'DetailScreen'>;

const Home = () => {
  const navigation = useNavigation<HomeNavigationProps>();
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [chapters, setChapters] = useState<ChapterData[]>([]);

  // Mengambil data novel dari API saat component pertama kali di-mount
  useEffect(() => {
    const getNovels = async () => {
      const fetchedNovels = await fetchNovels();
      setNovels(fetchedNovels);
      setLoading(false);
    };
    getNovels();
  }, []);

  // Mengambil data chapters dari API saat component pertama kali di-mount
  useEffect(() => {
    const getChapters = async () => {
      const fetchedChapters = await fetchChapters();
      setChapters(fetchedChapters);
    };
    getChapters();
  }, []);

  /**
   * Mendapatkan jumlah chapter berdasarkan novel ID
   * @param novelId - ID novel yang akan dicari jumlah chapternya
   * @returns jumlah chapter atau 0 jika tidak ditemukan
   */
  const getChapterCount = (novelId: string): number => {
    const chapterData = chapters.find((ch) => ch.id === novelId);
    return chapterData ? chapterData.Chapter : 0;
  };

  // Filter novel berdasarkan query search (nama, author, atau genre)
  const filteredNovels = useMemo(() => {
    if (!searchQuery.trim()) {
      return novels;
    }
    const query = searchQuery.toLowerCase().trim();
    return novels.filter(
      (novel) =>
        novel.nama_novel.toLowerCase().includes(query) ||
        novel.author.toLowerCase().includes(query) ||
        novel.genre.toLowerCase().includes(query)
    );
  }, [novels, searchQuery]);

  /**
   * Handler untuk navigasi ke detail screen saat novel di-klik
   * @param novelId - ID novel yang akan ditampilkan di detail screen
   */
  const handleNovelPress = (novelId: string) => {
    navigation.navigate('DetailScreen', { novelId });
  };

  // Mapping gambar novel berdasarkan ID (untuk menampilkan cover novel)
  const novelImages: Record<string, any> = {
    '1': require('../../../assets/Tema1.jpg'),
    '2': require('../../../assets/Tema 2.jpeg'),
    '3': require('../../../assets/Tema3.jpg'),
    '4': require('../../../assets/Tema4.webp'),
    '5': require('../../../assets/Tema5.jpg'),
    '6': require('../../../assets/Tema6.webp'),
    '7': require('../../../assets/Tema7.jpg'),
    '8': require('../../../assets/Tema8.jpg'),
    '9': require('../../../assets/Tema9.jpg'),
    '10': require('../../../assets/Tema10.jpg'),
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.primary, marginTop: 10 }}>Loading Novels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Novel</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari novel, penulis, atau genre..."
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Icon name="close" size={20} color="#666666" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredNovels.length > 0 ? (
          <View style={styles.novelList}>
            {filteredNovels.map((novel) => {
              const chapterCount = getChapterCount(novel.id);
              return (
                <TouchableOpacity
                  key={novel.id}
                  style={styles.novelCard}
                  onPress={() => handleNovelPress(novel.id)}
                >
                  <Image
                    source={novelImages[novel.id] || require('../../../assets/Wallpaper.png')}
                    style={styles.novelImage}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.novelTitle} numberOfLines={2}>
                      {novel.nama_novel}
                    </Text>
                    <Text style={styles.novelAuthor}>{novel.author}</Text>
                    {chapterCount > 0 && (
                      <View style={styles.chapterButtonContainer}>
                        <View style={styles.chapterButton}>
                          <Icon name="book" size={14} color="#666666" />
                          <Text style={styles.chapterButtonText}>
                            {chapterCount} Chapters
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : searchQuery.trim().length > 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={64} color="#cccccc" />
            <Text style={styles.emptyText}>Tidak ada novel ditemukan</Text>
            <Text style={styles.emptySubText}>
              Coba cari dengan kata kunci yang berbeda
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  novelList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  novelCard: {
    width: novelImageWidth,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  novelImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  novelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  novelAuthor: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  chapterButtonContainer: {
    marginTop: 5,
  },
  chapterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chapterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default Home;
