var fs = require('fs');
var cssSpriteSmith = require('../lib/css-spritesmith');

// use media query
var timeStamp = +new Date();
console.log('Start create sprite, with media query');
console.log(process.cwd());

cssSpriteSmith({
    cssfile: 'css/icon.css',
    //服务器根目录，用来定位绝对路径的图片引用      
    staticPath: process.cwd(),
    // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
    imagepath: 'slice/',
    // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
    spritedest: 'publish/images/',
    // 替换后的背景路径，默认 ../images/
    spritepath: '../images/',
    // 默认雪碧图名字会是所在css的名字+nameExtend，例如a.css, nameExtend:'-sprite' ——> a-sprite.png
    nameExtend: '-sprite',
    // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
    padding: 2,
    // 是否使用 image-set 作为2x图片实现，默认不使用
    useimageset: false,
    // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
    newsprite: false,
    // 给雪碧图追加时间戳，默认不追加
    spritestamp: true,
    // 在CSS文件末尾追加时间戳，默认不追加
    cssstamp: true,
    // 默认使用二叉树最优排列算法
    algorithm: 'binary-tree',
    // 默认使用`pixelsmith`图像处理引擎
    engine: 'pixelsmith'
}, function(err, data) {
    // write css file
    var cssFile = 'publish/css/icon.sprite.css';
    fs.writeFileSync(cssFile, data.cssData);
    console.log(cssFile, 'write success!');

    // sprite image
    // var spriteFile = 'publish/images/icon.png';
    console.log(data);
    var spriteFile = data.spriteData.imagePath;
    fs.writeFileSync(spriteFile, data.spriteData.image, {
        encoding: 'binary'
    });
    console.log(spriteFile, 'write success!');

    // retina sprite image
    // var retinaSrpiteFile = 'publish/images/icon@2x.png';
    var retinaSrpiteFile = data.retinaSpriteData.imagePath;
    fs.writeFileSync(retinaSrpiteFile, data.retinaSpriteData.image, {
        encoding: 'binary'
    });
    console.log(retinaSrpiteFile, 'write success!');

    // timeStamp
    console.log('Create sprite success, with media query');
    console.log('Elapsed ', (+new Date()) - timeStamp, 'ms\n');
});

// use image-set
var imageSetTimeStamp = +new Date();
console.log('Start create sprite, with image-set');

cssSpriteSmith({
    cssfile: 'css/icon.css',
    imagepath: 'slice/',
    padding: 20,
    useimageset: true,
    spritestamp: true,
    imagepath_map: ['/w/grunt-css-sprite/test/', '../'],
    /*
    imagepath_map: function(uri) {
        return String(uri).replace('/w/grunt-css-sprite/test/', '../');
    },
    */
    spritepath: '../../images/imageset/',
    // 默认雪碧图名字会是所在css的名字+nameExtend，例如a.css, nameExtend:'-sprite' ——> a-sprite.png
    nameExtend: '-sprite',
    spritedest: 'publish/images/imageset/',
    //,spritepath: '/w/grunt-css-sprite/test/publish/images/imageset/'
}, function(err, data) {
    if(data.cssData === null) {
        console.error('Not found slice icon');
        return;
    }

    // write css file
    var cssFile = 'publish/css/imageset/icon.imageset.css';
    fs.writeFileSync(cssFile, data.cssData);
    console.log(cssFile, 'write success!');

    // sprite image
    // var spriteFile = 'publish/images/imageset/icon.png';
    var spriteFile = data.spriteData.imagePath;
    fs.writeFileSync(spriteFile, data.spriteData.image, {
        encoding: 'binary'
    });
    console.log(spriteFile, 'write success!');

    // retina sprite image
    // var retinaSrpiteFile = 'publish/images/imageset/icon@2x.png';
    var retinaSrpiteFile = data.retinaSpriteData.imagePath;
    fs.writeFileSync(retinaSrpiteFile, data.retinaSpriteData.image, {
        encoding: 'binary'
    });
    console.log(retinaSrpiteFile, 'write success!');

    // timeStamp
    console.log('Create sprite success, with image-set');
    console.log('Elapsed ', (+new Date()) - imageSetTimeStamp, 'ms\n');
});
