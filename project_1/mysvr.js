const http = require('http');
const fs = require('fs');
const jade = require('jade');

http.createServer((req, res)=>{
    if(req.method=='GET'){
        console.log("Method : GET");
        if(req.url == '/'){
            fs.readFile('reg.jade', 'utf8', (err, data)=>{
                console.log("reg.jade : read ....");
               if(err){
                   /*
                   *    회원가입 파일을 읽기 실패한 경우 다음을 진행합니다.
                   */
                    console.log("reg.jade : ERROR");
                    res.writeHead(500, {'Content-Type':'text/html'});
                    res.write("<meta charset=utf8>");
                    res.write("<div align=center><h1>Error</h1><hr>");
                    res.end("<h5>reg.jade Read Error : " + err + "</h5></div>");
                }else{
                    /*
                   *    회원가입 파일 로드 완성 시 클라이언트에 응답해줍니다.
                   */
                    console.log("reg.jade : ON");
                    const fn = jade.compile(data);
                    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
                    res.end( fn() );                  
                }
            });
        }else if(req.url == '/login'){
            fs.readFile('login.jade', 'utf8', (err, data)=>{
                console.log("login.jade : read ....");
               if(err){
                   /*
                   *    로그인 파일을 읽기 실패한 경우 다음을 진행합니다.
                   */
                    console.log("login.jade : ERROR");
                    res.writeHead(500, {'Content-Type':'text/html'});
                    res.write("<meta charset=utf8>");
                    res.write("<div align=center><h1>Error</h1><hr>");
                    res.end("<h5>login.jade Read Error " + err + "</h5></div>");
                }else{
                    /*
                   *    로그인 파일 로드 완성 시 클라이언트에 응답해줍니다.
                   */
                    console.log("login.jade : ON");
                    const fn = jade.compile(data);
                    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
                    res.end( fn() );                  
                }
            });
        }else{
            /*
            *   URL 요청이 서버 응답 범위에 넘어 섰을 경우 404
            */
            console.log("reg.jade : ERROR");
            res.writeHead(404, {'Content-Type':'text/html'});
            res.write("<meta charset=utf8>");
            res.write("<div align=center><h1>Error</h1><hr>");
            res.end("<h5>응답 범위를 넘어섰습니다. URL을 확인해주세요.</h5></div>");
        }
    }else if(req.method=='POST'){
        console.log("Method : POST");
            if(req.url == '/'){
                /*
                *   회원가입 페이지에서 POST 요청이 왔을 경우 다음과 같이 진행한다.
                *   - error 시 콘솔에 에러 내용 출력
                *   - 정상 시 body 변수에 데이터를 저장한다.
                *       - id, name, passwd, repasswd 를 파싱한다.
                *       - input 값을 모두 받지 않거나 passwd와 repasswd가 같지 않을 경우 각각 에러 페이지로 이동한다.
                *       - 조건 완료 시, Json 형식으로 user.data 파일에 저장한다.
                *           - 기존의 데이터 존재 시에 Json 파일을 로드하여 Json 파일에 삽입 후에 다시 저장한다.
                *   - 위의 모든 조건 완료 시에 localhost:port/login 으로 페이지를 이동한다. 
                *  
                *   단, request.on 을 통해 data 입력 받을 때, 한글이 깨진다. 이를 해결하기 위해 'urlencode' 모듈 
                *       또는 'node-iconv' 모듈을 이용하여 해결하는 방법이 있으나, 이번 과제에는 조건이 없기에 
                *       반영하지 않는다.
                */
                let body = [];
                req.on('error', (err) => {
                  console.error(err);
                }).on('data', (data) => {
                  body.push(data);
                }).on('end', () => {
                  body = Buffer.concat(body).toString();
                    let info = body.split('&');
                    let name = info[0].split('=');
                    let id = info[1].split('=');
                    let passwd = info[2].split('=');
                    let repasswd = info[3].split('=');
                    if((name[1] == '' || name[1] == undefined )||(id[1]=='' || id[1] == undefined)||
                    (passwd[1]==''|| passwd[1] == undefined)||(repasswd[1]==''|| repasswd[1]==undefined)){
                        console.log("login : Fail!");
                        res.writeHead(500, {'Content-Type':'text/html'});
                        res.write("<meta charset=utf8>");
                        res.write("<div align=center><h1>회원가입 실패</h1><hr>");
                        res.end("<h5>모두 작성하셔야합니다.</h5></div>");
                    }else if(passwd[1]==repasswd[1]){
                        console.log("login : Success!");
                        try{
                            data = fs.readFileSync('user.data', 'utf8');
                            console.log("Load data : Complete");
                            let jsonArray = new Array(); 
                            let json = new Object();

                            json.id = id[1];
                            json.passwd = passwd[1];
                            json.name = name[1].replace("+", " ");

                            if((data == null) || (data=='')){
                                jsonArray.push(json);
                                fs.writeFileSync('user.data', JSON.stringify(jsonArray), 'utf8');
                                console.log("Save data : complete");
        
                                console.log("Redirection : Location");
                                res.writeHead(302, {'Location':'http://localhost:65003/login'});
                                res.end(); 
                            }else{
                                let userJson = JSON.parse(data);
                                userJson.push(json);
                                
                                fs.writeFileSync('user.data', JSON.stringify(userJson), 'utf8');
                                console.log("Save data : complete");
        
                                console.log("Redirection : Location");
                                res.writeHead(302, {'Location':'http://localhost:65003/login'});
                                res.end(); 
                            }
                        }catch(err){
                            console.log("Load data : ERROR");
                            res.writeHead(500, {'Content-Type':'text/html'});
                            res.write("<meta charset=utf8>");
                            res.write("<div align=center><h1>Error</h1><hr>");
                            res.end("<h5>Load data Error " + err + "</h5></div>");
                        }
                        
                    }else{
                        console.log("login : Fail!");
                        res.writeHead(500, {'Content-Type':'text/html'});
                        res.write("<meta charset=utf8>");
                        res.write("<div align=center><h1>회원가입 실패</h1><hr>");
                        res.end("<h5>다시 가입해주세요.</h5></div>");
                    }
                });
                
            }else if(req.url == '/login'){
                /*
                *   로그인 페이지에서 POST 요청이 왔을 경우 다음과 같이 진행한다.
                *   - error 시 콘솔에 에러 내용 출력
                *   - 정상 시 body 변수에 데이터를 저장한다.
                *       - id, passwd 를 파싱한다.
                *       - user.data 파일을 로드한다.
                *       - 기존의 데이터와 비교하여 id와 passwd 일치 시에 'welcome.jade' 를 로드한다.
                *           - jade 로드 시에 id, passwd에 일치하는 유저 이름을 {key : uname, Value  name}을 paramatar로 보낸다.
                */
                let data;
                try{
                    data = fs.readFileSync('user.data', 'utf8');
                    console.log("Load data : Complete");
                }catch(err){
                    console.log("Load data : ERROR");
                    res.writeHead(500, {'Content-Type':'text/html'});
                    res.write("<meta charset=utf8>");
                    res.write("<div align=center><h1>Error</h1><hr>");
                    res.end("<h5>Load data Error " + err + "</h5></div>");
                }
                let body = [];
                req.on('error', (err) => {
                    console.error(err);
                  }).on('data', (data) => {
                    body.push(data);
                  }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    var name = 'None';

                    let info = body.split('&');
                    let id = info[0].replace('id=', '');
                    let passwd = info[1].replace('passwd=', '');

                    let userJson = JSON.parse(data);

                    for(var index in userJson){
                        if((userJson[index].id == id) && (userJson[index].passwd == passwd)){
                            name = userJson[index].name;
                        }
                    }

                    if(name == 'None'){
                        console.log("login.jade : ERROR");
                        res.writeHead(500, {'Content-Type':'text/html'});
                        res.write("<meta charset=utf8>");
                        res.write("<div align=center><h1>로그인실패</h1><hr>");
                        res.end("<h5>회원가입 하셨나요?<br>아이디/비번이 틀렸어요.</h5></div>");
                    }else{
                        /*
                        *   id, passwd 가 일치하는 경우 'welcome.jade' 를 읽어들인 이후, 
                        *   유저 이름을 {key : uname, Value  name} 으로 정보를 클라이언트로 보낸다.
                        *   
                        */
                        fs.readFile('welcome.jade', 'utf8', (err, data)=>{
                            console.log("welcome.jade : read ....");
                           if(err){
                                console.log("welcome.jade : ERROR");
                                res.writeHead(500, {'Content-Type':'text/html'});
                                res.write("<meta charset=utf8>");
                                res.write("<div align=center><h1>Error</h1><hr>");
                                res.end("<h5>login.jade Read Error " + err + "</h5></div>");
                            }else{
                                console.log("welcome.jade : ON");
                                const fn = jade.compile(data);
                                res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8;'});
                                res.end( fn({uname:name}) );
                            }
                        });
                    }
                  });
            }else{
               /*
                *   URL 요청이 서버 응답 범위에 넘어 섰을 경우 404
                */
                console.log("reg.jade : ERROR");
                res.writeHead(404, {'Content-Type':'text/html'});
                res.write("<meta charset=utf8>");
                res.write("<div align=center><h1>Error</h1><hr>");
                res.end("<h5>응답 범위를 넘어섰습니다. URL을 확인해주세요.</h5></div>");
            }
        }else{
        console.log("Server Warning : Another Method");
    }
}).listen(65003, ()=>{
    console.log("Server Running : 65003");
});