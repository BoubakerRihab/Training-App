const mongoose = require('mongoose');
const ParticipantSchema = mongoose.Schema({
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
    track:{type: String ,
        required: true
    },
    session:{type: Number
    },
});
const Participant = module.exports = mongoose.model('Participant', ParticipantSchema);