import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'antd';
import CaseInfo from './Sections/CaseInfo';



function DetailCasePage(props) {

    //const caseId = props.match.params.caseId
    
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


    const recommendCaseHandler = () => {
        window.location.href = `/case/${Case.next_id}`; //인자 넣기
        // 예시 : `/case/${case1.datanumber}` 데이터 넘버 자리에 추천 링크가 담긴 인덱스가 들어가야함.
    };

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

            <h2>참조조문</h2>
            <h3>{Case.jmreference}</h3>
            <br/>


            <h2>참조판례</h2>
            <h3>{Case.prreference}</h3>
            <br/>

            <h2>판례 요약 한문장</h2>
            <h3>{Case.kobart}</h3>
    
            <br/>


            <h2>판시사항(하이라이트)</h2>
            <h3><div dangerouslySetInnerHTML={{__html: Case.jmreference_textrank}}>
            </div></h3>
    
            <br/>

            
            <h2>판례 요약(하이라이트) </h2>
            <h3><div dangerouslySetInnerHTML={{__html: Case.summary_textrank}}>
            </div></h3>

            <br/>

            

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="primary" onClick={recommendCaseHandler}>
                    추천 판례 이어보기
                </Button>
            </div>
            <br />
            

        </div>
    )
}

//사건번호 = Casenumber, 사건종류코드 = Casecode,
//판시사항 = Holding , 판결요지 = Summary , 
//참조조문 = Jmreference, 참조판례 = Prreference, 판례내용 = Description , 판례일련번호 = Datanumber
//사건대상(사건종류명) = Department

/*

            <h2>판시사항</h2>
            <h3>{Case.holding}</h3>

            <br/>
            <h2>판결요지</h2>
            <h3>{Case.summary}</h3>
    
            <br/> 
      
*/

export default DetailCasePage
