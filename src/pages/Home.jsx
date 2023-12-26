import React, { useState } from 'react';
import { TextField, Button, Avatar } from '@material-ui/core';
import GitHubCalendar from 'react-github-calendar';
import { getImageUrl } from '../utils';

export default function Home() {
    const [search, setSearch] = useState(false);
    const [username, setUsername] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [error, setError] = useState('');

    // Handle change in the input field
    const handleChange = (e) => {
        setUsername(e.target.value);
        setSearch(false); // Reset search status
        setError(''); // Reset error status
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            setSearch(true); // Set search status to true
            const profileImageUrl = await getImageUrl(username);

            // If no such account exists
            if (!profileImageUrl) {
                setError('No such account exists');
                return;
            }
            setProfileUrl(profileImageUrl);
        } catch (error) {
            setError('Error fetching data. Please try again.');
            console.error('Error:', error);
        }
    };
    return (
        <div className="home" style={{ backgroundColor: '#EEEEEE', height: '100vh', width: '100vw' }}>
            <div style={{ display: 'flex', gap: '50px', padding: '40px 0', alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Enter GitHub Username"
                    value={username}
                    onChange={handleChange}
                    style={{ backgroundColor: 'white' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: 'black', color: 'white', padding: "14px 18px" }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
            <hr style={{ height: '5px', backgroundColor: 'black', border: 'none' }} />

            <div className="bottom" style={{ padding: '40px', textAlign: 'center' }}>
                {search ? (
                    <>
                        {error ? (
                            <div style={{ color: 'red' }}>{error}</div>
                        ) : (
                            <>
                                <Avatar
                                    src={profileUrl}
                                    alt="profile"
                                    className="border-2 border-black rounded-full w-32 h-32"
                                    style={{ width: '128px', height: '128px' }}
                                />
                                <div className="graph" style={{ backgroundColor: '#fff', padding: '15px', width: 'max-content', margin: 'auto', marginTop: "40px" }}>
                                    <GitHubCalendar username={username} colorScheme="light" blockMargin={6} blockSize={16} fontSize={14} />
                                </div>
                            </>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
}