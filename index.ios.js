/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class github_graphql_rn_demo extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('github_graphql_rn_demo', () => github_graphql_rn_demo);


import React, { Component } from 'react';
import { AppRegistry } from 'react-native';


import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux'

import Pokedex from './src/components/Pokedex'
import PokemonPage from './src/components/PokemonPage'
import AddPokemonCard from './src/components/AddPokemonCard'

import LandingPage from './src/pages/LandingPage'
import ProfilePage from './src/pages/ProfilePage'
import StarsPage from './src/pages/StarsPage'
import RepositoryPage from './src/pages/RepositoryPage'

const TOKEN = 'please replace with your own token, https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql';


const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'https://api.github.com/graphql'}).use(
        [{
            applyMiddleware(req, next) {

                if (req.request.operationName === '') {
                    req.request.operationName = null;
                }

                if (!req.options.headers) {
                    req.options.headers = {}  // Create the header object if needed.
                }

                // Send the login token in the Authorization header
                req.options.headers.authorization = `Bearer ${TOKEN}`
                next()
            }
        }]
    ),
    dataIdFromObject: o => o.id,
})


// const scenes = Actions.create(
//     <Scene key='root'>
//         <Scene key='landingPage' component={LandingPage} title='Welcome' initial={true} type={ActionConst.RESET} />
//         <Scene key='profilePage' title='Profile' component={ProfilePage} type={ActionConst.PUSH} />
//         <Scene key='starsPage' title='Profile' component={StarsPage} type={ActionConst.PUSH} />
//         <Scene key='repositoryPage' title='Profile' component={RepositoryPage} type={ActionConst.PUSH} />
//
//         <Scene key='pokedex' component={Pokedex} title='Pokedex' type={ActionConst.RESET} />
//         <Scene key='pokemonPage' title='Edit Pokemon' component={PokemonPage} type={ActionConst.PUSH} />
//         <Scene key='createPokemon' title='Create Pokemon' component={AddPokemonCard} type={ActionConst.PUSH} />
//     </Scene>
// )




class github_graphql_rn_demo extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Scene key='root'>
                        <Scene key='landingPage' component={LandingPage} title='Welcome' initial={true} type={ActionConst.RESET} />
                        <Scene key='profilePage' title='Profile' component={ProfilePage} type={ActionConst.PUSH} />
                        <Scene key='starsPage' title='Profile' component={StarsPage} type={ActionConst.PUSH} />
                        <Scene key='repositoryPage' title='Profile' component={RepositoryPage} type={ActionConst.PUSH} />

                        <Scene key='pokedex' component={Pokedex} title='Pokedex' type={ActionConst.RESET} />
                        <Scene key='pokemonPage' title='Edit Pokemon' component={PokemonPage} type={ActionConst.PUSH} />
                        <Scene key='createPokemon' title='Create Pokemon' component={AddPokemonCard} type={ActionConst.PUSH} />
                    </Scene>
                </Router>
            </ApolloProvider>
        )
    }
}

AppRegistry.registerComponent('github_graphql_rn_demo', () => github_graphql_rn_demo);
