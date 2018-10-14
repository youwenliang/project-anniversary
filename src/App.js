import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import $ from 'jquery';
import Modal from 'react-responsive-modal';

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
    console.log(images);
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
    var d = a.split('-')[1].replace('.jpg','').replace('_',' ');
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
    var number = url.split('.')[3];
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
