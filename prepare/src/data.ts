import { common, ext, files, folders, IconType, IconVariant, rocket } from "../rocket-icons";
import * as fs from "node:fs";

interface DATA {
  file?: string;
  folder?: string;
  fileNames?: { [key: string]: string };
  folderNames?: { [key: string]: string };
  fileExtensions?: { [key: string]: string };
  iconDefinitions?: { [key: string]: { iconPath: string } };
}

export function data() {
  for (const variantUpper in IconVariant) {
    for (const type of ["folders", "rectangle"]) {
      const variant = variantUpper.toLowerCase();

      const json: DATA = {};

      json.iconDefinitions = {};
      json.folderNames = {};
      json.fileNames = {};
      json.fileExtensions = {};

      for (const icon of files) {
        json.iconDefinitions[`files_${icon.icon}`] = {
          iconPath: `../icons/${variant}/files/${icon.icon}.svg`,
        };
        for (const filename of icon.filenames) {
          json.fileNames[filename] = `files_${icon.icon}`;
        }
      }

      for (const icon of ext) {
        json.iconDefinitions[`ext_${icon.icon}`] = {
          iconPath: `../icons/${variant}/ext/${icon.icon}.svg`,
        };
        for (const filename of icon.filenames) {
          json.fileExtensions[filename.slice(1)] = `ext_${icon.icon}`;
        }
      }

      for (const icon of folders) {
        json.iconDefinitions[`folders_${icon.icon}`] = {
          iconPath: `../icons/${variant}/${type}/${icon.icon}.svg`,
        };
        for (const filename of icon.filenames) {
          json.folderNames[filename] = `folders_${icon.icon}`;
        }
      }

      for (const icon of common) {
        json.iconDefinitions[`common_${icon.icon}`] = {
          iconPath: `../icons/${variant}/common/${icon.icon}.svg`,
        };
      }

      json.file = "common_file";

      if (type === "folders") {
        json.folder = "common_folder";
      } else {
        json.folder = "common_rectangle";
      }

      fs.writeFileSync(`./data/${variant}_${type}.json`, JSON.stringify(json, null, 2));
    }
  }
}
