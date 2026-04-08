import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from '../constants/Colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎使用</Text>
      <Text style={styles.subtitle}>这是一个基础应用框架</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="前往详情页"
          color={Colors.primary}
          onPress={() => navigation.navigate('Details')}
        />
      </View>
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
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
