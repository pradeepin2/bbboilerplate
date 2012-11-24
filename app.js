var http = require("http"),
		path = require("path"),
		fs = require("fs");
		
http.createServer(function(req,res){
	//look for a file name in the url, default to index.html
	var filename = path.basename(req.url)  || "index.html",
			ext = path.extname(filename),
			localPath = __dirname+"/client/";
			//basepath = __dirname
			
	if(ext == ".html"){
		localPath += filename;
		path.exists(localPath,function(exists){
			if(exists){
				getFile(localPath,res);
			}else{
				res.writeHead(404);
				res.end();
			}
		});
	}
	
function getFile(localPath,res){
	fs.readFile(localPath,function(err,contents){
		if(!err){
			res.end(contents);
		}else{
			res.writeHead(500);
			res.end();
		}
	});
}
	
}).listen(8000,"127.0.0.1");