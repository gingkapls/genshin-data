import { access, constants, readFile} from "fs/promises";
import { fetchCharacters} from "./fetchCharacters.js";
import { fetchWeapons } from "./fetchWeapons.js";

async function getData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response;
  } catch (e) {
    console.error("There was an error", e);
  }
}

async function canAccess(filePath) {
  try {
    await access("page.html", constants.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}

async function getFileData(filePath) {
  if (!canAccess(filePath)) throw new Error("Couldn't get file" + filePath);

  const file = await readFile(filePath, { encoding: "utf-8" });
  return file;
}

async function main() {
  const [weps, chars] = await Promise.all([fetchWeapons(), fetchCharacters()]);
  
  console.log(JSON.stringify(weps, null, 2))
  console.log(JSON.stringify(chars, null, 2))

}

main();
