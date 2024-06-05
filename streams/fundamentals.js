import { Readable, Writable, Transform } from 'node:stream'

class OneToOneHundredStream extends Readable{
    index = 1
    
    _read(){
        const i =this.index++

      setTimeout(() => {  if (i > 100){
        this.push(null)
    } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
    }}, 1000)
    }
}

class NegativeNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        // o primiero parametro é o erro, neste caso NÃO TEREMOS ERRO, 
        //mas é recomendado fazer uma tratativa de erros
        callback(null, Buffer.from(String(transformed)))
    }
}


class MultiplyByTenStream extends Writable{
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString()) *10 )
        callback()
    }
}






//here it's trying to read the stream as it is writing on the terminal
// new OneToHundredStream().pipe(process.stdout)


new OneToHundredStream()
.pipe(new NegativeNumberStream())
.pipe(new MultiplyByTenStream())


