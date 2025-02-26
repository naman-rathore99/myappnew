import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Create from './Create';
import Allitem from './Allitem';

const Home = () => {
  const [data, setData] = useState([

  ]);

  const [screen, setScreen] = useState(0); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {/* Navigation Buttons */}
      <View style={styles.child}>
        <Pressable
          style={[styles.button, screen === 0 && styles.activeButton]}
          onPress={() => setScreen(0)}>
          <Text style={screen === 0 && styles.activeText}>All Items</Text>
        </Pressable>

        <Pressable
          style={[styles.button, screen === 1 && styles.activeButton]}
          onPress={() => setScreen(1)}>
          <Text style={screen === 1 && styles.activeText}>Low Stocks</Text>
        </Pressable>

        <Pressable
          style={[styles.button, screen === 2 && styles.activeButton]}
          onPress={() => setScreen(2)}>
          <Text style={screen === 2 && styles.activeText}>Create</Text>
        </Pressable>
      </View>
      {/* Dynamic Content */}
      {screen === 0 && <Allitem data={data} />}
      {screen === 1 && (
        <Allitem data={data.filter(item => item.quantity < 8)} />
      )}
      {screen === 2 && <Create setData={setData} />} 
    </View>
  );
};

export default Home;

// Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  child: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: 'black',
  },
  activeText: {
    color: 'white',
  },
});
