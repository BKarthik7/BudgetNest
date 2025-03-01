import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Config from 'react-native-config';

const AccountsScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [bankAccountBalance, setBankAccountBalance] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/allExpenses`);
      setExpenses(response.data);
      console.log('Expenses', response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const totalIncome = expenses
    ?.filter(expense => expense.type == 'Income')
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const totalExpense = expenses
    .filter(expense => expense.type == 'Expense')
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const totalSpentCash = expenses
    .filter(expense => expense.type == 'Expense' && expense.account == 'Cash')
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const calculateTotal = () => {
    let bankBalance = 0;

    expenses?.forEach(expense => {
      const {account, amount, type} = expense;

      const numericAmount = parseFloat(amount);
      if (account == 'Bank Accounts') {
        if (type == 'Expense') {
          bankBalance -= numericAmount;
        } else if (type == 'Income') {
          bankBalance += numericAmount;
        }
      }
    });

    setBankAccountBalance(bankBalance);
  };

  useEffect(() => {
    calculateTotal();
  }, [expenses]);
  return (
    <SafeAreaView>
      <View style={{backgroundColor: 'white', padding: 10}}>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: '500'}}>
          Accounts
        </Text>
      </View>
      <View style={{borderColor: '#E0E0E0', borderWidth: 0.4}} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 12,
          paddingBottom: 12,
          justifyContent: 'space-around',
          backgroundColor: 'white',
        }}>
        <View>
          <Text
            style={{fontWeight: '500', color: '#004953', textAlign: 'center'}}>
            Assets
          </Text>
          <Text
            style={{
              marginTop: 5,
              textAlign: 'center',
              color: '#0578eb',
              fontSize: 15,
              fontWeight: '500',
            }}>
            ₹{totalIncome.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text style={{fontWeight: '500', color: '#004953'}}>Liabilities</Text>
          <Text
            style={{
              marginTop: 5,
              textAlign: 'center',
              color: '#eb6105',
              fontSize: 15,
              fontWeight: '500',
            }}>
            ₹{totalExpense.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text
            style={{fontWeight: '500', color: '#004953', textAlign: 'center'}}>
            Total
          </Text>
          <Text
            style={{
              marginTop: 5,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '500',
            }}>
            ₹{Number(totalIncome - totalExpense).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={{borderColor: '#E0E0E0', borderWidth: 0.8}} />

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
          }}>
          <Text>Cash</Text>
          <Text style={{color: '#eb6105'}}>₹{totalSpentCash.toFixed(2)}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            backgroundColor: 'white',
          }}>
          <Text>Cash</Text>
          <Text style={{color: '#eb6105'}}>₹{totalSpentCash.toFixed(2)}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
          }}>
          <Text>Accounts</Text>
          <Text style={{color: '#0578eb'}}>
            ₹{bankAccountBalance.toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            backgroundColor: 'white',
          }}>
          <Text>Bank Accounts</Text>
          <Text style={{color: '#0578eb'}}>
            ₹{bankAccountBalance.toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
          }}>
          <Text>Card</Text>
          <Text>₹3550.00</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            backgroundColor: 'white',
          }}>
          <Text>Card</Text>
          <Text>₹3550.00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({});
