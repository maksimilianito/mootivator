import data from "./data";

const phrases = Object.values(data).flat();

export default {
  async fetch(): Promise<Response> {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)].replace(
      /\.$/,
      "",
    );
    const dashes = phrase.replace(/./g, "-") + "--";

    const text = `\
 ${dashes}
( ${phrase} )
 ${dashes}
        \\   \\__/
         \\  (oO)\\_______
          \\ (__)\\       )\\
           \\_ U ||----W | *
               _||    _||
`;

    return new Response(text);
  },
} satisfies ExportedHandler<Env>;
