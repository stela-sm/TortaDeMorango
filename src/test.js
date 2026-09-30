const http = require("http");

const PORT = process.env.PORT || 3000;

console.log("Testando aplicação...");
console.log(`Porta: ${PORT}`);

const req = http.get(`http://localhost:${PORT}`, (res) => {
  console.log(`Status HTTP: ${res.statusCode}`);

  if (res.statusCode >= 200 && res.statusCode < 400) {
    console.log("Aplicação está respondendo corretamente!");
    process.exit(0);
  } else {
    console.error("Aplicação respondeu com erro.");
    process.exit(1);
  }
});

req.on("error", (err) => {
  console.error("Não foi possível conectar à aplicação.");
  console.error(`   ${err.message}`);
  process.exit(1);
});

req.setTimeout(5000, () => {
  console.error("Timeout: aplicação não respondeu em 5 segundos.");
  req.destroy();
  process.exit(1);
});