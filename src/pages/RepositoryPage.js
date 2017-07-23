import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Actions} from 'react-native-router-flux';

import {_} from 'underscore'
import _s from 'underscore.string'

import { View, Text } from '@shoutem/ui'

class RepositoryPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      viewer: React.PropTypes.object,
      primaryLanguageCountBy: React.PropTypes.object,
    }).isRequired,
  };

  render() {
    if (this.props.data.error) {
      console.log(this.props.data.error);
      return (<Text>An unexpected error occurred</Text>);
    }

    if (this.props.data.loading || !this.props.data.Trainer) {
      return (<Text>Loading</Text>);
    }

    return (
        <View>
        </View>
    );
  }
}

const ProfileQuery = gql`
                query {
                viewer {
                login
                name
                bio
                avatarUrl
                company
                repositories (last: 50) {
                totalCount
                nodes {
                name
                id
                description
                owner {
                avatarUrl
            }
                primaryLanguage {
                name
            }
            }
            }
            }
            }
                `

const WithData = graphql(ProfileQuery, {
  props: ({data: {loading, viewer}}) => (
      {
        data: {
          viewer,
          loading,
          primaryLanguageCountBy: loading ?
              null :
              _.chain(viewer.repositories.nodes).
                  pluck('primaryLanguage').
                  pluck('name').
                  compact().
                  countBy().
                  value(),
        },
      }
  ),
  options: {
    variables: {},
    fetchPolicy: 'cache-and-network',
  },
})(RepositoryPage);

export default WithData;
