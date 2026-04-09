import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

export default function HomeScreen({ navigation }) {
  const menuItems = [
    {
      title: '终端',
      description: '访问 Ubuntu Proot 环境',
      onPress: () => {},
    },
    {
      title: '文件管理',
      description: '管理项目文件',
      onPress: () => {},
    },
    {
      title: '代码编辑器',
      description: '编写和编辑代码',
      onPress: () => {},
    },
    {
      title: '设置',
      description: '应用配置',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>编程 IDE</Text>
        <Text style={styles.subtitle}>开发环境</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {menuItems.map((item, index) => (
          <Pressable 
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
          </Pressable>
        ))}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: Colors.lightText,
  },
});
