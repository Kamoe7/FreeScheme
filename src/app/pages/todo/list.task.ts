import {
  FreeschemaQuery,
  JUSTDATA,
  SchemaQueryListener,
  StatefulWidget
} from "mftsccs-browser";
import { EditTask } from "./edit.task";
import { EditButton } from "./edit.button";
import { DeleteTask } from "./delete.task";
export class ListTask extends StatefulWidget {

  tasks: any = [];

  before_render(): void {
    if (!(window as any)._taskListenerAdded ) {

        window.addEventListener("taskUpdated",()=>{
            this.loadQuery();

        });
        this.loadQuery();

        
    (window as any)._taskListenerAdded = true;
}
  }

    loadQuery() {
        let nameQ = new FreeschemaQuery();
        nameQ.typeConnection = "the_task_name";
        nameQ.name = "taskname";

        let query = new FreeschemaQuery();
        query.type = "the_task";
        query.freeschemaQueries = [nameQ];
        query.selectors = ["the_task_description", "the_task_status"];
        query.outputFormat = JUSTDATA;

        let debounceTimer: any = null;

        SchemaQueryListener(query, "").subscribe((data: any) => {
            this.tasks = data;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.render();
            }, 100);
        });


}

  after_render(): void {
    let body =this.getElementById("body");
    if (!body) return;

    body.innerHTML = ""; 

    const validTasks = this.tasks.filter((t: any) => t !== null && t !== undefined);
  
    if (this.element?.parentElement) {
        this.element.parentElement.style.display = validTasks.length === 0 ? "none" : "block";
    }

    validTasks.forEach((t: any) => {

            let name   = t.the_task?.the_task_name?.the_name?.data   ?? "(no name)";
            let desc   = t.the_task?.the_task_description?.the_description?.data ?? "";
            let status = t.the_task?.the_task_status?.the_status?.data ?? "pending";

        let editWidget = new EditButton();
            editWidget.data = {
            id: t.id,
            name: name,
            desc: desc,
            status: status
            };

        let deleteWidget =new DeleteTask();
        deleteWidget.data =t.id;

        let container= document.createElement("div");
        container.className = "task-card";

        let editDiv =document.createElement("div");
        let deleteDiv =document.createElement("div");

        let btnWrapper = document.createElement("div");
        btnWrapper.style.display = "flex";
        btnWrapper.style.gap = "10px";
        btnWrapper.style.marginTop = "10px";

        editWidget.mount(editDiv);
        deleteWidget.mount(deleteDiv);

        btnWrapper.appendChild(editDiv);
        btnWrapper.appendChild(deleteDiv);

        container.innerHTML = `
        <h3>${name}</h3>
        <p>${desc}</p>
        <p>Status: <span style="color:${status === "done" ? "#22c55e" : "#facc15"}">${status}</span></p>
        `;

        container.appendChild(btnWrapper);
        body.appendChild(container);
        });
    


}

  getHtml(): string {
    if (!this.tasks || this.tasks.filter((t: any) => t !== null).length === 0) {
        return `<p style="text-align:center; color: #a855f7; margin-top: 30px;">No tasks yet. Create one above!</p>`;
    }
    return `<div>
                <h2>Tasks</h2>
                <div id="body"></div>
            </div>`;
  }
}