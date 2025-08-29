## topnet-cli 脚手架工具搭建

### 一、topnet-cli 脚手架概述

topnet-cli 是一个可以通过命令行快速选择模板，初始化项目的脚手架工具，目的是解决
前端项目模板的拷贝问题、，支持选择 github、gitlab 的项目模板进行创建。

### 二、脚手架思路

1、命令整理

```
topnet create <priojectName>
clone git template to generate project
Do you install NPM dependencies? Installation takes a while!
exec npm install
open and start http server


```

### 三、脚手架开发

#### 1、开发说明

    利用 commander 解析命令行参数，根据不同的参数去处理相应的动作，例如通过 topnet create 命令执行后，先去输出topnet cli的名称，选择定义的模板，根据指定模板去git仓库下载代码，提示用户是否需要依赖安装，当用户同意后，会加载pakcage.json中的dependencies进行安装，最后启动vue服务并打开浏览器。

#### 2、项目目录说明

```
bin
    topnet.js // 命令启动入口文件
doc // 存放开发文档
src
    copy
        index.js //拷贝执行逻辑
    create
        index.js // 创建执行逻辑
        download.js // 下载执行逻辑
        install.js // 安装执行逻辑
        welcome.js // 欢迎语执行逻辑
    dir
        index.js // 读取文件目录执行逻辑
    libs
        config.js // 数据配置文件
        download_util.js // 下载git仓库代码的核心文件
        utils.js // 工具方法文件
    index.js // 程序入口文件
package.json // npm配置文件
readme.md // topnet脚手架说明文件

```

### 四、脚手架发布

```
nrm use topnet // 切换topnet私有仓库

npm login

npm publish

```

### 五、脚手架使用

```
npm i topnet-cli -g // 全局安装topnet脚手架

topnet -v // 查看topnet版本

topnet -h // 查看帮助

topnet create [projectName] // 创建项目

topnet copy <dirName> <targetName> //拷贝目录到指定目录
```
