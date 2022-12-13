import React, { useState, useEffect } from "react";

function UploadImages() {
    const style = {
        margin: "1rem 0",
        padding: "1rem",
        border: "2px solid white",
        cursor: "pointer"
    }
    const [images, setImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = [];
        images.forEach(i => newImageURLs.push(URL.createObjectURL(i)));
        setImagesURLs(newImageURLs);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }
    
    return (
        <>
        <label htmlFor="image-upload" style={style}>
            <input id="image-upload" type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={onImageChange} capture="environment" />
            Upload Images
        </label>
        <div style={{display:'flex',flexDirection:'row'}}>
            {imagesURLs.map((imageSrc, i) => <img key={i} width="200" alt="" src={imageSrc} />)}
        </div>
        </>
    );
}

export default UploadImages;