const accessToken = process.env.REACT_APP_TOKEN;

export const getImageUrl = async (username) => {
    try {
        const headers = new Headers({
            Authorization: `Bearer ${accessToken}`,
        });
        // fetch profile picture
        const response = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!response.ok) {
            return "";
        }
        const data = await response.json();
        const profileImageURL = data.avatar_url;
        return profileImageURL;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}