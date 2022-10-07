import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;


function SearchFeature(props) {
       
    const [SearchTerms, setSearchTerms] = useState("")

    const searchHandler = (event) => {
        setSearchTerms(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }


  return (
    <div>
       <Search
            placeholder="판례를 입력해주세요."
            onChange={searchHandler}
            style={{width: 200}}
            value={SearchTerms}    
        /> 
    </div>
  )
}

export default SearchFeature
