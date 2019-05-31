import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { MathJax } from 'mathjax';
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
    this.loadMathConfig();
    this.renderMath();
  }

  renderMath() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub], 'mathContent');
  }
  loadMathConfig() {
    MathJax.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] },
      menuSettings: { zoom: 'Double-Click', zscale: '150%' },
      CommonHTML: { linebreaks: { automatic: true } },
      'HTML-CSS': { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } }
    });
  }
}
