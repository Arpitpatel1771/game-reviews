import React, { useState, useEffect } from 'react'
import Scorepicker from './Scorepicker'

const Add = ({ addReview, data, isEdit, editReview }) => {
    const [title, setTitle] = useState(data.title);
    const [cover, setCover] = useState(data.cover);
    const [review, setReview] = useState(data.review);
    const [score, setScore] = useState([data.gameplay, data.story, data.visuals, data.soundtrack, data.difficulty, data.replayability, data.balance]);

    let previewalttext = "";

    if(cover.trim()===""){
        previewalttext = "";
    }else{
        previewalttext = "Image not found. Please check the link entered.";
    }

    const validate = (e) => {
        e.map((el) => {
            if (isNaN(el) || el < 0) return 0;
            if (el > 10) return 10;
            return el;
        })
    }

    let data2 = ["gameplay", "story", "visuals", "soundtrack", "difficulty", "replayability", "balance"];

    const obj = data;

    const getScore = (e) => {
        obj[e.type] = parseInt(e.value);
        let a = score;
        a[e.index] = parseInt(e.value);
        validate(a);
        setScore(a);
    }

    const submit = () => {
        obj.title = title.trim();
        obj.cover = cover.trim() === '' ? '#' : cover.trim();
        obj.review = review.trim();

        let i = 0;
        while (i < 7) {
            obj[data2[i]] = score[i];
            i++;
        }
        if (obj.title.trim() !== '' && obj.cover.trim() !== '#' && obj.review.trim() !== '') {
            console.log('Submitting..');
            if (isEdit) {
                obj.id = data.id;
                editReview(obj);
            } else {
                addReview(obj);
            }
        }
    }

    return (
        <div className='addwrapper'>
            <div className='inputwrapper'>
                <span className='inputtag'>Title</span>
                <input className='input inputtitle' onChange={e => setTitle(e.target.value)} value={title} />
            </div>
            <div className='inputwrapper'>
                <span className='inputtag'>Cover art link</span>
                <input className='input inputcover' onChange={e => setCover(e.target.value)} value={cover} />
            </div>
            <div className='inputwrapper'>
                <span className='inputtag'>Review <span className="smallwhite">Taglist: USP, Genre, Youtube Series</span></span>
                <textarea className='input inputreview' onChange={e => setReview(e.target.value)} value={review} placeholder='Wrap text within [SPOILER] to set spoiler text. [SPOILER] This will be a spoiler [SPOILER].' />
            </div>
            <div className="inputwrapper3">
                <div className="inputwrapper2">
                    <div className='inputwrapper'>
                        <span className='inputtagscore'>Gameplay</span>
                        <Scorepicker getScore={getScore} type="gameplay" score={score} />
                    </div>
                    <div className='inputwrapper'>
                        <span className='inputtagscore'>Story</span>
                        <Scorepicker getScore={getScore} type="story" score={score} />
                    </div>
                    <div className='inputwrapper'>
                        <span className='inputtagscore'>Visuals</span>
                        <Scorepicker getScore={getScore} type="visuals" score={score} />
                    </div>
                    <div className='inputwrapper'>
                        <span className='inputtagscore'>Soundtrack</span>
                        <Scorepicker getScore={getScore} type="soundtrack" score={score} />
                    </div>
                    <div className='inputwrapper'>
                        <span className='inputtagscore'>Difficulty</span>
                        <Scorepicker getScore={getScore} type="difficulty" score={score} />
                    </div>
                    <div className='inputwrapper'>
                        <span className='inputtagscore'>Replayability</span>
                        <Scorepicker getScore={getScore} type="replayability" score={score} />
                    </div>
                    <div className='inputwrapper'>
                        <span className='inputtagscore'>Balance</span>
                        <Scorepicker getScore={getScore} type="balance" score={score} />
                    </div>
                </div>
                <div className="imgprevwrapper">
                    <img src={cover} alt={previewalttext} className="imgprev" />
                </div>
            </div>
            <div className="inputwrapper">
                <button className='submit' onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default Add