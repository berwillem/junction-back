function handleSocketConnections(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Handle events such as quiz answers, updates, etc.
    socket.on("quiz-answer", (data) => {
      // Handle quiz answer logic here
      // You can emit events or perform actions based on the answers
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
      // Handle disconnect logic here
    });
  });
}

module.exports = { handleSocketConnections };
