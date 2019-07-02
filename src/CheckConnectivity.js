import React, { Component } from 'react'
import {
  Card,
  CardItem,
  Left,
  Icon,
  Text,
} from 'native-base'
 import NetInfo from '@react-native-community/netinfo'

export default class CheckConnectivity extends Component {
  constructor(props) {
          super(props);

          this.state = {
            status: "Unknown"
          }
        }
        componentDidMount() {

            NetInfo.isConnected.addEventListener(
                'connectionChange',
                isConnected => {                        
                  this.props.updateConnection(isConnected)
                  this.setState(  { status: isConnected ? true : false } )
                }
            );
        }

  render()
  {
    console.log("Connection" , this.state.status)
    return(
      <>
      {this.state.status ? <></>:
        <Card>
        <CardItem style={{ backgroundColor: '#EAEAEA' }}>
          <Left>
            <Icon
              active
              name="warning"
              style={{ fontSize: 26, width: 30, marginRight: 10 }}
            />
            <Text>No internet connection</Text>
          </Left>
        </CardItem>
      </Card>
      }
      </>

    )
  }
}
