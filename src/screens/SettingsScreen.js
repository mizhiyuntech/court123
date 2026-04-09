import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from 'react-native';
import { useState } from 'react';
import Colors from '../constants/Colors';

export default function SettingsScreen({ navigation }) {
  const [allowInternalStorage, setAllowInternalStorage] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>返回</Text>
        </Pressable>
        <Text style={styles.headerTitle}>设置</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>存储设置</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemContent}>
              <Text style={styles.settingItemTitle}>允许访问内部存储</Text>
              <Text style={styles.settingItemDescription}>
                启用后可以访问应用的内部存储文件，适合没有 root 权限的设备
              </Text>
            </View>
            <Switch
              value={allowInternalStorage}
              onValueChange={setAllowInternalStorage}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>关于</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemContent}>
              <Text style={styles.settingItemTitle}>版本</Text>
              <Text style={styles.settingItemDescription}>1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 50,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerSpacer: {
    width: 50,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingItemContent: {
    flex: 1,
    marginRight: 16,
  },
  settingItemTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  settingItemDescription: {
    fontSize: 14,
    color: Colors.lightText,
  },
});
