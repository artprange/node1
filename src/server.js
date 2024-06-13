import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';



//Query Parameters: URL stateful => Filtros, paginação, não obrigatórios
//Route Parameters: Identificação de recurso
//Request Body: Envio de informações ed um formulário (HTTPs)



const server = http.createServer(async (req, res) => {
    const { method, url} = req

    await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

    return res.writeHead(404).end("Something is broken :( ")
});

server.listen(3333);