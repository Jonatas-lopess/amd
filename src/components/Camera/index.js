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

                let button = document.querySelector('#record')
                let recorder = new MediaRecorder(stream, { mimeType: "video/mp4; codecs=avc" })
                let chunks = []

                button.addEventListener('click', () => {
                    recording ? recorder.stop() : recorder.start()
                })
                recorder.ondataavailable = event => chunks.push(event.data)
                recorder.onstart = () => setRecording(true)
                recorder.onstop = () => {
                    let blob = new Blob(chunks, { 'type': 'video/mp4;' })
                    chunks = []
                    setRecording(false)
                    callback(blob)
                }
              })
              .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
            });
    }, [])

    return <>
        <video id="camera-container" ></video>
        <div className="camera-buttons" >
            <button id="record">Gravar</button>
        </div>
    </>
}

export default Camera;