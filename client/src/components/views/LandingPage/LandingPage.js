import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Row, Card } from 'antd';

const { Meta } = Card;

function LandingPage() {

    const [Cases, setCases] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        axios.post('/api/case/cases')
            .then(response =>{
                if (response.data.success){
                    console.log(response.data)
                    setCases(response.data.caseInfo)
                }
                else{
                    alert("판례를 가져오는데 실패하였습니다.")
                }
            })

    },[])


    const loadMoreHandler = () => {
        
    }
    
    const renderCards = Cases.map((case1, index)=>{
       console.log('case',case1)
       return <Card
        key={index}>
            <Meta
                title={case1.title}
                description={`$${case1.casenumber}`}
            />
        </Card>
    })
    


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
            <h2> 찾으려는 판례가 있으신가요? <Icon type="book"/> </h2>
        </div>

        {/* Filter  */}
        {/* Search  */}
        {/* Card  */}

        <Row gutter={[16,16]}>
        {renderCards}
        </Row>
       
        

        <div style={{ display:'flex', justifyContent: 'center'}}>
            {/*<button onClick={loadMoreHandler}>더보기</button>*/}
        </div>

        </div>
            
    )
}

export default LandingPage
