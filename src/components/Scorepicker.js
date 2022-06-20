import React, {useState} from 'react'

const Scorepicker = ({getScore, type, score}) => {

    const [update, setUpdate] = useState(true);

    let data = ["gameplay", "story", "visuals", "soundtrack", "difficulty", "replayability", "balance"];
    let i = -1; i = data.indexOf(type);
    let currentScore = score[i];

    let a = [];
    while(currentScore>0){
        a.push(1);
        currentScore--;
    }
    while(a.length<10){
        a.push(0);
    }


    const passScore = (e) => {
        let v = e.target.innerHTML;
        const obj = {type: type, value: v, index: i};
        getScore(obj);
        setUpdate(!update);

    }

    return (
        <div className='scorepickerwrapper'>
            {
                a.map((el, index)=>{
                    if(el === 1){
                        return <div className="scorepicker scoreactive" key={index+1} onClick={e => passScore(e)}>{index+1}</div>
                    }else{
                        return <div className="scorepicker" key={index+1} onClick={e => passScore(e)}>{index+1}</div>
                    }
                })
            }
        </div>
    )
}

export default Scorepicker