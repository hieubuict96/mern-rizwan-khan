const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, //loại bỏ những khoảng trắng không cần thiết. Ví dụ: " Hiếu " lưu vào database thành "Hiếu"
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true, //email gửi sang model khi lưu vào database sẽ được tư động chuyển thành chữ thường
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"], //enum là thuộc tính làm cho role chỉ có giá trị là 1 trong 3 "user", "admin", "super-admin"
      default: "user",
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

userSchema.virtual("fullName").get(function () { //tạo 1 thuộc tính ảo trong document có key fullName và value là nối giữa firstName và lastName
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) { //tạo 1 phương thức authenticate với vai trò là thuộc tính của collection User
    return await bcrypt.compare(password, this.hash_password); //so sánh mật khẩu được đưa vào và mật khẩu được lưu trong database
  },
};

module.exports = mongoose.model("User", userSchema);
