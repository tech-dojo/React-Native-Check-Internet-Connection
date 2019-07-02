import React, { Component } from 'react'
import {  StatusBar } from 'react-native'
import {
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Right,
  Title,
  Button,
  Text,
} from 'native-base'
 import CheckConnectivity from './CheckConnectivity'
 export default class HomeScreen extends Component {
     state= {
         connected: 'i dont know',
         listOfMovies: []
     }

     componentDidMount=()=>{
        this.fetchFilm()
     }

     checkConnection=(connectionStatus)=>{
        this.setState(
            {
              connected: connectionStatus  
            }
        )
     }
     fetchFilm=()=>{
     const imgUrl= "https://image.tmdb.org/t/p/w185/kBf3g9crrADGMc2AMAMlLBgSm2h.jpg"  
      const urlString= "https://api.themoviedb.org/3/search/movie?api_key=b1b750c3cd19d76b8e1dff3323603e5f&language=en-US&query=marvel&page=1&include_adult=false"
      fetch(urlString)
       
        .then(response => response.json())
        .then(responseJson => {
          console.log('Movies: ', responseJson)
          let temp= responseJson.results.slice(0,5)
          this.setState({
           listOfMovies: temp 
          })
        })
      
     }
     render()
     {
         return(
             <Container>
                 <Content>
                     <CheckConnectivity updateConnection= {this.checkConnection} />
                    <Card> 
                    {
                         this.state.connected=== 'i dont know' &&
                         <CardItem>
                         <Text>I dont know if there is connection or not</Text>
                         </CardItem>
                     }   
                     {
              
                         <>
                       
                         <Button block style={{ backgroundColor: this.state.connected ?'#ad5389': 'grey' , marginBottom:10, marginTop:10}} 
                         onPress={() =>
                          this.props.navigation.navigate('MoviesList', {
                          
                            searchBy: 'superman',
                            
                          })
                        }
                         >
                           <Text>Superman</Text>
                         </Button>

                        <Button block style={{ backgroundColor: this.state.connected ?'#ad5389': 'grey' }} 
                         onPress={() =>
                          this.props.navigation.navigate('MoviesList', {
                          
                            searchBy: 'batman',
                            
                          })
                        }
                        >
                          <Text>Batman</Text>
                        </Button>

                        
                         </>
                         
                     }   
                                       
                     </Card> 
                 </Content>
             </Container>
         )
     }
 }

 HomeScreen.navigationOptions = ({navigation}) => ({
    header: (
      <Header style={{backgroundColor: '#3c1053'}}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        
        <Body style={{flex: 3, marginLeft: 10}}>
          <Title>Movies</Title>
        </Body>
        <Right />
      </Header>
    ),
  })

 