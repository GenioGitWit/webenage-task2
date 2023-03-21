import Fastify from 'fastify';
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import root from './routes/index.js';
import nunjucks from 'nunjucks';
import view from '@fastify/view';
import Autoload from '@fastify/autoload';
// import autoload from './plugins/autoload.js';


const fastify = Fastify({
  logger: true
});

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// fastify.register(Autoload, {
//   dir: join(__dirname, 'plugins')
// });

fastify.register(view, {
  engine:{
    nunjucks:nunjucks
  },
  templates:["src/templates"],
});

// nunjucks.configure('src/templates', { autoescape:true })


fastify.get('/', async function(req, res) {
    const users = await fetch('https://jsonplaceholder.typicode.com/users', {
      method:'GET',
      mode:'same-origin',
      headers:{
        "Content-Type": "application/json",
      },
      cache:'only-if-cached'
    });
    
    const parsedData = await users.json();
    // console.log('data : ', parsedData);

    return res.view('layout.njk', { data:parsedData });
});


const start = async () => {
    try {
      await fastify.listen({ port: 4000 });
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start();