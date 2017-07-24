import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Actions} from 'react-native-router-flux';

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox} from '@shoutem/ui'

import {_} from 'lodash'

import RepositoriesGrid from '../components/RepositoriesGrid'

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
    } = this.props.data;

    if (error) {
      console.log(error);
      return (
          <Text>An unexpected error occurred</Text>);
    }

    if (loading && !viewer) {
        return (
            <View style={{marginTop: 64}}>
              <Spinner styleName="lg-gutter-top"/>
            </View>
        )
    }


    const repositoriesArray = viewer.starredRepositories.edges.map((node)=>{
      return node.node
    });

    return (
        <Screen styleName="paper" style={{marginTop: 64}} >
          <RepositoriesGrid repositoriesArray={repositoriesArray} loadMore={loadMore} loading={loading}/>
        </Screen>
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
              login
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

const StarsPageWithData = graphql(StarsQuery, {
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

                  const newEdges = fetchMoreResult.viewer.starredRepositories.edges;
                  const resultEdges = [...previousResult.viewer.starredRepositories.edges, ...newEdges];
                  const result = _.chain(fetchMoreResult).cloneDeep().set('viewer.starredRepositories.edges', resultEdges).value();

                return result

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

export default StarsPageWithData;
