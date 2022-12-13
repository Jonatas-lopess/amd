import React, { useState, useEffect } from "react";

function UploadVideos() {
    const style = {
        margin: "1rem 0",
        padding: "1rem",
        border: "2px solid white",
        cursor: "pointer"
    }
    const [videos, setVideos] = useState([]);
    const [videosURLs, setVideosURLs] = useState([]);

    useEffect(() => {
        if (videos.length < 1) return;
        const newVideoURLs = [];
        videos.forEach(v => newVideoURLs.push(URL.createObjectURL(v)));
        setVideosURLs(newVideoURLs);
    }, [videos]);

    function onVideoChange(e) {
        setVideos([...e.target.files]);
    }
    
    return (
        <>
        <label htmlFor="video-upload" style={style}>
            <input id="video-upload" type="file" multiple accept="video/*" style={{ display: 'none' }} onChange={onVideoChange} capture="environment" />
            Upload Videos
        </label>
        <div style={{display:'flex',flexDirection:'row'}}>
            { videosURLs.map((videoSrc, i) => {
                return (
                    <video key={i} width={300} height={300} controls>
                        <source src={videoSrc} type={videos[i].type} />
                        "Seu brouser não suporta vídeos"
                    </video>
                );
            })}
        </div>
        </>
    );
}

export default UploadVideos;