
document.addEventListener("DOMContentLoaded", () => {

    const resultBox = document.getElementById("myDivElement");
    const usersList = document.getElementById("usersList");
    const detailsBox = document.getElementById("detailsBox");
    const postsList = document.getElementById("postsList");


    function doAjax(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);

            xhr.responseType = "json";

            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(new Error("Помилка сервера: " + xhr.status));
                }
            };

            xhr.onerror = function () {
                reject(new Error("Помилка мережі. Перевірте підключення."));
            };

            xhr.send();
        });
    }

    const loadData = () => {

        resultBox.innerHTML =
            '<div class="message">Завантаження...</div>';

        doAjax("https://jsonplaceholder.typicode.com/users")

            .then(function (users) {
                if (users && users.length > 0) {
                    let html = '<div class="users-container">';
                    users.forEach(function (user) {

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
                        '<div class="message error">Список користувачів порожній.</div>';

                }

            })

            .catch(function (error) {

                resultBox.innerHTML =
                    `<div class="message error">${error.message}</div>`;

            });

    };


    const showUser = (id) => {

        postsList.innerHTML = '';
        postsList.style.display = 'none';
        detailsBox.innerHTML = '<p>Завантаження інформації...</p>';

        doAjax(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(function (user) {
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
            })

            .catch(function (error) {
                detailsBox.innerHTML = error.message;
            });

    };


    const showPosts = (userId) => {

        if (postsList.style.display === 'block') {
            postsList.style.display = 'none';
            return;
        }


        postsList.style.display = 'block';
        postsList.innerHTML = '<p>Завантаження постів...</p>';

        doAjax(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(function (posts) {
                if (posts && posts.length > 0) {

                    let html = '<div class="posts-container">';

                    posts.forEach(function (post) {
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

            })
            .catch(function (error) {
                postsList.innerHTML = error.message;
            });
    };

    window.showUser = showUser;
    window.showPosts = showPosts;

    loadData();

});



