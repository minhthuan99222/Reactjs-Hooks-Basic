import React, { useState, useEffect } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox/ColorBox';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/Todoform/TodoForm';
import FormAction from './components/FormFull/FormAction';
import PostList from './components/PostList/PostList';
import Pagination from './components/Pagination/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm/PostFiltersForm';
import Clock from './components/Clock/Clock';

function App() {
    const [todoList, setTodoList] = useState(
        [
            { id: 1, title: 'Big city boi 1' },
            { id: 2, title: 'Big city boi 2' },
            { id: 3, title: 'Big city boi 3' },
            { id: 4, title: 'Big city boi 4' },
        ]
    )

    const [postList, setPostList] = useState([])

    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 11,
    });

    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: ''
    })

    const [showClock, setShowClock] = useState(true)

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            _page: newPage,
        })
    }

    useEffect(() => {
        async function fecthPostList() {
            try {
                const paramsString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                const { data, pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination)
                console.log(pagination)
            } catch (error) {
                console.log("Failed to fetch postList data: ", error.message);
            }
        }

        fecthPostList()
    }, [filters]);

    function handleTodoClick(todo) {
        console.log(todo)
        const index = todoList.findIndex(x => x.id === todo.id);
        if (index < 0) return;
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1)
        setTodoList(newTodoList);
    }

    function handleFormSubmit(formValues) {
        console.log('form submit', formValues)
        const newTodo = {
            id: todoList.length + 1,
            ...formValues
        }
        const newTodoList = [...todoList]
        newTodoList.push(newTodo)
        setTodoList(newTodoList)
    }

    function handleFormActionSubmit(formValues) {
        console.log(formValues)
    }

    function handleFiltersChange(newFilters) {
        console.log('New filter: ', newFilters)
        setFilters({
            ...filters,
            _page: 1,
            title_like: newFilters.searchTerm,
        })
    }

    function handleShowClock() {
        setShowClock(!showClock)
    }
    return (
        <div className="app">
            <h1>React hooks TodoList</h1>
            {/* <ColorBox />
            <TodoForm
                onSubmit={handleFormSubmit}
            />
            <TodoList
                todos={todoList}
                onTodoClick={handleTodoClick}
            />

            <FormAction
                onSubmitForm={handleFormActionSubmit}
            /> */}
            {/* <PostFiltersForm
                onSubmit={handleFiltersChange}
            />

            <PostList
                posts={postList}
            />

            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
            /> */}


            {showClock && <Clock />}
            <button onClick={handleShowClock}>
                Hide Clock
            </button>
        </div>
    );
}

export default App;
