## topnet-cli 初始化项目脚手架工具

### 一、概述

@topnet/cli 是一个可以通过命令行快速选择模板，初始化项目的脚手架工具，目的是解决
前端项目模板的拷贝问题、，支持选择 github、gitlab 的项目模板进行创建。

### 二、使用

1、安装 nodejs 到 [nodejs 官网](https://nodejs.org/en/)下载对应的 nodejs 包进行
安装。

2、安装 @topnet/cli 脚手架

```
npm i @topnet/cli -g
```

3、打开系统命令行工具，检测 topnet 环境

```
查看版本
topnet -V  或  topnet --version

查看帮助
topnet -h 或 topnet --help
```

4、初始化项目

```
topnet create [projectName] // [projectName]为可选参数
```

5、列出模板

```
topnet ls
```

6、设置模板

```
# 如：topnet set "内网框架(topnet-admin-framework)" topnet:TechDev3/top-admin-framework r5.3.0,r5.2.0,r5.0.0
topnet set <templateName> <templateRepo> <templateVersion>// <templateName> <templateRepo> <templateVersion>为必选参数
```

7、删除模板

```
# topnet unset "内网框架(topnet-admin-framework)"
topnet unset <templateName> // <templateName>为必选参数
```

8、拷贝项目

```
topnet copy <sourceDir> <targetDir> // <sourceDir> <targetDir>为必选参数
```

9、发布静态资源到服务器

```
9.1、命令
topnet deploy <source> // <source>为必选参数

9.2、项目根目录deploy.json的配置
{
    "host": "******", // 可为空
    "port": "******", // 可为空
    "username": "******", // 可为空
    "password": "******", // 可为空
    "path": "******",
    "localPath": "dist"
}
```

### 三、模板配置部署
1，设置模板   
在`templateConfig.json`中写入模板配置
```json
"内网框架(topnet-admin-framework)": {
        "name": "内网框架(topnet-admin-framework)", // 模板名称
        "value": "topnet:TechDev3/top-admin-framework", // 模板地址 
        "version": "r5.2.0,r5.0.0" // 模板版本，逗号隔开，版本号按从高到低的顺序排列
    }
```

2，发布
```bash
npm publish
```

### 四、注意事项

Q1：在 powershell 中执行 topnet -h 的命令时，可能会出现如下错误：

```
topnet : 无法加载文件 C:\Users\Administrator.WIN-IPTBEDC2HPI\AppData\Roaming\npm\topnet.ps1，因为在此系统上禁止运行脚本。
```

A1：解决方法：以管理员身份，打开 powershell，执行如下命令后选择 “Y”

```
set-ExecutionPolicy RemoteSigned
```
