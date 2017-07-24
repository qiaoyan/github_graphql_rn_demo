import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Actions} from 'react-native-router-flux';

import {_} from 'lodash'

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox} from '@shoutem/ui'

import RepositoriesGrid from '../components/RepositoriesGrid'
import { Pie } from 'react-native-pathjs-charts'

class ProfilePage extends React.Component {

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
      primaryLanguageCountBy,
    } = this.props.data

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

      const repositoriesArray = viewer.repositories.nodes

      const dataForChart = _.chain(repositoriesArray).map((repository) => {
          return repository.primaryLanguage?repository.primaryLanguage.name:"not specified"
      }).countBy().map((value, key) => {
          return {
              "name":key,
              "repositories":value
          }
      }).value()

      let data = dataForChart

      let options = {
          margin: {
              top: 10,
              left: 30,
              right: 30,
              bottom: 10
          },
          flex:1,
          // width: 450,
          // height: 450,
          color: '#2980B9',
          r: 50,
          R: 150,
          legendPosition: 'topLeft',
          animate: {
              type: 'oneByOne',
              duration: 200,
              fillTransition: 3
          },
          label: {
              fontFamily: 'Arial',
              fontSize: 10,
              fontWeight: true,
              color: '#fbfbfb'
          }
      }

      return (
          <Screen styleName="paper" style={{marginTop: 64}} >
              <ScrollView>
                  <Divider styleName="section-header">
                      <Caption>LANGUAGES BY REPOSITORY</Caption>
                  </Divider>
                  <View styleName="content">
                      <Pie data={data}
                           options={options}
                           accessorKey="repositories"
                      />
                  </View>
                  <Divider styleName="section-header">
                      <Caption>REPOSITORIES</Caption>
                  </Divider>
              <RepositoriesGrid repositoriesArray={repositoriesArray}/>
              </ScrollView>
          </Screen>
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
        id
        name
        description
        owner {
          id
          login
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

const ProfilePageWithData = graphql(ProfileQuery, {
//   props: ({data: {loading, error, viewer}}) => (
// {
//         data: {
//           loading,
//           error,
//           viewer,
//           primaryLanguageCountBy: loading?null:
//               _.chain(viewer.repositories.nodes).
//                   findKey('primaryLanguage').
//                   findKey('name').
//                   compact().
//                   countBy().
//                   value(),
//         },
//       }
//   ),
  options: {
    variables: {},
    fetchPolicy: 'cache-and-network',
  },
})(ProfilePage);

export default ProfilePageWithData;
