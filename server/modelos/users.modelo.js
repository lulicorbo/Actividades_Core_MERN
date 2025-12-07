import { mongoose} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String, 
            required : [true, "El nombre es obligatorio"],
            minlength : [3, "Al menos debe tener 3 caracteres"]
        },
        lastName : {
            type : String, 
            required : [true, "El apellido es obligatorio"],
            minlength : [3, "Al menos debe tener 3 caracteres"]
        },
        email : {
            type: String,
            required : [true, "El email es obligatorio"],
            unique : true
        },
        password : {
            type : String,
            required : [true, "La clave es obligatoria"],
            minlength : [8, "Al menos debe tener 3 caracteres"]
        }
    }, {timestamps : true}
)


// metodo virtual para tener la clave confirmada y despues validar que coinciden
userSchema.virtual('passwordConfirmation').get(
    function(){
        return this._passwordConfirmation;
    }

).set(function(value){
    this._passwordConfirmation = value;
});

userSchema.pre('validate', function(next){
    if(this.password !== this.passwordConfirmation){
        this.invalidate('passwordConfirmation', 'La clave y su confirmación no coinciden')
    }
    next();
})



userSchema.pre('save',function(next){
    bcrypt.hash(this.password,10).then((ecnryptedPass)=> { //encriptar la clave
        this.password = ecnryptedPass;
        next();
    })
})

const User = mongoose.model('users', userSchema)

export {User, userSchema}