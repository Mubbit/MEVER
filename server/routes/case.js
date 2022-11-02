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
    let term = req.body.searchTerm 

    let findArgs = {};

    //여기서 key는 카테고리의 department(담당부서)을 의미함
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            findArgs[key] = req.body.filters[key];
        }
    }
    
    console.log('findArgs',findArgs)

    if (term){
        Case.find(findArgs)
        .find({ "title" : { $regex: term } })
        //.find({ $text: { $search: term }})
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

    } else {
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
    }
});
    
/*    
router.get("/cases_by_id", (req, res) => { 

    let type = req.query.type
    let caseId = req.query.id 

    // caseId를 이용해서 DB에서 caseId와 같은 판례의 정보를 가져온다.  
    
    Case.find({ _id: caseId })
        .populate("writer")
        .exec((err, case1) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send({success: true, case1 })
    })
});
*/


//세부 페이지 주소 변경을 위한 테스트
router.get("/cases_by_datanumber", (req, res) => { 

    let type = req.query.type
    let dataNumber = req.query.datanumber //query인지 body인지 잘 모르겠음.

    // dataNumber를 이용해서 DB에서 dataNumber와 같은 판례의 정보를 가져온다.  
    
    Case.find({ datanumber: dataNumber })
        .populate("writer")
        .exec((err, case1) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send({success: true, case1 })
    })
});





module.exports = router;