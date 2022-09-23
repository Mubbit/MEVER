const express = require('express');
const router = express.Router();
const { Case } = require("../models/Case");
const { admin } = require("../middleware/admin");

//=================================
//             Case
//=================================

router.post("/", (req, res) => { 

    //save all the data we got from the client into the DB 
    const case1 = new Case(req.body)
    case1.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/cases", (req, res) => { 
    //db내의 모든 판례를 랜딩페이지에 가져오기
    Case.find()
        .populate("writer")
        .exec((err, caseInfo) => {
            if (err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, caseInfo})
        })

});

module.exports = router;