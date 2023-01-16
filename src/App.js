import React, {useState} from 'react';
import Lists from './components/Lists';
import Form from './components/Form';

const localTodoList = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
export default function App() {

  const [todoList, setTodoList] = useState(localTodoList);
  const [value, setValue] = useState("");

  const btnSubmit = (e) => {
    e.preventDefault();//입력할때마다 새로고침 되는 것을 막음
    let newTodo = {
        id: Date.now(),
        title: value,
        completed: false
    }
    if(value.trim().length !== 0){
        setTodoList(prev => [...prev, newTodo]);
      localStorage.setItem("todoList", JSON.stringify([...todoList, newTodo]));
      setValue("");
    } else {
      alert("해야 할 일을 입력하세요.");
    }
    
}
const deleteAll = () => {
  setTodoList([]);
  localStorage.setItem("todoList", JSON.stringify([]));
  // 모두삭제버튼이므로 빈 값으로 넣어줌.
}

  // 화면에 나타나는 부분
  return (
    <div className='container'>
      <div className='todoBlock'>
        <div className='title'>
          <h1 className='serif'>To Do List</h1>
          <button className='deleteBtn serif' onClick={deleteAll}>Delete All</button>
        </div>

        <Lists todoList = {todoList} setTodoList={setTodoList}/>
        <Form value={value} setValue={setValue} btnSubmit={btnSubmit}/>
      </div>
      <div className='gitBtn sans'><a href="https://github.com/breeghty/todolist_react">코드보기</a></div>
    </div>
  )
}