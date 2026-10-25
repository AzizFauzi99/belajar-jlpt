export type ListeningQuestion = { q: string; options: string[]; answer: number; explanation: string };
export type ListeningLine = { speaker: string; jp: string; id: string };
export type ListeningTrack = {
  id: string;
  title: string;
  topic: string;
  lines: ListeningLine[];
  translation: string;
  notes?: string[];
  questions: ListeningQuestion[];
};

export const LISTENING_TRACKS: ListeningTrack[] = [
  {
    id: 'l01',
    title: 'レストランで',
    topic: 'restoran',
    lines: [
      { speaker: '店員', jp: 'いらっしゃいませ。何名さまですか。', id: 'Selamat datang. Berapa orang?' },
      { speaker: '客', jp: '二人です。', id: 'Dua orang.' },
      { speaker: '店員', jp: 'こちらへどうぞ。ご注文は？', id: 'Silakan ke sini. Pesanannya?' },
      { speaker: '客', jp: 'カレーライスを一つと、コーヒーを二つください。', id: 'Tolong satu kari dan dua kopi.' },
      { speaker: '店員', jp: 'かしこまりました。少々お待ちください。', id: 'Baik. Mohon tunggu sebentar.' },
    ],
    translation:
      'Pelayan menyambut dan menanyakan jumlah orang. Pelanggan menjawab dua orang, lalu memesan satu kari dan dua kopi.',
    notes: ['何名さま — berapa orang (sopan)', 'ご注文 — pesanan', '少々お待ちください — mohon tunggu'],
    questions: [
      {
        q: '客は何人ですか。',
        options: ['一人', '二人', '三人', '四人'],
        answer: 1,
        explanation: 'Pelanggan menjawab 「二人です」.',
      },
      {
        q: '客は何を注文しましたか。',
        options: ['カレー一つとコーヒー二つ', 'カレー二つとコーヒー一つ', 'コーヒーだけ', 'カレーだけ'],
        answer: 0,
        explanation: 'Pesanan: 「カレーライスを 一つと、コーヒーを 二つ」.',
      },
    ],
  },
  {
    id: 'l02',
    title: '駅で',
    topic: 'transportasi',
    lines: [
      { speaker: '女', jp: 'すみません、新宿へ行きたいんですけど。', id: 'Permisi, saya ingin pergi ke Shinjuku.' },
      { speaker: '駅員', jp: '新宿ですね。三番線です。', id: 'Shinjuku, ya. Jalur tiga.' },
      { speaker: '女', jp: '何時に出ますか。', id: 'Berangkat jam berapa?' },
      { speaker: '駅員', jp: '十時十五分です。次は十時半です。', id: 'Jam sepuluh lewat lima belas. Berikutnya jam setengah sebelas.' },
      { speaker: '女', jp: 'じゃ、十時十五分のに乗ります。ありがとうございます。', id: 'Kalau begitu saya naik yang jam sepuluh lewat lima belas. Terima kasih.' },
    ],
    translation:
      'Seorang perempuan bertanya cara ke Shinjuku. Petugas mengatakan jalur tiga, kereta berikutnya jam 10.15 lalu 10.30. Perempuan itu memilih kereta 10.15.',
    notes: ['三番線 — jalur tiga', '出ます — berangkat', '乗ります — naik'],
    questions: [
      {
        q: '新宿行きは何番線ですか。',
        options: ['一番線', '二番線', '三番線', '四番線'],
        answer: 2,
        explanation: 'Petugas menjawab 「三番線です」.',
      },
      {
        q: '女の人は何時の電車に乗りますか。',
        options: ['十時', '十時十五分', '十時半', '十一時'],
        answer: 1,
        explanation: 'Dia memilih 「十時十五分の」.',
      },
    ],
  },
  {
    id: 'l03',
    title: '店で',
    topic: 'belanja',
    lines: [
      { speaker: '客', jp: 'このシャツはいくらですか。', id: 'Berapa harga kemeja ini?' },
      { speaker: '店員', jp: '三千円です。', id: 'Tiga ribu yen.' },
      { speaker: '客', jp: 'ちょっと高いですね。あの青いのは？', id: 'Agak mahal ya. Yang biru itu?' },
      { speaker: '店員', jp: 'あちらは二千五百円です。', id: 'Yang itu dua ribu lima ratus yen.' },
      { speaker: '客', jp: 'じゃ、青いのをください。', id: 'Kalau begitu, ambil yang biru.' },
    ],
    translation:
      'Pelanggan menanyakan harga kemeja 3000 yen, merasa mahal, lalu memilih kemeja biru seharga 2500 yen.',
    notes: ['いくら — berapa harga', 'ちょっと — agak', 'あちら — yang itu (jauh)'],
    questions: [
      {
        q: '青いシャツはいくらですか。',
        options: ['二千円', '二千五百円', '三千円', '三千五百円'],
        answer: 1,
        explanation: 'Petugas menjawab 「二千五百円です」.',
      },
      {
        q: '客は何を買いますか。',
        options: ['白いシャツ', '青いシャツ', '黒いシャツ', '何も買わない'],
        answer: 1,
        explanation: 'Pelanggan berkata 「青いのを ください」.',
      },
    ],
  },
  {
    id: 'l04',
    title: '電話',
    topic: 'telepon',
    lines: [
      { speaker: '男', jp: 'もしもし、田中さんですか。', id: 'Halo, Tanaka-san?' },
      { speaker: '女', jp: 'はい、田中です。', id: 'Ya, Tanaka.' },
      { speaker: '男', jp: '明日、映画を見に行きませんか。', id: 'Mau nonton film besok?' },
      { speaker: '女', jp: 'いいですね。何時にしますか。', id: 'Boleh. Jam berapa?' },
      { speaker: '男', jp: '六時に駅の前で会いましょう。', id: 'Ayo bertemu jam enam di depan stasiun.' },
      { speaker: '女', jp: 'わかりました。じゃ、また明日。', id: 'Baik. Sampai besok.' },
    ],
    translation:
      'Penelepon mengajak Tanaka menonton film besok. Mereka sepakat bertemu jam enam di depan stasiun.',
    notes: ['もしもし — halo (telepon)', '会いましょう — ayo bertemu', '駅の前 — depan stasiun'],
    questions: [
      {
        q: '二人は明日何をしますか。',
        options: ['映画を見る', '買い物をする', '食事をする', '勉強する'],
        answer: 0,
        explanation: 'Ajakan: 「映画を 見に 行きませんか」.',
      },
      {
        q: '何時にどこで会いますか。',
        options: ['五時に駅', '六時に駅の前', '六時に学校', '七時に駅'],
        answer: 1,
        explanation: 'Dikatakan 「六時に 駅の 前で 会いましょう」.',
      },
    ],
  },
  {
    id: 'l05',
    title: '天気の話',
    topic: 'cuaca',
    lines: [
      { speaker: '女', jp: '今日はいい天気ですね。', id: 'Cuaca hari ini bagus, ya.' },
      { speaker: '男', jp: 'ええ。でも、午後から雨が降るそうですよ。', id: 'Ya. Tapi katanya mulai sore akan hujan.' },
      { speaker: '女', jp: 'そうですか。傘を持って来ませんでした。', id: 'Begitu ya. Saya tidak membawa payung.' },
      { speaker: '男', jp: 'わたしは二つ持っています。一つ貸しましょうか。', id: 'Saya punya dua. Mau saya pinjamkan satu?' },
      { speaker: '女', jp: 'ありがとうございます。助かります。', id: 'Terima kasih. Sangat membantu.' },
    ],
    translation:
      'Cuaca pagi ini bagus, tetapi katanya sore akan hujan. Perempuan tidak membawa payung, lalu laki-laki menawarkan salah satu dari dua payungnya.',
    notes: ['そうです — katanya', '持って来ませんでした — tidak membawa', '貸します — meminjamkan'],
    questions: [
      {
        q: '午後から何が降りますか。',
        options: ['雪', '雨', '風', '何も降らない'],
        answer: 1,
        explanation: 'Dikatakan 「午後から 雨が 降るそうです」.',
      },
      {
        q: '男の人は女の人に何を貸しますか。',
        options: ['傘', 'かばん', '本', 'お金'],
        answer: 0,
        explanation: 'Laki-laki menawarkan 「一つ 貸しましょうか」 untuk payung.',
      },
    ],
  },
  {
    id: 'l06',
    title: '学校の話',
    topic: 'sekolah',
    lines: [
      { speaker: '男', jp: '日本語のクラスは何曜日ですか。', id: 'Kelas bahasa Jepang hari apa?' },
      { speaker: '女', jp: '月曜日と水曜日と金曜日です。', id: 'Senin, Rabu, dan Jumat.' },
      { speaker: '男', jp: '何時からですか。', id: 'Mulai jam berapa?' },
      { speaker: '女', jp: '九時から十二時までです。', id: 'Dari jam sembilan sampai dua belas.' },
      { speaker: '男', jp: 'じゃ、明日ですね。', id: 'Kalau begitu, besok, ya.' },
    ],
    translation:
      'Kelas bahasa Jepang diadakan Senin, Rabu, Jumat dari jam sembilan sampai dua belas. Besok ada kelas.',
    notes: ['何曜日 — hari apa', 'から…まで — dari…sampai', '明日 — besok'],
    questions: [
      {
        q: '日本語のクラスは何曜日ですか。',
        options: ['月水金', '火木', '月火水', '毎日'],
        answer: 0,
        explanation: 'Disebut 「月曜日と 水曜日と 金曜日」.',
      },
      {
        q: 'クラスは何時までですか。',
        options: ['九時', '十時', '十一時', '十二時'],
        answer: 3,
        explanation: 'Disebut 「九時から 十二時まで」.',
      },
    ],
  },
  {
    id: 'l07',
    title: '病院で',
    topic: 'kesehatan',
    lines: [
      { speaker: '医者', jp: 'どうしましたか。', id: 'Ada masalah apa?' },
      { speaker: '女', jp: 'のどが痛くて、熱があります。', id: 'Tenggorokan sakit dan demam.' },
      { speaker: '医者', jp: 'いつからですか。', id: 'Sejak kapan?' },
      { speaker: '女', jp: '昨日の夜からです。', id: 'Sejak tadi malam.' },
      { speaker: '医者', jp: '風邪ですね。この薬を一日三回飲んでください。', id: 'Flu. Minum obat ini tiga kali sehari.' },
    ],
    translation:
      'Pasien mengeluh tenggorokan sakit dan demam sejak tadi malam. Dokter mendiagnosis flu dan menyuruh minum obat tiga kali sehari.',
    notes: ['のど — tenggorokan', '一日三回 — tiga kali sehari', '飲んでください — tolong minum'],
    questions: [
      {
        q: '女の人はどこが痛いですか。',
        options: ['頭', 'お腹', 'のど', '足'],
        answer: 2,
        explanation: 'Dikatakan 「のどが 痛くて」.',
      },
      {
        q: '薬を一日何回飲みますか。',
        options: ['一回', '二回', '三回', '四回'],
        answer: 2,
        explanation: 'Dokter berkata 「一日 三回 飲んでください」.',
      },
    ],
  },
  {
    id: 'l08',
    title: 'ホテルで',
    topic: 'penginapan',
    lines: [
      { speaker: '客', jp: 'チェックインをお願いします。', id: 'Saya ingin check-in.' },
      { speaker: '店員', jp: 'お名前は？', id: 'Namanya?' },
      { speaker: '客', jp: 'アニです。', id: 'Ani.' },
      { speaker: '店員', jp: 'アニさま、お部屋は三階の三百二号室です。', id: 'Ani-sama, kamarnya di lantai tiga, nomor 302.' },
      { speaker: '客', jp: '朝ご飯は何時からですか。', id: 'Sarapan mulai jam berapa?' },
      { speaker: '店員', jp: '七時から十時までです。', id: 'Dari jam tujuh sampai sepuluh.' },
    ],
    translation:
      'Tamu bernama Ani check-in dan mendapat kamar 302 di lantai tiga. Sarapan tersedia jam tujuh sampai sepuluh.',
    notes: ['お願いします — mohon', 'お部屋 — kamar (sopan)', '朝ご飯 — sarapan'],
    questions: [
      {
        q: '部屋は何階ですか。',
        options: ['二階', '三階', '四階', '五階'],
        answer: 1,
        explanation: 'Dikatakan 「三階の 三百二号室」.',
      },
      {
        q: '朝ご飯は何時からですか。',
        options: ['六時', '七時', '八時', '十時'],
        answer: 1,
        explanation: 'Disebut 「七時から 十時まで」.',
      },
    ],
  },
  {
    id: 'l09',
    title: '道を聞く',
    topic: 'arah',
    lines: [
      { speaker: '男', jp: 'すみません、郵便局はどこですか。', id: 'Permisi, di mana kantor pos?' },
      { speaker: '女', jp: 'この道をまっすぐ行ってください。', id: 'Jalan lurus di jalan ini.' },
      { speaker: '男', jp: 'はい。', id: 'Baik.' },
      { speaker: '女', jp: '二つ目の角を左に曲がると、銀行があります。郵便局はその隣です。', id: 'Belok kiri di tikungan kedua, ada bank. Kantor pos di sebelahnya.' },
      { speaker: '男', jp: 'わかりました。ありがとうございます。', id: 'Mengerti. Terima kasih.' },
    ],
    translation:
      'Laki-laki mencari kantor pos. Petunjuknya: jalan lurus, belok kiri di tikungan kedua, kantor pos berada di sebelah bank.',
    notes: ['まっすぐ — lurus', '角 — tikungan', '隣 — sebelah'],
    questions: [
      {
        q: '郵便局はどこにありますか。',
        options: ['銀行の隣', '駅の前', '学校の中', '交差点の右'],
        answer: 0,
        explanation: 'Dikatakan 「郵便局は その 隣です」 setelah menyebut bank.',
      },
      {
        q: '二つ目の角をどちらに曲がりますか。',
        options: ['右', '左', 'まっすぐ', '戻る'],
        answer: 1,
        explanation: 'Dikatakan 「二つ目の 角を 左に 曲がる」.',
      },
    ],
  },
  {
    id: 'l10',
    title: 'アルバイト',
    topic: 'kerja',
    lines: [
      { speaker: '店長', jp: '来週のシフトですが、月曜日は来られますか。', id: 'Soal shift minggu depan, Senin bisa datang?' },
      { speaker: '学生', jp: '月曜日はテストがありますから、ちょっと……。', id: 'Senin ada ujian, jadi agak…' },
      { speaker: '店長', jp: 'じゃ、火曜日はどうですか。', id: 'Kalau Selasa bagaimana?' },
      { speaker: '学生', jp: '火曜日は大丈夫です。', id: 'Selasa bisa.' },
      { speaker: '店長', jp: '五時から九時までお願いします。', id: 'Tolong dari jam lima sampai sembilan.' },
    ],
    translation:
      'Manajer menanyakan shift Senin, tetapi siswa tidak bisa karena ujian. Mereka sepakat shift Selasa jam lima sampai sembilan.',
    notes: ['シフト — jadwal kerja', '来られますか — bisa datang?', '大丈夫 — tidak masalah'],
    questions: [
      {
        q: '学生はなぜ月曜日に行けませんか。',
        options: ['病気だから', 'テストがあるから', '旅行するから', '仕事があるから'],
        answer: 1,
        explanation: 'Alasannya 「月曜日は テストが ありますから」.',
      },
      {
        q: '火曜日のシフトは何時からですか。',
        options: ['四時', '五時', '六時', '九時'],
        answer: 1,
        explanation: 'Dikatakan 「五時から 九時まで」.',
      },
    ],
  },
  {
    id: 'l11',
    title: '誕生日プレゼント',
    topic: 'hadiah',
    lines: [
      { speaker: '女', jp: '来週は妹の誕生日です。何をあげましょうか。', id: 'Minggu depan ulang tahun adik saya. Sebaiknya beri apa?' },
      { speaker: '男', jp: '妹さんは何が好きですか。', id: 'Adikmu suka apa?' },
      { speaker: '女', jp: '音楽が好きです。', id: 'Suka musik.' },
      { speaker: '男', jp: 'じゃ、CDはどうですか。', id: 'Kalau CD bagaimana?' },
      { speaker: '女', jp: 'いいですね。そうします。', id: 'Bagus. Saya lakukan itu.' },
    ],
    translation:
      'Perempuan ingin memberi hadiah ulang tahun untuk adiknya yang suka musik. Laki-laki menyarankan CD, dan perempuan setuju.',
    notes: ['誕生日 — ulang tahun', 'あげます — memberi', 'どうですか — bagaimana'],
    questions: [
      {
        q: '妹は何が好きですか。',
        options: ['スポーツ', '音楽', '料理', '映画'],
        answer: 1,
        explanation: 'Dikatakan 「音楽が 好きです」.',
      },
      {
        q: '女の人は何をあげますか。',
        options: ['CD', '本', '服', '花'],
        answer: 0,
        explanation: 'Setelah saran CD, dia berkata 「そうします」.',
      },
    ],
  },
  {
    id: 'l12',
    title: '旅行の計画',
    topic: 'perjalanan',
    lines: [
      { speaker: '男', jp: '夏休みにどこか行きますか。', id: 'Libur musim panas pergi ke suatu tempat?' },
      { speaker: '女', jp: 'ええ、北海道へ行くつもりです。', id: 'Ya, saya berniat ke Hokkaido.' },
      { speaker: '男', jp: 'いいですね。何で行きますか。', id: 'Bagus ya. Naik apa?' },
      { speaker: '女', jp: '飛行機で行きます。安いチケットを買いました。', id: 'Naik pesawat. Saya sudah beli tiket murah.' },
      { speaker: '男', jp: '北海道は夏も涼しいですよ。', id: 'Hokkaido musim panas pun sejuk, lho.' },
    ],
    translation:
      'Perempuan berencana ke Hokkaido pada libur musim panas dengan pesawat karena sudah membeli tiket murah. Laki-laki mengatakan Hokkaido sejuk bahkan di musim panas.',
    notes: ['つもり — berniat', '飛行機 — pesawat', '涼しい — sejuk'],
    questions: [
      {
        q: '女の人はどこへ行くつもりですか。',
        options: ['東京', '大阪', '北海道', '京都'],
        answer: 2,
        explanation: 'Dikatakan 「北海道へ 行くつもりです」.',
      },
      {
        q: '何で行きますか。',
        options: ['電車', '車', '船', '飛行機'],
        answer: 3,
        explanation: 'Dikatakan 「飛行機で 行きます」.',
      },
    ],
  },
  {
    id: 'l13',
    title: '郵便局で',
    topic: 'pengiriman',
    lines: [
      { speaker: '客', jp: 'この荷物をインドネシアへ送りたいんですが。', id: 'Saya ingin mengirim paket ini ke Indonesia.' },
      { speaker: '局員', jp: '船便と航空便がありますが、どちらにしますか。', id: 'Ada kiriman laut dan udara. Mau yang mana?' },
      { speaker: '客', jp: '早いほうがいいです。', id: 'Yang cepat lebih baik.' },
      { speaker: '局員', jp: 'じゃ、航空便ですね。三千円です。', id: 'Kalau begitu udara, ya. Tiga ribu yen.' },
      { speaker: '客', jp: 'お願いします。', id: 'Tolong.' },
    ],
    translation:
      'Pelanggan ingin mengirim paket ke Indonesia. Karena ingin cepat, ia memilih kiriman udara seharga 3000 yen.',
    notes: ['荷物 — paket/barang', '船便 — kiriman laut', '航空便 — kiriman udara'],
    questions: [
      {
        q: '客はどこへ荷物を送りますか。',
        options: ['日本', 'インドネシア', '中国', 'アメリカ'],
        answer: 1,
        explanation: 'Dikatakan 「インドネシアへ 送りたい」.',
      },
      {
        q: 'どの便にしますか。',
        options: ['船便', '航空便', 'どちらも', '送らない'],
        answer: 1,
        explanation: 'Karena ingin cepat, dipilih 「航空便」.',
      },
    ],
  },
  {
    id: 'l14',
    title: '図書館で',
    topic: 'perpustakaan',
    lines: [
      { speaker: '学生', jp: 'すみません、この本を借りたいです。', id: 'Permisi, saya ingin meminjam buku ini.' },
      { speaker: '係員', jp: '学生ですか。', id: 'Apakah mahasiswa?' },
      { speaker: '学生', jp: 'はい。', id: 'Ya.' },
      { speaker: '係員', jp: 'では、二週間借りられます。返す日はこの紙に書いてあります。', id: 'Kalau begitu bisa dipinjam dua minggu. Tanggal pengembalian ada di kertas ini.' },
      { speaker: '学生', jp: 'わかりました。ありがとうございます。', id: 'Mengerti. Terima kasih.' },
    ],
    translation:
      'Seorang mahasiswa meminjam buku. Karena mahasiswa, ia boleh meminjam selama dua minggu; tanggal pengembalian tertulis di kertas.',
    notes: ['借ります — meminjam', '二週間 — dua minggu', '返す — mengembalikan'],
    questions: [
      {
        q: '本は何週間借りられますか。',
        options: ['一週間', '二週間', '三週間', '一か月'],
        answer: 1,
        explanation: 'Dikatakan 「二週間 借りられます」.',
      },
      {
        q: '返す日はどこに書いてありますか。',
        options: ['本の中', 'この紙', '学生証', 'かばん'],
        answer: 1,
        explanation: 'Dikatakan 「この 紙に 書いて あります」.',
      },
    ],
  },
  {
    id: 'l15',
    title: '待ち合わせ',
    topic: 'janji',
    lines: [
      { speaker: '女', jp: '明日のパーティー、何時に行きますか。', id: 'Pesta besok, pergi jam berapa?' },
      { speaker: '男', jp: '七時ごろ行くつもりです。', id: 'Saya berniat pergi sekitar jam tujuh.' },
      { speaker: '女', jp: 'わたしも七時ごろ行きます。駅で待ち合わせましょうか。', id: 'Saya juga sekitar jam tujuh. Mau janjian di stasiun?' },
      { speaker: '男', jp: 'いいですね。じゃ、六時五十分に駅の南口で。', id: 'Bagus. Kalau begitu jam 6.50 di pintu selatan stasiun.' },
      { speaker: '女', jp: 'わかりました。遅れないでくださいね。', id: 'Baik. Jangan terlambat, ya.' },
    ],
    translation:
      'Mereka akan pergi ke pesta sekitar jam tujuh. Mereka janjian bertemu jam 6.50 di pintu selatan stasiun.',
    notes: ['待ち合わせ — janjian bertemu', '南口 — pintu selatan', '遅れないで — jangan terlambat'],
    questions: [
      {
        q: '二人は何時にどこで会いますか。',
        options: ['六時五十分に南口', '七時に南口', '六時五十分に北口', '七時に駅の中'],
        answer: 0,
        explanation: 'Dikatakan 「六時五十分に 駅の 南口で」.',
      },
      {
        q: '二人はどこへ行きますか。',
        options: ['映画館', 'パーティー', '学校', 'レストラン'],
        answer: 1,
        explanation: 'Konteksnya 「明日の パーティー」.',
      },
    ],
  },
  {
    id: 'l16',
    title: '会社で',
    topic: 'kerja',
    lines: [
      { speaker: '部長', jp: 'アニさん、明日の会議は何時からですか。', id: 'Ani, rapat besok mulai jam berapa?' },
      { speaker: 'アニ', jp: '十時からです。資料はもう準備しました。', id: 'Dari jam sepuluh. Materinya sudah saya siapkan.' },
      { speaker: '部長', jp: 'ありがとう。会議の前に少し話せますか。', id: 'Terima kasih. Bisa bicara sebentar sebelum rapat?' },
      { speaker: 'アニ', jp: 'はい、九時半はいかがですか。', id: 'Ya, bagaimana jam setengah sepuluh?' },
      { speaker: '部長', jp: 'いいですね。じゃ、九時半に。', id: 'Bagus. Kalau begitu jam 9.30.' },
    ],
    translation:
      'Rapat besok jam sepuluh. Ani sudah menyiapkan materi. Ia dan atasannya akan berbicara sebentar jam 9.30 sebelum rapat.',
    notes: ['会議 — rapat', '資料 — materi', '準備しました — sudah menyiapkan'],
    questions: [
      {
        q: '会議は何時からですか。',
        options: ['九時', '九時半', '十時', '十時半'],
        answer: 2,
        explanation: 'Dikatakan 「十時からです」.',
      },
      {
        q: '会議の前に何をしますか。',
        options: ['資料を作る', '部長と話す', '昼ご飯を食べる', '電話する'],
        answer: 1,
        explanation: 'Atasan bertanya 「会議の 前に 少し 話せますか」 dan mereka sepakat jam 9.30.',
      },
    ],
  },
];
