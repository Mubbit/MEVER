import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Row, Card, Space, Typography  } from 'antd';
import CheckBox from './Sections/CheckBox';
import { department } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import { Link } from "react-router-dom";


const { Meta } = Card;


function LandingPage() {

    const [Cases, setCases] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(9)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        department: [] 
    })
    const [SearchTerms, setSearchTerms] = useState("")


    //test를 위한 코드
    const { Text } = Typography;
    const testString ='이 문장에서 중요한 부분은 <highlight>ㅇㅇ</highlight> 입니다.';
    
 

    
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }
        getCases(body)
    },[])

    const getCases = (body) => {        
        axios.post('/api/case/cases',body)
            .then(response =>{
                if (response.data.success){
                    if(body.loadMore) {
                        setCases([...Cases,...response.data.caseInfo])
                    }
                    else{
                        setCases(response.data.caseInfo)
                    }
                    setPostSize(response.data.postSize)
                }
                else{
                    alert("판례를 가져오는데 실패하였습니다.")
                }
            })
    }

    const loadMoreHandler = () => {
        
        let skip = Skip + Limit

        let body = {
            skip: skip, //Skip을 skip으로 일단 수정해봄
            limit: Limit,
            loadMore: true
        }

        getCases(body)
        setSkip(skip)

    }

    /*
    const renderCards = Cases.map((case1, index)=>{
       
       return <Col lg={8} md={16} xs={24} key={index}>
            <Link to={`/case/${case1._id}`}>
            <Card hoverable
                 cover={<a href={`'/case/${case1._id}`}></a>}>
                    <Meta
                        title={case1.title}
                        description={`${case1.casenumber}`}
                    />
            </Card>
            </Link>
        </Col>
    })
    */

    
    const renderCards = Cases.map((case1, index)=>{
       
       return <Col lg={8} md={16} xs={24} key={index}>
            <Link to={`/case/${case1.datanumber}`}>
            <Card hoverable 
                 cover={<a href={`'/case/${case1.datanumber}`}></a>}
                 style={{border:'2px solid silver' ,borderRadius:"10px"}}
                 >
                    <Meta
                        title={case1.title}
                        description={`${case1.datanumber}`}
                    />
            </Card>
            </Link>
        </Col>
    })
    
    

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getCases(body)
        setSkip(0)
    }

    
    const handleFilters = (filters, category) => {
        
        const newFilters = {...Filters}
        newFilters[category] = filters

        showFilteredResults(newFilters)
        //setFilters(newFilters)
    }

    
    const updateSearchTerms = (newSearchTerm) => {

        const body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        
        setSkip(0)
        setSearchTerms(newSearchTerm)
        getCases(body)
    }
    

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2> 찾고자 하는 판례가 있으신가요? <Icon type="book"/> </h2>
                <h3>아래의 검색창에 판례 제목이나 판례와 연관된 단어를 입력하시면 됩니다.</h3>
            </div> 
            <br/>

            {/*테스트를 위한 코드 추가*/}
            {/* <div dangerouslySetInnerHTML={{__html: testString}}></div> */}
        

            {/* Search  */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '1rem auto' }}>
                <SearchFeature
                     refreshFunction={updateSearchTerms}
                />
            </div>
            <br/>            


            {/* CheckBox  */}
            <CheckBox 
                list={department}
                handleFilters={filters => handleFilters(filters, "department")}
            />
            <br/>
            <br/>


            {/* Card  */}

            <Row gutter={[16,16]}>
                {renderCards}
            </Row>

            <br/>
        
            {/* 아래 부등호는 >로도 바꿀 수 있으니 참고 */}
            {PostSize >= Limit && 
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={loadMoreHandler}>더보기</button>
                    </div>
                }

            <br/>

        

        </div>         
    )
}

export default LandingPage
