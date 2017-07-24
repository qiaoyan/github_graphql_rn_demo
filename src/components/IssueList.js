import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Actions } from 'react-native-router-flux'

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox} from '@shoutem/ui'

import {_} from 'lodash'
import moment from 'moment'



class IssueList extends React.Component {

    static propTypes = {
        issueArray: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    };

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow (issue) {
        return (
            <TouchableOpacity key={issue.id} styleName="flexible" onPress={() => Actions.issueCommentsPage({issue:issue, add:false})}>
                <View>
            <Row>
                <Image
                    styleName="small-avatar top"
                    source={{ uri:issue.author.avatarUrl?issue.author.avatarUrl:"https://unsplash.it/200?image=505" }}
                />
                <View styleName="vertical">
                    <View styleName="horizontal space-between">
                        <Subtitle>{issue.author.login}</Subtitle>
                        <Caption>{moment(issue.createdAt).fromNow()}</Caption>
                    </View>
                        <Text styleName="multiline">{issue.title}</Text>
                </View>
                <Icon styleName="disclosure" name="right-arrow" />
            </Row>
                <Divider styleName="line"/>
                </View>
            </TouchableOpacity>

        )
    }


    render() {

        const {
            issueArray,
        } = this.props

        return (
            <View>
                <ListView
                    data={issueArray}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}


// const RepositoryCardWithData = graphql(null, {
//     options: {
//         variables: {
//         },
//         fetchPolicy: 'cache-and-network',
//     }
// })(RepositoryCard)

export default IssueList