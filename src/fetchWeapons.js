import { JSDOM } from "jsdom";

function getWeaponsList(dom) {
  const table = dom.window.document.querySelector("table.sortable tbody");
  return Array.from(table.querySelectorAll("tr"));
}

function getWeaponName(row) {
  return row.children[1].firstChild?.title;
}

function getWeaponRarity(row) {
  return row.children[2].firstChild?.firstChild?.title;
}

function getWeapons(dom) {
  const rows = getWeaponsList(dom);
  const data = rows.reduce((acc, cur) => {
    const name = getWeaponName(cur);
    const rarity = getWeaponRarity(cur);

    if (name === undefined || rarity === undefined) return acc;

    acc[name] = rarity;

    return acc;
  }, {});

  console.log(`Fetched ${Object.keys(data).length} weapons`);

  return data;
}

async function fetchWeapons() {
  const page = await fetch(
    "https://genshin-impact.fandom.com/wiki/Weapon/List"
  ).then((res) => res.arrayBuffer());

  const dom = new JSDOM(page);

  const list = getWeapons(dom);

  const data = { exportDate: new Date().valueOf(), ...list };
  return data;
}

export { fetchWeapons };
