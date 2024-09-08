import * as fs from "node:fs";
import { IconVariant } from "../rocket-icons";

export function start() {
  for (const type in IconVariant) {
    try {
      fs.rmdirSync(`./icons/${type.toLowerCase()}`, { recursive: true });
    } catch (e) {}
  }
  try {
    fs.rmdirSync(`./icons/logo`, { recursive: true });
  } catch (e) {}

  const data = fs.readdirSync("./data", { recursive: true });

  for (const filename of data) {
    if (filename === ".gitkeep") continue;

    fs.rmSync("./data/" + filename);
  }
}
