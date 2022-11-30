const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { findOneByEmail, save } = require('../../services/prospect_service');

// @route    POST /prospect
// @desc     Register user
// @access   Public
router.post(
    '/',
    check('name', 'Name is required').exists(),
    check('phone', 'Phone is required').exists(),
    check('email', 'Please include a valid email').isEmail(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      try {
        let isExist = await findOneByEmail(req.body.email);
  
        if(isExist) {
            return res.json({ 
                status: "error", 
                message: "Prospect data is repeated",
            })
        } else {
            const id = await save(req.body);
            return res.json({ 
                status: "ok", 
                message: "Prospect data saving is okay.",
                id
            })
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  );

  module.exports = router;