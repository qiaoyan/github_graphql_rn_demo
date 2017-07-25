import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Actions} from 'react-native-router-flux';

import {_} from 'lodash'

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox} from '@shoutem/ui'

import IssueCommentsList from '../components/IssueCommentsList'
import ModalWrapper from 'react-native-modal-wrapper'

class IssueCommentsPage extends React.Component {

    static propTypes = {
        data: React.PropTypes.shape({
            loading: React.PropTypes.bool,
            error: React.PropTypes.object,
            repository: React.PropTypes.object,
        }).isRequired,
        add: React.PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.submitComment = this.submitComment.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({addState:nextProps.add})
    }

    closeModal () {
        this.setState({addState:false, addCommentBody:''})
    }

    submitComment () {
        if (!(this.state.addCommentBody && this.state.addCommentBody.length > 0)) {
            this.closeModal();
            return
        }


        this.props.mutate({
            variables:{
                subjectId:this.props.data.repository.issue.id,
                body:this.state.addCommentBody,
            }
        }).then(({data}) => {
            this.props.data.updateQuery((previousResult, queryVariables)=>{
                const newNode = data.addComment.commentEdge.node;
                const resultNodes = [...previousResult.repository.issue.comments.nodes, newNode];
                const result = _.chain(previousResult).cloneDeep().set('repository.issue.comments.nodes', resultNodes).value();
                return result

            });

            this.closeModal()

        }).catch((error) => {
            console.log('mutate error', error)
        })
    }

    render() {
        const {
            loading,
            error,
            repository,
        } = this.props.data;

        const canSubmit = this.state && this.state.addCommentBody && this.state.addCommentBody.length > 0;

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
                <ModalWrapper
                    onRequestClose={this.closeModal}
                    style={{ flex:1, padding:22 }}
                    visible={this.state?this.state.addState:false}>
                    <Tile styleName="text-centric paper">
                        <Title>{repository.issue.title}</Title>
                        <Subtitle styleName="md-gutter">OPEN ISSUE</Subtitle>
                        <Heading>Leave your comment ...</Heading>
                        <TextInput styleName="lg-gutter" autoFocus={true} multiline = {true}
                                   placeholder={'here'}
                                   onChangeText={(inputText)=>{this.setState({addCommentBody:inputText})}}
                        />
                        <Button styleName={canSubmit?"dark md-gutter-top":"dark md-gutter-top muted"} onPress={canSubmit?this.submitComment:null}><Text>SUBMIT</Text></Button>
                        <Button styleName="dark md-gutter-top" onPress={this.closeModal}><Text>CANCEL</Text></Button>
                    </Tile>
                </ModalWrapper>
                <IssueCommentsList issueCommentsArray={repository.issue.comments.nodes}/>
            </Screen>
        );
    }
}

const IssueCommentsQuery = gql`
query ($owner:String!, $name:String!, $number:Int!) {
  repository (owner:$owner, name:$name) {
    id
    issue (number:$number) {
      id
      title
      comments (last:50) {
        nodes {
          id
          bodyText
          createdAt
          author {
            login
            avatarUrl
          }
        }
      }
    }
  }
}
`;


const IssueCommentsPageWithData = graphql(IssueCommentsQuery, {
    // props: (
    // ),
    options: (ownProps) => ({
        variables: {
            owner:ownProps.issue.repository.owner.login,
            name:ownProps.issue.repository.name,
            number:ownProps.issue.number,
        },
        fetchPolicy: 'cache-and-network',
    }),
})(IssueCommentsPage);


const AddIssueCommentMutation = gql`
mutation ($subjectId:ID!, $body:String!) {
  addComment (input:{subjectId:$subjectId, body:$body}) {
    commentEdge {
      node {
        id
        bodyText
        createdAt
        author {
          login
          avatarUrl
        }
      }
    }
  }
}
`;
const IssueCommentPageWithMutationWithData = graphql(AddIssueCommentMutation)(IssueCommentsPageWithData);


export default IssueCommentPageWithMutationWithData;
