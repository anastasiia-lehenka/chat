export const sendLoginRequest = (data) => {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
            if (!response.ok) throw response;
            return response.json();
        });
};
