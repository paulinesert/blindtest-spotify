/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQCFtE6HgKFdbk6z1ZE2HgpHDWebt7SS1yEdtHlkD1NC0oSbGaOj8geXPnwRT_mJx_Kz07wzCdHAKf6i3DhUphGWXtkDgGrinD2aRmEb3IIcB7MjaR6M_m430SdTsDuhaRVkuOuahvLNdpJHEfo1wfXCyMCDgyGj09NnFp9Q8SIqDw';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
       text:"Bonjour!",
       nbOfSongs: 0, 
       songs: [], 
      }
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/playlists/1wCB2uVwBCIbJA9rar5B77/tracks', {
    method: 'GET',
    headers: {
    Authorization: 'Bearer ' + apiToken,
    },
  })
  .then(response => response.json())
  .then((data) => {
    this.setState({nbOfSongs: data.items.length, songs: data.items}); 
    console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data.items);
  })
  }

  render() {
    const { songs, nbOfSongs, text } = this.state; 
    const song1 = songs[0]
    const song2 = songs[1]
    const song3 = songs[2]
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title"><p>{text}</p></h1>
        </header>
        {this.state.nbOfSongs !==0 ? <>

          <div className="App-images">
          <p>Il y a {nbOfSongs} musiques dans ta playlist!</p>
          <p>Voici 1 album de la playlist:</p> 
          {/* {songs.map((song, index) => <p key={index}> {index+1} {song.track.name} </p>)} */}
          </div>
          <AlbumCover key={0} index={0} track={song1}> </AlbumCover>

          <Sound url={song1.track.preview_url} playStatus={Sound.status.PLAYING}/>

        <div className="App-buttons">
        <Button>{song1.track.name}</Button>
          <Button>{song2.track.name}</Button>
          <Button>{song3.track.name}</Button>
        </div>
        </> :  <img src={loading} className="App-logo" alt="logo"/>
        }
      </div>
    );
  }
}

export default App;

class AlbumCover extends Component { 
  
   render(){
    const {index, track}= this.props.track ; 
    const src = track.album.images[0].url; 
    return( <img src={src} style={{ width: 400, height: 400 }} />
    )  
   }
   
    // const src = ; // A changer ;)
    // return (<img src={src} style={{ width: 400, height: 400 }} />);
  }









