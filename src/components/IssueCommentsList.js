import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {Actions} from 'react-native-router-flux'

import {
    View,
    Screen,
    NavigationBar,
    NavigationBarAnimations,
    DropDownMenu,
    Overlay,
    ScrollView,
    ListView,
    GridRow,
    TouchableOpacity,
    TouchableNativeFeedback,
    Touchable,
    Button,
    Icon,
    createIcon,
    FormGroup,
    TextInput,
    Spinner,
    Switch,
    Video,
    Image,
    ImagePreview,
    ImageGallery,
    InlineGallery,
    ImageGalleryOverlay,
    HorizontalPager,
    LoadingIndicator,
    PageIndicators,
    RichMedia,
    Html,
    ShareButton,
    Heading,
    Title,
    Subtitle,
    Text,
    Caption,
    Divider,
    Card,
    Row,
    Tile,
    Lightbox
} from '@shoutem/ui'

import {_} from 'lodash'
import moment from 'moment'


class IssueCommentsList extends React.Component {

    static propTypes = {
        issueCommentsArray: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    };

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(comment) {

        return (
            <TouchableOpacity key={comment.id} styleName="flexible"
                              onPress={() => Actions.commentDetailPage({comment: comment})}>

                <View>
                    <Row>
                        <Image
                            styleName="small-avatar top"
                            source={{uri: comment.author.avatarUrl ? comment.author.avatarUrl : "https://unsplash.it/200?image=505"}}
                        />
                        <View styleName="vertical">
                            <View styleName="horizontal space-between">
                                <Subtitle>{comment.author.login}</Subtitle>
                                <Caption>{moment(comment.createdAt).fromNow()}</Caption>
                            </View>
                            <Text styleName="multiline">{comment.bodyText}</Text>
                        </View>
                        <Icon styleName="disclosure" name="right-arrow"/>
                    </Row>
                    <Divider styleName="line"/>
                </View>
            </TouchableOpacity>

        )
    }


    render() {

        const {
            issueCommentsArray,
        } = this.props;

        return (
            <View>
                <ListView
                    data={issueCommentsArray}
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

export default IssueCommentsList