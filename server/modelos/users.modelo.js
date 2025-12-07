import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minlength: [3, "Al menos debe tener 3 caracteres"],
    },
    lastName: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      minlength: [3, "Al menos debe tener 3 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La clave es obligatoria"],
      minlength: [8, "Al menos debe tener 8 caracteres"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("passwordConfirmation")
  .get(function () {
    return this._passwordConfirmation;
  })
  .set(function (value) {
    this._passwordConfirmation = value;
  });

userSchema.pre("validate", function () {
  if (this.password !== this.passwordConfirmation) {
    this.invalidate(
      "passwordConfirmation",
      "La clave y su confirmacion no coinciden"
    );
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const encryptedPass = await bcrypt.hash(this.password, 10);
  this.password = encryptedPass;
});

const User = mongoose.model("User", userSchema);

export { User };
