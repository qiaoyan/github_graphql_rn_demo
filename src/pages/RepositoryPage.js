import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Actions} from 'react-native-router-flux';

import {_} from 'lodash'

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox} from '@shoutem/ui'

import IssueList from '../components/IssueList'

class RepositoryPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
        repository: React.PropTypes.object,
    }).isRequired,
  };

  render() {
      const {
          loading,
          error,
          repository,
      } = this.props.data

      if (error) {
          console.log(error);
          return (
              <Text>An unexpected error occurred</Text>);
      }

      if (loading && !repository) {
          return (
              <View style={{marginTop: 64}}>
                  <Spinner styleName="lg-gutter-top"/>
              </View>
          )
      }

    return (
        <Screen styleName="paper" style={{marginTop: 64}} >
            <IssueList issueArray={repository.issues.edges.map((node)=>{return node.node})}/>
        </Screen>
    );
  }
}

const RepositoryQuery = gql`
query ($owner:String!, $name:String!) {
  repository(owner:$owner, name:$name) {
    id
    name
    descriptionHTML
    issues(first:50, states:OPEN, orderBy:{field:CREATED_AT, direction:DESC}) {
      edges {
        node {
          id
          number
          title
          bodyText
          url
          createdAt
          author {
            login
            avatarUrl
          }
          repository {
            name
            owner {
              login
            }
          }
          labels(first:5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
`

const RepositoryPageWithData = graphql(RepositoryQuery, {
  // props: (
  // ),
  options: (ownProps) => ({
    variables: {
        owner:ownProps.owner,
        name:ownProps.name,
    },
    fetchPolicy: 'cache-and-network',
  }),
})(RepositoryPage);

export default RepositoryPageWithData;
