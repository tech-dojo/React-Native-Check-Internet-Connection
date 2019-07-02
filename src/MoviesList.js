import React, { Component } from 'react'
import {
    Container,
    CardItem,
    Body,
    Content,
    Header,
    Left,
    Right,
    Icon,
    Title,
    Button,
    Text,  
  } from 'native-base'
  import { View , StatusBar, Image, StyleSheet} from 'react-native'
  import CheckConnectivity from './CheckConnectivity'

  export default class MoviesList extends Component {
       state={
        connected: 'i dont know',
        listOfMovies: []
       }

    checkConnection=(connectionStatus)=>{
      if(connectionStatus===true && this.state.listOfMovies.length==0)
      {
          this.fetchMovies()
      }
      else 
      {
          this.setState(
              {
                connected: connectionStatus  
              }
          )
      }
     }

     fetchMovies=()=>{
      const url= `https://api.themoviedb.org/3/search/movie?api_key=b1b750c3cd19d76b8e1dff3323603e5f&language=en-US&query=${this.props.navigation.getParam('searchBy')}&page=1&include_adult=false`

        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
           listOfMovies: responseJson.results.length>=10 ? responseJson.results.slice(0,9) : responseJson
          })
        })
      
    }

    render()
    {
        return(
            <Container>
               <Content>
               <CheckConnectivity updateConnection= {this.checkConnection} />   
                      
               {
                   this.state.listOfMovies.map((item,index)=>{
                       return(
                           <CardItem button onPress={()=>{     this.props.navigation.navigate('SingleMovie',
                              {
                                title: item.title,
                                movieId: item.id                            
                              }
                              )}} 
                           >
                            
                                <Image
                                source={{
                                  uri:
                                  `https://image.tmdb.org/t/p/w185/${item.poster_path}`  ,
                                }}
                                style={styles.ImageIconStyle}
                                />                                                    
                                <View style={{flex: 1, flexDirection: 'column'}}>  
                                  <Text>Title: {item.title} </Text>
                                  <Text>Release Date: {item.release_date} </Text>
                                  <Text>Popularity: {item.popularity} </Text>
                                </View>

                           </CardItem>
                       )
                   })
               }
               </Content> 
            </Container>
        )
    }
   }

   
   MoviesList.navigationOptions = ({navigation}) => ({
    header: (
      <Header style={{backgroundColor: '#3c1053'}}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <Left>
          <Button transparent onPress={() => navigation.goBack() }>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 3, marginLeft: 10}}>
          <Title>{navigation.getParam('searchBy', 'Default').toUpperCase()}</Title>
        </Body>
        <Right />
      </Header>
    ),
  })

  const styles = StyleSheet.create({
    ImageIconStyle: {
      marginRight: 5,
      height: 70,
      width: 70,
      resizeMode: 'stretch',
    },
  
  });