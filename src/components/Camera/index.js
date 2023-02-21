import { useEffect, useState } from "react";

export const Camera = ({ callback }) => {
    const [recording, setRecording] = useState(false)

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

                let mediaRecorder = new MediaRecorder(stream, { videoBitsPerSecond: 1100000, mimeType: "video/mp4" })
                let chunks = []

                mediaRecorder.ondataavailable = event => chunks.push(event.data)
                mediaRecorder.onstart = () => setRecording(true)
                mediaRecorder.onstop = () => {
                    let blob = new Blob(chunks, { 'type': 'video/mp4;' })
                    chunks = []
                    setRecording(false)
                    callback(blob)
                }

                let button = document.querySelector("#record")
                button.addEventListener('click', () => {
                    mediaRecorder.start()
                })
              })
              .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
            });
    }, [])

    return <>
        <video id="camera-container" ></video>
        <div className="camera-buttons" >
            <div className="border">
                <button id="record" className={recording ? "recording" : ""} ></button>
            </div>
        </div>
    </>
}

export default Camera;