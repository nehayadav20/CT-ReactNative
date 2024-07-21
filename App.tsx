/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import CleverTap from 'clevertap-react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Pressable,
  Alert
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            // color: isDarkMode ? Colors.white : Colors.black,
            color: Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            // color: isDarkMode ? Colors.light : Colors.dark,
            color: Colors.black,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {

  let localInApp = {
    inAppType: 'alert',
    titleText: 'Get Notified',
    messageText: 'Enable Notification permission',
    followDeviceOrientation: true,
    positiveBtnText: 'Allow',
    negativeBtnText: 'Cancel',
    fallbackToSettings: true, //Setting this parameter to true will open an in-App to redirect you to Mobile's OS settings page.
  };
  CleverTap.promptPushPrimer(localInApp);

  //CleverTap.promptForPushPermission(true);
  CleverTap.isPushPermissionGranted((err, res) => {
    console.log('isPushPermissionGranted', res, err);
  });
  // CleverTap.addListener(CleverTap.CleverTapPushPermissionResponseReceived, ()=>{/*consume the event*/})

  const backgroundStyle = {
    backgroundColor: Colors.lighter
  };

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [identity, setidentity] = useState('');
  const [contact, setcontact] = useState('');
  const [dob, setdob] = useState('');
  const event=useState('');

  useEffect(() => {
    CleverTap.initializeInbox();
    CleverTap.setDebugLevel(3);
    CleverTap.createNotificationChannel("123", "Default", "Default", 5, true);

    // let localInApp = {
    //   inAppType: 'alert',
    //   titleText: 'Get Notified',
    //   messageText: 'Enable Notification permission',
    //   followDeviceOrientation: true,
    //   positiveBtnText: 'Allow',
    //   negativeBtnText: 'Cancel',
    //   fallbackToSettings: true, //Setting this parameter to true will open an in-App to redirect you to Mobile's OS settings page.
    // };
    // CleverTap.promptPushPrimer(localInApp);
    CleverTap.addListener(CleverTap.CleverTapInboxDidInitialize, (event) => {
      _handleCleverTapInbox(CleverTap.CleverTapInboxDidInitialize, event);
    });

    function _handleCleverTapInbox(eventName, event) {
      console.log('CleverTap Inbox Event - ', eventName, event);
   }

  }, []); // empty dependency array ensures it runs only once on mount

  const handleEmailChange = (text: string) => {
    setemail(text);
  };

  const handleNameChange = (text: string) => {
    setname(text);
  };

  const handleContactChange = (text: string) => {
    setcontact(text);
  };

  const handleIdentityChange = (text: string) => {
    setidentity(text);
  };

  const handleDobChange = (text: string) => {
    setdob(text);
  };

  function handleSubmit() {
    try {
      console.log('Name: ', name);
      console.log('Email: ', email);
      console.log('Contact: ', contact);
      console.log('Identity: ', identity);
      console.log('DoB: ', dob);

      var props = {
        'Name': name,
        'Identity': identity,
        'Email': email,
        'Phone': contact,
        'DOB': new Date(dob),
        'MSG-push': true
      }
      CleverTap.onUserLogin(props);

      Alert.alert(
        'Profile Created',
        'Your profile has been submitted successfully!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );

      setname('');
      setemail('');
      setcontact('');
      setidentity('');
      setdob('');
    }
    catch (error) {
      console.error('Error occurred during form submission:', error);
    }
  }

  function profilepush() {
    var props = {
      'Gender': 'M'
    }
    CleverTap.profileSet(props)
  }

  function setmultivalue() {
    var myStuff = ['Football', 'Snooker', 'Carrom']
    CleverTap.profileSetMultiValuesForKey(myStuff, 'Sports')
  }

  function removemultival() {
    CleverTap.profileRemoveMultiValueForKey('Carrom', 'Sports');
  }

  function addmultivalue() {
    CleverTap.profileAddMultiValueForKey('Chess', 'Sports')
  }

  function productViewedwProp() {
    var props = { 'Name': 'Football', 'Price': 5000 }
    CleverTap.recordEvent('Product viewed prop', props)
  }

  function productViewedWOProp() {
    CleverTap.recordEvent('Product viewed', {});
  }
  
  function appinbox(){
    CleverTap.showInbox({
      'tabs': ['Offers', 'Promotions'],
      'navBarTitle': 'My App Inbox',
      'navBarTitleColor': '#FF0000',
      'navBarColor': '#FFFFFF',
      'inboxBackgroundColor': '#AED6F1',
      'backButtonColor': '#00FF00',
      'unselectedTabColor': '#0000FF',
      'selectedTabColor': '#FF0000',
      'selectedTabIndicatorColor': '#000000',
      'noMessageText': 'No message(s)',
      'noMessageTextColor': '#FF0000'
  });
  }
  function chargedEvent() {
    var chargeDetails = {
      'totalValue': 20,
      'category': 'books',
      'purchase_date': new Date()
    }
    var items = [
      { 'title': 'book1', 'published_date': new Date('2010-12-12T06:35:31'), 'author': 'ABC' },
      { 'title': 'book2', 'published_date': new Date('2020-12-12T06:35:31'), 'author': 'DEF' },
      { 'title': 'book3', 'published_date': new Date('2000-12-12T06:35:31'), 'author': 'XYZ' }]

    CleverTap.recordChargedEvent(chargeDetails, items);
  }

  //Push Listner
  // CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, () => {
  //   CleverTap.recordEvent("Notification Clicked", {})
  // })


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            // backgroundColor: isDarkMode ? Colors.black : Colors.white,
            backgroundColor: Colors.white,
            margin: 10,
            padding: 10
          }}>
          <Section title='CleverTap React Native'></Section>
          <Text style={styles.text}>Name: </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#808080'}
            placeholder='Name'
            value={name}
            onChangeText={handleNameChange}
          />
          <Text style={styles.text}>Email: </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#808080'}
            placeholder='Email'
            value={email}
            onChangeText={handleEmailChange}
          />
          <Text style={styles.text}>Contact: </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#808080'}
            placeholder='Contact'
            value={contact}
            onChangeText={handleContactChange}
          />
          <Text style={styles.text}>Identity: </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#808080'}
            placeholder='Identity'
            value={identity}
            onChangeText={handleIdentityChange}
          />
          <Text style={styles.text}>DOB: </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#808080'}
            placeholder='yyyy-mm-dd'
            value={dob}
            onChangeText={handleDobChange}
          />
          {/* <Button 
          title="Submit" 
          onPress={handleSubmit} 
          color={Colors.black} /> */}
          <Pressable style={styles.button} onPress={handleSubmit} >
            <Text style={styles.textbtn}>Submit onUserLogin</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={profilepush} >
            <Text style={styles.textbtn}>ProfilePush</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={setmultivalue} >
            <Text style={styles.textbtn}>Set Multi Val</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={removemultival} >
            <Text style={styles.textbtn}>Remove mMlti Val</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={addmultivalue} >
            <Text style={styles.textbtn}>Add Multi Val</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={productViewedwProp} >
            <Text style={styles.textbtn}>Product Viewed(prop)</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={productViewedWOProp} >
            <Text style={styles.textbtn}>Product Viewed</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={chargedEvent} >
            <Text style={styles.textbtn}>Charged Event</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={appinbox} >
            <Text style={styles.textbtn}>App Inbox</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 13,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    marginLeft: 12,
    color: 'black'
  },
  button: {
    alignItems: 'center',
    margin: 12,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  textbtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
