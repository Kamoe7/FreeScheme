import { StatefulWidget } from "mftsccs-browser";
import { createTask } from "./create.task";
import { ListTask } from "./list.task";
import { EditTask } from "./edit.task"
import "./todo.style.css";

export class TodoList extends StatefulWidget {

  before_render(): void {
    this.render()

  }

  after_render(): void {
    
    if ((window as any)._todoMounted) return;
    (window as any)._todoMounted = true;

    let createDiv = this.getElementById("create");
    let listDiv = this.getElementById("list");
    let editDiv = this.getElementById("edit");

    let createWidget = new createTask();
    createWidget.mount(createDiv!);

    let listWidget = new ListTask();
    listWidget.mount(listDiv!);

    window.addEventListener("editTask",(e:any)=>{
        editDiv!.innerHTML= "";
        let editWidget = new EditTask();
        editWidget.mount(editDiv!);
        editWidget.data = e.detail;
        editWidget.render();
        
    });
  }

  getHtml(): string {
    return `
      <div class="app-container">
        <h1 class="title"> Todo App</h1>

        <div class="card" id="create"></div>

        <div class="card" id="list" style="display:none"></div>
        <div class="card" id ="edit" style="display:none"> </div>
     </div>
    `;
  }
}