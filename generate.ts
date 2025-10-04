import ollama from "ollama";
import Anthropic from "@anthropic-ai/sdk";
import yaml from "yaml";
import fs from "node:fs/promises";

/// Helpers

const step: (
  filepath: string,
  generator: () => Promise<string>,
) => Promise<string> = async (filepath, generator) => {
  const file = Bun.file(filepath);
  if (await file.exists()) {
    console.log("- REUSING", filepath);
    return await file.text();
  } else {
    console.log("+ WRITING", filepath);
    const content = await generator();
    await Bun.write(filepath, content);
    return content;
  }
};

async function complete(prompt: string): Promise<string> {
  const anthropic = new Anthropic();

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 4096,
    temperature: 0.7,
    top_k: 50,
  });
  return message.content
    .filter((chunk) => chunk.type === "text")
    .map((chunk) => chunk.text)
    .join("\n");
}

function parse_yaml(source: string) {
  const inner = source.split("\n").slice(1, -1).join("\n");
  return yaml.parse(inner);
}

/// Steps

const humor = await step("./data/humor.md", async () => {
  return await complete(`\
You are linguist, philosopher and computer hacker helpful assistant,
who specializes in the theory of humor, jokes and aphorisms.
Write a detailed and lengthy article about theory of humor, what makes a good joke or a smart aphorism.
What patterns and groups are out there, etc.
Anything that can be useful for generating good jokes using LLMs about programming, computers and IT in general.
Output a detailed markdown article nicely formatted.
`);
});

const categories = parse_yaml(
  await step("./data/categories.md", async () => {
    return await complete(`\
You are linguist, philosopher and computer hacker helpful assistant,
who makes the best jokes and aphorisms about computers, programming and IT in general.
I want you to generate 42 categories of such jokes and output them as array of objects in a YAML markdown codeblock,
where each item of the array is an object with properties:
- title: string
- slug: string
- description: string
`);
  }),
);

for (const category of categories) {
  const folder = `./data/categories/${category.slug}`;
  await fs.mkdir(folder, { recursive: true });

  for (let i = 0; i < 11; i++) {
    console.log(`# Generating ${category.slug}/${i}`);

    const prefix = `./data/categories/${category.slug}/${i.toString().padStart(2, "0")}`;

    const jokes_original_md = await step(`${prefix}.original.md`, async () => {
      return await complete(`\
  You are linguist, philosopher and computer hacker helpful assistant,
  who makes the best jokes and aphorisms about computers, programming and IT in general.

  I want you to generate 21 jokes in the following category:
  \`\`\`json
  ${JSON.stringify(category)}
  \`\`\`

  Output as yaml markdown codeblock, with array of items for each joke, having properties:
  - text: string # the text of the joke it self.
  - explanation: string # the explanation of the joke, this is not a spoiler, but will force LLM to think harder.
  The output should be a top level array of joke items.

  The generated jokes should be funny, not just statement of facts.
  They should be diverse in nature, some in question answer format, some in story format, etc.
  The jokes should start from less funny to most funny.
  Some jokes should be one, sometimes two short sentances (!!! This is important).
  All the jokes should be suitable for work and family.

  Use the following instructions to create good humor jokes.
  \`\`\`\`\`markdown
  ${humor}
  \`\`\`\`\`

  `);
    });

    const jokes_rated_md = await step(`${prefix}.rated.md`, async () => {
      return await complete(`\
    You are linguist, philosopher and computer hacker helpful assistant,
    who makes the best jokes and aphorisms about computers, programming and IT in general.

    I have this jokes in YAML format:
    ${jokes_original_md}

    I want you to output markdown yaml codeblock with exactly the same joke texts and descriptions,
    but add to each joke a new property called "rating" with a number from 1 to 10 (1 bad, 10 excellent).
    Judge the jokes by comparing them to other jokes.
    `);
    });
  }
}

type Item = {
  text: string;
  rating: number;
};

let items: Item[] = [];

for (const category of categories) {
  const folder = `./data/categories/${category.slug}`;

  const files = await fs.readdir(folder);
  for (const file of files) {
    const filepath = `${folder}/${file}`;
    if (!file.endsWith(".rated.md")) continue;
    try {
      const content = await fs.readFile(filepath, "utf8");

      for (const line of content.split("\n")) {
        if (line.startsWith("- text: ")) {
          items.push({
            text: line
              .replace("- text: ", "")
              .replace(/^"/, "")
              .replace(/"$/g, ""),
            rating: -1,
          });
        }
        if (line.startsWith("  rating: ")) {
          items[items.length - 1]!.rating = parseInt(
            line.replace("  rating: ", ""),
          );
        }
      }
    } catch (error: any) {
      console.error(`Error parsing YAML in ${filepath}: ${error.message}`);
    }
  }
}

items = items.filter((item) => item.rating > 7 && item.text.length <= 144);

let script = await fs.readFile("./mootivator.sh", "utf8");

script =
  script
    .split("\n")
    .filter((line) => !line.startsWith("## "))
    .join("\n")
    .trim() +
  "\n" +
  items.map((item) => `## ${item.text}`).join("\n");

await fs.writeFile("./mootivator.sh", script);

console.log(`Embedded ${items.length} jokes`);
