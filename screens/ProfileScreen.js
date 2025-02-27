import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';

import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View style={{padding: 12, flexDirection: 'column', gap: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="calculator-outline" size={24} color="#282828" />
            <Text style={{fontSize: 15}}>Calc Box</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="laptop-outline" size={24} color="#282828" />
            <Text style={{fontSize: 15}}>PC Manager</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="help-circle-outline" size={24} color="#282828" />
            <Text style={{fontSize: 15}}>Help</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="document-text-outline" size={24} color="#282828" />
            <Text style={{fontSize: 15}}>Feedback</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="heart-outline" size={24} color="#282828" />
            <Text style={{fontSize: 15}}>Rate it</Text>
          </View>
        </View>

        <View
          style={{padding: 12, backgroundColor: '#E0E0E0', marginVertical: 10}}>
          <Text style={{color: '#282828'}}>Category/Accounts</Text>
        </View>

        <View style={{padding: 12, flexDirection: 'column', gap: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons
              name="cash-multiple"
              size={24}
              color="#282828"
            />
            <Text style={{fontSize: 15}}>Income Category Setting</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons
              name="cash-multiple"
              size={24}
              color="#282828"
            />
            <Text style={{fontSize: 15}}>Expense Category Setting</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons
              name="cog-refresh-outline"
              size={24}
              color="#282828"
            />
            <Text style={{fontSize: 15}}>Account Setting</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons
              name="note-multiple-outline"
              size={24}
              color="#282828"
            />
            <Text style={{fontSize: 15}}>Budget Setting</Text>
          </View>
        </View>

        <View
          style={{padding: 12, backgroundColor: '#E0E0E0', marginVertical: 10}}>
          <Text style={{color: '#282828'}}>Settings</Text>
        </View>

        <View style={{padding: 12, flexDirection: 'column', gap: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons name="reload" size={24} color="#282828" />
            <Text style={{fontSize: 15}}>Backup</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons
              name="lock-outline"
              size={24}
              color="#282828"
            />
            <Text style={{fontSize: 15}}>Passcode</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons
              name="bell-outline"
              size={24}
              color="#282828"
            />
            <Text style={{fontSize: 15}}>Alarm Setting</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialDesignIcons
              name="palette-outline"
              size={24}
              color="#282828"
            />
            <Text style={{fontSize: 15}}>Style</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
