import {
  DeleteConnectionByType,
  CreateTheConnectionLocal,
  MakeTheInstanceConceptLocal,
  MakeTheTypeConceptLocal,
  LocalSyncData,
  PRIVATE,
  StatefulWidget
} from "mftsccs-browser";

import { getLocalUserId } from "../user/login.service";

export class EditTask extends StatefulWidget {

  declare data: any; 

  before_render(): void {
   if (!(window as any)._editCloseListenerAdded) {
      window.addEventListener("closeEdit", () => {
        this.data = null;
        this.render();
      });
      (window as any)._editCloseListenerAdded = true;
    }
  }

  after_render(): void {

    if (this.element?.parentElement) {
        this.element.parentElement.style.display = this.data ? "block" : "none";
    }

    let userId = getLocalUserId();
    let name = this.getElementById("name") as HTMLInputElement;
    let desc = this.getElementById("desc") as HTMLInputElement;
    let status = this.getElementById("status") as HTMLInputElement;
    let btn = this.getElementById("update");
    let cancel = this.getElementById("cancel");

    // preload values
    if (this.data) {
      name.value = this.data.name;
      desc.value = this.data.desc;
      status.value = this.data.status;
    }

    if (cancel) {
      cancel.onclick = () => {
        this.data = null;   
        this.render();      
    };
  }

    if (btn) {
      btn.onclick = async (e) => {
        e.preventDefault();
        let taskId = this.data.id;
        // Delete old connections
        Promise.all([
           DeleteConnectionByType(taskId,"the_task_name"),
           DeleteConnectionByType(taskId,"the_task_description"),
           DeleteConnectionByType(taskId, "the_task_status"),
        ]).then(() => {

          // Create new ones
          this.updateTask(taskId,name.value,desc.value,status.value);
        });
      };
    }
  }
  updateTask(taskId: number, name: string, desc: string, status: string) {
    let userId = getLocalUserId();
    let order = 1000;

    Promise.all([
      MakeTheTypeConceptLocal("the_task_name", 999, 999,userId),
      MakeTheTypeConceptLocal("the_task_description", 999, 999,userId),
      MakeTheTypeConceptLocal("the_task_status", 999, 999,userId),
    ]).then(([nameType, descType, statusType]) => {

      Promise.all([
        MakeTheInstanceConceptLocal("the_name",name,false,userId,PRIVATE),
        MakeTheInstanceConceptLocal("the_description",desc,false,userId,PRIVATE),
        MakeTheInstanceConceptLocal("the_status",status,false,userId, PRIVATE),
      ]).then(([nameC, descC, statusC]) => {

        Promise.all([
          CreateTheConnectionLocal(taskId,nameC.id,nameType.id,order),
          CreateTheConnectionLocal(taskId,descC.id,descType.id,order),
          CreateTheConnectionLocal(taskId,statusC.id,statusType.id, order),
        ]).then(() => {

           LocalSyncData.SyncDataOnline().then(() => {
          alert("Task Updated successfully! ");
          window.dispatchEvent(new Event("taskUpdated"));
        });
          
        });

      });

    });
  }

  getHtml(): string {
     if (!this.data) return "";
    return `
    <div>
      <h2>Edit Task</h2>
      <input id="name" placeholder="Task Name"/><br/>
      <input id="desc" placeholder="Description"/><br/>
      <input id="status" placeholder="Status"/><br/>
      <button id="update">Update</button>
      <button id="cancel">Cancel</button>
    </div>
    `;
  }
}