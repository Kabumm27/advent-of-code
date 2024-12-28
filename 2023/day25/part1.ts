const text = Deno.readTextFileSync("input_sample.txt");
const lines = text.trim().split("\n").map((line) => line.trim());

const graph: { [key: string]: string[] } = {};
for (const line of lines) {
  const [source, destinationsString] = line.split(":");
  const destinations = destinationsString.trim().split(" ");
  if (source in graph) {
    graph[source].push(...destinations);
  } else {
    graph[source] = destinations;
  }

  for (const dest of destinations) {
    if (dest in graph) {
      graph[dest].push(source);
    } else {
      graph[dest] = [source];
    }
  }
}

console.log(graph);
