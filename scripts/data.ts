import fs from "fs";

type Phrases = {
  [key: string]: string[];
};

const phrases: Phrases = fs
  .readdirSync("./data")
  .reduce((acc: Phrases, file: string) => {
    if (file.endsWith(".txt")) {
      const key = file.slice(0, -4);
      const value = fs
        .readFileSync(`./data/${file}`, "utf8")
        .trim()
        .split("\n");
      acc[key] = value;
    }
    return acc;
  }, {});

fs.writeFileSync(
  "./src/data.ts",
  "export default " + JSON.stringify(phrases, null, 2) + "\n",
);
