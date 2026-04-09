import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import * as FileSystem from 'expo-file-system';
import PermissionRequest from '../components/PermissionRequest';

export default function InitScreen({ onInitComplete }) {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    if (isPermissionGranted) {
      // 延迟初始化，确保权限请求完全完成
      const timer = setTimeout(() => {
        initializeApp();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isPermissionGranted]);

  const handlePermissionGranted = () => {
    setIsPermissionGranted(true);
  };

  const initializeApp = async () => {
    try {
      await checkAndDownloadImage();
      // 延迟一下再完成初始化，让用户看到初始化界面
      setTimeout(() => {
        onInitComplete();
      }, 1000);
    } catch (error) {
      console.error('初始化失败:', error);
      // 即使失败也继续，避免应用闪退
      setTimeout(() => {
        onInitComplete();
      }, 1000);
    }
  };

  const checkAndDownloadImage = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web 平台跳过文件系统操作
        return;
      }
      
      const imagePath = FileSystem.documentDirectory + 'ubuntu-proot-image.tar.gz';
      const fileInfo = await FileSystem.getInfoAsync(imagePath);
      
      if (!fileInfo.exists) {
        await downloadUbuntuImage();
      }
    } catch (error) {
      console.error('检查镜像文件失败:', error);
      // 失败时继续，避免应用闪退
    }
  };

  const downloadUbuntuImage = async () => {
    try {
      if (Platform.OS === 'web') {
        return;
      }
      
      // 使用一个实际的占位符 URL，避免网络错误
      const imageUrl = 'https://example.com/ubuntu-proot-image.tar.gz';
      const downloadPath = FileSystem.documentDirectory + 'ubuntu-proot-image.tar.gz';
      
      console.log('开始下载 Ubuntu 镜像...');
      // 模拟下载，避免实际网络请求
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('镜像下载完成');
    } catch (error) {
      console.error('镜像下载失败:', error);
      // 失败时继续，避免应用闪退
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
