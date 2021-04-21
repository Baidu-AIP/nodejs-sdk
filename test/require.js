'use strict';

let should = require('should');

let services = [
    'contentCensor',
    'imageSearch',
    'imageClassify',
    'face',
    'ocr',
    'nlp',
    'kg',
    'speech'
    ];

const fs = require('fs');
const path = require('path');
const mimeType = require('mime-types');
// const chalk = require('chalk'); // 带色彩的控制台输出

const filePath  = '/Users/wuqiqing/projects/baidu/aip/sdks/node-sdk/test_sample/assets/OCR'

// 读取图片文件转换为 base64 编码，并打印到控制台
function parse(file) {
    let filePath = path.resolve(file); // 原始文件地址
    // let fileName = filePath.split('\\').slice(-1)[0].split('.'); // 提取文件名
    // let fileMimeType = mimeType.lookup(filePath); // 获取文件的 memeType

    // 如果不是图片文件，则退出
    // if (!fileMimeType.toString().includes('image')) {
    //     console.log(chalk.red(`Failed! ${filePath}:\tNot image file!`));
    //     return;
    // }

    // 读取文件数据
    let data = fs.readFileSync(filePath);
    data = Buffer.from(data).toString('base64');

    // // 转换为 data:image/jpeg;base64,***** 格式的字符串
    // let base64 = 'data:' + fileMimeType + ';base64,' + data;
    //
    // // 创建输出目录
    // let outPath = path.resolve('./base64/');
    // let outFileName = `${fileName.join('-')}.txt`;
    // let outFile = path.join(outPath, outFileName);
    // if (fs.existsSync(outPath)) {
    //     saveData(base64, outFile, filePath, outFileName);
    // } else {
    //     mkdirp(outPath, () => {
    //         saveData(base64, outFile, filePath, outFileName);
    //     });
    // }
    return data;
}

it('should not throw error when require all modules', function() {
    should.doesNotThrow(function () {
        let exp = require('../');
    });
});

describe('should all export is valid', function() {
    should.doesNotThrow(function () {
        let exp = require('../');
        // services.forEach(function(serviceNm) {
        //     // each service should be a constructor
        //     it("service:" + serviceNm, function () {
        //         exp[serviceNm].should.instanceof(Function);
        //     })
        // });
        // it("HttpClient ", function () {
        //     // extra exports HttpClient is Function
        //     exp.HttpClient.should.instanceof(Function);
        // });


        it(' imageClassify ', (done) => {
            let tmp = new exp.imageClassify("", "d18289e60b6a44c281f8985d5106586e", "0f15a705e2ff4400a3757b4acd88114d");
            // let stat = fs.statSync(filePath+'/webimageLoc.png');
            // let data = parse(filePath+'/webimageLoc.png')
            let url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595939748737&di=05d4226499eb67595c713035e03675fc&imgtype=0&src=http%3A%2F%2Fethn.cssn.cn%2Fmzx%2Fmzxtpxw%2F201603%2FW020160329761657988474.jpg";
            let element = ['animal'];
            let p = tmp.combinationByImageUrl(url, element).then((res) => {
                console.log(res);
                // done();
            }).catch((err) => {
                console.log(err);
                // done(err);
            });
            // console.log(1);
            // console.log(2);
            // for(let i = 0;i < 100000;i++){
            //     console.log(i);
            // }
        });

        // it(' ocr docAnalysis ', (done) => {
        //     let tmp = new exp.ocr("", "d18289e60b6a44c281f8985d5106586e", "0f15a705e2ff4400a3757b4acd88114d");
        //     let stat = fs.statSync(filePath+'/webimageLoc.png');
        //     let data = parse(filePath + '/docAnalysis.png')
        //     let p = tmp.docAnalysis(data).then((res) => {
        //         console.log("docAnalysis: ");
        //         console.log(res);
        //         done();
        //     }).catch((err) => {
        //         console.log(err);
        //         done(err);
        //     });
        // });
        //
        // function A () {
        //
        // }
        // A.hello = 2;
        //
        // let a = new A();
        // let b = {};
        // let c = Object();
        // let d = 1;
        //
        // d.toFixed();
        // let e = 'hello word';
        // e.toLocaleUpperCase();
        //
        // it(' ocr meter ', (done) => {
        //     let tmp = new exp.ocr("", "d18289e60b6a44c281f8985d5106586e", "0f15a705e2ff4400a3757b4acd88114d");
        //     // let stat = fs.statSync(filePath+'/webimageLoc.png');
        //     let data = parse(filePath + '/meter.png')
        //     let p = tmp.meter(data).then((res) => {
        //         console.log(res);
        //         done();
        //     }).catch((err) => {
        //         console.log(err);
        //         done(err);
        //     });
        // });
        //
        // // it(' ocr docAnalysis ', function () {
        // //     let tmp = new exp.ocr("", "d18289e60b6a44c281f8985d5106586e", "0f15a705e2ff4400a3757b4acd88114d");
        // //     console.log(tmp.docAnalysis(''))
        // // });
        // // it(' ocr webimageLoc ', function () {
        // //     let tmp = new exp.ocr("", "d18289e60b6a44c281f8985d5106586e", "0f15a705e2ff4400a3757b4acd88114d");
        // //     console.log(tmp.meter(''))
        // // });

    });
});
