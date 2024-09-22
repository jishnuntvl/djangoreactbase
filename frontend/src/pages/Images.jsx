import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Ensure axios is set up with your baseURL
import { Imageurl } from '../Constants'; // Set this to the URL where images are served

function Images() {
    const [state, setState] = useState([]); // State to store images
    const [selectedFile, setSelectedFile] = useState(null); // To store the selected image
    const [caption, setCaption] = useState(''); // To store the caption

    // Fetch images when the component mounts
    useEffect(() => {
        axios.get('images/')
            .then((response) => {
                console.log(response.data);
                setState(response.data);
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }, []);

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle caption input change
    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    // Add image and caption
    const addImage = async () => {
        if (!selectedFile) {
            alert("Please select an image and enter a caption.");
            return;
        }

        const formData = new FormData();
        formData.append('images', selectedFile); // 'images' is the field for image
        formData.append('caption', caption);     // 'caption' is the field for caption

        try {
            const response = await axios.post('images/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setState([...state, response.data]); // Add the new image to the state
            setSelectedFile(null); // Clear the file input after upload
            setCaption(''); // Clear the caption input after upload
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <h2>Upload an Image with Caption</h2>
            <input type="file" name="file" onChange={handleFileChange} />
            <input 
                type="text" 
                placeholder="Enter caption" 
                value={caption} 
                onChange={handleCaptionChange} 
            />
            <button onClick={addImage}>Add Image</button>

            <h3>Gallery</h3>
            <div>
                {state.map((obj) => (
                    <div key={obj.id} style={{ marginBottom: '10px' }}>
                        <img 
                            src={Imageurl + obj.images} 
                            alt={obj.caption} 
                             
                        />
                        <p>{obj.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Images;
