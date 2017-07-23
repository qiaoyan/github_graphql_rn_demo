import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Actions} from 'react-native-router-flux';

import {_} from 'underscore'
import _s from 'underscore.string'

import { View, Text } from '@shoutem/ui'

class ProfilePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      viewer: React.PropTypes.object,
      primaryLanguageCountBy: React.PropTypes.object,
    }).isRequired,
  };

  render() {

    const {
      loading,
      error,
      viewer,
      primaryLanguageCountBy,
    } = this.props.data

    if (error) {
      console.log(error);
      return (
          <Text>An unexpected error occurred</Text>);
    }

    if (loading || !viewer) {
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
    id
    login
    name
    bio
    avatarUrl
    company
    repositories(last: 50) {
      totalCount
      nodes {
        name
        id
        description
        owner {
          id
          avatarUrl
        }
        primaryLanguage {
          id
          name
        }
      }
    }
  }
}
`;

const WithData = graphql(ProfileQuery, {
  props: ({data: {loading, error, viewer}}) => (
      {
        data: {
          loading,
          error,
          viewer,
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
})(ProfilePage);

export default WithData;
