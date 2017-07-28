import React, {Component} from 'react';
import {AppRegistry} from 'react-native';


import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {Actions, ActionConst, Scene, Router} from 'react-native-router-flux'

import LandingPage from './src/pages/LandingPage'
import ProfilePage from './src/pages/ProfilePage'
import StarsPage from './src/pages/StarsPage'
import RepositoryPage from './src/pages/RepositoryPage'
import IssueCommentsPage from './src/pages/IssueCommentsPage'
import CommentDetailPage from './src/pages/CommentDetailPage'

const TOKEN = 'please replace with your own token, https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'https://api.github.com/graphql',
        dataIdFromObject: o => o.id
    }).use(
        [{
            applyMiddleware(req, next) {

                if (req.request.operationName === '') {
                    req.request.operationName = null;
                }

                if (!req.options.headers) {
                    req.options.headers = {}  // Create the header object if needed.
                }

                // Send the login token in the Authorization header
                req.options.headers.authorization = `Bearer ${TOKEN}`;
                next()
            }
        }]
    ),
});


const scenes = Actions.create(
    <Scene key='root'>
        <Scene key='landingPage' initial={true} component={LandingPage} title='Welcome' type={ActionConst.RESET}/>
        <Scene key='profilePage' title='Profile' component={ProfilePage} type={ActionConst.PUSH}/>
        <Scene key='starsPage' title='Stars' component={StarsPage} type={ActionConst.PUSH}/>
        <Scene key='repositoryPage' title='Open Issues' component={RepositoryPage} type={ActionConst.PUSH}/>
        <Scene key='issueCommentsPage' rightTitle="Add" onRight={() => {
            Actions.refresh({add: true})
        }} title='Issue Comments' component={IssueCommentsPage} type={ActionConst.PUSH}/>
        <Scene key='commentDetailPage' title='Comment Detail' component={CommentDetailPage} type={ActionConst.PUSH}/>
    </Scene>
);


class github_graphql_rn_demo extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router scenes={scenes}/>
            </ApolloProvider>
        )
    }
}

AppRegistry.registerComponent('github_graphql_rn_demo', () => github_graphql_rn_demo);
