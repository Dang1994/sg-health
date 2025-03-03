import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

export default function HealthUpdatesScreen() {
  const [location, setLocation] = useState<string | null>(null);
  const [ads, setAds] = useState<
    { id: string; title: string; description: string; date: string; location?: string }[]
  >([]);
  const [videos, setVideos] = useState<
    { id: string; title: string; url: string }[]
  >([]);
  const [posters, setPosters] = useState<
    { id: string; title: string; image: string }[]
  >([]);
  const [news, setNews] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationAndData = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocation('Location access denied');
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;
        setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);

        // Dummy data
        const dummyAds = [
          {
            id: '1',
            title: 'Polio Vaccination Drive',
            description: 'Get your children vaccinated',
            location: 'DangPali School, Po-Rusuda, 768115.',
            date: 'Feb 25th 2025',
          },
          {
            id: '2',
            title: 'Dengue Awareness Camp',
            description: 'Attend the awareness camp at the community hall.',
            date: 'Nov 28, 2024',
          },
          {
            id: '3',
            title: 'Free Health Check-Up Camp',
            description: 'Join us for free check-ups in your village.',
            date: 'Dec 5, 2024',
          },
        ];

        const dummyVideos = [
          {
            id: '1',
            title: 'Ayushman Bharat Yojana',
            url: 'https://www.youtube.com/embed/Zuc8y4rt1TI',
          },
          {
            id: '2',
            title: 'Preventing Dengue',
            url: 'https://www.youtube.com/embed/dummyvideo',
          },
        ];

        const dummyPosters = [
          {
            id: '1',
            title: 'Stay Safe from Dengue',
            image: 'https://via.placeholder.com/150',
          },
          {
            id: '2',
            title: 'Vaccination Saves Lives',
            image: '/health1.jpg',
          },
        ];

        const dummyNews = [
          {
            id: '1',
            title: 'New COVID-19 Guidelines',
            description: 'Wear masks in public spaces and maintain social distancing.',
          },
          {
            id: '2',
            title: 'Health Card Distribution',
            description: 'Government to issue free health cards in rural areas.',
          },
        ];

        setAds(dummyAds);
        setVideos(dummyVideos);
        setPosters(dummyPosters);
        setNews(dummyNews);
        setLoading(false);
      } catch (error) {
        setLocation('Error fetching location');
        setLoading(false);
      }
    };

    fetchLocationAndData();
  }, []);

  const renderPoster = ({
    item,
  }: {
    item: { id: string; title: string; image: string };
  }) => (
    <View style={styles.posterContainer}>
      <Image source={{ uri: item.image }} style={styles.posterImage} />
      <Text style={styles.posterTitle}>{item.title}</Text>
    </View>
  );

  const renderNews = ({
    item,
  }: {
    item: { id: string; title: string; description: string };
  }) => (
    <View style={styles.newsContainer}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </View>
  );

  const renderVideo = ({
    item,
  }: {
    item: { id: string; title: string; url: string };
  }) => (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <WebView
        style={styles.webview}
        source={{ uri: item.url }}
        javaScriptEnabled
        allowsFullscreenVideo
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Updates & Govt Messages</Text>
      </View>

      <ScrollView>
        {/* Location */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Location: {location || 'Fetching location...'}
          </Text>
        </View>

        {/* Ads Section */}
        <View style={styles.adsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#34C759" />
          ) : (
            <FlatList
              data={ads}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.adContainer}>
                  <Text style={styles.adTitle}>{item.title}</Text>
                  <Text style={styles.adDescription}>{item.description}</Text>
                  <Text style={styles.adDate}>{item.date}</Text>
                </View>
              )}
              nestedScrollEnabled
              horizontal
            />
          )}
        </View>

        {/* Posters Section */}
        <View style={styles.postersContainer}>
          <Text style={styles.sectionTitle}>Awareness Posters:</Text>
          <FlatList
            data={posters}
            keyExtractor={(item) => item.id}
            renderItem={renderPoster}
            nestedScrollEnabled
            horizontal
          />
        </View>

        {/* News Section */}
        <View style={styles.newsContainer}>
          <Text style={styles.sectionTitle}>News & Announcements:</Text>
          <FlatList
            data={news}
            keyExtractor={(item) => item.id}
            renderItem={renderNews}
            nestedScrollEnabled
          />
        </View>

        {/* Videos Section */}
        <View style={styles.videosContainer}>
          <Text style={styles.sectionTitle}>Educational Videos:</Text>
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={renderVideo}
            nestedScrollEnabled
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationContainer: {
    padding: 16,
    backgroundColor: '#FFF9C4',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  locationText: {
    fontSize: 16,
    color: '#757575',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  adsContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  adContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
  adDescription: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
  adDate: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 8,
  },
  postersContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  posterContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  posterImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  posterTitle: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#333333',
  },
  newsContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 14,
    color: '#555555',
  },
  videosContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  videoContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  webview: {
    height: 200,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
});


