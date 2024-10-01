import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Card, Avatar, Table } from 'flowbite-react';


function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axios1 = axios.create({
    baseURL: 'http://localhost:8000',
    
  });

 
  const fetchProfile = async () => {
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios1.get(`http://localhost:8000/profile/${username}`);
      console.log(response.data);
      setProfile(response.data.profile);
    } catch (err) {
      console.error(err);
      setError('Error loading profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username) {
      fetchProfile();
    }
  };

  return (
    <>
    <div className={`min-h-screen flex-col flex  items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500`}>
    <div className="max-w-md min-w-96 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center mb-4" >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white dark:text-gray-100">Leet Code Profile Lookup By Omiii ^_^</h1>
       
      </div>
  
      <form onSubmit={handleFormSubmit} className="mb-4 text-center">
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter username"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          /> 
        </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400  items-center"
            disabled={loading}
          >
            Get Leet-Code Profile
          </button>
      </form>
  
      {loading && <div role="status text-center">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>}
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      </div>
     
  
      {profile && (
  <div className="max-w-md min-w-96 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center mt-6">
    <Card className="dark:bg-gray-800 dark:border-gray-700 p-6">
      <div className="flex flex-col items-center">
        <Avatar
          img={profile.profile.userAvatar}
          size="lg"
          className="border-2 border-blue-600 mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {profile.profile.realName || profile.username}
        </h2>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
        from  {profile.profile.countryName}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          About Me
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {profile.profile.aboutMe || 'No information provided.'}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          Statistics
        </h3>
        <Table hoverable className="dark:bg-gray-800">
          <Table.Body>
            <Table.Row className="dark:bg-gray-800 dark:text-white">
              <Table.Cell>Ranking</Table.Cell>
              <Table.Cell>{profile.profile.ranking}</Table.Cell>
            </Table.Row>
            <Table.Row className="dark:bg-gray-800 dark:text-white">
              <Table.Cell>Reputation</Table.Cell>
              <Table.Cell>{profile.profile.reputation}</Table.Cell>
            </Table.Row>
            <Table.Row className="dark:bg-gray-800 dark:text-white">
              <Table.Cell>Solution Count</Table.Cell>
              <Table.Cell>{profile.profile.solutionCount}</Table.Cell>
            </Table.Row>
            <Table.Row className="dark:bg-gray-800 dark:text-white">
              <Table.Cell>Posts Viewed</Table.Cell>
              <Table.Cell>{profile.profile.postViewCount}</Table.Cell>
            </Table.Row>
            <Table.Row className="dark:bg-gray-800 dark:text-white">
              <Table.Cell>School</Table.Cell>
              <Table.Cell>{profile.profile.school ? `${profile.profile.school} ` : 'No information provided.'}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          Social Links
        </h3>
        <ul className="flex space-x-6 justify-center">
          {profile.githubUrl && (
            <li>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                GitHub
              </a>
            </li>
          )}
          {profile.twitterUrl && (
            <li>
              <a
                href={profile.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                Twitter
              </a>
            </li>
          )}
          {profile.linkedinUrl && (
            <li>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                LinkedIn
              </a>
            </li>
          )}
        </ul>
      </div>
    </Card>
  </div>
)}




  </div>

</>
  
  );
}

export default App;
