import { Subject } from "@/types";

/**
 * Ön Lisans KPSS Müfredat & Video Veri Tabanı
 * Türkiye'nin en saygın KPSS eğitimcileriyle (Aker Kartal, İlyas Güneş, Ramazan Yetgin,
 * Bayram Meral, Emrah Vahap Özkaraca vb.) doğrudan eşleştirilmiş video, arama listeleri
 * ve Hafıza Teknikleri / Çalışma Kağıdı özet verileri.
 */
export const SUBJECTS: Subject[] = [
  // ─────────────────────────────────────────────────────────
  // 1. TÜRKÇE (30 Soru) - Aker Kartal & Öznur Saat Yıldırım
  // ─────────────────────────────────────────────────────────
  {
    id: "turkce",
    name: "Türkçe",
    shortName: "TRK",
    totalQuestions: 30,
    color: "border-violet-500 text-violet-400",
    bgColor: "bg-violet-500/10",
    topics: [
      {
        id: "turkce-sozlukte-anlam",
        name: "Sözcükte Anlam",
        subjectId: "turkce",
        osmyWeight: 8,
        videoLesson: {
          title: "Sözcükte Anlam Konu Anlatımı — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Sözcükte Anlam Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20S%C3%B6zc%C3%BCkte%20Anlam%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Sözcükte Anlam Soru Çözümü — Öznur Saat Yıldırım",
          instructor: "Öznur Saat Yıldırım",
          searchQuery: "KPSS Ön Lisans Sözcükte Anlam Soru Çözümü Öznur Saat Yıldırım",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20S%C3%B6zc%C3%BCkte%20Anlam%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20%C3%96znur%20Saat%20Y%C4%B1ld%C4%B1r%C4%B1m"
        },
        summary: {
          keyConcepts: [
            "Gerçek, Mecaz ve Terim Anlam ayrımı",
            "Somutlaştırma & Soyutlaştırma teknikleri",
            "Deyimler ve Atasözleri (Kalıplaşmış sözler bölünemez)",
            "Dolaylama (Yavru Vatan: Kıbrıs) ve Güzel Adlandırma (İnce hastalık: Verem)"
          ],
          mnemonics: [
            "G-M-T Kuralı: Gerçek (Akla ilk gelen temel anlam), Mecaz (Tamamen yeni/soyut mecazi anlam), Terim (Bilim/sanat/meslek dalına ait özel kavram).",
            "Dolaylama Şifresi: Tek sözcük yerine çok sözcük (Kara Elmas = Kömür, Beyaz Cam = Televizyon, Bacasız Sanayi = Turizm)."
          ],
          examTraps: [
            "ÖSYM 'altı çizili sözün cümleye kattığı anlam' sorularında sözcüğün sözlük anlamına değil, cümlenin bütününde kazandığı mecazi mesaja odaklanmanı ister.",
            "Zıt anlamlılık ile olumsuzluk aynı şey DEĞİLDİR ('gelmek' fiilinin zıttı 'gitmek'tir, 'gelmemek' ise olumsuzudur)."
          ],
          fastReviewNotes: [
            "Mecaz anlamda sözcük gerçek anlamından tamamen uzaklaşır.",
            "Atasözleri genel kural ve öğüt bildirir, deyimler anlık duygu/durum anlatır.",
            "Nicel (ölçülebilen/sayılabilen) vs Nitel (nitelik/özellik bildiren)."
          ]
        }
      },
      {
        id: "turkce-cumlede-anlam",
        name: "Cümlede Anlam",
        subjectId: "turkce",
        osmyWeight: 9,
        videoLesson: {
          title: "Cümlede Anlam Konu Anlatımı — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Cümlede Anlam Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20C%C3%BCmlede%20Anlam%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Cümlede Anlam Soru Çözümü — Öznur Saat Yıldırım",
          instructor: "Öznur Saat Yıldırım",
          searchQuery: "KPSS Ön Lisans Cümlede Anlam Soru Çözümü Öznur Saat Yıldırım",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20C%C3%BCmlede%20Anlam%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20%C3%96znur%20Saat%20Y%C4%B1ld%C4%B1r%C4%B1m"
        },
        summary: {
          keyConcepts: [
            "Neden-Sonuç vs Amaç-Sonuç vs Koşul-Sonuç ilişkisi",
            "Öznel (Kişisel yargı) vs Nesnel (Kanıtlanabilir) Cümleler",
            "Doğrudan Anlatım vs Dolaylı Anlatım",
            "Örtülü Anlam & Cümleden Kesin Çıkarılacak Yargı"
          ],
          mnemonics: [
            "Amaç vs Neden Testi: Yargının yerine 'amacıyla' koyabiliyorsan AMAÇ-SONUÇ; 'nedeniyle / -dığı için' koyabiliyorsan NEDEN-SONUÇ'tur.",
            "Örtülü Anlam Formülü: Cümlede 'de/da' bağlacı veya 'en, daha, yine, artık' sözcüklerini arayarak gizli yargıyı yakala."
          ],
          examTraps: [
            "'Kesin çıkarılacak yargı' sorularında metinde yazmayan hiçbir genel kültür/tahmin bilgisini doğru kabul etme!",
            "Koşul cümlelerinde sadece '-se/-sa' aranmaz; 'üzere, ama, ancak, yeter ki' kalıpları da koşul anlamı kurar."
          ],
          fastReviewNotes: [
            "Neden-Sonuçta iki eylem de gerçekleşmiştir (Yağmur yağdığı için ıslandı).",
            "Amaç-Sonuçta amaçlanan eylem henüz gerçekleşmemiştir (Sınavı kazanmak için çalışıyor).",
            "Üslup (Nasıl anlatmış?) vs İçerik/Konu (Ne anlatmış?)."
          ]
        }
      },
      {
        id: "turkce-paragrafta-anlam",
        name: "Paragrafta Anlam & Paragraf Taktikleri",
        subjectId: "turkce",
        osmyWeight: 10,
        videoLesson: {
          title: "Paragraf Taktikleri Konu Anlatımı — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Paragraf Taktikleri Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Paragraf%20Taktikleri%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Paragraf Soru Çözümü — Kadir Gümüş",
          instructor: "Kadir Gümüş",
          searchQuery: "KPSS Ön Lisans Paragraf Soru Çözümü Kadir Gümüş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Paragraf%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Kadir%20G%C3%BCm%C3%BC%C5%9F"
        },
        summary: {
          keyConcepts: [
            "Ana Düşünce (Yazarın asıl vermek istediği mesaj) vs Yardımcı Düşünceler",
            "Paragraf Tamamlama, Akışı Bozan Cümle ve İkiye Bölme Taktikleri",
            "Anlatım Teknikleri (Açıklama, Tartışma, Öyküleme, Betimleme)",
            "Düşünceyi Geliştirme Yolları (Tanımlama, Karşılaştırma, Örnekleme, Tanıklık)"
          ],
          mnemonics: [
            "A-T-Ö-B Formülü: Açıklama (Bilgi verme), Tartışma (Fikir çürütme), Öyküleme (Olay içinde yaşatma/zaman akışı), Betimleme (Gözde canlandırma/fotoğraf).",
            "Akışı Bozan Cümle Şifresi: Konunun veya bakış açısının değiştiği 'yabancı misafir' cümleyi bul."
          ],
          examTraps: [
            "Önce SORU KÖKÜNÜ, sonra seçenekleri değil PARAGRAFI oku; altı çizili 'değinilmemiştir/çıkarılamaz' olumsuz köklerine dikkat et.",
            "Tanık Göstermede sadece isim geçmesi yetmez, kişinin FİKRİ (sözü) doğrudan veya dolaylı aktarılmalıdır."
          ],
          fastReviewNotes: [
            "Ana fikir genellikle ilk veya son cümlede toparlanır.",
            "Öykülemede zaman akışı ve hareket vardır; betimlemede durağanlık ve niteleme sıfatları hakimdir."
          ]
        }
      },
      {
        id: "turkce-ses-bilgisi",
        name: "Ses Bilgisi",
        subjectId: "turkce",
        osmyWeight: 7,
        videoLesson: {
          title: "Ses Bilgisi Konu Anlatımı — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Ses Bilgisi Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Ses%20Bilgisi%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Ses Bilgisi Soru Çözümü — Öznur Saat Yıldırım",
          instructor: "Öznur Saat Yıldırım",
          searchQuery: "KPSS Ön Lisans Ses Bilgisi Soru Çözümü Öznur Saat Yıldırım",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Ses%20Bilgisi%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20%C3%96znur%20Saat%20Y%C4%B1ld%C4%B1r%C4%B1m"
        },
        summary: {
          keyConcepts: [
            "Ünlü Düşmesi, Ünlü Daralması ve Ünlü Değişimi (bana, sana)",
            "Ünsüz Benzeşmesi (Sertleşme) ve Ünsüz Yumuşaması",
            "Ünsüz Türemesi (hissetmek, affetmek) ve Ünsüz Düşmesi (küçücük)",
            "Kaynaştırma Harfleri ve Ulama"
          ],
          mnemonics: [
            "FıSTıKÇı ŞaHaP: Sert ünsüzler (f, s, t, k, ç, ş, h, p) yanına c, d, g ile başlayan ek gelirse ç, t, k'ye dönüşür (Sertleşme).",
            "Y-Ş-S-N (YaŞaSıN): İki ünlü arasına giren kaynaştırma ünsüzleri."
          ],
          examTraps: [
            "'-yor' eki her zaman daralma yapmaz; sadece sonu 'a/e' ile biten fiillerde daralma yapar (gel-i-yor'da daralma yoktur, yardımcı ünlü vardır; başla-yor -> başlıyor'da daralma vardır).",
            "Özel isimlerde yazımda yumuşama gösterilmez (Ahmet'e yazılır, Ahmet'e okunur)."
          ],
          fastReviewNotes: [
            "Ünlü Değişimi Türkçede sadece iki sözcükte vardır: ben -> bana, sen -> sana.",
            "Küçücük (küçük-cük), minicik (minik-cik) sözcüklerinde 'k' ünsüzü düşer."
          ]
        }
      },
      {
        id: "turkce-yazim-kurallari",
        name: "Yazım Kuralları",
        subjectId: "turkce",
        osmyWeight: 8,
        videoLesson: {
          title: "Yazım Kuralları Konu Anlatımı — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Yazım Kuralları Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Yaz%C4%B1m%20Kurallar%C4%B1%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Yazım Kuralları Soru Çözümü — Kadir Gümüş",
          instructor: "Kadir Gümüş",
          searchQuery: "KPSS Ön Lisans Yazım Kuralları Soru Çözümü Kadir Gümüş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Yaz%C4%B1m%20Kurallar%C4%B1%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Kadir%20G%C3%BCm%C3%BC%C5%9F"
        },
        summary: {
          keyConcepts: [
            "Büyük Harflerin Kullanımı (Kurum/Kuruluş, Tarih, Akrabalık, Unvan)",
            "'-de / -da' ve '-ki' Bağlaçlarının vs Eklerinin Yazımı",
            "'mi' Soru Ekinin Yazımı",
            "Birleşik Sözcüklerin Yazımı (Ses düşmesi/türemesi olanlar bitişik)"
          ],
          mnemonics: [
            "SOMBAHÇEMİ Kuralı: Bitişik yazılan ki'li bağlaçlar (Sanki, Oysaki, Mademki, Belki, Halbuki, Çünkü, Meğerki, İllaki).",
            "'de' Kuralı: Cümleden çıkarıldığında anlam tamamen bozuluyorsa bitişik (ek); daralıyor ama bozulmuyorsa ayrı (bağlaç) yazılır."
          ],
          examTraps: [
            "Kurum, kuruluş ve kurul adlarına gelen ekler KESME İŞARETİYLE AYRILMAZ! (Türkiye Büyük Millet Meclisine, Türk Dil Kurumundan).",
            "Şey sözcüğü DAİMA ayrı yazılır (bir şey, her şey, çok şey)."
          ],
          fastReviewNotes: [
            "Ay ve gün adları belirli bir tarih bildiriyorsa büyük (29 Ekim 1923), bildirmiyorsa küçük yazılır.",
            "İkilemeler daima ayrı yazılır (el ele, art arda, baştan başa)."
          ]
        }
      },
      {
        id: "turkce-noktalama-isaretleri",
        name: "Noktalama İşaretleri",
        subjectId: "turkce",
        osmyWeight: 8,
        videoLesson: {
          title: "Noktalama İşaretleri Konu Anlatımı — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Noktalama İşaretleri Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Noktalama%20%C4%B0%C5%9Faretleri%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Noktalama İşaretleri Soru Çözümü — Rüştü Bayındır",
          instructor: "Rüştü Bayındır",
          searchQuery: "KPSS Ön Lisans Noktalama İşaretleri Soru Çözümü Rüştü Bayındır",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Noktalama%20%C4%B0%C5%9Faretleri%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20R%C3%BC%C5%9Ft%C3%BC%20Bay%C4%B1nd%C4%B1r"
        },
        summary: {
          keyConcepts: [
            "Virgülün Kullanıldığı ve Kesinlikle KULLANILMADIĞI Yerler",
            "Noktalı Virgül (;) vs İki Nokta (:) Ayrımı",
            "Kesme İşareti ('), Kısa Çizgi (-) ve Yay Ayraç"
          ],
          mnemonics: [
            "VİRGÜLÜN YASAK BÖLGELERİ: Şart ekinden (-se/-sa) sonra, tek zarf-fiil ekinden sonra, 've/veya/ya da' bağlaçlarından önce/sonra virgül KONMAZ!",
            "İki Nokta vs Noktalı Virgül: Kendisinden sonra AÇIKLAMA veya ÖRNEK gelecekse İKİ NOKTA (:); türleri ayırmak veya ögeleri arasında virgül bulunan sıralı cümleleri bağlamak için NOKTALI VİRGÜL (;) kullanılır."
          ],
          examTraps: [
            "Metin içinde art arda gelen zarf-fiil eki almış sözcükler varsa aralarına virgül KONUR; ama tek bir zarf-fiil varsa KONMAZ!",
            "İki noktadan sonra cümle geliyorsa büyük harfle, sadece örnekler sıralanıyorsa küçük harfle başlar."
          ],
          fastReviewNotes: [
            "Özel isimlere gelen yapım ekleri ve çokluk (-lar) ekleri kesme işaretiyle ayrılmaz (Türkleşmek, Ankaralılar).",
            "Satır sonuna sığmayan sözcüklerde kesme işareti kullanılmışsa ayrıca kısa çizgi kullanılmaz."
          ]
        }
      },
      {
        id: "turkce-sozcukte-yapi",
        name: "Sözcükte Yapı & Ekler",
        subjectId: "turkce",
        osmyWeight: 7,
        videoLesson: {
          title: "Sözcükte Yapı Konu Anlatımı — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Sözcükte Yapı Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20S%C3%B6zc%C3%BCkte%20Yap%C4%B1%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Sözcükte Yapı Soru Çözümü — Öznur Saat Yıldırım",
          instructor: "Öznur Saat Yıldırım",
          searchQuery: "KPSS Ön Lisans Sözcükte Yapı Soru Çözümü Öznur Saat Yıldırım",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20S%C3%B6zc%C3%BCkte%20Yap%C4%B1%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20%C3%96znur%20Saat%20Y%C4%B1ld%C4%B1r%C4%B1m"
        },
        summary: {
          keyConcepts: [
            "Kök Türleri (İsim Kökü vs Fiil Kökü vs Sesteş/Kökteş Kök)",
            "Yapım Ekleri (İsimden İsim, İsimden Fiil, Fiilden İsim, Fiilden Fiil)",
            "Çekim Ekleri (İsim Çekim: Hal, İyelik, Çokluk, İlgi / Fiil Çekim: Kip, Şahıs)",
            "Basit, Türemiş ve Birleşik Sözcükler"
          ],
          mnemonics: [
            "İyelik vs Hal Eki Testi: '-i' ekinin başına 'onun' getirebiliyorsan İYELİK EKİDİR (Onun evi güzelmiş); 'neyi/kimi' sorusuna cevap veriyorsa BELİRTME HAL EKİDİR (Evi temizledi)."
          ],
          examTraps: [
            "Yapım eki alan her sözcük GÖVDE durumundadır ve TÜREMİŞ kabul edilir.",
            "Fiilimsilerin tamamı FİİLDEN İSİM YAPIM EKİDİR ve sözcüğü türemiş yapar!"
          ],
          fastReviewNotes: [
            "Basit sözcük hiç yapım eki almamış, sadece çekim eki almış sözcüktür.",
            "Birleşik sözcük iki farklı sözcüğün kalıplaşmasıyla oluşur."
          ]
        }
      },
      {
        id: "turkce-sozel-mantik",
        name: "Sözel Mantık & Akıl Yürütme",
        subjectId: "turkce",
        osmyWeight: 9,
        videoLesson: {
          title: "Sözel Mantık Tablo Kurma — Aker Kartal",
          instructor: "Aker Kartal",
          searchQuery: "KPSS Ön Lisans Sözel Mantık Aker Kartal",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20S%C3%B6zel%20Mant%C4%B1k%20Aker%20Kartal"
        },
        videoSolution: {
          title: "Sözel Mantık Çıkmış Soru Çözümü — Rüştü Bayındır",
          instructor: "Rüştü Bayındır",
          searchQuery: "KPSS Ön Lisans Sözel Mantık Soru Çözümü Rüştü Bayındır",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20S%C3%B6zel%20Mant%C4%B1k%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20R%C3%BC%C5%9Ft%C3%BC%20Bay%C4%B1nd%C4%B1r"
        },
        summary: {
          keyConcepts: [
            "Değişken Sayısı ve Sabit Tablo Belirleme (Kişi, Gün, Sıra, Kat, Branş)",
            "Kesin Bilgileri Tabloya İşleme ve Olasılıkları Ayrıştırma",
            "Öncülleri Tek Tek Çizerek Eleme Tekniği"
          ],
          mnemonics: [
            "TABLO KURMA KURALI: Sayısı AZ ve DEĞİŞMEYEN olanı (Günler, Katlar, Sıralar) TABLO BAŞLIĞI yap; hareketli olanları (Kişileri) içine doldur.",
            "BİRLİKTE / AYRI KURALI: 'A ve B aynı gruptadır' (A=B), 'C ve D farklı gruptadır' (C≠D) şeklinde not al."
          ],
          examTraps: [
            "Soru kökündeki 'kesinlikle doğrudur / kesinlikle yanlıştır' ifadelerinde olasılıklı ihtimalleri doğru sayma!",
            "Metinde verilmeyen hiçbir varsayımı kafandan tabloya ekleme."
          ],
          fastReviewNotes: [
            "Bir sözel mantık metninden 4 adet soru çıkar (1 tablo 4 net kazandırır).",
            "Tabloyu doğru kurduktan sonra 4 soruyu çözmek 2 dakika sürer."
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // 2. MATEMATİK & GEOMETRİ (30 Soru) - İlyas Güneş & Mehmet Bilge Yıldız
  // ─────────────────────────────────────────────────────────
  {
    id: "matematik",
    name: "Matematik & Geometri",
    shortName: "MAT",
    totalQuestions: 30,
    color: "border-blue-500 text-blue-400",
    bgColor: "bg-blue-500/10",
    topics: [
      {
        id: "mat-temel-kavramlar",
        name: "Temel Kavramlar & Sayı Kümeleri",
        subjectId: "matematik",
        osmyWeight: 8,
        videoLesson: {
          title: "Temel Kavramlar Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Temel Kavramlar İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Temel%20Kavramlar%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Temel Kavramlar Soru Kampı — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Temel Kavramlar Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Temel%20Kavramlar%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Rakam, Doğal Sayı (N), Tam Sayı (Z), Rasyonel Sayı (Q), Reel Sayı (R)",
            "Tek ve Çift Sayılar Kuralları",
            "Pozitif ve Negatif Sayılar İşaret Tablosu",
            "Asal Sayılar ve Aralarında Asal Sayılar",
            "Ardışık Sayılar Toplam Formülleri (Terim Sayısı, Terimler Toplamı)"
          ],
          mnemonics: [
            "TEK-ÇİFT KURALI: T ± T = Ç, Ç ± Ç = Ç, T ± Ç = T. Çarpımda bir tane ÇİFT varsa sonuç daima ÇİFTTİR.",
            "TERİM SAYISI: (Son Terim - İlk Terim) / Artış Miktarı + 1.",
            "TOPLAM FORMÜLÜ: [(Son Terim + İlk Terim) / 2] x Terim Sayısı."
          ],
          examTraps: [
            "Sıfır (0) ÇİFT bir tam sayıdır ama pozitif ya da negatif DEĞİLDİR!",
            "En küçük asal sayı 2'dir ve 2'den başka çift asal sayı YOKTUR. 1 asal sayı DEĞİLDİR!"
          ],
          fastReviewNotes: [
            "Aralarında asal sayıların 1'den başka ortak pozitif böleni yoktur.",
            "1 + 2 + 3 + ... + n = [n . (n + 1)] / 2."
          ]
        }
      },
      {
        id: "mat-basamak-kavrami",
        name: "Basamak Kavramı & Sayı Çözümleme",
        subjectId: "matematik",
        osmyWeight: 7,
        videoLesson: {
          title: "Basamak Kavramı Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Basamak Kavramı İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Basamak%20Kavram%C4%B1%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Basamak Kavramı Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Basamak Kavramı Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Basamak%20Kavram%C4%B1%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "İki ve Üç Basamaklı Sayıların Çözümlenmesi (AB = 10A + B, ABC = 100A + 10B + C)",
            "Basamak Farkı (AB - BA = 9(A - B), AB + BA = 11(A + B))"
          ],
          mnemonics: [
            "FARK ŞİFRESİ: AB - BA = 9(A - B) -> 9'un katıdır.",
            "TOPLAM ŞİFRESİ: AB + BA = 11(A + B) -> 11'in katıdır."
          ],
          examTraps: [
            "AB iki basamaklı sayı denildiğinde A ≠ 0 olmak zorundadır!",
            "Rakamları FARKLI şartına mutlaka dikkat et."
          ],
          fastReviewNotes: [
            "ABC - CBA = 99(A - C) daima 99'un katıdır.",
            "Basamak değeri rakamın bulunduğu basamağa göre aldığı değerdir."
          ]
        }
      },
      {
        id: "mat-bolme-bolunebilme",
        name: "Bölme & Bölünebilme Kuralları",
        subjectId: "matematik",
        osmyWeight: 8,
        videoLesson: {
          title: "Bölünebilme Kuralları Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Bölünebilme Kuralları İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20B%C3%B6l%C3%BCnebilme%20Kurallar%C4%B1%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Bölünebilme Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Bölünebilme Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20B%C3%B6l%C3%BCnebilme%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Bölme Bağıntısı: A = B . C + K (0 ≤ K < B)",
            "2, 3, 4, 5, 8, 9, 10, 11 ile Bölünebilme Kuralları",
            "Aralarında Asal Çarpanlara Ayırma (6=2x3, 12=3x4, 15=3x5, 36=4x9, 45=5x9)"
          ],
          mnemonics: [
            "BÖLÜNEBİLME ŞİFRESİ: 3 ve 9 -> Rakamları toplamı; 4 -> Son 2 basamak; 5 -> Son basamak (0 veya 5); 11 -> Sağdan sola (+ - + -)."
          ],
          examTraps: [
            "Kalan daima BÖLENDEN KÜÇÜK olmak zorundadır (K < B).",
            "Bileşik kurallarda (Örn: 36 ile bölünebilme) önce son basamağı ilgilendiren kural (4) uygulanır, sonra rakamlar toplamı (9) kuralına geçilir."
          ],
          fastReviewNotes: [
            "Kalanlar üzerinden işlem yapılabilir (A'nın 9'a bölümünden kalan ile B'nin kalanını çarpıp/toplayabilirsin)."
          ]
        }
      },
      {
        id: "mat-ebob-ekok",
        name: "EBOB & EKOK Problemleri",
        subjectId: "matematik",
        osmyWeight: 7,
        videoLesson: {
          title: "EBOB - EKOK Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans EBOB EKOK İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20EBOB%20EKOK%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "EBOB EKOK Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans EBOB EKOK Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20EBOB%20EKOK%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "EBOB: En Büyük Ortak Bölen (Büyükten -> Küçüğe, Parçalama / Bölme)",
            "EKOK: En Küçük Ortak Kat (Küçükten -> Büyüğe, Birleştirme / Katlama)",
            "İki sayının çarpımı: a . b = EBOB(a,b) . EKOK(a,b)"
          ],
          mnemonics: [
            "BÜTÜNDEN PARÇAYA = EBOB (Tarla etrafına eşit aralıkla ağaç, çuvaldaki pirinçleri poşetleme, küp kesme).",
            "PARÇADAN BÜTÜNE = EKOK (Zillerin birlikte çalması, nöbet tutma, tuğlalardan küp yapma)."
          ],
          examTraps: [
            "Aralarında asal iki sayının EBOB'u 1'dir, EKOK'u ise çarpımlarıdır (a . b)!"
          ],
          fastReviewNotes: [
            "EBOB(a,b) ≤ a,b ≤ EKOK(a,b)."
          ]
        }
      },
      {
        id: "mat-rasyonel-sayilar",
        name: "Rasyonel & Ondalık Sayılar",
        subjectId: "matematik",
        osmyWeight: 9,
        videoLesson: {
          title: "Rasyonel Sayılar Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Rasyonel Sayılar İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Rasyonel%20Say%C4%B1lar%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Rasyonel Sayılar Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Rasyonel Sayılar Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Rasyonel%20Say%C4%B1lar%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Dört İşlem ve İşlem Önceliği (Parantez -> Çarpma/Bölme -> Toplama/Çıkarma)",
            "Merdivenli Kesirler ve Devirli Ondalık Açılımlar",
            "Rasyonel Sayılarda Sıralama"
          ],
          mnemonics: [
            "DEVİRLİ ONDALIK FORMÜLÜ: (Tüm Sayı - Devretmeyen Kısım) / (Devreden kadar 9, Virgülden sonraki devretmeyen kadar 0)."
          ],
          examTraps: [
            "Negatif rasyonel sayıları sıralarken önce pozitif gibi düşün, sonra eşitsizlik işaretini TERS ÇEVİR!"
          ],
          fastReviewNotes: [
            "Ana kesir çizgisi hizasındaki işlem önceliklidir.",
            "Paydalar eşitse payı büyük olan büyüktür."
          ]
        }
      },
      {
        id: "mat-esitsizlik-mutlak",
        name: "Basit Eşitsizlikler & Mutlak Değer",
        subjectId: "matematik",
        osmyWeight: 8,
        videoLesson: {
          title: "Mutlak Değer Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Mutlak Değer İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Mutlak%20De%C4%9Fer%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Mutlak Değer Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Mutlak Değer Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Mutlak%20De%C4%9Fer%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Eşitsizlik Özellikleri (Negatifle çarpma/bölmede yön değiştirir)",
            "Taraf Tarafa Toplama (Çıkarma/Çarpma doğrudan yapılmaz)",
            "Mutlak Değer Tanımı (Uzaklık kavramı, |x| ≥ 0)"
          ],
          mnemonics: [
            "MUTLAK DEĞER KURALI: İçi pozitifse aynen çıkar (x), içi negatifse eksiyle çarpılarak çıkar (-x).",
            "0 < a < 1 ise a² < a (Basit kesirlerin karesi kendisinden küçüktür)."
          ],
          examTraps: [
            "Eşitsizlikte her iki tarafı bilinmeyenle çarparken işaretini bilmiyorsan içler dışlar YAPILMAZ!",
            "|x| = -5 olamaz; mutlak değer hiçbir zaman negatif sayıya eşit olamaz (Çözüm kümesi boş küme)."
          ],
          fastReviewNotes: [
            "|x| < a ise -a < x < a.",
            "|x| > a ise x > a veya x < -a."
          ]
        }
      },
      {
        id: "mat-uslu-koklu",
        name: "Üslü & Köklü Sayılar",
        subjectId: "matematik",
        osmyWeight: 9,
        videoLesson: {
          title: "Üslü ve Köklü Sayılar — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Üslü Köklü Sayılar İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C3%9Csl%C3%BC%20K%C3%B6kl%C3%BC%20Say%C4%B1lar%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Köklü Sayılar Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Köklü Sayılar Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20K%C3%B6kl%C3%BC%20Say%C4%B1lar%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Üslü Sayı Özellikleri (Tabanlar aynıysa üsler toplanır/çıkarılır)",
            "Köklü Sayı Kuralları ve Eşlenikle Çarpma",
            "İç İçe Kökler ve Özel Kök Kuralı (√(a ± 2√b))"
          ],
          mnemonics: [
            "ÖZEL KÖK KURALI: √(m + n ± 2√(m.n)) = √m ± √n (Çarpımları b, toplamları a olan iki sayı bul)."
          ],
          examTraps: [
            "Çift dereceli kökün içi NEGATİF OLAMAZ (Reel sayılarda tanımsızdır); tek dereceli kökün içi negatif olabilir.",
            "(-2)² = 4 iken -2² = -4'tür (Parantez farkına dikkat!)."
          ],
          fastReviewNotes: [
            "a^0 = 1 (a ≠ 0).",
            "Paydada kök varsa eşleniği ile çarpılarak kökten kurtarılır."
          ]
        }
      },
      {
        id: "mat-problemler",
        name: "Denklem Kurma & Problemler",
        subjectId: "matematik",
        osmyWeight: 10,
        videoLesson: {
          title: "Problemler Masterclass — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Problemler İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Problemler%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Problemler Soru Kampı — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Problemler Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Problemler%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Sayı & Kesir Problemleri (100x kuralı, paydaların EKOK'u)",
            "Yaş Problemleri (Kişiler arasındaki yaş farkı ASLA DEĞİŞMEZ)",
            "Yüzde, Kar-Zarar ve Karışım Problemleri",
            "Hız-Hareket Problemleri (Yol = Hız x Zaman)"
          ],
          mnemonics: [
            "100x KURALI: Yüzde ve kar-zarar sorularında maliyete daima 100x de.",
            "HIZ FORMÜLÜ: x = v . t (Zıt yönlü harekette hızlar toplanır: v1 + v2; aynı yönlü harekette hızlar çıkarılır: v1 - v2)."
          ],
          examTraps: [
            "Karışım probleminde su buharlaşırsa saf madde miktarı DEĞİŞMEZ, sadece toplam kütle azalır!",
            "İndirim daima SATIŞ FİYATI üzerinden yapılır, maliyet üzerinden değil."
          ],
          fastReviewNotes: [
            "Ortalama Hız = Toplam Yol / Toplam Zaman.",
            "Kesir problemlerinde bütüne paydaların çarpımı kadar değer vermek rasyonel işlemden kurtarır."
          ]
        }
      },
      {
        id: "mat-olasilik-kombinasyon",
        name: "Permütasyon, Kombinasyon & Olasılık",
        subjectId: "matematik",
        osmyWeight: 8,
        videoLesson: {
          title: "PKBO Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Permütasyon Kombinasyon Olasılık İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Perm%C3%BCtasyon%20Kombinasyon%20Olas%C4%B1l%C4%B1k%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Olasılık Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Olasılık Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Olas%C4%B1l%C4%B1k%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Permütasyon: SIRALAMA / DİZİLİŞ (Sıra önemli)",
            "Kombinasyon: SEÇME / GRUPLAMA (Sıra önemsiz)",
            "Olasılık Formülü: İstenen Durum Sayısı / Tüm Durumların Sayısı"
          ],
          mnemonics: [
            "P vs C KURALI: Sıralama/diziliş varsa P (Permütasyon); Seçim/ekip/heyet varsa C (Kombinasyon).",
            "TÜM DURUM - İSTENMEYEN DURUM = İSTENEN DURUM (En az bir sorularında tersini düşün)."
          ],
          examTraps: [
            "Olasılık değeri daima 0 ile 1 arasındadır (0 ≤ P(A) ≤ 1). Asla 1'den büyük veya negatif olamaz."
          ],
          fastReviewNotes: [
            "n elemandan r tane seçme: C(n,r) = n! / [r! . (n-r)!].",
            "Tekrarlı permütasyon: n! / (a! . b! . c!)."
          ]
        }
      },
      {
        id: "mat-sayisal-mantik",
        name: "Sayısal Mantık & Grafik Okuma",
        subjectId: "matematik",
        osmyWeight: 9,
        videoLesson: {
          title: "Sayısal Mantık Konu Anlatımı — İlyas Güneş",
          instructor: "İlyas Güneş",
          searchQuery: "KPSS Ön Lisans Sayısal Mantık İlyas Güneş",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Say%C4%B1sal%20Mant%C4%B1k%20%C4%B0lyas%20G%C3%BCne%C5%9F"
        },
        videoSolution: {
          title: "Sayısal Mantık Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Sayısal Mantık Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Say%C4%B1sal%20Mant%C4%B1k%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Daire, Çizgi ve Sütun Grafikleri (360° daire orantısı)",
            "Şekil Yeteneği, Sayı Dizileri ve Tablo Matrisleri"
          ],
          mnemonics: [
            "DAİRE GRAFİĞİ ŞİFRESİ: Toplam Miktar = 360° (Her zaman doğru orantı kur: %100 = 360°)."
          ],
          examTraps: [
            "Grafik eksenlerinin neyi gösterdiğine (Adet mi, TL mi, Yüzde mi) çok dikkat et!"
          ],
          fastReviewNotes: [
            "Sayısal mantık soruları genellikle verilen örneği anlama temellidir."
          ]
        }
      },
      {
        id: "mat-geometri",
        name: "Temel Geometri (Açılar, Üçgenler, Dörtgenler)",
        subjectId: "matematik",
        osmyWeight: 8,
        videoLesson: {
          title: "Geometri Konu Anlatımı — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Geometri Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Geometri%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        videoSolution: {
          title: "Geometri Soru Çözümü — Mehmet Bilge Yıldız",
          instructor: "Mehmet Bilge Yıldız",
          searchQuery: "KPSS Ön Lisans Geometri Soru Çözümü Mehmet Bilge Yıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Geometri%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Bilge%20Y%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Üçgende Açılar ve Özel Dik Üçgenler (3-4-5, 5-12-13, 8-15-17, 7-24-25, 30-60-90)",
            "Üçgende Alan, Benzerlik ve Açıortay-Kenarortay",
            "Dörtgenler, Çokgenler ve Çemberde Alan"
          ],
          mnemonics: [
            "30-60-90 Kuralı: 30'un karşısı x ise 90'ın karşısı 2x, 60'ın karşısı x√3'tür.",
            "Öklid Kuralı (Hamsi): h² = p . k, b² = k . a, c² = p . a."
          ],
          examTraps: [
            "Benzerlik oranı k ise ALANLAR ORANI k² (karesi) olur!"
          ],
          fastReviewNotes: [
            "Üçgenin iç açıları toplamı 180°, dış açıları toplamı 360°'dir.",
            "Eşkenar üçgenin alanı = (a²√3) / 4."
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // 3. TARİH (27 Soru) - Ramazan Yetgin & Aydın Yüce
  // ─────────────────────────────────────────────────────────
  {
    id: "tarih",
    name: "Tarih",
    shortName: "TAR",
    totalQuestions: 27,
    color: "border-amber-500 text-amber-400",
    bgColor: "bg-amber-500/10",
    topics: [
      {
        id: "tar-islamiyet-oncesi",
        name: "İslamiyet Öncesi Türk Tarihi",
        subjectId: "tarih",
        osmyWeight: 7,
        videoLesson: {
          title: "İslamiyet Öncesi Türk Tarihi — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans İslamiyet Öncesi Türk Tarihi Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0slamiyet%20%C3%96ncesi%20T%C3%BCrk%20Tarihi%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "İslamiyet Öncesi Soru Çözümü — Aydın Yüce",
          instructor: "Aydın Yüce",
          searchQuery: "KPSS Ön Lisans İslamiyet Öncesi Soru Çözümü Aydın Yüce",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0slamiyet%20%C3%96ncesi%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Ayd%C4%B1n%20Y%C3%BCce"
        },
        summary: {
          keyConcepts: [
            "İlk Türk Devletleri (Asya Hun, I. ve II. Göktürk, Uygurlar, Hazarlar, Avarlar)",
            "Kut Anlayışı ve Veraset Sistemi (Ülke hanedanın ortak malıdır)",
            "Kültür ve Medeniyet: Kurultay, Töre, Onlu Teşkilat, Balbal, Kurgan, Yuğ"
          ],
          mnemonics: [
            "T-O-K-M-A-K: Hükümdarlık Sembolleri (Tuğ, Otağ, Kotuz/Sorguç, Menşur-İslamda, Nevbet/Davul, Kemer/Kur, Taht).",
            "M-U-K (İlkler): Mete Han (Onlu Sistem), Uygurlar (Yerleşik Hayat, Matbaa, Fresko), Kutluk (Orhun Abideleri)."
          ],
          examTraps: [
            "Uygurlar Maniheizm dinini benimseyerek YERLEŞİK HAYATA geçen ilk Türk devletidir; savaşçılık özellikleri zayıflamıştır.",
            "Kut inancı hanedanın tüm erkek üyelerine geçtiği için sık sık taht kavgalarına ve devletlerin kısa sürede yıkılmasına yol açmıştır."
          ],
          fastReviewNotes: [
            "Orhun Abideleri II. Göktürk (Kutluk) dönemine aittir (Bilge Kağan, Kül Tigin, Vezir Tonyukuk).",
            "Museviliği kabul eden ilk ve tek Türk devleti Hazarlardır (Hazar Barış Çağı)."
          ]
        }
      },
      {
        id: "tar-ilk-turk-islam",
        name: "İlk Türk - İslam Devletleri",
        subjectId: "tarih",
        osmyWeight: 7,
        videoLesson: {
          title: "İlk Türk İslam Devletleri — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans İlk Türk İslam Devletleri Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0lk%20T%C3%BCrk%20%C4%B0slam%20Devletleri%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "Türk İslam Tarihi Soru Çözümü — Aydın Yüce",
          instructor: "Aydın Yüce",
          searchQuery: "KPSS Ön Lisans Türk İslam Soru Çözümü Aydın Yüce",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20T%C3%BCrk%20%C4%B0slam%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Ayd%C4%B1n%20Y%C3%BCce"
        },
        summary: {
          keyConcepts: [
            "Talas Savaşı (751) ve Türklerin İslamiyete Geçişi",
            "Karahanlılar, Gazneliler, Büyük Selçuklu Devleti ve Mısır'da Kurulan Türk Devletleri (TEMA: Tolunoğulları, Eyyubiler, Memlükler, Akşitler)",
            "Türk-İslam Edebi Eserleri (Kutadgu Bilig, Divan-ı Lugati't-Türk, Atabetü'l-Hakayık, Divan-ı Hikmet)"
          ],
          mnemonics: [
            "T-E-M-A ŞİFRESİ: Mısır'da kurulan Türk devletleri (Tolunoğulları, Eyyubiler, Memlükler, Akşitler/İhşidiler).",
            "K-D-A-D Eserler: Kutadgu Bilig (Yusuf Has Hacib), Divan-ı Lugati't-Türk (Kaşgarlı Mahmud), Atabetü'l-Hakayık (Edip Ahmet), Divan-ı Hikmet (Hoca Ahmet Yesevi)."
          ],
          examTraps: [
            "Karahanlılar halkı ve yöneticisi tamamen Türk olduğu için resmi dili TÜRKÇE'dir; Gazneliler ve Selçuklularda edebiyat Farsça, bilim Arapçadır.",
            "1071 Malazgirt Savaşı ile Anadolu'nun kapıları Türklere açılmıştır (Yurt Açan)."
          ],
          fastReviewNotes: [
            "İlk Türk-İslam medresesi: Karahanlılar döneminde Semerkant Medresesi.",
            "Sultan unvanını ilk kullanan Türk hükümdarı: Gazneli Mahmut."
          ]
        }
      },
      {
        id: "tar-osmanli-kurulus-yukselme",
        name: "Osmanlı Devleti Kuruluş & Yükselme",
        subjectId: "tarih",
        osmyWeight: 8,
        videoLesson: {
          title: "Osmanlı Kuruluş ve Yükselme — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans Osmanlı Kuruluş Yükselme Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Osmanl%C4%B1%20Kurulu%C5%9F%20Y%C3%BCkselme%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "Osmanlı Siyasi Tarihi Soru Çözümü — Mehmet Celal Özyıldız",
          instructor: "Mehmet Celal Özyıldız",
          searchQuery: "KPSS Ön Lisans Osmanlı Siyasi Tarihi Mehmet Celal Özyıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Osmanl%C4%B1%20Siyasi%20Tarihi%20Mehmet%20Celal%20%C3%96zy%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "İskan ve İstimalet (Hoşgörü) Politikası",
            "Balkan Fetihleri (Sırpsındığı, I. Kosova, Niğbolu, Varna, II. Kosova)",
            "İstanbul'un Fethi (1453) ve Fatih Kanunnamesi (Kardeş katli yasallaştı)",
            "Mısır Seferi (1517) ve Halifeliğin Osmanlı'ya Geçişi"
          ],
          mnemonics: [
            "S-I-N-A-V-2 (Balkan Savaşları): Sırpsındığı, I. Kosova, Niğbolu, Ankara (Fetret), Varna, II. Kosova.",
            "II. KOSOVA (1448): Balkanların kesin Türk yurdu olduğunu kanıtlayan savaş (Miryokefalon gibi)."
          ],
          examTraps: [
            "1402 Ankara Savaşı ile Osmanlı 11 yıllık Fetret Devri'ne girmiş ve Anadolu beylikleri yeniden kurulmuştur; ancak Balkanlar'da iskan ve istimalet sayesinde büyük toprak kaybı yaşanmamıştır!"
          ],
          fastReviewNotes: [
            "İlk Osmanlı parası (Bakır): Osman Bey; İlk Gümüş Para: Orhan Bey; İlk Altın Para: Fatih Sultan Mehmet.",
            "Divan-ı Hümayun'a sadrazamların başkanlık etmesi Fatih döneminde başlamıştır."
          ]
        }
      },
      {
        id: "tar-osmanli-kultur-medeniyet",
        name: "Osmanlı Kültür ve Medeniyeti",
        subjectId: "tarih",
        osmyWeight: 10,
        videoLesson: {
          title: "Osmanlı Kültür Medeniyet — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans Osmanlı Kültür Medeniyet Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Osmanl%C4%B1%20K%C3%BClt%C3%BCr%20Medeniyet%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "Osmanlı Kültür Soru Kampı — Aydın Yüce",
          instructor: "Aydın Yüce",
          searchQuery: "KPSS Ön Lisans Osmanlı Kültür Soru Çözümü Aydın Yüce",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Osmanl%C4%B1%20K%C3%BClt%C3%BCr%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Ayd%C4%B1n%20Y%C3%BCce"
        },
        summary: {
          keyConcepts: [
            "Merkez Teşkilatı: Divan Üyeleri (Seyfiye - Askeri/Yönetim, İlmiye - Din/Eğitim/Adalet, Kalemiye - Bürokrasi/Maliye)",
            "Taşra Teşkilatı (Eyalet, Sancak, Kaza, Köy - Tımar / Saliyaneli / Saliyanesiz)",
            "Toprak Sistemi (Miri, Mülk, Vakıf) ve Tımar (Dirlik) Sistemi",
            "Ordu: Kapıkulu Askerleri (Yeniçeriler) ve Eyalet Askerleri (Tımarlı Sipahiler)"
          ],
          mnemonics: [
            "S-İ-K SINIFLARI: Seyfiye (Kılıç ehli: Sadrazam, Vezir, Kaptan-ı Derya, Yeniçeri Ağası), İlmiye (Din/ilim: Şeyhülislam, Kazasker), Kalemiye (Kalem ehli: Defterdar, Nişancı, Reisülküttab).",
            "SALİYANELİ (YILLIKLI): Merkeze uzak, tımar uygulanmayan, İltizam uygulanan eyaletler (Mısır, Trablusgarp, Tunus, Cezayir)."
          ],
          examTraps: [
            "Kazasker adaletten ve eğitimden sorumludur (Kadı ve Müderrisleri atar); Şeyhülislam fetva verir ama atama yapamaz!",
            "Tımar sisteminde toprak devletindir; köylü toprağı 3 yıl üst üste boş bırakırsa 'Çiftbozan vergisi' alınır ve toprak elinden alınır."
          ],
          fastReviewNotes: [
            "Nişancı padişahın tuğrasını çeker ve fethedilen toprakları Tahrir Defterine kaydeder.",
            "Lonca Teşkilatı esnaf örgütlenmesidir; Narh sistemiyle fiyat denetimi yapılır."
          ]
        }
      },
      {
        id: "tar-osmanli-islahatlar",
        name: "Osmanlı Islahatları ve Dağılma Dönemi",
        subjectId: "tarih",
        osmyWeight: 9,
        videoLesson: {
          title: "Osmanlı Islahatları — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans Osmanlı Islahatları Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Osmanl%C4%B1%20Islahatlar%C4%B1%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "19. Yüzyıl Islahatları Soru Çözümü — Aydın Yüce",
          instructor: "Aydın Yüce",
          searchQuery: "KPSS Ön Lisans Islahatlar Soru Çözümü Aydın Yüce",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Islahatlar%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Ayd%C4%B1n%20Y%C3%BCce"
        },
        summary: {
          keyConcepts: [
            "17. Yüzyıl (Duraklama Islahatları: Tarhuncu, Kuyucu Murat, II. Osman)",
            "18. Yüzyıl (Lale Devri, Nizam-ı Cedit - III. Selim)",
            "19. Yüzyıl: II. Mahmut (Yeniçeri Ocağı kaldırıldı - Vaka-i Hayriye), Tanzimat Fermanı (1839), Islahat Fermanı (1856), I. ve II. Meşrutiyet (Kanun-i Esasi)"
          ],
          mnemonics: [
            "T-O-K-M-A-K (17. yy Islahatçıları): Tarhuncu Ahmet, Genç Osman, Kuyucu Murat, IV. Murat, Ahmet I, Köprülüler.",
            "3-1-3-1 (18. yy Islahatçıları): III. Ahmet (Lale Devri), I. Mahmut, III. Mustafa, I. Abdülhamit, III. Selim (Nizam-ı Cedit)."
          ],
          examTraps: [
            "17. yüzyıl ıslahatlarında BATI (AVRUPA) ETKİSİ KESİNLİKLE YOKTUR! Batı tarzı ilk ıslahatlar 18. yüzyılda (Lale Devri) başlamıştır.",
            "Tanzimat Fermanı ile padişah ilk kez KANUN ÜSTÜNLÜĞÜNÜ kabul etmiştir; halk ilk kez I. Meşrutiyet (1876) ile YÖNETİME KATILMIŞTIR."
          ],
          fastReviewNotes: [
            "İlk Osmanlı Anayasası: 1876 Kanun-i Esasi (Mithat Paşa önderliğinde hazırlandı).",
            "Sened-i İttifak (1808): II. Mahmut ile Ayanlar arasında imzalandı, padişahın yetkileri ilk kez kısıtlandı."
          ]
        }
      },
      {
        id: "tar-milli-mucadele-hazirlik",
        name: "Milli Mücadele Hazırlık Dönemi",
        subjectId: "tarih",
        osmyWeight: 9,
        videoLesson: {
          title: "Milli Mücadele Hazırlık — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans Milli Mücadele Hazırlık Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Milli%20M%C3%BCcadele%20Haz%C4%B1rl%C4%B1k%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "Genelgeler ve Kongreler Soru Çözümü — Aydın Yüce",
          instructor: "Aydın Yüce",
          searchQuery: "KPSS Ön Lisans Genelgeler Kongreler Aydın Yüce",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Genelgeler%20Kongreler%20Ayd%C4%B1n%20Y%C3%BCce"
        },
        summary: {
          keyConcepts: [
            "Mondros Ateşkes Antlaşması (1918) ve Zararlı/Yararlı Cemiyetler",
            "Mustafa Kemal'in Samsun'a Çıkışı (19 Mayıs 1919) ve Havza Genelgesi",
            "Amasya Genelgesi (Kurtuluş Savaşı'nın Amacı, Gerekçesi, Yöntemi)",
            "Erzurum Kongresi (Toplanış bölgesel, kararlar ulusal) ve Sivas Kongresi (Tüm cemiyetler birleştirildi)",
            "Amasya Görüşmeleri ve Son Osmanlı Mebusan Meclisi (Misak-ı Milli Kararları)"
          ],
          mnemonics: [
            "AMASYA GENELGESİ: 'Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır' -> Kurtuluş Savaşı'nın YÖNTEMİ ve İHTİLAL BEYANNAMESİDİR.",
            "C-A-P-S (Misak-ı Milli Sınırları): Kapitülasyonlar, Azınlıklar, Boğazlar, Borçlar, Referandum (Kars-Ardahan-Batum, Batı Trakya, Arap toprakları)."
          ],
          examTraps: [
            "Erzurum Kongresi'nde MANDA VE HİMAYE ilk kez reddedilmiştir; Sivas Kongresi'nde KESİN OLARAK reddedilmiştir.",
            "Temsil Heyeti'nin varlığı TBMM'nin açılmasıyla (23 Nisan 1920) sona ermiştir."
          ],
          fastReviewNotes: [
            "İstanbul Hükümeti Temsil Heyeti'ni ilk kez Amasya Görüşmeleri ile resmen tanımıştır.",
            "Tüm yararlı cemiyetler Sivas Kongresi'nde 'Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti' adı altında birleştirilmiştir."
          ]
        }
      },
      {
        id: "tar-kurtulus-savasi-muharebeler",
        name: "Kurtuluş Savaşı Cepheler ve Antlaşmalar",
        subjectId: "tarih",
        osmyWeight: 10,
        videoLesson: {
          title: "Kurtuluş Savaşı Cepheler — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans Kurtuluş Savaşı Cepheler Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Kurtulu%C5%9F%20Sava%C5%9F%C4%B1%20Cepheler%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "Kurtuluş Savaşı Soru Çözümü — Mehmet Celal Özyıldız",
          instructor: "Mehmet Celal Özyıldız",
          searchQuery: "KPSS Ön Lisans Kurtuluş Savaşı Soru Çözümü Mehmet Celal Özyıldız",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Kurtulu%C5%9F%20Sava%C5%9F%C4%B1%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20Celal%20%C3%96zy%C4%B1ld%C4%B1z"
        },
        summary: {
          keyConcepts: [
            "Doğu Cephesi (Gümrü Antlaşması), Güney Cephesi (Ankara Antlaşması, Kuva-yi Milliye)",
            "Batı Cephesi: I. İnönü, II. İnönü, Kütahya-Eskişehir, Sakarya Meydan Muharebesi, Büyük Taarruz",
            "Mudanya Ateşkesi (1922) ve Lozan Barış Antlaşması (1923)"
          ],
          mnemonics: [
            "M-İ-L-A-T (I. İnönü Sonuçları): Moskova Antlaşması, İstiklal Marşı, Londra Konferansı, Afganistan Dostluk Paktı, Teşkilat-ı Esasiye (1921 Anayasası).",
            "G-A-K (Doğu Sınırı): Gümrü (İlk), Moskova (Batum taviz), Kars (Kesinleşti)."
          ],
          examTraps: [
            "Kurtuluş Savaşı'nda TBMM'nin tek yenilgisi KÜTAHYA-ESKİŞEHİR Savaşı'dır; bu yenilgi üzerine Mustafa Kemal'e BAŞKOMUTANLIK yetkisi verilmiş ve Tekalif-i Milliye emirleri yayımlanmıştır.",
            "Lozan'da çözülemeyen tek sınır IRAK (Musul) sınırıdır."
          ],
          fastReviewNotes: [
            "Sakarya Savaşı sonrasında Mustafa Kemal'e 'Gazi' unvanı ve 'Mareşal' rütbesi verilmiştir.",
            "Mudanya Ateşkesi ile İstanbul, Boğazlar ve Doğu Trakya SAVAŞILMADAN kurtarılmıştır."
          ]
        }
      },
      {
        id: "tar-ataturk-ilke-inkilap",
        name: "Atatürk İlke ve İnkılapları",
        subjectId: "tarih",
        osmyWeight: 9,
        videoLesson: {
          title: "Atatürk İlkeleri ve İnkılaplar — Ramazan Yetgin",
          instructor: "Ramazan Yetgin",
          searchQuery: "KPSS Ön Lisans Atatürk İlkeleri Ramazan Yetgin",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Atat%C3%BCrk%20%C4%B0lkeleri%20Ramazan%20Yetgin"
        },
        videoSolution: {
          title: "İnkılap Tarihi Soru Çözümü — Aydın Yüce",
          instructor: "Aydın Yüce",
          searchQuery: "KPSS Ön Lisans İnkılap Tarihi Soru Çözümü Aydın Yüce",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0nk%C4%B1lap%20Tarihi%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Ayd%C4%B1n%20Y%C3%BCce"
        },
        summary: {
          keyConcepts: [
            "6 Temel İlke (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık)",
            "Siyasi, Hukuki, Eğitim-Kültür ve Toplumsal Alandaki İnkılaplar",
            "Ekonomik İnkılaplar (İzmir İktisat Kongresi, Kabotaj Kanunu, Teşvik-i Sanayi)"
          ],
          mnemonics: [
            "CUMHURİYETÇİLİK: Seçim, oy, meclis, çok partili hayat, milli egemenlik.",
            "MİLLİYETÇİLİK: Türk, milli, tarih, dil, bağımsızlık, Kabotaj Kanunu.",
            "HALKÇILIK: Eşitlik, adalet, ayrıcalıksız toplum, Medeni Kanun, Aşar vergisinin kalkması, Soyadı Kanunu.",
            "DEVLETÇİLİK: Fabrika, banka açma (Sümerbank, Etibank), 5 yıllık sanayi planı, kamu yatırımı.",
            "LAİKLİK: Akılcılık, bilimsellik, din-devlet ayrımı, Halifeliğin ve Tekke-Zaviyelerin kaldırılması.",
            "İNKILAPÇILIK: Çağdaşlaşma, dinamizm, Batı ölçüleri/saat/takvim değişikliği."
          ],
          examTraps: [
            "1926 Medeni Kanun ile kadınlara SİYASİ HAK (Seçme ve seçilme) VERİLMEMİŞTİR! Kadınlara siyasi haklar 1930 (Belediye), 1933 (Muhtar), 1934 (Vekil) - '0-3-4 B-M-V' şifresiyle verilmiştir.",
            "Aşar vergisinin kaldırılması köylüyü rahatlattığı ve eşitlik sağladığı için doğrudan HALKÇILIK ile ilgilidir."
          ],
          fastReviewNotes: [
            "Kabotaj Kanunu Türk karasularında ticaret hakkını millileştirdiği için doğrudan MİLLİYETÇİLİK ilkesidir.",
            "Tevhid-i Tedrisat Kanunu (1924) ile eğitimde birlik sağlanmış ve medreseler kapatılmıştır."
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // 4. COĞRAFYA (18 Soru) - Bayram Meral & Mehmet Eğit
  // ─────────────────────────────────────────────────────────
  {
    id: "cografya",
    name: "Coğrafya",
    shortName: "COĞ",
    totalQuestions: 18,
    color: "border-emerald-500 text-emerald-400",
    bgColor: "bg-emerald-500/10",
    topics: [
      {
        id: "cog-konum",
        name: "Türkiye'nin Coğrafi Konumu & Saat Hesapları",
        subjectId: "cografya",
        osmyWeight: 7,
        videoLesson: {
          title: "Türkiye'nin Coğrafi Konumu — Bayram Meral",
          instructor: "Bayram Meral",
          searchQuery: "KPSS Ön Lisans Coğrafi Konum Bayram Meral",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Co%C4%9Frafi%20Konum%20Bayram%20Meral"
        },
        videoSolution: {
          title: "Coğrafi Konum Soru Çözümü — Mehmet Eğit",
          instructor: "Mehmet Eğit",
          searchQuery: "KPSS Ön Lisans Coğrafi Konum Soru Çözümü Mehmet Eğit",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Co%C4%9Frafi%20Konum%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20E%C4%9Fit"
        },
        summary: {
          keyConcepts: [
            "Türkiye'nin Matematik (Mutlak) Konumu (36°-42° Kuzey Paralelleri, 26°-45° Doğu Meridyenleri)",
            "Özel (Göreceli) Konum Sonuçları (Üç tarafı deniz, jeopolitik, yükselti)",
            "Meridyen, Paralel ve Yerel Saat Özellikleri (4 dk fark, Iğdır 45°D +3 Ulusal Saat)",
            "Bakı, Çizgisel Hız ve Gölge Boyu İlişkileri"
          ],
          mnemonics: [
            "TÜRKİYE'NİN MUTLAK KONUMU ŞİFRESİ: 26-45 Doğu (Meridyen), 36-42 Kuzey (Paralel).",
            "GÜNEYDEN KUZEYE GİDİLDİKÇE: Çizgisel hız azalır, Yerçekimi artar, Gölge boyu uzar, Gece-gündüz farkı artar, Güneş ışınlarının geliş açısı küçülür."
          ],
          examTraps: [
            "Türkiye Kuzey Yarımküre Orta Kuşakta olduğu için: Dört mevsim belirgin yaşanır, Akdeniz iklimi görülür, Batı rüzgarları eser, Cephe yağışları (A-B-C-D kuralı) görülür.",
            "Türkiye'de dağların GÜNEY YAMACI daima bakı yönüdür; gölge hiçbir zaman sıfır olmaz ve güneye düşmez!"
          ],
          fastReviewNotes: [
            "En doğusu ile en batısı arasında 19 meridyen x 4 = 76 dakika yerel saat farkı vardır.",
            "Türkiye tek ortak saat olarak 45° Doğu (Iğdır) GMT +3 saat dilimini kullanır."
          ]
        }
      },
      {
        id: "cog-yer-sekilleri",
        name: "Türkiye'nin Yer Şekilleri (Dağlar, Ovalar, Platolar)",
        subjectId: "cografya",
        osmyWeight: 8,
        videoLesson: {
          title: "Yer Şekilleri Konu Anlatımı — Bayram Meral",
          instructor: "Bayram Meral",
          searchQuery: "KPSS Ön Lisans Yer Şekilleri Bayram Meral",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Yer%20%C5%9Eekilleri%20Bayram%20Meral"
        },
        videoSolution: {
          title: "Yer Şekilleri Soru Çözümü — Engin Eraydın",
          instructor: "Engin Eraydın",
          searchQuery: "KPSS Ön Lisans Yer Şekilleri Soru Çözümü Engin Eraydın",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Yer%20%C5%9Eekilleri%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Engin%20Erayd%C4%B1n"
        },
        summary: {
          keyConcepts: [
            "Türkiye'nin Jeolojik Geçmişi (Tersiyer ve Kuaternerde toptan yükselme - Epirojenez)",
            "Orojenez (Kıvrım Dağları: Toroslar, Kuzey Anadolu; Kırık Dağları: Ege)",
            "Volkanik Dağlar (Ağrı, Tendürek, Süphan, Nemrut, Erciyes, Hasan, Karadağ)",
            "Platolar ve Ovalar (Karstik, Volkanik, Aşınım, Tabaka Düzlüğü, Delta)"
          ],
          mnemonics: [
            "KIRIK DAĞLAR ŞİFRESİ: K-A-Z-M-A-Y-U-N-T-B-O-Z-A-Y-D-I-N (Kaz, Madra, Yunt, Bozdağlar, Aydın, Menteşe + Nur Dağları).",
            "KARSTİK PLATOLAR: T-T (Teke ve Taşeli).",
            "LAV/VOLKANİK PLATOLAR: Erzurum-Kars ve Ardahan.",
            "AŞINIM PLATOLARI: Çatalca-Kocaeli."
          ],
          examTraps: [
            "Ege'deki Menteşe Dağları kıyıya PARALEL uzanır; bu yüzden Ege'de en çok yağış alan ve en engebeli yerdir!",
            "Karstik arazilerde (Teke-Taşeli) yer altı su sızması çok olduğu için yağış olsa bile yüzey suyu fakirdir ve tarım/yerleşme azdır."
          ],
          fastReviewNotes: [
            "Delta Ovaları: Çukurova (Seyhan-Ceyhan), Silifke (Göksu), Bafra (Kızılırmak), Çarşamba (Yeşilırmak), Balat, Menemen, Selçuk.",
            "Türkiye'nin en genç volkanik arazisi: Manisa Kula (Yanık Ülke)."
          ]
        }
      },
      {
        id: "cog-iklim",
        name: "Türkiye'nin İklimi & Bitki Örtüsü",
        subjectId: "cografya",
        osmyWeight: 8,
        videoLesson: {
          title: "İklim ve Bitki Örtüsü — Bayram Meral",
          instructor: "Bayram Meral",
          searchQuery: "KPSS Ön Lisans İklim Bitki Örtüsü Bayram Meral",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0klim%20Bitki%20%C3%96rt%C3%BCs%C3%BC%20Bayram%20Meral"
        },
        videoSolution: {
          title: "İklim ve Sıcaklık Soru Çözümü — Mehmet Eğit",
          instructor: "Mehmet Eğit",
          searchQuery: "KPSS Ön Lisans İklim Soru Çözümü Mehmet Eğit",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0klim%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20E%C4%9Fit"
        },
        summary: {
          keyConcepts: [
            "Basınç Merkezleri (Sibirya, Asor, Basra, İzlanda)",
            "Yerel Rüzgarlar (Karayel, Yıldız, Poyraz, Samyeli, Kıble, Lodos, Fön)",
            "Türkiye'de İklim Tipleri ve Yağış Rejimleri"
          ],
          mnemonics: [
            "RÜZGARLAR ŞİFRESİ: K-A-Y-I-P S-A-K-A-L (Kuzeybatı: Karayel, Kuzey: Yıldız, Kuzeydoğu: Poyraz - Soğuk / Güneydoğu: Samyeli, Güney: Kıble, Güneybatı: Lodos - Sıcak).",
            "TÜRKİYE 'e' ÇİZİMİ (En çok yağış): İç Anadolu (İlkbahar) -> Erzurum-Kars (Yaz) -> Karadeniz (Sonbahar) -> Akdeniz/Ege/Marmara (Kış)."
          ],
          examTraps: [
            "Fön rüzgarı her 100 metrede sıcaklığı 1°C artırır; Doğu Karadeniz'de mikroklima (Rize'de turunçgil) oluşturur."
          ],
          fastReviewNotes: [
            "Maki Akdeniz ikliminin bitki örtüsüdür (Zeytin, defne, zakkum, mersin).",
            "Karasal iklimde fiziksel (mekanik), Karadeniz'de kimyasal çözünme fazladır."
          ]
        }
      },
      {
        id: "cog-nufus",
        name: "Türkiye'de Nüfus ve Yerleşme",
        subjectId: "cografya",
        osmyWeight: 8,
        videoLesson: {
          title: "Nüfus ve Yerleşme — Bayram Meral",
          instructor: "Bayram Meral",
          searchQuery: "KPSS Ön Lisans Nüfus Yerleşme Bayram Meral",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20N%C3%BCfus%20Yerle%C5%9Fme%20Bayram%20Meral"
        },
        videoSolution: {
          title: "Nüfus ve Yerleşme Soru Çözümü — Mehmet Eğit",
          instructor: "Mehmet Eğit",
          searchQuery: "KPSS Ön Lisans Nüfus Soru Çözümü Mehmet Eğit",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20N%C3%BCfus%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20E%C4%9Fit"
        },
        summary: {
          keyConcepts: [
            "Türkiye Nüfusunun Yapısı (Yaş, cinsiyet, okuryazarlık, sektör dağılımı)",
            "Nüfus Dağılışını Etkileyen Faktörler (İklim, yerşekilleri, sanayi, ulaşım)",
            "Tenha Nüfuslu Alanlar (Teke-Taşeli, Yıldız Dağları, Biga-Gelibolu, Hakkari, Tuz Gölü Çevresi)"
          ],
          mnemonics: [
            "TENHA BÖLGELER: T-T (Teke-Taşeli: Karstik/Engebe), Hakkari (Yükselti/Soğuk), Tuz Gölü (Kuraklık), Biga-Gelibolu (Ulaşım yollarına sapa kalma)."
          ],
          examTraps: [
            "Tarımsal Nüfus Yoğunluğu = Çiftçi Sayısı / Tarım Alanı. Engebeli yerlerde (Doğu Karadeniz, Hakkari) tarım alanı az olduğu için tarımsal nüfus yoğunluğu ÇOK YÜKSEKTİR!"
          ],
          fastReviewNotes: [
            "Türkiye'de çalışan nüfusun en çok olduğu sektör HİZMET sektörüdür.",
            "Nüfus artış hızı en düşük olan dönem 1940-1945 (II. Dünya Savaşı seferberlik dönemi)."
          ]
        }
      },
      {
        id: "cog-ekonomik",
        name: "Türkiye'de Tarım, Hayvancılık, Maden & Sanayi",
        subjectId: "cografya",
        osmyWeight: 9,
        videoLesson: {
          title: "Ekonomik Coğrafya — Bayram Meral",
          instructor: "Bayram Meral",
          searchQuery: "KPSS Ön Lisans Ekonomik Coğrafya Bayram Meral",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Ekonomik%20Co%C4%9Frafya%20Bayram%20Meral"
        },
        videoSolution: {
          title: "Tarım ve Madenler Soru Çözümü — Mehmet Eğit",
          instructor: "Mehmet Eğit",
          searchQuery: "KPSS Ön Lisans Tarım Madenler Soru Çözümü Mehmet Eğit",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Tar%C4%B1m%20Madenler%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Mehmet%20E%C4%9Fit"
        },
        summary: {
          keyConcepts: [
            "Tarım Ürünleri Yetişme Alanları ve Devlet Kontrolündeki Ürünler (Pirinç, Haşhaş, Tütün, Kenevir, Şeker Pancarı)",
            "Hayvancılık Tipleri (Bozkır: Küçükbaş/Koyun, Maki: Kıl Keçisi, Erzurum: Büyükbaş/Mera, Karadeniz: Arıcılık)",
            "Stratejik Madenler (Bor: Balıkesir-Kütahya, Boksit: Seydişehir, Bakır: Murgul-Küre-Ergani, Demir: Divriği-Hekimhan, Krom: Guleman-Fethiye)"
          ],
          mnemonics: [
            "DEVLET KONTROLÜNDEKİ ÜRÜNLER (P-H-T-K-Ş): Pirinç (Sıtma), Haşhaş (Uyuşturucu), Tütün (Kalite), Kenevir (Uyuşturucu), Şeker Pancarı (Kota/Çabuk bozulma).",
            "KADER ŞİFRESİ (Bakır çıkarılan yerler): Kastamonu Küre, Artvin Murgul, Diyarbakır Ergani, Elazığ Maden, Rize Çayeli."
          ],
          examTraps: [
            "Şeker pancarı fabrikaları tarlaya YAKIN kurulmak zorundadır çünkü çabuk bozulur; çay da aynı şekilde tarlaya yakın işlenir.",
            "Bor dünyada %73 rezerv ile en çok Türkiye'dedir (Balıkesir Susurluk/Bigadiç, Bursa Mustafa Kemal Paşa, Kütahya Emet, Eskişehir Kırka)."
          ],
          fastReviewNotes: [
            "İpek böcekçiliği: Diyarbakır, Antalya, Bursa.",
            "Jeotermal enerji: Denizli Sarayköy, Aydın Germencik."
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // 5. VATANDAŞLIK & GÜNCEL BİLGİLER (15 Soru) - Emrah Vahap Özkaraca & Esra Özkan
  // ─────────────────────────────────────────────────────────
  {
    id: "vatandaslik",
    name: "Vatandaşlık & Güncel Bilgiler",
    shortName: "VAT",
    totalQuestions: 15,
    color: "border-orange-500 text-orange-400",
    bgColor: "bg-orange-500/10",
    topics: [
      {
        id: "vat-temel-hukuk",
        name: "Temel Hukuk Kavramları",
        subjectId: "vatandaslik",
        osmyWeight: 8,
        videoLesson: {
          title: "Temel Hukuk Kavramları — Emrah Vahap Özkaraca",
          instructor: "Emrah Vahap Özkaraca",
          searchQuery: "KPSS Ön Lisans Temel Hukuk Emrah Vahap Özkaraca",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Temel%20Hukuk%20Emrah%20Vahap%20%C3%96zkaraca"
        },
        videoSolution: {
          title: "Temel Hukuk Soru Çözümü — Esra Özkan Karaoğlu",
          instructor: "Esra Özkan Karaoğlu",
          searchQuery: "KPSS Ön Lisans Temel Hukuk Soru Çözümü Esra Özkan Karaoğlu",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Temel%20Hukuk%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Esra%20%C3%96zkan%20Karao%C4%9Flu"
        },
        summary: {
          keyConcepts: [
            "Sosyal Hayatı Düzenleyen Kurallar (Din, Ahlak, Görgü, Hukuk - Tek maddi yaptırımlı olan HUKUKTUR)",
            "Yaptırım (Müeyyide) Türleri (Ceza, Cebri İcra, Tazminat, İptal, Hükümsüzlük/Butlan)",
            "Hak Ehliyeti (Sağ ve tam doğumla başlar) vs Fiil Ehliyeti (Ayırt etme, Erginlik, Kısıtlı olmama)"
          ],
          mnemonics: [
            "HÜKÜMSÜZLÜK ŞİFRESİ: Yokluk (Resmi evlendirme memuru olmadan evlenme), Mutlak Butlan (Akıl hastasıyla evlenme), Nisbi Butlan (Korkutularak/sarhoşken evlenme).",
            "FİİL EHLİYETİ ŞARTLARI (3 ŞART): 1. Ayırt etme gücü (Mümeyyiz), 2. Ergin olmak (18 yaş veya evlilik/kazai rüşt), 3. Kısıtlı (mahcur) olmamak."
          ],
          examTraps: [
            "Hak ehliyeti PASİFTİR (Anne karnında sağ ve tam doğmak şartıyla başlar); Fiil ehliyeti AKTİFTİR (Hakları bizzat kullanabilme yeteneğidir).",
            "Maddi yaptırımı olan tek kural HUKUK kuralıdır; diğerleri manevi yaptırımlıdır."
          ],
          fastReviewNotes: [
            "Pozitif Hukuk (Müspet): Yürürlükteki yazılı ve yazısız tüm kurallar.",
            "Mevzu Hukuk: Yetkili makamlarca konulan SADECE YAZILI kurallar."
          ]
        }
      },
      {
        id: "vat-anayasa-tarihi",
        name: "Türk Anayasa Tarihi (1876 - 1982)",
        subjectId: "vatandaslik",
        osmyWeight: 8,
        videoLesson: {
          title: "Türk Anayasa Tarihi — Emrah Vahap Özkaraca",
          instructor: "Emrah Vahap Özkaraca",
          searchQuery: "KPSS Ön Lisans Anayasa Tarihi Emrah Vahap Özkaraca",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Anayasa%20Tarihi%20Emrah%20Vahap%20%C3%96zkaraca"
        },
        videoSolution: {
          title: "Anayasa Tarihi Soru Çözümü — Erdal Kesekler",
          instructor: "Erdal Kesekler",
          searchQuery: "KPSS Ön Lisans Anayasa Tarihi Soru Çözümü Erdal Kesekler",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Anayasa%20Tarihi%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Erdal%20Kesekler"
        },
        summary: {
          keyConcepts: [
            "1876 Kanun-i Esasi (İlk Anayasa)",
            "1921 Teşkilat-ı Esasiye (Tek yumuşak ve çerçeve anayasa, Meclis Hükümeti sistemi)",
            "1924 Anayasası (Devletin dini İslamdır maddesi 1928'de çıktı, Laiklik 1937'de girdi)",
            "1961 Anayasası (En özgürlükçü, Anayasa Mahkemesi ve çift meclis kuruldu)",
            "1982 Anayasası (Kazuistik, katı, yürütmeyi güçlendiren anayasa)"
          ],
          mnemonics: [
            "1921 ANAYASASI: Çerçeve (Kısa ve öz) ve Yumuşak (Değiştirilmesi kolay) TEK anayasadır. Yargıdan bahsetmez.",
            "KATI ANAYASALAR: 1876, 1924, 1961, 1982."
          ],
          examTraps: [
            "Laiklik ilkesi Anayasa'ya 1924 Anayasası döneminde 1937 yılında girmiştir (1921'de laiklik yoktur).",
            "1961 Anayasası'nda ÇİFT MECLİS (Millet Meclisi + Cumhuriyet Senatosu) varken 1982'de TEK MECLİS (TBMM) vardır."
          ],
          fastReviewNotes: [
            "Temel hak ve hürriyetlerden İLK KEZ bahseden anayasa: 1876 Kanun-i Esasi.",
            "Sosyal devlet ilkesinden ilk kez bahseden anayasa: 1961 Anayasası."
          ]
        }
      },
      {
        id: "vat-1982-organlar",
        name: "1982 Anayasası: Yasama, Yürütme ve Yargı",
        subjectId: "vatandaslik",
        osmyWeight: 10,
        videoLesson: {
          title: "Yasama, Yürütme ve Yargı — Emrah Vahap Özkaraca",
          instructor: "Emrah Vahap Özkaraca",
          searchQuery: "KPSS Ön Lisans Yasama Yürütme Yargı Emrah Vahap Özkaraca",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Yasama%20Y%C3%BCr%C3%BCtme%20Yarg%C4%B1%20Emrah%20Vahap%20%C3%96zkaraca"
        },
        videoSolution: {
          title: "Devlet Organları Soru Çözümü — Esra Özkan Karaoğlu",
          instructor: "Esra Özkan Karaoğlu",
          searchQuery: "KPSS Ön Lisans Devlet Organları Soru Çözümü Esra Özkan Karaoğlu",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20Devlet%20Organlar%C4%B1%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Esra%20%C3%96zkan%20Karao%C4%9Flu"
        },
        summary: {
          keyConcepts: [
            "Yasama: TBMM (600 Milletvekili, 5 yıllık dönem, Seçilme yaşı 18)",
            "TBMM Sayı Kuralları: Toplantı Yeter Sayısı (200), Karar Yeter Sayısı (En az 151), Anayasa Değişikliği (360 referandum, 400 doğrudan)",
            "Yürütme: Cumhurbaşkanı (40 yaş, Yükseköğrenim, 5 yıl, En fazla 2 dönem), Cumhurbaşkanlığı Kararnameleri",
            "Yargı: Anayasa Mahkemesi (15 üye, 12 yıl), Yargıtay, Danıştay, Uyuşmazlık Mahkemesi, HSK (13 üye)"
          ],
          mnemonics: [
            "SAYILAR ŞİFRESİ: 600 (Milletvekili), 200 (1/3 Toplantı yeter), 151 (1/4+1 En az karar yeter), 301 (Salt çoğunluk/Soruşturma istemi), 360 (3/5 Soruşturma açma / Anayasa referandum), 400 (2/3 Yüce Divan / Anayasa kabul).",
            "YÜKSEK MAHKEMELER (4 TANE): Anayasa Mahkemesi, Yargıtay, Danıştay, Uyuşmazlık Mahkemesi (Askeri Yargıtay ve Askeri Yüksek İdare Mahkemesi 2017'de KALDIRILDI)."
          ],
          examTraps: [
            "Cumhurbaşkanlığı Kararnamesi ile KİŞİ HAKLARI ve SİYASİ HAKLAR DÜZENLENEMEZ; sadece Sosyal ve Ekonomik haklar düzenlenebilir!",
            "Milletvekili dokunulmazlığını TBMM Genel Kurulu kaldırır; iptali için 7 gün içinde Anayasa Mahkemesi'ne başvurulur, AYM 15 günde karar verir."
          ],
          fastReviewNotes: [
            "Milletvekilliği düşmesi: İstifa ve devamsızlıkta TBMM kararı; kesin hüküm giyme ve kısıtlanmada mahkeme kararının meclise bildirilmesiyle kendiliğinden düşer.",
            "Anayasa Mahkemesi üyelerinin 3'ünü TBMM, 12'sini Cumhurbaşkanı seçer."
          ]
        }
      },
      {
        id: "vat-idare-hukuku",
        name: "İdare Hukuku & İdari Yapı",
        subjectId: "vatandaslik",
        osmyWeight: 9,
        videoLesson: {
          title: "İdare Hukuku ve Teşkilat — Emrah Vahap Özkaraca",
          instructor: "Emrah Vahap Özkaraca",
          searchQuery: "KPSS Ön Lisans İdare Hukuku Emrah Vahap Özkaraca",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0dare%20Hukuku%20Emrah%20Vahap%20%C3%96zkaraca"
        },
        videoSolution: {
          title: "İdare Hukuku Soru Çözümü — Erdal Kesekler",
          instructor: "Erdal Kesekler",
          searchQuery: "KPSS Ön Lisans İdare Hukuku Soru Çözümü Erdal Kesekler",
          directUrl: "https://www.youtube.com/results?search_query=KPSS%20%C3%96n%20Lisans%20%C4%B0dare%20Hukuku%20Soru%20%C3%87%C3%B6z%C3%BCm%C3%BC%20Erdal%20Kesekler"
        },
        summary: {
          keyConcepts: [
            "İdarenin Bütünlüğü: Hiyerarşi (Aynı tüzel kişilik içinde ast-üst ilişkisi) vs İdari Vesayet (Farklı kamu tüzel kişileri arasındaki denetim)",
            "Merkezden Yönetim: Başkent (CB, Bakanlıklar) ve Taşra (İl Genel, İlçe, Bucak)",
            "Yerinden Yönetim: Mahalli İdareler (İl Özel İdaresi, Belediye, Büyükşehir, Köy - Anayasal olarak güvencelidir)"
          ],
          mnemonics: [
            "HİYERARŞİ vs VESAYET FORMÜLÜ: Bakan -> Vali (Aynı tüzel kişilik: Devlet = Hiyerarşi), İçişleri Bakanı -> Belediye Başkanı (Devlet -> Belediye = Farklı tüzel kişilik: İdari Vesayet).",
            "KÖYÜN ORGANLARI: Muhtar, İhtiyar Heyeti, Köy Derneği (Köydeki tüm seçmenler)."
          ],
          examTraps: [
            "Yönetmelik çıkarma yetkisi: Cumhurbaşkanı, Bakanlıklar ve Kamu Tüzel Kişilerine aittir (Vali veya Kaymakam yönetmelik ÇIKARAMAZ!).",
            "Büyükşehir Belediyesi kanunla ve nüfusu en az 750.000 olan yerlerde kurulur; İl ve İlçe kurulması da KANUNLA olur."
          ],
          fastReviewNotes: [
            "Vali Cumhurbaşkanı kararıyla atanır ve yetki genişliğine sahip tek makamdır; Kaymakam Cumhurbaşkanı onayıyla atanır.",
            "Memurlukta adaylık süresi en az 1 yıl, en fazla 2 yıldır."
          ]
        }
      }
    ]
  }
];

export function getAllTopics() {
  return SUBJECTS.flatMap((s) => s.topics);
}

export function getSubjectById(subjectId: string) {
  return SUBJECTS.find((s) => s.id === subjectId);
}

export function getTopicById(topicId: string) {
  for (const s of SUBJECTS) {
    const t = s.topics.find((topic) => topic.id === topicId);
    if (t) return { topic: t, subject: s };
  }
  return null;
}
