import { useState, useEffect, useCallback } from "react";

const scrollbarStyle = `
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: #1a1008; }
  ::-webkit-scrollbar-thumb { background: #6b4a1e; border-radius: 6px; border: 2px solid #1a1008; }
  ::-webkit-scrollbar-thumb:hover { background: #9b6f3a; }
`;
const authors = [
  // ===================== DİVAN EDEBİYATI =====================
  {
    id: 101, donem: "Divan Edebiyatı", yazar: "Fuzuli",
    eserler: ["Leyla vü Mecnun (mesnevi)", "Türkçe Divan", "Farsça Divan", "Arapça Divan", "Beng ü Bade (mesnevi)", "Şikayetname (mektup)", "Hadikatu's-Süeda (nesir)"],
    ozellik: "Azerbaycan doğumlu. Üç dilde divan yazdı. Aşk ve ıstırap şairi. 'Su Kasidesi' en ünlü kasidesi. Divan şiirinin zirve isimlerinden."
  },
  {
    id: 102, donem: "Divan Edebiyatı", yazar: "Baki",
    eserler: ["Türkçe Divan", "Kanuni Mersiyesi (Kanuni Sultan Süleyman için)"],
    ozellik: "'Sultanü'ş-Şuara' (şairlerin sultanı) lakabı verildi. Kanuni döneminin en büyük şairi. Dünyevi zevkler ve duyusal güzelliği işledi."
  },
  {
    id: 103, donem: "Divan Edebiyatı", yazar: "Şeyh Galip",
    eserler: ["Hüsn ü Aşk (mesnevi)", "Türkçe Divan"],
    ozellik: "Divan edebiyatının son büyük şairi. Mevlevi. Hüsn ü Aşk; alegorik bir aşk ve tasavvuf mesnevisidir. Sebk-i Hindi akımının temsilcisi."
  },
  {
    id: 104, donem: "Divan Edebiyatı", yazar: "Nedim",
    eserler: ["Türkçe Divan"],
    ozellik: "Lale Devri şairi. Mahalli unsurlar, İstanbul sevgisi, neşe ve şatafat. Divan şiirine halk söyleyişini kattı. Şarkı türünün en büyük ustası."
  },
  {
    id: 105, donem: "Divan Edebiyatı", yazar: "Nabi",
    eserler: ["Hayriye (mesnevi - oğluna öğütler)", "Hayrabad (mesnevi)", "Türkçe Divan", "Tuhfetü'l-Harameyn (gezi)"],
    ozellik: "Hikemi (öğretici, didaktik) şiirin en büyük ustası. 'Söyle Nabi'ye ki' deyişiyle meşhur öğütçü şair."
  },
  {
    id: 106, donem: "Divan Edebiyatı", yazar: "Nefi",
    eserler: ["Türkçe Divan", "Farsça Divan", "Siham-ı Kaza (hiciv)"],
    ozellik: "Kaside ve hiciv ustası. Övgü kasidelerinde zirve. Hicivleri yüzünden öldürüldüğü rivayet edilir."
  },
  {
    id: 107, donem: "Divan Edebiyatı", yazar: "Naili",
    eserler: ["Türkçe Divan"],
    ozellik: "Sebk-i Hindi (Hint üslubu) akımının öncüsü. Ağır, kapalı dil, derin mazmunlar. 17. yüzyılın en özgün lirik şairlerinden."
  },
  {
    id: 108, donem: "Divan Edebiyatı", yazar: "Ahmedi",
    eserler: ["İskendername (mesnevi)", "Cemşid ü Hurşid (mesnevi)", "Divan"],
    ozellik: "14-15. yüzyıl. Osmanlı sahasında mesnevi türünün öncüsü. İskendername'de tarihi ve felsefi konuları işledi."
  },
  {
    id: 109, donem: "Divan Edebiyatı", yazar: "Şeyhî",
    eserler: ["Hüsrev ü Şirin (mesnevi)", "Harname (hiciv)", "Divan"],
    ozellik: "15. yüzyıl. Harname'de eşek, öküz ve kurtlar üzerinden sosyal eleştiri yaptı. Hüsrev ü Şirin mesnevi türünün şaheseri."
  },
  {
    id: 110, donem: "Divan Edebiyatı", yazar: "Ali Şir Nevai",
    eserler: ["Hamse (5 mesnevi)", "Muhakemetü'l-Lugateyn", "Mecalisü'n-Nefais (tezkire)", "Mizanü'l-Evzan"],
    ozellik: "Çağatay Türkçesinin en büyük şairi. Muhakemetü'l-Lugateyn'de Türkçenin Farsçadan üstün olduğunu savundu."
  },
  {
    id: 111, donem: "Divan Edebiyatı", yazar: "Süleyman Çelebi",
    eserler: ["Vesiletü'n-Necat (Mevlit)"],
    ozellik: "15. yüzyıl. Hz. Peygamber'in doğumunu anlatan Mevlit'in yazarı. Türk edebiyatının en çok okunan eserlerinden biri."
  },
  {
    id: 112, donem: "Divan Edebiyatı", yazar: "Bağdatlı Ruhi",
    eserler: ["Divan", "Terkib-i Bend (ünlü şiiri)"],
    ozellik: "16. yüzyıl. Terkib-i Bend'iyle tanınır; toplumsal aksaklıkları, kaderin cilvelerini ve dünya nimetlerinin geçiciliğini ele aldı."
  },
  {
    id: 113, donem: "Divan Edebiyatı", yazar: "Hayali Bey",
    eserler: ["Divan"],
    ozellik: "16. yüzyıl. Kanuni dönemi şairi. Tasavvufi ve lirik şiirleriyle tanınır. Baki ile birlikte dönemin en önemli şairlerinden."
  },
  {
    id: 114, donem: "Divan Edebiyatı", yazar: "Taşlıcalı Yahya",
    eserler: ["Şah u Geda (mesnevi)", "Yusuf u Züleyha (mesnevi)", "Divan"],
    ozellik: "16. yüzyıl. Mesnevi ve kasidede ustalığıyla tanınır. Şah u Geda'da sosyal sınıf farklılıklarını işledi."
  },
  {
    id: 115, donem: "Divan Edebiyatı", yazar: "Evliya Çelebi",
    eserler: ["Seyahatname (10 cilt gezi)"],
    ozellik: "17. yüzyıl. 40 yıl boyunca Osmanlı topraklarını gezdi. Seyahatname; tarih, coğrafya, folklor ve dil açısından eşsiz bir kaynak."
  },
  {
    id: 116, donem: "Divan Edebiyatı", yazar: "Katip Çelebi",
    eserler: ["Keşfü'z-Zünun (bibliyografya)", "Cihannüma (coğrafya)", "Fezleke (tarih)", "Mizan ül-Hakk (eleştiri)"],
    ozellik: "17. yüzyıl ansiklopedist. Batı bilimini tanıttı. Mizan ül-Hakk'ta dönemin tartışmalı konularını akılcı bir perspektifle ele aldı."
  },

  // ===================== HALK EDEBİYATI =====================
  {
    id: 201, donem: "Halk Edebiyatı", yazar: "Yunus Emre",
    eserler: ["Divan (şiirler)", "Risaletü'n-Nushiyye (mesnevi)"],
    ozellik: "13-14. yüzyıl. Tasavvuf şiirinin en büyük Türk temsilcisi. Sade dil, evrensel sevgi ve hoşgörü. 'İnsanı sev' felsefesi. Hece ve aruzla yazdı."
  },
  {
    id: 202, donem: "Halk Edebiyatı", yazar: "Hacı Bektaş Veli",
    eserler: ["Makalat (dört kapı-kırk makam öğretisi)", "Besmele Tefsiri", "Şathiyye"],
    ozellik: "13. yüzyıl. Bektaşilik tarikatının kurucusu. Makalat'ta ahlaki ve tasavvufi öğretileri sade bir dille anlattı."
  },
  {
    id: 203, donem: "Halk Edebiyatı", yazar: "Kaygusuz Abdal",
    eserler: ["Gevhername", "Budalaname", "Divan", "Vücutname"],
    ozellik: "15. yüzyıl. Alevi-Bektaşi geleneğinin önemli şairi. Şathiye türünün en güçlü temsilcisi. Dini kalıpları alaycı bir dille sorguladı."
  },
  {
    id: 204, donem: "Halk Edebiyatı", yazar: "Pir Sultan Abdal",
    eserler: ["Divan (şiirler - derleme)", "Kızılırmak türküsü"],
    ozellik: "16. yüzyıl. Alevi-Bektaşi şiirinin simgesi. İsyan, adalet ve inanç temalarını işledi. Hızır Paşa tarafından idam edildiği rivayet edilir."
  },
  {
    id: 205, donem: "Halk Edebiyatı", yazar: "Köroğlu",
    eserler: ["Köroğlu Destanı", "Bolu Beyi Koçaklaması", "Çağırış"],
    ozellik: "16. yüzyıl. Hem destan kahramanı hem şair. Zulme karşı isyanı temsil eder. Koçaklama türünün en önemli temsilcisi."
  },
  {
    id: 206, donem: "Halk Edebiyatı", yazar: "Karacaoğlan",
    eserler: ["Divan (şiirler - derleme)"],
    ozellik: "17. yüzyıl. Aşk, doğa ve gurbet temalarında hece vezniyle yazan en lirik âşık. Din dışı, dünyevi halk şiirinin zirvesi."
  },
  {
    id: 207, donem: "Halk Edebiyatı", yazar: "Aşık Ömer",
    eserler: ["Divan", "Şairname", "Letafetname"],
    ozellik: "17. yüzyıl. Hem hece hem aruzla yazan çok yönlü âşık. Şairnamesinde dönemin şairlerini tanıttı."
  },
  {
    id: 208, donem: "Halk Edebiyatı", yazar: "Gevheri",
    eserler: ["Divan (şiirler - derleme)"],
    ozellik: "17-18. yüzyıl. Koçaklama ve güzellemeleriyle tanınan âşık. Divan şiiri etkisinde hem aruz hem hece kullandı."
  },
  {
    id: 209, donem: "Halk Edebiyatı", yazar: "Dadaloğlu",
    eserler: ["Divan (şiirler - derleme)", "Kalktı Göç Eyledi Avşar Elleri"],
    ozellik: "19. yüzyıl. Toroslar yöresi Türkmen âşığı. Ferman dinlemem deyişiyle özgürlük ve isyan şairi. Koçaklamaları meşhurdur."
  },
  {
    id: 210, donem: "Halk Edebiyatı", yazar: "Aşık Veysel",
    eserler: ["Deyişler (şiirler - derleme)", "Uzun İnce Bir Yoldayım", "Koyun Beni Haline"],
    ozellik: "20. yüzyıl (1894-1973). Sivas'lı kör âşık. Tasavvufi ve felsefi deyişleriyle modern halk şiirinin zirvesi. Hece vezni."
  },
  {
    id: 211, donem: "Halk Edebiyatı", yazar: "Âşık Mahzuni Şerif",
    eserler: ["Deyişler (şiirler - derleme)", "Kara Toprak", "Rıza'yı Batır"],
    ozellik: "20. yüzyıl. Alevi-Bektaşi geleneğini modern dille sürdürdü. Sosyal eleştiri ve hümanist temalar ön plandadır."
  },
  {
    id: 212, donem: "Halk Edebiyatı", yazar: "Dede Korkut",
    eserler: ["Dede Korkut Hikayeleri (12 boy)", "Dede Korkut Kitabı (Kitab-ı Dedem Korkut)"],
    ozellik: "Oğuz Türklerinin destansı anlatı geleneği. Boy biçiminde düzenlenmiş 12 hikaye. Kahraman tipi, töre, aile ve vatan sevgisi ön planda."
  },
  {
    id: 213, donem: "Halk Edebiyatı", yazar: "Nasreddin Hoca",
    eserler: ["Letaif (fıkralar - derleme)"],
    ozellik: "13. yüzyıl. Türk halk mizahının simgesi. Fıkraları; zekâ, eleştiri ve felsefeyi bir arada barındırır. Tüm dünyada tanınır."
  },
  {
    id: 214, donem: "Halk Edebiyatı", yazar: "Aşık Paşa",
    eserler: ["Garibname (mesnevi - 10 bin beyit)", "Fakrname", "Vasf-ı Hal"],
    ozellik: "14. yüzyıl. Garibname; halka Türkçe öğütler veren, tasavvufi ve ahlaki büyük bir eser. Anadolu'da Türkçeyi savunan öncü şair."
  },
  {
    id: 215, donem: "Halk Edebiyatı", yazar: "Âşık Seyrani",
    eserler: ["Divan (şiirler - derleme)"],
    ozellik: "19. yüzyıl. Kayseri'li âşık. Hiciv ve toplumsal eleştiriyle tanınır. Hem taşlamalarıyla hem aşk şiirleriyle ünlüdür."
  },
  {
    id: 216, donem: "Halk Edebiyatı", yazar: "Erzurumlu Emrah",
    eserler: ["Divan", "Deyişler (şiirler - derleme)"],
    ozellik: "18-19. yüzyıl. Lirik aşk şiirleriyle ve hem aruz hem hece kullanımıyla tanınan Doğu Anadolu'nun büyük âşığı."
  },

  // ===================== TANZİMAT VE SONRASI =====================
  {
    id: 1, donem: "Tanzimat (1. Dönem)", yazar: "Şinasi",
    eserler: ["Şair Evlenmesi (tiyatro)", "Tercüme-i Manzume (şiir)", "Müntehabat-ı Eş'ar"],
    ozellik: "İlk noktalama işaretlerini kullanan, ilk makaleyi yazan, ilk özel gazeteyi (Tercüman-ı Ahval) çıkaran yazar."
  },
  {
    id: 2, donem: "Tanzimat (1. Dönem)", yazar: "Namık Kemal",
    eserler: ["İntibah (roman)", "Cezmi (roman)", "Vatan yahut Silistre (tiyatro)", "Zavallı Çocuk (tiyatro)", "Gülnihal (tiyatro)", "Akif Bey (tiyatro)"],
    ozellik: "Vatan, hürriyet, hak kavramlarını işleyen Tanzimat'ın en önemli ismi. İlk edebi romanı yazdı."
  },
  {
    id: 3, donem: "Tanzimat (1. Dönem)", yazar: "Ziya Paşa",
    eserler: ["Harabat (antoloji)", "Zafername (hiciv)", "Terkib-i Bend", "Terci-i Bend"],
    ozellik: "Divan şiirini savundu. 'Şiir ve İnşa' makalesinde halk edebiyatını savunurken eserlerinde divan tarzını bırakmadı."
  },
  {
    id: 4, donem: "Tanzimat (1. Dönem)", yazar: "Ahmet Mithat Efendi",
    eserler: ["Felatun Bey ile Rakım Efendi (roman)", "Henüz On Yedi Yaşında (roman)", "Hasan Mellah (roman)", "Dürdane Hanım (roman)", "Müşahedat (roman)", "Paris'te Bir Türk (roman)", "Yeryüzünde Bir Melek (roman)", "Jön Türk (roman)"],
    ozellik: "Halkı bilinçlendirmeyi amaçladı. 'Romanım okuyanlara okuma zevki veririm' anlayışı. Çok üretken."
  },
  {
    id: 5, donem: "Tanzimat (2. Dönem)", yazar: "Recaizade Mahmut Ekrem",
    eserler: ["Araba Sevdası (roman)", "Zemzeme (şiir)", "Nağme-i Seher (şiir)", "Yadigâr-ı Şebâb (şiir)", "Pejmürde (şiir)", "Nijad Ekrem (şiir)", "Talim-i Edebiyat (eleştiri)", "Çok Bilen Çok Yanılır (tiyatro)"],
    ozellik: "Sanat için sanat anlayışı. Yeni edebiyatı savundu. Servet-i Fünun'u destekledi."
  },
  {
    id: 6, donem: "Tanzimat (2. Dönem)", yazar: "Samipaşazade Sezai",
    eserler: ["Sergüzeşt (roman)", "Küçük Şeyler (hikaye)"],
    ozellik: "İlk realist roman sayılan Sergüzeşt'i yazdı. Esir ticaretini işledi."
  },
  {
    id: 6.1, donem: "Tanzimat (1. Dönem)", yazar: "Şemsettin Sami",
    eserler: ["Taaşuk-ı Talat ve Fıtnat (roman)", "Kamus-ı Türkî (sözlük)", "Kamus-ı Alam (ansiklopedi)"],
    ozellik: "Türk edebiyatında ilk yerli romanın yazarı. Dilbilim ve sözlük alanında çığır açtı."
  },
  {
    id: 6.2, donem: "Tanzimat (2. Dönem)", yazar: "Nabizade Nazım",
    eserler: ["Karabibik (roman)", "Zehra (roman)"],
    ozellik: "Karabibik Türk edebiyatının ilk köy romanı; Zehra ilk psikolojik roman denemesidir. Natüralizm etkisinde."
  },
  {
    id: 6.3, donem: "Tanzimat (2. Dönem)", yazar: "Fatma Aliye Hanım",
    eserler: ["Muhadarat (roman)", "Hayal ve Hakikat (roman)", "Ref'et (roman)", "Levâyih-i Hayât (roman)", "Udî (roman)", "Enin (roman)"],
    ozellik: "Türk edebiyatında kadın yazar tarafından yazılan ilk roman Muhadarat'ın yazarı. Kadın haklarının savunucusu."
  },
  {
    id: 6.4, donem: "Servet-i Fünun", yazar: "Hüseyin Rahmi Gürpınar",
    eserler: ["Şıpsevdi (roman)", "Mürebbiye (roman)", "Gulyabani (roman)", "Şık (roman)", "Nimetşinas (roman)", "Metres (roman)", "Hakk'a Sığındık (roman)", "Deli Filozof (roman)"],
    ozellik: "Natüralizmin en güçlü temsilcisi. Toplumsal eleştiri, töre romanı. 'Sokağı edebiyata taşıyan yazar' olarak anılır."
  },
  {
    id: 7, donem: "Servet-i Fünun", yazar: "Tevfik Fikret",
    eserler: ["Rübab-ı Şikeste (şiir)", "Haluk'un Defteri (şiir)", "Rübabın Cevabı (şiir)", "Şermin (çocuk şiirleri)", "Tarih-i Kadim (şiir)"],
    ozellik: "Servet-i Fünun'un şiir lideri. Toplumsal eleştiri, kötümserlik. Aruz veznini ustalıkla kullandı."
  },
  {
    id: 8, donem: "Servet-i Fünun", yazar: "Cenap Şahabettin",
    eserler: ["Tamat (şiir)", "Evrak-ı Leyal (şiir)", "Hac Yolunda (gezi)"],
    ozellik: "Sembolist etki, musiki, ağır dil. 'Elhan-ı Şita' en ünlü şiiri."
  },
  {
    id: 9, donem: "Servet-i Fünun", yazar: "Halit Ziya Uşaklıgil",
    eserler: ["Aşk-ı Memnu (roman)", "Mai ve Siyah (roman)", "Kırık Hayatlar (roman)", "Sefile (roman)", "Nemide (roman)", "Ferdi ve Şürekâsı (roman)", "Nesl-i Ahir (roman)", "Bir Ölünün Defteri (hikaye)", "Sepette Bulunmuş (hikaye)", "Onu Beklerken (hikaye)"],
    ozellik: "Türk romanını Avrupalı teknikle yazan ilk yazar. Aşk-ı Memnu Türk edebiyatının zirvesi."
  },
  {
    id: 10, donem: "Servet-i Fünun", yazar: "Mehmet Rauf",
    eserler: ["Eylül (roman)", "Ferda-yı Garam (roman)", "Genç Kız Kalbi (roman)", "Karanfil ve Yasemin (hikaye)", "Define (roman)", "Böğürtlen (roman)", "Halas (roman)", "Kan Damlası (roman)", "Son Yıldız (roman)"],
    ozellik: "İlk psikolojik roman sayılan Eylül'ü yazdı."
  },
  {
    id: 11, donem: "Fecr-i Ati / Bağımsız", yazar: "Ahmet Haşim",
    eserler: ["Göl Saatleri (şiir)", "Piyale (şiir)", "Bize Göre (deneme)", "Gurabahane-i Laklakan (deneme/gezi)"],
    ozellik: "Sembolizm. Şiirin müzikle ilişkisi. 'Şiir dilsiz musikiye benzer.' anlayışı."
  },
  {
    id: 12, donem: "Milli Edebiyat", yazar: "Ziya Gökalp",
    eserler: ["Kızıl Elma (şiir)", "Altın Işık (şiir)", "Yeni Hayat (şiir)", "Türkçülüğün Esasları (makale)", "Türkleşmek İslamlaşmak Muasırlaşmak"],
    ozellik: "Türkçülük akımının ideologu. Hece veznini savundu. Milliyetçi düşünce."
  },
  {
    id: 13, donem: "Milli Edebiyat", yazar: "Mehmet Akif Ersoy",
    eserler: ["Safahat (7 bölümlü şiir kitabı)", "İstiklal Marşı"],
    ozellik: "İstiklal Marşı şairi. Aruz veznini konuşma diliyle birleştirdi. Toplumcu, dini temalar."
  },
  {
    id: 14, donem: "Milli Edebiyat", yazar: "Ömer Seyfettin",
    eserler: ["Primo Türk'ün Macerası", "Yüksek Ökçeler", "Kaşağı", "Bomba", "Forsa", "Ant", "Başını Vermeyen Şehit"],
    ozellik: "Türk hikayeciliğinin babası. Sade Türkçe. Milliyetçi temalar. Genç Kalemler hareketi."
  },
  {
    id: 15, donem: "Milli Edebiyat", yazar: "Yahya Kemal Beyatlı",
    eserler: ["Kendi Gök Kubbemiz (şiir)", "Eski Şiirin Rüzgârıyle (şiir)", "Rubâiler ve Hayyam Rubâilerini Türkçe Söyleyiş (şiir)", "Aziz İstanbul (nesir)", "Siyasi ve Edebi Portreler"],
    ozellik: "Neoklasik şiir. Osmanlı-İstanbul özlemi. Aruz ustası. Hiç kitap yayımlamadı (hayatında)."
  },
  {
    id: 16, donem: "Cumhuriyet Dönemi", yazar: "Nazım Hikmet",
    eserler: ["Memleketimden İnsan Manzaraları", "Şeyh Bedrettin Destanı", "835 Satır", "Kuvayı Milliye", "Benerci Kendini Niçin Öldürdü"],
    ozellik: "Serbest nazım. Toplumcu gerçekçilik. Marksist görüş. Türk şiirinde devrim yarattı."
  },
  {
    id: 17, donem: "Cumhuriyet Dönemi", yazar: "Orhan Veli Kanık",
    eserler: ["Garip (manifesto+şiir)", "Vazgeçemediğim (şiir)", "Destan Gibi (şiir)", "Yenisi (şiir)", "Karşı (şiir)"],
    ozellik: "Garip hareketi (Orhan Veli, Melih Cevdet, Oktay Rıfat). Sıradan insanı şiire taşıdı. Kafiye ve vezni reddetti."
  },
  {
    id: 18, donem: "Cumhuriyet Dönemi", yazar: "Ahmet Hamdi Tanpınar",
    eserler: ["Huzur (roman)", "Saatleri Ayarlama Enstitüsü (roman)", "Mahur Beste (roman)", "Beş Şehir (deneme)", "XIX. Asır Türk Edebiyatı Tarihi"],
    ozellik: "Doğu-Batı sentezi, zaman-bellek temaları. Türk edebiyatının en özgün düzyazı ustalarından."
  },
  {
    id: 19, donem: "Cumhuriyet Dönemi", yazar: "Sabahattin Ali",
    eserler: ["Kürk Mantolu Madonna (roman)", "İçimizdeki Şeytan (roman)", "Kuyucaklı Yusuf (roman)", "Değirmen (hikaye)", "Ses (hikaye)"],
    ozellik: "Toplumcu gerçekçilik. Küçük insanın dramı. Kürk Mantolu Madonna Türkçenin en çok okunan romanı."
  },
  {
    id: 20, donem: "Cumhuriyet Dönemi", yazar: "Reşat Nuri Güntekin",
    eserler: ["Çalıkuşu (roman)", "Yaprak Dökümü (roman)", "Dudaktan Kalbe (roman)", "Acımak (roman)", "Damga (roman)", "Kızılcık Dalları (roman)", "Yeşil Gece (roman)", "Miskinler Tekkesi (roman)", "Akşam Güneşi (roman)"],
    ozellik: "Anadolu'yu konu aldı. Feride karakteri (Çalıkuşu) simge oldu. Sade ve akıcı dil."
  },
  {
    id: 21, donem: "Cumhuriyet Dönemi", yazar: "Halide Edib Adıvar",
    eserler: ["Sinekli Bakkal (roman)", "Vurun Kahpeye (roman)", "Ateşten Gömlek (roman)", "Handan (roman)", "Seviye Talip (roman)", "Yeni Turan (roman)", "Mev'ud Hüküm (roman)", "Tatarcık (roman)", "Kalp Ağrısı (roman)"],
    ozellik: "Milli mücadele romanlarının öncüsü. Güçlü kadın karakterler. Sinekli Bakkal'ı İngilizce yazdı."
  },
  {
    id: 22, donem: "Cumhuriyet Dönemi", yazar: "Yakup Kadri Karaosmanoğlu",
    eserler: ["Kiralık Konak (roman)", "Yaban (roman)", "Ankara (roman)", "Sodom ve Gomore (roman)", "Nur Baba (roman)", "Hüküm Gecesi (roman)", "Bir Sürgün (roman)", "Panorama I-II (roman)", "Hep O Şarkı (roman)"],
    ozellik: "Toplumsal çöküş ve dönüşüm temaları. Yaban'da aydın-halk çatışması. Milli Edebiyat'tan Cumhuriyet'e."
  },
  {
    id: 23, donem: "Cumhuriyet Dönemi", yazar: "Refik Halit Karay",
    eserler: ["Memleket Hikayeleri (hikaye)", "Gurbet Hikayeleri (hikaye)", "Çete (roman)", "Sürgün (roman)", "Nilgün (roman)", "Anahtar (roman)", "Yezid'in Kızı (roman)", "İstanbul'un İç Yüzü (roman)", "Dışarıdakiler (roman)"],
    ozellik: "Anadolu'yu sürgün gözüyle anlattı. İroni ve mizah ustası. Yüksek anlatı tekniği."
  },
  {
    id: 24, donem: "Cumhuriyet Dönemi", yazar: "Sait Faik Abasıyanık",
    eserler: ["Semaver (hikaye)", "Sarnıç (hikaye)", "Şahmerdan (hikaye)", "Lüzumsuz Adam (hikaye)", "Mahalle Kahvesi (hikaye)", "Havada Bulut (hikaye)", "Kumpanya (hikaye)", "Havuz Başı (hikaye)", "Son Kuşlar (hikaye)", "Alemdağ'da Var Bir Yılan (hikaye)", "Medarı Maişet Motoru (roman)"],
    ozellik: "Türk hikayeciliğinin en özgün sesi. İstanbul'un kenar semtleri, balıkçılar, yalnız insanlar."
  },
  {
    id: 25, donem: "Cumhuriyet Dönemi", yazar: "Yaşar Kemal",
    eserler: ["İnce Memed (roman - 4 cilt)", "Ortadirek (roman)", "Yer Demir Gök Bakır (roman)", "Teneke (roman)"],
    ozellik: "Çukurova destanları. Epik anlatı. Nobel'e aday gösterildi. Sözlü kültürü romana taşıdı."
  },
  {
    id: 26, donem: "Cumhuriyet Dönemi", yazar: "Orhan Pamuk",
    eserler: ["Kar (roman)", "Masumiyet Müzesi (roman)", "Benim Adım Kırmızı (roman)", "Sessiz Ev (roman)", "Cevdet Bey ve Oğulları (roman)"],
    ozellik: "2006 Nobel Edebiyat Ödülü. Doğu-Batı çatışması, hafıza, kimlik. Postmodern anlatı."
  },
  // === PDF'den eklenen yeni Divan Edebiyatı yazarları ===
  {
    id: 117, donem: "Divan Edebiyatı", yazar: "Hoca Dehhani",
    eserler: ["Divan", "Selçuk Şehnamesi"],
    ozellik: "Bilinen ilk divan şairi. Din dışı konularda ve lirik tarzda şiirler yazdı. Horasan'dan Anadolu'ya geldi. İran edebiyatı etkisiyle din dışı şiirler yazan ilk şairimiz."
  },
  {
    id: 118, donem: "Divan Edebiyatı", yazar: "Mevlana Celaleddin Rumi",
    eserler: ["Mesnevi (26.000 beyit, Farsça)", "Divan-ı Kebir (Farsça)", "Fihi Ma Fih", "Mektubat"],
    ozellik: "Tasavvuf edebiyatının en önemli ismi. Mevlevilik tarikatının kurucusu. Konya'da yaşadı. Eserlerini Farsça yazdı (birkaç Türkçe beyit hariç). Şems-i Tebrizi ile tanışması hayatını değiştirdi."
  },
  {
    id: 119, donem: "Divan Edebiyatı", yazar: "Sultan Veled",
    eserler: ["Divan (13.335 beyit)", "Veledname (İbtidaname)", "Rebabnâme", "İntihanâme"],
    ozellik: "Mevlana'nın oğlu. Mevlevîlik tarikatının kurucusu. Farsça ve Türkçe şiirler yazdı. Türkçe şiirleri tasavvufu sade dille anlatması bakımından önemlidir."
  },
  {
    id: 120, donem: "Divan Edebiyatı", yazar: "Şeyyad Hamza",
    eserler: ["Yusuf u Züleyha (mesnevi - divan edebiyatının ilk Yusuf u Züleyha mesnevisi)"],
    ozellik: "14. yüzyıl. Dini ve tasavvufi şiirler yazdı. Hem aruz hem hece kullandı. Yunus tarzı şiirin habercisi sayılır. Şiirleri 13. yüzyıl Türkçesini göstermesi bakımından önemlidir."
  },
  {
    id: 121, donem: "Divan Edebiyatı", yazar: "Gülşehri",
    eserler: ["Mantık'ut-Tayr (mesnevi, Feridüddin Attar'dan çeviri)", "Felekname (Farsça mesnevi)"],
    ozellik: "14. yüzyıl. Farsça ve Arapça bilmesine karşın Türkçe yazdı. Mantık'ut-Tayr'da Türk dilinin Farsça ve Arapçadan üstün olduğunu savundu. Ahilik postuna oturdu."
  },
  {
    id: 122, donem: "Divan Edebiyatı", yazar: "Kadı Burhaneddin",
    eserler: ["Türkçe Divan"],
    ozellik: "14. yüzyıl (1344-1398). Sivas'ta tahta çıkan hükümdar-şair. Azerbaycan Türkçesiyle yazdı. Tuyuğ nazım biçiminin en önemli temsilcisi. Hem hece hem aruz kullandı."
  },
  {
    id: 123, donem: "Divan Edebiyatı", yazar: "Seyyid Nesimi",
    eserler: ["Türkçe Divan", "Farsça Divan"],
    ozellik: "14-15. yüzyıl. Azerbaycan sahasında yetişti. Hurufilik tarikatının savunucusu. Bu inancı yüzünden Halep'te derisi yüzülerek öldürüldü. Tasavvufi ve lirik şiirleri ile tuyuğlarıyla meşhurdur."
  },
  {
    id: 124, donem: "Divan Edebiyatı", yazar: "Ahmet Paşa",
    eserler: ["Divan"],
    ozellik: "15. yüzyıl. 'Şairler sultanı' unvanı verildi. Fatih'in veziri ve sohbet arkadaşı. 'Kerem' redifli kasidesiyle idamdan kurtuldu. Türkçeyi bilinçli ve ölçülü kullandı."
  },
  {
    id: 125, donem: "Divan Edebiyatı", yazar: "Necati Bey",
    eserler: ["Divan"],
    ozellik: "15. yüzyıl (?-1509). Kastamonu'da nakkaşlık yaparken ünü saraya ulaştı. Sade halk Türkçesiyle yazdı. Deyim ve atasözlerinden yararlandı. Fuzuli ve Baki'yi etkiledi."
  },
  {
    id: 126, donem: "Divan Edebiyatı", yazar: "Keçecizade İzzet Molla",
    eserler: ["Mihnet-i Keşan (mesnevi)", "Gülşen-i Aşk (mesnevi)", "Divan"],
    ozellik: "19. yüzyıl (1785-1829). Divan şiirinin Tanzimat öncesi son büyük ustası. Nef'i, Nedim, Şeyh Galip ve Fuzuli'nin etkileri görülür. Kaside, gazel ve mesnevide başarılı örnekler verdi."
  },
  {
    id: 127, donem: "Divan Edebiyatı", yazar: "Enderunlu Vasıf",
    eserler: ["Divan-ı Gülşen-i Efkâr-ı Vasıf-ı Enderuni"],
    ozellik: "18-19. yüzyıl (1759-1824). Zamanının çok okunan şairi. İstanbul'un halk ağzını ve kadınlara özgü dili kullandı. Mahallileşme akımının temsilcisi. Şarkıları bestelenmiştir."
  },
  // === PDF'den eklenen yeni Halk Edebiyatı yazarları ===
  {
    id: 217, donem: "Halk Edebiyatı", yazar: "Hacı Bayram Veli",
    eserler: ["Deyişler (şiirler - derleme)"],
    ozellik: "15. yüzyıl. Ankara'nın manevi mimarı. Bayramiyye tarikatının kurucusu. Şiirlerinde tasavvufi temalar. Fatih Sultan Mehmet üzerinde büyük etkisi oldu."
  },
  {
    id: 218, donem: "Halk Edebiyatı", yazar: "Eşrefoğlu Rumi",
    eserler: ["Divan", "Müzekkin-Nüfus (nesir)"],
    ozellik: "15. yüzyıl. Kadiriyye tarikatının Anadolu'daki kurucusu. Tasavvufi şiirleriyle tanınır. İznik'te yaşadı. Sade ve içten bir dil kullandı."
  },
  {
    id: 219, donem: "Halk Edebiyatı", yazar: "Niyazi-i Mısri",
    eserler: ["Divan", "Risaleler"],
    ozellik: "17. yüzyıl. Halveti-Mısriyye tarikatının kurucusu. Bursa'da yaşadı. Görüşleri nedeniyle Rodos'a sürgün edildi. Tasavvufi şiirleri sade ve lirik bir dille kaleme aldı."
  },
  {
    id: 220, donem: "Halk Edebiyatı", yazar: "Erzurumlu İbrahim Hakkı",
    eserler: ["Marifetname (ansiklopedik eser)", "Divan"],
    ozellik: "18. yüzyıl (1703-1780). Hem mutasavvıf hem bilim insanı. Marifetname; astronomi, tıp, din ve tasavvufu kapsayan ansiklopedik bir eserdir. 'Tefevvüz' anlayışıyla meşhurdur."
  },
  {
    id: 221, donem: "Halk Edebiyatı", yazar: "Kayıkçı Kul Mustafa",
    eserler: ["Genç Osman Destanı", "Koçaklamalar"],
    ozellik: "17. yüzyıl. IV. Murat döneminde yaşamış yeniçeri şair. Bağdat kuşatmasında şehit düşen Genç Osman için yazdığı destan en ünlü eseridir. Hece ölçüsü ve yalın dil kullandı."
  },
  {
    id: 222, donem: "Halk Edebiyatı", yazar: "Ercişli Emrah",
    eserler: ["Ercişli Emrah ile Selvihan Hikâyesi", "Deyişler"],
    ozellik: "17. yüzyıl. Hayatıyla ilgili bilgiler çok azdır. Sadece hece veznini kullandı. Divan şiirinden etkilenmedi. Şiirlerinde aşk, tabiat, sevgili ve gurbet konularını işledi."
  },
  {
    id: 223, donem: "Halk Edebiyatı", yazar: "Dertli",
    eserler: ["Divan", "Deyişler"],
    ozellik: "19. yüzyıl. Asıl adı İbrahim. Bolu-Gerede doğumlu. Önce 'Lütfi' mahlasını kullandı, sonra 'Dertli' dedi. Hem dini-tasavvufi hem toplumsal hem bireysel konuları işledi. Divan şiirinden etkilendi."
  },
  {
    id: 224, donem: "Halk Edebiyatı", yazar: "Bayburtlu Zihni",
    eserler: ["Sergüzeştnâme", "Divan", "Koşmalar ve Destanlar"],
    ozellik: "19. yüzyıl. Asıl adı Mehmed Emin. 1828 Rus istilası sırasında harap olan Bayburt'u anlattığı koşması büyük şöhret kazandırdı. Sağlığında divan düzenleyerek saraya sunan ender halk şairlerindendi."
  },
  {
    id: 225, donem: "Halk Edebiyatı", yazar: "Sümmani",
    eserler: ["Koşmalar ve Deyişler (derleme)"],
    ozellik: "19. yüzyıl. Erzurum-Narman doğumlu. Hem aruz hem hece kullandı. Şiirlerinin büyük bölümü koşmalardan oluşur. Aşk, ayrılık, hasret, ölüm ve tabiat temaları işledi."
  },
  {
    id: 226, donem: "Halk Edebiyatı", yazar: "Ruhsati",
    eserler: ["Koşmalar (derleme)"],
    ozellik: "19. yüzyıl. Sivas-Kangal doğumlu. Doğaçlama güzel şiirler söyledi ancak saz çalamadı. Şiirlerin çoğu koşma türünde. Sade dille aşk, ölüm, gurbet, yoksulluk konularını işledi."
  },
  {
    id: 227, donem: "Halk Edebiyatı", yazar: "Neşet Ertaş",
    eserler: ["Deyişler ve Türküler (derleme)", "Gönül Dağı", "Yaylalar"],
    ozellik: "20. yüzyıl (1938-2012). Kırşehir-Keskin doğumlu. Türk halk müziğinin en önemli temsilcilerinden. Diyar diyar dolaşarak yaşadı. Sivas Konservatuvarı tarafından fahri doktora verildi."
  },
  // === PDF'den eklenen Tanzimat yazarları ===
  {
    id: 27, donem: "Tanzimat (2. Dönem)", yazar: "Abdülhak Hamit Tarhan",
    eserler: ["Makber (şiir)", "Sahra (şiir)", "Ölü (şiir)", "Hacle (şiir)", "Divaneliklerim yahut Belde (şiir)", "Bâlâ'dan Bir Ses (şiir)", "Validem (şiir)", "Eşber (tiyatro)", "Nesteren (tiyatro)", "Sardanapal (tiyatro)", "İçli Kız (tiyatro)"],
    ozellik: "1852-1937. 'Şair-i Azam' lakabı. Makber: eşinin ölümü üzerine, Türk edebiyatının ilk metafizik şiiri. Sahra: ilk pastoral şiir. Eşber: aruzla yazılan ilk manzum tiyatro."
  },
  {
    id: 28, donem: "Tanzimat (2. Dönem)", yazar: "Muallim Naci",
    eserler: ["Ateşpare (şiir)", "Şerare (şiir)", "Fürûzan (şiir)", "Demdeme (eleştiri)", "Yadigâr-ı Naci"],
    ozellik: "1850-1893. Eski edebiyatın son güçlü kalemi. Recaizade Mahmut Ekrem ile kafiye tartışması yaptı (Demdeme vs Zemzeme). Hem eski hem yeni tarzda şiirler yazdı."
  },
  {
    id: 29, donem: "Servet-i Fünun", yazar: "Süleyman Nazif",
    eserler: ["Gizli Figanlar (şiir)", "Firak-ı Irak (şiir)", "Batarya ile Ateş (şiir-nesir)", "Malta Geceleri"],
    ozellik: "1870-1927. Servet-i Fünun şairi. Hem bireysel romantik şiirler hem milli konulu yazılar kaleme aldı. Malta'ya sürgün edildi. Halit Ziya Uşaklıgil ile yakın dosttu."
  },
  // === PDF'den eklenen Milli Edebiyat şairleri ===
  {
    id: 30, donem: "Milli Edebiyat", yazar: "Mehmet Emin Yurdakul",
    eserler: ["Türkçe Şiirler", "Cenge Giderken", "Ey Türk Uyan"],
    ozellik: "1869-1944. 'Türk Şairi' lakabı. Şiirlerini sade Türkçe ve hece vezniyle yazdı. Milliyetçi duygu ve düşünceler işledi. Milli Edebiyat akımının öncülerinden."
  },
  {
    id: 31, donem: "Milli Edebiyat", yazar: "Faruk Nafiz Çamlıbel",
    eserler: ["Han Duvarları (şiir kitabı)", "Gönülden Gönüle (şiir kitabı)", "Dinle Neyden (şiir kitabı)", "Çoban Çeşmesi (şiir)", "Sanat (şiir)", "Bir Ömür Böyle Geçti (şiir kitabı)", "Akıncı Türküleri (şiir kitabı)"],
    ozellik: "1898-1973. Beş Hececilerin en güçlü ismi. Sanat şiiri memleket edebiyatının bildirisi sayılır. Aşk, hasret, tabiat ve memleket konularını işledi. Aruzdan heceye geçişin öncüsü."
  },
  {
    id: 32, donem: "Milli Edebiyat", yazar: "Halit Fahri Ozansoy",
    eserler: ["Sonsuz Gecelerin Ötesinde (şiir kitabı)", "Rüya (şiir kitabı)", "Cenk Duyguları (şiir kitabı)", "Gülistanlar ve Harabeler (şiir kitabı)", "Baykuş (manzum tiyatro)"],
    ozellik: "1891-1971. Beş Hececilerden. Aruza Veda şiiri grubun aruzdan heceye geçiş şiiri oldu. Aşk ve ölüm konularında melankolik şiirler yazdı. Tiyatro, roman, çeviri türlerinde de eser verdi."
  },
  {
    id: 33, donem: "Milli Edebiyat", yazar: "Enis Behiç Koryürek",
    eserler: ["Miras (şiir kitabı)", "Varidat-ı Süleyman (şiir kitabı)", "Güneşin Ölümü", "Eski Korsan Hikâyeleri (manzum)"],
    ozellik: "1892-1949. Beş Hececilerden. Ziya Gökalp'in tavsiyesiyle heceye yöneldi. Beş Hececiler içinde tasavvuf konularında şiirler yazan tek şair. Türk denizcilik tarihinden ilham aldı."
  },
  {
    id: 34, donem: "Milli Edebiyat", yazar: "Yusuf Ziya Ortaç",
    eserler: ["Akından Akına (şiir kitabı)", "Cenk Ufukları (şiir kitabı)", "Kuş Cıvıltıları (şiir kitabı)", "Binnaz (manzum piyes)"],
    ozellik: "1896-1967. Beş Hececilerden. Binnaz edebiyatımızın ilk başarılı manzum piyesi. Uzun yıllar Akbaba mizah dergisini çıkardı. Roman, öykü, oyun, şiir türlerinde eser verdi."
  },
  {
    id: 35, donem: "Milli Edebiyat", yazar: "Orhan Seyfi Orhon",
    eserler: ["Fırtına ve Kar (şiir kitabı)", "Peri Kızı ile Çoban Hikâyesi (şiir kitabı)", "Gönülden Sesler"],
    ozellik: "1890-1972. Beş Hececilerden. Rıza Tevfik'ten sonra saz şiirine en çok yakınlaşan şair. Hece ölçüsüyle gazel biçiminde şiirler yazdı. Sade Türkçe karşısında olanlara şiddetle karşı çıktı."
  },
  // === Cumhuriyet dönemi yeni şairler (PDF'den) ===
  {
    id: 36, donem: "Cumhuriyet Dönemi", yazar: "Nâzım Hikmet Ran",
    eserler: ["Memleketimden İnsan Manzaraları (şiir)", "Şeyh Bedreddin Destanı (şiir)", "835 Satır (şiir)", "Kuvayı Milliye (şiir)", "Güneşi İçenlerin Türküsü (şiir)"],
    ozellik: "1902-1963. Toplumcu gerçekçi şiirin öncüsü. Serbest şiiri Türk edebiyatına getirdi. Fütürizm etkisiyle başladı. İlk Türkiye'de basılan şiir kitabı 835 Satır'dır (1929). Uzun yıllar sürgünde yaşadı."
  },
  {
    id: 37, donem: "Cumhuriyet Dönemi", yazar: "Necip Fazıl Kısakürek",
    eserler: ["Kaldırımlar (şiir)", "Çile (şiir)", "Örümcek Ağı (şiir)", "Ben ve Ötesi (şiir)", "Sonsuzluk Kervanı (şiir)"],
    ozellik: "1905-1980. Saf şiir ve metafizik anlayış. Kaldırımlar şiiriyle büyük ün kazandı. Dini ve tasavvufi temalara yöneldi. Büyük Doğu dergisini çıkardı. Tiyatro, roman, deneme türlerinde de eser verdi."
  },
  {
    id: 38, donem: "Cumhuriyet Dönemi", yazar: "Cahit Sıtkı Tarancı",
    eserler: ["Otuz Beş Yaş (şiir)", "Düşten Güzel (şiir)", "Ömrümde Sükût (şiir)", "Sonrası (şiir)"],
    ozellik: "1910-1956. Ölüm ve yaşama sevinci teması. Otuz Beş Yaş şiiri ölüm farkındalığıyla ünlenmiştir. Saf şiir anlayışı. Aruz ve heceyle yazdı. Behçet Necatigil ile mektuplaştı."
  },
  {
    id: 39, donem: "Cumhuriyet Dönemi", yazar: "Ahmet Muhip Dıranas",
    eserler: ["Şiirler (Ağrı, Olvido, Dağlara, Kar gibi şiirler içeren kitap)"],
    ozellik: "1909-1980. Saf şiir anlayışı. Musiki, aşk ve hüzün temaları. Az şiir yazdı ama her biri kaliteli. Olvido ve Kar şiirleri çok ünlüdür. Çeviri alanında da önemli katkıları var."
  },
  {
    id: 40, donem: "Cumhuriyet Dönemi", yazar: "Fazıl Hüsnü Dağlarca",
    eserler: ["Çakırın Destanı (şiir)", "Toprak Ana (şiir)", "Yedi Memetler (şiir)", "Hiroşima (şiir)", "Nötron Bombası (şiir)", "Sivaslı Karınca"],
    ozellik: "1914-2008. Türk şiirinin en üretken ismi. Çok geniş tema yelpazesi: çocuklar, savaş, yurt, evren, ölüm. Şiirde dil duyarlılığı ve akılcı yaklaşım ön planda. Türkiye PEN ödülü aldı."
  },
  {
    id: 41, donem: "Cumhuriyet Dönemi", yazar: "Behçet Necatigil",
    eserler: ["Kapalı Çarşı (şiir)", "Çevre (şiir)", "Evler (şiir)", "Eski Toprak (şiir)", "Arada (şiir)", "Divançe (şiir)"],
    ozellik: "1916-1979. Saf şiir. Ev, aile, gündelik yaşam ve bunların şiirsel dönüşümü. Sıradan hayatı şiirsel metafora çevirdi. Radyo oyunculuğu da yaptı. Türkçe Sözlük çalışmaları."
  },
  {
    id: 42, donem: "Cumhuriyet Dönemi", yazar: "Melih Cevdet Anday",
    eserler: ["Garip (şiir)", "Kolları Bağlı Odysseus (şiir)", "Rahatı Kaçan Ağaç (şiir)", "Yan Yana (şiir)", "Mikado'nun Çöpleri (oyun)", "Gizli Emir (roman)"],
    ozellik: "1915-2002. Garip hareketinin üç kurucusundan biri. Sonraları felsefi-mitolojik şiirlere yöneldi. Kolları Bağlı Odysseus Türk şiirinin önemli eserleri arasında. Tiyatro ve roman da yazdı."
  },
  {
    id: 43, donem: "Cumhuriyet Dönemi", yazar: "Oktay Rifat",
    eserler: ["Garip (şiir)", "Perçemli Sokak (şiir)", "Elleri Var Özgürlüğün (şiir)", "Çobanıl Şiirler (şiir)", "Karga ile Tilki (şiir)", "Çil Horoz (oyun)"],
    ozellik: "1914-1988. Garip hareketinin üç kurucusundan biri. Sonraları İkinci Yeni'ye yaklaştı. Farklı dönemlerde farklı şiir anlayışları denedi. Tiyatro ve roman türlerinde de eser verdi."
  },
  {
    id: 44, donem: "Cumhuriyet Dönemi", yazar: "Attilâ İlhan",
    eserler: ["Duvar (şiir)", "Sisler Bulvarı (şiir)", "Ben Sana Mecburum (şiir)", "Yağmur Kaçağı (şiir)", "Bela Çiçeği (şiir)"],
    ozellik: "1925-2005. Mavi Hareketi'nin öncüsü. Garip akımına ve Orhan Veli'ye karşı çıktı. Bağımsızlık, eşitlik, özgürlük, aşk temalarını işledi. Noktalama işaretlerine az yer verdi."
  },
  {
    id: 45, donem: "Cumhuriyet Dönemi", yazar: "Cemal Süreya",
    eserler: ["Üvercinka (şiir)", "Göçebe (şiir)", "Sevda Sözleri (şiir)", "Güz Bitiği (şiir)", "Sıcak Nal (şiir)"],
    ozellik: "1931-1990. İkinci Yeni'nin önemli temsilcisi. Aşk şiirlerinde çarpıcı imge ve metaforlar kullandı. Pazar Postası'nda İkinci Yeni şiirleri yayımladı. Özgün ve cesur söylemi ile tanındı."
  },
  {
    id: 46, donem: "Cumhuriyet Dönemi", yazar: "Sezai Karakoç",
    eserler: ["Körfez (şiir)", "Hızırla Kırk Saat (şiir)", "Monna Rosa (şiir)", "Gün Doğmadan (toplu şiirler)", "Taha'nın Kitabı (şiir)"],
    ozellik: "1933-2021. İkinci Yeni temsilcisi ama dini-metafizik çizgiyle ayrıştı. İslam medeniyetine dönüş düşüncesi. Diriliş Yayınları'nı kurdu. Şiirde yoğun sembolizm ve metafizik arayış."
  },
  {
    id: 47, donem: "Cumhuriyet Dönemi", yazar: "Orhan Kemal",
    eserler: ["Bereketli Topraklar Üzerinde (roman)", "Gurbet Kuşları (roman)", "Murtaza (roman)", "Cemile (hikaye)", "Hanımın Çiftliği (roman)"],
    ozellik: "1914-1970. Toplumcu gerçekçilik. Adana pamuk işçileri, köyden kente göç, ağa-köylü ilişkisi, hapishane hayatı. Nâzım Hikmet ile hapishanede tanışması edebiyata yönelmesini sağladı."
  },
  {
    id: 48, donem: "Cumhuriyet Dönemi", yazar: "Kemal Tahir",
    eserler: ["Devlet Ana (roman)", "Yorgun Savaşçı (roman)", "Esir Şehrin İnsanları (roman)", "Köyün Kamburу (roman)", "Kurt Kanunu (roman)"],
    ozellik: "1910-1973. Toplumcu gerçekçilik. Hem köy romanları hem tarihî romanlar yazdı. Devlet Ana Osmanlı tarihini sosyal gerçekçi bir perspektifle ele alır. Hapishanede Nâzım Hikmet ile tanıştı."
  },
  {
    id: 49, donem: "Cumhuriyet Dönemi", yazar: "Fakir Baykurt",
    eserler: ["Yılanların Öcü (roman)", "Tırpan (roman)", "Irazca'nın Dirliği (roman)", "Onuncu Köy (roman)"],
    ozellik: "1929-1999. Toplumcu gerçekçilik. Köy romanlarının önemli ismi. Anadolu köylüsünün yaşamını gerçekçi ve insancıl bir yaklaşımla anlattı. Köy Enstitüsü mezunu."
  },
  {
    id: 50, donem: "Cumhuriyet Dönemi", yazar: "Memduh Şevket Esendal",
    eserler: ["Ayaşlı ve Kiracıları (roman)", "Vasıf Çınar (hikaye)", "Mendil Altında (hikaye)"],
    ozellik: "1883-1952. Küçük insanların günlük hayatını sade ve mizahi bir dille anlattı. Çehov tarzı hikayeciliğin Türk edebiyatındaki en güçlü temsilcisi. Gözlemci ve yalın anlatım tarzı."
  },
  {
    id: 51, donem: "Cumhuriyet Dönemi", yazar: "Haldun Taner",
    eserler: ["Keşanlı Ali Destanı (tiyatro)", "Gözlerimi Kaparım Vazifemi Yaparım (tiyatro)", "Eşeğin Gölgesi (tiyatro)", "Dışarıdakiler (tiyatro)", "Fazilet Eczanesi (tiyatro)", "Zilli Zarife (tiyatro)", "On İkiye Bir Var (hikaye)", "Şişhane'ye Yağmur Yağıyordu (hikaye)", "Ayışığında Çalışkur (hikaye)"],
    ozellik: "1915-1986. Epik tiyatronun Türk edebiyatındaki en önemli temsilcisi. Keşanlı Ali Destanı Türk tiyatrosunun başyapıtlarından. Hikayelerinde eleştirel ve ironik bakış açısı ön plandadır."
  },
  {
    id: 52, donem: "Cumhuriyet Dönemi", yazar: "Oğuz Atay",
    eserler: ["Tutunamayanlar (roman)", "Tehlikeli Oyunlar (roman)", "Bir Bilim Adamının Romanı (roman)", "Eylembilim (roman)", "Korkuyu Beklerken (hikaye)", "Oyunlarla Yaşayanlar (tiyatro)"],
    ozellik: "1934-1977. Postmodern Türk romanının öncüsü. Tutunamayanlar Türk edebiyatının en hacimli ve yenilikçi romanlarından. Üst kurmaca tekniği. Hayatında yeterince tanınmadı."
  },
  {
    id: 53, donem: "Cumhuriyet Dönemi", yazar: "Ahmet Hamdi Tanpınar",
    eserler: ["Huzur (roman)", "Saatleri Ayarlama Enstitüsü (roman)", "Beş Şehir (deneme)", "XIX. Asır Türk Edebiyatı Tarihi", "Mahur Beste (roman)"],
    ozellik: "Var. Şiiri de var. Cumhuriyet dönemi."
  },
  {
    id: 54, donem: "Cumhuriyet Dönemi", yazar: "Ahmet Kutsi Tecer",
    eserler: ["Tüm Şiirleri (ölümünden sonra yayımlandı)", "Nerdesin (şiir)", "Orda Bir Köy Var Uzakta (şiir)"],
    ozellik: "1901-1967. Memleket şiirinin önemli ismi. Âşık Veysel'i Türkiye'ye tanıttı. Karacaoğlan ve Yunus Emre üzerine araştırmalar yaptı. Folklor ve halk edebiyatı çalışmalarıyla öne çıktı."
  },
  {
    id: 55, donem: "Cumhuriyet Dönemi", yazar: "Kemalettin Kamu",
    eserler: ["Gurbet (şiir kitabı)", "Gurbet Geceleri (şiir)", "Gurbette Renkler (şiir)", "Bingöl Çobanları (şiir)"],
    ozellik: "1901-1948. 'Gurbet Şairi' lakabı. Doğduğu şehir Bayburt'u terk etmek zorunda kalması vatan ve gurbet şiirlerine yöneltti. 'Ben gurbette değilim, gurbet benim içimde' dizesiyle ünlüdür."
  },
  {
    id: 56, donem: "Cumhuriyet Dönemi", yazar: "Necati Cumalı",
    eserler: ["Susuz Yaz (hikaye)", "Yalnız Kadın (hikaye)", "Makedonya 1900 (hikaye)", "Kente İnen Kaplanlar (hikaye)", "Boş Beşik (tiyatro)", "Mine (tiyatro)", "Nalınlar (tiyatro)", "Vur Emri (tiyatro)", "Viran Dağlar (roman)", "Tütün Zamanı (roman)", "Acı Tütün (roman)"],
    ozellik: "1921-2001. Ege'yi, Rum-Türk ilişkilerini ve Kurtuluş Savaşı'nı anlattı. Susuz Yaz hikayesi dünya sinemasına uyarlandı. Şiir, hikaye, roman ve tiyatro türlerinde eser verdi."
  },
  {
    id: 57, donem: "Cumhuriyet Dönemi", yazar: "Tarık Buğra",
    eserler: ["Küçük Ağa (roman)", "Osmancık (roman)", "Yağmur Beklerken (roman)", "İbiş'in Rüyası (tiyatro)"],
    ozellik: "1918-1994. Tarihî ve toplumsal konularda roman yazdı. Küçük Ağa Kurtuluş Savaşı'nı, Osmancık ise Osmanlı kuruluşunu konu alır. Milliyetçi-muhafazakâr edebi çizgi."
  },
];

// ===================== AYRINTILAR VERİSİ =====================
const ayrintilar = [
  // KRİTİK BİLGİ
  { tip: "KRİTİK BİLGİ", konu: "İletişim Ögeleri", icerik: "İletişim; gönderici (kaynak), alıcı, ileti (mesaj), kanal (araç), dönüt (geri bildirim), kod (şifre) ve bağlam ögelerinden oluşur." },
  { tip: "HATIRLAYALIM", konu: "Türk Alfabeleri", icerik: "Türkler tarih boyunca Kök Türk, Uygur, Kiril, Arap ve Latin alfabelerini kullanmışlardır." },
  { tip: "DİKKAT", konu: "Edebiyat ve Bilimler", icerik: "Edebiyat; tarih, psikoloji, sosyoloji, felsefe ve coğrafya bilimleriyle doğrudan ilişkilidir." },
  { tip: "DİKKAT", konu: "Manzume ve Şiir Farkı", icerik: "Ölçülü ve uyaklı dizelerle yazılan metinlere manzume denir. Manzume zaman zaman şiir anlamında kullanılsa da ikisi arasındaki temel fark, şiirin sanat değeri taşımasıdır." },
  { tip: "DİKKAT", konu: "İdil ve Eglog", icerik: "Doğrudan doğruya doğa manzaralarını monolog biçiminde anlatan pastoral şiirlere 'idil', konuşma biçiminde yazılanlara ise 'eglog' denir. Epik şiire Batı'da 'epope' denir." },
  { tip: "KRİTİK BİLGİ", konu: "Epik ve Satirik Şiir", icerik: "Halk edebiyatında koçaklama, destan, varsağı epik türde yazılmıştır. Satirik şiire divan edebiyatında hiciv, halk edebiyatında taşlama, günümüzde yergi adı verilir." },
  { tip: "HATIRLAYALIM", konu: "Lirik Şiir Şairleri", icerik: "Fuzûlî, Bâkî, Nedim, Yunus Emre, Yahya Kemal Beyatlı, Cahit Sıtkı Tarancı, Orhan Veli Kanık lirik şiirde önemli örnekler vermişlerdir." },
  { tip: "HATIRLAYALIM", konu: "Epik Şiir Şairleri", icerik: "Dadaloğlu, Köroğlu, Fazıl Hüsnü Dağlarca, Mehmet Âkif Ersoy epik türde örnekler veren önemli şairlerdir." },
  { tip: "HATIRLAYALIM", konu: "Didaktik Şiir", icerik: "Türk edebiyatında bilinen ilk didaktik şiir örneği Yusuf Has Hacip tarafından kaleme alınan Kutadgu Bilig'dir. Ziya Gökalp, Tevfik Fikret, Yunus Emre, Ziya Paşa da bu türde örnekler vermişlerdir." },
  { tip: "HATIRLAYALIM", konu: "Pastoral Şiir Şairleri", icerik: "Faruk Nafiz Çamlıbel, Kemalettin Kamu, Ömer Bedrettin Uşaklı pastoral şiirde önemli örnekler vermiştir." },
  { tip: "HATIRLAYALIM", konu: "Hiciv Şairleri", icerik: "Şeyhî, Bağdatlı Ruhî, Nef'î, Ruhsatî hiciv türünde örnekler veren önemli şairlerdir." },
  { tip: "HATIRLAYALIM", konu: "Koşaklama Şairleri", icerik: "Namık Kemal, Abdülhak Hamit Tarhan, Faruk Nafiz Çamlıbel koşaklama türünde önemli örnekler vermişlerdir." },
  { tip: "KRİTİK BİLGİ", konu: "Sözlü Dönem Ürünleri", icerik: "Sözlü gelenekte oluşturulan bu ürünlerin yazılı ilk örnekleri Kaşgarlı Mahmut'un Divânu Lugati't-Türk adlı eserinde yer almaktadır." },
  { tip: "DİKKAT", konu: "Koşuk-Koşma-Gazel İlişkisi", icerik: "Koşuklar, halk edebiyatında koşmaya, divan edebiyatında gazele benzer. İslamiyet öncesinde 'yuğ' adı verilen ölüm törenlerinde kopuz eşliğinde söylenen şiirlerdir." },
  { tip: "DİKKAT", konu: "Sagu-Ağıt-Mersiye İlişkisi", icerik: "Saguların halk şiirindeki karşılığı ağıt, divan şiirindeki karşılığı mersiyedir." },
  { tip: "DİKKAT", konu: "Kutadgu Bilig Hakkında", icerik: "Kutadgu Bilig, Türk edebiyatında birçok açıdan ilkler taşır: Geçiş Dönemi'nin edebî eser niteliği taşıyan ilk eseridir. İslamiyet etkilerinin görüldüğü ilk eserdir. Aruz vezninin ilk kullanıldığı eserdir." },
  { tip: "DİKKAT", konu: "Divânu Lugati't-Türk Hakkında", icerik: "Divânu Lugati't-Türk; Türkçenin bilinen ilk sözlüğü, ilk dil bilgisi kitabı ve ilk edebiyat antolojisidir. Kaşgarlı Mahmut tarafından kaleme alınmıştır." },
  { tip: "DİKKAT", konu: "Ercişli ve Erzurumlu Emrah Farkı", icerik: "Ercişli Emrah ile Erzurumlu Emrah'ı karıştırmamak gerekir. Ercişli şiirlerinde sade ve açık bir dil, Erzurumlu daha ağır bir dil kullanmıştır. Ercişli sadece heceyi, Erzurumlu hem heceyi hem de aruzu kullanmıştır. Ercişli divan şiirinden etkilenmemiş, Erzurumlu ise etkilenmiştir." },
  { tip: "DİKKAT", konu: "Ahmet Haşim ve Poetikası", icerik: "Ahmet Haşim şiirle ilgili görüşlerini Piyale adlı şiir kitabının ön sözü olan 'Şiir Hakkında Bazı Mülahazalar' adlı yazısında açıklamıştır. Bu yazı edebiyatımızda ilk poetika örneği kabul edilir." },
  { tip: "DİKKAT", konu: "Tanzimat Şiirinde Değişim", icerik: "Divan şiirindeki 'Kafiye göz içindir' anlayışı yerine 'Kafiye kulak içindir' görüşü benimsenmiştir. Namık Kemal'in Hürriyet Kasidesi'nde kasidenin bölümleri kaldırılıp direkt konuya girilmesi en köklü değişikliktir." },
  { tip: "KRİTİK BİLGİ", konu: "Önemli İlk Romanlar", icerik: "Küçük Ağa, Yaban, Ankara, Ateşten Gömlek, Vurun Kahpeye, Sahnenin Dışındakiler Kurtuluş Savaşı'nı konu edinen romanlardır. Üç İstanbul ve Kiralık Konak Cumhuriyet Dönemi'nde değişimi kuşaklar üzerinden anlatan romanlardır." },
  { tip: "HATIRLAYALIM", konu: "Postmodern Roman Tekniği", icerik: "Oğuz Atay'ın Tutunamayanlar romanında 'üst kurmaca' tekniği kullanılmıştır. Yazma sürecinin de romanın kurgularından biri olarak kurgulanması 'üst kurmaca' (metafiction) olarak adlandırılır." },
  { tip: "DİKKAT", konu: "Modernist Roman", icerik: "Modernist ve postmodernist roman Türk edebiyatında 1970'lerden itibaren etkili olmuştur. Bu romanlarda bilinç akışı, iç monolog, çok katmanlı anlatım teknikleri kullanılır." },
  { tip: "DİKKAT", konu: "Toplumcu Gerçekçi Roman", icerik: "Sadri Ertem'in Çıkrıklar Durunca romanı toplumcu gerçekçi romanın ilk önemli yapıtı sayılır. Toplumcu gerçekçilik 1930'lu yıllarda başlayıp 1980'lere kadar varlığını güçlü biçimde sürdürmüştür." },
  { tip: "KRİTİK BİLGİ", konu: "Dünya Edebiyatında İlkler", icerik: "Dünya edebiyatında ilk realist roman Gustave Flaubert'in Madam Bovary adlı yapıtıdır. Roman türünün ilk örneği Cervantes'in Don Kişot adlı romanıdır. Kırgız edebiyatında Cengiz Aytmatov önemli bir romancıdır." },
  { tip: "DİKKAT", konu: "Üç Birlik Kuralı (Tiyatro)", icerik: "Üç birlik kuralı; eserin tek olay, tek mekân, tek gün kalıbı içinde yapılandırılmasıdır. Bu kural klasisizmin tiyatroya getirdiği en önemli ilkelerden biridir." },
  { tip: "HATIRLAYALIM", konu: "Komedi Temsilcileri", icerik: "Komedinin en önemli temsilcileri Eski Yunan edebiyatında Aristophanes, Fransız edebiyatında Molière'dir. Türk edebiyatında Şinasi'nin Şair Evlenmesi töre komedisinin ilk örneğidir." },
  { tip: "KRİTİK BİLGİ", konu: "Dram Türü", icerik: "Dram türünün ilk örneklerini İngiliz sanatçı William Shakespeare verirken ilkelerini 19. yüzyıl Fransız sanatçısı Victor Hugo belirlemiştir. Önemli dram eserleri: Hernani (Hugo), Faust (Goethe), Don Carlos (Schiller)." },
  { tip: "KRİTİK BİLGİ", konu: "Karagöz-Orta Oyunu Farkı", icerik: "Pişekâr, Karagöz oyunundaki Hacivat'ın karşılığı; Kavuklu ise Karagöz'ün karşılığıdır. Kavuklu ile Pişekâr'ın birbirinin sözlerini ters anlamalarına 'arzbar' denir." },
  { tip: "DİKKAT", konu: "Meddah Özellikleri", icerik: "Meddah, yöntemleri bakımından Karagöz ve orta oyununa çok yakındır. Ancak Karagöz ve orta oyununun yalnızca bir güldürmece tiyatrosu olmasına karşın meddah; hikâye dağarcığının çeşitliliği ve farklı mizah anlayışıyla ayrılır." },
  { tip: "HATIRLAYALIM", konu: "İlk Tiyatro Eserleri", icerik: "Şinasi'nin Şair Evlenmesi Batılı anlamda ilk sahnelenen tiyatro eseridir; Tercüman-ı Ahvâl gazetesinde tefrika edilmiştir. Namık Kemal'in Vatan yahut Silistre'si sahnelenen ilk tiyatro oyunudur." },
  { tip: "DİKKAT", konu: "Darülbedayi Hakkında", icerik: "İlk şehir tiyatrosu olan Darülbedayi-i Osmanî 1914'te kurulmuştur. Yönetimine Fransa'dan Andre Antoine getirilmiştir. Sahnelenen ilk oyun Hüseyin Suat Yalçın'ın Çürük Temel adlı uyarlamasıdır; ilk yerli oyun ise Halit Fahri Ozansoy'un Baykuş adlı eseridir." },
  { tip: "HATIRLAYALIM", konu: "Divan Edebiyatı Gazel Şairleri", icerik: "Fuzuli, Baki, Nedim, Necati, Şeyhülislam Yahya, Naili ve Şeyh Galip önemli gazel şairlerimizdir." },
  { tip: "HATIRLAYALIM", konu: "Kaside Şairleri", icerik: "En meşhur kaside şairleri: Ahmet Paşa, Baki, Fuzuli, Nef'i, Nedim'dir." },
  { tip: "DİKKAT", konu: "Hamse Sahibi Şairler", icerik: "Divan şiirinde beş mesneviden oluşan eserler grubuna hamse denir. Ali Şir Nevai (ilk hamse sahibi), Mevlana, Fuzuli, Şeyhi, Taşlıcalı Yahya, Nabi ve Şeyh Galip önemli hamse şairlerimizdir." },
  { tip: "DİKKAT", konu: "İlhan-Fontaine Çevirisi", icerik: "İbrahim Şinasi ve Orhan Veli Kanık, La Fontaine'in masallarını Türkçeye çevirmişlerdir." },
  { tip: "HATIRLAYALIM", konu: "Mavi Hareketi", icerik: "Maviciler hareketi; adını 1952-1956 yılları arasında Ankara'da çıkan Mavi adlı dergiden almıştır. Bu şairler Garip Akımı'na ve Orhan Veli'nin şiir anlayışına karşı çıkmışlar; şairane bir sanat anlayışını savunmuşlardır. Öncüsü Attilâ İlhan'dır." },
  { tip: "KRİTİK BİLGİ", konu: "Klasisizm", icerik: "Klasisizmin anahtar sözcükleri: AKIL - KURALCILIK - SAĞDUYU. 16. yüzyılın sonlarında Fransa'da ortaya çıktı. Temsilcileri: Corneille, Racine, Molière (dünya); Şinasi (Türk edebiyatı)." },
  { tip: "KRİTİK BİLGİ", konu: "Romantizm", icerik: "Romantizmin anahtar sözcükleri: DUYGU - KURALSIZLIK - HAYAL. 18. yüzyılın ikinci yarısında özellikle Almanya ve Fransa'da gelişti. Temsilcileri: Hugo, Lamartine, Dumas (dünya); Namık Kemal, Abdülhak Hamit Tarhan (Türk edebiyatı)." },
  { tip: "KRİTİK BİLGİ", konu: "Realizm", icerik: "Realizmin anahtar sözcükleri: GÖZLEM - TASVİR - GERÇEK - POZİTİVİZM. 19. yüzyılın ikinci yarısında Fransa'da doğdu. Temsilcileri: Flaubert, Stendhal, Balzac (dünya); Samipaşazade Sezai, Halit Ziya Uşaklıgil (Türk edebiyatı)." },
  { tip: "KRİTİK BİLGİ", konu: "Natüralizm", icerik: "Natüralizmin anahtar sözcükleri: TEZ - DENEYSEL METOT - DETERMİNİZM - BİLİM İNSANI - SOYA ÇEKİM. 19. yüzyılın ikinci yarısında Fransa'da gelişti. Temsilcileri: Zola, Maupassant (dünya); Nabizade Nazım (Türk edebiyatı, Karabibik)." },
  { tip: "KRİTİK BİLGİ", konu: "Parnasizm", icerik: "Parnasizmin anahtar sözcükleri: GERÇEKLİK - TASVİR - ŞİİR - BİÇİM MÜKEMMELLİĞİ. Fransa'da romantizme tepki olarak 19. yüzyılda doğdu. Temsilcileri: Théophile Gautier, Leconte de Lisle (dünya); Tevfik Fikret, Cenap Şehabettin (Türk edebiyatı)." },
  { tip: "KRİTİK BİLGİ", konu: "Sembolizm", icerik: "Sembolizmin anahtar sözcükleri: MUSİKİ - HİSSETTİRMEK - SEZGİ - KAPALILIK. 19. yüzyılın ikinci yarısında parnasizme tepki olarak doğdu. Temsilcileri: Baudelaire, Verlaine, Rimbaud (dünya); Ahmet Haşim, Cenap Şehabettin (Türk edebiyatı)." },
  { tip: "KRİTİK BİLGİ", konu: "Sürrealizm", icerik: "Sürrealizmin anahtar sözcükleri: OTOMATİK YAZI - MİZAH - RÜYA - ÇAĞRIŞIM - BİLİNÇALTI - PSİKANALİZ. 20. yüzyılda Andre Breton tarafından kuruldu. Türk edebiyatında İkinci Yeni şairleri bu akımdan etkilendi." },
  { tip: "KRİTİK BİLGİ", konu: "Fütürizm", icerik: "Fütürizmin kurucusu İtalyan şair Marinetti'dir. Özgürce seçilen kelimeler, kuralsız anlatım, otomatik yazı fütüristlerin kullandığı biçimsel ögelerdir. Nâzım Hikmet Türk edebiyatında fütürizm özelliklerinin görüldüğü şiirler yazmıştır." },
  { tip: "DİKKAT", konu: "Ekzistansiyalizm ve Ekspresyonizm", icerik: "Ekzistansiyalizm 'Var olmak her şeyden önce gelir.' anlayışına sahiptir. Ekspresyonizm akımında iç gerçekliğin sanat yoluyla dışarıya vurulması esastır. Fütürizm 20. yüzyılda Marinetti tarafından kurulmuştur." },
  { tip: "DİKKAT", konu: "Servet-i Fünun Dergisi ve Kapanma", icerik: "Servet-i Fünun dergisi 1901 yılında Hüseyin Cahit'in Fransızcadan çevirdiği 'Edebiyat ve Hukuk' adlı yazının yönetime muhalif düşünceler içermesi nedeniyle kapatılmıştır." },
  { tip: "DİKKAT", konu: "Garip Hareketi", icerik: "1941 yılında Orhan Veli Kanık, Melih Cevdet Anday ve Oktay Rifat Garip adını verdikleri ortak bir şiir kitabı yayımladı. Şiirde ölçü ve uyağı terk ederek serbest şiire yöneldiler. Sıradan sözcükler ve günlük dil kullandılar." },
  { tip: "DİKKAT", konu: "İkinci Yeni Doğuşu", icerik: "1950'lerin ortasında şairler şiirlerini bağımsız olarak Pazar Postası dergisinde yayımlamaya başladı. Muzaffer Erdost bu yeni şiir tarzını 'II. Yeni Şiiri' olarak adlandırdı. Dada ve sürrealizm etkisi görülür." },
  { tip: "DİKKAT", konu: "Hikayede Sonuç Bölümü", icerik: "Hikâyelerin tamamı serim-düğüm-çözüm planına uymaz. Bazı hikâyelerde sonuç bölümü verilmez ve okuyucu hikâyenin sonunu hayalinde tamamlar." },
  { tip: "DİKKAT", konu: "Halk Hikâyesi ve Modern Hikaye", icerik: "Halk hikâyeleri, modern hikâyeden önceki dönemde hikâye türünün işlevini görmüştür. Anlatıcılar kimi zaman bu hikâyelere yeni maceralar, olaylar ve kahramanlar ekleyerek geliştirmiştir." },
  { tip: "HATIRLAYALIM", konu: "Türk Hikayeciliğinde İlkler", icerik: "Ahmet Mithat Efendi'nin Letâif-i Rivâyât adlı eseri ilk hikâye kitabıdır. Samipaşazade Sezai'nin Küçük Şeyler eseri Batılı anlamda ilk hikâyeleri içerir. Türk hikâyeciliğini Batılı örneklere yaklaştıran yazar Halit Ziya Uşaklıgil'dir." },
  { tip: "DİKKAT", konu: "Abdülhak Hamit Tarhan Tiyatroları", icerik: "Abdülhak Hamit Tarhan'ın Eşber adlı tiyatrosu aruzla yazılan ilk manzum tiyatro. Nesteren ise edebiyatımızda ilk romantik dram kabul edilir." },
  { tip: "DİKKAT", konu: "Ahmet Vefik Paşa", icerik: "Ahmet Vefik Paşa, ilk uyarlama tiyatro eserinin sahibidir. Tiyatro eserlerinin sahnelenmesine büyük katkı sağlamıştır." },
  { tip: "KRİTİK BİLGİ", konu: "Yaşar Kemal Anadolu Efsaneleri", icerik: "Üç Anadolu Efsanesi, Ağrı Dağı Efsanesi, Binboğalar Efsanesi Yaşar Kemal'in Anadolu efsanelerini konu alan önemli eserleridir." },
  { tip: "HATIRLAYALIM", konu: "İlk Mensur Şiir", icerik: "Edebiyatımızdaki ilk mensur şiir örneği Halit Ziya Uşaklıgil'in Mezardan Sesler adlı eseri kabul edilir. Bu eser Servet-i Fünun döneminde kaleme alınmıştır." },
  { tip: "DİKKAT", konu: "Sebk-i Hindi Akımı", icerik: "Sebk-i Hindi (Hint üslubu); 17. yüzyılda Hindistan'a giden İranlı şairlerin açtığı bir çığırdır. Türk şairleri 17. ve 18. yüzyılda benimsedi. Temsilcileri: Neşati, Naili, Fehim, Şeyh Galip. Anlamı derinleştirip kapalı hale getirme, yeni mazmunlar kullanma özellikleri vardır." },
  { tip: "DİKKAT", konu: "Hikemi Şiir Akımı (Nabi Ekolü)", icerik: "Hikemî şiir; düşünceye ağırlık vererek okuyucuyu düşündürmeyi ve aydınlatmayı amaçlar. 17. yüzyılda görülen bu akımın ilk ve en güçlü temsilcisi Nabi'dir. Nabi'den sonraki en önemli temsilcisi Koca Ragıp Paşa'dır." },
  { tip: "DİKKAT", konu: "Mahallileşme (Yerlileşme) Akımı", icerik: "Mahallileşme akımı 16. yüzyıldan sonra görüldü. Baki'nin ilk habercisi olduğu bu akımın en güçlü örneklerini 18. yüzyılda Nedim vermiş, 19. yüzyılda Enderunlu Vasıf sınırlarını genişletmiştir. Âşık tarzı ile divan şiirinin birleşimi sayılabilir." },
];

const modes = ["Kartlar", "Quiz", "Eşleştir", "Liste", "Ayrıntılar"];
const donemSirasi = ["Divan Edebiyatı","Halk Edebiyatı","Tanzimat (1. Dönem)","Tanzimat (2. Dönem)","Servet-i Fünun","Fecr-i Ati / Bağımsız","Milli Edebiyat","Cumhuriyet Dönemi"];
const donemler = ["Tümü", ...donemSirasi.filter(d => authors.some(a => a.donem === d))];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [mode, setMode] = useState("Kartlar");
  const [selectedDonem, setSelectedDonem] = useState("Tümü");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardSide, setCardSide] = useState("yazar"); // yazar or eserler
  const [quizState, setQuizState] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [matchState, setMatchState] = useState(null);
  const [ayrintiTip, setAyrintiTip] = useState("Tümü");
  const [ayrintiSearch, setAyrintiSearch] = useState("");

  const filtered = selectedDonem === "Tümü" ? authors : authors.filter(a => a.donem === selectedDonem);

  // Reset card when filter changes
  useEffect(() => {
    setCardIndex(0);
    setFlipped(false);
    setQuizState(null);
    setMatchState(null);
    setScore({ correct: 0, total: 0 });
  }, [selectedDonem, mode]);

  // QUIZ MODE
  const initQuiz = useCallback(() => {
    const shuffled = shuffle(filtered);
    const current = shuffled[0];
    const eser = current.eserler[Math.floor(Math.random() * current.eserler.length)];
    const wrongs = shuffle(authors.filter(a => a.id !== current.id)).slice(0, 3);
    const options = shuffle([current.yazar, ...wrongs.map(w => w.yazar)]);
    setQuizState({ current, eser, options, answered: null, shuffled, qIndex: 0 });
  }, [filtered]);

  const nextQuiz = useCallback(() => {
    if (!quizState) return;
    const nextIdx = quizState.qIndex + 1;
    if (nextIdx >= quizState.shuffled.length) {
      setQuizState({ ...quizState, done: true });
      return;
    }
    const current = quizState.shuffled[nextIdx];
    const eser = current.eserler[Math.floor(Math.random() * current.eserler.length)];
    const wrongs = shuffle(authors.filter(a => a.id !== current.id)).slice(0, 3);
    const options = shuffle([current.yazar, ...wrongs.map(w => w.yazar)]);
    setQuizState({ ...quizState, current, eser, options, answered: null, qIndex: nextIdx });
  }, [quizState]);

  const answerQuiz = (choice) => {
    if (quizState.answered) return;
    const correct = choice === quizState.current.yazar;
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setQuizState({ ...quizState, answered: choice });
  };

  // MATCH MODE
  const initMatch = useCallback(() => {
    const pool = shuffle(filtered).slice(0, 5);
    const yazarlar = shuffle(pool.map(a => ({ id: a.id, text: a.yazar, type: "yazar" })));
    const eserler = shuffle(pool.map(a => ({ id: a.id, text: a.eserler[0], type: "eser" })));
    setMatchState({ pool, yazarlar, eserler, selected: null, matched: new Set(), wrong: null });
  }, [filtered]);

  const handleMatch = (item) => {
    if (!matchState) return;
    if (matchState.matched.has(item.id + item.type)) return;
    if (!matchState.selected) {
      setMatchState({ ...matchState, selected: item, wrong: null });
    } else {
      const prev = matchState.selected;
      if (prev.type === item.type) {
        setMatchState({ ...matchState, selected: item, wrong: null });
        return;
      }
      if (prev.id === item.id) {
        const newMatched = new Set(matchState.matched);
        newMatched.add(prev.id + prev.type);
        newMatched.add(item.id + item.type);
        setMatchState({ ...matchState, matched: newMatched, selected: null, wrong: null });
      } else {
        setMatchState({ ...matchState, wrong: [prev.id + prev.type, item.id + item.type], selected: null });
        setTimeout(() => setMatchState(s => s ? { ...s, wrong: null } : s), 800);
      }
    }
  };

  const current = filtered[cardIndex];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d0a0b 0%, #1a1015 40%, #0f0d1a 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8dcc8",
      padding: "0",
      overflowX: "hidden"
    }}>
      <style>{scrollbarStyle}</style>
      {/* Decorative background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(180,120,60,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(100,60,160,0.08) 0%, transparent 50%)`,
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#b8956a", textTransform: "uppercase", marginBottom: 8 }}>
            AYT Hazırlık
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "normal",
            background: "linear-gradient(135deg, #d4a96a 0%, #f0d080 50%, #c8905a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "0 0 8px", letterSpacing: 2
          }}>
            Edebiyat Ustası
          </h1>
          <div style={{ color: "#7a6855", fontSize: 13 }}>Yazar & Eser Ezber Uygulaması</div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
          <span style={{ background: "rgba(180,120,60,0.15)", border: "1px solid rgba(180,120,60,0.3)", borderRadius: 20, padding: "4px 16px", fontSize: 12, color: "#d4a96a" }}>
            📚 {authors.length} Yazar
          </span>
          {score.total > 0 && (
            <span style={{ background: "rgba(60,160,100,0.15)", border: "1px solid rgba(60,160,100,0.3)", borderRadius: 20, padding: "4px 16px", fontSize: 12, color: "#60c080" }}>
              🎯 {score.correct}/{score.total} Doğru
            </span>
          )}
        </div>

        {/* Dönem Filter */}
        <div style={{ overflowX: "auto", paddingBottom: 8, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", minWidth: "max-content", margin: "0 auto" }}>
            {donemler.map(d => (
              <button key={d} onClick={() => setSelectedDonem(d)} style={{
                padding: "6px 14px", borderRadius: 20, border: "1px solid",
                borderColor: selectedDonem === d ? "#d4a96a" : "rgba(255,255,255,0.1)",
                background: selectedDonem === d ? "rgba(180,120,60,0.25)" : "rgba(255,255,255,0.03)",
                color: selectedDonem === d ? "#d4a96a" : "#8a7a6a",
                fontSize: 11, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap"
              }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 28, background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 4, maxWidth: 400, margin: "0 auto 28px" }}>
          {modes.map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "10px 0", borderRadius: 12, border: "none",
              background: mode === m ? "rgba(180,120,60,0.3)" : "transparent",
              color: mode === m ? "#f0d080" : "#6a5a4a",
              fontSize: 13, cursor: "pointer", transition: "all 0.2s",
              fontFamily: "Georgia, serif"
            }}>
              {m === "Kartlar" ? "🃏" : m === "Quiz" ? "❓" : m === "Eşleştir" ? "🔗" : "📋"} {m}
            </button>
          ))}
        </div>

        {/* ==================== KARTLAR MODE ==================== */}
        {mode === "Kartlar" && current && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 16, color: "#7a6855", fontSize: 13 }}>
              {cardIndex + 1} / {filtered.length}
            </div>

            {/* Card */}
            <div onClick={() => setFlipped(!flipped)} style={{
              maxWidth: 600, margin: "0 auto 24px",
              background: flipped
                ? "linear-gradient(135deg, #1a2a1a 0%, #0f1f0f 100%)"
                : "linear-gradient(135deg, #1a1520 0%, #120f1a 100%)",
              border: `1px solid ${flipped ? "rgba(100,180,100,0.3)" : "rgba(180,120,60,0.3)"}`,
              borderRadius: 20, padding: "32px 28px",
              cursor: "pointer", transition: "all 0.35s ease",
              boxShadow: flipped
                ? "0 20px 60px rgba(60,140,60,0.15), 0 0 0 1px rgba(100,180,100,0.1)"
                : "0 20px 60px rgba(180,100,40,0.15), 0 0 0 1px rgba(180,120,60,0.1)"
            }}>
              <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16,
                color: flipped ? "#60a060" : "#b8956a" }}>
                {flipped ? "✦ Eserleri ✦" : "✦ Yazar ✦"}
              </div>

              {!flipped ? (
                <div>
                  <div style={{ fontSize: "clamp(22px,4vw,36px)", color: "#f0d080", marginBottom: 12, fontWeight: "normal", letterSpacing: 1 }}>
                    {current.yazar}
                  </div>
                  <div style={{ fontSize: 12, color: "#6a8a6a", marginBottom: 16, letterSpacing: 2 }}>
                    {current.donem}
                  </div>
                  <div style={{ fontSize: 12, color: "#6a5a4a", fontStyle: "italic" }}>
                    Kartı çevirmek için tıkla →
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 15, color: "#a0d0a0", marginBottom: 16, fontWeight: "normal" }}>
                    {current.yazar}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {current.eserler.map((e, i) => (
                      <span key={i} style={{
                        background: "rgba(100,160,100,0.15)", border: "1px solid rgba(100,160,100,0.3)",
                        borderRadius: 8, padding: "4px 12px", fontSize: 13, color: "#c0e0c0"
                      }}>{e}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: "#6a8a6a", fontStyle: "italic", borderTop: "1px solid rgba(100,160,100,0.15)", paddingTop: 12 }}>
                    {current.ozellik}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => { setCardIndex(Math.max(0, cardIndex - 1)); setFlipped(false); }} style={{
                padding: "10px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)", color: "#8a7a6a", cursor: "pointer", fontSize: 14
              }}>← Önceki</button>

              <button onClick={() => { setCardIndex(Math.min(filtered.length - 1, cardIndex + 1)); setFlipped(false); }} style={{
                padding: "10px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)", color: "#8a7a6a", cursor: "pointer", fontSize: 14
              }}>Sonraki →</button>
            </div>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button onClick={() => { setCardIndex(Math.floor(Math.random() * filtered.length)); setFlipped(false); }} style={{
                padding: "8px 20px", borderRadius: 10, border: "1px solid rgba(180,120,60,0.2)",
                background: "transparent", color: "#8a6a4a", cursor: "pointer", fontSize: 12
              }}>🔀 Rastgele Kart</button>
            </div>
          </div>
        )}

        {/* ==================== QUIZ MODE ==================== */}
        {mode === "Quiz" && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            {!quizState ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>❓</div>
                <div style={{ color: "#8a7a6a", marginBottom: 24, fontSize: 15 }}>
                  Bu eserin yazarını bulabilir misin?<br/>
                  <span style={{ fontSize: 12, color: "#6a5a4a" }}>{filtered.length} soruluk test</span>
                </div>
                <button onClick={initQuiz} style={{
                  padding: "14px 40px", borderRadius: 14, border: "1px solid rgba(180,120,60,0.4)",
                  background: "rgba(180,120,60,0.2)", color: "#d4a96a", cursor: "pointer",
                  fontSize: 16, fontFamily: "Georgia, serif"
                }}>Başla →</button>
              </div>
            ) : quizState.done ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{score.correct >= quizState.shuffled.length * 0.8 ? "🏆" : score.correct >= quizState.shuffled.length * 0.5 ? "📚" : "💪"}</div>
                <div style={{ fontSize: 28, color: "#f0d080", marginBottom: 8 }}>{score.correct}/{quizState.shuffled.length}</div>
                <div style={{ color: "#8a7a6a", marginBottom: 24 }}>
                  {score.correct >= quizState.shuffled.length * 0.8 ? "Mükemmel! Edebiyat ustasısın!" : score.correct >= quizState.shuffled.length * 0.5 ? "İyi gidiyorsun, biraz daha çalış!" : "Kartları tekrar gözden geçir!"}
                </div>
                <button onClick={() => { setScore({ correct: 0, total: 0 }); initQuiz(); }} style={{
                  padding: "12px 32px", borderRadius: 12, border: "1px solid rgba(180,120,60,0.4)",
                  background: "rgba(180,120,60,0.2)", color: "#d4a96a", cursor: "pointer", fontSize: 15, fontFamily: "Georgia, serif"
                }}>Tekrar Dene</button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: 13, color: "#6a5a4a" }}>
                  <span>Soru {quizState.qIndex + 1}/{quizState.shuffled.length}</span>
                  <span style={{ color: "#60c080" }}>{score.correct} doğru</span>
                </div>

                {/* Progress bar */}
                <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginBottom: 24 }}>
                  <div style={{ height: "100%", width: `${(quizState.qIndex / quizState.shuffled.length) * 100}%`,
                    background: "linear-gradient(90deg, #d4a96a, #f0d080)", borderRadius: 2, transition: "width 0.3s" }} />
                </div>

                <div style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,120,60,0.2)",
                  borderRadius: 16, padding: "24px", marginBottom: 20, textAlign: "center"
                }}>
                  <div style={{ fontSize: 11, color: "#7a6855", letterSpacing: 3, marginBottom: 12 }}>ESER</div>
                  <div style={{ fontSize: "clamp(16px,3vw,24px)", color: "#f0d080", fontStyle: "italic" }}>
                    "{quizState.eser}"
                  </div>
                  <div style={{ fontSize: 12, color: "#5a4a3a", marginTop: 8 }}>Bu eserin yazarı kim?</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {quizState.options.map((opt, i) => {
                    const isAnswered = !!quizState.answered;
                    const isCorrect = opt === quizState.current.yazar;
                    const isSelected = opt === quizState.answered;
                    let bg = "rgba(255,255,255,0.04)", borderColor = "rgba(255,255,255,0.1)", color = "#c0b090";
                    if (isAnswered) {
                      if (isCorrect) { bg = "rgba(60,140,60,0.25)"; borderColor = "rgba(100,200,100,0.5)"; color = "#a0e0a0"; }
                      else if (isSelected) { bg = "rgba(180,40,40,0.25)"; borderColor = "rgba(220,80,80,0.5)"; color = "#e08080"; }
                    }
                    return (
                      <button key={i} onClick={() => answerQuiz(opt)} style={{
                        padding: "14px 16px", borderRadius: 12, border: `1px solid ${borderColor}`,
                        background: bg, color, cursor: isAnswered ? "default" : "pointer",
                        fontSize: 14, fontFamily: "Georgia, serif", transition: "all 0.2s",
                        textAlign: "center"
                      }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizState.answered && (
                  <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button onClick={nextQuiz} style={{
                      padding: "12px 32px", borderRadius: 12, border: "1px solid rgba(180,120,60,0.4)",
                      background: "rgba(180,120,60,0.2)", color: "#d4a96a", cursor: "pointer",
                      fontSize: 15, fontFamily: "Georgia, serif"
                    }}>Sonraki Soru →</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== EŞLEŞTIR MODE ==================== */}
        {mode === "Eşleştir" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {!matchState ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
                <div style={{ color: "#8a7a6a", marginBottom: 24, fontSize: 15 }}>
                  Yazarları eserleriyle eşleştir!<br/>
                  <span style={{ fontSize: 12, color: "#6a5a4a" }}>Sol yazara, sağ eserine tıkla</span>
                </div>
                <button onClick={initMatch} style={{
                  padding: "14px 40px", borderRadius: 14, border: "1px solid rgba(180,120,60,0.4)",
                  background: "rgba(180,120,60,0.2)", color: "#d4a96a", cursor: "pointer",
                  fontSize: 16, fontFamily: "Georgia, serif"
                }}>Başla →</button>
              </div>
            ) : (
              <div>
                {matchState.matched.size === matchState.yazarlar.length * 2 ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                    <div style={{ fontSize: 22, color: "#f0d080", marginBottom: 20 }}>Tebrikler! Hepsini eşleştirdin!</div>
                    <button onClick={initMatch} style={{
                      padding: "12px 32px", borderRadius: 12, border: "1px solid rgba(180,120,60,0.4)",
                      background: "rgba(180,120,60,0.2)", color: "#d4a96a", cursor: "pointer",
                      fontSize: 15, fontFamily: "Georgia, serif"
                    }}>Yeni Tur</button>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: 3, color: "#7a6855", marginBottom: 12, textAlign: "center" }}>YAZARLAR</div>
                      {matchState.yazarlar.map(item => {
                        const isMatched = matchState.matched.has(item.id + item.type);
                        const isSelected = matchState.selected?.id === item.id && matchState.selected?.type === item.type;
                        const isWrong = matchState.wrong?.includes(item.id + item.type);
                        return (
                          <button key={item.id} onClick={() => !isMatched && handleMatch(item)} style={{
                            display: "block", width: "100%", padding: "12px 16px", borderRadius: 10,
                            border: "1px solid",
                            borderColor: isMatched ? "rgba(100,180,100,0.4)" : isSelected ? "rgba(180,120,60,0.7)" : isWrong ? "rgba(200,60,60,0.5)" : "rgba(255,255,255,0.1)",
                            background: isMatched ? "rgba(60,140,60,0.2)" : isSelected ? "rgba(180,120,60,0.2)" : isWrong ? "rgba(180,40,40,0.15)" : "rgba(255,255,255,0.03)",
                            color: isMatched ? "#80d080" : isSelected ? "#f0d080" : "#c0b090",
                            cursor: isMatched ? "default" : "pointer", textAlign: "center",
                            marginBottom: 8, fontSize: 14, fontFamily: "Georgia, serif",
                            transition: "all 0.2s",
                            textDecoration: isMatched ? "line-through" : "none"
                          }}>
                            {item.text}
                          </button>
                        );
                      })}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: 3, color: "#7a6855", marginBottom: 12, textAlign: "center" }}>ESERLER</div>
                      {matchState.eserler.map(item => {
                        const isMatched = matchState.matched.has(item.id + item.type);
                        const isSelected = matchState.selected?.id === item.id && matchState.selected?.type === item.type;
                        const isWrong = matchState.wrong?.includes(item.id + item.type);
                        return (
                          <button key={item.id} onClick={() => !isMatched && handleMatch(item)} style={{
                            display: "block", width: "100%", padding: "12px 16px", borderRadius: 10,
                            border: "1px solid",
                            borderColor: isMatched ? "rgba(100,180,100,0.4)" : isSelected ? "rgba(100,80,200,0.7)" : isWrong ? "rgba(200,60,60,0.5)" : "rgba(255,255,255,0.1)",
                            background: isMatched ? "rgba(60,140,60,0.2)" : isSelected ? "rgba(80,60,180,0.2)" : isWrong ? "rgba(180,40,40,0.15)" : "rgba(255,255,255,0.03)",
                            color: isMatched ? "#80d080" : isSelected ? "#c0b0f0" : "#c0b090",
                            cursor: isMatched ? "default" : "pointer", textAlign: "center",
                            marginBottom: 8, fontSize: 13, fontFamily: "Georgia, serif",
                            transition: "all 0.2s", fontStyle: "italic",
                            textDecoration: isMatched ? "line-through" : "none"
                          }}>
                            {item.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== LİSTE MODE ==================== */}
        {mode === "Liste" && (
          <div>
            {donemSirasi.map(donem => {
              const donemAuthors = filtered.filter(a => a.donem === donem);
              if (!donemAuthors.length) return null;
              return (
                <div key={donem} style={{ marginBottom: 28 }}>
                  <div style={{
                    fontSize: 11, letterSpacing: 4, color: "#b8956a", textTransform: "uppercase",
                    marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(180,120,60,0.2)"
                  }}>
                    ✦ {donem}
                  </div>
                  {donemAuthors.map(author => (
                    <div key={author.id} style={{
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 12, padding: "16px", marginBottom: 10
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                        <div style={{ fontSize: 17, color: "#f0d080", fontWeight: "normal" }}>{author.yazar}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {author.eserler.map((e, i) => (
                            <span key={i} style={{
                              background: "rgba(100,80,180,0.12)", border: "1px solid rgba(100,80,180,0.25)",
                              borderRadius: 6, padding: "2px 10px", fontSize: 12, color: "#b0a0d0", fontStyle: "italic"
                            }}>{e}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "#b0a08a", marginTop: 8, fontStyle: "italic" }}>
                        {author.ozellik}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ==================== AYRINTILAR MODE ==================== */}
        {mode === "Ayrıntılar" && (
          <div>
            {/* Arama */}
            <div style={{ marginBottom: 14 }}>
              <input
                type="text"
                placeholder="Konu veya içerik ara..."
                value={ayrintiSearch}
                onChange={e => setAyrintiSearch(e.target.value)}
                style={{
                  width: "100%", padding: "10px 16px", borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)", color: "#d0c0a0",
                  fontSize: 14, fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
            {/* Tip filtreleri */}
            {(() => {
              const tipler = ["Tümü", "HATIRLAYALIM", "DİKKAT", "KRİTİK BİLGİ"];
              const tipColors = {
                "HATIRLAYALIM": { bg: "rgba(60,140,60,0.18)", border: "rgba(80,200,80,0.3)", text: "#80d080", icon: "💡" },
                "DİKKAT":       { bg: "rgba(180,100,20,0.18)", border: "rgba(220,150,40,0.3)", text: "#f0b060", icon: "⚠️" },
                "KRİTİK BİLGİ":{ bg: "rgba(80,60,200,0.18)", border: "rgba(130,110,240,0.3)", text: "#b8a8f0", icon: "🔑" },
              };
              const filtered2 = ayrintilar.filter(a =>
                (ayrintiTip === "Tümü" || a.tip === ayrintiTip) &&
                (ayrintiSearch === "" ||
                  a.konu.toLowerCase().includes(ayrintiSearch.toLowerCase()) ||
                  a.icerik.toLowerCase().includes(ayrintiSearch.toLowerCase()))
              );
              return (
                <>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                    {tipler.map(t => {
                      const active = ayrintiTip === t;
                      const c = t !== "Tümü" ? tipColors[t] : null;
                      return (
                        <button key={t} onClick={() => setAyrintiTip(t)} style={{
                          padding: "6px 16px", borderRadius: 20, border: "1px solid",
                          borderColor: active ? (c ? c.border : "rgba(180,150,80,0.6)") : "rgba(255,255,255,0.08)",
                          background: active ? (c ? c.bg : "rgba(180,150,60,0.18)") : "transparent",
                          color: active ? (c ? c.text : "#f0d080") : "#6a5a4a",
                          cursor: "pointer", fontSize: 12, fontFamily: "Georgia, serif", transition: "all 0.2s"
                        }}>
                          {c ? c.icon + " " : ""}{t}
                        </button>
                      );
                    })}
                    <span style={{ color: "#5a4a3a", fontSize: 12, marginLeft: "auto" }}>
                      {filtered2.length} bilgi
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {filtered2.map((a, i) => {
                      const c = tipColors[a.tip] || tipColors["DİKKAT"];
                      return (
                        <div key={i} style={{
                          background: c.bg, border: `1px solid ${c.border}`,
                          borderRadius: 14, padding: "14px 18px"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                            <span style={{
                              fontSize: 10, letterSpacing: 2, color: c.text,
                              background: "rgba(0,0,0,0.25)", borderRadius: 6,
                              padding: "2px 10px", fontWeight: "bold", whiteSpace: "nowrap"
                            }}>
                              {c.icon} {a.tip}
                            </span>
                            <span style={{ fontSize: 15, color: "#f0d080", fontFamily: "Georgia, serif" }}>
                              {a.konu}
                            </span>
                          </div>
                          <div style={{ fontSize: 13, color: "#c8b890", lineHeight: 1.75, fontFamily: "Georgia, serif" }}>
                            {a.icerik}
                          </div>
                        </div>
                      );
                    })}
                    {filtered2.length === 0 && (
                      <div style={{ textAlign: "center", color: "#5a4a3a", padding: 48, fontSize: 14 }}>
                        Arama sonucu bulunamadı.
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", color: "#3a2a2a", fontSize: 11, letterSpacing: 2 }}>
          AYT EDEBİYAT • TÜRK EDEBİYATI
        </div>
      </div>
    </div>
  );
}
