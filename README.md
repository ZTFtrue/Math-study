# Math-study

__数学各个方面的知识，包括和计算机相关的(没有习题)__ _这个思路可以用来学习其它方面的知识。_

 考虑了一下，不使用canvas绘图以方便搜索。
>math.gd 是主要内容  
>这个应用算是个显示的工具。

滚轮缩放

虽然可以通过配置，解决支持浏览器的问题，但是我暂时不想做。

linux 用户可能会遇到如下问题

```sh
[12419:0602/204432.273114:FATAL:setuid_sandbox_host.cc(157)] The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing I'm aborting now. You need to make sure that ./node_modules/electron/dist/chrome-sandbox is owned by root and has mode 4755.
```

暂时我没有找到好的解决办法,只好设置了一下权限，[参考](https://github.com/electron/electron/issues/17972)。

```sh
sudo chown root your_path/node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 your_path/node_modules/electron/dist/chrome-sandbox
```

或者

```sh
sudo sysctl kernel.unprivileged_userns_clone=1
```

## 运行方法

1. npm install
2. npm run start
3. 浏览器打开[http://localhost:4200](http://localhost:4200)
4. 选择math.gd文件

![eg](./img/img1.jpg)
![eg](./img/img2.jpg)

## _未完成_

1. 图需要优化距离和换行。
2. 内容没有完成。
3. SVG中的公式需要处理。
