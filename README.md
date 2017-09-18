# 安装百度AI开放平台 Node.js SDK

**Node.js SDK目录结构**

        ├── src
        │  ├── auth                                //授权相关类
        │  ├── http                                //Http通信相关类
        │  ├── client                              //公用类
        │  ├── util                                //工具类
        │  └── const                               //常量类
        ├── AipOcr.js                              //文字识别交互类
        ├── AipFace.js                             //人脸识别交互类
        ├── AipNlp.js                              //语言处理基础技术交互类
        ├── AipImageCensor.js                      //图像审核交互类
        ├── AipImageClassify.js                    //图像识别交互类
        ├── AipKg.js                               //知识图谱交互类
        ├── AipSpeech.js                           //语音合成&语音识别交互类
        ├── index.js                               //入口文件
        └── package.json                           //npm包描述文件

**支持 node 版本 4.0+**

**直接使用Node.js开发包步骤如下：**

1.在[官方网站](http://ai.baidu.com/sdk)下载Node.js SDK压缩包。

2.将下载的`aip-node-sdk-version.zip`解压后，复制到工程文件夹中。

3.进入目录，运行npm install安装sdk依赖库

4.把目录当做模块依赖

其中，`version`为版本号，添加完成后，用户就可以在工程中使用百度AI开放平台 Node.js SDK。

**直接使用npm安装依赖：**

```
npm install baidu-aip-sdk
```

# 详细使用文档

参考[百度AI开放平台官方文档](http://ai.baidu.com/docs)

