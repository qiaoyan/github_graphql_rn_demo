import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Actions } from 'react-native-router-flux'

import { View, Text } from '@shoutem/ui'

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

    if (loading || !viewer) {
      return (<Text>Loading</Text>)
    }

    return (
        <View style={{marginTop: 64}}>
          <Text>
            测试测试
          </Text>
        </View>
    )

    // return (
    //     <View style={{flex: 1, marginTop: 64,}}>
    //         <View>
    //           <Button
    //               onPress={() => Actions.profilePage()}
    //               title="My Profile"
    //               color="#841584"
    //               accessibilityLabel="Learn more about this purple button"
    //           />
    //           <Button
    //               onPress={() => Actions.starsPage()}
    //               title="My Stars"
    //               color="#841584"
    //               accessibilityLabel="Learn more about this purple button"
    //           />
    //         </View>
    //     </View>
    // )
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

const WithData = graphql(ViewerQuery, {
  options: {
    variables: {
    },
    fetchPolicy: 'cache-and-network',
  }
})(LandingPage)

export default WithData
