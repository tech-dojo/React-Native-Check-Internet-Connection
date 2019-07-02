import React, { Component } from 'react'
import {
    Container,
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
   export default class SingleMovie extends Component {
       state={
        connected: 'i dont know',
        movieInfo: ''
       }

    checkConnection=(connectionStatus)=>{
        if(connectionStatus===true && this.state.movieInfo=='')
        {
            this.fetchMovieDetails()
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
     fetchMovieDetails=()=>{

      const url= `https://api.themoviedb.org/3/movie/${this.props.navigation.getParam('movieId')}?api_key=b1b750c3cd19d76b8e1dff3323603e5f`


        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          console.log('Movie Info ', responseJson)
          this.setState({
            connected: true ,
           movieInfo: responseJson
          })
        })
      
    }

    render()
    {

        return(
            <Container>
               <Content style={{flex:1}}>
               <CheckConnectivity updateConnection= {this.checkConnection} />   

               {
                 this.state.movieInfo!= '' &&
                   <View style={{ flex:1,  justifyContent:'center', margin:'auto' ,padding:10}}>
                      <Image
                        source={{
                          uri:
                          `https://image.tmdb.org/t/p/w185/${this.state.movieInfo.poster_path}`  ,
                        }}
                        style={styles.ImageIconStyle}
                      />     
                      <View style={{   backgroundColor:'lightgrey', margin:'auto' ,padding:10}}>
                        <Text>Tagline: { this.state.movieInfo.tagline}</Text>  
                        <Text>Released at : { this.state.movieInfo.release_date}</Text>  
                        <Text>Duration: { this.state.movieInfo.runtime+" min"}</Text>  
                        <Text>Overview: { this.state.movieInfo.overview}</Text>  
                        <Text>Revenue: { "$ "+this.state.movieInfo.revenue}</Text>  
                      </View>
                  </View>

               }      
               </Content> 
            </Container>
        )
    }
   }

   
   SingleMovie.navigationOptions = ({navigation}) => ({
    header: (
      <Header style={{backgroundColor: '#3c1053'}}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <Left>
          <Button transparent onPress={() => navigation.goBack() }>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 3, marginLeft: 10}}>
          <Title>{navigation.getParam('title', 'Default').toUpperCase()}</Title>
        </Body>
        <Right />
      </Header>
    ),
  })

  const styles = StyleSheet.create({
   
    ImageIconStyle: {
     
      padding: 10,
      marginBottom: 10,
      height: 100,
      width: 100,
      
    },
   
  });