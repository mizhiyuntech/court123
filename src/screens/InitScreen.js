import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import * as FileSystem from 'expo-file-system';

export default function InitScreen({ onInitComplete }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [status, setStatus] = useState('准备中');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await checkAndDownloadImage();
      // 延迟一下再完成初始化，让用户看到初始化界面
      setTimeout(() => {
        onInitComplete();
      }, 1000);
    } catch (error) {
      console.error('初始化失败:', error);
      setStatus('初始化失败，将继续启动');
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
        setStatus('Web 平台跳过镜像下载');
        return;
      }
      
      setStatus('检查镜像文件...');
      const imagePath = FileSystem.documentDirectory + 'ubuntu-proot-image.tar.xz';
      const fileInfo = await FileSystem.getInfoAsync(imagePath);
      
      if (!fileInfo.exists) {
        await downloadUbuntuImage();
      } else {
        setStatus('镜像文件已存在');
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
      
      // 真实的镜像下载 URL
      const imageUrl = 'https://github.com/termux/proot-distro/releases/download/v4.12.0/ubuntu-aarch64.tar.xz';
      const downloadPath = FileSystem.documentDirectory + 'ubuntu-proot-image.tar.xz';
      
      setStatus('开始下载 Ubuntu 镜像...');
      
      // 执行真实的下载，带进度回调
      const downloadResult = await FileSystem.downloadAsync(
        imageUrl,
        downloadPath,
        {
          progressCallback: (downloadProgress) => {
            const progress = Math.round((downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100);
            setDownloadProgress(progress);
            setStatus(`下载中: ${progress}%`);
          },
        }
      );
      
      setStatus('镜像下载完成');
      console.log('镜像下载完成:', downloadResult.uri);
    } catch (error) {
      console.error('镜像下载失败:', error);
      setStatus('下载失败，将继续启动');
      // 失败时继续，避免应用闪退
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>初始化中</Text>
      <Text style={styles.status}>{status}</Text>
      {downloadProgress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${downloadProgress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{downloadProgress}%</Text>
        </View>
      )}
      <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
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
  status: {
    fontSize: 16,
    color: Colors.lightText,
    marginBottom: 30,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 30,
  },
  progressBar: {
    height: 10,
    backgroundColor: Colors.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
    color: Colors.primary,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
});
