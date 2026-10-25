// 100+ kanji JLPT N5. Format: kanji|on'yomi|kun'yomi|arti|goresan|contoh
const RAW = `
日|ニチ、ジツ|ひ、か|hari, matahari|4|日本、日曜日、毎日
月|ゲツ、ガツ|つき|bulan|4|月曜日、一月、月
火|カ|ひ|api|4|火曜日、火、花火
水|スイ|みず|air|4|水曜日、水、大水
木|モク、ボク|き|pohon, kayu|4|木曜日、木、大木
金|キン、コン|かね|emas, uang|8|金曜日、お金、金色
土|ド、ト|つち|tanah|3|土曜日、土、土地
山|サン|やま|gunung|3|山、富士山、登山
川|セン|かわ|sungai|3|川、小川、川口
田|デン|た|sawah|5|田んぼ、田中
人|ジン、ニン|ひと|orang|2|人、日本人、三人
口|コウ、ク|くち|mulut|3|口、入口、出口
目|モク|め|mata|5|目、一つ目、目標
耳|ジ|みみ|telinga|6|耳、耳鼻科
手|シュ|て|tangan|4|手、上手、手紙
足|ソク|あし、た|kaki, cukup|7|足、不足、満足
力|リョク、リキ|ちから|kekuatan|2|力、体力、全力
男|ダン、ナン|おとこ|pria|7|男、男の子、男性
女|ジョ|おんな|wanita|3|女、女の子、女性
子|シ、ス|こ|anak|3|子、子供、女の子
父|フ|ちち|ayah|4|父、お父さん、父母
母|ボ|はは|ibu|5|母、お母さん、父母
友|ユウ|とも|teman|4|友達、友人、親友
先|セン|さき|dahulu, ujung|6|先生、先週、先月
生|セイ、ショウ|い、なま、う|hidup, lahir|5|先生、学生、生まれる
学|ガク|まな|belajar|8|学生、学校、大学
校|コウ|—|sekolah|10|学校、高校、校長
本|ホン|もと|buku, asal|5|本、日本、本屋
語|ゴ|かた|bahasa, kata|14|日本語、英語、外国語
国|コク|くに|negara|8|国、外国、中国
中|チュウ|なか|tengah, dalam|4|中、一日中、中心
大|ダイ、タイ|おお|besar|3|大きい、大学、大切
小|ショウ|ちい、こ|kecil|3|小さい、小学校、小説
高|コウ|たか|tinggi, mahal|10|高い、高校、最高
安|アン|やす|murah, aman|6|安い、安心、安全
新|シン|あたら、あら|baru|13|新しい、新聞、新幹線
古|コ|ふる|lama|5|古い、中古、古本
長|チョウ|なが|panjang|8|長い、社長、長さ
短|タン|みじか|pendek|12|短い、短期
多|タ|おお|banyak|6|多い、多分、多数
少|ショウ|すこ、すく|sedikit|4|少ない、少し、少数
白|ハク、ビャク|しろ|putih|5|白い、白人、白紙
黒|コク|くろ|hitam|11|黒い、黒板、真っ黒
赤|セキ、シャク|あか|merah|7|赤い、赤ちゃん、真っ赤
青|セイ、ショウ|あお|biru|8|青い、青空、青年
空|クウ|そら、あ|langit, kosong|8|空、空港、青空
雨|ウ|あめ|hujan|8|雨、雨天、大雨
天|テン|あま|langit|4|天気、天国、天才
気|キ、ケ|いき|udara, semangat|6|天気、元気、気持ち
花|カ|はな|bunga|7|花、花屋、花見
草|ソウ|くさ|rumput|9|草、草花、雑草
石|セキ、シャク|いし|batu|5|石、石屋、宝石
犬|ケン|いぬ|anjing|4|犬、番犬、子犬
猫|ビョウ|ねこ|kucing|11|猫、子猫、猫舌
魚|ギョ|さかな|ikan|11|魚、金魚、魚屋
鳥|チョウ|とり|burung|5|鳥、小鳥、白鳥
馬|バ|うま|kuda|10|馬、馬車、競馬
牛|ギュウ|うし|sapi|4|牛、牛肉、牛乳
車|シャ|くるま|kendaraan|7|車、電車、自転車
電|デン|—|listrik|13|電車、電気、電話
話|ワ|はな、はなし|berbicara, cerita|13|話、電話、会話
時|ジ|とき|waktu, jam|10|時間、時計、何時
分|フン、ブン|わ|menit, membagi|4|分かる、五分、半分
半|ハン|なか|setengah|5|半分、半日、半年
前|ゼン|まえ|depan, sebelum|9|前、午前、名前
後|ゴ、コウ|あと、うし|belakang, sesudah|9|後、午後、最後
午|ゴ|—|siang|4|午前、午後、正午
間|カン、ケン|あいだ、ま|antara, ruang|12|時間、間、人間
今|コン、キン|いま|sekarang|4|今、今日、今週
毎|マイ|—|setiap|6|毎日、毎週、毎年
年|ネン|とし|tahun|6|年、今年、去年
週|シュウ|—|minggu|11|週、今週、毎週
曜|ヨウ|—|hari dalam minggu|18|月曜日、何曜日、曜日
朝|チョウ|あさ|pagi|12|朝、今朝、毎朝
昼|チュウ|ひる|siang|9|昼、昼ご飯、昼間
夜|ヤ|よる|malam|8|夜、今晩、夜中
春|シュン|はる|musim semi|9|春、春休み、青春
夏|カ、ゲ|なつ|musim panas|10|夏、夏休み、今年の夏
秋|シュウ|あき|musim gugur|9|秋、秋休み、秋風
冬|トウ|ふゆ|musim dingin|5|冬、冬休み、今年の冬
東|トウ|ひがし|timur|8|東、東京、東口
西|セイ、サイ|にし|barat|6|西、関西、西口
南|ナン|みなみ|selatan|9|南、南口、東南
北|ホク|きた|utara|5|北、北口、北海道
右|ウ、ユウ|みぎ|kanan|5|右、右手、右側
左|サ|ひだり|kiri|5|左、左手、左側
上|ジョウ|うえ、あ|atas, naik|3|上、上手、以上
下|カ、ゲ|した、さ、くだ|bawah, turun|3|下、下手、以下
外|ガイ、ゲ|そと|luar|5|外、外国、外国人
名|メイ、ミョウ|な|nama|6|名前、有名、名人
何|カ|なに、なん|apa|7|何、何時、何日
私|シ|わたし|saya, pribadi|7|私、私立、私たち
行|コウ、ギョウ|い|pergi|6|行く、銀行、旅行
来|ライ|く|datang|7|来る、来年、将来
食|ショク、ジキ|た|makan|9|食べる、食堂、食事
飲|イン|の|minum|12|飲む、飲み物、飲食
見|ケン|み|melihat|7|見る、花見、意見
聞|ブン、モン|き|mendengar|14|聞く、新聞、聞き手
言|ゲン、ゴン|い|berkata|7|言う、言葉、方言
読|ドク|よ|membaca|14|読む、読書、音読
書|ショ|か|menulis|10|書く、辞書、図書館
買|バイ|か|membeli|12|買う、買い物、売買
出|シュツ|で、だ|keluar|5|出る、出口、出席
入|ニュウ|はい、い|masuk|2|入る、入口、入学
立|リツ|た|berdiri|5|立つ、起立、国立
休|キュウ|やす|istirahat|6|休む、休み、休日
`;

export type KanjiEntry = {
  char: string;
  on: string;
  kun: string;
  meaning: string;
  strokes: number;
  examples: string[];
};

export function kanjiEntries(): KanjiEntry[] {
  return RAW.trim()
    .split('\n')
    .map((line) => {
      const [char, on, kun, meaning, strokes, examples] = line.split('|').map((s) => s.trim());
      return {
        char,
        on,
        kun,
        meaning,
        strokes: Number(strokes),
        examples: examples.split('、').map((s) => s.trim()).filter(Boolean),
      };
    });
}
