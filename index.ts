import { createChannel, createClient } from "@omkarkirpan/grpc-client";
// import { GreeterService } from "./proto/helloworld_grpc_pb";
import { GreeterService } from "./compiled_proto/proto/helloworld_grpc_pb";
import { HelloRequest, HelloReply } from "./compiled_proto/proto/helloworld_pb";

import { Metadata } from "@grpc/grpc-js";
// import { ClientError } from "@omkarkirpan/grpc-client";
// import { status } from "@grpc/grpc-js";

const main = async () => {
  const channel = createChannel("localhost:50051");

  const client = createClient(GreeterService, channel);

  const metadata = new Metadata();
  metadata.set("key", "omkar");
  metadata.set("xheader", "ok");

  const response: HelloReply = await client.sayHello(
    new HelloRequest().setName("Cubes"),
    {
      metadata,
      onHeader(header: Metadata) {
        // ...
      },
      onTrailer(trailer: Metadata) {
        // ...
      },
    }
  );

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
