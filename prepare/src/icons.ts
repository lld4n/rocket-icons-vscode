import * as fs from "node:fs";

export function icons() {
  const icons = fs.readdirSync("./prepare/rocket-icons/icons", {
    recursive: true,
  });

  for (const path of icons) {
    if (path.includes(".svg")) {
      const data = fs.readFileSync("./prepare/rocket-icons/icons/" + path, {
        encoding: "utf-8",
      });
      fs.writeFileSync("./icons/" + path, data, {
        encoding: "utf-8",
      });
    } else {
      fs.mkdirSync("./icons/" + path);
    }
  }
}
