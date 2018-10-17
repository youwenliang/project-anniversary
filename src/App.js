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
    $('.text').height($('.text').width());
    $(window).resize(function(){
      $('.container').height($('.container').width());
      $('.text').height($('.text').width());
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

        $('.center').click(function(e){
          e.stopPropagation();
          $('.container').addClass('rotate');
          $('.text').addClass('rotate');
        })
        $('#root').click(function(e){
          $('.container').removeClass('rotate');
          $('.text').removeClass('rotate');
        });
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
        <div className="text">
          <p>To Nita: 結婚一週年快樂！</p>
          <p>新婚生活的第一年轉眼就過了，也代表我們從認識到現在已經快九年了！現在已經習慣一直有彼此在身邊，實在很難想像當初曾經這麼長時間的遠距離．這一年一起生活的日子讓我們變的更有默契，常常可以馬上知道你腦中浮出的想法，讓我都懷疑自己是不是會讀心術了．只能說我們是越來越懂彼此，也越來越能包容各自的優缺點．很感謝妳常常假日煮飯給我吃，讓我們不用煩惱要吃什麼；</p>
          <p className="small">(點擊任何處回到瀏覽照片)</p>
        </div>
        <div className="loading">
          <img src={logo} width="80%"/>
          <p className="saving">loading photos<span>.</span><span>.</span><span>.</span></p>
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
    var d = a.split('mark')[1].split('-')[1].replace('.jpg','').replace('_',' ');
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
