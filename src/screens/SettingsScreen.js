import { StyleSheet, View, ScrollView } from 'react-native';
import { Surface, Appbar, List, Switch, Divider, Text } from 'react-native-paper';
import { useState } from 'react';
import Colors from '../constants/Colors';

export default function SettingsScreen({ navigation }) {
  const [allowInternalStorage, setAllowInternalStorage] = useState(false);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="设置" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Surface style={styles.section} elevation={2}>
          <List.Section>
            <List.Subheader>存储设置</List.Subheader>
            <List.Item
              title="允许访问内部存储"
              description="启用后可以访问应用的内部存储文件，适合没有 root 权限的设备"
              right={() => (
                <Switch
                  value={allowInternalStorage}
                  onValueChange={setAllowInternalStorage}
                  color={Colors.primary}
                />
              )}
            />
          </List.Section>
        </Surface>

        <Surface style={styles.section} elevation={2}>
          <List.Section>
            <List.Subheader>关于</List.Subheader>
            <List.Item
              title="版本"
              description="1.0.0"
              right={() => <Text style={styles.versionText}>1.0.0</Text>}
            />
            <Divider />
            <List.Item
              title="开发者"
              description="编程 IDE 团队"
            />
          </List.Section>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  section: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  versionText: {
    color: Colors.lightText,
  },
});
