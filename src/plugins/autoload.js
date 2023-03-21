import fastifyAutoload from "@fastify/autoload";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function(fastify, opts) {
        fastify.register(fastifyAutoload), {
            path: 'templates'
        };
    }
);