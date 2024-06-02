import { useEffect, useState } from 'react';

function Status({ bookId }) {
    const address = 'localhost';
    const port = '80';
    const userId = sessionStorage.getItem('userId');

    const [status, setStatus] = useState(null);
    const [stateImg, setStateImg] = useState('/img/default.png'); // default image

    const checkStatus = async () => {
        if (!userId) {
            console.error('User ID not found in sessionStorage');
            return;
        }

        try {
            const response = await fetch(`http://${address}:${port}/favorite/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch favorites:', response.statusText);
                return;
            }

            const favorites = await response.json();
            let found = false;

            favorites.forEach(favorite => {
                console.log(`Favorite state: ${favorite.state}`);
                if (favorite.bookId === bookId) {
                    found = true;
                    console.log(`Matching state found: ${favorite.state}`);
                    if (favorite.state === 'toread') {
                        setStatus('toread');
                    } else if (favorite.state === 'reading') {
                        setStatus('reading');
                    } else if (favorite.state === 'read') {
                        setStatus('read');
                    }
                }
            });

            if (!found) {
                console.log('No matching state found');
                setStatus(null);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    useEffect(() => {
        checkStatus();
    }, [bookId]);

    useEffect(() => {
        if (status === 'toread') {
            setStateImg('/img/toread.png');
        } else if (status === 'reading') {
            setStateImg('/img/reading.png');
        } else if (status === 'read') {
            setStateImg('/img/read.png');
        } else {
            setStateImg('/img/default.png'); // reset to default if no status
        }
    }, [status]);

    // Utilisez l'ID du favori au lieu de l'ID de l'utilisateur
const changeStatus = async () => {
    try {
        let newStateImg = stateImg;
        let newStatus;
        if (stateImg === '/img/toread.png') {
            setStatus('reading')
            newStatus = 'reading'
            newStateImg = '/img/reading.png';
        } else if (stateImg === '/img/reading.png') {
            setStatus('read')
            newStatus = 'read'
            newStateImg = '/img/read.png';
        } else {
            setStatus('toread')
            newStatus = 'toread'
            newStateImg = '/img/toread.png';
        }

        // Envoi de la requête PUT avec l'ID du favori
        const response = await fetch(`http://${address}:${port}/changeFavoriteStatus/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ state: newStatus })
        });

        // Vérification de la réponse du serveur
        if (!response.ok) {
            console.error('Failed to update favorite status:', response.statusText);
            return;
        }

        // Mise à jour de l'image d'état après avoir reçu la réponse du serveur
        setStateImg(newStateImg)
    } catch (error) {
        console.error('Error updating favorite status:', error);
    }
};

    

    return (
        <img onClick={changeStatus} src={stateImg} className='stateImg' alt="Book Status" />
    );
}

export default Status;
