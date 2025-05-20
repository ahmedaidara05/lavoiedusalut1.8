// content.js - Contient tout le contenu du livre dans différentes langues

const content = {
    chapters: []
};

// Fonction pour générer un contenu de chapitre simple (à personnaliser)
function generateChapterContent(chapterNum, lang) {
    const defaultSummary = {
        fr: `Ce chapitre explore de nouvelles révélations et défis pour Elara dans sa quête.`,
        en: `This chapter delves into new revelations and challenges for Elara in her quest.`,
        ar: `يستكشف هذا الفصل كشوفات وتحديات جديدة لإيلارا في سعيها.`
    };
    const defaultText = {
        fr: `
            <p>Le chemin d'Elara la mène toujours plus loin, révélant des paysages et des êtres qu'elle n'aurait jamais imaginés. Au chapitre ${chapterNum}, elle fait face à de nouvelles épreuves, mais aussi à des alliés inattendus. Le mystère de "La Voie du Salut" s'approfondit, chaque pas la rapprochant de la vérité sur son passé et son destin.</p>
            <p>Elle découvre des secrets anciens et apprend à maîtriser des capacités qui la dépassent. Les enjeux sont de plus en plus importants, et la menace des ombres grandit. Pourtant, son courage ne faiblit pas, et elle est prête à tout pour accomplir sa mission et protéger ceux qu'elle aime.</p>
            <p>Les rebondissements s'enchaînent, et la tension monte. Elara doit prendre des décisions cruciales qui influenceront le sort de son monde. La lumière au fond d'elle est la seule chose qui la guide à travers les ténèbres. L'histoire continue, et chaque révélation est plus surprenante que la précédente.</p>
        `,
        en: `
            <p>Elara's path leads her further and further, revealing landscapes and beings she never imagined. In Chapter ${chapterNum}, she faces new trials, but also unexpected allies. The mystery of "The Path of Salvation" deepens, each step bringing her closer to the truth about her past and her destiny.</p>
            <p>She uncovers ancient secrets and learns to master abilities beyond her comprehension. The stakes are increasingly high, and the threat of shadows grows. Yet, her courage does not waver, and she is ready to do anything to fulfill her mission and protect those she loves.</p>
            <p>The twists and turns continue, and the tension rises. Elara must make crucial decisions that will influence the fate of her world. The light within her is the only thing guiding her through the darkness. The story continues, and each revelation is more surprising than the last.</p>
        `,
        ar: `
            <p>يأخذ طريق إيلارا خطوات أبعد وأبعد، كاشفًا عن مناظر طبيعية وكائنات لم تتخيلها أبدًا. في الفصل ${chapterNum}، تواجه تجارب جديدة، ولكن أيضًا حلفاء غير متوقعين. يتعمق لغز "طريق الخلاص"، وتقربها كل خطوة من الحقيقة حول ماضيها ومصيرها.</p>
            <p>تكشف عن أسرار قديمة وتتعلم إتقان قدرات تفوق فهمها. المخاطر تتزايد باطراد، ويزداد تهديد الظلال. ومع ذلك، لا يتراجع شجاعتها، وهي مستعدة لفعل أي شيء لتحقيق مهمتها وحماية من تحب.</p>
            <p>تتوالى التقلبات، ويزداد التوتر. يجب على إيلارا اتخاذ قرارات حاسمة ستؤثر على مصير عالمها. النور بداخلها هو الشيء الوحيد الذي يرشدها خلال الظلام. تستمر القصة، وكل كشف أكثر إثارة للدهشة من سابقه.</p>
        `
    };

    return {
        id: `chapter-${chapterNum}`,
        title: {
            fr: `Chapitre ${chapterNum}: L'Éveil de la Lumière ${chapterNum}`,
            en: `Chapter ${chapterNum}: The Awakening of Light ${chapterNum}`,
            ar: `الفصل ${chapterNum}: يقظة النور ${chapterNum}`
        },
        summary: defaultSummary,
        text: defaultText
    };
}


// Générer les 44 chapitres
for (let i = 1; i <= 44; i++) {
    const chapter = generateChapterContent(i);
    // Personnalisation des 3 premiers chapitres et du dernier comme vous l'avez demandé
    if (i === 1) {
        chapter.title.fr = "Le Berceau Oublié";
        chapter.title.en = "The Forgotten Cradle";
        chapter.title.ar = "المهد المنسي";
        chapter.summary.fr = "Introduction à Elara, une jeune orpheline vivant dans un village reculé, hantée par des rêves étranges et le mystère de ses origines.";
        chapter.summary.en = "Introduction to Elara, a young orphan living in a remote village, haunted by strange dreams and the mystery of her origins.";
        chapter.summary.ar = "مقدمة إلى إيلارا، يتيمة شابة تعيش في قرية نائية، تطاردها أحلام غريبة وغموض أصولها.";
        chapter.text.fr = `
            <p>Dans les profondeurs verdoyantes de la Forêt Murmurante, où les arbres centenaires cachaient des secrets plus anciens qu'eux-mêmes, se nichait le petit village de Sombreval. Ses habitants, simples fermiers et artisans, vivaient au rythme des saisons, ignorant le vaste monde au-delà de leurs montagnes. C'est là, dans une modeste chaumière aux murs de pierre et au toit de chaume, que vivait Elara. Elle n'avait pas connu ses parents, emportés par une fièvre mystérieuse alors qu'elle n'était qu'un nourrisson. Élevée par la bienveillante Vieille Thera, la guérisseuse du village, Elara avait grandi avec un vide au cœur et un esprit curieux.</p>
            <p>Dès son plus jeune âge, des rêves étranges et récurrents la hantaient. Des fragments d'images floues : une lumière dorée, des symboles gravés sur des pierres antiques, et une mélodie lointaine qui résonnait dans son âme. Ces rêves ne ressemblaient pas à ceux des autres enfants ; ils étaient empreints d'une puissance et d'un mystère qu'elle ne pouvait déchiffrer. La Vieille Thera, avec ses yeux sagaces, avait remarqué l'étrangeté d'Elara. Elle possédait une intuition rare, une capacité à ressentir les courants invisibles du monde, et parfois, sans le vouloir, des objets se déplaçaient à sa simple pensée. Des incidents mineurs, certes, mais suffisants pour distinguer Elara des autres.</p>
            <p>Un matin brumeux, alors qu'Elara cueillait des herbes médicinales à la lisière de la forêt, elle trébucha sur une racine et tomba. En se relevant, ses doigts s'accrochèrent à quelque chose de dur et de froid, à moitié enfoui dans la terre humide. C'était un médaillon, sculpté dans un métal inconnu, avec un symbole étrange en son centre – le même symbole qui apparaissait dans ses rêves. Un frisson parcourut son échine. Ce médaillon, oublié et caché, semblait l'attendre. C'était le premier signe tangible que ses rêves n'étaient pas de simples fantaisies, mais des échos d'une vérité enfouie, l'appel silencieux de son berceau oublié.</p>
        `;
        chapter.text.en = `
            <p>In the verdant depths of the Whispering Forest, where ancient trees concealed secrets older than themselves, nestled the small village of Shadowdale. Its inhabitants, simple farmers and artisans, lived by the rhythm of the seasons, unaware of the vast world beyond their mountains. It was there, in a modest stone-walled, thatched-roof cottage, that Elara lived. She had never known her parents, who were taken by a mysterious fever when she was just an infant. Raised by the benevolent Old Thera, the village healer, Elara had grown up with a void in her heart and a curious spirit.</p>
            <p>From a young age, strange and recurring dreams haunted her. Fragments of blurry images: a golden light, symbols carved on ancient stones, and a distant melody that resonated in her soul. These dreams were not like those of other children; they were imbued with a power and mystery she couldn't decipher. Old Thera, with her keen eyes, had noticed Elara's strangeness. She possessed a rare intuition, a capacity to feel the invisible currents of the world, and sometimes, unintentionally, objects would move at her mere thought. Minor incidents, to be sure, but enough to set Elara apart from others.</p>
            <p>One misty morning, as Elara was gathering medicinal herbs at the forest's edge, she tripped over a root and fell. As she got up, her fingers brushed against something hard and cold, half-buried in the damp earth. It was a locket, carved from an unknown metal, with a strange symbol at its center – the same symbol that appeared in her dreams. A shiver ran down her spine. This forgotten, hidden locket seemed to be waiting for her. It was the first tangible sign that her dreams were not mere fantasies, but echoes of a buried truth, the silent call of her forgotten cradle.</p>
        `;
        chapter.text.ar = `
            <p>في أعماق غابة الهمس الخضراء، حيث كانت الأشجار القديمة تخفي أسرارًا أقدم من نفسها، تقع قرية وادي الظل الصغيرة. كان سكانها، من مزارعين وحرفيين بسطاء، يعيشون على إيقاع الفصول، غير مدركين للعالم الواسع خارج جبالهم. هناك، في كوخ متواضع بجدران حجرية وسقف من القش، عاشت إيلارا. لم تعرف والديها، فقد توفيا بسبب حمى غامضة عندما كانت رضيعة. نشأت إيلارا على يد المعالجة الطيبة ثيرا العجوز، وعاشت بفراغ في قلبها وروح فضولية.</p>
            <p>منذ صغرها، كانت تراودها أحلام غريبة ومتكررة. شذرات من صور ضبابية: ضوء ذهبي، رموز محفورة على أحجار قديمة، ولحن بعيد يتردد صداه في روحها. لم تكن هذه الأحلام مثل أحلام الأطفال الآخرين؛ فقد كانت مشبعة بقوة وغموض لم تتمكن من فك رموزها. لاحظت ثيرا العجوز، بعينيها الثاقبتين، غرابة إيلارا. لقد امتلكت حدسًا نادرًا، وقدرة على الشعور بالتيارات غير المرئية في العالم، وأحيانًا، دون قصد، تتحرك الأشياء بمجرد تفكيرها. حوادث بسيطة، بالتأكيد، ولكنها كافية لتمييز إيلارا عن الآخرين.</p>
            <p>في صباح ضبابي، بينما كانت إيلارا تجمع الأعشاب الطبية على حافة الغابة، تعثرت في جذر وسقطت. عندما نهضت، تشبثت أصابعها بشيء صلب وبارد، نصف مدفون في الأرض الرطبة. كانت قلادة، منحوتة من معدن غير معروف، وعليها رمز غريب في المنتصف - نفس الرمز الذي كان يظهر في أحلامها. سرى قشعريرة في عمودها الفقري. هذه القلادة المنسية والمخبأة، بدت وكأنها تنتظرها. لقد كانت أول علامة ملموسة على أن أحلامها لم تكن مجرد خيالات، بل أصداء لحقيقة مدفونة، نداء صامت لمهدها المنسي.</p>
        `;
    } else if (i === 2) {
        chapter.title.fr = "L'Appel du Destin";
        chapter.title.en = "The Call of Destiny";
        chapter.title.ar = "نداء القدر";
        chapter.summary.fr = "Elara quitte son village pour un voyage inattendu, guidée par le médaillon et un vieux parchemin trouvé dans les affaires de Thera.";
        chapter.summary.en = "Elara leaves her village for an unexpected journey, guided by the locket and an old parchment found among Thera's belongings.";
        chapter.summary.ar = "إيلارا تغادر قريتها في رحلة غير متوقعة، تسترشد بالقلادة ولفافة قديمة عثر عليها ضمن ممتلكات ثيرا.";
        chapter.text.fr = `
            <p>La découverte du médaillon fut un tournant. Elara le montra à la Vieille Thera, qui, en le voyant, pâlit et son visage habituellement serein se crispa. Thera révéla à Elara qu'elle n'était pas de Sombreval, mais qu'elle avait été trouvée, bébé, près d'un ancien temple en ruines, le médaillon serré dans sa petite main. Thera, une gardienne de savoirs ancestraux, possédait également un vieux parchemin, dissimulé depuis des décennies, décrivant le symbole du médaillon comme un signe de la lignée des 'Gardiens de la Lumière', un peuple disparu censé protéger les équilibres du monde.</p>
            <p>Le parchemin parlait d'une prophétie : "Quand les ombres s'allongeront et que l'oubli règnera, l'enfant du berceau oublié reviendra, guidé par le symbole d'or, pour réveiller la lumière endormie." Elara comprit alors que ses rêves, le médaillon, et cette prophétie étaient liés à son destin. Elle ne pouvait plus rester à Sombreval. Le monde l'appelait, et elle devait découvrir la vérité sur ses origines et sur ce que signifiait être une Gardienne de la Lumière.</p>
            <p>Malgré la tristesse de quitter Thera, qui lui avait offert tant d'amour, Elara se prépara. Elle emporta le médaillon, le parchemin, quelques provisions et une petite bourse de pièces. À l'aube, sous un ciel pourpre et or, elle quitta Sombreval, le cœur lourd mais rempli d'une détermination nouvelle. Chaque pas l'éloignait de son passé connu et la rapprochait d'un avenir incertain, mais elle sentait au plus profond d'elle que c'était la voie qu'elle devait suivre. Le vent portait avec lui les murmures de la forêt, comme une mélodie lointaine qui la guidait vers l'inconnu, vers l'appel du destin.</p>
        `;
        chapter.text.en = `
            <p>The discovery of the locket was a turning point. Elara showed it to Old Thera, who, upon seeing it, paled, and her usually serene face contorted. Thera revealed to Elara that she was not from Shadowdale, but had been found as a baby near an ancient ruined temple, the locket clutched in her tiny hand. Thera, a guardian of ancient knowledge, also possessed an old parchment, hidden for decades, describing the locket's symbol as a sign of the lineage of the 'Guardians of Light', a vanished people believed to protect the world's balances.</p>
            <p>The parchment spoke of a prophecy: "When shadows lengthen and oblivion reigns, the child from the forgotten cradle shall return, guided by the golden symbol, to awaken the dormant light." Elara then understood that her dreams, the locket, and this prophecy were linked to her destiny. She could no longer stay in Shadowdale. The world called her, and she had to discover the truth about her origins and what it meant to be a Guardian of Light.</p>
            <p>Despite the sadness of leaving Thera, who had given her so much love, Elara prepared herself. She took the locket, the parchment, some provisions, and a small purse of coins. At dawn, under a purple and gold sky, she left Shadowdale, her heart heavy but filled with a new determination. Each step took her further from her known past and closer to an uncertain future, but deep down, she felt it was the path she had to follow. The wind carried with it the whispers of the forest, like a distant melody guiding her towards the unknown, towards the call of destiny.</p>
        `;
        chapter.text.ar = `
            <p>كان اكتشاف القلادة نقطة تحول. عرضتها إيلارا على ثيرا العجوز، التي، عند رؤيتها، شحب وجهها وتقلص وجهها الهادئ عادةً. كشفت ثيرا لإيلارا أنها ليست من وادي الظل، ولكنها وُجدت، وهي طفلة رضيعة، بالقرب من معبد قديم مهجور، والقلادة محكمة في يدها الصغيرة. كانت ثيرا، حارسة المعرفة القديمة، تمتلك أيضًا لفافة قديمة، مخبأة لعقود، تصف رمز القلادة كعلامة على سلالة 'حراس النور'، شعب مختف يُعتقد أنه يحمي توازنات العالم.</p>
            <p>تحدثت اللفافة عن نبوءة: "عندما تطول الظلال ويسود النسيان، سيعود طفل المهد المنسي، مسترشدًا بالرمز الذهبي، ليوقظ النور النائم." أدركت إيلارا حينها أن أحلامها، والقلادة، وهذه النبوءة مرتبطة بمصيرها. لم تستطع البقاء في وادي الظل بعد الآن. كان العالم يناديها، وكان عليها اكتشاف الحقيقة حول أصولها وما يعنيه أن تكون حارسة للنور.</p>
            <p>على الرغم من حزنها لمغادرة ثيرا، التي قدمت لها الكثير من الحب، أعدت إيلارا نفسها. أخذت القلادة، واللفافة، وبعض المؤن، وحقيبة صغيرة من العملات المعدنية. عند الفجر، تحت سماء أرجوانية وذهبية، غادرت وادي الظل، وقلبها مثقل ولكن مليء بتصميم جديد. كل خطوة أبعدتها عن ماضيها المعروف وقربتها من مستقبل غير مؤكد، لكنها شعرت في أعماقها أن هذا هو الطريق الذي كان عليها أن تسلكه. حملت الريح معها همسات الغابة، كأنها لحن بعيد يرشدها نحو المجهول، نحو نداء القدر.</p>
        `;
    } else if (i === 3) {
        chapter.title.fr = "Les Sentiers Oubliés";
        chapter.title.en = "The Forgotten Paths";
        chapter.title.ar = "المسالك المنسية";
        chapter.summary.fr = "Elara rencontre son premier défi sur la route, une forêt enchantée qui teste sa volonté et ses capacités naissantes.";
        chapter.summary.en = "Elara faces her first challenge on the road, an enchanted forest that tests her will and budding abilities.";
        chapter.summary.ar = "إيلارا تواجه تحديها الأول على الطريق، غابة مسحورة تختبر إرادتها وقدراتها الناشئة.";
        chapter.text.fr = `
            <p>Le chemin qu'Elara avait choisi, suggéré par une vague carte dessinée sur le parchemin, la mena rapidement à l'entrée de la Forêt des Échos. On racontait que cette forêt avait une âme propre, changeant ses sentiers pour égarer les voyageurs non dignes. Dès qu'elle pénétra sous la canopée dense, l'air devint lourd, et le silence était si profond qu'elle pouvait entendre les battements de son propre cœur. Les arbres semblaient la regarder, leurs branches noueuses se tordant en formes menaçantes, et des murmures inaudibles semblaient flotter dans l'air.</p>
            <p>Elara suivit le médaillon qui pulsait faiblement, s'éclairant d'une douce lueur dorée quand elle s'approchait de la bonne direction. Mais la forêt était rusée. Les sentiers se dédoublaient, les rochers semblaient se déplacer, et des illusions visuelles la désorientaient. La faim et la soif commencèrent à se faire sentir, et le doute rongea son esprit. Plusieurs fois, elle pensa rebrousser chemin, mais le souvenir de Thera et la force de la prophétie la poussèrent à continuer.</p>
            <p>C'est au cœur de cette épreuve qu'elle sentit ses pouvoirs naissants s'éveiller. Face à un mur de ronces qui semblait surgir de nulle part, elle ferma les yeux et se concentra. Une chaleur monta dans ses mains, et sans même la toucher, les ronces se reculèrent, ouvrant un passage. Elara fut stupéfaite. Ce n'était pas un hasard, mais un contrôle, une extension de sa volonté. Elle avait traversé les Sentiers Oubliés, non pas en les défiant par la force, mais en les comprenant par la lumière qui l'habitait. Ce fut sa première victoire, et elle lui donna la confiance nécessaire pour affronter ce qui l'attendait.</p>
        `;
        chapter.text.en = `
            <p>The path Elara had chosen, suggested by a vague map drawn on the parchment, quickly led her to the entrance of the Echoing Forest. It was said that this forest had a soul of its own, shifting its paths to mislead unworthy travelers. As soon as she entered beneath the dense canopy, the air became heavy, and the silence was so profound that she could hear her own heartbeat. The trees seemed to watch her, their gnarled branches twisting into menacing shapes, and inaudible whispers seemed to float in the air.</p>
            <p>Elara followed the faintly pulsating locket, which glowed with a soft golden light when she approached the correct direction. But the forest was cunning. Paths split, rocks seemed to move, and visual illusions disoriented her. Hunger and thirst began to set in, and doubt gnawed at her mind. Several times, she thought about turning back, but the memory of Thera and the strength of the prophecy urged her to continue.</p>
            <p>It was in the midst of this trial that she felt her nascent powers awaken. Faced with a wall of thorns that seemed to appear out of nowhere, she closed her eyes and concentrated. A warmth rose in her hands, and without even touching it, the thorns receded, opening a passage. Elara was stunned. This was not a coincidence, but control, an extension of her will. She had traversed the Forgotten Paths, not by defying them with force, but by understanding them through the light within her. It was her first victory, and it gave her the confidence needed to face what lay ahead.</p>
        `;
        chapter.text.ar = `
            <p>الطريق الذي اختارته إيلارا، والذي اقترحته خريطة غامضة مرسومة على اللفافة، سرعان ما قادها إلى مدخل غابة الصدى. قيل إن هذه الغابة لها روح خاصة بها، تغير مساراتها لتضليل المسافرين غير الجديرين. بمجرد دخولها تحت الظلال الكثيفة، أصبح الهواء ثقيلاً، وكان الصمت عميقًا لدرجة أنها كانت تسمع دقات قلبها. بدت الأشجار تراقبها، وأغصانها المعقودة تلتف بأشكال تهديدية، وبدا أن همسات غير مسموعة تطفو في الهواء.</p>
            <p>تبعث إيلارا القلادة التي كانت تنبض بضعف، تضيء بوهج ذهبي خفيف عندما اقتربت من الاتجاه الصحيح. لكن الغابة كانت ماكرة. انقسمت المسارات، وبدت الصخور تتحرك، وخدعت الأوهام البصرية بصرها. بدأ الجوع والعطش يسيطران، وقضم الشك عقلها. عدة مرات، فكرت في العودة، لكن ذكرى ثيرا وقوة النبوءة دفعاها للاستمرار.</p>
            <p>في خضم هذا الاختبار، شعرت بقدراتها الناشئة تتأجج. عندما واجهت جدارًا من الأشواك بدا وكأنه ظهر من العدم، أغمضت عينيها وركزت. صعدت حرارة في يديها، ودون أن تلمسها، تراجعت الأشواك، فاتحةً ممرًا. ذُهلت إيلارا. لم يكن هذا صدفة، بل كان تحكمًا، امتدادًا لإرادتها. لقد عبرت المسالك المنسية، ليس بتحديها بالقوة، بل بفهمها من خلال النور الذي يسكنها. كان هذا انتصارها الأول، ومنحها الثقة اللازمة لمواجهة ما ينتظرها.</p>
        `;
    } else if (i === 44) {
        chapter.title.fr = "L'Aube Nouvelle";
        chapter.title.en = "The New Dawn";
        chapter.title.ar = "الفجر الجديد";
        chapter.summary.fr = "Elara, ayant accompli sa destinée, assiste à l'aube d'une nouvelle ère de paix et de lumière, sachant que son voyage n'est qu'un début.";
        chapter.summary.en = "Elara, having fulfilled her destiny, witnesses the dawn of a new era of peace and light, knowing her journey is just beginning.";
        chapter.summary.ar = "إيلارا، بعد أن أتمت قدرها، تشهد بزوغ فجر جديد من السلام والنور، مع علمها بأن رحلتها ليست سوى البداية.";
        chapter.text.fr = `
            <p>L'affrontement final avec les Ténèbres fut rude, mais Elara, armée de la sagesse des Anciens, de la puissance des Gardiens de la Lumière, et de la force de son propre cœur, triompha. La lumière dorée qu'elle maîtrisait inonda le monde, repoussant les ombres qui l'avaient longtemps étouffé. Les symboles sur son médaillon brillèrent d'un éclat intense, se synchronisant avec le cœur même du monde, rétablissant l'équilibre perdu.</p>
            <p>Les royaumes jadis divisés par la peur se tendirent la main. Les créatures mythiques réapparurent dans les forêts purifiées, et les rivières retrouvèrent leur cours limpide. Elara n'était plus seulement l'orpheline de Sombreval ; elle était la "Tisseuse de Lumière", la "Héroïne du Berceau Oublié". Mais loin de se prélasser dans sa gloire, elle savait que son véritable travail commençait tout juste. La lumière avait été rallumée, mais il fallait désormais la nourrir, la protéger, et enseigner à d'autres comment la porter.</p>
            <p>Accompagnée de ses fidèles compagnons rencontrés en chemin, elle entreprit de reconstruire, d'enseigner, et d'inspirer. Elle créa une nouvelle génération de Gardiens, non pas par le sang, mais par le cœur et l'engagement. Chaque lever de soleil était un rappel de la promesse tenue, de la lumière qui avait été ravivée. Elara regardait le monde, baigné par l'aube nouvelle, un sourire serein sur les lèvres. Son voyage avait été épique, rempli de périls et de découvertes, mais la plus grande révélation était celle de sa propre force, et de la voie du salut qu'elle avait tracée, non seulement pour le monde, mais pour elle-même. La paix n'était pas une fin, mais un nouveau départ, une symphonie sans fin de lumière et d'espoir.</p>
        `;
        chapter.text.en = `
            <p>The final confrontation with the Darkness was fierce, but Elara, armed with the wisdom of the Ancients, the power of the Guardians of Light, and the strength of her own heart, triumphed. The golden light she mastered flooded the world, pushing back the shadows that had long stifled it. The symbols on her locket shone with an intense brilliance, synchronizing with the very heart of the world, restoring the lost balance.</p>
            <p>Kingdoms once divided by fear extended hands to each other. Mythical creatures reappeared in the purified forests, and rivers regained their clear flow. Elara was no longer just the orphan from Shadowdale; she was the "Light Weaver," the "Heroine of the Forgotten Cradle." But far from basking in her glory, she knew her true work was just beginning. The light had been rekindled, but now it needed to be nurtured, protected, and others needed to be taught how to carry it.</p>
            <p>Accompanied by her loyal companions met along the way, she undertook to rebuild, teach, and inspire. She created a new generation of Guardians, not by blood, but by heart and commitment. Each sunrise was a reminder of the promise kept, of the light that had been revived. Elara looked at the world, bathed in the new dawn, a serene smile on her lips. Her journey had been epic, filled with perils and discoveries, but the greatest revelation was that of her own strength, and the path to salvation she had forged, not only for the world, but for herself. Peace was not an end, but a new beginning, an endless symphony of light and hope.</p>
        `;
        chapter.text.ar = `
            <p>المواجهة النهائية مع الظلام كانت شرسة، لكن إيلارا، المسلحة بحكمة القدماء، وقوة حراس النور، وقوة قلبها، انتصرت. النور الذهبي الذي أتقنته غمر العالم، دافعًا الظلال التي خنقته طويلاً. تألقت الرموز على قلادتها ببريق شديد، متزامنة مع قلب العالم نفسه، مستعيدة التوازن المفقود.</p>
            <p>تمددت الممالك التي كانت منقسمة بالخوف أياديها لبعضها البعض. عادت المخلوقات الأسطورية للظهور في الغابات المطهرة، واستعادت الأنهار جريانها النقي. لم تعد إيلارا مجرد يتيمة وادي الظل؛ لقد كانت "ناسجة النور"، "بطلة المهد المنسي". ولكن بعيدًا عن الاستمتاع بمجدها، علمت أن عملها الحقيقي قد بدأ للتو. لقد أُعيد إشعال النور، ولكن كان يجب الآن تغذيته وحمايته وتعليم الآخرين كيفية حمله.</p>
            <p>مرافقةً رفقائها الأوفياء الذين التقت بهم في الطريق، بدأت في إعادة البناء والتعليم والإلهام. أنشأت جيلًا جديدًا من الحراس، ليس بالدم، بل بالقلب والالتزام. كان كل شروق شمس تذكيرًا بالوعد المحقق، بالنور الذي أُعيد إحياؤه. نظرت إيلارا إلى العالم، مغمورًا بالفجر الجديد، بابتسامة هادئة على شفتيها. كانت رحلتها ملحمية، مليئة بالمخاطر والاكتشافات، لكن أعظم كشف كان عن قوتها الذاتية، والطريق إلى الخلاص الذي رسمته، ليس فقط للعالم، بل لنفسها. السلام لم يكن نهاية، بل بداية جديدة، سيمفونية لا نهاية لها من النور والأمل.</p>
        `;
    }
    content.chapters.push(chapter);
}
