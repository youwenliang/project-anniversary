import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import $ from 'jquery';
import Modal from 'react-responsive-modal';
import loadImage from 'image-promise';

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
const imagesAmount = images.length;

class App extends Component {
  componentDidMount(){
    $('.container').height($('.container').width());
    $(window).resize(function(){
      $('.container').height($('.container').width());
    })
    var updateImages = [];
    for(var i = 0; i < images.length; i++){
      updateImages[i] = images[i].replace('/static/media', '/images');
      var number = updateImages[i].split('.')[2];
      updateImages[i] = updateImages[i].replace(number+'.', '');
    }
    console.log(updateImages);
    loadImage(updateImages)
    .then(function (allImgs) {
      console.log(allImgs.length, 'images loaded!', allImgs);
      setTimeout(function(){
        $('.loading').addClass('hide');
      },800);
    })
    .catch(function (err) {
      console.error('One or more images have failed to load :(');
      console.error(err.errored);
      console.info('But these loaded fine:');
      console.info(err.loaded);
    });
  }
  render() {
    var center = {
      backgroundImage: "url("+logo+")",
      backgroundPosition: "center center",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%"
    }
    return (
      <div className="App">
        <div className="loading">
          <img src={logo} width="50%"/>
          <p>loading photos...</p>
        </div>
        <div className="container">
          <Photo id="1"/>
          <Photo id="2"/>
          <Photo id="3"/>
          <Photo id="4"/>
          <div className="overflow-hidden">
            <div className="item center" style={center}></div>
          </div>
          <Photo id="5"/>
          <Photo id="6"/>
          <Photo id="7"/>
          <Photo id="8"/>
        </div>
      </div>
    );
  }
}

class Photo extends Component {
  state = {
    open: false,
    img: "",
    description: ""
  };
 
  onOpenModal = (a) => {
    var d = a.split('-')[2].replace('.jpg','').replace('_',' ');
    this.setState({ open: true, img: a, description: d });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentDidMount(){
    var $this = this;
    setInterval(function(){
      if(!$this.state.open) {
        $('.item#'+$this.props.id).toggleClass('rotate');
        setTimeout(function(){
          $this.forceUpdate();
        }, 300)
      }
    }, Math.floor((Math.random() * 4000)+4000))
  }

  render() {
    var url = images[Math.floor((Math.random() * imagesAmount))].replace('/static/media', '/images');
    var number = url.split('.')[2];
    url = url.replace(number+'.', '');
    
    var img = {
      backgroundImage: "url("+url+")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      imageOrientation: "0deg",
      cursor: "pointer",
      width: "100%",
      height: "100%"
    }
    const { open } = this.state;
    return (
      <div className="overflow-hidden">
        <div className="item" id={this.props.id} style={img} onClick={()=> this.onOpenModal(url)}></div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <img className="modalImg" src={this.state.img}></img>
          <p className="modalDescription">{this.state.description}</p>
        </Modal>
      </div>
    )
  };
}

export default App;
