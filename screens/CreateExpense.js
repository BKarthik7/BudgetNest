import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';

import Ionicons from '@react-native-vector-icons/ionicons';

const CreateExpense = () => {
  const [option, setOption] = useState('Income');
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(moment());
  const formattedDate = currentDate.format('DD/MM/YY (ddd)');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [amount, setAmount] = useState('');
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');

  const items = [
    'Food',
    'Social Life',
    'Pets',
    'Transport',
    'Culture',
    'Household',
    'Apparel',
    'Beauty',
    'Health',
    'Education',
    'Gift',
    'Other',
    'Leisure',
    'Bills',
  ];

  const newItems = [
    'Allowance',
    'Salary',
    'Petty Cash',
    'Bonus',
    'Other',
    'Add',
  ];

  const displayedItems = option === 'Income' ? newItems : items;

  const setShowCalculatorStatus = () => {
    setShowCategory(false);
    setShowAccount(false);
    setShowCalculator(!showCalculator);
  };

  const setCategoryStatus = () => {
    setShowAccount(false);
    setShowCalculator(false);
    setShowCategory(true);
  };

  const setAccountStatus = () => {
    setShowCalculator(false);
    setShowCategory(false);
    setShowAccount(true);
  };

  const selectCategory = option => {
    setCategory(option);
    setShowCategory(false);
  };

  const selectAccount = option => {
    setAccount(option);
    setShowAccount(false);
  };

  const accounts = ['Cash', 'Bank Accounts', 'Card'];

  const handlePress = value => {
    if (value == 'OK') {
      setShowCalculator(false);
      return;
    }
    if (value == '=') {
      try {
        setInput(eval(input).toString());
      } catch (error) {
        console.log('err', error);
      }
    } else if (value == 'C') {
      setInput('');
    } else {
      setInput(input + value);
    }
  };

  const handleCreateExpense = async () => {
    try {
      const expense = {
        type: option,
        description: description,
        account: account,
        category: category,
        amount: input,
        date: currentDate.format('MMMM YYYY'),
        note: note,
        day: currentDate.format('DD ddd'),
      };
      
      const response = await axios.post(
        `${Config.BACKEND_URL}/expenses`,
        expense,
      );

      setOption('');
      setDescription('');
      setAccount('');
      setCategory('');
      setInput('');
      setNote('');

      navigation.goBack();
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 12,
          }}>
          <Ionicons name="search-outline" size={23} color="#505050" />

          <Text>Expense</Text>

          <Ionicons name="filter-outline" size={23} color="#505050" />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 15,
            justifyContent: 'space-around',
          }}>
          <Pressable
            onPress={() => setOption('Income')}
            style={{
              backgroundColor: option == 'Income' ? 'white' : '#F5F5F5',
              paddingHorizontal: 30,
              paddingVertical: 5,
              borderRadius: 6,
              borderWidth: 0.8,
              borderColor: option == 'Income' ? '#007FFF' : '#D0D0D0',
            }}>
            <Text>Income</Text>
          </Pressable>

          <Pressable
            onPress={() => setOption('Expense')}
            style={{
              backgroundColor: option == 'Expense' ? 'white' : '#F5F5F5',
              paddingHorizontal: 30,
              paddingVertical: 5,
              borderRadius: 6,
              borderWidth: 0.8,
              borderColor: option == 'Expense' ? 'orange' : '#D0D0D0',
            }}>
            <Text>Expense</Text>
          </Pressable>

          <Pressable
            onPress={() => setOption('Transfer')}
            style={{
              backgroundColor: option == 'Transfer' ? 'white' : '#F5F5F5',
              paddingHorizontal: 30,
              paddingVertical: 5,
              borderRadius: 6,
              borderWidth: 0.8,
              borderColor: option == 'Transfer' ? 'black' : '#D0D0D0',
            }}>
            <Text>Transfer</Text>
          </Pressable>
        </View>

        <View style={{marginHorizontal: 12, gap: 20, marginTop: 7}}>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Text style={{width: 60, color: '#484848'}}>Date</Text>

            <Pressable style={{flex: 1}}>
              <TextInput
                placeholderTextColor={'black'}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8E8E8',
                  paddingBottom: 10,
                }}
                placeholder={formattedDate}
              />
            </Pressable>
          </View>

          <Pressable
            onPress={setShowCalculatorStatus}
            style={{flexDirection: 'row', gap: 12}}>
            <Text style={{width: 60, color: '#484848'}}>Amount</Text>
            <Pressable style={{flex: 1}}>
              <TextInput
                editable={false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8E8E8',
                  paddingBottom: 10,
                }}
                placeholder={input}
                placeholderTextColor={'black'}
              />
            </Pressable>
          </Pressable>

          <Pressable
            onPress={setCategoryStatus}
            style={{flexDirection: 'row', gap: 12}}>
            <Text style={{width: 60, color: '#484848'}}>Category</Text>
            <Pressable style={{flex: 1}}>
              <TextInput
                editable={false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8E8E8',
                  paddingBottom: 10,
                }}
                placeholder={category}
                placeholderTextColor={'black'}
              />
            </Pressable>
          </Pressable>

          <Pressable
            onPress={setAccountStatus}
            style={{flexDirection: 'row', gap: 12}}>
            <Text style={{width: 60, color: '#484848'}}>Account</Text>
            <Pressable style={{flex: 1}}>
              <TextInput
                editable={false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8E8E8',
                  paddingBottom: 10,
                }}
                placeholder={account}
                placeholderTextColor={'black'}
              />
            </Pressable>
          </Pressable>

          <View style={{flexDirection: 'row', gap: 12}}>
            <Text style={{width: 60, color: '#484848'}}>Note</Text>

            <Pressable style={{flex: 1}}>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholderTextColor={'black'}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8E8E8',
                  paddingBottom: 10,
                }}
                placeholder={''}
              />
            </Pressable>
          </View>

          <View
            style={{height: 10, backgroundColor: '#F0F0F0', borderRadius: 5}}
          />

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <Pressable style={{flex: 1}}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                placeholderTextColor={'black'}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8E8E8',
                  paddingBottom: 10,
                }}
              />
            </Pressable>
          </View>

          <Pressable
            onPress={handleCreateExpense}
            style={{
              backgroundColor: 'orange',
              padding: 10,
              borderRadius: 7,
            }}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: '600'}}>
              Save
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {showCalculator && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: 'black',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
              Amount
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
              <Ionicons name="create-outline" size={23} color="white" />
              <Ionicons name="crop-outline" size={23} color="white" />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {[
              '+',
              '-',
              '*',
              '/',
              '7',
              '8',
              '9',
              '=',
              '4',
              '5',
              '6',
              'C',
              '1',
              '2',
              '3',
              '0',
              '0',
              'OK',
            ].map((item, index) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                key={index}
                style={{
                  width: item === '0' ? '24.5%' : '24%',
                  height: 70,
                  aspectRatio: 1.5,
                  borderWidth: 0.6,
                  borderColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: -0.3,
                  backgroundColor: item === '=' ? '#ff4d4d' : 'white',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    color: item === '=' ? '#fff' : '#000',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {showCategory && (
        <View style={{height: 400}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: 'black',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
              Category
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
              <Ionicons name="create-outline" size={23} color="white" />
              <Ionicons name="crop-outline" size={23} color="white" />
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignContent: 'stretch',
              }}>
              {displayedItems?.map((item, index) => (
                <Pressable
                  onPress={() => selectCategory(item)}
                  style={{
                    width: '33.33%',
                    aspectRatio: 2,
                    borderWidth: 0.6,
                    borderColor: '#E0E0E0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: -0.3,
                  }}>
                  <Text>{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}

      {showAccount && (
        <View style={{height: 400}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: 'black',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
              Account
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
              <Ionicons name="create-outline" size={23} color="white" />
              <Ionicons name="crop-outline" size={23} color="white" />
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignContent: 'stretch',
              }}>
              {accounts?.map((item, index) => (
                <Pressable
                  onPress={() => selectAccount(item)}
                  style={{
                    width: '33.33%',
                    aspectRatio: 2,
                    borderWidth: 0.6,
                    borderColor: '#E0E0E0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: -0.3,
                  }}>
                  <Text style={{textAlign: 'center'}}>{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateExpense;

const styles = StyleSheet.create({});
