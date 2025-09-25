import { JSDOM } from "jsdom";

function getCharName(row) {
  return row.children[1].dataset.name;
}

function getCharRarity(row) {
  return row.children[2].firstChild.firstChild?.title;
}

function getPlayableCharsList(dom) {
  const table = dom.window.document.querySelector("table.sortable tbody");
  return Array.from(table.querySelectorAll("tr"));
}

function getChars(dom) {
  const rows = getPlayableCharsList(dom);
  const data = rows.reduce((acc, cur) => {
    const name = getCharName(cur);
    const rarity = getCharRarity(cur);

    // There are some undefined rows for some reason
    if (name === undefined || rarity === undefined) return acc;

    acc[name] = rarity;
    return acc;
  }, {});


  return data;
}

async function fetchCharacters() {
  const page = await fetch(
    "https://genshin-impact.fandom.com/wiki/Character/List"
  ).then((res) => res.arrayBuffer());

  const dom = new JSDOM(page);

  const list = getChars(dom);
  console.log(`Fetched ${Object.keys(data).length} characters`);

  return list;
}

export { fetchCharacters };
