import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './upload.css';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState(null);
  const [file, setFile] = useState(null);
  const [perm, setPerm] = useState(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [allVideos, setAllVideos] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const activeUser = localStorage.getItem('username');
    if (activeUser) {
      setOwner(activeUser);
    }
    getVideos();
  }, []);


  const getVideos = async () => {
    const result = await axios.get('http://localhost:5000/get-videos');
    console.log(result.data.data);
    setAllVideos(result.data.data);
  }

  const addVideo =  async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title!);
    formData.append('perm', perm!);
    formData.append('owner', owner!);
    formData.append('file', file!);
    console.log(title, file, perm);
    const result = await axios.post(
      'http://localhost:5000/upload',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.log(result);
    alert('Video wurde erfolgreich hochgeladen...');
    navigate('/home');
  };

  return (
    <div>
      <form onSubmit={addVideo}>
        <div className='upload-container'>
        <h1>Upload Video</h1>
          <input type="text" required placeholder='Videotitel...' onChange={(e) => setTitle(e.target.value)} />
          <select  name='sddsdsd' onChange={(e) => setPerm(e.target.value)}>
            <option value=""> --Please choose an option-- </option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="privat">Admins</option>
          </select>
          <input type="file" required onChange={(e) => setFile(e.target.files[0])} />
          <h3 className='owner'>User: {owner}</h3>
          <button type='submit'>Upload</button>
        </div>
      </form>
    </div>
  )
}

export default App;