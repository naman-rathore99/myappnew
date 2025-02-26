import {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Create = ({setData}) => {
  const [itemName, setItemName] = useState('');
  const [stock, setStock] = useState(0);
  const [unit, setUnit] = useState('kg');
  const [customUnit, setCustomUnit] = useState('');
  const [units, setUnits] = useState([
    'kg',
    'ltr',
    'ml',
    'g',
    'pcs',
    'Create New Type',
  ]);
  const [recentItems, setRecentItems] = useState([]);

  const handleAddItem = () => {
    if (!itemName.trim() || !stock.trim()) return;

    const newItem = {
      id: Date.now(),
      name: itemName,
      quantity: parseInt(stock, 10),
      unit: unit === 'Create New Type' ? customUnit : unit,
    };

    setData(prevData => [...prevData, newItem]);

    setRecentItems(prevItems => {
      const updatedItems = [newItem, ...prevItems];
      return updatedItems.length > 5 ? updatedItems.slice(0, 5) : updatedItems;
    });

    setItemName('');
    setStock('');
    if (unit === 'Create New Type') setCustomUnit('');
  };

  const handleIncrease = () =>
    setStock(prev => (prev ? String(parseInt(prev) + 1) : '1'));
  const handleDecrease = () =>
    setStock(prev =>
      prev && parseInt(prev) > 0 ? String(parseInt(prev) - 1) : '0',
    );

  const handleAddUnit = () => {
    if (customUnit.trim() && !units.includes(customUnit)) {
      setUnits([...units.slice(0, -1), customUnit, 'Create New Type']);
      setUnit(customUnit);
      setCustomUnit('');
    }
  };

  const handleDeleteItem = id => {
    setRecentItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Entry</Text>

      <TextInput
        placeholder="Enter the item name"
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />
      <View style={styles.details}>
        <View style={styles.quantityRow}>
          <Pressable onPress={handleDecrease} style={styles.quantityButton}>
            <Text style={styles.add}>-</Text>
          </Pressable>
          <TextInput
            style={[styles.input, styles.quantityInput]}
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
          />
          <Pressable onPress={handleIncrease} style={styles.quantityButton}>
            <Text style={styles.add}>+</Text>
          </Pressable>
        </View>

        <Picker
          selectedValue={unit}
          style={styles.picker}
          onValueChange={itemValue => setUnit(itemValue)}>
          {units.map((u, index) => (
            <Picker.Item key={index} label={u} value={u} />
          ))}
        </Picker>

        {unit === 'Create New Type' && (
          <>
            <TextInput
              placeholder="Add new unit"
              style={styles.input}
              value={customUnit}
              onChangeText={setCustomUnit}
            />
            <Pressable onPress={handleAddUnit} style={styles.addButton}>
              <Text style={styles.buttonText}>Add Unit</Text>
            </Pressable>
          </>
        )}
      </View>
      <Pressable style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </Pressable>

      <Text style={styles.subtitle}>Recently Added Items (Last 5):</Text>
      <FlatList
        data={recentItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemRow}>
            <Text>
              {item.name} - {item.quantity} {item.unit}
            </Text>
            <Pressable
              onPress={() => handleDeleteItem(item.id)}
              style={styles.deleteButton}>
              <Text style={styles.buttonText}>X</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {padding: 5},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 50,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  add: {fontSize: 20},

  quantityButton: {borderWidth: 1, padding: 10, borderRadius: 10},
  quantityInput: {width: 35, height: 45, textAlign: 'center'},
  picker: {height: 50, width: '50%', marginBottom: 10},
  addButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  subtitle: {fontSize: 18, fontWeight: 'bold', marginTop: 20},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
});
