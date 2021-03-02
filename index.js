"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_client_1 = require("@omkarkirpan/grpc-client");
// import { GreeterService } from "./proto/helloworld_grpc_pb";
const helloworld_grpc_pb_1 = require("./compiled_proto/proto/helloworld_grpc_pb");
const helloworld_pb_1 = require("./compiled_proto/proto/helloworld_pb");
const grpc_js_1 = require("@grpc/grpc-js");
// import { ClientError } from "@omkarkirpan/grpc-client";
// import { status } from "@grpc/grpc-js";
const main = async () => {
    const channel = grpc_client_1.createChannel("localhost:50051");
    const client = grpc_client_1.createClient(helloworld_grpc_pb_1.GreeterService, channel);
    const metadata = new grpc_js_1.Metadata();
    metadata.set("key", "omkar");
    metadata.set("xheader", "ok");
    const response = await client.sayHello(new helloworld_pb_1.HelloRequest().setName("Cubes"), {
        metadata,
        onHeader(header) {
            // ...
        },
        onTrailer(trailer) {
            // ...
        },
    });
    // let response: HelloReply | null;
    // try {
    //   response = await client.sayHello(new HelloRequest().setName("sakura"));
    // } catch (error: unknown) {
    //   if (error instanceof ClientError && error.code == status.NOT_FOUND) {
    //     response = null;
    //   } else {
    //     throw error;
    //   }
    // }
    console.log(response);
};
main();
//# sourceMappingURL=index.js.map