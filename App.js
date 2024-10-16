import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Form from './components/Form/Form';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const initialState = {
    input: ``,
    imageUrl: ``,
    faceBoxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '125',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});    
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // eslint-disable-next-line no-useless-concat
    // fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    fetch('https://photobrain-backend.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
      })
    })
    .then(response => response.json())
    .then(result => {

      if(result) {
        fetch('https://photobrain-backend.onrender.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      
      // console.log(result)
      const regions = result.outputs[0].data.regions;

      const faceBoxes = regions.map(region => {
        // Accessing and rounding the bounding box values
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row;
        const leftCol = boundingBox.left_col;
        const bottomRow = boundingBox.bottom_row;
        const rightCol = boundingBox.right_col;

        const image = document.getElementById("inputImage");
        const width = Number(image.width);
        const height = Number(image.height)
        return {
          leftCol: leftCol * width,
          topRow: topRow * height,
          rightCol: width - (rightCol * width),
          bottomRow: height - (bottomRow * height)
        }
    });
    this.setState({ faceBoxes })
    console.log(faceBoxes);
  })
  .catch(error => console.log('error', error));
 }

 onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
 }

  render () {
    const { isSignedIn, route, faceBoxes, imageUrl } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" color="#FFFFFF" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
            ? <div>
                <Logo />
                <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
                <ImageLinkForm 
                  inputChange={this.onInputChange} 
                  pictureSubmit={this.onPictureSubmit}
                  />
                <FaceRecognition faceBoxes={faceBoxes} imageUrl={imageUrl}/>
              </div>
            : (
                <Form route={route} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
            }
      </div>
    );
  }
}
 
export default App;
