const form = document.querySelector("#register-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(email.value, password.value);

    fetch("/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: name.value,
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
