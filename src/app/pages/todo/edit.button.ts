import { StatefulWidget } from "mftsccs-browser";

export class EditButton extends StatefulWidget {

  declare data: any;

  after_render(): void {
    let btn = this.getElementById("edit-btn");
    if (btn) {
      btn.onclick = () => {
        // send data to parent
        window.dispatchEvent(new CustomEvent("editTask", {
          detail: this.data
        }));
      };
    }
  }

  getHtml(): string {
    return `<button id="edit-btn">Edit</button>`;
  }
}