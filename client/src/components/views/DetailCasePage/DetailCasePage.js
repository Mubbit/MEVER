import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
/*
import ProductInfo from './Sections/ProductInfo';
import { useDispatch } from 'react-redux';
function DetailProductPage(props) {
    const dispatch = useDispatch();

    return (
        <div>
        </div>
    )
}
*/

function DetailCasePage(props) {

    const caseId = props.match.params.caseId
    const [Case, setCase] = useState({}) 

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

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Case.title}</h1>
            </div>

            <br />
        
        </div>
    )
}


export default DetailCasePage
