import React from 'react'
import { useState, useEffect } from 'react';

const calculateScore = (data) => {
    let overallscore = (data.gameplay + data.story + data.visuals + data.soundtrack + data.difficulty + data.replayability + data.balance);
    overallscore = (overallscore / 7).toFixed(1);

    if (parseFloat(overallscore) === 10.0 || parseFloat(overallscore) === 1.0) {
        overallscore = parseInt(overallscore);
    }

    return overallscore;
}

const AtoZ = (a, b) => {
    return a.title.localeCompare(b.title);
}

const ZtoA = (a, b) => {
    return -1 * a.title.localeCompare(b.title);
}

const chrono = (a, b) => {
    return a.id - b.id;
}

const scorewise = (a, b) => {
    let x = calculateScore(a);
    let y = calculateScore(b);
    return y - x;
}

const Gamebar = ({ data, clickFunction, activeId, setDatafunc }) => {

    const sortbylist = ["Alphabetical (A-Z)", "Alphabetical (Z-A)", "Chronological", "Overall Score"];
    const comparefuncs = [AtoZ, ZtoA, chrono, scorewise];

    const [sortby, setSortby] = useState(2);

    useEffect(() => {
        setDatafunc(comparefuncs[sortby]);       
    }, [sortby])

    const changeSortBy = (el) => {
        var defaultval = 0;
        let index = defaultval;
        if (typeof (el) === "string") {
            index = sortbylist.indexOf(el);
            if (index === -1) index = defaultval;
        }
        if (typeof (el) === "number") {
            index = el;
            if (index < 0 || index > sortbylist.length - 1) {
                index = defaultval;
            }
        }
        setSortby(index);    
    }



    return (
        <div className='sidebar'>
            <div className="sidebar-sortgames">
                Sort By:
                <select className='sidebar-dropdown' name="SortBy" id="1" value={sortbylist[sortby]} onChange={(e) => { changeSortBy(e.target.value) }}>
                    {
                        sortbylist.map((el, index) => {
                            return <option value={el} key={index}>{el}</option>
                        })
                    }
                </select>
            </div>
            <div className="sidebar-content-wrapper">
                {data.map((el) => {
                    if (el.id === activeId) {
                        return <div className="sidebar-content sidebar-content-active" key={el.id} onClick={() => { clickFunction(el.id) }}>{el.title}</div>
                    } else {
                        return <div className="sidebar-content" key={el.id} onClick={() => { clickFunction(el.id) }}>{el.title}</div>
                    }

                })}
            </div>

        </div>
    )
}

export default Gamebar

Gamebar.defaultProps = {
    id: 0,
    title: 'No games found'
};