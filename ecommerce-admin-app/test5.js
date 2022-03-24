function wait(ms) {
    return new Promise((r) => setTimeout(r('success'), ms));
}

function main() {
    console.log("sắp rồi...");
    wait(2000)
        .then(() => {
            console.log("chờ tí...");
            return wait(2000);
        })
        .then(() => {
            console.log("thêm chút nữa thôi...");
            return wait(2000);
        })
        .then(() => {
            console.log("thêm một chút nữa thôi...");
            return wait(2000);
        })
        .then(() => {
            console.log("xong rồi đấy!");
        });
}
main()