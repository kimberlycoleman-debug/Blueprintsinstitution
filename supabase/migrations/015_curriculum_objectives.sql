-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 015 — Lesson Objectives (All 52 Lessons)
-- =====================================================
-- 5 objectives per lesson, keyed by lesson_code
-- bloom_verb: Identify | Understand | Distinguish | Articulate | Apply | Create | Experience | Practice | Recognize | Demonstrate | Examine | Declare
-- =====================================================

-- =====================================================
-- L001 — Identity: Who You Are in the Kingdom
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Distinguish between performance-based identity and kingdom identity as a gift from God in Christ', 'Distinguish'
from lessons l where l.lesson_code = 'L001';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least three scriptural truths that define who they are in Christ', 'Identify'
from lessons l where l.lesson_code = 'L001';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Articulate the difference between identity (who you are) and assignment (what you do)', 'Articulate'
from lessons l where l.lesson_code = 'L001';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Examine one personal belief that contradicts kingdom identity and begin renouncing it', 'Examine'
from lessons l where l.lesson_code = 'L001';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Declare their kingdom identity aloud using at least five Scripture-based declarations', 'Declare'
from lessons l where l.lesson_code = 'L001';

-- =====================================================
-- L002 — Authority: What You Carry
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the biblical basis for spiritual authority given to believers as kingdom citizens', 'Understand'
from lessons l where l.lesson_code = 'L002';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Distinguish between authority derived from identity in Christ and authority sought through achievement', 'Distinguish'
from lessons l where l.lesson_code = 'L002';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Identify areas of life where they have been operating beneath their delegated kingdom authority', 'Identify'
from lessons l where l.lesson_code = 'L002';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply kingdom authority principles to at least one area of spiritual warfare or intercession', 'Apply'
from lessons l where l.lesson_code = 'L002';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Demonstrate understanding of how authority and accountability are inseparably connected', 'Demonstrate'
from lessons l where l.lesson_code = 'L002';

-- =====================================================
-- L003 — Calling: What You're Assigned To
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Distinguish between calling (who you are becoming) and assignment (what you are sent to do)', 'Distinguish'
from lessons l where l.lesson_code = 'L003';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least two indicators that confirm their specific kingdom calling', 'Identify'
from lessons l where l.lesson_code = 'L003';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Understand that calling is a gift from God, not something earned or achieved', 'Understand'
from lessons l where l.lesson_code = 'L003';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Articulate the relationship between their kingdom identity (L001) and their calling', 'Articulate'
from lessons l where l.lesson_code = 'L003';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a personal calling statement that flows from identity, not performance', 'Create'
from lessons l where l.lesson_code = 'L003';

-- =====================================================
-- L004 — Alignment: Bringing Your Life Into Agreement
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand alignment as the process of bringing every area of life into agreement with kingdom identity', 'Understand'
from lessons l where l.lesson_code = 'L004';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least three areas in their life that are currently out of alignment with their kingdom identity and calling', 'Identify'
from lessons l where l.lesson_code = 'L004';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between alignment that is externally enforced and alignment that flows from transformed identity', 'Distinguish'
from lessons l where l.lesson_code = 'L004';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply specific alignment strategies to at least one relationship, habit, or commitment', 'Apply'
from lessons l where l.lesson_code = 'L004';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a personal 30-day alignment plan that moves from revelation to practical life application', 'Create'
from lessons l where l.lesson_code = 'L004';

-- =====================================================
-- L005 — Understanding Seasons
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Identify the primary spiritual seasons in Scripture—planting, growing, pruning, waiting, and harvest', 'Identify'
from lessons l where l.lesson_code = 'L005';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Recognize the current spiritual season they are in and describe its biblical characteristics', 'Recognize'
from lessons l where l.lesson_code = 'L005';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Understand that each season is ordained by God and serves a specific formational purpose', 'Understand'
from lessons l where l.lesson_code = 'L005';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Distinguish between a season of delay and a season of preparation', 'Distinguish'
from lessons l where l.lesson_code = 'L005';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Apply season discernment to one specific area of their life where they have been frustrated or confused', 'Apply'
from lessons l where l.lesson_code = 'L005';

-- =====================================================
-- L006 — Discerning Timing
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Identify at least four biblical indicators of divine timing—peace, open doors, confirmation, alignment', 'Identify'
from lessons l where l.lesson_code = 'L006';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Distinguish between moving ahead of God and Spirit-led bold action', 'Distinguish'
from lessons l where l.lesson_code = 'L006';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize patterns in their own decision-making where timing errors have occurred', 'Recognize'
from lessons l where l.lesson_code = 'L006';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply timing discernment to a current open question or decision they are facing', 'Apply'
from lessons l where l.lesson_code = 'L006';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Develop a personal prayer practice for discerning divine timing before making significant decisions', 'Develop'
from lessons l where l.lesson_code = 'L006';

-- =====================================================
-- L007 — Pace, Rest, and Capacity
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Identify the root causes of overcommitment and burnout in their own life', 'Identify'
from lessons l where l.lesson_code = 'L007';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Understand that pace and rest are spiritual disciplines, not signs of weakness', 'Understand'
from lessons l where l.lesson_code = 'L007';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize the difference between capacity that is Spirit-led and capacity that is people-pleasing', 'Recognize'
from lessons l where l.lesson_code = 'L007';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply Sabbath principles to create a weekly rhythm that honors God, body, and calling', 'Apply'
from lessons l where l.lesson_code = 'L007';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a personal capacity audit and begin eliminating commitments that are out of season', 'Create'
from lessons l where l.lesson_code = 'L007';

-- =====================================================
-- L008 — Walking in Step With the Spirit
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand what it means to walk in step with the Holy Spirit throughout daily life', 'Understand'
from lessons l where l.lesson_code = 'L008';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify three practical disciplines that help them remain sensitive to the Spirit''s leading', 'Identify'
from lessons l where l.lesson_code = 'L008';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize moments when they grieve or quench the Spirit through misaligned pace or choices', 'Recognize'
from lessons l where l.lesson_code = 'L008';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Integrate seasons, timing, and pace insights from L005–L007 into a Spirit-led daily rhythm', 'Apply'
from lessons l where l.lesson_code = 'L008';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a Rule of Life that reflects Spirit-led rhythms rather than self-managed productivity', 'Create'
from lessons l where l.lesson_code = 'L008';

-- =====================================================
-- L009 — Hearing God Clearly
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that hearing God is normative for every believer, not just spiritual elites', 'Understand'
from lessons l where l.lesson_code = 'L009';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least five ways God communicates with His people throughout Scripture and today', 'Identify'
from lessons l where l.lesson_code = 'L009';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize barriers in their own life that limit their ability to hear God clearly', 'Recognize'
from lessons l where l.lesson_code = 'L009';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice listening prayer for a sustained period and record what they hear', 'Practice'
from lessons l where l.lesson_code = 'L009';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate one instance from their own life where they believe they heard from God and what the fruit was', 'Articulate'
from lessons l where l.lesson_code = 'L009';

-- =====================================================
-- L010 — Interpreting Revelation
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Distinguish between literal and symbolic revelation and apply appropriate interpretation to each', 'Distinguish'
from lessons l where l.lesson_code = 'L010';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify key questions to ask when interpreting a dream, vision, or prophetic word', 'Identify'
from lessons l where l.lesson_code = 'L010';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Understand the role of Scripture, community, and the Spirit in confirming interpretation', 'Understand'
from lessons l where l.lesson_code = 'L010';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply an interpretation framework to one piece of personal revelation they have received', 'Apply'
from lessons l where l.lesson_code = 'L010';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Recognize common interpretation errors—personalizing corporate messages or over-literalizing symbols', 'Recognize'
from lessons l where l.lesson_code = 'L010';

-- =====================================================
-- L011 — Testing Revelation
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand why God commands believers to test all things and not accept every spirit', 'Understand'
from lessons l where l.lesson_code = 'L011';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the four primary testing filters: Scripture, peace, fruit, and confirmation', 'Identify'
from lessons l where l.lesson_code = 'L011';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between God''s voice, their own thoughts, and demonic deception using biblical criteria', 'Distinguish'
from lessons l where l.lesson_code = 'L011';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply the testing framework to one piece of revelation they currently hold', 'Apply'
from lessons l where l.lesson_code = 'L011';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Recognize red flags that indicate manipulation, deception, or spiritual confusion in prophetic environments', 'Recognize'
from lessons l where l.lesson_code = 'L011';

-- =====================================================
-- L012 — Applying Revelation to Daily Life
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the gap between receiving revelation and acting on it, and why obedience closes that gap', 'Understand'
from lessons l where l.lesson_code = 'L012';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least one piece of revelation they have received but not yet acted on', 'Identify'
from lessons l where l.lesson_code = 'L012';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Apply a hearing-to-application framework to translate God''s voice into concrete decisions', 'Apply'
from lessons l where l.lesson_code = 'L012';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Articulate the integration of identity, authority, calling, timing, and revelation as a unified framework', 'Articulate'
from lessons l where l.lesson_code = 'L012';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a 30-day obedience plan for one specific area of revelation they have received', 'Create'
from lessons l where l.lesson_code = 'L012';

-- =====================================================
-- L013 — Healing the Heart
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that inner healing is part of God''s redemptive work, not a secondary or optional experience', 'Understand'
from lessons l where l.lesson_code = 'L013';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least two unhealed wounds that are currently affecting their spiritual growth, relationships, or self-perception', 'Identify'
from lessons l where l.lesson_code = 'L013';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize the connection between unhealed wounds and patterns of behavior, fear, or self-protection', 'Recognize'
from lessons l where l.lesson_code = 'L013';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Experience a guided prayer of invitation inviting Jesus into one area of past pain', 'Experience'
from lessons l where l.lesson_code = 'L013';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate what wholeness looks like for them in the area they brought to Jesus in this lesson', 'Articulate'
from lessons l where l.lesson_code = 'L013';

-- =====================================================
-- L014 — Breaking Agreements & Lies
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand how inner vows and false agreements are formed through wounding and become strongholds', 'Understand'
from lessons l where l.lesson_code = 'L014';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least three core lies they have believed about God, themselves, or others', 'Identify'
from lessons l where l.lesson_code = 'L014';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between a conviction of the Holy Spirit and a lie formed through wounding', 'Distinguish'
from lessons l where l.lesson_code = 'L014';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice renouncing at least one inner vow or false agreement in guided prayer', 'Practice'
from lessons l where l.lesson_code = 'L014';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Declare God''s truth to replace each lie identified, anchored in specific Scripture', 'Declare'
from lessons l where l.lesson_code = 'L014';

-- =====================================================
-- L015 — Forgiveness & Release
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand forgiveness as an act of obedience that releases the forgiver, not an excuse for the offender', 'Understand'
from lessons l where l.lesson_code = 'L015';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Distinguish between forgiveness, reconciliation, and trust as three separate and independent choices', 'Distinguish'
from lessons l where l.lesson_code = 'L015';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Identify at least one person or situation where unforgiveness is still active in their heart', 'Identify'
from lessons l where l.lesson_code = 'L015';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Experience a guided forgiveness prayer releasing one person or offense to God''s justice', 'Experience'
from lessons l where l.lesson_code = 'L015';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate the difference they feel spiritually and emotionally after choosing forgiveness', 'Articulate'
from lessons l where l.lesson_code = 'L015';

-- =====================================================
-- L016 — Restoring Identity After Wounding
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand how deep wounding, trauma, or abuse can fragment or suppress the God-given identity', 'Understand'
from lessons l where l.lesson_code = 'L016';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify false identities formed in response to wounding—shame, victim, performance, invisibility', 'Identify'
from lessons l where l.lesson_code = 'L016';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize how their Q1 identity foundations are now being rebuilt after Q2 inner healing work', 'Recognize'
from lessons l where l.lesson_code = 'L016';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Experience a guided prayer of restoration receiving their true identity back from God', 'Experience'
from lessons l where l.lesson_code = 'L016';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Declare their restored identity using the declarations from L001, now spoken from a healed place', 'Declare'
from lessons l where l.lesson_code = 'L016';

-- =====================================================
-- L017 — Foundations of Spiritual Growth
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand God''s design for progressive transformation and how spiritual growth unfolds over time', 'Understand'
from lessons l where l.lesson_code = 'L017';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the role of intentionality and spiritual disciplines in sustainable growth', 'Identify'
from lessons l where l.lesson_code = 'L017';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between spiritual activity (doing) and spiritual formation (becoming)', 'Distinguish'
from lessons l where l.lesson_code = 'L017';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Assess their current spiritual growth trajectory using Scripture-based growth indicators', 'Examine'
from lessons l where l.lesson_code = 'L017';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a personal spiritual growth plan with at least three intentional growth practices', 'Create'
from lessons l where l.lesson_code = 'L017';

-- =====================================================
-- L018 — Discernment & Wisdom
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the biblical distinction between natural wisdom and Spirit-given discernment', 'Understand'
from lessons l where l.lesson_code = 'L018';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify practical tests for distinguishing God''s voice, their own thoughts, and the enemy''s voice', 'Identify'
from lessons l where l.lesson_code = 'L018';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize common deceptions, false teachings, and spiritual manipulation in church environments', 'Recognize'
from lessons l where l.lesson_code = 'L018';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a discernment framework to one current situation requiring a decision', 'Apply'
from lessons l where l.lesson_code = 'L018';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Develop a habit of testing spiritual input before acting on it through a journaling or accountability practice', 'Develop'
from lessons l where l.lesson_code = 'L018';

-- =====================================================
-- L019 — Obedience as Formation
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that obedience is the primary pathway to spiritual transformation, not legalism', 'Understand'
from lessons l where l.lesson_code = 'L019';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Distinguish between fear-based obedience and love-motivated obedience', 'Distinguish'
from lessons l where l.lesson_code = 'L019';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Identify areas of delayed or partial obedience in their current spiritual life', 'Identify'
from lessons l where l.lesson_code = 'L019';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a specific act of obedience to one area of their life where they have been resistant', 'Apply'
from lessons l where l.lesson_code = 'L019';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate how obedience has shaped their character in a specific past experience', 'Articulate'
from lessons l where l.lesson_code = 'L019';

-- =====================================================
-- L020 — Developing Spiritual Strength
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand how God uses trials, suffering, and adversity to build spiritual endurance and character', 'Understand'
from lessons l where l.lesson_code = 'L020';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least three spiritual disciplines that consistently build spiritual strength over time', 'Identify'
from lessons l where l.lesson_code = 'L020';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize patterns of spiritual weakness and trace them to neglected formation areas', 'Recognize'
from lessons l where l.lesson_code = 'L020';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply perseverance principles to a current trial or resistance they are facing', 'Apply'
from lessons l where l.lesson_code = 'L020';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a strength-building practice for one weak area of their spiritual life', 'Create'
from lessons l where l.lesson_code = 'L020';

-- =====================================================
-- L021 — Emotional Awareness
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that emotions are God-given signals, not enemies of faith or signs of weakness', 'Understand'
from lessons l where l.lesson_code = 'L021';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their dominant emotional patterns and the beliefs driving them', 'Identify'
from lessons l where l.lesson_code = 'L021';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between emotional suppression, emotional explosion, and healthy emotional expression', 'Distinguish'
from lessons l where l.lesson_code = 'L021';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice naming and sitting with a difficult emotion without suppressing or acting on it', 'Practice'
from lessons l where l.lesson_code = 'L021';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate the connection between their emotional patterns and their spiritual formation journey', 'Articulate'
from lessons l where l.lesson_code = 'L021';

-- =====================================================
-- L022 — Regulating Internal States
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the neurological and spiritual dimensions of emotional regulation and co-regulation', 'Understand'
from lessons l where l.lesson_code = 'L022';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their personal emotional triggers and the underlying wounds they point to', 'Identify'
from lessons l where l.lesson_code = 'L022';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize when they are operating from a dysregulated nervous system versus centered presence', 'Recognize'
from lessons l where l.lesson_code = 'L022';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice at least two grounding and regulation techniques in real-time during the session', 'Practice'
from lessons l where l.lesson_code = 'L022';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Apply regulation skills to a specific relationship or situation where they frequently lose emotional ground', 'Apply'
from lessons l where l.lesson_code = 'L022';

-- =====================================================
-- L023 — Healthy Boundaries
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand healthy boundaries as expressions of stewardship, identity, and love—not selfishness', 'Understand'
from lessons l where l.lesson_code = 'L023';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least two relationships or situations where they are currently operating without healthy limits', 'Identify'
from lessons l where l.lesson_code = 'L023';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between people-pleasing behavior and godly love in how they engage with others', 'Distinguish'
from lessons l where l.lesson_code = 'L023';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice assertive boundary-setting language in at least one role-play scenario', 'Practice'
from lessons l where l.lesson_code = 'L023';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a boundary plan for one relationship where clarity has been missing', 'Create'
from lessons l where l.lesson_code = 'L023';

-- =====================================================
-- L024 — Relational Maturity
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand relational maturity as the fruit of inner healing, identity, and emotional intelligence working together', 'Understand'
from lessons l where l.lesson_code = 'L024';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their relational maturity level in key categories: family, friendship, community, and leadership', 'Identify'
from lessons l where l.lesson_code = 'L024';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize recurring relational patterns that are hindering depth in their most important relationships', 'Recognize'
from lessons l where l.lesson_code = 'L024';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply relational resilience practices to a current strained or growing relationship', 'Apply'
from lessons l where l.lesson_code = 'L024';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a relational growth plan with one or two people God has placed in their sphere for this season', 'Create'
from lessons l where l.lesson_code = 'L024';

-- =====================================================
-- L025 — Prayer & Intimacy with God
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand prayer as intimate communion with God, not a religious duty or a formula for getting things', 'Understand'
from lessons l where l.lesson_code = 'L025';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the barriers most hindering their personal prayer life—busyness, doubt, distraction, or theology', 'Identify'
from lessons l where l.lesson_code = 'L025';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between information-seeking prayer, petition prayer, and contemplative prayer', 'Distinguish'
from lessons l where l.lesson_code = 'L025';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice at least 15 minutes of unstructured listening prayer during the session', 'Practice'
from lessons l where l.lesson_code = 'L025';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a consistent daily prayer rhythm tailored to their schedule and spiritual temperament', 'Create'
from lessons l where l.lesson_code = 'L025';

-- =====================================================
-- L026 — Scripture Meditation & Study
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the difference between reading Scripture for information and meditating for transformation', 'Understand'
from lessons l where l.lesson_code = 'L026';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their current relationship with Scripture and what hinders deeper engagement', 'Identify'
from lessons l where l.lesson_code = 'L026';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Practice the Lectio Divina method of Scripture meditation with a selected passage', 'Practice'
from lessons l where l.lesson_code = 'L026';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply at least one Scripture memorization technique to a passage God has highlighted to them', 'Apply'
from lessons l where l.lesson_code = 'L026';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a 30-day Scripture meditation plan focused on an area of personal transformation', 'Create'
from lessons l where l.lesson_code = 'L026';

-- =====================================================
-- L027 — Fasting & Spiritual Hunger
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand biblical fasting as a spiritual discipline for deepening dependence on God and pursuing breakthrough', 'Understand'
from lessons l where l.lesson_code = 'L027';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least three biblical types of fasts and their appropriate contexts', 'Identify'
from lessons l where l.lesson_code = 'L027';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between religious fasting for appearance and Spirit-led fasting for breakthrough', 'Distinguish'
from lessons l where l.lesson_code = 'L027';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Commit to a specific fast of their choosing within the next 30 days with a clear prayer focus', 'Apply'
from lessons l where l.lesson_code = 'L027';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate how fasting relates to their current season and what breakthrough they are believing for', 'Articulate'
from lessons l where l.lesson_code = 'L027';

-- =====================================================
-- L028 — Worship & Spiritual Rhythms
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand worship as a lifestyle posture, not only a Sunday gathering or musical expression', 'Understand'
from lessons l where l.lesson_code = 'L028';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the spiritual disciplines that most deeply connect them to God''s presence', 'Identify'
from lessons l where l.lesson_code = 'L028';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize seasons of spiritual dryness and learn to worship through them rather than from feeling', 'Recognize'
from lessons l where l.lesson_code = 'L028';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply Rule of Life principles to create a personally sustainable pattern of spiritual rhythms', 'Apply'
from lessons l where l.lesson_code = 'L028';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a written Rule of Life integrating prayer, Scripture, fasting, solitude, worship, and service', 'Create'
from lessons l where l.lesson_code = 'L028';

-- =====================================================
-- L029 — Discovering Your Calling
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand calling as the intersection of how God made them, what moves their heart, and what He is saying', 'Understand'
from lessons l where l.lesson_code = 'L029';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their God-given passions, sphere of influence, and recurring themes across their life story', 'Identify'
from lessons l where l.lesson_code = 'L029';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize the difference between a calling rooted in identity versus one rooted in pressure or gifting alone', 'Recognize'
from lessons l where l.lesson_code = 'L029';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a calling discovery framework to produce a personal mission statement draft', 'Apply'
from lessons l where l.lesson_code = 'L029';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a personal mission statement that is clear, Kingdom-oriented, and actionable', 'Create'
from lessons l where l.lesson_code = 'L029';

-- =====================================================
-- L030 — Gifts & Strengths Assessment
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the difference between spiritual gifts, natural talents, and developed skills', 'Understand'
from lessons l where l.lesson_code = 'L030';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their top spiritual gifts through Scripture, assessment, and community confirmation', 'Identify'
from lessons l where l.lesson_code = 'L030';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between using gifts for personal platform and deploying gifts to build up the body of Christ', 'Distinguish'
from lessons l where l.lesson_code = 'L030';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply their identified gifts to one current ministry opportunity or need in their community', 'Apply'
from lessons l where l.lesson_code = 'L030';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a gifts deployment plan with accountability and a 90-day window for practical exercise', 'Create'
from lessons l where l.lesson_code = 'L030';

-- =====================================================
-- L031 — Overcoming Obstacles to Purpose
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Identify the five primary obstacles to purpose: fear, comparison, lack, opposition, and past failure', 'Identify'
from lessons l where l.lesson_code = 'L031';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Understand that obstacles are often part of the preparation process, not disqualifiers', 'Understand'
from lessons l where l.lesson_code = 'L031';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize which obstacle most consistently hinders their forward movement', 'Recognize'
from lessons l where l.lesson_code = 'L031';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a specific overcoming strategy to their primary obstacle with concrete steps', 'Apply'
from lessons l where l.lesson_code = 'L031';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Develop a resilience plan for the next time they encounter their primary obstacle to purpose', 'Develop'
from lessons l where l.lesson_code = 'L031';

-- =====================================================
-- L032 — Activating Your Mission
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the difference between knowing your mission and actively living your mission', 'Understand'
from lessons l where l.lesson_code = 'L032';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Articulate their finalized personal mission statement with confidence and clarity', 'Articulate'
from lessons l where l.lesson_code = 'L032';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Apply SMART goal methodology to create a weekly, quarterly, and annual mission action plan', 'Apply'
from lessons l where l.lesson_code = 'L032';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Identify the first three concrete steps they will take in the next 7 days toward their mission', 'Identify'
from lessons l where l.lesson_code = 'L032';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create an accountability structure with at least one person to help them stay on mission', 'Create'
from lessons l where l.lesson_code = 'L032';

-- =====================================================
-- L033 — Leading Yourself
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that all leadership begins with self-leadership—leading others flows from leading yourself well', 'Understand'
from lessons l where l.lesson_code = 'L033';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their current level of health in four domains: spiritual, emotional, physical, and financial', 'Identify'
from lessons l where l.lesson_code = 'L033';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize the specific area of self-leadership where they are most inconsistent or underdeveloped', 'Recognize'
from lessons l where l.lesson_code = 'L033';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a self-leadership framework to create a personal scorecard with measurable indicators', 'Apply'
from lessons l where l.lesson_code = 'L033';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a 90-day self-leadership improvement plan focused on their lowest-scoring domain', 'Create'
from lessons l where l.lesson_code = 'L033';

-- =====================================================
-- L034 — Leading Others
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the principles of empowering, developing, and releasing others in leadership', 'Understand'
from lessons l where l.lesson_code = 'L034';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their default leadership style and how it affects the people they are responsible for', 'Identify'
from lessons l where l.lesson_code = 'L034';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between controlling leadership and empowering leadership in practice', 'Distinguish'
from lessons l where l.lesson_code = 'L034';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply delegation principles to at least one task or responsibility they currently hold too tightly', 'Apply'
from lessons l where l.lesson_code = 'L034';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a team culture assessment and one-page plan for improving the culture they lead', 'Create'
from lessons l where l.lesson_code = 'L034';

-- =====================================================
-- L035 — Influence & Responsibility
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that influence is a stewardship entrusted by God and carries corresponding responsibility', 'Understand'
from lessons l where l.lesson_code = 'L035';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify their current spheres of influence and the people who are most affected by their decisions', 'Identify'
from lessons l where l.lesson_code = 'L035';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize warning signs of power abuse, self-protection, and compromise in leadership contexts', 'Recognize'
from lessons l where l.lesson_code = 'L035';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply an influence audit to identify where their current impact is aligned or misaligned with Kingdom values', 'Apply'
from lessons l where l.lesson_code = 'L035';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Develop an integrity commitment covering their three highest-risk areas of influence', 'Develop'
from lessons l where l.lesson_code = 'L035';

-- =====================================================
-- L036 — Servant Leadership
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand Jesus'' model of servant leadership as leading from below, not from position or power', 'Understand'
from lessons l where l.lesson_code = 'L036';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the areas in their leadership where they seek recognition, platform, or being served', 'Identify'
from lessons l where l.lesson_code = 'L036';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between servanthood from healthy generosity and servanthood from wounded compliance', 'Distinguish'
from lessons l where l.lesson_code = 'L036';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice one specific act of servant leadership that is deliberately hidden and not for recognition', 'Practice'
from lessons l where l.lesson_code = 'L036';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate how Q3 leadership formation has changed their vision for how they want to lead going forward', 'Articulate'
from lessons l where l.lesson_code = 'L036';

-- =====================================================
-- L037 — Understanding Your Assignment
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the difference between a general Kingdom calling and a specific present assignment', 'Understand'
from lessons l where l.lesson_code = 'L037';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify how their makeup, their story, the needs they see, and what God is saying all intersect to clarify their assignment', 'Identify'
from lessons l where l.lesson_code = 'L037';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize when they are operating outside their assignment by taking on responsibilities that belong to others', 'Recognize'
from lessons l where l.lesson_code = 'L037';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply an assignment discovery process to produce a written assignment statement', 'Apply'
from lessons l where l.lesson_code = 'L037';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create an assignment statement that is specific, season-appropriate, and Spirit-confirmed', 'Create'
from lessons l where l.lesson_code = 'L037';

-- =====================================================
-- L038 — Vision & Direction
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand how God releases vision progressively and how to discern direction without seeing the full path', 'Understand'
from lessons l where l.lesson_code = 'L038';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify at least three ways God has confirmed the direction He has given them', 'Identify'
from lessons l where l.lesson_code = 'L038';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between God''s vision for their life and their own ambition or cultural expectations', 'Distinguish'
from lessons l where l.lesson_code = 'L038';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a vision-testing process to the primary direction they sense God is leading them', 'Apply'
from lessons l where l.lesson_code = 'L038';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate their current vision in a single clear sentence they could use to guide their next 12 months', 'Articulate'
from lessons l where l.lesson_code = 'L038';

-- =====================================================
-- L039 — Faith & Risk
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that biblical faith requires stepping out before certainty arrives', 'Understand'
from lessons l where l.lesson_code = 'L039';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Distinguish between foolish presumption and Spirit-led faith risk', 'Distinguish'
from lessons l where l.lesson_code = 'L039';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Identify at least one area where fear has prevented them from taking a step of faith God has been calling them to', 'Identify'
from lessons l where l.lesson_code = 'L039';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a Spirit-led risk assessment framework to one current decision requiring faith', 'Apply'
from lessons l where l.lesson_code = 'L039';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Commit to one specific act of faith they will take within the next 30 days with accountability', 'Practice'
from lessons l where l.lesson_code = 'L039';

-- =====================================================
-- L040 — Courage & Obedience
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand courage as obedience in the face of fear, not absence of fear', 'Understand'
from lessons l where l.lesson_code = 'L040';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify specific areas of delayed obedience in their current walk and what is keeping them there', 'Identify'
from lessons l where l.lesson_code = 'L040';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize how delayed obedience has affected their spiritual growth and the people depending on them', 'Recognize'
from lessons l where l.lesson_code = 'L040';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice moving forward in one area of delayed obedience with a specific first step taken this week', 'Practice'
from lessons l where l.lesson_code = 'L040';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Declare their commitment to courageous obedience over their specific area of hesitation', 'Declare'
from lessons l where l.lesson_code = 'L040';

-- =====================================================
-- L041 — Serving with Honor
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand all ministry as service done for God''s audience, not for human recognition', 'Understand'
from lessons l where l.lesson_code = 'L041';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify areas where they serve with hidden motives—recognition, approval, control, or compensation', 'Identify'
from lessons l where l.lesson_code = 'L041';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between faithful excellence in small things and striving for visible platforms', 'Distinguish'
from lessons l where l.lesson_code = 'L041';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice one act of hidden service this week with no expectation of acknowledgment', 'Practice'
from lessons l where l.lesson_code = 'L041';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate how faithfulness in unseen service qualifies them for greater responsibility', 'Articulate'
from lessons l where l.lesson_code = 'L041';

-- =====================================================
-- L042 — Spiritual Gifts in Operation
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the purpose of spiritual gifts as building up the body of Christ, not building personal platforms', 'Understand'
from lessons l where l.lesson_code = 'L042';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify which gifts they are currently operating in and which may be underdeveloped or neglected', 'Identify'
from lessons l where l.lesson_code = 'L042';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between the misuse of spiritual gifts—showmanship, manipulation, competition—and healthy deployment', 'Distinguish'
from lessons l where l.lesson_code = 'L042';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply their gifts in a low-stakes practical context during or following the session', 'Apply'
from lessons l where l.lesson_code = 'L042';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a gifts development plan with specific practices for growing in their primary gifts over 90 days', 'Create'
from lessons l where l.lesson_code = 'L042';

-- =====================================================
-- L043 — Impact & Fruitfulness
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the difference between Kingdom fruitfulness and busy activity—fruit that remains versus noise', 'Understand'
from lessons l where l.lesson_code = 'L043';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify three to five people God has called them to pour into intentionally this season', 'Identify'
from lessons l where l.lesson_code = 'L043';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between measuring impact by activity and measuring it by transformed lives', 'Distinguish'
from lessons l where l.lesson_code = 'L043';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a fruitfulness audit to their current ministry commitments and identify areas to prune', 'Apply'
from lessons l where l.lesson_code = 'L043';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a depth-over-breadth investment plan for pouring into their identified people this quarter', 'Create'
from lessons l where l.lesson_code = 'L043';

-- =====================================================
-- L044 — Ministry as Overflow
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand that sustainable ministry flows from personal fullness and intimacy with God, not depletion', 'Understand'
from lessons l where l.lesson_code = 'L044';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify current burnout indicators in their own life and trace them to their source', 'Identify'
from lessons l where l.lesson_code = 'L044';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize the difference between self-neglect in the name of ministry and Spirit-led sacrifice', 'Recognize'
from lessons l where l.lesson_code = 'L044';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply an overflow assessment to identify what fills their cup versus what drains it', 'Apply'
from lessons l where l.lesson_code = 'L044';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a personal rest and restoration plan that protects their capacity for long-term ministry', 'Create'
from lessons l where l.lesson_code = 'L044';

-- =====================================================
-- L045 — Kingdom Calling
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand Kingdom calling as a lifelong stewardship with eternal weight and intentional direction', 'Understand'
from lessons l where l.lesson_code = 'L045';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the through-lines of their Kingdom calling across all four quarters of the curriculum', 'Identify'
from lessons l where l.lesson_code = 'L045';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Examine how their identity, healing, disciplines, gifts, and assignments have converged into a unified calling', 'Examine'
from lessons l where l.lesson_code = 'L045';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Create a Kingdom calling statement that is comprehensive, eternity-minded, and personally owned', 'Create'
from lessons l where l.lesson_code = 'L045';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Declare their Kingdom calling statement aloud in community as a public act of commitment', 'Declare'
from lessons l where l.lesson_code = 'L045';

-- =====================================================
-- L046 — Multiplication Mindset
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the 2 Timothy 2:2 multiplication principle and how it differs from addition ministry', 'Understand'
from lessons l where l.lesson_code = 'L046';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the people in their life they are currently investing in and those they should be', 'Identify'
from lessons l where l.lesson_code = 'L046';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between doing ministry for people and equipping people to do ministry', 'Distinguish'
from lessons l where l.lesson_code = 'L046';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply discipleship pipeline thinking to design their personal multiplication plan', 'Apply'
from lessons l where l.lesson_code = 'L046';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a generational Kingdom impact vision—who they are investing in who will invest in others', 'Create'
from lessons l where l.lesson_code = 'L046';

-- =====================================================
-- L047 — Building a Lasting Legacy
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand legacy as the cumulative result of decisions made in light of eternity rather than immediate gain', 'Understand'
from lessons l where l.lesson_code = 'L047';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the areas of their life where current decisions are most shaping their long-term legacy', 'Identify'
from lessons l where l.lesson_code = 'L047';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Examine whether their current influence is being stewarded for legacy or for short-term results', 'Examine'
from lessons l where l.lesson_code = 'L047';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply legacy thinking to one current decision they are facing to evaluate its long-term Kingdom value', 'Apply'
from lessons l where l.lesson_code = 'L047';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a written legacy vision statement describing what they want to have built in 20 years', 'Create'
from lessons l where l.lesson_code = 'L047';

-- =====================================================
-- L048 — Finishing Well
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the biblical call to endurance and finishing the race, not just starting it with enthusiasm', 'Understand'
from lessons l where l.lesson_code = 'L048';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the primary pitfalls that cause people to abandon their calling—pride, sin, comparison, weariness', 'Identify'
from lessons l where l.lesson_code = 'L048';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize how each module in the curriculum has equipped them for long-term Kingdom endurance', 'Recognize'
from lessons l where l.lesson_code = 'L048';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Articulate the personal transformation they have experienced across the full 48-lesson journey', 'Articulate'
from lessons l where l.lesson_code = 'L048';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Declare their commitment to finish well, naming their primary threats and their strategies to overcome them', 'Declare'
from lessons l where l.lesson_code = 'L048';

-- =====================================================
-- L049 — The Stone Rolled Away — The Barrier Removed
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the resurrection narrative as a template for recognizing divine identity shifts in one''s own life', 'Understand'
from lessons l where l.lesson_code = 'L049';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the external barriers in their life that God has already removed but they have not yet walked through', 'Identify'
from lessons l where l.lesson_code = 'L049';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between circumstances that are God-ordained limitations and barriers that are now expired', 'Distinguish'
from lessons l where l.lesson_code = 'L049';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply the Stone Rolled Away framework to declare at least one barrier removed and take a first step forward', 'Apply'
from lessons l where l.lesson_code = 'L049';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate what walking in the freedom of a removed barrier looks like for their specific situation', 'Articulate'
from lessons l where l.lesson_code = 'L049';

-- =====================================================
-- L050 — The Guards Couldn't Contain Him — The Old System Lost Jurisdiction
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand what it means for an old authority structure or system to lose spiritual jurisdiction over a new identity', 'Understand'
from lessons l where l.lesson_code = 'L050';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the old systems, structures, or authority figures that are still operating as though they have jurisdiction over them', 'Identify'
from lessons l where l.lesson_code = 'L050';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between appropriate submitted authority and illegitimate control that must be peacefully released', 'Distinguish'
from lessons l where l.lesson_code = 'L050';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice declaring their freedom from one expired authority structure through guided declaration prayer', 'Practice'
from lessons l where l.lesson_code = 'L050';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Articulate who they are now versus who the old system defined them to be', 'Articulate'
from lessons l where l.lesson_code = 'L050';

-- =====================================================
-- L051 — The Grave Couldn't Hold Him — The Environment Was Too Small
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the spiritual principle that some environments become too small when identity has been upgraded by God', 'Understand'
from lessons l where l.lesson_code = 'L051';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify environments—relational, organizational, or geographic—that no longer match who they have become', 'Identify'
from lessons l where l.lesson_code = 'L051';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Distinguish between leaving prematurely out of frustration and Spirit-led transition out of maturity', 'Distinguish'
from lessons l where l.lesson_code = 'L051';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Apply a transition discernment process to one current environment they are sensing God is releasing them from', 'Apply'
from lessons l where l.lesson_code = 'L051';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Create a transition plan with a clear timeline, accountability, and a blessing posture toward the environment they are leaving', 'Create'
from lessons l where l.lesson_code = 'L051';

-- =====================================================
-- L052 — The Grave Clothes Left Behind — The Old Identity Is Finished
-- =====================================================
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 1, 'Understand the grave clothes as representing old identity markers that must be consciously shed and left behind', 'Understand'
from lessons l where l.lesson_code = 'L052';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 2, 'Identify the specific grave clothes still attached to their life—labels, fears, limitations, narratives from others', 'Identify'
from lessons l where l.lesson_code = 'L052';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 3, 'Recognize the difference between honoring their history and being imprisoned by it', 'Recognize'
from lessons l where l.lesson_code = 'L052';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 4, 'Practice a formal renunciation and release of at least one old identity marker through guided declaration', 'Practice'
from lessons l where l.lesson_code = 'L052';
insert into lesson_objectives (lesson_id, objective_number, objective_text, bloom_verb)
select l.id, 5, 'Declare the Solavian Freedom Declaration as the culminating statement of their identity transformation journey', 'Declare'
from lessons l where l.lesson_code = 'L052';
