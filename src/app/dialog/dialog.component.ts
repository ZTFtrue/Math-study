import { AfterViewInit, Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '../config.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogDetailsComponent implements AfterViewInit {
  dataArrary;
  mathJaxObject;
  renderFinish = false;
  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public data: string, public cs: ConfigService, public detector: NgZone) {
    this.dataArrary = data.split('\n');
  }



  ngAfterViewInit() {
    this.mathJaxObject = this.cs.nativeGlobal().MathJax;
    this.loadMathConfig();
    this.renderMath();
  }

  renderMath() {
    this.mathJaxObject.Hub.Queue(['setRenderer', this.mathJaxObject.Hub, 'CommonHTML'],
      ['Typeset', this.mathJaxObject.Hub, 'mathContent'], () => {
        this.detector.run(() => { this.renderFinish = true; });
      });
  }
  loadMathConfig() {
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: {
        inlineMath: [
          ['$', '$']
        ],
        displayMath: [
          ['$$', '$$']
        ]
      },
      CommonHTML: {
        linebreaks: {
          automatic: true
        }
      },
      'HTML-CSS': {
        linebreaks: {
          automatic: true
        }
      },
      SVG: {
        linebreaks: {
          automatic: true
        },
        mtextFontInherit: true,
        blacker: 1,
      },
      // extensions: ['tex2jax.js', 'TeX/AMSmath.js'],
      // jax: ['input/TeX', 'output/SVG'],
      jax: ['input/MathML', 'output/SVG'],
      extensions: ['mml2jax.js', 'MathEvents.js'],
      MathML: {
        extensions: ['content-mathml.js']
      },
      menuSettings: {
        zoom: 'None'
      },
      MatchWebFonts: {
        matchFor: {
          SVG: true
        },
        fontCheckDelay: 500,
        fontCheckTimeout: 15 * 1000
      },
      messageStyle: 'none'
    });
  }
  closeDialog() {
    this.detector.run(() => { this.dialogRef.close(); });
  }
}
