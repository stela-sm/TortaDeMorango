const http = require("http");
const { server } = require("./app");

const PORT = process.env.PORT || 3000;

console.log("Testando aplicação...");
console.log(`Porta: ${PORT}`);

function cleanupAndExit(code) {
  if (server && server.close) {
    server.close(() => {
      process.exit(code);
    });
  } else {
    process.exit(code);
  }
}

setTimeout(() => {
  const req = http.get(`http://localhost:${PORT}`, (res) => {
    console.log(`Status HTTP: ${res.statusCode}`);

    if (res.statusCode >= 200 && res.statusCode < 400) {
      console.log("Aplicação está respondendo corretamente!");
      cleanupAndExit(0);
    } else {
      console.error("Aplicação respondeu com erro.");
      cleanupAndExit(1);
    }
  });

  req.on("error", (err) => {
    console.error("Não foi possível conectar à aplicação.");
    console.error(`   ${err.message}`);
    cleanupAndExit(1);
  });

  req.setTimeout(5000, () => {
    console.error("Timeout: aplicação não respondeu em 5 segundos.");
    req.destroy();
    cleanupAndExit(1);
  });
}, 500);