import { CreateTheCompositionLocal,MakeTheInstanceConceptLocal,MakeTheTypeConceptLocal,LocalSyncData,PRIVATE, StatefulWidget, CreateTheConnection, CreateTheConnectionLocal } from "mftsccs-browser";

import { getLocalUserId } from "../user/login.service";

export class createTask extends StatefulWidget{

    before_render(): void {
        this.render();
    }

    after_render(): void {
        
        let userId = getLocalUserId();
        let name = this.getElementById("name") as HTMLInputElement;
        let desc = this.getElementById("desc") as HTMLInputElement;
        let status = this.getElementById("status") as HTMLInputElement;
        let btn = this.getElementById("submit");

        if (btn){
            btn.onclick = (e: Event) => {
                e.preventDefault();

                //create main task
                MakeTheInstanceConceptLocal("the_task","",true,userId,PRIVATE)
                    .then((task)=>{

                        this.createTask(task.id,name.value,desc.value,status.value);
                    });   
        };
    }
}

    createTask(taskId:number,name:string,desc:string,status:string){
        let userId = getLocalUserId();
        let order = 1000;

        Promise.all([
            MakeTheTypeConceptLocal("the_task_name",999, 999,userId),
            MakeTheTypeConceptLocal("the_task_description",999, 999,userId),
            MakeTheTypeConceptLocal("the_task_status",999, 999,userId),
        ]).then(([nameType,descType,statusType])=>{

            Promise.all([
                MakeTheInstanceConceptLocal("the_name",name,false,userId,PRIVATE),
                MakeTheInstanceConceptLocal("the_description",desc,false,userId,PRIVATE),
                MakeTheInstanceConceptLocal("the_status",status,false,userId,PRIVATE)

            ]).then(([nameC,descC,statusC])=>{

                Promise.all([
                    CreateTheConnectionLocal(taskId,nameC.id,nameType.id,order),
                    CreateTheConnectionLocal(taskId,descC.id,descType.id,order),
                    CreateTheConnectionLocal(taskId,statusC.id,statusType.id,order),

                ]).then(()=>{
                    LocalSyncData.SyncDataOnline().then(() => {
                    alert("Task created successfully! ");
                    window.dispatchEvent(new Event("taskUpdated"));
                    });
                    
                });
            });
        });
    }

    getHtml(): string {
        return `
        <div>
            <h2>Create Task</h2>
            <input id="name" placeholder="Task Name"/><br/>
            <input id="desc" placeholder="Task Description"/><br/>
            <input id="status" placeholder="Task Status"/><br/>
            <button id="submit">Create Task</button>    
        </div>`
    }
}