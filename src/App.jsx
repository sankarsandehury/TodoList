import { useEffect, useState } from 'react'
import './App.css'

const getLocalData = () => {
  const list = localStorage.getItem('myTodoList');
  if (list) {
    return JSON.parse(list)
  } else
    return [];
}

function App() {
  const [inputdata, setInputData] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [editItem, setEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false)

  const addItem = () => {
    if (!inputdata) {
      alert('plz fill the data')
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === editItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData([]);
      setEditItem("");
      setToggleButton(false);
    }
    else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, newInputData]);
      setInputData('')
    }
  };

  const editItems = (id) => {
    const itemTodoedit = items.find((curElem) => {
      return curElem.id === id;
    });
    setInputData(itemTodoedit.name);
    setEditItem(id);
    setToggleButton(true);
  }

  const deleteItem = ((id) => {
    const updatedItems = items.filter((cueElem) => {
      return cueElem.id !== id;
    });
    setItems(updatedItems);
  });


  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem('myTodoList', JSON.stringify(items))
  }, [items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="to" />
            <figcaption>Add Your Todo List</figcaption>
          </figure>
          <div className="addItems">
            <input type="text"
              placeholder=' Add Item'
              className='form-control'
              value={inputdata}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? <i className="fa fa-edit add-btn" onClick={addItem} ></i> : <i className="fa fa-plus add-btn" onClick={addItem} ></i>}

          </div>

          <div className="showItems">
            {
              items.map((cueElem) => {
                return (
                  <div className="eachItem" key={cueElem.id}>
                    <h3>{cueElem.name}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" onClick={() => editItems(cueElem.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={() => { deleteItem(cueElem.id) }}></i>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="showItems">
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
