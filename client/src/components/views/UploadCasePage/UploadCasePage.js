import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;


const Department = [
  { key: 1, value: "헌법재판소" },
  { key: 2, value: "민사" },
  { key: 3, value: "형사" },
  { key: 4, value: "일반행정" },
  { key: 5, value: "가사" },
  { key: 6, value: "특허" },
  { key: 7, value: "세무" }
]

function UploadCasePage(props) {

  const [TitleValue, setTitleValue] = useState("")
  const [CasenumberValue, setCasenumberValue] = useState("")
  const [DescriptionValue, setDescriptionValue] = useState("")
  const [SummaryValue, setSummaryValue] = useState("")
  const [DatanumberValue, setDatanumberValue] = useState("")
  const [DepartmentValue, setDepartmentValue] = useState(1)
  const [HoldingValue, setHoldingValue] = useState("")
  const [JmreferenceValue, setJmreferenceValue] = useState("")
  const [PrreferenceValue, setPrreferenceValue] = useState("")

  const onTitleChange = (event) => {
      setTitleValue(event.currentTarget.value)
  }

  const onCasenumberChange = (event) => {
    setCasenumberValue(event.currentTarget.value)
}

  const onDescriptionChange = (event) => {
      setDescriptionValue(event.currentTarget.value)
  }

  const onSummaryChange = (event) => {
    setSummaryValue(event.currentTarget.value)
}

  const onDatanumberChange = (event) => {
      setDatanumberValue(event.currentTarget.value)
  }

  const onDepartmentSelectChange = (event) => {
      setDepartmentValue(event.currentTarget.value)
  }

  const onHoldingChange = (event) => {
    setHoldingValue(event.currentTarget.value)
}

const onJmreferenceChange = (event) => {
    setJmreferenceValue(event.currentTarget.value)
}

const onPrreferenceChange = (event) => {
    setPrreferenceValue(event.currentTarget.value)
}



const submitHandler = (event) => {
        event.preventDefault();


        if (!TitleValue || !CasenumberValue || !SummaryValue || !DatanumberValue || !HoldingValue || !JmreferenceValue || !PrreferenceValue ||
            !DepartmentValue ) {
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        //서버에 채운 값들을 request로 보냅니다.
        const body = {
            writer: props.user.userData._id,
            title: TitleValue,
            casenumber: CasenumberValue,
            holding: HoldingValue,
            summary: SummaryValue,
            department: DepartmentValue,
            datanumber: DatanumberValue,
            jmreference: JmreferenceValue,
            prreference: PrreferenceValue
        }

        Axios.post("/api/case", body) 
            .then(response => {
                if (response.data.success) {
                    alert('판례가 성공적으로 업로드 되었습니다.')
                    props.history.push('/')
                } else {
                    alert('판례 업로드를 실패하였습니다.')
                }
            })
} 



  //사건명 = Title, 사건번호 = Casenumber, 사건종류코드 = Casecode,
  //판시사항 = Holding , 판결요지 = Summary , 참조조문 = Jmreference, 참조판례 = Prreference, 판례내용 = Description , 판례일련번호 = Datanumber
  //사건대상(사건종류명) = Department, 법분야와 소관부처는 추후에 추가 고민해보기


  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>판례 정보 업로드</h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <br />

        <br />
        <label>사건명</label>
        <Input
            onChange={onTitleChange} 
            value={TitleValue}   
        />
        <br />

        <br />
        <label>사건번호</label>
        <Input
            onChange={onCasenumberChange} 
            value={CasenumberValue}
        />
        <br />

        <br />
        <label>사건종류명</label>
        <br />
            <select onChange={onDepartmentSelectChange} value={DepartmentValue}>
                {Department.map(item => (
                    <option key={item.key} value={item.key}>{item.value} </option>
                ))}
            </select>
        <br />

        <br />
        <label>판시사항</label>
        <TextArea
            onChange={onHoldingChange}
            value={HoldingValue}
         />
        <br />

        <br />
        <label>판결요지</label>
        <TextArea
            onChange={onSummaryChange}
            value={SummaryValue}
         />
        <br />

        <br />
        <label>참조조문</label>
        <Input
            onChange={onJmreferenceChange} 
            value={JmreferenceValue}   
        />
        <br />

        <br />
        <label>참조판례</label>
        <Input
            onChange={onPrreferenceChange} 
            value={PrreferenceValue}   
        />
        <br />

        <br />
        <label>판례일련번호</label>
        <Input
            onChange={onDatanumberChange}
            value={DatanumberValue}
        />
        <br />
        <br />

        <Button onClick={submitHandler}>
            확인
        </Button>

      </Form>

    </div>
  )
}

/*
<br />
        <label>판례내용</label>
        <TextArea
            onChange={onDescriptionChange}
            value={DescriptionValue}
         />
        <br />
*/

export default UploadCasePage
