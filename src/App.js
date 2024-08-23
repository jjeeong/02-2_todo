import { useState } from "react";
import "./todo.css";

function App() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([
    {
      isLike: false,
      todoContent: "할일1",
      regDate: "2024-08-21",
      isDone: true,
    },
    {
      isLike: true,
      todoContent: "할일222",
      regDate: "2024-08-22",
      isDone: false,
    },
  ]);
  const addTodo = () => {
    const isLike = false;
    const todoContent = text;
    const isDone = false;
    const today = new Date();
    const year = today.getFullYear();
    const month =
      today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1;
    const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    const regDate = `${year}-${month}-${date}`;
    const todo = { isLike, todoContent, isDone, regDate };
    setTodoList([...todoList, todo]);
    setText("");
  };
  return (
    <div className="todo-wrap">
      <div className="todo-header">
        <h1>TODO LIST</h1>
      </div>
      <div className="todo-content">
        <div className="input-box">
          <input
            type="text"
            name="todo-text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.keyCode === 13) {
                addTodo();
              }
            }}
          />
          <button onClick={addTodo}>등록</button>
        </div>
        <div className="todo-list-wrap">
          {todoList.map((todo, index) => {
            const like = () => {
              const newArr = [...todoList];
              newArr[index].isLike = !todo.isLike;
              setTodoList(newArr);
            };
            const todoDone = () => {
              todoList[index].isDone = true;
              setTodoList([...todoList]);
            };
            const todoDelete = () => {
              // todoList.splice(index, 1);
              // setTodoList([...todoList]);

              const newArr = todoList.filter((item, i) => {
                return index !== i;
                //return todo !== item;
              });
              setTodoList(newArr);
            };

            return (
              <ul key={"todo" + index} className="todo">
                <li className="todo-like">
                  {todo.isLike ? (
                    <span className="material-icons" onClick={like}>
                      favorite
                    </span>
                  ) : (
                    <span className="material-icons" onClick={like}>
                      favorite_border
                    </span>
                  )}
                </li>
                <li
                  className={todo.isDone ? "todo-text todo-done" : "todo-text"}
                >
                  {todo.todoContent}
                </li>
                <li className="todo-date">{todo.regDate}</li>
                <li className="todo-btn">
                  {todo.isDone ? (
                    ""
                  ) : (
                    <span class="material-icons done" onClick={todoDone}>
                      done
                    </span>
                  )}
                  <span className="material-icons delete" onClick={todoDelete}>
                    delete
                  </span>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
