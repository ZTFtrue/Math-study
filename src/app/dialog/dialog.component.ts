import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var MathJax: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogDetailsComponent implements AfterViewInit {
  dataArrary;
  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.dataArrary = data.split('\n');
  }



  ngAfterViewInit() {
    this.renderMath();
  }

  renderMath() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathContent']);
  }
}
