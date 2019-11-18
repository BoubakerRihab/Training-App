const mongoose = require('mongoose');
const SessionSchema = mongoose.Schema({
    name:{type: String,
        required: true
    },
    track:{type: String,
        required: true
    },
    date:{type: Date,
        required: true
    },
    duree:{type: Number,
        required: true
    },
    adress:{type: String,
        required: true
    },
    participants:{type: Number , min : 0, max : 20,
        required: true
    },
    formateurid:{type: Number,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});
const Session = module.exports = mongoose.model('Session', SessionSchema);