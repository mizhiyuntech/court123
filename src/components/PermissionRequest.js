import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

export default function PermissionRequest({ onPermissionGranted }) {
  const [showDialog, setShowDialog] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    // 延迟请求权限，避免启动时的冲突
    const timer = setTimeout(() => {
      checkPermission();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const checkPermission = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web 平台跳过权限请求
        onPermissionGranted();
        return;
      }
      
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionStatus(status);
      
      if (status === 'granted') {
        onPermissionGranted();
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      console.error('权限请求失败:', error);
      // 权限请求失败时仍然继续，避免应用闪退
      onPermissionGranted();
    }
  };

  const requestPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionStatus(status);
      
      if (status === 'granted') {
        setShowDialog(false);
        onPermissionGranted();
      } else {
        Alert.alert(
          '权限被拒绝',
          '请在设置中手动开启存储权限，否则应用无法正常使用。',
          [{ text: '确定' }]
        );
        // 即使权限被拒绝，也继续应用流程
        setTimeout(() => {
          onPermissionGranted();
        }, 1000);
      }
    } catch (error) {
      console.error('权限请求失败:', error);
      setShowDialog(false);
      onPermissionGranted();
    }
  };

  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={() => {
        setShowDialog(false);
        // 取消时也继续应用流程
        setTimeout(() => {
          onPermissionGranted();
        }, 500);
      }}>
        <Dialog.Title>需要存储权限</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.message}>
            为了能够下载和管理 Ubuntu Proot 镜像，应用需要访问您的存储权限。
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => {
            setShowDialog(false);
            // 取消时也继续应用流程
            setTimeout(() => {
              onPermissionGranted();
            }, 500);
          }}>取消</Button>
          <Button onPress={requestPermission}>授予权限</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    lineHeight: 24,
  },
});
