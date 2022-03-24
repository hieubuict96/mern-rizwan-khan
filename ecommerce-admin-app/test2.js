function getName(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(name);
            resolve();
        }, Math.floor(Math.random() * 1000) + 1);
    });
}

function getAll() {
    getName("Hoa")
        .then(() => {
            return getName("Moc");
        })
        .then(() => {
            return getName("Lan");
        })
        .catch((error) => {
            console.log(error);
        });
}
getAll();

