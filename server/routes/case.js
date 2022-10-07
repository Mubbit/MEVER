const express = require('express');
const router = express.Router();
const { Case } = require("../models/Case");


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
    
    let limit = req.body.limit ? parseInt(req.body.limit) : 8;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let findArgs = {};

    //여기서 key는 카테고리의 department(담당부서)을 의미함
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            findArgs[key] = req.body.filters[key];
        }
    }
    
    console.log('findArgs',findArgs)
    
    //db내의 모든 판례를 랜딩페이지에 가져오기
    Case.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, caseInfo) => {
            if (err) return res.status(400).json({success:false, err})

            return res.status(200).json({
                success:true, caseInfo,
                postSize: caseInfo.length
            })
        })

});

module.exports = router;