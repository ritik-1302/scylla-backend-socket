
const chatRouter={

}


const chatHandler=async(connectionId,body)=>{
    const requestKey=body.requestName;
    const handler=chatRouter[requestKey]||chatRouter['default'];

    await handler(connectionId,body);

}


module.exports={
    chatHandler
}

