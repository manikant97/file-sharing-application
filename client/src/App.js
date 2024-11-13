
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './services/api';


function App() {
    const [file, setFile] = useState('');
    const [result, setResult] = useState('');
    const fileInputRef = useRef();
    const url = 'https://storage.googleapis.com/a1aa/image/z5LeqeenTXOlkJIKFZeWayhcmkiTyqG6Uef5LnPZ1Bvq9CD8E.jpg';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                setResult(response.path);
            }
        };
        getImage();
    }, [file]);

    const onUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="container">
            <img src={url} alt="image" className="sample-image" />
            <div className="text-center">
                <h1 className="title">Simple File Sharing!</h1>
                <p className="description">Upload and share the download link.</p>

                <button onClick={onUploadClick} className="upload-button">
                    <i className="fas fa-upload icon"></i>Upload
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

{result && (
                    <div className="link-container">
                        <a href={result} target='_blank' rel='noopener noreferrer' className="download-link">
                            {result}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
