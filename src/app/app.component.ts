import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gd-app';
  content: string;
  inputContent = '';
  html = '';
  jsonTree = { parent: '', child: [] };
  readFile() {
    this.jsonTree = { parent: '', child: [] };
    const stringArrary = this.inputContent.split('###')[1].split('\n');
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
      let jsonChild = this.jsonTree;
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
        jsonChild = jsonChild.child[nodes[j]];
      }
      jsonChild.child.push({ parent: s, child: [] });
      lastIndex = i;
    }
    this.draw();
  }

  /*
   * 树结构遍历,不用递归
   **/
  draw() {
    // 拷贝问题？
    const c: any = document.getElementById('myCanvas');
    const ctx: any = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();

    let jsonNode = this.jsonTree;
    const stack = [];
    stack.push(jsonNode);
    while (stack.length !== 0) {
      jsonNode = stack.pop();
      if (jsonNode.child.length > 0) {
        const childs = jsonNode.child.reverse();
        jsonNode.child = [];
        stack.push(jsonNode);
        for (const item of childs) {
          stack.push(item);
        }
      } else {
        console.log(jsonNode.parent);
      }
    }
  }
}
