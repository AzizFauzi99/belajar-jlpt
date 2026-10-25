// 80 poin tata bahasa JLPT N5.
// Format: pola|arti|bentuk|penjelasan|contoh1|arti1|contoh2|arti2|soal isian|pilihan|jawaban|kategori
const RAW = `
は|topik kalimat|N は N です|Menandai topik yang sedang dibicarakan. Dibaca "wa".|私は学生です。|Saya pelajar.|これは本です。|Ini buku.|私___学生です。|は,が,を,に|は|partikel
も|juga|N も|Menyatakan hal yang sama berlaku untuk hal lain.|田中さんは学生です。私も学生です。|Tanaka pelajar. Saya juga pelajar.|これも本です。|Ini juga buku.|私は学生です。妹___学生です。|も,は,が,を|も|partikel
の|milik, penghubung|N の N|Menghubungkan dua kata benda; menyatakan kepemilikan atau atribut.|これは私の本です。|Ini buku saya.|日本の車はいいです。|Mobil Jepang bagus.|これ___私の本です。|の,は,が,に|の|partikel
が|subjek|N が|Menandai subjek, terutama untuk informasi baru atau jawaban.|誰が来ましたか。|Siapa yang datang?|部屋に猫がいます。|Di kamar ada kucing.|部屋に猫___います。|が,は,を,で|が|partikel
を|objek|N を V|Menandai objek langsung dari verba.|毎朝、パンを食べます。|Setiap pagi saya makan roti.|本を読みます。|Saya membaca buku.|毎朝、パン___食べます。|を,が,は,に|を|partikel
に|waktu|waktu に|Menunjukkan titik waktu yang spesifik.|七時に起きます。|Saya bangun jam tujuh.|日曜日に会いましょう。|Ayo bertemu hari Minggu.|七時___起きます。|に,で,を,へ|に|partikel
に|tempat keberadaan|tempat に N が あります/います|Menunjukkan tempat keberadaan benda atau makhluk.|机の上に本があります。|Di atas meja ada buku.|公園に子供がいます。|Di taman ada anak-anak.|机の上___本があります。|に,で,を,から|に|partikel
で|tempat aktivitas|tempat で V|Menunjukkan tempat berlangsungnya aktivitas.|図書館で勉強します。|Saya belajar di perpustakaan.|日本で働きたいです。|Saya ingin bekerja di Jepang.|図書館___勉強します。|で,に,を,が|で|partikel
で|alat, cara|alat で V|Menunjukkan alat atau cara yang dipakai.|ペンで名前を書きます。|Saya menulis nama dengan pena.|電車で行きます。|Pergi dengan kereta.|ペン___名前を書きます。|で,に,を,から|で|partikel
へ|arah|tempat へ V|Menunjukkan arah perpindahan. Dibaca "e".|明日、東京へ行きます。|Besok saya pergi ke Tokyo.|家へ帰ります。|Saya pulang ke rumah.|明日、東京___行きます。|へ,を,が,と|へ|partikel
から|dari, mulai|waktu/tempat から|Menunjukkan titik awal waktu atau tempat.|授業は九時から始まります。|Kelas mulai jam sembilan.|インドネシアから来ました。|Saya datang dari Indonesia.|授業は九時___始まります。|から,まで,に,で|から|partikel
まで|sampai|waktu/tempat まで|Menunjukkan titik akhir waktu atau tempat.|駅まで歩いて行きます。|Saya berjalan sampai stasiun.|五時まで働きます。|Saya bekerja sampai jam lima.|駅___歩いて行きます。|まで,から,に,で|まで|partikel
と|dan, dengan|N と N / orang と V|Menghubungkan kata benda atau menyatakan lawan interaksi.|友達と映画を見ます。|Saya menonton film dengan teman.|パンと卵を買いました。|Saya membeli roti dan telur.|友達___映画を見ます。|と,に,を,で|と|partikel
や|dan (sebagian)|N や N など|Menyebutkan beberapa contoh, tidak lengkap.|机の上に本やペンがあります。|Di atas meja ada buku, pena, dan lain-lain.|果物や野菜を食べます。|Saya makan buah dan sayur.|机の上に本___ペンがあります。|や,と,も,が|や|partikel
か|atau, tanya|N か N|Menghubungkan pilihan atau membentuk pertanyaan.|コーヒーかお茶、どちらがいいですか。|Kopi atau teh, mana yang lebih baik?|行きますか。|Apakah kamu pergi?|コーヒー___お茶、どちらがいいですか。|か,と,や,も|か|partikel
ね|konfirmasi|... ね|Meminta persetujuan atau konfirmasi lawan bicara.|今日は暑いですね。|Hari ini panas, ya.|いい天気ですね。|Cuacanya bagus, ya.|今日は暑いです___。|ね,よ,か,の|ね|partikel
よ|penegasan|... よ|Memberi informasi baru atau menegaskan.|あの店は安いですよ。|Toko itu murah, lho.|気をつけてくださいよ。|Hati-hati, ya.|あの店は安いです___。|よ,ね,か,わ|よ|partikel
です|kopula sopan|N/Adj です|Menyatakan "adalah" dalam bentuk sopan.|私は学生です。|Saya pelajar.|この本は面白いです。|Buku ini menarik.|私は学生___。|です,ます,だ,でした|です|bentuk
じゃありません|bukan (sopan)|N じゃありません|Bentuk negatif sopan dari です.|私は先生じゃありません。|Saya bukan guru.|ここは駅じゃありません。|Ini bukan stasiun.|私は先生___。|じゃありません,です,でした,ですか|じゃありません|bentuk
ですか|apakah (sopan)|... ですか|Membentuk pertanyaan sopan.|あなたは学生ですか。|Apakah kamu pelajar?|これは何ですか。|Ini apa?|あなたは学生です___。|か,ね,よ,の|か|bentuk
があります|ada (benda)|tempat に N が あります|Menyatakan keberadaan benda mati.|冷蔵庫に牛乳があります。|Di kulkas ada susu.|時間があります。|Ada waktu.|冷蔵庫に牛乳___。|があります,がいます,をあります,にいます|があります|bentuk
がいます|ada (makhluk)|tempat に N が います|Menyatakan keberadaan orang atau hewan.|公園に子供がいます。|Di taman ada anak-anak.|猫がいます。|Ada kucing.|公園に子供___。|がいます,があります,がいますか,にいます|がいます|bentuk
ください|tolong|N を ください|Meminta benda dengan sopan.|水を一本ください。|Tolong beri satu botol air.|メニューをください。|Tolong beri menunya.|水を一本___。|ください,ましょう,ませんか,たいです|ください|bentuk
ましょう|mari|V-ます ましょう|Mengajak melakukan sesuatu bersama.|一緒に昼ご飯を食べましょう。|Ayo makan siang bersama.|行きましょう。|Ayo pergi.|一緒に昼ご飯を食べ___。|ましょう,ませんか,たい,ください|ましょう|bentuk
ませんか|maukah|V-ます ませんか|Mengajak dengan lebih sopan dan terbuka.|一緒に映画を見ませんか。|Maukah menonton film bersama?|お茶を飲みませんか。|Maukah minum teh?|一緒に映画を見___。|ませんか,ましょう,ました,たい|ませんか|bentuk
ましょうか|bagaimana kalau saya|V-ます ましょうか|Menawarkan bantuan atau mengusulkan tindakan.|荷物を持ちましょうか。|Bagaimana kalau saya bawa barangnya?|窓を開けましょうか。|Bagaimana kalau saya buka jendelanya?|荷物を持ち___。|ましょうか,ませんか,ました,ています|ましょうか|bentuk
たい|ingin|V-ます(buang masu) たい|Menyatakan keinginan pembicara.|日本へ行きたいです。|Saya ingin pergi ke Jepang.|水が飲みたいです。|Saya ingin minum air.|日本へ行き___です。|たい,たく,たかった,たくない|たい|bentuk
たくない|tidak ingin|V-ます たくない|Bentuk negatif dari たい.|今日はどこへも行きたくないです。|Hari ini saya tidak ingin pergi ke mana pun.|肉を食べたくないです。|Saya tidak ingin makan daging.|今日はどこへも行き___です。|たくない,たい,たかった,ません|たくない|bentuk
ている|sedang|V-て いる|Menyatakan aktivitas yang sedang berlangsung atau keadaan.|今、本を読んでいます。|Sekarang saya sedang membaca buku.|東京に住んでいます。|Saya tinggal di Tokyo.|今、本を読ん___。|でいます,ています,てあります,てください|でいます|bentuk
てください|tolong lakukan|V-て ください|Meminta lawan bicara melakukan sesuatu.|ここに名前を書いてください。|Tolong tulis nama di sini.|ゆっくり話してください。|Tolong bicara pelan-pelan.|ここに名前を書い___。|てください,ています,てもいい,てはいけません|てください|bentuk
てもいい|boleh|V-て もいい|Meminta atau memberi izin.|この部屋に入ってもいいですか。|Bolehkah saya masuk ruangan ini?|座ってもいいですか。|Bolehkah saya duduk?|この部屋に入っ___ですか。|てもいい,てはいけない,ている,てください|てもいい|bentuk
てはいけない|tidak boleh|V-て はいけない|Menyatakan larangan.|ここで写真を撮ってはいけません。|Dilarang memotret di sini.|触ってはいけません。|Jangan disentuh.|ここで写真を撮っ___。|てはいけません,てもいいです,てください,ています|てはいけません|bentuk
から|karena|K から|Menyatakan sebab; nada lebih subjektif.|今日は雨ですから、傘を持って行きます。|Karena hari ini hujan, saya membawa payung.|時間がありませんから、急ぎましょう。|Karena tidak ada waktu, ayo cepat.|今日は雨です___、傘を持って行きます。|から,まで,より,ほど|から|penghubung
ので|karena (sopan)|K ので|Menyatakan sebab secara lebih objektif dan sopan.|寒いので、窓を閉めます。|Karena dingin, saya menutup jendela.|用事があるので、帰ります。|Karena ada urusan, saya pulang.|寒い___、窓を閉めます。|ので,のに,でも,より|ので|penghubung
が|tetapi|K が K|Menghubungkan dua klausa yang bertentangan.|この店は安いですが、おいしくないです。|Toko ini murah, tetapi tidak enak.|行きたいですが、時間がありません。|Saya ingin pergi, tetapi tidak ada waktu.|この店は安いです___、おいしくないです。|が,から,ので,と|が|penghubung
けど|tetapi (santai)|K けど|Sama seperti が, tetapi lebih santai.|行きたいですけど、時間がありません。|Saya ingin pergi, tapi tidak ada waktu.|安いですけど、あまりよくないです。|Murah, tapi tidak begitu bagus.|行きたいです___、時間がありません。|けど,から,ので,まで|けど|penghubung
しかし|namun|...。しかし、...|Konjungsi tertulis untuk pertentangan.|この店は安いです。しかし、味はよくないです。|Toko ini murah. Namun, rasanya tidak enak.|雨です。しかし、出かけます。|Hujan. Namun, saya tetap keluar.|この店は安いです。___、味はよくないです。|しかし,だから,それから,そして|しかし|penghubung
それから|setelah itu|...。それから、...|Menambahkan urutan kejadian.|朝ご飯を食べます。それから、学校へ行きます。|Saya makan pagi. Setelah itu, pergi ke sekolah.|掃除をします。それから、洗濯します。|Saya bersih-bersih. Setelah itu, mencuci.|朝ご飯を食べます。___、学校へ行きます。|それから,しかし,でも,だから|それから|penghubung
それに|selain itu|...。それに、...|Menambahkan informasi yang mendukung.|この店は安いです。それに、近いです。|Toko ini murah. Selain itu, dekat.|部屋は広いです。それに、明るいです。|Kamarnya luas. Selain itu, terang.|この店は安いです。___、近いです。|それに,しかし,だから,まで|それに|penghubung
でも|tetapi|...。でも、...|Pertentangan dalam percakapan sehari-hari.|日本語は難しいです。でも、面白いです。|Bahasa Jepang sulit. Tetapi, menarik.|雨です。でも、出かけます。|Hujan. Tapi, saya keluar.|日本語は難しいです。___、面白いです。|でも,だから,それに,そして|でも|penghubung
だから|karena itu|...。だから、...|Menyimpulkan akibat dari sebab sebelumnya.|今日は日曜日です。だから、学校は休みです。|Hari ini Minggu. Karena itu, sekolah libur.|寒いです。だから、コートを着ます。|Dingin. Karena itu, saya memakai mantel.|今日は日曜日です。___、学校は休みです。|だから,しかし,でも,それに|だから|penghubung
どうして|mengapa|どうして ... か|Menanyakan alasan.|どうして日本語を勉強しますか。|Mengapa kamu belajar bahasa Jepang?|どうして泣いていますか。|Mengapa kamu menangis?|___日本語を勉強しますか。|どうして,いつ,どこ,だれ|どうして|tanya
いつ|kapan|いつ ... か|Menanyakan waktu.|いつ日本へ行きますか。|Kapan kamu pergi ke Jepang?|いつ来ましたか。|Kapan kamu datang?|___日本へ行きますか。|いつ,どこ,だれ,なに|いつ|tanya
どこ|di mana|どこ ... か|Menanyakan tempat.|トイレはどこですか。|Di mana toilet?|どこで買いましたか。|Di mana kamu membelinya?|トイレは___ですか。|どこ,いつ,だれ,いくら|どこ|tanya
だれ|siapa|だれ ... か|Menanyakan orang.|あの人はだれですか。|Siapa orang itu?|だれと行きますか。|Pergi dengan siapa?|あの人は___ですか。|だれ,どこ,いつ,なに|だれ|tanya
なに|apa|なに ... か|Menanyakan benda atau hal.|朝ご飯は何を食べましたか。|Apa yang kamu makan untuk sarapan?|何が欲しいですか。|Apa yang kamu inginkan?|朝ご飯は___を食べましたか。|なに,だれ,どこ,いつ|なに|tanya
どれ|yang mana (mandiri)|どれ が ...|Menanyakan pilihan dari tiga atau lebih.|あなたの傘はどれですか。|Payungmu yang mana?|どれがいいですか。|Yang mana yang bagus?|あなたの傘は___ですか。|どれ,どの,どこ,だれ|どれ|tanya
どの|yang mana (atribut)|どの N|Menanyakan pilihan yang diikuti kata benda.|どの電車に乗りますか。|Naik kereta yang mana?|どの本が好きですか。|Buku yang mana yang kamu suka?|___電車に乗りますか。|どの,どれ,どこ,だれ|どの|tanya
いくら|berapa harga|いくら ですか|Menanyakan harga.|このりんごはいくらですか。|Berapa harga apel ini?|全部でいくらですか。|Semuanya berapa?|このりんごは___ですか。|いくら,いくつ,いつ,どこ|いくら|tanya
いくつ|berapa buah|いくつ ありますか|Menanyakan jumlah benda.|りんごはいくつありますか。|Ada berapa apel?|いくつ買いましたか。|Berapa banyak yang kamu beli?|りんごは___ありますか。|いくつ,いくら,いつ,どこ|いくつ|tanya
まえに|sebelum|V-る まえに / N の まえに|Menyatakan tindakan dilakukan sebelum hal lain.|寝るまえに、歯を磨きます。|Sebelum tidur, saya menyikat gigi.|食事のまえに手を洗います。|Sebelum makan, saya mencuci tangan.|寝る___、歯を磨きます。|まえに,あとで,ながら,とき|まえに|keterangan
あとで|setelah|N の あとで / V-た あとで|Menyatakan tindakan dilakukan setelah hal lain.|仕事のあとで、飲みに行きます。|Setelah kerja, saya pergi minum.|食べたあとで、薬を飲みます。|Setelah makan, saya minum obat.|仕事の___、飲みに行きます。|あとで,まえに,ながら,とき|あとで|keterangan
とき|ketika|V/N の とき|Menyatakan waktu terjadinya suatu hal.|子供のとき、よく公園で遊びました。|Waktu kecil, saya sering bermain di taman.|日本へ行くとき、写真を撮ります。|Saat pergi ke Jepang, saya memotret.|子供の___、よく公園で遊びました。|とき,まえ,あと,ながら|とき|keterangan
ながら|sambil|V-ます(buang masu) ながら|Melakukan dua tindakan bersamaan.|音楽を聞きながら勉強します。|Saya belajar sambil mendengarkan musik.|歩きながら話しましょう。|Ayo bicara sambil berjalan.|音楽を聞き___勉強します。|ながら,ながらに,て,たり|ながら|keterangan
ようになる|menjadi bisa|V-る ようになる|Menyatakan perubahan kemampuan atau kebiasaan.|毎日練習して、日本語が話せるようになりました。|Karena latihan setiap hari, saya jadi bisa berbicara bahasa Jepang.|野菜を食べるようになりました。|Saya jadi makan sayur.|毎日練習して、日本語が話せる___。|ようになりました,ことができます,つもりです,かもしれません|ようになりました|bentuk
ことができる|bisa|V-る ことができる|Menyatakan kemampuan melakukan sesuatu.|私は少し日本語を話すことができます。|Saya bisa berbicara sedikit bahasa Jepang.|ここで写真を撮ることができます。|Di sini bisa memotret.|私は少し日本語を話す___。|ことができます,ようになります,つもりです,たいです|ことができます|bentuk
ことがすき|suka melakukan|V-る ことが好き|Menyatakan kesukaan terhadap aktivitas.|私は音楽を聞くことが好きです。|Saya suka mendengarkan musik.|彼は本を読むことが好きです。|Dia suka membaca buku.|私は音楽を聞く___です。|ことが好き,ことがきらい,ことを好き,が好き|ことが好き|bentuk
がほしい|ingin (benda)|N が ほしい|Menyatakan keinginan memiliki benda.|私は新しい車がほしいです。|Saya ingin mobil baru.|時間がほしいです。|Saya ingin waktu.|私は新しい車___。|がほしいです,をほしいです,がたいです,にほしいです|がほしいです|bentuk
より|daripada|A は B より ...|Membandingkan dua hal; A lebih ... daripada B.|今日は昨日より暑いです。|Hari ini lebih panas daripada kemarin.|電車はバスより速いです。|Kereta lebih cepat daripada bus.|今日は昨日___暑いです。|より,ほど,から,まで|より|keterangan
ほど|tidak se-|A は B ほど ...ない|Menyatakan A tidak se- B.|今日は昨日ほど暑くないです。|Hari ini tidak sepanas kemarin.|この店はあの店ほど有名ではないです。|Toko ini tidak seterkenal toko itu.|今日は昨日___暑くないです。|ほど,より,から,まで|ほど|keterangan
くらい|kira-kira|jumlah くらい|Menyatakan perkiraan jumlah atau waktu.|駅まで三十分くらいかかります。|Ke stasiun perlu sekitar tiga puluh menit.|十人くらい来ました。|Sekitar sepuluh orang datang.|駅まで三十分___かかります。|くらい,だけ,しか,など|くらい|keterangan
だけ|hanya|N だけ|Menyatakan batasan; hanya itu.|私はりんごだけ食べました。|Saya hanya makan apel.|一つだけください。|Tolong beri satu saja.|私はりんご___食べました。|だけ,しか,ほど,など|だけ|keterangan
しか|hanya (negatif)|N しか ...ない|Menekankan batasan dengan verba negatif.|お金が百円しかありません。|Uang saya hanya seratus yen.|日本語しか話せません。|Saya hanya bisa bahasa Jepang.|お金が百円___ありません。|しか,だけ,ほど,くらい|しか|keterangan
など|dan lain-lain|N など|Menyebut contoh dan hal lain yang sejenis.|机の上に本やペンなどがあります。|Di atas meja ada buku, pena, dan lain-lain.|果物などが好きです。|Saya suka buah dan sebagainya.|机の上に本やペン___があります。|など,しか,だけ,ほど|など|keterangan
ずつ|masing-masing|jumlah ずつ|Menyatakan pembagian jumlah yang sama.|一人に二枚ずつ配ります。|Saya membagikan dua lembar kepada setiap orang.|毎日少しずつ勉強します。|Setiap hari saya belajar sedikit-sedikit.|一人に二枚___配ります。|ずつ,だけ,しか,より|ずつ|keterangan
もう|sudah|もう V-た|Menyatakan tindakan sudah selesai.|もう昼ご飯を食べましたか。|Apakah kamu sudah makan siang?|もう宿題をしました。|Saya sudah mengerjakan PR.|___昼ご飯を食べましたか。|もう,まだ,また,もっと|もう|keterangan
まだ|belum, masih|まだ V-ていない|Menyatakan belum terjadi atau masih berlangsung.|まだ宿題をしていません。|Saya belum mengerjakan PR.|まだ雨が降っています。|Hujan masih turun.|___宿題をしていません。|まだ,もう,また,いつも|まだ|keterangan
とても|sangat|とても Adj|Menguatkan sifat atau keadaan.|この料理はとてもおいしいです。|Masakan ini sangat enak.|とても疲れました。|Saya sangat lelah.|この料理は___おいしいです。|とても,あまり,ぜんぜん,すこし|とても|keterangan
あまり|tidak terlalu|あまり ...ない|Menyatakan kadar yang rendah dengan bentuk negatif.|この映画はあまり面白くないです。|Film ini tidak terlalu menarik.|お酒はあまり飲みません。|Saya tidak terlalu minum alkohol.|この映画は___面白くないです。|あまり,とても,たくさん,いちばん|あまり|keterangan
たくさん|banyak|たくさん|Menyatakan jumlah banyak.|公園に人がたくさんいます。|Di taman ada banyak orang.|本をたくさん読みました。|Saya membaca banyak buku.|公園に人が___います。|たくさん,あまり,すこし,ぜんぜん|たくさん|keterangan
すこし|sedikit|すこし|Menyatakan jumlah sedikit.|砂糖をすこし入れてください。|Tolong masukkan sedikit gula.|すこし休みましょう。|Ayo istirahat sebentar.|砂糖を___入れてください。|すこし,たくさん,とても,いちばん|すこし|keterangan
いつも|selalu|いつも|Menyatakan kebiasaan yang selalu terjadi.|父はいつも日曜日にゴルフをします。|Ayah selalu bermain golf pada hari Minggu.|いつもこの店で買います。|Saya selalu membeli di toko ini.|父は___日曜日にゴルフをします。|いつも,ときどき,まだ,もう|いつも|keterangan
ときどき|kadang-kadang|ときどき|Menyatakan frekuensi yang tidak tetap.|ときどき映画を見に行きます。|Kadang-kadang saya pergi menonton film.|ときどき日本料理を作ります。|Kadang-kadang saya memasak masakan Jepang.|___映画を見に行きます。|ときどき,いつも,ぜんぜん,もう|ときどき|keterangan
よく|sering|よく|Menyatakan frekuensi tinggi.|私はよくこの店で買い物をします。|Saya sering berbelanja di toko ini.|よく映画を見ます。|Saya sering menonton film.|私は___この店で買い物をします。|よく,あまり,ぜんぜん,まだ|よく|keterangan
ぜんぜん|tidak sama sekali|ぜんぜん ...ない|Menekankan negasi total.|日本語がぜんぜん分かりません。|Saya sama sekali tidak mengerti bahasa Jepang.|お金がぜんぜんありません。|Saya sama sekali tidak punya uang.|日本語が___分かりません。|ぜんぜん,とても,よく,たくさん|ぜんぜん|keterangan
いちばん|paling|いちばん Adj|Menyatakan tingkat paling tinggi.|一年で八月がいちばん暑いです。|Dalam setahun, Agustus paling panas.|この店がいちばん安いです。|Toko ini paling murah.|一年で八月が___暑いです。|いちばん,とても,もっと,たくさん|いちばん|keterangan
もうすぐ|segera|もうすぐ|Menyatakan sesuatu akan terjadi dalam waktu dekat.|もうすぐ夏休みが始まります。|Libur musim panas akan segera dimulai.|もうすぐ五時です。|Sebentar lagi jam lima.|___夏休みが始まります。|もうすぐ,まだ,いつも,たぶん|もうすぐ|keterangan
つもり|berniat|V-る つもりです|Menyatakan rencana atau niat pembicara.|来年、日本へ行くつもりです。|Tahun depan saya berniat pergi ke Jepang.|毎日勉強するつもりです。|Saya berniat belajar setiap hari.|来年、日本へ行く___です。|つもり,たい,つもりだ,でしょう|つもり|modalitas
でしょう|mungkin, kan|... でしょう|Menyatakan dugaan atau meminta persetujuan.|明日は雨でしょう。|Besok mungkin hujan.|これがいいでしょう。|Ini mungkin bagus, kan?|明日は雨___。|でしょう,ですか,ました,ください|でしょう|modalitas
かもしれません|mungkin saja|... かもしれません|Menyatakan kemungkinan yang lebih rendah dari でしょう.|彼はもう帰ったかもしれません。|Dia mungkin sudah pulang.|雨が降るかもしれません。|Mungkin akan hujan.|彼はもう帰った___。|かもしれません,でしょう,そうです,ください|かもしれません|modalitas
`;

export type GrammarEntry = {
  pattern: string;
  meaning: string;
  formation: string;
  explanation: string;
  examples: { jp: string; id: string }[];
  cloze: string;
  options: string[];
  answer: string;
  category: string;
};

export function grammarEntries(): GrammarEntry[] {
  return RAW.trim()
    .split('\n')
    .map((line) => {
      const [pattern, meaning, formation, explanation, ex1, ex1id, ex2, ex2id, cloze, options, answer, category] =
        line.split('|').map((s) => s.trim());
      return {
        pattern,
        meaning,
        formation,
        explanation,
        examples: [
          { jp: ex1, id: ex1id },
          { jp: ex2, id: ex2id },
        ],
        cloze,
        options: options.split(',').map((s) => s.trim()),
        answer,
        category,
      };
    });
}
