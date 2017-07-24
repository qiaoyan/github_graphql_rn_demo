import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Actions } from 'react-native-router-flux'

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox} from '@shoutem/ui'

import {_} from 'lodash'


class RepositoryCard extends React.Component {

    static propTypes = {
        repository: React.PropTypes.object.isRequired,
    };

    render () {
        const {
            repository,
        } = this.props;

        return (
            <Card styleName="flexible">
                <Image
                    styleName="medium-wide"
                    source={{uri: repository.owner.avatarUrl ? repository.owner.avatarUrl : "https://unsplash.it/200/300/?random"}}
                />
                <View styleName="content, stretch">
                    <Subtitle>{ _.truncate(repository.description, 40) }</Subtitle>
                    <View styleName="horizontal v-center space-between">
                        <Caption>{ repository.name }</Caption>
                        <Button styleName="tight clear"><Icon name="right-arrow" /></Button>
                    </View>
                </View>
            </Card>
        )
    }
}


// const RepositoryCardWithData = graphql(null, {
//     options: {
//         variables: {
//         },
//         fetchPolicy: 'cache-and-network',
//     }
// })(RepositoryCard)

export default RepositoryCard