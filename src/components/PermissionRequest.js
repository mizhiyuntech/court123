import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

export default function PermissionRequest({ onPermissionGranted }) {
  const [showDialog, setShowDialog] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setPermissionStatus(status);
    
    if (status === 'granted') {
      onPermissionGranted();
    } else {
      setShowDialog(true);
    }
  };

  const requestPermission = async () => {
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
    }
  };

  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
        <Dialog.Title>需要存储权限</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.message}>
            为了能够下载和管理 Ubuntu Proot 镜像，应用需要访问您的存储权限。
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowDialog(false)}>取消</Button>
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
