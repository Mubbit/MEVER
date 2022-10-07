import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse


function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        //누른 것의 Index를 구하고 (currentIndex가 -1이면 현재 선택한 것 아무것도 없는 상태)
        const currentIndex = Checked.indexOf(value);

        //전체 Checked된 State에서 현재 누른 Checkbox가 
        const newChecked = [...Checked];
        
        //없으면 State에 넣어준다
        if (currentIndex === -1) {
            newChecked.push(value)
        } 
        else {
             //있다면 빼주고
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component    
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox 
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                <span>{value.name}</span> 
        </React.Fragment>
    ))

    
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="사건 종류" key="1">
                {renderCheckboxLists()}   
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox