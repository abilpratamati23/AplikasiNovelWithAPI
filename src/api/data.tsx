// Type definition untuk data Novel
export type Novel = {
  id: string;
  nama_novel: string;
  author: string;
  tanggal_rilis: number;
  genre: string;
  sinopsis: string;
};

// Type definition untuk data Chapter
export type ChapterData = {
  id: string;
  Chapter: number;
};

// URL API endpoints
const API_BASE_URL = 'https://69021f43b208b24affe51b80.mockapi.io/API/Novel/Novels';
const API_CHAPTERS_URL = 'https://69021f43b208b24affe51b80.mockapi.io/API/Novel/Chapters';

/**
 * Mengambil semua data novel dari API
 * @returns Promise array of Novel atau empty array jika error
 */
export async function fetchNovels(): Promise<Novel[]> {
  try {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch novels');
    return await res.json();
  } catch (error) {
    console.error('Error fetching novels:', error);
    return [];
  }
}

/**
 * Mengambil data novel berdasarkan ID
 * @param id - ID novel yang akan diambil
 * @returns Promise Novel atau null jika error/tidak ditemukan
 */
export async function fetchNovelById(id: string): Promise<Novel | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch novel');
    return await res.json();
  } catch (error) {
    console.error('Error fetching novel:', error);
    return null;
  }
}

/**
 * Mengambil semua data chapters dari API
 * @returns Promise array of ChapterData atau empty array jika error
 */
export async function fetchChapters(): Promise<ChapterData[]> {
  try {
    const res = await fetch(API_CHAPTERS_URL);
    if (!res.ok) throw new Error('Failed to fetch chapters');
    return await res.json();
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return [];
  }
}

/**
 * Mengambil jumlah chapter berdasarkan novel ID
 * @param novelId - ID novel yang akan dicari jumlah chapternya
 * @returns Promise number (jumlah chapter) atau null jika tidak ditemukan
 */
export async function fetchChapterByNovelId(novelId: string): Promise<number | null> {
  try {
    const chapters = await fetchChapters();
    const chapterData = chapters.find((ch) => ch.id === novelId);
    return chapterData ? chapterData.Chapter : null;
  } catch (error) {
    console.error('Error fetching chapter by novel id:', error);
    return null;
  }
}