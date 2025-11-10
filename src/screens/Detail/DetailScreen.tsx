import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchNovelById, fetchChapterByNovelId, Novel } from '../../api/data';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#4287f5',
  secondary: '#ffffff',
  text: '#333333',
  background: '#f0f2f5',
  cardBackground: '#ffffff',
  favoriteIcon: '#ff6347',
  tabActive: '#333333',
  tabInactive: '#999999',
  border: '#e0e0e0',
};

// Type untuk tab navigation di detail screen
type TabType = 'overview' | 'chapters' | 'reviews';

// Interface untuk data chapter
interface Chapter {
  id: string;
  title: string;
  number: number;
}

// Interface untuk data review
interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { novelId } = route.params as { novelId: string };

  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [totalChapters, setTotalChapters] = useState<number>(0);
  const [chaptersLoading, setChaptersLoading] = useState<boolean>(true);

  // Mengambil detail novel dari API berdasarkan novelId
  useEffect(() => {
    const getNovelDetails = async () => {
      const fetchedNovel = await fetchNovelById(novelId);
      setNovel(fetchedNovel);
      setLoading(false);
    };
    getNovelDetails();
  }, [novelId]);

  // Mengambil jumlah chapter dari API berdasarkan novelId
  useEffect(() => {
    const getChapters = async () => {
      setChaptersLoading(true);
      const chapterCount = await fetchChapterByNovelId(novelId);
      if (chapterCount !== null) {
        setTotalChapters(chapterCount);
      }
      setChaptersLoading(false);
    };
    getChapters();
  }, [novelId]);

  /**
   * Handler untuk toggle favorite novel
   * Menampilkan alert ketika user mengklik tombol favorite
   */
  const handleFavoriteToggle = () => {
    if (novel) {
      Alert.alert(`Favorite`, `Novel "${novel.nama_novel}" favorited/unfavorited!`);
    }
  };

  // Generate array chapters berdasarkan jumlah total chapter dari API
  const chapters: Chapter[] = Array.from({ length: totalChapters }, (_, i) => ({
    id: `${i + 1}`,
    title: `Chapter ${i + 1}`,
    number: i + 1,
  }));

  // Dummy data untuk reviews (data statis, bisa diganti dengan data dari API nanti)
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Mas Arif',
      rating: 5,
      comment: 'Great novel! The storyline is engaging and the characters are well-developed.',
      date: '2024-01-15',
    },
    {
      id: '2',
      userName: 'Dinda',
      rating: 4,
      comment: 'Really enjoyed reading this. The plot twists are unexpected and exciting.',
      date: '2024-01-10',
    },
    {
      id: '3',
      userName: 'Chika Aulia',
      rating: 5,
      comment: 'One of the best novels I have read this year. Highly recommended!',
      date: '2024-01-05',
    },
  ];

  // Mapping gambar novel berdasarkan ID (untuk menampilkan cover novel di detail screen)
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
        <Text style={{ color: colors.primary, marginTop: 10 }}>Loading Novel Details...</Text>
      </View>
    );
  }

  if (!novel) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: colors.text }}>Novel not found.</Text>
      </View>
    );
  }

  /**
   * Render konten untuk tab Overview
   * Menampilkan informasi novel, genre, tanggal rilis, dan summary
   */
  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoContainer}>
        <Text style={styles.novelTitle}>{novel.nama_novel}</Text>
        <Text style={styles.novelAuthor}>{novel.author}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Genre:</Text> {novel.genre}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Tanggal Rilis:</Text>{' '}
            {new Date(novel.tanggal_rilis * 1000).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summaryText}>{novel.sinopsis}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
        <Icon name="favorite" size={24} color={colors.favoriteIcon} />
        <Text style={styles.favoriteButtonText}>Favorite</Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Render konten untuk tab Chapters
   * Menampilkan daftar semua chapters dari novel
   */
  const renderChapters = () => (
    <View style={styles.tabContent}>
      {chaptersLoading ? (
        <View style={styles.loadingChaptersContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingChaptersText}>Loading chapters...</Text>
        </View>
      ) : chapters.length > 0 ? (
        <View style={styles.chaptersContainer}>
          {chapters.map((chapter) => (
            <TouchableOpacity key={chapter.id} style={styles.chapterItem}>
              <View style={styles.chapterInfo}>
                <Text style={styles.chapterNumber}>Chapter {chapter.number}</Text>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.tabInactive} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyChaptersContainer}>
          <Icon name="book" size={64} color="#cccccc" />
          <Text style={styles.emptyChaptersText}>No chapters available</Text>
        </View>
      )}
    </View>
  );

  /**
   * Render konten untuk tab Reviews
   * Menampilkan daftar review dari user dengan rating dan komentar
   */
  const renderReviews = () => (
    <View style={styles.tabContent}>
      <View style={styles.reviewsContainer}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUserInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{review.userName.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.reviewUserName}>{review.userName}</Text>
                  <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Icon
                        key={i}
                        name={i < review.rating ? 'star' : 'star-border'}
                        size={16}
                        color={i < review.rating ? '#FFD700' : colors.tabInactive}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  /**
   * Render konten berdasarkan tab yang aktif
   * @returns JSX element sesuai dengan tab yang dipilih
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'chapters':
        return renderChapters();
      case 'reviews':
        return renderReviews();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={novelImages[novel.id] || require('../../../assets/Wallpaper.png')}
        style={styles.novelImage}
      />
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.tabTextActive,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'chapters' && styles.tabActive]}
            onPress={() => setActiveTab('chapters')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'chapters' && styles.tabTextActive,
              ]}
            >
              Chapters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'reviews' && styles.tabTextActive,
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView style={styles.contentScrollView} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  novelImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  tabsContainer: {
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabsScrollContent: {
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.tabActive,
  },
  tabText: {
    fontSize: 16,
    color: colors.tabInactive,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.tabActive,
    fontWeight: '600',
  },
  contentScrollView: {
    flex: 1,
  },
  tabContent: {
    paddingBottom: 20,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: colors.cardBackground,
  },
  novelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  novelAuthor: {
    fontSize: 16,
    color: colors.tabInactive,
    marginBottom: 15,
  },
  metaInfo: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: '600',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: colors.cardBackground,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 15,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  favoriteButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  chaptersContainer: {
    backgroundColor: colors.cardBackground,
    marginTop: 10,
  },
  chapterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterNumber: {
    fontSize: 14,
    color: colors.tabInactive,
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  reviewsContainer: {
    backgroundColor: colors.cardBackground,
    marginTop: 10,
  },
  reviewItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: colors.tabInactive,
  },
  reviewComment: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  loadingChaptersContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingChaptersText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.tabInactive,
  },
  emptyChaptersContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChaptersText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.tabInactive,
  },
});

export default DetailScreen;
