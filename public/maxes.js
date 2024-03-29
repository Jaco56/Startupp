

document.addEventListener('DOMContentLoaded', function() {
    let username = localStorage.getItem('username');
    if (username) {
        let usernameSpan = document.getElementById('username');
        usernameSpan.textContent = username;
        fetchAndDisplayMaxes(username);
    }
});
    
async function editMax(maxId) {
    let newValue = prompt('Enter new max value:');
    if (newValue !== null) {
        try {
            const username = localStorage.getItem('username'); 
            const requestBody = { username: username };

            switch (maxId) {
                case 'squat-max':
                    requestBody.squatMax = newValue;
                    break;
                case 'bench-max':
                    requestBody.benchMax = newValue;
                    break;
                case 'deadlift-max':
                    requestBody.deadliftMax = newValue;
                    break;
                default:
                    return;
            }

            const response = await fetch('/api/user/updateMaxes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to update maxes data');
            }
            console.log('Maxes updated successfully');
            alert('Maxes updated successfully. Reload the page to view the new maxes.');
            
            const message = {
                username: username,
                maxType: maxId,
                newValue: newValue
            };
            socket.send(JSON.stringify(message));

        } catch (error) {
            console.error('Error updating maxes:', error);
        }
    }
}
async function fetchAndDisplayMaxes(username) {
    try {
        const username = localStorage.getItem('username');

        if (!username) {
            throw new Error('Username not found in localStorage');
        }
        const response = await fetch('/api/user/maxes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });
      
        if (!response.ok) {
            throw new Error('Failed to fetch maxes data');
        }

        const data = await response.json();
        const maxesData = data.maxes;

        document.getElementById('squat-max').innerText = maxesData.squatMax || '-';
        document.getElementById('bench-max').innerText = maxesData.benchMax || '-';
        document.getElementById('deadlift-max').innerText = maxesData.deadliftMax || '-';
    } catch (error) {
        console.error('Error fetching and displaying maxes:', error);
    }
}

        document.addEventListener('DOMContentLoaded', function() {
            const username = localStorage.getItem('username');
            const usernameSpan = document.getElementById('username');
  
            if (username) {
                usernameSpan.textContent = username;
            } else {
                usernameSpan.textContent = 'Guest';
            }
        });
