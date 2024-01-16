import { StatusBar } from 'expo-status-bar';
import { Touchable, TouchableOpacity } from 'react-native';
import { Button, StyleSheet, Text, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Store from './store/configStore';

import HomePage from './screens/HomePage';
import ConnexionPage from './screens/ConnexionPage';
import InscriptionPage from './screens/InscriptionPage';
import DeconnexionPage from './screens/DeconnexionPage';
import ModificationPage from './screens/ModificationPage';
import MonprofilPage from './screens/MonprofilPage';
import ListePage from './screens/ListePage';
//import CameraPage from "./screens/CameraPage";
//import FullimagePage from "./screens/FullimagePage";
//import GeolocPage from "./screens/GeolocPage";




const Stack = createNativeStackNavigator();
export default function App() {
  
    return (
      <Provider store={Store}>

      
      <NavigationContainer>
        
      <Stack.Navigator>
        {/* <Stack.Screen name="Geoloc" component={GeolocPage} /> */}
        {/* <Stack.Screen name="Camera" component={CameraPage} /> */}
        {/* <Stack.Screen name="Fullimage" component={FullimagePage} /> */}
        <Stack.Screen name="Liste" component={ListePage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Connexion" component={ConnexionPage} />
        <Stack.Screen name="Inscription" component={InscriptionPage} />
        
        <Stack.Screen name="Deconnexion" component={DeconnexionPage} />
        <Stack.Screen name="Modification" component={ModificationPage} />
        <Stack.Screen name="Monprofil" component={MonprofilPage} />  
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    )
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  
});
