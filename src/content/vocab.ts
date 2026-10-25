// Kosakata JLPT N5 (~800). Format: kata|bacaan|arti|kelas kata
// Kelas kata: n=nomina, v1=verba ichidan, v5=verba godan, adj-i=adjektiva-i,
// adj-na=adjektiva-na, adv=adverbia, pron=pronomina, num=numeralia, ctr=penghitung,
// conj=konjungsi, expr=ungkapan.
export const VOCAB_GROUPS: Array<[string, string]> = [
  ['orang', `
私|わたし|saya|pron
僕|ぼく|saya (pria)|pron
あなた|あなた|kamu|pron
彼|かれ|dia (pria)|pron
彼女|かのじょ|dia (wanita)|pron
皆|みんな|semua orang|n
皆さん|みなさん|semua (sopan)|n
人|ひと|orang|n
男|おとこ|pria|n
女|おんな|wanita|n
男の子|おとこのこ|anak laki-laki|n
女の子|おんなのこ|anak perempuan|n
大人|おとな|orang dewasa|n
子供|こども|anak|n
友達|ともだち|teman|n
先生|せんせい|guru|n
学生|がくせい|pelajar|n
会社員|かいしゃいん|karyawan|n
医者|いしゃ|dokter|n
警官|けいかん|polisi|n
店員|てんいん|pelayan toko|n
運転手|うんてんしゅ|pengemudi|n
`],
  ['keluarga', `
家族|かぞく|keluarga|n
父|ちち|ayah (saya)|n
母|はは|ibu (saya)|n
お父さん|おとうさん|ayah (orang lain)|n
お母さん|おかあさん|ibu (orang lain)|n
兄|あに|kakak laki-laki (saya)|n
姉|あね|kakak perempuan (saya)|n
弟|おとうと|adik laki-laki|n
妹|いもうと|adik perempuan|n
お兄さん|おにいさん|kakak laki-laki (orang lain)|n
お姉さん|おねえさん|kakak perempuan (orang lain)|n
祖父|そふ|kakek|n
祖母|そぼ|nenek|n
おじいさん|おじいさん|kakek (orang lain)|n
おばあさん|おばあさん|nenek (orang lain)|n
夫|おっと|suami|n
妻|つま|istri|n
息子|むすこ|anak laki-laki|n
娘|むすめ|anak perempuan|n
赤ちゃん|あかちゃん|bayi|n
親|おや|orang tua|n
兄弟|きょうだい|saudara|n
おじ|おじ|paman|n
おば|おば|bibi|n
いとこ|いとこ|sepupu|n
`],
  ['angka', `
一|いち|satu|num
二|に|dua|num
三|さん|tiga|num
四|よん|empat|num
五|ご|lima|num
六|ろく|enam|num
七|なな|tujuh|num
八|はち|delapan|num
九|きゅう|sembilan|num
十|じゅう|sepuluh|num
百|ひゃく|seratus|num
千|せん|seribu|num
万|まん|sepuluh ribu|num
零|ゼロ|nol|num
番号|ばんごう|nomor|n
数|かず|angka|n
数字|すうじ|angka/numerik|n
一人|ひとり|satu orang|n
二人|ふたり|dua orang|n
半分|はんぶん|setengah|n
一個|いっこ|satu buah|ctr
二個|にこ|dua buah|ctr
一杯|いっぱい|satu cangkir/penuh|ctr
一枚|いちまい|satu lembar|ctr
一台|いちだい|satu unit|ctr
一本|いっぽん|satu batang|ctr
一冊|いっさつ|satu buku|ctr
一匹|いっぴき|satu ekor|ctr
一歳|いっさい|satu tahun (umur)|ctr
一回|いっかい|satu kali|ctr
一階|いっかい|lantai satu|ctr
一月|いちがつ|Januari|n
一日|ついたち|tanggal satu|n
一時|いちじ|jam satu|n
一分|いっぷん|satu menit|n
一秒|いちびょう|satu detik|n
一円|いちえん|satu yen|n
`],
  ['waktu', `
時間|じかん|waktu/jam|n
時|とき|saat|n
分|ふん|menit|n
今|いま|sekarang|n
今日|きょう|hari ini|n
明日|あした|besok|n
昨日|きのう|kemarin|n
明後日|あさって|lusa|n
一昨日|おととい|kemarin lusa|n
毎日|まいにち|setiap hari|n
毎朝|まいあさ|setiap pagi|n
毎晩|まいばん|setiap malam|n
毎週|まいしゅう|setiap minggu|n
毎月|まいつき|setiap bulan|n
毎年|まいとし|setiap tahun|n
朝|あさ|pagi|n
昼|ひる|siang|n
夜|よる|malam|n
晩|ばん|malam|n
夕方|ゆうがた|sore|n
今朝|けさ|pagi ini|n
今晩|こんばん|malam ini|n
今週|こんしゅう|minggu ini|n
来週|らいしゅう|minggu depan|n
先週|せんしゅう|minggu lalu|n
今月|こんげつ|bulan ini|n
来月|らいげつ|bulan depan|n
先月|せんげつ|bulan lalu|n
今年|ことし|tahun ini|n
来年|らいねん|tahun depan|n
去年|きょねん|tahun lalu|n
午前|ごぜん|pagi (AM)|n
午後|ごご|siang/sore (PM)|n
正午|しょうご|tengah hari|n
半|はん|setengah|n
前|まえ|sebelum/depan|n
後|あと|sesudah/belakang|n
最初|さいしょ|pertama|n
最後|さいご|terakhir|n
最近|さいきん|belakangan ini|n
将来|しょうらい|masa depan|n
昔|むかし|dahulu|n
週末|しゅうまつ|akhir pekan|n
平日|へいじつ|hari kerja|n
休み|やすみ|libur|n
間|あいだ|antara/selama|n
以上|いじょう|lebih dari|n
以下|いか|kurang dari|n
頃|ころ|sekitar (waktu)|n
`],
  ['hari-bulan', `
月曜日|げつようび|Senin|n
火曜日|かようび|Selasa|n
水曜日|すいようび|Rabu|n
木曜日|もくようび|Kamis|n
金曜日|きんようび|Jumat|n
土曜日|どようび|Sabtu|n
日曜日|にちようび|Minggu|n
何曜日|なんようび|hari apa|n
一月|いちがつ|Januari|n
二月|にがつ|Februari|n
三月|さんがつ|Maret|n
四月|しがつ|April|n
五月|ごがつ|Mei|n
六月|ろくがつ|Juni|n
七月|しちがつ|Juli|n
八月|はちがつ|Agustus|n
九月|くがつ|September|n
十月|じゅうがつ|Oktober|n
十一月|じゅういちがつ|November|n
十二月|じゅうにがつ|Desember|n
何月|なんがつ|bulan apa|n
二日|ふつか|tanggal dua|n
三日|みっか|tanggal tiga|n
四日|よっか|tanggal empat|n
五日|いつか|tanggal lima|n
六日|むいか|tanggal enam|n
七日|なのか|tanggal tujuh|n
八日|ようか|tanggal delapan|n
九日|ここのか|tanggal sembilan|n
十日|とおか|tanggal sepuluh|n
二十日|はつか|tanggal dua puluh|n
何日|なんにち|tanggal berapa|n
誕生日|たんじょうび|ulang tahun|n
休日|きゅうじつ|hari libur|n
祭り|まつり|festival|n
`],
  ['tempat', `
日本|にほん|Jepang|n
日本語|にほんご|bahasa Jepang|n
外国|がいこく|luar negeri|n
外国語|がいこくご|bahasa asing|n
国|くに|negara|n
町|まち|kota|n
村|むら|desa|n
道|みち|jalan|n
駅|えき|stasiun|n
空港|くうこう|bandara|n
港|みなと|pelabuhan|n
学校|がっこう|sekolah|n
大学|だいがく|universitas|n
高校|こうこう|SMA|n
中学校|ちゅうがっこう|SMP|n
小学校|しょうがっこう|SD|n
教室|きょうしつ|ruang kelas|n
図書館|としょかん|perpustakaan|n
病院|びょういん|rumah sakit|n
銀行|ぎんこう|bank|n
郵便局|ゆうびんきょく|kantor pos|n
交番|こうばん|pos polisi|n
店|みせ|toko|n
本屋|ほんや|toko buku|n
花屋|はなや|toko bunga|n
肉屋|にくや|toko daging|n
パン屋|パンや|toko roti|n
食堂|しょくどう|kantin|n
喫茶店|きっさてん|kedai kopi|n
レストラン|レストラン|restoran|n
デパート|デパート|department store|n
スーパー|スーパー|supermarket|n
コンビニ|コンビニ|minimarket|n
市場|いちば|pasar|n
公園|こうえん|taman|n
動物園|どうぶつえん|kebun binatang|n
映画館|えいがかん|bioskop|n
博物館|はくぶつかん|museum|n
美術館|びじゅつかん|galeri seni|n
神社|じんじゃ|kuil Shinto|n
寺|てら|kuil Buddha|n
城|しろ|kastil|n
家|いえ|rumah|n
部屋|へや|kamar|n
台所|だいどころ|dapur|n
お手洗い|おてあらい|toilet|n
風呂|ふろ|bak mandi|n
玄関|げんかん|pintu masuk|n
庭|にわ|taman rumah|n
窓|まど|jendela|n
ドア|ドア|pintu|n
プール|プール|kolam renang|n
海|うみ|laut|n
山|やま|gunung|n
川|かわ|sungai|n
池|いけ|kolam|n
湖|みずうみ|danau|n
森|もり|hutan|n
`],
  ['transportasi', `
電車|でんしゃ|kereta listrik|n
地下鉄|ちかてつ|kereta bawah tanah|n
新幹線|しんかんせん|shinkansen|n
バス|バス|bus|n
タクシー|タクシー|taksi|n
車|くるま|mobil|n
自転車|じてんしゃ|sepeda|n
バイク|バイク|motor|n
飛行機|ひこうき|pesawat|n
船|ふね|kapal|n
切符|きっぷ|tiket|n
パスポート|パスポート|paspor|n
旅行|りょこう|perjalanan|n
地図|ちず|peta|n
荷物|にもつ|barang bawaan|n
席|せき|kursi/tempat duduk|n
乗り場|のりば|tempat naik|n
出口|でぐち|pintu keluar|n
入口|いりぐち|pintu masuk|n
交差点|こうさてん|persimpangan|n
信号|しんごう|lampu lalu lintas|n
途中|とちゅう|di tengah jalan|n
`],
  ['makanan', `
ご飯|ごはん|nasi/makan|n
朝ご飯|あさごはん|sarapan|n
昼ご飯|ひるごはん|makan siang|n
晩ご飯|ばんごはん|makan malam|n
パン|パン|roti|n
肉|にく|daging|n
牛肉|ぎゅうにく|daging sapi|n
豚肉|ぶたにく|daging babi|n
鶏肉|とりにく|daging ayam|n
卵|たまご|telur|n
野菜|やさい|sayur|n
果物|くだもの|buah|n
りんご|りんご|apel|n
みかん|みかん|jeruk|n
バナナ|バナナ|pisang|n
いちご|いちご|stroberi|n
ぶどう|ぶどう|anggur|n
桃|もも|persik|n
梨|なし|pir|n
西瓜|すいか|semangka|n
米|こめ|beras|n
水|みず|air|n
お湯|おゆ|air panas|n
お茶|おちゃ|teh|n
紅茶|こうちゃ|teh hitam|n
コーヒー|コーヒー|kopi|n
牛乳|ぎゅうにゅう|susu|n
ジュース|ジュース|jus|n
ビール|ビール|bir|n
酒|さけ|sake/alkohol|n
砂糖|さとう|gula|n
塩|しお|garam|n
醤油|しょうゆ|kecap asin|n
味噌|みそ|miso|n
油|あぶら|minyak|n
バター|バター|mentega|n
チーズ|チーズ|keju|n
料理|りょうり|masakan|n
食べ物|たべもの|makanan|n
飲み物|のみもの|minuman|n
お菓子|おかし|kue/snack|n
飴|あめ|permen|n
ケーキ|ケーキ|kue|n
アイスクリーム|アイスクリーム|es krim|n
弁当|べんとう|bekal|n
ラーメン|ラーメン|ramen|n
そば|そば|soba|n
うどん|うどん|udon|n
寿司|すし|sushi|n
天ぷら|てんぷら|tempura|n
カレー|カレー|kari|n
味|あじ|rasa|n
匂い|におい|aroma|n
`],
  ['rumah-benda', `
机|つくえ|meja|n
椅子|いす|kursi|n
テーブル|テーブル|meja makan|n
ベッド|ベッド|tempat tidur|n
棚|たな|rak|n
本棚|ほんだな|rak buku|n
引き出し|ひきだし|laci|n
電気|でんき|listrik/lampu|n
電灯|でんとう|lampu|n
時計|とけい|jam|n
電話|でんわ|telepon|n
携帯電話|けいたいでんわ|ponsel|n
テレビ|テレビ|TV|n
ラジオ|ラジオ|radio|n
パソコン|パソコン|komputer|n
冷蔵庫|れいぞうこ|kulkas|n
電子レンジ|でんしレンジ|microwave|n
洗濯機|せんたくき|mesin cuci|n
掃除機|そうじき|vacuum cleaner|n
エアコン|エアコン|AC|n
ストーブ|ストーブ|pemanas|n
カメラ|カメラ|kamera|n
ビデオ|ビデオ|video|n
新聞|しんぶん|koran|n
雑誌|ざっし|majalah|n
本|ほん|buku|n
辞書|じしょ|kamus|n
ノート|ノート|buku catatan|n
鉛筆|えんぴつ|pensil|n
ペン|ペン|pena|n
ボールペン|ボールペン|pulpen|n
消しゴム|けしゴム|penghapus|n
定規|じょうぎ|penggaris|n
はさみ|はさみ|gunting|n
ナイフ|ナイフ|pisau|n
フォーク|フォーク|garpu|n
スプーン|スプーン|sendok|n
箸|はし|sumpit|n
茶碗|ちゃわん|mangkuk nasi|n
皿|さら|piring|n
コップ|コップ|gelas|n
グラス|グラス|gelas kaca|n
鍋|なべ|panci|n
フライパン|フライパン|wajan|n
ケトル|ケトル|ketel|n
タオル|タオル|handuk|n
石鹸|せっけん|sabun|n
歯ブラシ|はブラシ|sikat gigi|n
鏡|かがみ|cermin|n
傘|かさ|payung|n
鍵|かぎ|kunci|n
財布|さいふ|dompet|n
かばん|かばん|tas|n
袋|ふくろ|kantong|n
箱|はこ|kotak|n
紙|かみ|kertas|n
手紙|てがみ|surat|n
封筒|ふうとう|amplop|n
切手|きって|perangko|n
はがき|はがき|kartu pos|n
絵|え|gambar/lukisan|n
写真|しゃしん|foto|n
電池|でんち|baterai|n
`],
  ['tubuh', `
体|からだ|tubuh|n
頭|あたま|kepala|n
顔|かお|wajah|n
目|め|mata|n
耳|みみ|telinga|n
鼻|はな|hidung|n
口|くち|mulut|n
歯|は|gigi|n
舌|した|lidah|n
首|くび|leher|n
肩|かた|bahu|n
胸|むね|dada|n
お腹|おなか|perut|n
背中|せなか|punggung|n
手|て|tangan|n
指|ゆび|jari|n
腕|うで|lengan|n
足|あし|kaki|n
膝|ひざ|lutut|n
心|こころ|hati/pikiran|n
病気|びょうき|penyakit|n
風邪|かぜ|flu|n
熱|ねつ|demam|n
薬|くすり|obat|n
血|ち|darah|n
けが|けが|luka|n
`],
  ['alam', `
天気|てんき|cuaca|n
空|そら|langit|n
太陽|たいよう|matahari|n
月|つき|bulan|n
星|ほし|bintang|n
雨|あめ|hujan|n
雪|ゆき|salju|n
風|かぜ|angin|n
雲|くも|awan|n
雷|かみなり|petir|n
台風|たいふう|topan|n
地震|じしん|gempa|n
春|はる|musim semi|n
夏|なつ|musim panas|n
秋|あき|musim gugur|n
冬|ふゆ|musim dingin|n
季節|きせつ|musim|n
気温|きおん|suhu|n
花|はな|bunga|n
桜|さくら|sakura|n
木|き|pohon|n
葉|は|daun|n
草|くさ|rumput|n
石|いし|batu|n
土|つち|tanah|n
砂|すな|pasir|n
火|ひ|api|n
氷|こおり|es|n
煙|けむり|asap|n
光|ひかり|cahaya|n
音|おと|suara/bunyi|n
色|いろ|warna|n
`],
  ['hewan', `
動物|どうぶつ|hewan|n
犬|いぬ|anjing|n
猫|ねこ|kucing|n
鳥|とり|burung|n
魚|さかな|ikan|n
馬|うま|kuda|n
牛|うし|sapi|n
豚|ぶた|babi|n
羊|ひつじ|domba|n
象|ぞう|gajah|n
熊|くま|beruang|n
兎|うさぎ|kelinci|n
鼠|ねずみ|tikus|n
猿|さる|monyet|n
虎|とら|harimau|n
虫|むし|serangga|n
蝶|ちょう|kupu-kupu|n
蜂|はち|lebah|n
蟻|あり|semut|n
蛇|へび|ular|n
亀|かめ|kura-kura|n
`],
  ['sekolah-kerja', `
勉強|べんきょう|belajar|n
宿題|しゅくだい|PR|n
授業|じゅぎょう|pelajaran kelas|n
試験|しけん|ujian|n
テスト|テスト|tes|n
質問|しつもん|pertanyaan|n
答え|こたえ|jawaban|n
意味|いみ|arti|n
文法|ぶんぽう|tata bahasa|n
単語|たんご|kosakata|n
漢字|かんじ|kanji|n
平仮名|ひらがな|hiragana|n
片仮名|かたかな|katakana|n
作文|さくぶん|karangan|n
会話|かいわ|percakapan|n
発音|はつおん|pelafalan|n
声|こえ|suara|n
字|じ|huruf|n
文|ぶん|kalimat|n
言葉|ことば|kata/bahasa|n
例|れい|contoh|n
練習|れんしゅう|latihan|n
復習|ふくしゅう|mengulang pelajaran|n
予習|よしゅう|persiapan belajar|n
出席|しゅっせき|kehadiran|n
欠席|けっせき|absen|n
卒業|そつぎょう|kelulusan|n
入学|にゅうがく|masuk sekolah|n
会社|かいしゃ|perusahaan|n
仕事|しごと|pekerjaan|n
休憩|きゅうけい|istirahat|n
会議|かいぎ|rapat|n
予定|よてい|rencana|n
約束|やくそく|janji|n
用事|ようじ|urusan|n
給料|きゅうりょう|gaji|n
部長|ぶちょう|kepala departemen|n
社長|しゃちょう|direktur|n
`],
  ['verba', `
行く|いく|pergi|v5
来る|くる|datang|v1
帰る|かえる|pulang|v5
食べる|たべる|makan|v1
飲む|のむ|minum|v5
見る|みる|melihat|v1
聞く|きく|mendengar/bertanya|v5
話す|はなす|berbicara|v5
読む|よむ|membaca|v5
書く|かく|menulis|v5
買う|かう|membeli|v5
売る|うる|menjual|v5
作る|つくる|membuat|v5
使う|つかう|memakai|v5
待つ|まつ|menunggu|v5
会う|あう|bertemu|v5
起きる|おきる|bangun|v1
寝る|ねる|tidur|v1
座る|すわる|duduk|v5
立つ|たつ|berdiri|v5
歩く|あるく|berjalan|v5
走る|はしる|berlari|v5
飛ぶ|とぶ|terbang/melompat|v5
泳ぐ|およぐ|berenang|v5
乗る|のる|naik kendaraan|v5
降りる|おりる|turun kendaraan|v1
入る|はいる|masuk|v5
出る|でる|keluar|v1
開ける|あける|membuka|v1
閉める|しめる|menutup|v1
点ける|つける|menyalakan|v1
消す|けす|mematikan/menghapus|v5
洗う|あらう|mencuci|v5
掃除する|そうじする|membersihkan|v1
料理する|りょうりする|memasak|v1
吸う|すう|mengisap|v5
生きる|いきる|hidup|v1
死ぬ|しぬ|mati|v5
休む|やすむ|istirahat|v5
働く|はたらく|bekerja|v5
勉強する|べんきょうする|belajar|v1
教える|おしえる|mengajar|v1
習う|ならう|belajar dari guru|v5
覚える|おぼえる|mengingat|v1
忘れる|わすれる|melupakan|v1
思い出す|おもいだす|mengingat kembali|v5
考える|かんがえる|berpikir|v1
知る|しる|tahu|v5
分かる|わかる|mengerti|v5
信じる|しんじる|percaya|v1
心配する|しんぱいする|khawatir|v1
喜ぶ|よろこぶ|senang|v5
笑う|わらう|tertawa|v5
泣く|なく|menangis|v5
怒る|おこる|marah|v5
嫌う|きらう|membenci|v5
要る|いる|perlu|v5
持つ|もつ|memegang/memiliki|v5
取る|とる|mengambil|v5
置く|おく|meletakkan|v5
投げる|なげる|melempar|v1
拾う|ひろう|memungut|v5
渡す|わたす|menyerahkan|v5
もらう|もらう|menerima|v5
あげる|あげる|memberi|v1
くれる|くれる|memberi (ke saya)|v1
貸す|かす|meminjamkan|v5
借りる|かりる|meminjam|v1
返す|かえす|mengembalikan|v5
送る|おくる|mengirim|v5
届ける|とどける|mengantarkan|v1
運ぶ|はこぶ|membawa|v5
急ぐ|いそぐ|bergegas|v5
遅れる|おくれる|terlambat|v1
間に合う|まにあう|tiba tepat waktu|v5
始まる|はじまる|dimulai|v5
始める|はじめる|memulai|v1
終わる|おわる|berakhir|v5
終える|おえる|menyelesaikan|v1
続く|つづく|berlanjut|v5
続ける|つづける|melanjutkan|v1
止まる|とまる|berhenti|v5
止める|とめる|menghentikan|v1
動く|うごく|bergerak|v5
動かす|うごかす|menggerakkan|v5
変わる|かわる|berubah|v5
変える|かえる|mengubah|v1
決める|きめる|memutuskan|v1
選ぶ|えらぶ|memilih|v5
比べる|くらべる|membandingkan|v1
調べる|しらべる|memeriksa|v1
確かめる|たしかめる|memastikan|v1
試す|ためす|mencoba|v5
探す|さがす|mencari|v5
見つける|みつける|menemukan|v1
無くす|なくす|kehilangan|v5
落とす|おとす|menjatuhkan|v5
落ちる|おちる|jatuh|v1
壊れる|こわれる|rusak|v1
直す|なおす|memperbaiki|v5
治る|なおる|sembuh|v5
生まれる|うまれる|lahir|v1
育つ|そだつ|tumbuh|v5
育てる|そだてる|membesarkan|v1
住む|すむ|tinggal|v5
引っ越す|ひっこす|pindah rumah|v5
暮らす|くらす|hidup/bermukim|v5
旅行する|りょこうする|bepergian|v1
散歩する|さんぽする|berjalan-jalan|v1
遊ぶ|あそぶ|bermain|v5
歌う|うたう|bernyanyi|v5
踊る|おどる|menari|v5
弾く|ひく|memainkan alat musik|v5
描く|えがく|menggambar|v5
撮る|とる|memotret|v5
見せる|みせる|menunjukkan|v1
教わる|おそわる|diajari|v5
答える|こたえる|menjawab|v1
尋ねる|たずねる|bertanya|v1
頼む|たのむ|meminta|v5
断る|ことわる|menolak|v5
許す|ゆるす|memaafkan|v5
謝る|あやまる|meminta maaf|v5
褒める|ほめる|memuji|v1
叱る|しかる|memarahi|v5
助ける|たすける|menolong|v1
手伝う|てつだう|membantu|v5
守る|まもる|menjaga|v5
戦う|たたかう|bertarung|v5
勝つ|かつ|menang|v5
負ける|まける|kalah|v1
競争する|きょうそうする|berkompetisi|v1
泊まる|とまる|menginap|v5
泊める|とめる|menginapkan|v1
着る|きる|memakai baju|v1
脱ぐ|ぬぐ|melepas|v5
履く|はく|memakai sepatu|v5
被る|かぶる|memakai topi|v5
かける|かける|memakai kacamata|v1
持って行く|もっていく|membawa pergi|v5
持って来る|もってくる|membawa datang|v1
呼ぶ|よぶ|memanggil|v5
鳴る|なる|berbunyi|v5
鳴く|なく|berbunyi (hewan)|v5
光る|ひかる|bersinar|v5
輝く|かがやく|berkilau|v5
流れる|ながれる|mengalir|v1
燃える|もえる|terbakar|v1
冷える|ひえる|menjadi dingin|v1
温める|あたためる|menghangatkan|v1
冷やす|ひやす|mendinginkan|v5
沸く|わく|mendidih|v5
沸かす|わかす|merebus|v5
焼く|やく|memanggang|v5
煮る|にる|merebus|v1
炒める|いためる|menumis|v1
切る|きる|memotong|v5
割る|わる|memecah|v5
混ぜる|まぜる|mencampur|v1
入れる|いれる|memasukkan|v1
出す|だす|mengeluarkan|v5
並べる|ならべる|menyusun|v1
片付ける|かたづける|merapikan|v1
捨てる|すてる|membuang|v1
拭く|ふく|mengelap|v5
磨く|みがく|menggosok|v5
測る|はかる|mengukur|v5
数える|かぞえる|menghitung|v1
計算する|けいさんする|menghitung|v1
増える|ふえる|bertambah|v1
減る|へる|berkurang|v5
足す|たす|menambah|v5
引く|ひく|mengurangi/menarik|v5
掛ける|かける|mengalikan/menggantung|v1
分ける|わける|membagi|v1
集める|あつめる|mengumpulkan|v1
集まる|あつまる|berkumpul|v5
開く|ひらく|terbuka|v5
閉じる|とじる|menutup|v1
`],
  ['adjektiva-i', `
大きい|おおきい|besar|adj-i
小さい|ちいさい|kecil|adj-i
高い|たかい|tinggi/mahal|adj-i
安い|やすい|murah|adj-i
低い|ひくい|rendah|adj-i
長い|ながい|panjang|adj-i
短い|みじかい|pendek|adj-i
新しい|あたらしい|baru|adj-i
古い|ふるい|lama|adj-i
若い|わかい|muda|adj-i
暑い|あつい|panas (cuaca)|adj-i
寒い|さむい|dingin|adj-i
熱い|あつい|panas (benda)|adj-i
冷たい|つめたい|dingin (benda)|adj-i
暖かい|あたたかい|hangat|adj-i
涼しい|すずしい|sejuk|adj-i
多い|おおい|banyak|adj-i
少ない|すくない|sedikit|adj-i
早い|はやい|cepat (waktu)|adj-i
速い|はやい|cepat (kecepatan)|adj-i
遅い|おそい|lambat|adj-i
近い|ちかい|dekat|adj-i
遠い|とおい|jauh|adj-i
強い|つよい|kuat|adj-i
弱い|よわい|lemah|adj-i
重い|おもい|berat|adj-i
軽い|かるい|ringan|adj-i
明るい|あかるい|terang|adj-i
暗い|くらい|gelap|adj-i
広い|ひろい|luas|adj-i
狭い|せまい|sempit|adj-i
深い|ふかい|dalam|adj-i
浅い|あさい|dangkal|adj-i
太い|ふとい|tebal|adj-i
細い|ほそい|tipis|adj-i
丸い|まるい|bulat|adj-i
四角い|しかくい|persegi|adj-i
正しい|ただしい|benar|adj-i
美しい|うつくしい|indah|adj-i
楽しい|たのしい|menyenangkan|adj-i
嬉しい|うれしい|senang|adj-i
悲しい|かなしい|sedih|adj-i
寂しい|さびしい|sepi|adj-i
怖い|こわい|takut|adj-i
痛い|いたい|sakit|adj-i
眠い|ねむい|mengantuk|adj-i
忙しい|いそがしい|sibuk|adj-i
美味しい|おいしい|enak|adj-i
不味い|まずい|tidak enak|adj-i
甘い|あまい|manis|adj-i
辛い|からい|pedas|adj-i
苦い|にがい|pahit|adj-i
酸っぱい|すっぱい|asam|adj-i
汚い|きたない|kotor|adj-i
面白い|おもしろい|menarik|adj-i
つまらない|つまらない|membosankan|adj-i
優しい|やさしい|baik hati|adj-i
厳しい|きびしい|ketat|adj-i
欲しい|ほしい|ingin|adj-i
無い|ない|tidak ada|adj-i
悪い|わるい|buruk|adj-i
恥ずかしい|はずかしい|malu|adj-i
危ない|あぶない|berbahaya|adj-i
うるさい|うるさい|berisik|adj-i
`],
  ['adjektiva-na', `
元気|げんき|sehat|adj-na
静か|しずか|tenang|adj-na
賑やか|にぎやか|ramai|adj-na
綺麗|きれい|indah/bersih|adj-na
有名|ゆうめい|terkenal|adj-na
便利|べんり|praktis|adj-na
不便|ふべん|tidak praktis|adj-na
大切|たいせつ|penting|adj-na
大事|だいじ|penting|adj-na
必要|ひつよう|perlu|adj-na
十分|じゅうぶん|cukup|adj-na
大丈夫|だいじょうぶ|tidak apa-apa|adj-na
丈夫|じょうぶ|kuat/awet|adj-na
簡単|かんたん|mudah|adj-na
複雑|ふくざつ|rumit|adj-na
上手|じょうず|pandai|adj-na
下手|へた|tidak pandai|adj-na
好き|すき|suka|adj-na
嫌い|きらい|tidak suka|adj-na
嫌|いや|tidak mau|adj-na
残念|ざんねん|menyesal|adj-na
心配|しんぱい|khawatir|adj-na
安心|あんしん|tenang|adj-na
自由|じゆう|bebas|adj-na
無理|むり|tidak mungkin|adj-na
駄目|だめ|tidak boleh|adj-na
同じ|おなじ|sama|adj-na
色々|いろいろ|berbagai|adj-na
特別|とくべつ|khusus|adj-na
普通|ふつう|biasa|adj-na
立派|りっぱ|megah|adj-na
素敵|すてき|menawan|adj-na
変|へん|aneh|adj-na
真面目|まじめ|serius|adj-na
親切|しんせつ|ramah|adj-na
熱心|ねっしん|bersemangat|adj-na
`],
  ['adverbia', `
とても|とても|sangat|adv
あまり|あまり|tidak begitu|adv
たくさん|たくさん|banyak|adv
少し|すこし|sedikit|adv
ちょっと|ちょっと|sedikit|adv
もっと|もっと|lebih|adv
一番|いちばん|paling|adv
よく|よく|sering|adv
時々|ときどき|kadang-kadang|adv
いつも|いつも|selalu|adv
たいてい|たいてい|biasanya|adv
たまに|たまに|jarang-jarang|adv
決して|けっして|tidak pernah|adv
全然|ぜんぜん|tidak sama sekali|adv
必ず|かならず|pasti|adv
きっと|きっと|pasti|adv
たぶん|たぶん|mungkin|adv
もう|もう|sudah|adv
まだ|まだ|belum/masih|adv
もうすぐ|もうすぐ|segera|adv
すぐに|すぐに|segera|adv
ゆっくり|ゆっくり|pelan-pelan|adv
はやく|はやく|cepat|adv
だんだん|だんだん|perlahan-lahan|adv
だいたい|だいたい|kira-kira|adv
ほとんど|ほとんど|hampir|adv
全部|ぜんぶ|semua|adv
一緒に|いっしょに|bersama|adv
一人で|ひとりで|sendiri|adv
自分で|じぶんで|sendiri|adv
また|また|lagi|adv
もう一度|もういちど|sekali lagi|adv
初めて|はじめて|pertama kali|adv
今度|こんど|lain kali|adv
次に|つぎに|berikutnya|adv
先に|さきに|lebih dulu|adv
後で|あとで|nanti|adv
前に|まえに|sebelum|adv
いつか|いつか|suatu hari|adv
そして|そして|dan|conj
それから|それから|setelah itu|conj
それに|それに|selain itu|conj
だから|だから|karena itu|conj
でも|でも|tetapi|conj
しかし|しかし|namun|conj
けれども|けれども|tetapi|conj
または|または|atau|conj
なぜ|なぜ|mengapa|adv
どうして|どうして|mengapa|adv
どうやって|どうやって|bagaimana caranya|adv
どのくらい|どのくらい|berapa lama|adv
どの|どの|yang mana|adj-na
どれ|どれ|yang mana|pron
どこ|どこ|di mana|pron
いつ|いつ|kapan|pron
だれ|だれ|siapa|pron
何|なに|apa|pron
いくら|いくら|berapa harga|adv
いくつ|いくつ|berapa buah|adv
どう|どう|bagaimana|adv
こう|こう|begini|adv
そう|そう|begitu|adv
もし|もし|kalau|adv
もちろん|もちろん|tentu saja|adv
例えば|たとえば|misalnya|adv
実は|じつは|sebenarnya|adv
やはり|やはり|ternyata|adv
ちゃんと|ちゃんと|dengan benar|adv
しっかり|しっかり|dengan kuat|adv
`],
  ['warna-bentuk', `
赤|あか|merah|n
青|あお|biru|n
白|しろ|putih|n
黒|くろ|hitam|n
黄色|きいろ|kuning|n
緑|みどり|hijau|n
茶色|ちゃいろ|cokelat|n
灰色|はいいろ|abu-abu|n
紫|むらさき|ungu|n
桃色|ももいろ|merah muda|n
橙色|だいだいいろ|oranye|n
銀色|ぎんいろ|perak|n
金色|きんいろ|emas|n
形|かたち|bentuk|n
丸|まる|bulatan|n
三角|さんかく|segitiga|n
四角|しかく|persegi|n
線|せん|garis|n
点|てん|titik|n
サイズ|サイズ|ukuran|n
`],
  ['pakaian', `
服|ふく|pakaian|n
洋服|ようふく|pakaian barat|n
着物|きもの|kimono|n
シャツ|シャツ|kemeja|n
Tシャツ|ティーシャツ|kaos|n
セーター|セーター|sweter|n
上着|うわぎ|jaket|n
コート|コート|mantel|n
ズボン|ズボン|celana|n
スカート|スカート|rok|n
ジーンズ|ジーンズ|jeans|n
靴|くつ|sepatu|n
靴下|くつした|kaus kaki|n
帽子|ぼうし|topi|n
眼鏡|めがね|kacamata|n
ネクタイ|ネクタイ|dasi|n
ベルト|ベルト|ikat pinggang|n
手袋|てぶくろ|sarung tangan|n
マフラー|マフラー|syal|n
ハンカチ|ハンカチ|saputangan|n
指輪|ゆびわ|cincin|n
イヤリング|イヤリング|anting|n
`],
  ['hobi', `
趣味|しゅみ|hobi|n
スポーツ|スポーツ|olahraga|n
サッカー|サッカー|sepak bola|n
野球|やきゅう|bisbol|n
テニス|テニス|tenis|n
バスケットボール|バスケットボール|basket|n
バレーボール|バレーボール|voli|n
卓球|たっきゅう|tenis meja|n
ゴルフ|ゴルフ|golf|n
スキー|スキー|ski|n
水泳|すいえい|renang|n
ジョギング|ジョギング|jogging|n
登山|とざん|mendaki|n
映画|えいが|film|n
音楽|おんがく|musik|n
歌|うた|lagu|n
ダンス|ダンス|tari|n
ゲーム|ゲーム|permainan|n
パーティー|パーティー|pesta|n
読書|どくしょ|membaca buku|n
買い物|かいもの|belanja|n
散歩|さんぽ|jalan-jalan|n
ピクニック|ピクニック|piknik|n
釣り|つり|memancing|n
園芸|えんげい|berkebun|n
将棋|しょうぎ|shogi|n
囲碁|いご|go|n
カラオケ|カラオケ|karaoke|n
コンサート|コンサート|konser|n
`],
  ['umum', `
物|もの|benda|n
事|こと|hal|n
所|ところ|tempat|n
方|ほう|arah/cara|n
側|そば|samping|n
隣|となり|sebelah|n
近所|きんじょ|lingkungan sekitar|n
世界|せかい|dunia|n
地球|ちきゅう|bumi|n
宇宙|うちゅう|luar angkasa|n
戦争|せんそう|perang|n
平和|へいわ|damai|n
政治|せいじ|politik|n
経済|けいざい|ekonomi|n
文化|ぶんか|budaya|n
歴史|れきし|sejarah|n
科学|かがく|sains|n
数学|すうがく|matematika|n
問題|もんだい|masalah/soal|n
理由|りゆう|alasan|n
方法|ほうほう|metode|n
結果|けっか|hasil|n
情報|じょうほう|informasi|n
ニュース|ニュース|berita|n
天気予報|てんきよほう|ramalan cuaca|n
夢|ゆめ|mimpi|n
希望|きぼう|harapan|n
気持ち|きもち|perasaan|n
気分|きぶん|suasana hati|n
考え|かんがえ|pemikiran|n
意見|いけん|pendapat|n
話|はなし|cerita|n
名前|なまえ|nama|n
住所|じゅうしょ|alamat|n
電話番号|でんわばんごう|nomor telepon|n
年齢|ねんれい|usia|n
`],
];

export type VocabEntry = { word: string; reading: string; meaning: string; pos: string; category: string };

export function vocabEntries(): VocabEntry[] {
  const seen = new Set<string>();
  const out: VocabEntry[] = [];
  for (const [category, raw] of VOCAB_GROUPS) {
    for (const line of raw.trim().split('\n')) {
      const [word, reading, meaning, pos] = line.split('|').map((s) => s.trim());
      if (!word || !reading || !meaning || !pos) continue;
      const key = `${word}:${reading}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ word, reading, meaning, pos, category });
    }
  }
  return out;
}
