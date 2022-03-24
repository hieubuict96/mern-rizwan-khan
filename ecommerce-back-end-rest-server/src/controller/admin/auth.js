const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => { //error trong callback là những lỗi xảy ra sẽ được đưa vào trong biến error, thường là khi kết nối lên database thất bại, thường thì những hàm tương tác với database sẽ có biến error ở đầu. Trong file này có hàm exec(), estimatedDocumentCount(), save()
        if (user)
            return res.status(400).json({
                message: "Admin already registered",
            });

        User.estimatedDocumentCount(async (err, count) => { //estimatedDocumentCount là hàm đếm số lượng document trong 1 collection. Ở đây là trong collection User và kết quả được đưa vào biến count
            if (err) return res.status(400).json({ err });
            let role = "admin";
            if (count === 0) {
                role = "super-admin";
            }

            const { firstName, lastName, email, password } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username: shortid.generate(),
                role,
            });

            _user.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }

                if (user) {
                    return res.status(201).json({
                        message: "Admin created Successfully..!",
                    });
                }
            });
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (
                isPassword &&
                (user.role === "admin" || user.role === "super-admin")
            ) {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName,
                } = user;
                res.cookie("token", token, { expiresIn: "1h" });
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            } else {
                return res.status(400).json({
                    message: "Invalid Password",
                });
            }
        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...!",
    });
};
