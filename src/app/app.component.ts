import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
      } else if (config.indexOf('svg-width') >= 0) {
        this.svgWidth = parseFloat(config.split(':')[1]);
      } else if (config.indexOf('node-height') >= 0) {
        this.nodeHeight = parseFloat(config.split(':')[1]);
      } else if (config.indexOf('node-width') >= 0) {
        this.nodeWidth = parseFloat(config.split(':')[1]);
      }
    }
    console.log(this.svgWidth);
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
    // 定义边界
    const marge = { top: 50, bottom: 0, left: 10, right: 0 };

    let svg = d3.select('svg');
    if (svg.attr('width') > 0) {
      d3.select('svg').remove();
      svg = d3.select('svg-content').append('svg');
    }
    svg.attr('width', this.svgWidth);
    svg.attr('height', this.svgHeight);
    const g = svg.append('g')
      .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');

    // 创建一个hierarchy layout
    const hierarchyData = d3.hierarchy(this.jsonTree)
      .sum((d) => {
        return d.value;
      });
    // 创建一个树状图
    const tree = d3.tree()
      .size([this.svgHeight - 200, this.svgWidth - 400])
      // .nodeSize([this.nodeWidth, this.nodeHeight])
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
        const start = { x: d.source.x, y: d.source.y };
        const end = { x: d.target.x, y: d.target.y };
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
  }
  wrapWord(texts: any) {
    // tslint:disable-next-line: space-before-function-paren
    texts.each(function () {
      const text = d3.select(this);
      const words = text.text().split('\n');
      let tspan = text.text(null).append('tspan');
      let lineHigth = -5;
      for (const word of words) {
        tspan = text.append('tspan').attr('x', 10).attr('y', lineHigth).text(word);
        lineHigth = lineHigth + 30;
      }
    });
  }
}
