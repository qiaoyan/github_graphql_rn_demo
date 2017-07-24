import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Actions } from 'react-native-router-flux'

import { View, Screen, NavigationBar, NavigationBarAnimations, DropDownMenu, Overlay, ScrollView, ListView, GridRow, TouchableOpacity, TouchableNativeFeedback, Touchable, Button, Icon, createIcon, FormGroup, TextInput, Spinner, Switch, Video, Image, ImagePreview, ImageGallery, InlineGallery, ImageGalleryOverlay, HorizontalPager, LoadingIndicator, PageIndicators, RichMedia, Html, ShareButton, Heading, Title, Subtitle, Text, Caption, Divider, Card, Row, Tile, Lightbox} from '@shoutem/ui'

import {_} from 'lodash'

import RepositoryCard from '../components/RepositoryCard'


class RepositoriesGrid extends React.Component {

    static propTypes = {
        repositoriesArray: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        loadMore:React.PropTypes.func,
        loading:React.PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(rowData, sectionId, index) {
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow

        const cellViews = rowData.map((repository) => {
            return (
                <TouchableOpacity key={repository.id} styleName="flexible" onPress={() => Actions.repositoryPage({owner:repository.owner.login, name:repository.name})}>
                    <RepositoryCard repository={repository}/>
                </TouchableOpacity>
            );
        });

        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        )
    }


    render() {

        const groupedData = GridRow.groupByRows(this.props.repositoriesArray, 2)

        return (
            <View>
                <ListView
                    data={groupedData}
                    renderRow={this.renderRow}
                    onLoadMore={this.props.loadMore}
                    loading={this.props.loading}
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

export default RepositoriesGrid