import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import TodoItems from "./TodoItems";
import './Todolist.css';

class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
   var newItem = {
     text: this._inputElement.value,
     key: Date.now()
   };

   this.setState((prevState) => {
     return {
       items: prevState.items.concat(newItem)
     };
   });

   this._inputElement.value = "";
 }

 console.log(this.state.items);

 e.preventDefault();
}

  render() {
    return (
      <div className = "todolistMain">
      <Button bsStyle="danger">Hello World Danger</Button>
      <Button bsStyle="primary">Hello World Primary</Button>
      <Button bsStyle="success">Hello World Success</Button>

        <div className = "header">
          <form onSubmit = {this.addItem}>
            <p id = "submission">
              <input ref = {(a) => this._inputElement = a}
                placeholder = "enter the keyword">
              </input>
              <button type = "submit"><span class="glyphicon glyphicon-search"></span></button>
            </p>
          </form>

          <TodoItems entries={this.state.items}/>

          <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Artist</th>
                    <th>Track</th>
                    <th>Collection</th>
                    <th>Genre</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>img</td>
                    <td>art</td>
                    <td>track</td>
                    <td>col</td>
                    <td>gen</td>
                    <td><button type = "push"><span class="glyphicon glyphicon-plus"></span></button></td>
                </tr>
                <tr>
                    <td>img</td>
                    <td>art</td>
                    <td>track</td>
                    <td>col</td>
                    <td>gen</td>
                    <td><button type = "push"><span class="glyphicon glyphicon-plus"></span></button></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Todolist;
