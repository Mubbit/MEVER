import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
import CaseInfo from './Sections/CaseInfo';


function DetailCasePage(props) {

    const caseId = props.match.params.caseId
    
    //페이지 수정을 위한 코드
    const dataNumber = props.match.params.dataNumber

    const [Case, setCase] = useState({}) 

    
    //dataNumber로 변환 위한 코드: /api/case/cases_by_datanumber?id=${dataNumber}&type=single

    /*
    useEffect(() => {
        axios.get(`/api/case/cases_by_id?id=${caseId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    console.log("response data",response.data)
                    setCase(response.data.case1[0])     
                } else {
                    alert("상세 정보 가져오기를 실패하였습니다.")
                }
            })
    }, [])
    */
    useEffect(() => {
        axios.get(`/api/case/cases_by_datanumber?datanumber=${dataNumber}&type=single`)
            .then(response => {
                if (response.data.success) {
                    console.log("response data",response.data)
                    setCase(response.data.case1[0])     
                } else {
                    alert("상세 정보 가져오기를 실패하였습니다.")
                }
            })
    }, [])

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Case.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]}>
                <Col flex="auto">
                    <CaseInfo detail={Case}/>
                </Col>
            </Row>

            <h2>판시사항</h2>
            <h3>{Case.holding}</h3>

            <br/>
            <h2>판결요지</h2>
            <h3>{Case.summary}</h3>
    
            <br/>
            

        </div>
    )
}

//사건번호 = Casenumber, 사건종류코드 = Casecode,
//판시사항 = Holding , 판결요지 = Summary , 
//참조조문 = Jmreference, 참조판례 = Prreference, 판례내용 = Description , 판례일련번호 = Datanumber
//사건대상(사건종류명) = Department

export default DetailCasePage
