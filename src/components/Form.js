import React from 'react'

export default function Form({value, btnSubmit, setValue}) {

    const textChange = (e) => {
        // console.log('e', e.target.value) 콘솔창에 입력값이 나타남
        setValue(e.target.value);
        // 마지막 입력창에 글씨 지워주기
    }
    

    return (
        <div>
        <form style={{display:'flex'}} onSubmit={btnSubmit}>
            <input type="text" name="value" placeholder="해야할 일을 입력하세요"
            onChange={textChange} value={value} />
            <input type="submit" value="입력"/>
            </form>
        </div>
    )
}
