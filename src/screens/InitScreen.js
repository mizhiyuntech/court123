import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import * as FileSystem from 'expo-file-system';
import PermissionRequest from '../components/PermissionRequest';

export default function InitScreen({ onInitComplete }) {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    if (isPermissionGranted) {
      initializeApp();
    }
  }, [isPermissionGranted]);

  const handlePermissionGranted = () => {
    setIsPermissionGranted(true);
  };

  const initializeApp = async () => {
    try {
      await checkAndDownloadImage();
      onInitComplete();
    } catch (error) {
      console.error('初始化失败:', error);
      onInitComplete();
    }
  };

  const checkAndDownloadImage = async () => {
    const imagePath = FileSystem.documentDirectory + 'ubuntu-proot-image.tar.gz';
    const fileInfo = await FileSystem.getInfoAsync(imagePath);
    
    if (!fileInfo.exists) {
      await downloadUbuntuImage();
    }
  };

  const downloadUbuntuImage = async () => {
    const imageUrl = 'https://example.com/ubuntu-proot-image.tar.gz';
    const downloadPath = FileSystem.documentDirectory + 'ubuntu-proot-image.tar.gz';
    
    try {
      const downloadResult = await FileSystem.downloadAsync(
        imageUrl,
        downloadPath
      );
      console.log('镜像下载完成:', downloadResult.uri);
    } catch (error) {
      console.error('镜像下载失败:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>初始化中</Text>
      <Text style={styles.subtitle}>正在准备开发环境</Text>
      <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      <PermissionRequest onPermissionGranted={handlePermissionGranted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});
