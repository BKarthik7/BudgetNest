import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Config from 'react-native-config';
import {BottomModal} from 'react-native-modals';
import {ModalContent} from 'react-native-modals';
import {SlideAnimation} from 'react-native-modals';
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const HomeScreen = () => {
  const [option, setOption] = useState('Daily');
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(moment());
  const [expenses, setExpenses] = useState([]);
  const date = currentDate.format('MMMM YYYY');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const day = moment(currentData?.item?.date).format('DD'); //10
  const monthYear = moment(currentData?.item?.date).format('MM YYYY');
  const dayName = moment(currentData?.item?.date).format('ddd');

  const setOpenModal = (item, dayExpenses, totalIncome, totalExpense) => {
    setCurrentData({item, dayExpenses, totalIncome, totalExpense});

    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentDate]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/expenses`, {
        params: {date},
      });
      setExpenses(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => moment(prevDate).subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => moment(prevDate).add(1, 'month'));
  };

  const totalIncome = expenses
    ?.filter(expense => expense.type == 'Income')
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const totalExpense = expenses
    .filter(expense => expense.type == 'Expense')
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const day = expense.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(expense);
    return acc;
  }, {});

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [navigation]),
  );

  const screenWidth = Dimensions.get('window').width;
  const boxWidth = screenWidth / 7 - 8;

  const [selectedMonth, setSelectedMonth] = useState(moment());

  const generateDaysForMonth = month => {
    const startOfMonth = month.clone().startOf('month');
    const endOfMonth = month.clone().endOf('month');

    const startDate = startOfMonth.clone().startOf('week');
    const endDate = endOfMonth.clone().endOf('week');

    const days = [];
    let date = startDate.clone();

    while (date.isBefore(endDate, 'day')) {
      days.push({
        date: date.clone(),
        isCurrentMonth: date.month() === selectedMonth.month(),
      });
      date.add(1, 'day');
    }

    return days;
  };

  const renderDay = ({item}) => {
    const isSunday = item?.date.day() === 0;
    const isSaturday = item?.date.day() === 6;
    const isToday = item?.date.isSame(moment(), 'day');

    const dayKey = item?.date.format('DD ddd').trim();

    const dayExpenses = groupedExpenses[dayKey] || [];

    const totalIncome = dayExpenses
      .filter(expense => expense.type == 'Income')
      .reduce((total, expense) => total + parseFloat(expense.amount), 0);

    const totalExpense = dayExpenses
      .filter(expense => expense.type == 'Expense')
      .reduce((total, expense) => total + parseFloat(expense.amount), 0);

    const totalSavings = totalIncome - totalExpense;

    return (
      <Pressable
        onPress={() =>
          setOpenModal(item, dayExpenses, totalIncome, totalExpense)
        }
        style={[
          {
            width: boxWidth,
            height: 90,
            margin: 4,
            borderRadius: 4,
            backgroundColor: 'white',
          },
          isToday && {backgroundColor: '#b6f0b8'},
          isSunday && {backgroundColor: '#ffe5e5'},
          isSaturday && {backgroundColor: '#e5f1ff'},
        ]}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            textAlign: 'center',
            color: isSunday ? '#db784b' : isSaturday ? '#4e91de' : 'black',
            marginLeft: 2,
          }}>
          {item?.date.date()}
        </Text>

        <View style={{marginTop: 'auto', marginBottom: 5}}>
          {totalIncome > 0 && (
            <Text
              style={{
                fontSize: 10,
                color: '#0578eb',
                textAlign: 'left',
                marginLeft: 2,
                fontWeight: '500',
              }}>
              {totalIncome.toFixed(2)}
            </Text>
          )}

          {totalExpense > 0 && (
            <Text
              style={{
                fontSize: 10,
                color: '#eb6105',
                textAlign: 'left',
                marginLeft: 2,
                fontWeight: '500',
              }}>
              {totalExpense.toFixed(2)}
            </Text>
          )}

          {totalSavings > 0 && (
            <Text
              style={{
                fontSize: 10,
                color: 'black',
                textAlign: 'left',
                marginLeft: 2,
                fontWeight: '500',
              }}>
              {totalSavings.toFixed(2)}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const days = generateDaysForMonth(currentDate);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 12,
            backgroundColor: 'white',
          }}>
          <Ionicons name="search-outline" size={23} color={'black'} />

          <Text>Money Manager</Text>

          <Ionicons name="filter-outline" size={23} color={'black'} />
        </View>

        <View
          style={{
            paddingTop: 15,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          <MaterialDesignIcons
            onPress={handlePrevMonth}
            name="chevron-left"
            size={23}
            color="black"
          />

          <Text>{currentDate.format('MMM YYYY')}</Text>

          <MaterialDesignIcons
            onPress={handleNextMonth}
            name="chevron-right"
            size={23}
            color="black"
          />
        </View>

        <View
          style={{
            paddingTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: 'white',
          }}>
          <Pressable onPress={() => setOption('Daily')}>
            <Text
              style={{
                color: option == 'Daily' ? 'black' : 'gray',
                fontSize: 14,
                fontWeight: '500',
              }}>
              Daily
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Calendar')}>
            <Text
              style={{
                color: option == 'Calendar' ? 'black' : 'gray',
                fontSize: 14,
                fontWeight: '500',
              }}>
              Calendar
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Monthly')}>
            <Text
              style={{
                color: option == 'Monthly' ? 'black' : 'gray',
                fontSize: 14,
                fontWeight: '500',
              }}>
              Monthly
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Summary')}>
            <Text
              style={{
                color: option == 'Summary' ? 'black' : 'gray',
                fontSize: 14,
                fontWeight: '500',
              }}>
              Summary
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Description')}>
            <Text
              style={{
                color: option == 'Description' ? 'black' : 'gray',
                fontSize: 14,
                fontWeight: '500',
              }}>
              Description
            </Text>
          </Pressable>
        </View>

        <View>
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
                style={{
                  fontWeight: '500',
                  color: '#004953',
                  textAlign: 'center',
                }}>
                Expense
              </Text>
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
                style={{
                  fontWeight: '500',
                  color: '#004953',
                  textAlign: 'center',
                }}>
                Income
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
              <Text
                style={{
                  fontWeight: '500',
                  color: '#004953',
                  textAlign: 'center',
                }}>
                Total
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  textAlign: 'center',
                  color: '#0578eb',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                ₹ {(totalIncome - totalExpense).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={{borderColor: '#E0E0E0', borderWidth: 0.6}} />

          {option == 'Daily' && (
            <ScrollView>
              <View>
                {Object.keys(groupedExpenses).map((item, index) => {
                  const totalExpense = groupedExpenses[item]
                    .filter(expense => expense.type == 'Expense')
                    .reduce(
                      (sum, expense) => sum + parseFloat(expense.amount),
                      0,
                    );

                  const totalIncome = groupedExpenses[item]
                    .filter(expense => expense.type == 'Income')
                    .reduce(
                      (sum, expense) => sum + parseFloat(expense.amount),
                      0,
                    );

                  return (
                    <Pressable
                      key={index}
                      style={{
                        padding: 12,
                        marginBottom: 10,
                        backgroundColor: 'white',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                          }}>
                          <Text style={{fontSize: 16, fontWeight: '500'}}>
                            {item?.split(' ')[0]}
                          </Text>
                          <Text
                            style={{
                              backgroundColor: '#404040',
                              borderRadius: 4,
                              paddingHorizontal: 4,
                              paddingVertical: 2,
                              color: '#000',
                              fontSize: 11,
                              color: 'white',
                            }}>
                            {item?.split(' ')[1]}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 50,
                          }}>
                          <Text
                            style={{
                              color: '#0578eb',
                              fontWeight: '400',
                              fontSize: 15,
                            }}>
                            ₹{totalIncome.toFixed(2)}
                          </Text>
                          <Text
                            style={{
                              color: '#eb6105',
                              fontWeight: '400',
                              fontSize: 15,
                            }}>
                            ₹{totalExpense.toFixed(2)}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          borderColor: '#E0E0E0',
                          borderWidth: 0.4,
                          marginTop: 7,
                        }}
                      />

                      {groupedExpenses[item].map((item, index) => (
                        <Pressable style={{marginTop: 18}} key={index}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 30,
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                color: 'gray',
                                minWidth: 70,
                              }}>
                              {item?.category}
                            </Text>

                            <View style={{flex: 1}}>
                              <Text style={{fontSize: 14, color: 'gray'}}>
                                {item?.account}
                              </Text>
                              {item?.note && (
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'gray',
                                    marginTop: 2,
                                  }}>
                                  {item?.note}
                                </Text>
                              )}
                            </View>

                            <Text
                              style={{
                                color:
                                  item?.type == 'Expense'
                                    ? '#eb6105'
                                    : '#0578eb',
                              }}>
                              ₹{Number(item.amount).toFixed(2)}
                            </Text>
                          </View>
                        </Pressable>
                      ))}
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          )}

          {option == 'Calendar' && (
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  backgroundColor: '#E0E0E0',
                  paddingVertical: 5,
                }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                  (day, index) => (
                    <Text
                      style={[
                        {
                          fontSize: 13,
                          fontWeight: '500',
                          textAlign: 'center',
                          width: boxWidth,
                          paddingBlock: 3,
                        },
                        day == 'Sun' && {color: 'orange'},
                        day == 'Sat' && {color: 'blue'},
                      ]}>
                      {day}
                    </Text>
                  ),
                )}
              </View>

              <FlatList
                data={days}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderDay}
                numColumns={7}
                scrollEnabled={false}
              />
            </ScrollView>
          )}

          {option == 'Summary' && (
            <View style={{backgroundColor: 'white'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                  padding: 12,
                }}>
                <Ionicons name="layers-outline" size={24} color="black" />
                <Text style={{fontSize: 14, fontWeight: '500'}}>Accounts</Text>
              </View>

              <View
                style={{
                  marginTop: 7,
                  marginHorizontal: 12,
                  padding: 12,
                  borderColor: '#E0E0E0',
                  borderWidth: 0.7,
                  borderRadius: 6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 15, color: 'gray'}}>
                  Exp. (Cash, Accounts)
                </Text>

                <Text style={{fontSize: 15, color: 'gray'}}>963.00</Text>
              </View>

              <View
                style={{height: 14, backgroundColor: '#E0E0E0', marginTop: 20}}
              />

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                    padding: 12,
                  }}>
                  <Ionicons name="wallet-outline" size={24} color="black" />
                  <Text style={{fontSize: 14, fontWeight: '500'}}>Budget</Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 12,
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 50,
                  }}>
                  <View>
                    <Text style={{color: 'gray', fontWeight: '500'}}>
                      Total Budget
                    </Text>
                    <Text style={{marginTop: 5, fontWeight: '500'}}>
                      Rs 1000.00
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        height: 20,
                        backgroundColor: '#E0E0E0',
                        flex: 1,
                        borderRadius: 2,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 4,
                      }}>
                      <Text style={{color: '#4e91de'}}>0.00</Text>
                      <Text>1000.00</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>

      <View
        style={{
          backgroundColor: '#FF7F50',
          width: 46,
          height: 46,
          borderRadius: 23,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 15,
          bottom: 20,
        }}>
        <Pressable onPress={() => navigation.navigate('Create')}>
          <Ionicons name="add-outline" size={32} color="white" />
        </Pressable>
      </View>

      <BottomModal
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 450}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>{day}</Text>
                <View>
                  <Text style={{color: 'gray', fontSize: 9}}>{monthYear}</Text>
                  <Text
                    style={{
                      backgroundColor: '#404040',
                      borderRadius: 4,
                      paddingHorizontal: 4,
                      paddingVertical: 1,
                      color: '#000', // Text color
                      fontSize: 10,
                      color: 'white',
                      alignSelf: 'flex-start',
                      marginTop: 3,
                    }}>
                    {dayName}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                <Text
                  style={{color: '#0578eb', fontSize: 15, fontWeight: '500'}}>
                  ₹ {currentData?.totalIncome.toFixed(2)}
                </Text>
                <Text
                  style={{fontSize: 15, color: '#eb6105', fontWeight: '500'}}>
                  ₹ {currentData?.totalExpense.toFixed(2)}
                </Text>
              </View>
            </View>

            {currentData?.dayExpenses?.length > 0 ? (
              <View>
                {currentData?.dayExpenses?.map((item, index) => (
                  <View style={{marginTop: 18}} key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 30,
                      }}>
                      <Text style={{fontSize: 13, color: 'gray', minWidth: 70}}>
                        {item?.category}
                      </Text>

                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 14, color: 'gray'}}>
                          {item?.account}
                        </Text>

                        {item?.note && (
                          <Text
                            style={{fontSize: 14, color: 'gray', marginTop: 3}}>
                            {item?.note}
                          </Text>
                        )}
                      </View>

                      <Text
                        style={{
                          color:
                            item?.type == 'Expense' ? '#eb6105' : '#0578eb',
                        }}>
                        {Number(item?.amount).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 80,
                }}>
                <Image
                  style={{width: 80, height: 80}}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/17597/17597096.png',
                  }}
                />
                <Text
                  style={{textAlign: 'center', color: 'gray', marginTop: 10}}>
                  No Data available
                </Text>
              </View>
            )}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
