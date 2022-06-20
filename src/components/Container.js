import React from 'react'
import Score from './Score';

const Container = ({ data }) => {
    let overallscore = (data.gameplay + data.story + data.visuals + data.soundtrack + data.difficulty + data.replayability + data.balance);
    overallscore = (overallscore / 7).toFixed(1);

    if (parseFloat(overallscore) === 10.0 || parseFloat(overallscore) === 1.0) {
        overallscore = parseInt(overallscore);
    }

    let review = data.review;

    let taglist = ["USP: ", "Genre: ", "Youtube Series: "];
    let tags = [];
    taglist.forEach((el, index) => {
        tags.push(["None"]);
    })
    taglist.forEach((el, index) => {
        if (data.review.includes(el)) {
            let tagstring = (data.review.split(el)[1].split("\n")[0]).trim();
            tagstring = tagstring.replaceAll(", ", ",");
            tagstring = tagstring.split(",")
            tags[index] = (tagstring);

        } else {

        }
    })

    const trueiftagdoesnotexist = (el) => {
        let returnvalue = true;

        taglist.forEach((tag) => {
            if (el.includes(tag)) {
                returnvalue = !returnvalue;
            }
        })

        return returnvalue;
    }

    review = review.split("\n").filter(trueiftagdoesnotexist).join("\n").trim();

    let reviewarr = review.split("[SPOILER]");
    if (reviewarr.length % 2 === 0) {
        reviewarr = [data.review];
    }


    return (
        <div className='container'>
            <div className="header">
                <img src={data.cover} alt="Cover Art" className="coverart" />
                <div className="title">
                    {data.title}
                </div>
                {
                    overallscore > 7 ? (<div className="overallscore green" >{overallscore}</div>) : (overallscore > 4 ? (<div className="overallscore yellow" >{overallscore}</div>) : (<div className="overallscore red" >{overallscore}</div>))
                }
            </div>
            <div className="details">
                <div className="title2">
                    General Review
                </div>
                <div className="details2">
                    {
                        taglist[0]
                    }
                    {
                        tags[0].map((el, index) => {
                            if (el === "None") {
                                return <span className="tag nonetag" key={index}>{el}</span>
                            } else {
                                return <span className="tag usptag" key={index}>{el}</span>
                            }
                        })
                    }
                    {"\n\n"}
                    {
                        reviewarr.map((el, index) => {
                            if (index % 2 === 0) {
                                return el;
                            } else {
                                return <span className='spoiler' title='Click to reveal Spoilers' key={index}>{el}</span>
                            }
                        })
                    }
                    {"\n\n"}
                    {
                        taglist[1]
                    }
                    {
                        tags[1].map((el, index) => {
                            if (el === "None") {
                                return <span className="tag nonetag" key={index}>{el}</span>
                            } else {
                                return <span className="tag genretag" key={index}>{el}</span>
                            }
                        })
                    }
                    {"\n\n"}
                    {
                        taglist[2]
                    }
                    {
                        tags[2].map((el, index) => {
                            if (el == "None") {
                                return <a href="#" key={index}><span className="tag nonetag" key={index}>{el}</span></a>
                            } else {
                                return <a href={"https://www.youtube.com/c/" + el} target="_blank" key={index}><span className="tag ytbertag" key={index}>{el}</span></a>
                            }
                        })
                    }
                    {"\n\n"}
                </div>
                <div className="hseperator"></div>
                <div className="scorewrapper">
                    <div className="scoretitle">Gameplay</div>
                    <Score score={data.gameplay} />
                </div>
                <div className="scorewrapper">
                    <div className="scoretitle">Story</div>
                    <Score score={data.story} />
                </div>
                <div className="scorewrapper">
                    <div className="scoretitle">Visuals</div>
                    <Score score={data.visuals} />
                </div>
                <div className="scorewrapper">
                    <div className="scoretitle">Soundtrack</div>
                    <Score score={data.soundtrack} />
                </div>
                <div className="scorewrapper">
                    <div className="scoretitle">Difficulty</div>
                    <Score score={data.difficulty} />
                </div>
                <div className="scorewrapper">
                    <div className="scoretitle">Replayablity</div>
                    <Score score={data.replayability} />
                </div>
                <div className="scorewrapper">
                    <div className="scoretitle">Balance</div>
                    <Score score={data.balance} />
                </div>

            </div>
        </div>
    )
}

export default Container