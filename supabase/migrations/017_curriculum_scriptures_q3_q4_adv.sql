-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 017 — Lesson Scriptures: Q3 + Q4 + Advanced (L025–L052)
-- =====================================================

-- =====================================================
-- L025 — Prayer & Intimacy with God
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Matthew 6:6',
  'But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you.',
  'NIV', 1
from lessons l where l.lesson_code = 'L025';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Jeremiah 33:3',
  'Call to me and I will answer you and tell you great and unsearchable things you do not know.',
  'NIV', 2
from lessons l where l.lesson_code = 'L025';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Thessalonians 5:17',
  'Pray continually.',
  'NIV', 3
from lessons l where l.lesson_code = 'L025';

-- =====================================================
-- L026 — Scripture Meditation & Study
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Joshua 1:8',
  'Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.',
  'NIV', 1
from lessons l where l.lesson_code = 'L026';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Psalm 119:105',
  'Your word is a lamp for my feet, a light on my path.',
  'NIV', 2
from lessons l where l.lesson_code = 'L026';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '2 Timothy 3:16–17',
  'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.',
  'NIV', 3
from lessons l where l.lesson_code = 'L026';

-- =====================================================
-- L027 — Fasting & Spiritual Hunger
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Isaiah 58:6',
  'Is not this the kind of fasting I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke?',
  'NIV', 1
from lessons l where l.lesson_code = 'L027';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 6:17–18',
  'But when you fast, put oil on your head and wash your face, so that it will not be obvious to others that you are fasting, but only to your Father, who is unseen; and your Father, who sees what is done in secret, will reward you.',
  'NIV', 2
from lessons l where l.lesson_code = 'L027';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Joel 2:12',
  '"Even now," declares the Lord, "return to me with all your heart, with fasting and weeping and mourning."',
  'NIV', 3
from lessons l where l.lesson_code = 'L027';

-- =====================================================
-- L028 — Worship & Spiritual Rhythms
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Romans 12:1',
  'Therefore, I urge you, brothers and sisters, in view of God''s mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship.',
  'NIV', 1
from lessons l where l.lesson_code = 'L028';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 4:23–24',
  'Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks. God is spirit, and his worshipers must worship in the Spirit and in truth.',
  'NIV', 2
from lessons l where l.lesson_code = 'L028';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Psalm 29:2',
  'Ascribe to the Lord the glory due his name; worship the Lord in the splendor of his holiness.',
  'NIV', 3
from lessons l where l.lesson_code = 'L028';

-- =====================================================
-- L029 — Discovering Your Calling
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Romans 8:30',
  'And those he predestined, he also called; those he called, he also justified; those he justified, he also glorified.',
  'NIV', 1
from lessons l where l.lesson_code = 'L029';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Ephesians 4:1',
  'As a prisoner for the Lord, then, I urge you to live a life worthy of the calling you have received.',
  'NIV', 2
from lessons l where l.lesson_code = 'L029';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '2 Timothy 1:9',
  'He has saved us and called us to a holy life—not because of anything we have done but because of his own purpose and grace. This grace was given us in Christ Jesus before the beginning of time.',
  'NIV', 3
from lessons l where l.lesson_code = 'L029';

-- =====================================================
-- L030 — Gifts & Strengths Assessment
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Romans 12:6–8',
  'We have different gifts, according to the grace given to each of us. If your gift is prophesying, then prophesy in accordance with your faith; if it is serving, then serve; if it is teaching, then teach; if it is to encourage, then give encouragement; if it is giving, then give generously; if it is to lead, do it diligently; if it is to show mercy, do it cheerfully.',
  'NIV', 1
from lessons l where l.lesson_code = 'L030';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Corinthians 12:7',
  'Now to each one the manifestation of the Spirit is given for the common good.',
  'NIV', 2
from lessons l where l.lesson_code = 'L030';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Peter 4:10',
  'Each of you should use whatever gift you have received to serve others, as faithful stewards of God''s grace in its various forms.',
  'NIV', 3
from lessons l where l.lesson_code = 'L030';

-- =====================================================
-- L031 — Overcoming Obstacles to Purpose
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Philippians 4:13',
  'I can do all this through him who gives me strength.',
  'NIV', 1
from lessons l where l.lesson_code = 'L031';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 8:37',
  'No, in all these things we are more than conquerors through him who loved us.',
  'NIV', 2
from lessons l where l.lesson_code = 'L031';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '2 Timothy 1:7',
  'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
  'NIV', 3
from lessons l where l.lesson_code = 'L031';

-- =====================================================
-- L032 — Activating Your Mission
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Acts 20:24',
  'However, I consider my life worth nothing to me; my only aim is to finish the race and complete the task the Lord Jesus has given me—the task of testifying to the good news of God''s grace.',
  'NIV', 1
from lessons l where l.lesson_code = 'L032';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Nehemiah 2:18',
  'I also told them about the gracious hand of my God on me and what the king had said to me. They replied, "Let us start rebuilding." So they began this good work.',
  'NIV', 2
from lessons l where l.lesson_code = 'L032';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'James 2:17',
  'In the same way, faith by itself, if it is not accompanied by action, is dead.',
  'NIV', 3
from lessons l where l.lesson_code = 'L032';

-- =====================================================
-- L033 — Leading Yourself
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Proverbs 16:32',
  'Better a patient person than a warrior, one with self-control than one who takes a city.',
  'NIV', 1
from lessons l where l.lesson_code = 'L033';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Corinthians 9:27',
  'No, I strike a blow to my body and make it my slave so that after I have preached to others, I myself will not be disqualified for the prize.',
  'NIV', 2
from lessons l where l.lesson_code = 'L033';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Luke 16:10',
  'Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much.',
  'NIV', 3
from lessons l where l.lesson_code = 'L033';

-- =====================================================
-- L034 — Leading Others
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Ephesians 4:11–12',
  'So Christ himself gave the apostles, the prophets, the evangelists, the pastors and teachers, to equip his people for works of service, so that the body of Christ may be built up.',
  'NIV', 1
from lessons l where l.lesson_code = 'L034';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Proverbs 11:14',
  'For lack of guidance a nation falls, but victory is won through many advisers.',
  'NIV', 2
from lessons l where l.lesson_code = 'L034';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Exodus 18:21',
  'But select capable men from all the people—men who fear God, trustworthy men who hate dishonest gain—and appoint them as officials over thousands, hundreds, fifties and tens.',
  'NIV', 3
from lessons l where l.lesson_code = 'L034';

-- =====================================================
-- L035 — Influence & Responsibility
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Luke 12:48',
  'But the one who does not know and does things deserving punishment will be beaten with few blows. From everyone who has been given much, much will be demanded; and from the one who has been entrusted with much, much more will be asked.',
  'NIV', 1
from lessons l where l.lesson_code = 'L035';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 5:16',
  'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
  'NIV', 2
from lessons l where l.lesson_code = 'L035';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Ezekiel 34:2',
  'Son of man, prophesy against the shepherds of Israel; prophesy and say to them: "This is what the Sovereign Lord says: Woe to you shepherds of Israel who only take care of yourselves! Should not shepherds take care of the flock?"',
  'NIV', 3
from lessons l where l.lesson_code = 'L035';

-- =====================================================
-- L036 — Servant Leadership
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Mark 10:43–45',
  'Not so with you. Instead, whoever wants to become great among you must be your servant, and whoever wants to be first must be slave of all. For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.',
  'NIV', 1
from lessons l where l.lesson_code = 'L036';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 13:14–15',
  'Now that I, your Lord and Teacher, have washed your feet, you also should wash one another''s feet. I have set you an example that you should do as I have done for you.',
  'NIV', 2
from lessons l where l.lesson_code = 'L036';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Philippians 2:3–4',
  'Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others.',
  'NIV', 3
from lessons l where l.lesson_code = 'L036';

-- =====================================================
-- L037 — Understanding Your Assignment
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Esther 4:14',
  'For if you remain silent at this time, relief and deliverance for the Jews will arise from another place, but you and your father''s family will perish. And who knows but that you have come to your royal position for such a time as this?',
  'NIV', 1
from lessons l where l.lesson_code = 'L037';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Acts 13:36',
  'Now when David had served God''s purpose in his own generation, he fell asleep; he was buried with his ancestors and his body decayed.',
  'NIV', 2
from lessons l where l.lesson_code = 'L037';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Nehemiah 6:3',
  'I am carrying on a great project and cannot go down. Why should the work stop while I leave it and go down to you?',
  'NIV', 3
from lessons l where l.lesson_code = 'L037';

-- =====================================================
-- L038 — Vision & Direction
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Habakkuk 2:2–3',
  'Then the Lord replied: "Write down the revelation and make it plain on tablets so that a herald may run with it. For the revelation awaits an appointed time; it speaks of the end and will not prove false. Though it linger, wait for it; it will certainly come and will not delay."',
  'NIV', 1
from lessons l where l.lesson_code = 'L038';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Proverbs 29:18',
  'Where there is no revelation, people cast off restraint; but blessed is the one who heeds wisdom''s instruction.',
  'NIV', 2
from lessons l where l.lesson_code = 'L038';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 46:10',
  'I make known the end from the beginning, from ancient times, what is still to come. I say, "My purpose will stand, and I will do all that I please."',
  'NIV', 3
from lessons l where l.lesson_code = 'L038';

-- =====================================================
-- L039 — Faith & Risk
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Hebrews 11:1',
  'Now faith is confidence in what we hope for and assurance about what we do not see.',
  'NIV', 1
from lessons l where l.lesson_code = 'L039';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 14:29',
  '"Come," he said. Then Peter got down out of the boat, walked on the water and came toward Jesus.',
  'NIV', 2
from lessons l where l.lesson_code = 'L039';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Hebrews 11:8',
  'By faith Abraham, when called to go to a place he would later receive as his inheritance, obeyed and went, even though he did not know where he was going.',
  'NIV', 3
from lessons l where l.lesson_code = 'L039';

-- =====================================================
-- L040 — Courage & Obedience
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Joshua 1:9',
  'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
  'NIV', 1
from lessons l where l.lesson_code = 'L040';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Acts 5:29',
  'Peter and the other apostles replied: "We must obey God rather than human beings!"',
  'NIV', 2
from lessons l where l.lesson_code = 'L040';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 41:10',
  'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
  'NIV', 3
from lessons l where l.lesson_code = 'L040';

-- =====================================================
-- L041 — Serving with Honor
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Colossians 3:23–24',
  'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward. It is the Lord Christ you are serving.',
  'NIV', 1
from lessons l where l.lesson_code = 'L041';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 25:21',
  'His master replied, "Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master''s happiness!"',
  'NIV', 2
from lessons l where l.lesson_code = 'L041';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Zechariah 4:10',
  'Who dares despise the day of small things, since the seven eyes of the Lord that range throughout the earth will rejoice when they see the chosen capstone in the hand of Zerubbabel?',
  'NIV', 3
from lessons l where l.lesson_code = 'L041';

-- =====================================================
-- L042 — Spiritual Gifts in Operation
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '1 Corinthians 12:4–6',
  'There are different kinds of gifts, but the same Spirit distributes them. There are different kinds of service, but the same Lord. There are different kinds of working, but in all of them and in everyone it is the same God at work.',
  'NIV', 1
from lessons l where l.lesson_code = 'L042';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Corinthians 14:12',
  'So it is with you. Since you are eager for gifts of the Spirit, try to excel in those that build up the church.',
  'NIV', 2
from lessons l where l.lesson_code = 'L042';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 12:4–5',
  'For just as each of us has one body with many members, and these members do not all have the same function, so in Christ we, though many, form one body, and each member belongs to all the others.',
  'NIV', 3
from lessons l where l.lesson_code = 'L042';

-- =====================================================
-- L043 — Impact & Fruitfulness
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'John 15:16',
  'You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last—and so that whatever you ask in my name the Father will give you.',
  'NIV', 1
from lessons l where l.lesson_code = 'L043';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 15:5',
  'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.',
  'NIV', 2
from lessons l where l.lesson_code = 'L043';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 7:20',
  'Thus, by their fruit you will recognize them.',
  'NIV', 3
from lessons l where l.lesson_code = 'L043';

-- =====================================================
-- L044 — Ministry as Overflow
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'John 7:38',
  'Whoever believes in me, as Scripture has said, rivers of living water will flow from within them.',
  'NIV', 1
from lessons l where l.lesson_code = 'L044';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Mark 6:31',
  'Then, because so many people were coming and going that they did not even have a chance to eat, he said to them, "Come with me by yourselves to a quiet place and get some rest."',
  'NIV', 2
from lessons l where l.lesson_code = 'L044';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '2 Corinthians 1:4',
  'Who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.',
  'NIV', 3
from lessons l where l.lesson_code = 'L044';

-- =====================================================
-- L045 — Kingdom Calling
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Matthew 28:19–20',
  'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.',
  'NIV', 1
from lessons l where l.lesson_code = 'L045';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Colossians 3:17',
  'And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.',
  'NIV', 2
from lessons l where l.lesson_code = 'L045';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Corinthians 10:31',
  'So whether you eat or drink or whatever you do, do it all for the glory of God.',
  'NIV', 3
from lessons l where l.lesson_code = 'L045';

-- =====================================================
-- L046 — Multiplication Mindset
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '2 Timothy 2:2',
  'And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others.',
  'NIV', 1
from lessons l where l.lesson_code = 'L046';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 13:23',
  'But the seed falling on good soil refers to someone who hears the word and understands it. This is the one who produces a crop, yielding a hundred, sixty or thirty times what was sown.',
  'NIV', 2
from lessons l where l.lesson_code = 'L046';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 17:20',
  'My prayer is not for them alone. I pray also for those who will believe in me through their message.',
  'NIV', 3
from lessons l where l.lesson_code = 'L046';

-- =====================================================
-- L047 — Building a Lasting Legacy
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Psalm 78:4',
  'We will not hide them from their descendants; we will tell the next generation the praiseworthy deeds of the Lord, his power, and the wonders he has done.',
  'NIV', 1
from lessons l where l.lesson_code = 'L047';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Proverbs 13:22',
  'A good person leaves an inheritance for their children''s children, but a sinner''s wealth is stored up for the righteous.',
  'NIV', 2
from lessons l where l.lesson_code = 'L047';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Hebrews 11:39–40',
  'These were all commended for their faith, yet none of them received what had been promised, since God had planned something better for us so that only together with us would they be made perfect.',
  'NIV', 3
from lessons l where l.lesson_code = 'L047';

-- =====================================================
-- L048 — Finishing Well
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '2 Timothy 4:7',
  'I have fought the good fight, I have finished the race, I have kept the faith.',
  'NIV', 1
from lessons l where l.lesson_code = 'L048';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Hebrews 12:1–2',
  'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith.',
  'NIV', 2
from lessons l where l.lesson_code = 'L048';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Revelation 2:10',
  'Do not be afraid of what you are about to suffer. I tell you, the devil will put some of you in prison to test you, and you will suffer persecution for ten days. Be faithful, even to the point of death, and I will give you life as your victor''s crown.',
  'NIV', 3
from lessons l where l.lesson_code = 'L048';

-- =====================================================
-- L049 — The Stone Rolled Away — The Barrier Removed
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Matthew 28:2',
  'There was a violent earthquake, for an angel of the Lord came down from heaven and, going to the tomb, rolled back the stone and sat on it.',
  'NIV', 1
from lessons l where l.lesson_code = 'L049';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 43:19',
  'See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.',
  'NIV', 2
from lessons l where l.lesson_code = 'L049';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Revelation 3:8',
  'I know your deeds. See, I have placed before you an open door that no one can shut. I know that you have little strength, yet you have kept my word and have not denied my name.',
  'NIV', 3
from lessons l where l.lesson_code = 'L049';

-- =====================================================
-- L050 — The Guards Couldn't Contain Him — The Old System Lost Jurisdiction
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Colossians 2:15',
  'And having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them by the cross.',
  'NIV', 1
from lessons l where l.lesson_code = 'L050';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 6:14',
  'For sin shall no longer be your master, because you are not under the law, but under grace.',
  'NIV', 2
from lessons l where l.lesson_code = 'L050';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Galatians 5:1',
  'It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.',
  'NIV', 3
from lessons l where l.lesson_code = 'L050';

-- =====================================================
-- L051 — The Grave Couldn't Hold Him — The Environment Was Too Small
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Acts 2:24',
  'But God raised him from the dead, freeing him from the agony of death, because it was impossible for death to keep its hold on him.',
  'NIV', 1
from lessons l where l.lesson_code = 'L051';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 54:2–3',
  'Enlarge the place of your tent, stretch your tent curtains wide, do not hold back; lengthen your cords, strengthen your stakes. For you will spread out to the right and to the left; your descendants will dispossess nations and settle in their desolate cities.',
  'NIV', 2
from lessons l where l.lesson_code = 'L051';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Genesis 26:22',
  'He moved on from there and dug another well, and no one quarreled over it. He named it Rehoboth, saying, "Now the Lord has given us room and we will flourish in the land."',
  'NIV', 3
from lessons l where l.lesson_code = 'L051';

-- =====================================================
-- L052 — The Grave Clothes Left Behind — The Old Identity Is Finished
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'John 20:6–7',
  'Then Simon Peter came along behind him and went straight into the tomb. He saw the strips of linen lying there, as well as the cloth that had been wrapped around Jesus'' head. The cloth was still lying in its place, separate from the linen.',
  'NIV', 1
from lessons l where l.lesson_code = 'L052';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 43:18–19',
  'Forget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.',
  'NIV', 2
from lessons l where l.lesson_code = 'L052';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Ephesians 4:22–24',
  'You were taught, with regard to your former way of life, to put off your old self, which is being corrupted by its deceitful desires; to be made new in the attitude of your minds; and to put on the new self, created to be like God in true righteousness and holiness.',
  'NIV', 3
from lessons l where l.lesson_code = 'L052';
