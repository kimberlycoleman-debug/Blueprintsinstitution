-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 016 — Lesson Scriptures: Q1 + Q2 (L001–L024)
-- =====================================================
-- is_primary: true for the primary anchor scripture, false for supporting
-- sequence: 1 = primary, 2+ = supporting
-- translation: default NIV unless otherwise noted
-- =====================================================

-- =====================================================
-- L001 — Identity: Who You Are in the Kingdom
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '2 Corinthians 5:17',
  'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!',
  'NIV', 1
from lessons l where l.lesson_code = 'L001';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Ephesians 1:4–5',
  'For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ, in accordance with his pleasure and will.',
  'NIV', 2
from lessons l where l.lesson_code = 'L001';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Peter 2:9',
  'But you are a chosen people, a royal priesthood, a holy nation, God''s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.',
  'NIV', 3
from lessons l where l.lesson_code = 'L001';

-- =====================================================
-- L002 — Authority: What You Carry
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Luke 10:19',
  'I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.',
  'NIV', 1
from lessons l where l.lesson_code = 'L002';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 28:18',
  'Then Jesus came to them and said, "All authority in heaven and on earth has been given to me."',
  'NIV', 2
from lessons l where l.lesson_code = 'L002';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Ephesians 2:6',
  'And God raised us up with Christ and seated us with him in the heavenly realms in Christ Jesus.',
  'NIV', 3
from lessons l where l.lesson_code = 'L002';

-- =====================================================
-- L003 — Calling: What You're Assigned To
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Jeremiah 1:5',
  'Before I formed you in the womb I knew you, before you were born I set you apart; I appointed you as a prophet to the nations.',
  'NIV', 1
from lessons l where l.lesson_code = 'L003';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Ephesians 2:10',
  'For we are God''s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.',
  'NIV', 2
from lessons l where l.lesson_code = 'L003';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 8:28',
  'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  'NIV', 3
from lessons l where l.lesson_code = 'L003';

-- =====================================================
-- L004 — Alignment: Bringing Your Life Into Agreement
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Romans 12:2',
  'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God''s will is—his good, pleasing and perfect will.',
  'NIV', 1
from lessons l where l.lesson_code = 'L004';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Proverbs 3:5–6',
  'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
  'NIV', 2
from lessons l where l.lesson_code = 'L004';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 6:33',
  'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
  'NIV', 3
from lessons l where l.lesson_code = 'L004';

-- =====================================================
-- L005 — Understanding Seasons
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Ecclesiastes 3:1',
  'There is a time for everything, and a season for every activity under the heavens.',
  'NIV', 1
from lessons l where l.lesson_code = 'L005';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Galatians 6:9',
  'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.',
  'NIV', 2
from lessons l where l.lesson_code = 'L005';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 40:31',
  'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
  'NIV', 3
from lessons l where l.lesson_code = 'L005';

-- =====================================================
-- L006 — Discerning Timing
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '1 Chronicles 12:32',
  'From Issachar, men who understood the times and knew what Israel should do—200 chiefs, with all their relatives under their command.',
  'NIV', 1
from lessons l where l.lesson_code = 'L006';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Proverbs 4:7',
  'The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.',
  'NIV', 2
from lessons l where l.lesson_code = 'L006';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 30:21',
  'Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, "This is the way; walk in it."',
  'NIV', 3
from lessons l where l.lesson_code = 'L006';

-- =====================================================
-- L007 — Pace, Rest, and Capacity
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Matthew 11:28–29',
  'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.',
  'NIV', 1
from lessons l where l.lesson_code = 'L007';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Exodus 20:8',
  'Remember the Sabbath day by keeping it holy.',
  'NIV', 2
from lessons l where l.lesson_code = 'L007';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Mark 6:31',
  'Then, because so many people were coming and going that they did not even have a chance to eat, he said to them, "Come with me by yourselves to a quiet place and get some rest."',
  'NIV', 3
from lessons l where l.lesson_code = 'L007';

-- =====================================================
-- L008 — Walking in Step With the Spirit
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Galatians 5:25',
  'Since we live by the Spirit, let us keep in step with the Spirit.',
  'NIV', 1
from lessons l where l.lesson_code = 'L008';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 8:14',
  'For those who are led by the Spirit of God are the children of God.',
  'NIV', 2
from lessons l where l.lesson_code = 'L008';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 16:13',
  'But when he, the Spirit of truth, comes, he will guide you into all the truth. He will not speak on his own; he will speak only what he hears, and he will tell you what is yet to come.',
  'NIV', 3
from lessons l where l.lesson_code = 'L008';

-- =====================================================
-- L009 — Hearing God Clearly
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'John 10:27',
  'My sheep listen to my voice; I know them, and they follow me.',
  'NIV', 1
from lessons l where l.lesson_code = 'L009';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Samuel 3:10',
  'The Lord came and stood there, calling as at the other times, "Samuel! Samuel!" Then Samuel said, "Speak, for your servant is listening."',
  'NIV', 2
from lessons l where l.lesson_code = 'L009';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'James 1:5',
  'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.',
  'NIV', 3
from lessons l where l.lesson_code = 'L009';

-- =====================================================
-- L010 — Interpreting Revelation
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Proverbs 25:2',
  'It is the glory of God to conceal a matter; to search out a matter is the glory of kings.',
  'NIV', 1
from lessons l where l.lesson_code = 'L010';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Corinthians 2:12',
  'What we have received is not the spirit of the world, but the Spirit who is from God, so that we may understand what God has freely given us.',
  'NIV', 2
from lessons l where l.lesson_code = 'L010';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Daniel 2:22',
  'He reveals deep and hidden things; he knows what lies in darkness, and light dwells with him.',
  'NIV', 3
from lessons l where l.lesson_code = 'L010';

-- =====================================================
-- L011 — Testing Revelation
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '1 John 4:1',
  'Dear friends, do not believe every spirit, but test the spirits to see whether they are from God, because many false prophets have gone out into the world.',
  'NIV', 1
from lessons l where l.lesson_code = 'L011';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Thessalonians 5:19–22',
  'Do not quench the Spirit. Do not treat prophecies with contempt but test them all; hold on to what is good, reject every kind of evil.',
  'NIV', 2
from lessons l where l.lesson_code = 'L011';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 8:20',
  'Consult God''s instruction and the testimony of warning. If anyone does not speak according to this word, they have no light of dawn.',
  'NIV', 3
from lessons l where l.lesson_code = 'L011';

-- =====================================================
-- L012 — Applying Revelation to Daily Life
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'James 1:22',
  'Do not merely listen to the word, and so deceive yourselves. Do what it says.',
  'NIV', 1
from lessons l where l.lesson_code = 'L012';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 14:23',
  'Jesus replied, "Anyone who loves me will obey my teaching. My Father will love them, and we will come to them and make our home with them."',
  'NIV', 2
from lessons l where l.lesson_code = 'L012';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Luke 6:46',
  'Why do you call me, "Lord, Lord," and do not do what I say?',
  'NIV', 3
from lessons l where l.lesson_code = 'L012';

-- =====================================================
-- L013 — Healing the Heart
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Psalm 147:3',
  'He heals the brokenhearted and binds up their wounds.',
  'NIV', 1
from lessons l where l.lesson_code = 'L013';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 61:1',
  'The Spirit of the Sovereign Lord is on me, because the Lord has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners.',
  'NIV', 2
from lessons l where l.lesson_code = 'L013';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Luke 4:18',
  'The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free.',
  'NIV', 3
from lessons l where l.lesson_code = 'L013';

-- =====================================================
-- L014 — Breaking Agreements & Lies
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '2 Corinthians 10:4–5',
  'The weapons we fight with are not the weapons of the world. On the contrary, they have divine power to demolish strongholds. We demolish arguments and every pretension that sets itself up against the knowledge of God, and we take captive every thought to make it obedient to Christ.',
  'NIV', 1
from lessons l where l.lesson_code = 'L014';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 8:32',
  'Then you will know the truth, and the truth will set you free.',
  'NIV', 2
from lessons l where l.lesson_code = 'L014';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 12:2',
  'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God''s will is—his good, pleasing and perfect will.',
  'NIV', 3
from lessons l where l.lesson_code = 'L014';

-- =====================================================
-- L015 — Forgiveness & Release
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Ephesians 4:31–32',
  'Get rid of all bitterness, rage and anger, brawling and slander, along with every form of malice. Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.',
  'NIV', 1
from lessons l where l.lesson_code = 'L015';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Matthew 18:21–22',
  'Then Peter came to Jesus and asked, "Lord, how many times shall I forgive my brother or sister who sins against me? Up to seven times?" Jesus answered, "I tell you, not seven times, but seventy-seven times."',
  'NIV', 2
from lessons l where l.lesson_code = 'L015';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Colossians 3:13',
  'Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.',
  'NIV', 3
from lessons l where l.lesson_code = 'L015';

-- =====================================================
-- L016 — Restoring Identity After Wounding
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Joel 2:25',
  'I will repay you for the years the locusts have eaten—the great locust and the locust swarm—the other locusts and the locust horde—my great army that I sent among you.',
  'NIV', 1
from lessons l where l.lesson_code = 'L016';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 61:3',
  'And provide for those who grieve in Zion—to bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair.',
  'NIV', 2
from lessons l where l.lesson_code = 'L016';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Psalm 23:3',
  'He refreshes my soul. He guides me along the right paths for his name''s sake.',
  'NIV', 3
from lessons l where l.lesson_code = 'L016';

-- =====================================================
-- L017 — Foundations of Spiritual Growth
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, '2 Peter 3:18',
  'But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen.',
  'NIV', 1
from lessons l where l.lesson_code = 'L017';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Philippians 1:6',
  'Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.',
  'NIV', 2
from lessons l where l.lesson_code = 'L017';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Hebrews 5:14',
  'But solid food is for the mature, who by constant use have trained themselves to distinguish good from evil.',
  'NIV', 3
from lessons l where l.lesson_code = 'L017';

-- =====================================================
-- L018 — Discernment & Wisdom
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'James 3:17',
  'But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.',
  'NIV', 1
from lessons l where l.lesson_code = 'L018';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 John 4:1',
  'Dear friends, do not believe every spirit, but test the spirits to see whether they are from God, because many false prophets have gone out into the world.',
  'NIV', 2
from lessons l where l.lesson_code = 'L018';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Hebrews 4:12',
  'For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.',
  'NIV', 3
from lessons l where l.lesson_code = 'L018';

-- =====================================================
-- L019 — Obedience as Formation
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'John 14:15',
  'If you love me, keep my commands.',
  'NIV', 1
from lessons l where l.lesson_code = 'L019';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Samuel 15:22',
  'But Samuel replied: "Does the Lord delight in burnt offerings and sacrifices as much as in obeying the Lord? To obey is better than sacrifice, and to heed is better than the fat of rams."',
  'NIV', 2
from lessons l where l.lesson_code = 'L019';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 5:19',
  'For just as through the disobedience of the one man the many were made sinners, so also through the obedience of the one man the many will be made righteous.',
  'NIV', 3
from lessons l where l.lesson_code = 'L019';

-- =====================================================
-- L020 — Developing Spiritual Strength
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Ephesians 6:10',
  'Finally, be strong in the Lord and in his mighty power.',
  'NIV', 1
from lessons l where l.lesson_code = 'L020';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'James 1:2–4',
  'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.',
  'NIV', 2
from lessons l where l.lesson_code = 'L020';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 40:29',
  'He gives strength to the weary and increases the power of the weak.',
  'NIV', 3
from lessons l where l.lesson_code = 'L020';

-- =====================================================
-- L021 — Emotional Awareness
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Psalm 139:23–24',
  'Search me, God, and know my heart; test me and know my anxious thoughts. See if there is any offensive way in me, and lead me in the way everlasting.',
  'NIV', 1
from lessons l where l.lesson_code = 'L021';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Proverbs 4:23',
  'Above all else, guard your heart, for everything you do flows from it.',
  'NIV', 2
from lessons l where l.lesson_code = 'L021';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'John 11:35',
  'Jesus wept.',
  'NIV', 3
from lessons l where l.lesson_code = 'L021';

-- =====================================================
-- L022 — Regulating Internal States
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Philippians 4:6–7',
  'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
  'NIV', 1
from lessons l where l.lesson_code = 'L022';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Isaiah 26:3',
  'You will keep in perfect peace those whose minds are steadfast, because they trust in you.',
  'NIV', 2
from lessons l where l.lesson_code = 'L022';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Psalm 46:10',
  'He says, "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."',
  'NIV', 3
from lessons l where l.lesson_code = 'L022';

-- =====================================================
-- L023 — Healthy Boundaries
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Matthew 5:37',
  'All you need to say is simply "Yes" or "No"; anything beyond this comes from the evil one.',
  'NIV', 1
from lessons l where l.lesson_code = 'L023';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Galatians 6:5',
  'For each one should carry their own load.',
  'NIV', 2
from lessons l where l.lesson_code = 'L023';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Proverbs 4:23',
  'Above all else, guard your heart, for everything you do flows from it.',
  'NIV', 3
from lessons l where l.lesson_code = 'L023';

-- =====================================================
-- L024 — Relational Maturity
-- =====================================================
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, true, 'Ephesians 4:15',
  'Instead, speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ.',
  'NIV', 1
from lessons l where l.lesson_code = 'L024';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, 'Romans 12:18',
  'If it is possible, as far as it depends on you, live at peace with everyone.',
  'NIV', 2
from lessons l where l.lesson_code = 'L024';
insert into lesson_scriptures (lesson_id, is_primary, reference, full_text, translation, sequence)
select l.id, false, '1 Corinthians 13:11',
  'When I was a child, I talked like a child, I thought like a child, I reasoned like a child. When I became a man, I put the ways of childhood behind me.',
  'NIV', 3
from lessons l where l.lesson_code = 'L024';
