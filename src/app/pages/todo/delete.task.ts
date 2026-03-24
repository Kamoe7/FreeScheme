import {
  DeleteConceptById,
  StatefulWidget
} from "mftsccs-browser";

export class DeleteTask extends StatefulWidget {

  data: number = 0; //taskId
  after_render(): void {

    let btn = this.getElementById("delete");
    if (btn) {
      btn.onclick = () => {
        let confirmDelete = confirm("Delete this task?");
        if (confirmDelete) {
            DeleteConceptById(this.data).then(() => {
            window.dispatchEvent(new Event("closeEdit"));;
            
            alert("Task Deleted successfully! ");
            window.dispatchEvent(new Event("taskUpdated"));
            });
           
        }
      };
    }
  }

  getHtml(): string {
    return `<button id="delete">Delete</button>`;
  }
}