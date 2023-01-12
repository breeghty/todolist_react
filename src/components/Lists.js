import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
export default function Lists({todoList, setTodoList}) {
    
    const btnClick = (id) =>{
        let newTodoList = todoList.filter(data => data.id !== id)
        console.log('newTodoList', newTodoList);
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    }
    const checkboxCompleted = (id) =>{
        let newTodoList = todoList.map(data => {
            if(data.id===id){
            data.completed = !data.completed;
            }
            return data;
        })
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    }

    const handleEnd = (result) => {
        console.log(result);
        if(!result.destination) return;
    const newTodoList = todoList;
    const [reorderedItem] = newTodoList.splice(result.source.index,1);
    newTodoList.splice(result.destination.index, 0, reorderedItem);
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    }

    
    return (

        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId='todoApp'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {/*map() 메소드를 이용해 배열내의 요소를 호출한 결과를 모아 새로운 배열로 반환 */}
                            {todoList.map((data, index) =>
                                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                                    {(provided, snapshot)=> (
                                        <div key={data.id}{...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps}
                                        className = {snapshot.isDragging ? "dragging" : undefined}>
                                            <div className='list'>
                                                <input type="checkbox" defaultChecked={data.completed} onChange={() => checkboxCompleted(data.id)}/>
                                                    <span className={data.completed ? 'completed' : undefined}>{data.title}</span>
                                                <button className='btn' onClick={() => btnClick(data.id)}>X</button>
                                            </div>
                                        </div>
                                    )}
                                    
                                </Draggable>
                            )}
                            {provided.placeholder}
                            {/* 드래그시 레이아웃이 어긋나는 것 수정 */}
                        </div>
                    )}
                    
                </Droppable>
            </DragDropContext>
        </div>
    )
}