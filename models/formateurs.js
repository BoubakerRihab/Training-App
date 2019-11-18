const mongoose = require('mongoose');
const FormateurSchema = mongoose.Schema({
    identity:{type: Number,
        required: true
    },
    firstname:{type: String,
        required: true
    },
    lastname:{type: String,
        required: true
    },
    datebirth:{type: Date,
        required: true
    },
    email:{type: String,
        required: true
    },
    phone:{type: Number,
        required: true
    },
    address:{type: String,
        required: true
    },
    speciality:{type: String ,
        required: true
    }
});
const Formateur = module.exports = mongoose.model('Formateur', FormateurSchema);