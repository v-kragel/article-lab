import { seedFields } from "./seeds";

async function main() {
  console.log("Starting seeding...");
  await seedFields();
}

main()
  .then(() => console.log("Seeding complete"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
