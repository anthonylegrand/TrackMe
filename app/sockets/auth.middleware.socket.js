module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    if (!token || !token.startsWith("Bearer "))
      return next(new Error("Token missing. Authentication required."));

    const decoded = JWT.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_TOKEN
    );
    if (!decoded)
      return next(new Error("Token missing. Authentication required."));

    socket.user = decoded;
    next();
  });
};
