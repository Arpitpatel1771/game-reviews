import './ccss/Custom.css'

import Axios from 'axios';
import { useState, useEffect } from 'react';
import Container from './components/Container';
import Gamebar from './components/Gamebar';
import Navbar from './components/Navbar';
import Add from './components/Add';


function App() {

  const [gameid, setGameId] = useState(1);
  const [sortfunc, setSortfunc] = useState(10);
  const [data, setData] = useState([{
    id: 0,
    title: 'test',
    cover: 'test',
    review: 'test',
    gameplay: 5,
    story: 5,
    visuals: 5,
    soundtrack: 5,
    difficulty: 5,
    replayability: 5,
    balance: 5
  }]);
  const [obj, setObj] = useState({
    id: 0,
    title: 'test',
    cover: 'test',
    review: 'test',
    gameplay: 5,
    story: 5,
    visuals: 5,
    soundtrack: 5,
    difficulty: 5,
    replayability: 5,
    balance: 5
  });
  const [view, setView] = useState({ id: "Home", detail: 0 });
  const [isEdit, setisEdit] = useState(false);


  const setDatafunc = (func1) => {

    if (typeof (func1) !== "function") {
      return;
    }
    if (func1 !== sortfunc) {
      setSortfunc(prev=>func1);
    }
    let arr = data.slice();
    arr.sort((a, b) => {
      if (typeof (a) === "object" && typeof (b) === "object") {
          if(typeof(sortfunc)==="function"){
            return sortfunc(a, b);
          }
      }
      return 0;
    });
    setData(arr);
    setView({
      id: "Home",
      detail: 0
    })
  }

  useEffect(() => {
    const test = () => {
      Axios.get('http://localhost:3001/get').then((res) => {
        let result = [];
        res.data.forEach(element => {
          result = [...result, {
            id: element.id,
            title: element.title,
            cover: element.cover,
            review: element.review,
            gameplay: element.gameplay,
            story: element.story,
            visuals: element.visuals,
            soundtrack: element.soundtrack,
            difficulty: element.difficulty,
            replayability: element.replayability,
            balance: element.balance,
          }];
        });
        result.sort((a, b) => {
          if (typeof (a) === "object" && typeof (b) === "object") {
              if(typeof(sortfunc)==="function"){
                return sortfunc(a, b);
              }
          }
          return 0;
        });
        setData(result);
      })
    }
    test();
    
  }, [view]);


  const viewGameReview = (id) => {
    setGameId(id);
    setView({
      id: "Home",
      detail: 0
    })
  }
  const gotohome = (id) => {
    setView({
      id: "Home",
      detail: 0
    });
    setGameId(id);
  }
  const showAddPage = () => {
    setisEdit(false);
    setObj({
      id: 0,
      title: '',
      cover: '',
      review: '',
      gameplay: 0,
      story: 0,
      visuals: 0,
      soundtrack: 0,
      difficulty: 0,
      replayability: 0,
      balance: 0
    })
    setGameId(0);
    setView({
      id: "Add",
      detail: 0
    })
  }

  const showEditPage = () => {
    setisEdit(true);
    setObj(data[findindex(gameid)]);
    setGameId(0);
    setView({
      id: "Add",
      detail: 0
    })
  }

  const findindex = () => {
    let v = 0;
    data.forEach((el, index) => {
      if (el.id === gameid) {
        v = index;
      }
    })
    return v;
  }

  const deleteitem = (id) => {
    let confirmation = window.confirm("Are you sure?")
    if (!confirmation) return;
    Axios.delete(`http://localhost:3001/delete/${id}`).then(res => {
      gotohome(1);
    })
  }

  const addReview = (obj) => {
    Axios.post('http://localhost:3001/post', obj).then(res => {
      gotohome(data.length);
    })
  }

  const editReview = (obj) => {
    Axios.put(`http://localhost:3001/put`, obj).then(res => {
      gotohome(obj.id);
    })
  }


  let backImgStyle = {
    background: "url(" + data[findindex()].cover + ") left top/cover no-repeat"
  }

  return (
    <div className="App">
      <Navbar clickFunction={showAddPage} gotohome={gotohome} deletefun={deleteitem} gameid={gameid} edit={showEditPage} />
      <div className="Wrapper" >
        <div style={backImgStyle} className="backimg"></div>
        <Gamebar data={data} activeId={gameid} clickFunction={viewGameReview} setDatafunc={setDatafunc} />
        {
          view.id === "Home" ? <Container data={data[findindex(gameid)]} /> : <></>
        }
        {
          view.id === "Add" ? <Add addReview={addReview} data={obj} isEdit={isEdit} editReview={editReview} /> : <></>
        }
      </div>
    </div>
  );
}

export default App;
