import {useState} from 'react';
import {Pressable, StyleSheet, Text, Touchable, View} from 'react-native';
import Create from './Create';
import Allitem from './Allitem';

const data = [
  {
    id: 1,
    name: 'Rice',
    quantity: 10,
    unit: 'kg',
  },
  {
    id: 2,
    name: 'Mustard oil',
    quantity: 5,
    unit: 'ltr',
  },
  {
    id: 3,
    name: 'Suger',
    quantity: 15,
    unit: 'kg',
  },
  {
    id: 4,
    name: 'Soap',
    quantity: 20,
    unit: 'pkts',
  },
];

const Home = () => {
  const [items, setItems] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.child}>
        <Pressable
          style={[
            styles.button,
            items === 0 ? {backgroundColor: 'black'} : null,
          ]}
          onPress={() => setItems(0)}>
          <Text style={[items === 0 ? {color: 'white'} : null]}>All Items</Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            items === 1 ? {backgroundColor: 'black'} : null,
          ]}
          onPress={() => setItems(1)}>
          <Text style={[items === 1 ? {color: 'white'} : null]}>
            Low Stocks
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            items === 2 ? {backgroundColor: 'black'} : null,
          ]}
          onPress={() => setItems(2)}>
          <Text style={[items === 2 ? {color: 'white'} : null]}>Create</Text>
        </Pressable>
      </View>

      {items === 0 && <Allitem data={data} />}
      {items === 1 && <Allitem data={data.filter(item => item.quantity < 8)} />}
      {items === 2 && <Create />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
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
});
