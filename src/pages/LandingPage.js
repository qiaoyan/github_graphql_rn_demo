import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Actions } from 'react-native-router-flux'

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox, Examples} from '@shoutem/ui'


class LandingPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      viewer: React.PropTypes.object,
    }).isRequired,
  }

  render () {
    const {
      loading,
      error,
      viewer,
    } = this.props.data

    if (error) {
      console.log(error)
      return (<Text>An unexpected error occurred</Text>)
    }

    if (loading && !viewer) {
      return (
          <View style={{marginTop: 64}}>
            <Spinner styleName="lg-gutter-top"/>
          </View>
      )
    }

    return (
        <TouchableOpacity style={{flex:1}}>
        {/*<Screen styleName="paper" style={{marginTop: 64}}>*/}
          <Image style={{flex: 1, resizeMode: 'stretch'}}
              source={{ uri: 'https://unsplash.it/600/900?image=852' }}
          >
            <Tile>
              <Title styleName="md-gutter-top">Welcome, {viewer.name?viewer.name:viewer.login}</Title>
              <Subtitle styleName="lg-gutter">This demo demonstrate of github api v4 (graphql), with @shoutem/ui, apollo-client and react-native-router-flux </Subtitle>
              {/*<Heading>$250.00</Heading>*/}
              <Button styleName="lg-gutter-top, stretch" onPress={() => Actions.profilePage()}
              ><Icon name="cart" /><Text>My Profile</Text></Button>
              <Button styleName="lg-gutter-top, stretch" onPress={() => Actions.starsPage()} ><Icon name="close" /><Text>My Stars</Text></Button>

            </Tile>
          </Image>
        {/*</Screen>*/}
        </TouchableOpacity>
    )
  }
}

const ViewerQuery = gql`
  query { 
    viewer {
      login
      name
      id
    }
  }
`

const LandingPageWithData = graphql(ViewerQuery, {
  options: {
    variables: {
    },
    fetchPolicy: 'cache-and-network',
  }
})(LandingPage)

export default LandingPageWithData
