import React from 'react'
import {MdDelete} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'

const Navbar = ({clickFunction, gotohome, deletefun, gameid, edit}) => {
  
  const disableDelete = true;

  const callHome = ()=>{
    gotohome(1);
  }

  return (
    <div className='bar'>
        <div className='tab' onClick={callHome}>
            GR
        </div>
        <div className="vseperator"></div>
        <div className="tab tabsm" onClick={callHome}>
            Home
        </div>
        <div className="tab tabsm" onClick={clickFunction}>
            Add Review
        </div>
        <div className="buttons">
          <button className="btn edit" onClick={edit}><AiFillEdit/></button>
          <button className="btn delete" onClick={()=>{deletefun(gameid)}} disabled={gameid===1 || disableDelete}><MdDelete/></button>
        </div>
    </div>
  )
}

export default Navbar