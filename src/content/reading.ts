export type ReadingQuestion = { q: string; options: string[]; answer: number; explanation: string };
export type ReadingPassage = {
  id: string;
  title: string;
  topic: string;
  text: string;
  translation: string;
  notes?: string[];
  questions: ReadingQuestion[];
};

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'r01',
    title: '私の一日',
    topic: 'kehidupan sehari-hari',
    text: 'わたしは まいあさ 六時に おきます。あさごはんを 食べてから、でんしゃで 学校へ 行きます。学校は 八時半に 始まります。午後は 図書館で 勉強します。うちへ 帰ってから、ばんごはんを 作ります。十一時に ねます。',
    translation:
      'Saya bangun jam enam setiap pagi. Setelah makan pagi, saya pergi ke sekolah dengan kereta. Sekolah mulai jam setengah sembilan. Sore hari saya belajar di perpustakaan. Setelah pulang ke rumah, saya memasak makan malam. Saya tidur jam sebelas.',
    notes: ['起きます — bangun', '始まります — dimulai', '帰ってから — setelah pulang'],
    questions: [
      {
        q: '何で学校へ行きますか。',
        options: ['電車', 'バス', '自転車', '歩いて'],
        answer: 0,
        explanation: 'Teks menyebut 「でんしゃで 学校へ 行きます」 = pergi ke sekolah dengan kereta.',
      },
      {
        q: 'どこで勉強しますか。',
        options: ['図書館', '学校', '家', '公園'],
        answer: 0,
        explanation: 'Teks menyebut 「午後は 図書館で 勉強します」 = sore belajar di perpustakaan.',
      },
    ],
  },
  {
    id: 'r02',
    title: 'わたしの家族',
    topic: 'keluarga',
    text: 'わたしの 家族は 四人です。父と 母と 妹と わたしです。父は 会社員で、母は 先生です。妹は 高校生です。妹は 音楽が 好きで、まいばん ギターを れんしゅうします。日曜日は みんなで ばんごはんを 食べます。',
    translation:
      'Keluarga saya ada empat orang. Ayah, ibu, adik perempuan, dan saya. Ayah seorang karyawan, ibu seorang guru. Adik saya siswa SMA. Adik suka musik dan setiap malam berlatih gitar. Hari Minggu kami makan malam bersama.',
    notes: ['妹 — adik perempuan', 'まいばん — setiap malam', 'みんなで — bersama-sama'],
    questions: [
      {
        q: '家族は何人ですか。',
        options: ['三人', '四人', '五人', '二人'],
        answer: 1,
        explanation: 'Teks menyebut 「家族は 四人です」 = keluarganya empat orang.',
      },
      {
        q: '妹は何を練習しますか。',
        options: ['ピアノ', 'ギター', '歌', 'ダンス'],
        answer: 1,
        explanation: 'Teks menyebut 「ギターを れんしゅうします」 = berlatih gitar.',
      },
    ],
  },
  {
    id: 'r03',
    title: '私の部屋',
    topic: 'tempat tinggal',
    text: 'わたしの 部屋は あまり 大きくないです。でも、明るくて きれいです。まどの そばに つくえが あります。つくえの 上に パソコンと 本が あります。ベッドの よこに 小さい 本棚が あります。本棚には 日本語の 本が たくさん あります。',
    translation:
      'Kamar saya tidak terlalu besar. Tetapi terang dan rapi. Di dekat jendela ada meja. Di atas meja ada komputer dan buku. Di samping tempat tidur ada rak buku kecil. Di rak buku ada banyak buku bahasa Jepang.',
    notes: ['そば — dekat/samping', 'よこ — samping', '本棚 — rak buku'],
    questions: [
      {
        q: '部屋はどんな部屋ですか。',
        options: ['大きくて明るい', '小さくて暗い', '明るくてきれい', '広くて新しい'],
        answer: 2,
        explanation: 'Teks menyebut 「明るくて きれいです」 = terang dan rapi.',
      },
      {
        q: '本棚はどこにありますか。',
        options: ['つくえの上', 'ベッドのよこ', 'まどのそば', 'ドアの前'],
        answer: 1,
        explanation: 'Teks menyebut 「ベッドの よこに 小さい 本棚が あります」.',
      },
    ],
  },
  {
    id: 'r04',
    title: '買い物',
    topic: 'belanja',
    text: 'きのう デパートへ 行きました。さいふを 買いたかったですが、高かったですから、買いませんでした。それから、本屋で 日本語の 辞書を 買いました。三千円でした。デパートの 中に 安い レストランが あったので、そこで 昼ご飯を 食べました。',
    translation:
      'Kemarin saya pergi ke department store. Saya ingin membeli dompet, tetapi karena mahal, saya tidak membelinya. Setelah itu, di toko buku saya membeli kamus bahasa Jepang. Harganya 3000 yen. Karena di dalam department store ada restoran murah, saya makan siang di sana.',
    notes: ['買いたかった — ingin membeli (lampau)', '高かった — mahal (lampau)', '辞書 — kamus'],
    questions: [
      {
        q: '何を買いましたか。',
        options: ['財布', '辞書', '本屋', '昼ご飯'],
        answer: 1,
        explanation: 'Teks menyebut 「本屋で 日本語の 辞書を 買いました」 = membeli kamus.',
      },
      {
        q: 'なぜ財布を買いませんでしたか。',
        options: ['安かったから', '大きかったから', '高かったから', 'なかったから'],
        answer: 2,
        explanation: 'Teks menyebut 「高かったですから、買いませんでした」 = karena mahal.',
      },
    ],
  },
  {
    id: 'r05',
    title: '週末',
    topic: 'akhir pekan',
    text: '土曜日は 友達と 映画を 見ました。映画は とても 面白かったです。それから、喫茶店で コーヒーを 飲みながら、一時間ぐらい 話しました。日曜日は 家で ゆっくり 休みました。午後から 掃除を して、晩ご飯を 作りました。',
    translation:
      'Hari Sabtu saya menonton film dengan teman. Filmnya sangat menarik. Setelah itu, sambil minum kopi di kedai kopi, kami berbicara sekitar satu jam. Hari Minggu saya beristirahat santai di rumah. Mulai sore saya bersih-bersih dan memasak makan malam.',
    notes: ['飲みながら — sambil minum', 'ゆっくり — santai', '掃除 — bersih-bersih'],
    questions: [
      {
        q: '土曜日に何をしましたか。',
        options: ['映画を見た', '掃除をした', '料理を作った', '勉強した'],
        answer: 0,
        explanation: 'Teks menyebut 「土曜日は 友達と 映画を 見ました」.',
      },
      {
        q: '日曜日の午後から何をしましたか。',
        options: ['映画を見た', '友達と話した', '掃除をして晩ご飯を作った', '買い物をした'],
        answer: 2,
        explanation: 'Teks menyebut 「午後から 掃除を して、晩ご飯を 作りました」.',
      },
    ],
  },
  {
    id: 'r06',
    title: 'わたしの学校',
    topic: 'sekolah',
    text: 'わたしの 学校は 駅から 近いです。歩いて 五分ぐらいです。学校に 学生が 三百人ぐらい います。日本語の クラスは 毎日 八時半に 始まって、十二時に 終わります。先生は とても 親切です。クラスで よく 会話の 練習を します。',
    translation:
      'Sekolah saya dekat dari stasiun. Sekitar lima menit berjalan kaki. Di sekolah ada sekitar 300 siswa. Kelas bahasa Jepang mulai setiap hari jam setengah sembilan dan selesai jam dua belas. Gurunya sangat ramah. Di kelas kami sering berlatih percakapan.',
    notes: ['近い — dekat', '三百人 — 300 orang', '親切 — ramah'],
    questions: [
      {
        q: '学校は駅からどのくらいですか。',
        options: ['五分', '十分', '三十分', '一時間'],
        answer: 0,
        explanation: 'Teks menyebut 「歩いて 五分ぐらいです」 = sekitar lima menit jalan kaki.',
      },
      {
        q: '日本語のクラスは何時に終わりますか。',
        options: ['八時半', '十二時', '五時', '三時'],
        answer: 1,
        explanation: 'Teks menyebut 「十二時に 終わります」 = selesai jam dua belas.',
      },
    ],
  },
  {
    id: 'r07',
    title: '日本の四季',
    topic: 'alam',
    text: '日本には 春、夏、秋、冬の 四つの 季節が あります。春は 桜が きれいです。夏は 暑くて、よく 雨が 降ります。秋は 空が 青くて、食べ物が おいしいです。冬は 寒くて、北の 地方では 雪が たくさん 降ります。わたしは 秋が いちばん 好きです。',
    translation:
      'Di Jepang ada empat musim: semi, panas, gugur, dan dingin. Musim semi bunga sakuranya indah. Musim panas panas dan sering hujan. Musim gugur langitnya biru dan makanannya enak. Musim dingin dingin, dan di daerah utara banyak turun salju. Saya paling suka musim gugur.',
    notes: ['四季 — empat musim', '降ります — turun (hujan/salju)', '地方 — daerah'],
    questions: [
      {
        q: 'いつ桜がきれいですか。',
        options: ['春', '夏', '秋', '冬'],
        answer: 0,
        explanation: 'Teks menyebut 「春は 桜が きれいです」.',
      },
      {
        q: '話し手がいちばん好きな季節はどれですか。',
        options: ['春', '夏', '秋', '冬'],
        answer: 2,
        explanation: 'Teks menyebut 「わたしは 秋が いちばん 好きです」.',
      },
    ],
  },
  {
    id: 'r08',
    title: '京都旅行',
    topic: 'perjalanan',
    text: '先月、家族と 京都へ 行きました。新幹線で 二時間半 かかりました。京都には 古い お寺や 神社が たくさん あります。わたしたちは 有名な お寺を 見て、写真を 撮りました。夜は 旅館に 泊まって、日本の 料理を 食べました。とても 楽しい 旅行でした。',
    translation:
      'Bulan lalu saya pergi ke Kyoto dengan keluarga. Dengan shinkansen memakan waktu dua setengah jam. Di Kyoto ada banyak kuil dan jinja tua. Kami melihat kuil terkenal dan memotret. Malamnya kami menginap di ryokan dan makan masakan Jepang. Perjalanan yang sangat menyenangkan.',
    notes: ['先月 — bulan lalu', 'お寺 — kuil', '旅館 — penginapan tradisional'],
    questions: [
      {
        q: '何で京都へ行きましたか。',
        options: ['バス', '車', '新幹線', '飛行機'],
        answer: 2,
        explanation: 'Teks menyebut 「新幹線で 二時間半 かかりました」.',
      },
      {
        q: '夜は何をしましたか。',
        options: ['お寺を見た', '旅館に泊まった', '買い物をした', '映画を見た'],
        answer: 1,
        explanation: 'Teks menyebut 「夜は 旅館に 泊まって、日本の 料理を 食べました」.',
      },
    ],
  },
  {
    id: 'r09',
    title: 'わたしの料理',
    topic: 'makanan',
    text: 'わたしは 毎日 自分で 料理を します。日本の 料理が 好きなので、よく 作ります。いちばん 上手な 料理は カレーです。野菜と 肉を 切って、いためてから、水を 入れて 三十分ぐらい 煮ます。友達が 来た ときは、いつも カレーを 作ります。',
    translation:
      'Saya memasak sendiri setiap hari. Karena suka masakan Jepang, saya sering memasaknya. Masakan yang paling saya kuasai adalah kari. Sayur dan daging dipotong, ditumis, lalu diberi air dan direbus sekitar tiga puluh menit. Setiap kali teman datang, saya selalu membuat kari.',
    notes: ['自分で — sendiri', 'いためて — menumis', '煮ます — merebus'],
    questions: [
      {
        q: 'いちばん上手な料理は何ですか。',
        options: ['寿司', '天ぷら', 'カレー', 'ラーメン'],
        answer: 2,
        explanation: 'Teks menyebut 「いちばん 上手な 料理は カレーです」.',
      },
      {
        q: '友達が来たとき、何をしますか。',
        options: ['寿司を作る', 'カレーを作る', 'レストランへ行く', '掃除をする'],
        answer: 1,
        explanation: 'Teks menyebut 「友達が 来た ときは、いつも カレーを 作ります」.',
      },
    ],
  },
  {
    id: 'r10',
    title: 'うちの猫',
    topic: 'hewan',
    text: 'わたしの 家には 猫が 二匹 います。名前は ミミと クロです。ミミは 白くて、クロは 黒いです。ミミは 人が 好きですが、クロは 少し 怖がりです。毎晩、二匹は わたしの ベッドの 上で 寝ます。とても かわいいです。',
    translation:
      'Di rumah saya ada dua ekor kucing. Namanya Mimi dan Kuro. Mimi putih, Kuro hitam. Mimi suka orang, tetapi Kuro sedikit penakut. Setiap malam kedua kucing tidur di atas tempat tidur saya. Sangat lucu.',
    notes: ['二匹 — dua ekor', '怖がり — penakut', '毎晩 — setiap malam'],
    questions: [
      {
        q: '猫は何匹いますか。',
        options: ['一匹', '二匹', '三匹', '四匹'],
        answer: 1,
        explanation: 'Teks menyebut 「猫が 二匹 います」.',
      },
      {
        q: 'クロはどんな猫ですか。',
        options: ['白い', '人が好き', '少し怖がり', '大きい'],
        answer: 2,
        explanation: 'Teks menyebut 「クロは 少し 怖がりです」.',
      },
    ],
  },
  {
    id: 'r11',
    title: 'アルバイト',
    topic: 'kerja sambilan',
    text: 'わたしは 大学の 学生です。毎日 学校で 日本語を 勉強しています。週に 三回、コンビニで アルバイトを しています。夕方 五時から 九時まで 働きます。アルバイトの お金で 本や 音楽の CDを 買います。少し 疲れますが、楽しいです。',
    translation:
      'Saya mahasiswa. Setiap hari saya belajar bahasa Jepang di kampus. Tiga kali seminggu saya bekerja paruh waktu di minimarket. Saya bekerja dari jam lima sore sampai jam sembilan. Dengan uang hasil kerja, saya membeli buku dan CD musik. Sedikit lelah, tetapi menyenangkan.',
    notes: ['週に三回 — tiga kali seminggu', '働きます — bekerja', '疲れます — lelah'],
    questions: [
      {
        q: '週に何回アルバイトをしますか。',
        options: ['二回', '三回', '四回', '毎日'],
        answer: 1,
        explanation: 'Teks menyebut 「週に 三回、コンビニで アルバイトを しています」.',
      },
      {
        q: 'アルバイトのお金で何を買いますか。',
        options: ['服', '本やCD', '食べ物', 'パソコン'],
        answer: 1,
        explanation: 'Teks menyebut 「本や 音楽の CDを 買います」.',
      },
    ],
  },
  {
    id: 'r12',
    title: '病院で',
    topic: 'kesehatan',
    text: 'きのうから 頭が 痛くて、熱も ありました。それで、今日 病院へ 行きました。医者は「風邪です。薬を 飲んで、ゆっくり 休んでください」と 言いました。わたしは 薬を もらって、家へ 帰りました。今日は 学校を 休みました。',
    translation:
      'Sejak kemarin kepala saya sakit dan juga demam. Karena itu, hari ini saya pergi ke rumah sakit. Dokter berkata, "Ini flu. Minum obat dan istirahatlah dengan tenang." Saya menerima obat lalu pulang ke rumah. Hari ini saya tidak masuk sekolah.',
    notes: ['頭が痛い — kepala sakit', '熱 — demam', '薬 — obat'],
    questions: [
      {
        q: 'どうして病院へ行きましたか。',
        options: ['頭が痛くて熱があったから', 'お腹が痛かったから', 'けがをしたから', '目が痛かったから'],
        answer: 0,
        explanation: 'Teks menyebut 「頭が 痛くて、熱も ありました」 sebagai alasan ke rumah sakit.',
      },
      {
        q: '医者は何と言いましたか。',
        options: ['学校へ行ってください', '薬を飲んで休んでください', '働いてください', '散歩してください'],
        answer: 1,
        explanation: 'Teks menyebut 「薬を 飲んで、ゆっくり 休んでください」.',
      },
    ],
  },
  {
    id: 'r13',
    title: '駅への道',
    topic: 'arah',
    text: 'すみません、東京駅へ 行きたいんですが、どうやって 行きますか。この 道を まっすぐ 行って、二つ目の 信号を 右に 曲がってください。すると、駅の 入口が 見えます。歩いて 十分ぐらいです。バスも ありますが、今日は 道が 込んでいますから、電車が いいですよ。',
    translation:
      'Permisi, saya ingin pergi ke Stasiun Tokyo, bagaimana caranya? Jalan terus di jalan ini, lalu belok kanan di lampu lalu lintas kedua. Maka pintu masuk stasiun akan terlihat. Sekitar sepuluh menit jalan kaki. Ada bus juga, tetapi hari ini jalanan macet, jadi lebih baik naik kereta.',
    notes: ['まっすぐ — lurus', '信号 — lampu lalu lintas', '込んでいます — macet'],
    questions: [
      {
        q: '駅までどうやって行きますか。',
        options: ['まっすぐ行って二つ目の信号を右に曲がる', '左に曲がる', 'バスに乗る', '電車に乗る'],
        answer: 0,
        explanation: 'Petunjuknya: jalan lurus lalu belok kanan di lampu kedua.',
      },
      {
        q: '今日は何がいいですか。',
        options: ['バス', 'タクシー', '電車', '自転車'],
        answer: 2,
        explanation: 'Teks menyebut 「道が 込んでいますから、電車が いいですよ」.',
      },
    ],
  },
  {
    id: 'r14',
    title: '誕生日',
    topic: 'acara',
    text: '昨日は わたしの 誕生日でした。友達が 家に 来て、パーティーを しました。母が 作った ケーキを みんなで 食べました。友達から 花と 本を もらいました。それから、みんなで ゲームを して、十一時まで 話しました。とても 嬉しかったです。',
    translation:
      'Kemarin adalah ulang tahun saya. Teman-teman datang ke rumah dan kami berpesta. Kami semua makan kue buatan ibu. Saya menerima bunga dan buku dari teman. Setelah itu, kami bermain game bersama dan berbicara sampai jam sebelas. Saya sangat senang.',
    notes: ['誕生日 — ulang tahun', 'もらいました — menerima', '嬉しい — senang'],
    questions: [
      {
        q: '昨日何をしましたか。',
        options: ['誕生日パーティーをした', '旅行をした', '映画を見た', '買い物をした'],
        answer: 0,
        explanation: 'Teks menyebut 「友達が 家に 来て、パーティーを しました」.',
      },
      {
        q: '友達から何をもらいましたか。',
        options: ['ケーキと花', '花と本', '本とCD', '服と花'],
        answer: 1,
        explanation: 'Teks menyebut 「友達から 花と 本を もらいました」.',
      },
    ],
  },
  {
    id: 'r15',
    title: 'わたしの趣味',
    topic: 'hobi',
    text: 'わたしの 趣味は 写真を 撮る ことです。休みの 日は カメラを 持って、いろいろな 所へ 行きます。花や 山や 町の 写真を 撮ります。先週は 公園で 桜の 写真を 撮りました。今、その 写真を 部屋に 飾っています。将来は 写真家に なりたいです。',
    translation:
      'Hobi saya adalah memotret. Pada hari libur saya membawa kamera dan pergi ke berbagai tempat. Saya memotret bunga, gunung, dan kota. Minggu lalu saya memotret sakura di taman. Sekarang foto itu saya pajang di kamar. Di masa depan saya ingin menjadi fotografer.',
    notes: ['趣味 — hobi', '飾っています — memajang', '将来 — masa depan'],
    questions: [
      {
        q: '趣味は何ですか。',
        options: ['写真を撮ること', '絵を描くこと', '山に登ること', '音楽を聞くこと'],
        answer: 0,
        explanation: 'Teks menyebut 「趣味は 写真を 撮る ことです」.',
      },
      {
        q: '将来何になりたいですか。',
        options: ['先生', '写真家', '医者', '会社員'],
        answer: 1,
        explanation: 'Teks menyebut 「将来は 写真家に なりたいです」.',
      },
    ],
  },
  {
    id: 'r16',
    title: '日本の生活',
    topic: 'kehidupan di Jepang',
    text: 'わたしは 去年 インドネシアから 日本へ 来ました。今は 東京の 小さい アパートに 住んでいます。日本の 生活は とても 忙しいですが、面白いです。まだ 日本語が あまり 上手じゃありませんから、毎日 一時間 勉強しています。来年は 日本の 会社で 働く つもりです。',
    translation:
      'Saya datang dari Indonesia ke Jepang tahun lalu. Sekarang saya tinggal di apartemen kecil di Tokyo. Kehidupan di Jepang sangat sibuk, tetapi menarik. Karena bahasa Jepang saya belum begitu bagus, saya belajar satu jam setiap hari. Tahun depan saya berniat bekerja di perusahaan Jepang.',
    notes: ['去年 — tahun lalu', '住んでいます — tinggal', '働くつもり — berniat bekerja'],
    questions: [
      {
        q: 'いつ日本へ来ましたか。',
        options: ['去年', '今年', '先月', '三年前'],
        answer: 0,
        explanation: 'Teks menyebut 「去年 インドネシアから 日本へ 来ました」.',
      },
      {
        q: '今どこに住んでいますか。',
        options: ['東京のアパート', '大阪の家', '学校の寮', '京都の旅館'],
        answer: 0,
        explanation: 'Teks menyebut 「東京の 小さい アパートに 住んでいます」.',
      },
    ],
  },
  {
    id: 'r17',
    title: 'メール',
    topic: 'komunikasi',
    text: '田中さん、こんにちは。わたしは アニです。明日の パーティーは 何時に 始まりますか。わたしは 六時ごろ 行きます。何か 持って 行きましょうか。ケーキを 作る ことが できますから、ケーキを 持って 行きます。じゃ、また 明日。',
    translation:
      'Tanaka-san, halo. Saya Ani. Pesta besok mulai jam berapa? Saya akan datang sekitar jam enam. Apakah saya perlu membawa sesuatu? Karena saya bisa membuat kue, saya akan membawa kue. Sampai jumpa besok.',
    notes: ['何時 — jam berapa', '持って行く — membawa pergi', 'ことができる — bisa'],
    questions: [
      {
        q: 'アニさんは何を持って行きますか。',
        options: ['ケーキ', '飲み物', '花', '本'],
        answer: 0,
        explanation: 'Teks menyebut 「ケーキを 持って 行きます」.',
      },
      {
        q: '何時にパーティーへ行きますか。',
        options: ['五時ごろ', '六時ごろ', '七時ごろ', '八時ごろ'],
        answer: 1,
        explanation: 'Teks menyebut 「六時ごろ 行きます」.',
      },
    ],
  },
  {
    id: 'r18',
    title: '天気予報',
    topic: 'cuaca',
    text: '今日の 天気です。午前中は 晴れですが、午後から 雲が 多くなって、夜には 雨が 降るでしょう。気温は 二十度ぐらいで、あまり 暑くないです。明日は 朝から 雨で、昼ごろ 止むでしょう。出かける ときは 傘を 持って 行ってください。',
    translation:
      'Ramalan cuaca hari ini. Pagi cerah, tetapi mulai sore awan bertambah dan malamnya kemungkinan hujan. Suhu sekitar 20 derajat, tidak terlalu panas. Besok pagi hujan dan sekitar siang kemungkinan berhenti. Saat keluar rumah, bawalah payung.',
    notes: ['午前中 — sepanjang pagi', '気温 — suhu', '止む — berhenti'],
    questions: [
      {
        q: '夜の天気はどうなりますか。',
        options: ['晴れ', '雨', '雪', '風'],
        answer: 1,
        explanation: 'Teks menyebut 「夜には 雨が 降るでしょう」.',
      },
      {
        q: '明日の朝はどうですか。',
        options: ['晴れ', '雨', '雪', '曇り'],
        answer: 1,
        explanation: 'Teks menyebut 「明日は 朝から 雨で」.',
      },
    ],
  },
];
