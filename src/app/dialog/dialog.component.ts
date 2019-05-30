import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MathJax } from 'mathjax';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {

    MathJax.Hub.Config({
      tex2jax: { inlineMath: [['$$', '$$'], ['\\(', '\\)']] }
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
