import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';

function CaseInfo(props) {
    const [Case, setCase] = useState({})

    useEffect(() => {

        setCase(props.detail)

    }, [props.detail])

    
                      //사건명 = Title, 사건번호 = Casenumber, 
                    //참조조문 = Jmreference, 참조판례 = Prreference, 판례내용 = Description , 판례일련번호 = Datanumber
  
    return (
        <div>
            <Descriptions title="판례 상세정보" bordered >
                <Descriptions.Item label="사건명"> {Case.title}</Descriptions.Item>
                <Descriptions.Item label="사건번호">{Case.casenumber}</Descriptions.Item>
                <Descriptions.Item label="판례일련번호"> {Case.datanumber}</Descriptions.Item>            
            </Descriptions>

            <br />
            <br />
            <br />

        
        </div>
    )
}

/*
<Descriptions.Item label="사건종류"> {Case.department}</Descriptions.Item>
<Descriptions.Item label="판시사항"> {Case.holding}</Descriptions.Item>
<Descriptions.Item label="판결요지"> {Case.summary}</Descriptions.Item>

<div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick>
                    중요 단어 보기
                </Button>
            </div>
            <br />

            </div>
*/


export default CaseInfo
