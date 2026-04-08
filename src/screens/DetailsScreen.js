import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from '../constants/Colors';

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>详情页面</Text>
      <Text style={styles.content}>这是一个示例详情页面</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="返回首页"
          color={Colors.primary}
          onPress={() => navigation.goBack()}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: Colors.lightText,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
