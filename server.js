var messages = require("./compiled_proto/proto/helloworld_pb");
var services = require("./compiled_proto/proto/helloworld_grpc_pb");

var grpc = require("@grpc/grpc-js");

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  // console.log(call);
  console.log(call.metadata.get("key"));
  console.log(call.metadata.get("xheader"));
  if (call.request.getName().length >= 10) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Length of `Name` cannot be more than 10 characters",
    });
  }
  var reply = new messages.HelloReply();
  reply.setMessage("Hello " + call.request.getName());
  callback(null, reply);
}

// function sayHelloStrict(call, callback) {
//   if (call.request.Name.length >= 10) {
//     return callback({
//       code: grpc.status.INVALID_ARGUMENT,
//       message: "Length of `Name` cannot be more than 10 characters",
//     });
//   }
//   callback(null, { Result: "Hey, " + call.request.Name + "!" });
// }

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(services.GreeterService, {
    sayHello: sayHello,
  });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
