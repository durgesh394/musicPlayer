import React, { useContext, useRef, useState } from 'react'
import { musicContext } from '../App';
const Music = () => {
    const musicdata = useContext(musicContext);
    const [count, setcount] = useState(0)
    const [isplaying, setisplaying] = useState(true);
    const [input, setinput] = useState("");
    const [progressbar, setprogressbar] = useState({ width: "0%" })
    const [timeduration, settimeduration] = useState("00:00");
    const [timesec ,setTimesec] = useState("00:00");
    // console.log(timeduration)
    const musicplay = useRef();


    



    //for song play and pause and change icon of play and pause song
    const musicplaypause = () => {
        if (isplaying) {
            musicplay.current.play();
            setisplaying(false)
        } else {
            musicplay.current.pause();
            setisplaying(true)
        }
    }


    //for next song
    const nextsong = () => {
        setcount(count + 1);
        musicplay.current.play();
    }
    //for  previous song
    const previousong = () => {
        if (count >= 1) {
            setcount(count - 1)
            musicplay.current.play();
        }
    }


    const timeupdate = () => {
        const totaltime = musicplay.current.duration
        const ctime = musicplay.current.currentTime
        const totalwith = (ctime / totaltime) * 100;
        setprogressbar({ width: `${totalwith}%` })

        const duration= musicplay.current.duration;
        const minut = duration / 60;
        const second = duration % 60;
        settimeduration(`${Math.floor(minut)}:${Math.floor(second)}`)
       

        const currentminutduraton = ctime/60;
        const currentsecduration = ctime % 60;
        
        setTimesec(`${Math.floor(currentminutduraton)}:${Math.floor(currentsecduration)}`);
    }

    return (
        <>

            {/* <audio src={musicdata[count].src} ref={musicplay}></audio> */}
            <div className='music_container'>

                <div className="inner-container">

                    <div className="topBar">
                        <span><i className="fa-solid fa-music"></i></span>
                        <span className='topbarSearch'><i className="fa-solid fa-magnifying-glass"></i><input value={input} onChange={(e) => { setinput(e.target.value) }} type="text" placeholder='Search by Song name & Aritist name...' className='search-music' /></span>
                    </div>

                    <div className="hero-section">
                        <div className="play-container">
                            <span style={{ float: "right", marginRight: "10px", marginTop: "10px" }}><i class="fa-regular fa-heart"></i></span>
                            <p className='musicName'>{musicdata[count].name}</p>
                            <img src={musicdata[count].img} alt="music pic" className='musicImg' />
                            <div className="songRange">

                            </div>

                            {/* music progress bar start*/}
                            <div className="timeduration">
                                <span style={{ marginLeft: "20px", fontSize: "10px" }}>{timesec}</span>
                                <span style={{ marginRight: "20px", fontSize: "10px" }}>{timeduration}</span>
                            </div>
                            <div className="progressedCon">
                                <div className='progress' style={progressbar}></div>
                            </div>
                            <br />
                            {/* music progress bar end*/}
                            <div className="music_Control">

                                <span onClick={() => { previousong() }}><i className="fa-solid fa-backward"></i></span>
                                {
                                    isplaying ? <span className='play-Pause' onClick={() => { musicplaypause() }}><i className="fa-solid fa-play"></i></span> : <span onClick={() => { musicplaypause() }}><i className="fa-solid fa-pause"></i></span>
                                }
                                <span onClick={() => { nextsong() }}><i className="fa-solid fa-forward"></i></span>
                            </div>

                        </div>
                        <div className="songList">
                            <h3 style={{ textAlign: "center", padding: "5px", fontFamily: "sans-serif" }}>Song List</h3>
                            {
                                musicdata.map((music, ind) => {
                                    return (<>
                                        <audio src={musicdata[count].src} ref={musicplay} onTimeUpdate={timeupdate} />
                                        <div className="listCon">
                                            <span style={{ padding: "10px", marginLeft: "5px" }}>{music.id}</span>
                                            <span style={{ padding: "10px 3px" }} onClick={() => { musicplaypause(setcount(music.id)) }}>{music.name}</span> <br />
                                        </div>
                                    </>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Music
