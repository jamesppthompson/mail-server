const Prospect = require('../models/prospects');

const findOneByEmail = async (email) => {
    try {
        const prospect = await Prospect.findOne({
            email
        });
        if (!prospect) return false;
        return true;
    } catch(e) {
        console.log('Error: get a prospect data from email address');
    }
};

const save = async (userData) => {
    
    try {
        const prospect = new Prospect({...userData});
        const result = await prospect.save();
        return result._id;
    } catch(e) {
        console.log('Error: save the prospect info');
    }
};

module.exports = {
    findOneByEmail,
    save,
};






