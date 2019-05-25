import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as d3 from 'd3';
import { DialogDetailsComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'gd-app';
  content: string;
  inputContent = '';
  jsonTree = { name: '', children: [] };
  nodeWidth = 180;
  nodeHeight = 280;
  svgWidth = 1000;
  svgHeight = 10000;
  svg;
  viewBoxStartX = 0;
  viewBoxStartY = 0;
  viewBoxEndX = 1000;
  viewBoxEndY = 10000;
  scaleSpeed = 100;
  moveSpeed = 30;
  lastClientX = 0;
  lastClientY = 0;
  forbidCopy = false;
  constructor(public dialog: MatDialog) { }
  processFiles(file) {
    file = file.target.files[0];
    if (file) {
      console.log('只支持UTF-8');
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = ((event: any) => {
        this.inputContent = event.target.result;
        this.convertInput();
      });
      reader.onerror = ((event) => {
        console.log(event);
      });
    }
  }
  convertInput() {
    if (!this.inputContent) {
      return;
    }
    this.jsonTree = { name: '', children: [] };
    const contentArrary = this.inputContent.split('###');
    let stringConfigs = contentArrary[0].split('\n');
    stringConfigs = stringConfigs.filter((item) => {
      return item.charAt(0) !== '#';
    });
    for (const config of stringConfigs) {
      if (config.indexOf('svg-height') >= 0) {
        this.svgHeight = parseFloat(config.split(':')[1]);
        this.viewBoxEndY = this.svgHeight;
      } else if (config.indexOf('svg-width') >= 0) {
        this.svgWidth = parseFloat(config.split(':')[1]);
        this.viewBoxEndX = this.svgWidth;
      } else if (config.indexOf('node-height') >= 0) {
        this.nodeHeight = parseFloat(config.split(':')[1]);
      } else if (config.indexOf('node-width') >= 0) {
        this.nodeWidth = parseFloat(config.split(':')[1]);
      }
    }
    const stringArrary = contentArrary[1].split('\n');
    const nodes = [0];
    if (stringArrary[0] === '') {
      stringArrary.splice(0, 1);
    }
    let lastIndex = 0;
    for (let s of stringArrary) {
      if (!s) {
        continue;
      }
      if (s.charAt(0) === '#') {
        continue;
      }
      let i = 0;
      for (; i < s.length; i = i + 2) {// TODO 硬编码
        if (s.charAt(i) === ' ') {

        } else {
          break;
        }
      }
      s = s.substring(i, s.length);
      s = s.replace('  ', '\n');
      const spaceIndex = i / 2;  // 表示缩进
      let jsonchildren = this.jsonTree;
      if (lastIndex < i) { // 子
        if (!isNaN(nodes[spaceIndex])) {
          nodes[spaceIndex] = nodes[spaceIndex] + 1;
        } else {
          nodes[spaceIndex] = 0;
        }
      } else if (lastIndex > i) { // 父
        nodes[spaceIndex] = nodes[spaceIndex] + 1;
        nodes[spaceIndex + 1] = -1;
      } else if (lastIndex !== 0 && lastIndex === i) {
        nodes[spaceIndex] = nodes[spaceIndex] + 1;
      }
      for (let j = 0; j < spaceIndex; j++) {
        jsonchildren = jsonchildren.children[nodes[j]];
      }
      jsonchildren.children.push({ name: s, children: [] });
      lastIndex = i;
    }
    this.jsonTree = this.jsonTree.children[0];
    this.draw();
  }

  draw() {
    const content = d3.select('#content');
    this.lastClientX = parseFloat(content.style('width').replace('px', ''));
    this.lastClientY = parseFloat(content.style('height').replace('px', ''));

    // 定义边界
    const marge = { top: 50, bottom: 0, left: 10, right: 0 };

    this.svg = d3.select('svg');
    if (this.svg.attr('width') > 0) {
      d3.select('svg').remove();
      this.svg = d3.select('svg-content').append('svg');
    }
    this.svg.attr('width', this.lastClientX);
    this.svg.attr('height', this.lastClientY);
    const g = this.svg.append('g')
      .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');

    // 创建一个hierarchy layout
    const hierarchyData = d3.hierarchy(this.jsonTree)
      .sum((d) => {
        return d.value;
      });
    // 创建一个树状图
    const tree = d3.tree()
      .size([this.svgHeight - 200, this.svgWidth - 400])
      // 节点距离
      .separation((a, b) => {
        return (a.parent === b.parent ? 1 : 2) / a.depth;
      });
    // 初始化树状图，也就是传入数据,并得到绘制树基本数据
    const treeData = tree(hierarchyData);
    // 得到节点
    const nodes = treeData.descendants();
    const links = treeData.links();
    // 创建一个贝塞尔生成曲线生成器
    const bézierCurveGenerator: any = d3.linkHorizontal()
      .x((d) => {
        return d.y;
      })
      .y((d) => {
        return d.x;
      });

    // 有了节点和边集的数据后，我们就可以开始绘制了，
    // 绘制边
    g.append('g')
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', (d) => {
        const start = { x: d.source.x + 1, y: d.source.y };
        const end = { x: d.target.x + 1, y: d.target.y };
        return bézierCurveGenerator({ source: start, target: end });
      })
      .attr('fill', 'none')
      .attr('stroke', 'yellow')
      .attr('stroke-width', 1);

    // 绘制节点和文字
    // 老规矩，先创建用以绘制每个节点和对应文字的分组<g>
    const gs = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', (d) => {
        const cx = d.x;
        // d.data.name
        const cy = d.y;
        return 'translate(' + cy + ',' + cx + ')';
      });
    // 绘制节点
    gs.append('circle')
      .attr('r', 4)
      .attr('fill', 'white')
      .attr('stroke', 'blue')
      .attr('stroke-width', 1);

    // 文字
    gs.append('text')
      .attr('x', (d) => {
        return d.children ? -40 : 8;
      })
      .attr('y', -5)
      .attr('dy', 10)
      .text((d) => {
        return d.data.name;
      });
    this.wrapWord(gs.selectAll('text'));
    this.svg.attr('viewBox', '0 0 ' + this.viewBoxEndX + ' ' + this.viewBoxEndY);
  }
  resetSvg() {
    this.viewBoxEndY = this.svgHeight;
    this.viewBoxEndX = this.svgWidth;
    this.svg.attr('viewBox', '0 0 ' + this.viewBoxEndX + ' ' + this.viewBoxEndY);
  }
  wrapWord(texts: any) {
    const vm = this;
    // tslint:disable-next-line: space-before-function-paren
    texts.each(function () {
      const text = d3.select(this);

      const words = text.text().split('\n');
      let tspan = text.text(null);
      if (words.length > 1) {
        text.attr('class', 'text-node');
        text.on('click', (event) => {
          vm.openDialog(event.data.name);
        });
      }
      const lineHigth = -5;
      for (const word of words) {
        tspan = text.append('tspan').attr('x', 10).attr('y', lineHigth).text(word);
        break;
      }
    });
  }
  openDialog(content: string): void {
    const dialogRef = this.dialog.open(DialogDetailsComponent, {
      // width: '250px',
      data: content
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  mouseWheelUp(event) {// 放大
    if (!this.svg) {
      return;
    }
    if (this.viewBoxEndX - this.scaleSpeed > 100) {
      this.viewBoxEndX = this.viewBoxEndX - this.scaleSpeed;
    }
    if (this.viewBoxEndY - this.scaleSpeed > 100) {
      this.viewBoxEndY = this.viewBoxEndY - this.scaleSpeed;
    }
    this.svg.attr('viewBox', this.viewBoxStartX + ' ' + this.viewBoxStartY + ' ' + this.viewBoxEndX + ' ' + this.viewBoxEndY);
  }
  mouseWheelDown(event) {// 缩小
    if (!this.svg) {
      return;
    }
    this.viewBoxEndX = this.viewBoxEndX + this.scaleSpeed;
    this.viewBoxEndY = this.viewBoxEndY + this.scaleSpeed;
    this.svg.attr('viewBox', this.viewBoxStartX + ' ' + this.viewBoxStartY + ' ' + this.viewBoxEndX + ' ' + this.viewBoxEndY);
  }
  mouseMove(event) {
    if (!this.svg) {
      return;
    }
    const x = this.lastClientX - event.clientX;
    if (x > 0) {// left
      this.viewBoxStartX = this.viewBoxStartX + this.moveSpeed;
    } else if (x < 0) {// right
      this.viewBoxStartX = this.viewBoxStartX - this.moveSpeed;
    }
    const y = this.lastClientY - event.clientY;
    if (y > 0) {// up
      this.viewBoxStartY = this.viewBoxStartY + this.moveSpeed;
    } else if (y < 0) {// down
      this.viewBoxStartY = this.viewBoxStartY - this.moveSpeed;
    }
    this.svg.attr('viewBox', this.viewBoxStartX + ' ' + this.viewBoxStartY + ' ' + this.viewBoxEndX + ' ' + this.viewBoxEndY);
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;
  }

}
