import React, {useState, useEffect} from 'react';
import bonkGif from '../assets/bonk.gif';
import { FaEdit, FaTrash} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  //States for the input values and list of todos.
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  
  //Update data stored in local storage.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  //Add task.
  const addTodo = value => {
    setTodos([...todos, {id: uuidv4(), task:value, status:"Unfinished", completed:false, isEditing:false}]);
  }

  //Delete task.
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  //Toggle edit mode for task.
  const toggleEdit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: !todo.isEditing, originalTask: todo.task };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  
  //Handle changes while editing task.
  const handleEditChange = (e, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: e.target.value };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //Submit the edited task.
  const handleEditSubmit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //Cancel editing.
  const handleEditCancel = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: false, task: todo.originalTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //Handle chechbox toggle.
  const handleCheck = (e, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: e.target.checked, status: e.target.checked ? "Finished" : "Unfinished" };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };  

  //Handle data submission.
  const handleSubmit = e => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  }

  return (
    <div className="flex flex-col h-full w-full border-none bg-transparent p-auto pb-10 drop-shadow-lg text-slate-900 px-40 xs:items-center xxs:items-center mt-10">
      <div className='h-full w-full sm:flex sm:flex-col min-w-[300px] xs:flex xs:flex-col xxs:flex xxs:flex-col gap-5 items-center p-5 justify-center bg-[#FAF9F6] rounded-t-lg'>
        <div className='flex justify-center items-center lg:flex-row md:flex-row sm:flex-col xs:flex-col xxs:flex-col'>
          <div className='flex flex-col items-center justify-center p-auto m-auto'>
            <h1 className="text-center text-4xl mb-5">Do something!</h1>
            <h1 className="text-center text-2xl">Stop procrastinating 😡 </h1>
          </div>

          <img className='lg:h-full lg:w-1/2 md:h-full md:w-1/2 sm:h-24 sm:w-24 xs:h-24 xs:w-24 xxs:h-20 xxs:w-20' src={bonkGif} />
        </div>
      </div>
      <div className='bg-[#FAF9F6] h-full w-full min-w-[300px] p-5 rounded-b-lg justify-center -m-8'>
        <div className='flex'>
          <input className='p-2 border border-slate-900 rounded-l-lg h-10 text-slate-900 lg:text-lg md:text-lg sm:text-sm xs:text-xs xxs:text-xs' type='text' placeholder='What will you do today?' value={value} onChange={(e) => setValue(e.target.value)}/>
          <button className='bg-blue-800 text-white rounded-r-lg p-2 h-10 mb-3 border border-blue-800 hover:bg-blue-400 hover:border-blue-400 drop-shadow-lg'>
            <p className='drop-shadow-lg lg:text-lg md:text-lg sm:text-[10px] xs:text-[10px] xxs:text-[10px]'  
            onClick={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }} 
            >
              ➕ Add Task
            </p>
          </button>
        </div>
        <div className='flex flex-col container border-none w-full h-full justify-center align-middle text-[#FAF9F6] drop-shadow-lg'>
        <div>
          <div className="flex items-center text-center mt-5 bg-blue-800 py-4">
            <div className='flex-none mx-8 invisible'>
              <input type='checkbox'/>
            </div>

            <div className='flex-1 text-left'>
              <h1 className='p-auto drop-shadow-lg lg:text-2xl md:text-2xl sm:text-sm xs:text-xs xxs:text-xs'>Task</h1>
            </div>

            <div className='flex-1'>
              <h1 className='p-auto drop-shadow-lg lg:text-2xl md:text-2xl sm:text-sm xs:text-xs xxs:text-xs'>Status</h1>
            </div>

            <div className='flex-1'>
              <h1 className='p-auto drop-shadow-lg lg:text-2xl md:text-2xl sm:text-sm xs:text-xs xxs:text-xs'>Actions</h1>
            </div>
          </div>
          </div>
          {todos.map((x) => (
            <div className='flex items-center text-center border bg-[#FAF9F6] justify-center text-slate-800 py-3' key={x.id}>
              <div className='flex-none mx-8 hover:scale-150 duration-500'>
                <input type="checkbox" onChange={(e) => handleCheck(e, x.id)} checked={x.completed} />
              </div>
              <div className="flex-1 text-left">
                {x.isEditing ? (
                  <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col xxs:flex-col items-center">
                    <input
                      className="border rounded p-1 lg:text-base md:text-base sm:text-sm xs:text-xs xxs:text-xs"
                      type="text"
                      value={x.task}
                      onChange={(e) => handleEditChange(e, x.id)}
                      autoFocus
                    />
                    <div className='items-start flex'>
                      <button
                        className="bg-green-500 lg:text-base md:text-base sm:text-sm xs:text-xs xxs:text-xs text-white px-2 py-1 rounded ml-2"
                        onClick={() => handleEditSubmit(x.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleEditSubmit(x.id);
                          }
                        }}
                        >
                        Submit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 lg:text-base md:text-base sm:text-sm xs:text-xs xxs:text-xs py-1 rounded ml-2"
                        onClick={() => handleEditCancel(x.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleEditCancel(x.id);
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                <div className='lg:text-2xl md:text-lg sm:text-sm xs:text-xs xxs:text-xs'><h1 className={x.completed ? "line-through" : ""}>{x.task}</h1></div>)}
              </div>
              <div className='flex-1'>
                <h1 className='p-auto lg:text-2xl md:text-lg sm:text-sm xs:text-xs xxs:text-xs'>{x.status}</h1>
              </div>
              <div className='flex-1'>
                <div className='flex justify-center lg:gap-4 md:gap-4'>
                  <FaEdit className='hover:scale-125 duration-300 lg:h-5 lg:w-6 md:h-5 md:w-6 sm:h-4 sm:w-4 xs:h-3 xs:w-3' onClick={() => toggleEdit(x.id)}/>
                  <FaTrash className='hover:scale-125 duration-300 lg:h-5 lg:w-6 md:h-5 md:w-6 sm:h-4 sm:w-4 xs:h-3 xs:w-3' onClick={() => deleteTodo(x.id)}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home