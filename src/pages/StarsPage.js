import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Actions} from 'react-native-router-flux';

import {_} from 'underscore'
import _s from 'underscore.string'

import { View, Text } from '@shoutem/ui'


class StarsPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      viewer: React.PropTypes.object,
    }).isRequired,
  };

  render() {
    const {
      loading,
      error,
      viewer,
      loadMore,
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

const StarsQuery = gql`
  query ($cursor:String) { 
    viewer {
      id
      starredRepositories (first:50, after:$cursor, orderBy:{field:STARRED_AT, direction:DESC}) {
        edges {
          node {
            id
            name
            description
            owner {
              id
              avatarUrl
            }
          }
        }
        pageInfo {
        endCursor
        hasNextPage
      }
     }
    }
  }
`;

const WithData = graphql(StarsQuery, {
  props: ({data: {loading, error, viewer, fetchMore}}) => (
      {
        data:      {
          loading,
          error,
          viewer,
          loadMore: () => {
            return fetchMore({
              query: StarsQuery,
              variables: {
                cursor: viewer.starredRepositories.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.data.viewer.starredRepositories.edges;
                const pageInfo = fetchMoreResult.data.viewer.starredRepositories.pageInfo;
                return {
                  // Put the new comments at the end of the list and update `pageInfo`
                  // so we have the new `endCursor` and `hasNextPage` values
                  viewer: {
                    starredRepositories: {
                      edges: [...previousResult.viewer.starredRepositories.edges, ...newEdges],
                      pageInfo,
                    }
                  },
                };
              },
            });
          },
        }
      }

  ),
  options: {
    variables: {},
    fetchPolicy: 'cache-and-network',
  },
})(StarsPage);

export default WithData;
