
document.addEventListener("DOMContentLoaded", () => {

    const resultBox = document.getElementById("myDivElement");
    const usersList = document.getElementById("usersList");
    const detailsBox = document.getElementById("detailsBox");
    const postsList = document.getElementById("postsList");


    const loadData = () => {

        resultBox.innerHTML = '<div class="message">Завантаження...</div>';

        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open(
            "GET",
            "https://jsonplaceholder.typicode.com/users",
            true
        );

        xmlHttp.responseType = "json";
        xmlHttp.setRequestHeader("Accept", "application/json");

        xmlHttp.onload = () => {

            if (xmlHttp.status === 200) {

                try {
                    const response = xmlHttp.response;

                    if (response && response.length > 0) {

                        const users = response.map(item => {
                            return {
                                id: item.id,
                                name: item.name,
                                username: item.username,
                                email: item.email,
                                phone: item.phone,
                                website: item.website,
                                address: item.address,
                                company: item.company
                            };
                        });

                        let html = '<div class="users-container">';

                        users.forEach(user => {
                            html += `
                           <div class="user-card" onclick="showUser(${user.id})">
                           <h3>${user.name}</h3>
         
                           </div>
                        `;
                        });

                        html += '</div>';

                        resultBox.innerHTML = html;

                    } else {
                        resultBox.innerHTML =
                            '<div class="message error">Отримано порожній файл.</div>';
                    }

                } catch (e) {
                    resultBox.innerHTML =
                        `<div class="message error">Помилка обробки: ${e.message}</div>`;
                }

            } else {
                resultBox.innerHTML =
                    `<div class="message error">Помилка сервера: ${xmlHttp.status}</div>`;
            }
        };

        xmlHttp.onerror = () => {
            resultBox.innerHTML =
                '<div class="message error">Помилка мережі. Перевірте з\'єднання.</div>';
        };

        xmlHttp.send();
    };

    loadData();

    const showUser = (id) => {

        postsList.innerHTML = '';
        postsList.style.display = 'none';
        detailsBox.innerHTML = '<p>Завантаження інформації...</p>';

        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open(
            "GET",
            `https://jsonplaceholder.typicode.com/users/${id}`,
            true
        );

        xmlHttp.responseType = "json";

        xmlHttp.onload = () => {

            if (xmlHttp.status === 200) {

                const user = xmlHttp.response;

                if (user && user.id) {

                    detailsBox.innerHTML = `
                    <div class="user-details">
                        <h2>${user.name}</h2>

                        
                        <p><strong>Username:</strong> ${user.username}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                        <p><strong>Website:</strong> ${user.website}</p>

                        <h3>Адреса</h3>
                        <p>${user.address.street}, ${user.address.suite}</p>
                        <p>${user.address.city}, ${user.address.zipcode}</p>

                        <h3>Компанія</h3>
                        <p>${user.company.name}</p>
                        <p>${user.company.catchPhrase}</p>

                        <button onclick="showPosts(${user.id})">Show posts</button>
                    </div>
                `;

                } else {
                    detailsBox.innerHTML = 'Користувача не знайдено.';
                }

            } else {
                detailsBox.innerHTML = 'Помилка сервера: ' + xmlHttp.status;
            }
        };

        xmlHttp.onerror = () => {
            detailsBox.innerHTML = 'Помилка мережі.';
        };

        xmlHttp.send();
    };
    const showPosts = (userId) => {

        if (postsList.style.display === 'block') {
            postsList.style.display = 'none';
            return;
        }


        postsList.style.display = 'block';
        postsList.innerHTML = '<p>Завантаження постів...</p>';

        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open(
            "GET",
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
            true
        );

        xmlHttp.responseType = "json";

        xmlHttp.onload = () => {

            if (xmlHttp.status === 200) {

                const posts = xmlHttp.response;

                if (posts && posts.length > 0) {

                    let html = '<div class="posts-container">';

                    posts.forEach(post => {
                        html += `
                        <div class="post-card">
                            <h3>${post.title}</h3>
                            <p>${post.body}</p>
                        </div>
                    `;
                    });

                    html += '</div>';

                    postsList.innerHTML = html;

                } else {
                    postsList.innerHTML = '<p>Постів не знайдено.</p>';
                }

            } else {
                postsList.innerHTML =
                    `<p>Помилка сервера: ${xmlHttp.status}</p>`;
            }
        };

        xmlHttp.onerror = () => {
            postsList.innerHTML = '<p>Помилка мережі.</p>';
        };

        xmlHttp.send();
    }
    window.showUser = showUser;
    window.showPosts = showPosts;

});



