const bookContent = [
    {
        fr: "Chapitre 1 : L'Appel de l'Étoile. Dans un village isolé d'Aeloria, Lyra, une jeune astronome, observe une étoile pulsant d'une lumière étrange, murmurant son nom dans ses rêves.",
        en: "Chapter 1: The Call of the Star. In a secluded village of Aeloria, Lyra, a young astronomer, observes a star pulsing with strange light, whispering her name in her dreams.",
        ar: "الفصل الأول: نداء النجمة. في قرية نائية في إيلوريا، تراقب ليرا، عالمة فلك شابة، نجمة تنبض بضوء غريب، تهمس باسمها في أحلامها."
    },
    {
        fr: "Chapitre 2 : Le Voyageur des Ombres. Lyra rencontre un mystérieux voyageur, Kaelen, qui lui révèle une prophétie ancienne : l'étoile guide vers un artefact cosmique.",
        en: "Chapter 2: The Shadow Traveler. Lyra meets a mysterious traveler, Kaelen, who reveals an ancient prophecy: the star guides to a cosmic artifact.",
        ar: "الفصل الثاني: المسافر الظل. تلتقي ليرا بمسافر غامض، كايلن، يكشف عن نبوءة قديمة: النجمة تهدي إلى قطعة كونية."
    },
    {
        fr: "Chapitre 3 : Les Portes du Ciel. Lyra et Kaelen découvrent un portail stellaire caché dans une grotte, activé par la lumière de l'étoile.",
        en: "Chapter 3: The Gates of the Sky. Lyra and Kaelen discover a stellar portal hidden in a cave, activated by the star's light.",
        ar: "الفصل الثالث: بوابات السماء. تكتشف ليرا وكايلن بوابة نجمية مخفية في كهف، تُفعَّل بضوء النجمة."
    },
    {
        fr: "Chapitre 4 : La Mer d'Étoiles. Le portail les transporte vers une mer infinie d'étoiles flottantes, où ils rencontrent une entité lumineuse.",
        en: "Chapter 4: The Sea of Stars. The portal transports them to an infinite sea of floating stars, where they meet a luminous entity.",
        ar: "الفصل الرابع: بحر النجوم. تنقلهم البوابة إلى بحر لا نهائي من النجوم العائمة، حيث يلتقون بكيان مضيء."
    },
    {
        fr: "Chapitre 5 : L'Épreuve de la Lumière. L'entité impose à Lyra une épreuve pour prouver sa valeur, révélant des fragments de son passé oublié.",
        en: "Chapter 5: The Trial of Light. The entity imposes a trial on Lyra to prove her worth, revealing fragments of her forgotten past.",
        ar: "الفصل الخامس: اختبار النور. تفرض الكيان على ليرا اختبارًا لإثبات جدارتها، كاشفًا عن شظايا من ماضيها المنسي."
    },
    {
        fr: "Chapitre 6 : Les Ombres du Passé. Lyra découvre qu'elle est liée à une ancienne lignée de gardiens des étoiles.",
        en: "Chapter 6: Shadows of the Past. Lyra discovers she is tied to an ancient lineage of star guardians.",
        ar: "الفصل السادس: ظلال الماضي. تكتشف ليرا أنها مرتبطة بنسب قديم من حراس النجوم."
    },
    {
        fr: "Chapitre 7 : Le Chant des Cieux. Une mélodie cosmique guide Lyra vers une cité flottante dans le vide spatial.",
        en: "Chapter 7: The Song of the Heavens. A cosmic melody guides Lyra to a floating city in the void of space.",
        ar: "الفصل السابع: أغنية السماوات. ترشد لحن كوني ليرا إلى مدينة عائمة في فراغ الفضاء."
    },
    {
        fr: "Chapitre 8 : Les Gardiens de la Cité. Les habitants de la cité révèlent à Lyra le secret de l'artefact : un cristal contenant l'essence d'une étoile.",
        en: "Chapter 8: The Guardians of the City. The city's inhabitants reveal to Lyra the secret of the artifact: a crystal containing a star's essence.",
        ar: "الفصل الثامن: حراس المدينة. يكشف سكان المدينة لليرا عن سر القطعة: بلورة تحتوي على جوهر نجمة."
    },
    {
        fr: "Chapitre 9 : La Trahison de Kaelen. Kaelen révèle qu'il travaille pour une force obscure cherchant à s'emparer du cristal.",
        en: "Chapter 9: Kaelen's Betrayal. Kaelen reveals he works for a dark force seeking to seize the crystal.",
        ar: "الفصل التاسع: خيانة كايلن. يكشف كايلن أنه يعمل لصالح قوة مظلمة تسعى للاستيلاء على البلورة."
    },
    {
        fr: "Chapitre 10 : La Fuite. Lyra échappe à Kaelen et s'enfuit avec le cristal, poursuivie par des ombres cosmiques.",
        en: "Chapter 10: The Escape. Lyra escapes Kaelen and flees with the crystal, pursued by cosmic shadows.",
        ar: "الفصل العاشر: الهروب. تهرب ليرا من كايلن وتفر مع البلورة، مطاردة بظلال كونية."
    },
    // Ajout des chapitres 11 à 44 avec des résumés uniques
    {
        fr: "Chapitre 11 : Le Refuge Stellaire. Lyra trouve refuge dans une station spatiale abandonnée, où elle apprend à utiliser le cristal.",
        en: "Chapter 11: The Stellar Refuge. Lyra finds refuge in an abandoned space station, where she learns to use the crystal.",
        ar: "الفصل الحادي عشر: الملجأ النجمي. تجد ليرا ملجأً في محطة فضائية مهجورة، حيث تتعلم استخدام البلورة."
    },
    {
        fr: "Chapitre 12 : Les Murmures du Cristal. Le cristal commence à communiquer avec Lyra, lui montrant des visions d'autres mondes.",
        en: "Chapter 12: The Whispers of the Crystal. The crystal begins to communicate with Lyra, showing her visions of other worlds.",
        ar: "الفصل الثاني عشر: همسات البلورة. تبدأ البلورة في التواصل مع ليرا، تُظهر لها رؤى لعوالم أخرى."
    },
    {
        fr: "Chapitre 13 : L'Alliance Brisée. Lyra rencontre un groupe de rebelles qui s'opposent à la force obscure, mais ils se méfient d'elle.",
        en: "Chapter 13: The Broken Alliance. Lyra meets a group of rebels opposing the dark force, but they distrust her.",
        ar: "الفصل الثالث عشر: التحالف المكسور. تلتقي ليرا بمجموعة من المتمردين الذين يعارضون القوة المظلمة، لكنهم لا يثقون بها."
    },
    {
        fr: "Chapitre 14 : Le Labyrinthe des Étoiles. Lyra traverse un labyrinthe spatial pour atteindre une cachette rebelle.",
        en: "Chapter 14: The Star Maze. Lyra navigates a spatial labyrinth to reach a rebel hideout.",
        ar: "الفصل الرابع عشر: متاهة النجوم. تعبر ليرا متاهة فضائية للوصول إلى مخبأ المتمردين."
    },
    {
        fr: "Chapitre 15 : La Vérité Cachée. Les rebelles révèlent que l'étoile est liée à une ancienne guerre cosmique.",
        en: "Chapter 15: The Hidden Truth. The rebels reveal that the star is tied to an ancient cosmic war.",
        ar: "الفصل الخامس عشر: الحقيقة المخفية. يكشف المتمردون أن النجمة مرتبطة بحرب كونية قديمة."
    },
    {
        fr: "Chapitre 16 : Le Pacte. Lyra conclut un pacte avec les rebelles pour protéger le cristal, mais à un coût élevé.",
        en: "Chapter 16: The Pact. Lyra makes a pact with the rebels to protect the crystal, but at a high cost.",
        ar: "الفصل السادس عشر: العهد. تعقد ليرا اتفاقًا مع المتمردين لحماية البلورة، ولكن بتكلفة باهظة."
    },
    {
        fr: "Chapitre 17 : La Traque. Les ombres cosmiques retrouvent Lyra, la forçant à fuir à nouveau.",
        en: "Chapter 17: The Hunt. The cosmic shadows find Lyra, forcing her to flee again.",
        ar: "الفصل السابع عشر: المطاردة. تجد الظلال الكونية ليرا، مما يجبرها على الفرار مجددًا."
    },
    {
        fr: "Chapitre 18 : Le Sanctuaire. Lyra découvre un sanctuaire ancien où le cristal révèle plus de secrets.",
        en: "Chapter 18: The Sanctuary. Lyra discovers an ancient sanctuary where the crystal reveals more secrets.",
        ar: "الفصل الثامن عشر: الملاذ. تكتشف ليرا ملاذًا قديمًا حيث تكشف البلورة المزيد من الأسرار."
    },
    {
        fr: "Chapitre 19 : Les Échos du Passé. Des visions montrent à Lyra les erreurs des anciens gardiens des étoiles.",
        en: "Chapter 19: Echoes of the Past. Visions show Lyra the mistakes of the ancient star guardians.",
        ar: "الفصل التاسع عشر: أصداء الماضي. تُظهر الرؤى لليرا أخطاء حراس النجوم القدامى."
    },
    {
        fr: "Chapitre 20 : L'Épreuve du Courage. Lyra doit affronter ses peurs dans une dimension onirique créée par le cristal.",
        en: "Chapter 20: The Trial of Courage. Lyra must face her fears in a dreamlike dimension created by the crystal.",
        ar: "الفصل العشرون: اختبار الشجاعة. يجب على ليرا مواجهة مخاوفها في بُعد يشبه الحلم أنشأته البلورة."
    },
    {
        fr: "Chapitre 21 : Le Retour de Kaelen. Kaelen réapparaît, offrant à Lyra une chance de rédemption.",
        en: "Chapter 21: Kaelen's Return. Kaelen reappears, offering Lyra a chance at redemption.",
        ar: "الفصل الحادي والعشرون: عودة كايلن. يظهر كايلن مجددًا، مقدمًا لليرا فرصة للخلاص."
    },
    {
        fr: "Chapitre 22 : La Flotte des Ombres. Une flotte ennemie attaque le sanctuaire, obligeant Lyra à prendre une décision cruciale.",
        en: "Chapter 22: The Shadow Fleet. An enemy fleet attacks the sanctuary, forcing Lyra to make a crucial decision.",
        ar: "الفصل الثاني والعشرون: أسطول الظلال. يهاجم أسطول العدو الملاذ، مما يجبر ليرا على اتخاذ قرار حاسم."
    },
    {
        fr: "Chapitre 23 : Le Sacrifice. Lyra sacrifie une partie du cristal pour sauver ses alliés.",
        en: "Chapter 23: The Sacrifice. Lyra sacrifices part of the crystal to save her allies.",
        ar: "الفصل الثالث والعشرون: التضحية. تضحي ليرا بجزء من البلورة لإنقاذ حلفائها."
    },
    {
        fr: "Chapitre 24 : La Voie des Étoiles. Le cristal guide Lyra vers une nouvelle destination, une planète inconnue.",
        en: "Chapter 24: The Path of the Stars. The crystal guides Lyra to a new destination, an unknown planet.",
        ar: "الفصل الرابع والعشرون: طريق النجوم. تهدي البلورة ليرا إلى وجهة جديدة، كوكب مجهول."
    },
    {
        fr: "Chapitre 25 : La Planète Morte. Lyra explore une planète ravagée par une ancienne guerre stellaire.",
        en: "Chapter 25: The Dead Planet. Lyra explores a planet ravaged by an ancient stellar war.",
        ar: "الفصل الخامس والعشرون: الكوكب الميت. تستكشف ليرا كوكبًا دمرته حرب نجمية قديمة."
    },
    {
        fr: "Chapitre 26 : Les Reliques. Lyra trouve des reliques qui pourraient restaurer le cristal.",
        en: "Chapter 26: The Relics. Lyra finds relics that could restore the crystal.",
        ar: "الفصل السادس والعشرون: الآثار. تجد ليرا آثارًا يمكن أن تعيد البلورة."
    },
    {
        fr: "Chapitre 27 : L'Émissaire. Une entité cosmique contacte Lyra, lui proposant une alliance risquée.",
        en: "Chapter 27: The Emissary. A cosmic entity contacts Lyra, offering a risky alliance.",
        ar: "الفصل السابع والعشرون: المبعوث. تتواصل كيان كوني مع ليرا، مقدمًا تحالفًا محفوفًا بالمخاطر."
    },
    {
        fr: "Chapitre 28 : La Tempête Stellaire. Une tempête cosmique menace de détruire la planète où Lyra se trouve.",
        en: "Chapter 28: The Stellar Storm. A cosmic storm threatens to destroy the planet where Lyra is.",
        ar: "الفصل الثامن والعشرون: العاصفة النجمية. تهدد عاصفة كونية بتدمير الكوكب الذي تتواجد فيه ليرا."
    },
    {
        fr: "Chapitre 29 : La Révélation. Lyra découvre que le cristal est lié à l'origine de l'univers.",
        en: "Chapter 29: The Revelation. Lyra discovers that the crystal is tied to the universe's origin.",
        ar: "الفصل التاسع والعشرون: الوحي. تكتشف ليرا أن البلورة مرتبطة بأصل الكون."
    },
    {
        fr: "Chapitre 30 : Le Conseil des Étoiles. Lyra est convoquée par un conseil d'entités stellaires pour juger de ses actions.",
        en: "Chapter 30: The Council of Stars. Lyra is summoned by a council of stellar entities to judge her actions.",
        ar: "الفصل الثلاثون: مجلس النجوم. تُستدعى ليرا من قبل مجلس من الكيانات النجمية للحكم على أفعالها."
    },
    {
        fr: "Chapitre 31 : La Défense. Lyra plaide sa cause devant le conseil, révélant ses intentions pures.",
        en: "Chapter 31: The Defense. Lyra pleads her case before the council, revealing her pure intentions.",
        ar: "الفصل الحادي والثلاثون: الدفاع. تدافع ليرا عن قضيتها أمام المجلس، كاشفة عن نواياها النقية."
    },
    {
        fr: "Chapitre 32 : La Clé du Cristal. Le conseil donne à Lyra une clé pour déverrouiller le plein pouvoir du cristal.",
        en: "Chapter 32: The Crystal's Key. The council gives Lyra a key to unlock the crystal's full power.",
        ar: "الفصل الثاني والثلاثون: مفتاح البلورة. يعطي المجلس لليرا مفتاحًا لفتح القوة الكاملة للبلورة."
    },
    {
        fr: "Chapitre 33 : L'Armée des Ombres. La force obscure lance une attaque massive contre les rebelles.",
        en: "Chapter 33: The Army of Shadows. The dark force launches a massive attack against the rebels.",
        ar: "الفصل الثالث والثلاثون: جيش الظلال. تشن القوة المظلمة هجومًا ضخمًا ضد المتمردين."
    },
    {
        fr: "Chapitre 34 : La Bataille Finale. Lyra utilise le cristal pour affronter l'armée des ombres.",
        en: "Chapter 34: The Final Battle. Lyra uses the crystal to confront the army of shadows.",
        ar: "الفصل الرابع والثلاثون: المعركة النهائية. تستخدم ليرا البلورة لمواجهة جيش الظلال."
    },
    {
        fr: "Chapitre 35 : La Lumière de l'Étoile. Le cristal libère une lumière aveuglante, repoussant les ombres.",
        en: "Chapter 35: The Star's Light. The crystal releases a blinding light, repelling the shadows.",
        ar: "الفصل الخامس والثلاثون: نور النجمة. تُطلق البلورة ضوءًا مبهرًا، يطرد الظلال."
    },
    {
        fr: "Chapitre 36 : Le Prix de la Victoire. La victoire a un coût : le cristal commence à s'effriter.",
        en: "Chapter 36: The Price of Victory. The victory comes at a cost: the crystal begins to crumble.",
        ar: "الفصل السادس والثلاثون: ثمن النصر. يأتي النصر بثمن: تبدأ البلورة في التفتت."
    },
    {
        fr: "Chapitre 37 : La Reconstruction. Lyra et les rebelles travaillent à reconstruire ce qui a été perdu.",
        en: "Chapter 37: The Reconstruction. Lyra and the rebels work to rebuild what was lost.",
        ar: "الفصل السابع والثلاثون: إعادة البناء. تعمل ليرا والمتمردون على إعادة بناء ما فقد."
    },
    {
        fr: "Chapitre 38 : L'Héritage. Lyra découvre qu'elle doit transmettre l'héritage des gardiens des étoiles.",
        en: "Chapter 38: The Legacy. Lyra discovers she must pass on the legacy of the star guardians.",
        ar: "الفصل الثامن والثلاثون: الإرث. تكتشف ليرا أن عليها نقل إرث حراس النجوم."
    },
    {
        fr: "Chapitre 39 : Le Nouveau Gardien. Lyra choisit un successeur pour protéger le cristal.",
        en: "Chapter 39: The New Guardian. Lyra chooses a successor to protect the crystal.",
        ar: "الفصل التاسع والثلاثون: الحارس الجديد. تختار ليرا خلفًا لحماية البلورة."
    },
    {
        fr: "Chapitre 40 : Le Retour au Village. Lyra retourne à Aeloria, transformée par son voyage.",
        en: "Chapter 40: The Return to the Village. Lyra returns to Aeloria, transformed by her journey.",
        ar: "الفصل الأربعون: العودة إلى القرية. تعود ليرا إلى إيلوريا، متغيرة برحلتها."
    },
    {
        fr: "Chapitre 41 : La Nouvelle Étoile. Une nouvelle étoile apparaît dans le ciel, signe d'un nouveau cycle.",
        en: "Chapter 41: The New Star. A new star appears in the sky, a sign of a new cycle.",
        ar: "الفصل الحادي والأربعون: النجمة الجديدة. تظهر نجمة جديدة في السماء، علامة على دورة جديدة."
    },
    {
        fr: "Chapitre 42 : Les Enseignements. Lyra partage ses connaissances avec les habitants d'Aeloria.",
        en: "Chapter 42: The Teachings. Lyra shares her knowledge with the people of Aeloria.",
        ar: "الفصل الثاني والأربعون: التعاليم. تشارك ليرا معرفتها مع سكان إيلوريا."
    },
    {
        fr: "Chapitre 43 : L'Aube Nouvelle. Aeloria prospère sous la guidance de Lyra, unissant les étoiles et les hommes.",
        en: "Chapter 43: The New Dawn. Aeloria prospers under Lyra's guidance, uniting stars and men.",
        ar: "الفصل الثالث والأربعون: الفجر الجديد. تزدهر إيلوريا تحت إرشاد ليرا، موحدة النجوم والبشر."
    },
    {
        fr: "Chapitre 44 : L'Écho Éternel. Lyra regarde les étoiles, sachant que son histoire vivra à travers elles pour toujours.",
        en: "Chapter 44: The Eternal Echo. Lyra gazes at the stars, knowing her story will live through them forever.",
        ar: "الفصل الرابع والأربعون: الصدى الأبدي. تنظر ليرا إلى النجوم، عالمة أن قصتها ستعيش من خلالها إلى الأبد."
    }
];
