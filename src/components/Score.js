import React from 'react'

const Score = ({score}) => {
    
    const a = [];
    const b = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    while(score>0){
        a.push(1);
        b.pop();
        score--;
    }

    return (
        <div className="score">
        <div className='scorenum'>{a.length}
        </div>
        {
            a.map((el, index)=>{
                return <div key={index} className="sqr filled"></div>
            })
        }
        {
            b.map((el, index)=>{
                return <div key={index} className='sqr'></div>
            })
        }
        </div>
    )
}

export default Score

Score.defaultProps = {
    score: 0
};