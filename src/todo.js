/**
 * Created on 17/4/12.
 */

import React from "react";

const LSkey = "todo-react";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);  //TODO: bind this??
        this.state = {
            todos: [],
            input: ""
        }
    }

    componentDidMount() {
        this.fetch();
    }

    update() {
        localStorage.setItem(LSkey, JSON.stringify(this.state.todos))
    }

    fetch() {
        this.setState({
            todos: JSON.parse(localStorage.getItem(LSkey))
        })
    }

    addTodo(e) {
        if (e.which === 13) {
            this.setState({
                todos: this.state.todos.concat({
                    name: this.state.input, isFinished: false
                })
            }, ()=> {
                this.setState({
                    input: ""
                });
                this.update();
            });
        }
    }

    toggleTodo(idx) {
        this.setState({
            todos: this.state.todos.map((elem, i) => {
                if (i === idx) {
                    elem.isFinished = !elem.isFinished;
                }
                return elem
            })
        });
        this.update();
    }

    deleteTodo(idx) {
        this.state.todos.splice(idx, 1);
        this.setState({
            todos: this.state.todos
        });
        this.update();
    }

    render() {
        return (
            <div className="container">
                <div>todo</div>
                <input type="text" onKeyDown={this.addTodo}
                       onChange={(e)=>{this.setState({input: e.target.value})}} value={this.state.input}/>
                <ul>
                    {
                        this.state.todos.map((elem, i) => {
                            return (
                                <li key={i} className="todo-item">
                                    {/*为了对子组件进行唯一性识别。当子组件发生变化时，通过 key 的识别，可以准确地判断这一个子组件是应该移动顺序、插入还是移除。
                                     根据key 决定是否重新渲染
                                     虚拟DOM的识别标志，当数据改变时，那么多相同的子组件，key使得React知道具体改变那个子组件。*/}
                                    <input type="checkbox" checked={elem.isFinished}
                                           onChange={()=>this.toggleTodo(i)}/>
                                    <label className={elem.isFinished ? "disable":null}
                                           onClick={()=>this.toggleTodo(i)}>{elem.name}</label>
                                    <span className="delete" onClick={()=>this.deleteTodo(i)}>delete</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export {
    Todo
}