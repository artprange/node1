import http from 'node:http'
import { Transform } from 'node:stream';

class NegativeNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)
        
        callback(null, Buffer.from(String(transformed)))
    }
}


//req is a readable stream
//res is a writable stream

const server = http.createServer(async (req, res) => {
    const buffers =[] // buffers are the 'pieces' of the data

    for await (const chunk of req){
        buffers.push(chunk)
    }
// gathering all the chunks to make a 'whole' 
    const fullStreamContent = Buffer.concat(buffers).toString() 
    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    
})

server.listen(3334)