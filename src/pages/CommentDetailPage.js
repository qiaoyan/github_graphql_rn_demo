import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {Actions} from 'react-native-router-flux'

import {
    ScrollView as RNScrollView,
    View as RNView,
    Text as RNText,
    Dimensions as RNDiMensions,
    StyleSheet
} from 'react-native'


class CommentDetailPage extends React.Component {

    static propTypes = {
        comment: React.PropTypes.object.isRequired,
    };

    render() {
        const {
            comment,
        } = this.props
        console.log(comment)

        return (
            <RNView style={styles.container}>
                <RNScrollView>
                    <RNView style={styles.divider}>
                        <RNText style={styles.subtitle}>COMMENT BY</RNText>
                    </RNView>

                    <RNText style={[styles.text, styles.title]}>{comment.author.login}</RNText>
                    <RNView style={styles.divider}>
                        <RNText style={styles.subtitle}>COMMENT DETAIL</RNText>
                    </RNView>

                    <RNText style={[styles.text, styles.caption]}>{comment.bodyText}</RNText>
                </RNScrollView>
            </RNView>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 64,
        paddingLeft: 22,
        paddingRight: 22,
    },

    divider: {
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
        alignSelf: 'stretch',
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    text: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#222222',

    },

    subtitle: {
        fontSize: 12,
        paddingBottom: 5,
    },

    title: {
        fontSize: 20,
        lineHeight: 25,
        paddingTop: 10,
    },

    caption: {
        fontSize: 14,
        lineHeight: 14,
        paddingTop: 10,
    },
});

export default CommentDetailPage
