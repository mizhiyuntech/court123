import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function HomeScreen({ navigation }) {
  const menuItems = [
    {
      title: '终端',
      description: '访问 Ubuntu Proot 环境',
      icon: 'terminal',
      onPress: () => {},
    },
    {
      title: '文件管理',
      description: '管理项目文件',
      icon: 'folder',
      onPress: () => {},
    },
    {
      title: '代码编辑器',
      description: '编写和编辑代码',
      icon: 'code',
      onPress: () => {},
    },
    {
      title: '设置',
      description: '应用配置',
      icon: 'settings',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={4}>
        <Title style={styles.title}>编程 IDE</Title>
        <Paragraph style={styles.subtitle}>开发环境</Paragraph>
      </Surface>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {menuItems.map((item, index) => (
            <Card key={index} style={styles.card} onPress={item.onPress}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Ionicons name={item.icon} size={24} color={Colors.primary} />
                </View>
                <Title style={styles.cardTitle}>{item.title}</Title>
                <Paragraph style={styles.cardDescription}>
                  {item.description}
                </Paragraph>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button textColor={Colors.primary}>打开</Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  cardContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    textAlign: 'center',
    color: Colors.lightText,
  },
  cardActions: {
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
});
