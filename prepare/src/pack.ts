import * as fs from "node:fs";
import { IconVariant } from "../rocket-icons";

const cap = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function pack() {
  const json = JSON.parse(fs.readFileSync("./package.json").toString());

  if (!json?.contributes?.iconThemes) {
    throw new Error("Ошибка в package.json");
  }

  json.contributes.iconThemes = [];

  for (const variantUpper in IconVariant) {
    for (const type of ["folders", "rectangle"]) {
      const variant = variantUpper.toLowerCase();

      json.contributes.iconThemes.push({
        id: `rocket-icons-${variant}-${type}`,
        label: `Rocket Icons ${cap(variant)} ${cap(type)}`,
        path: `./data/${variant}_${type}.json`,
      });
    }
  }

  fs.writeFileSync("package.json", JSON.stringify(json, null, 2));
}
