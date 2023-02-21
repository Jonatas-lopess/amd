import { useEffect, useState } from "react";

export const Camera = ({ callback }) => {
    const [recorder, setRecorder] = useState(undefined)

    useEffect(() => {
            navigator.mediaDevices
              .getUserMedia(
                {
                    audio: false,
                    video: {
                        facingMode: { exact: "environment" },
                        width: { ideal: 640, max: 1280 },
                        height: { ideal: 480, max: 720 }
                    },
                }
              )
              .then((stream) => {
                let video = document.querySelector('#camera-container')
                video.srcObject = stream;
                video.onloadedmetadata = () => video.play()

                let mediaRecorder = new MediaRecorder(stream, { videoBitsPerSecond: 1100000 })
                let chunks = []

                mediaRecorder.ondataavailable = event => chunks.push(event.data)
                mediaRecorder.onstop = () => {
                    let blob = new Blob(chunks, { 'type': 'video/mp4;' })
                    chunks = []
                    callback(blob)
                }

                if(recorder === undefined) setRecorder(mediaRecorder)
            })
              .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
            });
    }, [])

    const handleRecord = () => {
        if(!recorder) return

        recorder.state === "recording" ? recorder.stop() : recorder.start()
    }

    return <>
        <video id="camera-container" ></video>
        <div className="camera-buttons" >
            <div className="border">
                <button id="record" className={recorder.state === "recording" ? "recording" : ""} onClick={handleRecord} ></button>
            </div>
        </div>
    </>
}

export default Camera;