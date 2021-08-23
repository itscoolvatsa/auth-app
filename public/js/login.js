const form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(email.value, password.value);

    fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    })
        .then((res) => {
            console.log(res);
            window.location = "/";
        })
        .catch((e) => {
            console.log(e);
        });
});
