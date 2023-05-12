const fs =require("fs");

function handlerRequest(request,response){
    if(request.url === '/'){
        response.write("<html>");
        response.write("<head><title>Enter your message</title></head>");
        response.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button>submit</button></form></body>')
        response.write("</html>");
        return response.end();
    }
    if(request.url === "/message" && request.method === "POST"){
        const body = [];
        request.on("data",(chunk)=>{
            body.push(chunk);
        });
        request.on("end",()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt",message,err=>{
                // want to set message in new file and redirect to /
                response.statusCode = 302;
                response.setHeader('Location','/');
                return response.end()
            });
        });
        
    }
    response.setHeader('Content-Type','text/html');
    response.write("welcome in programming");
    response.end();
    
};
module.exports = handlerRequest;