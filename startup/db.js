const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();
}

module.exports = function () {
  main()
    .then(() => console.log("Connected to the database..."))
    .catch((e) => {
      console.log(e.message, e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
