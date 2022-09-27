import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Image from './components/Image';
import GoodsCard from './components/GoodsCard';
import banana_pic from './pictures/banana.png';
import sugar_pic from './pictures/sugar.png';
import orange_pic from './pictures/orange.png';
import coconut_pic from './pictures/coconut.png';
import butter_pic from './pictures/butter.png';
import bread_pic from './pictures/bread.png';

function App() {
  return (
    <div className='App'>
      <div >
        <Header />
        <Content />
        <Image />
      </div>
      
      <div>
        <GoodsCard photo={banana_pic} name="banana" price="50"/>
        <GoodsCard photo={bread_pic} name="bread" price="30"/>
        <GoodsCard photo={butter_pic} name="butter" price="80"/>
        <GoodsCard photo={sugar_pic} name="sugar" price="20"/>
        <GoodsCard photo={coconut_pic} name="coconut" price="90"/>
        <GoodsCard photo={orange_pic} name="orange" price="60"/>
      </div>
    </div>
  );
}

export default App;
