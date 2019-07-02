import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen'
import MoviesList from './MoviesList'
import SingleMovie from './SingleMovie'
class StackNav extends React.Component{
  constructor(props)
  {
    super(props)
  }

  render()
  {
    return(
     <RootStack />
    )
  }
}

// It Contains the List of pages that I can explore
 // return <RootStack />;


const RootStack = createStackNavigator(
  {

  HomeScreen: {  screen: HomeScreen },
  MoviesList: { screen: MoviesList},
  SingleMovie :{screen: SingleMovie}

},
{
  initialRouteName: 'HomeScreen'
}

);



export default StackNav