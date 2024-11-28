import { useState } from "react";
const characters = [
  {
    id: 0,
    name: "ルフィ",
    bounty: "30億",
    nickname: "麦わらのルフィ",
    affiliation: "麦わら海賊団",
  },
  {
    id: 1,
    name: "ゾロ",
    bounty: "11億1100万",
    nickname: "海賊狩りのゾロ",
    affiliation: "麦わら海賊団",
  },
  {
    id: 5,
    name: "イブキ",
    bounty: "300",
    nickname: "麦わら狩りのいぶきん",
    affiliation: "いぶきん海賊団",
  },
  {
    id: 2,
    name: "サンジ",
    bounty: "11億1100万",
    nickname: "黒足のサンジ",
    affiliation: "麦わら海賊団",
  },
  {
    id: 3,
    name: "マーシャル・Ｄ・ティーチ",
    bounty: "22億4760万",
    nickname: "黒ひげ",
    affiliation: "黒ひげ海賊団",
  },
  {
    id: 4,
    name: "ジーザス・バージェス",
    bounty: "0",
    nickname: "チャンピオン",
    affiliation: "黒ひげ海賊団",
    src: "./3.png",
  },
];
function Profile({ name, bounty, nickname, affiliation }) {
  return (
    <>
      <section className="Profile">
        <h2>
          {name} <span>({affiliation})</span>
        </h2>

        <ul>
          <li>
            <b>懸賞金：</b>
            {bounty}ベリー
          </li>
          <li>
            <b>二つ名：</b>
            {nickname}
          </li>
        </ul>
      </section>
    </>
  );
}

function Gallery() {
  const [first, select] = useState(0);
  const mugiwara = characters.filter(
    (character) => character.affiliation === "麦わら海賊団"
  );
  const kokuhige = characters.filter(
    (character) => character.affiliation === "黒ひげ海賊団"
  );
  const ibuki = characters.filter(
    (character) => character.affiliation === "いぶきん海賊団"
  );
  const affs = [characters, mugiwara, kokuhige, ibuki];
  return (
    <>
      <div>
        <h1>ワンピース登場人物</h1>
        <div className="selection">
          <label htmlFor="aff-select">海賊団を選択：</label>
          <select
            name="aff-select"
            id="affselect"
            onChange={(x) => select((first) => (first = x.target.value))}
          >
            <option value="0">全部</option>
            <option value="1">麦わら海賊団</option>
            <option value="2">黒ひげ海賊団</option>
            <option value="3">いぶきん海賊団</option>
          </select>
        </div>
        {affs[first].map((character) => (
          <Profile
            key={character.id}
            name={character.name}
            bounty={character.bounty}
            nickname={character.nickname}
            affiliation={character.affiliation}
          />
        ))}
      </div>
    </>
  );
}

export default Gallery;
