## 阶乘

在数学中，正整数的阶乘（英语：factorial）是所有小于及等于该数的正整数的积，计为n!，例如5的阶乘计为5!，其值为120：$${\displaystyle 5!=5\times 4\times 3\times 2\times 1=120 .}$$并定义，1的阶乘1!为1、0的阶乘0!亦为1，其中，0的阶乘表示一个[空积](https://zh.wikipedia.org/wiki/%E7%A9%BA%E7%A7%AF)

## 逆元

### 加法逆元

设“+”为一个交换性的二元运算，即对于所有x,y，x+y=y+x。若该集内存在一个元素0，使得对于所有x，x+0=0+x=x，则此元素是唯一的。如果对于一个给定的x，存在一个x'使得x+x'=x'+x=0，则称x'是x的加法逆元。

对于一个任意数n，存在加法逆元（英语：Additive Inverse，又称相反数），其与n的和为零（加法单位元）。n的加法逆元表示为-n。

### 乘法逆元(倒数)

数学上，一个数 ${\displaystyle \displaystyle x} \displaystyle x的倒数（reciprocal），或称乘法逆元（multiplicative inverse），是指一个与 {\displaystyle \displaystyle x} \displaystyle x相乘的积为1的数，记为 {\displaystyle \displaystyle {\tfrac {1}{x}}} \displaystyle \tfrac{1}{x}或 {\displaystyle \displaystyle x^{-1}} \displaystyle x^{-1}$。  在抽象代数中，倒数所对应的抽象化概念是乘法群的某个元素的“乘法逆”，也就是相对于群中“乘法”运算的逆元素。注意这个名词只当相应的群中的运算被称为“乘法”后才使用。如果群中的运算被称为“加法”，那么同样的概念称为“加法逆”。乘法逆的具体定义可以参见群的逆元素概念。

### 负倒数

乘积为-1的两个实数互为负倒数，实数x的负倒数记为 ${\displaystyle -{\frac {1}{x}}} {\displaystyle -{\frac {1}{x}}}或 {\displaystyle -x^{-1}} {\displaystyle -x^{-1}}$。一个实数的倒数和其负倒数是相反数，0没有倒数或负倒数。

### 二项式定理

$(x+y)^{n}={n \choose 0}x^{n}y^{0}+{n \choose 1}x^{{n-1}}y^{1}+{n \choose 2}x^{{n-2}}y^{2}+\cdots +{n \choose n-1}x^{1}y^{{n-1}}+{n \choose n}x^{0}y^{n}$,其中每个 ${n \choose k}$ 为一个称作二项式系数的特定正整数，其等于 ${\frac {n!}{k!(n-k)!}}$。这个公式也称二项式公式或二项恒等式。使用求和符号，可以把它写作$(x+y)^{n}=\sum _{k=0}^{n}{n \choose k}x^{n-k}y^{k}=\sum _{k=0}^{n}{n \choose k}x^{k}y^{n-k}$.

后面的表达式只是将根据 x 与 y 的对称性得出的，通过比较发现公式中的二项式系数也是对称的。 二项式定理的一个变形是用 1 来代换 y 得到的，所以它只涉及一个变量。在这种形式中，公式写作$(1+x)^{n}={n \choose 0}x^{0}+{n \choose 1}x^{1}+{n \choose 2}x^{2}+\cdots +{n \choose {n-1}}x^{n-1}+{n \choose n}x^{n}$,或者等价地$(1+x)^{n}=\sum _{k=0}^{n}{n \choose k}x^{k}$.

### 二项式系数(二项式定理中各项的系数,参考杨辉三角)

### 贝塞尔曲线

${\mathbf {B}}(t)=\sum _{{i=0}}^{n}{n \choose i}{\mathbf {P}}_{i}(1-t)^{{n-i}}t^{i}={n \choose 0}{\mathbf {P}}_{0}(1-t)^{n}t^{{0}}+{n \choose 1}{\mathbf {P}}_{1}(1-t)^{{n-1}}t^{{1}}+\cdots +{n \choose n-1}{\mathbf {P}}_{{n-1}}(1-t)^{{1}}t^{{n-1}}+{n \choose n}{\mathbf {P}}_{n}(1-t)^{{0}}t^{n}{\mbox{ , }}t\in [0,1]$

杨辉三角形(帕斯卡三角形、贾宪三角形、海亚姆三角形、巴斯卡三角形)

1. 杨辉三角以正整数构成，数字左右对称，每行由1开始逐渐变大，然后变小，回到1。
2. 杨辉三角每一行的平方和在杨辉三角出现奇数次。
3. 杨辉三角第2的幂行所有数都是奇数。
4. 杨辉三角每一行的和是2的幂。
5. 第 n 行的数字个数为n个。
6. 第 n 行的第k个数字为组合数$C_{n-1}^{k-1}$。
7. 第n行数字和为$2^{n-1}$。
8. 除每行最左侧与最右侧的数字以外，每个数字等于它的左上方与右上方两个数字之和（也就是说，第 n 行第k 个数字等于第 n-1 行的k-1 个数字与第 k 个数字的和）。这是因为有组合恒等式：$C_{n+1}^{i+1}=C_{n}^{i}+C_{n}^{i+1}$。可用此性质写出整个杨辉三角形。
![杨辉三角形图解](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)  (图片来自维基百科)

### 丢番图方程(不定方程)

### 模运算

参考自 应用密码学 协议算法与C源程序
如果$a=b+kn$对某些整数$k$ 成立，那么$a\equiv b(mod n)$. 如果$a$为正,则b为$0~n$,那么你可以将b看作a被n整除以后的余数. 有时a叫做与 b 模 n 同余(congrunet)(三元等号$\equiv$ 表示同余).
从$0~n$的整数组成的集合构成了模$n$的完全剩余集. 这意味着,对于每一个整数a,它的模n的余项是从$0~n-1$的某个数.
a模n的运算给出了a的余数,余数是从$0~n-1$ 的某个整数,这种运算称为模变换(modular reduction). 例如,$5 mod 3 = 2$.
(应用密码学 协议算法与C源程序 P171)  这里模的定义与一些编程语言中的模定义或许有些不同. 例如,PASCAL的模操作符有时返回一个负数. 它返回一个从$-(n-1)~n-1$的数.在C语言中,$%$操作符返回第一个表示项被第二个表示项相除所得的余数,如果其中一个操作项是负的,那么结果就为负. 对于本书的所有算法,如果它返回一个负数,你应该将n加到这个模运算操作的结果上.

#### 模运算的四则运算

$$ (a+b) mod n= ((a mod n)+(b mod n)) mod n $$
$$ (a-b) mod n= ((a mod n)-(b mod n)) mod n $$
$$ (a\timesb) mod n= ((a mod n)\times(b mod n)) mod n$$
$$ (a \times (b+c)) mod n= (((a \times b) mod n)+((a \times c) mod n)) mod n $$

### 求模逆元
