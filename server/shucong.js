var express = require('express'),
	router = express.Router(),
	request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	path = require('path');

const dolphin = 'http://m.shucong.com/read/';
// var dolphin = 'http://cn.dolphin.com/blog';
const filePath = path.join(__dirname, '../tpl/tpl.text');

// map api->fn
const map = {
	mes: true,
	article: 'dataParsingRulesContent'
};

// free list api
router.get('/free', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	// res.json({name: '测试接口'});
	var getQuery = req.query;
	var url = 'http://m.shucong.com/books/free/lists?page=1';
	console.log(getQuery, url);
	request({
		url: url,
		method: "GET",
		json: true,
		headers: {
			'user-Agent':'nodejs'
		}
	}, function(error, response, body) {
		console.log(error);
		if (!error && response.statusCode == 200) {
			res.json(API({ list: body }));
		}
	});
});

// free list chapter api
router.get('/chapter', function(req, res, next) {
	let url = dolphin + req.query.bookId;
	dataRequest(url, res, 'chapter');
});

// free list chapter content api
router.get('/article', function(req, res, next) {
	console.log(req.query);
	let url = dolphin + req.query.bookId + '/' + req.query.articleId + '.html';
	dataRequest(url, res, 'article');
});

/**
 * 统一返回JSON格式信息
 * @param  {Number} code [description]
 * @param  {String} msg  [description]
 * @param  {[type]} data [description]
 */
function API(data = null, code = 100, msg = 'ok') {
	return {
		code,
		msg,
		data
	}
}

/**
 * Request promise 封装
 */
function http(dataUrl) {
	return new Promise(function(resolve, reject) {
		request({
	        url : dataUrl,
	        method : 'GET'
	    },function(err, red, body) {
	    	
	        if(err){
	        	reject(new Error('[ERROR]Collection' + err));    
	            return;
	        };
	        resolve(body);
	    })
	});
}

/**
 * 数据解析入口
 */
function dataRequest(dataUrl, res, type) {
	console.log(dataUrl);
	http(dataUrl).then(function(body) {
		// console.log(body);
		if (type === 'chapter') {
			dataParsingRules(body, res);
		} else if(type === 'article') {
			dataParsingRulesContent(body, res);
		}
	});
}

/**
 * 添加解析规则
 */
function dataPraseDolphin(body) {
    
    var $ = cheerio.load(body);

    var atricles = $('#content').children('.status-publish');

    for(var i = 0;i < atricles.length;i++){
        var article = atricles[i];

        var $a = $(article).find('.post-title .entry-title a');
        var $p = $(article).find('.post-content p');

        var $aVal = $($a).text();
        var $pVal = $($p).text();

        var localData;

        if($p){
            localData = '--------------'+ (i+1) +' Chapter------------------' + '\n'
                      + '标题：' + $aVal + '\n'
                      + '简介：' + $pVal + '\n'
                      + '时间：' + new  Date + '\n'
                      + '---------------------------------------------------' + '\n';
            console.log(localData);
            writeToLocal(localData,i);
        }


    }
}

/**
 * 将解析的数据 
 * 写入本地文件进行备份
 */
function writeToLocal(dataPage,fj){
    console.log('-------------准备写入文件------------------------')
    //同步写入文件，一般使用异步好
    fs.appendFileSync(filePath, dataPage);
}

/**
 * 解析规则-免费列表页
 * http://m.shucong.com/read/11708
 */
function dataParsingRules(body, res) {
	let $ = cheerio.load(body),
		list = $('.book-dir').children('a'), 
		array = [];

	for (let i = 0;i < list.length; i++) {
		let temp = {}, el = list[i];
		temp.name = $(el).find('.name').text();
		temp.articleId = $(el).attr('href').match(/\d+\.html/g)[0].split('.')[0];
		array.push(temp);
	}
	res.json(API({ list: array }));
}

/**
 * cheeio 抓取时，内部编码问题
 * @param  {[String]} str 
 */
function decode(str) {
    return unescape(str.replace(/&#x/g,'%u').replace(/;/g,'')) 
}

/**
 * 解析规则-免费列表页
 * http://m.shucong.com/read/11708/3705179.html
 */
function dataParsingRulesContent(body, res) {
	let $ = cheerio.load(body),
		title = $('.chapter-head').text();
		content = decode($('#contentText').html());
	// return
	res.json(API({title, content}));
}

module.exports = router;