-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 013 — Lesson Records: Q1 + Q2 (Lessons 1–24)
-- =====================================================

-- =====================================================
-- Q1 ALPHA — MOD-Q1-01 Identity Foundation (L001–L004)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L001', 1,
  'Identity — Who You Are in the Kingdom',
  'Establishing foundational truth of kingdom identity—who you are in Christ, not what you do for Him. Dismantles performance-based thinking and establishes that identity is the foundation for all spiritual growth.',
  'solavian_core', m.id, m.quarter_id, 1, 'Identity', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-01';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L002', 2,
  'Authority — What You Carry',
  'Understanding spiritual authority given to believers as kingdom citizens. Authority flows from identity in Christ, not from personal achievement or spiritual performance.',
  'solavian_core', m.id, m.quarter_id, 2, 'Authority', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-01';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L003', 3,
  'Calling — What You''re Assigned To',
  'Discovering the difference between calling and assignment. Calling is who you''re becoming; assignment is what you''re sent to do. Both flow from identity and are gifts from God.',
  'solavian_core', m.id, m.quarter_id, 3, 'Calling', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-01';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L004', 4,
  'Alignment — Bringing Your Life Into Agreement',
  'Capstone lesson for Identity Foundation module. Learning to bring every area of life into alignment with identity, authority, and calling. Moves from revelation to practical application.',
  'solavian_core', m.id, m.quarter_id, 4, 'Alignment', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-01';

-- =====================================================
-- Q1 ALPHA — MOD-Q1-02 Timing & Seasons (L005–L008)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L005', 5,
  'Understanding Seasons',
  'Learning to recognize and navigate the different seasons God ordains in our lives. God operates in seasons—planting, growing, pruning, waiting, and harvest. Each season has a purpose.',
  'solavian_core', m.id, m.quarter_id, 1, 'Timing', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-02';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L006', 6,
  'Discerning Timing',
  'Developing the ability to discern when God is opening doors versus when He is asking you to wait. Learning to recognize divine timing indicators and make aligned decisions.',
  'solavian_core', m.id, m.quarter_id, 2, 'Timing', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-02';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L007', 7,
  'Pace, Rest, and Capacity',
  'Learning to manage your pace, honor your personal capacity, and integrate rest into your life rhythms. Directly addresses burnout, overcommitment, and unsustainable ministry patterns.',
  'solavian_core', m.id, m.quarter_id, 3, 'Timing', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-02';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L008', 8,
  'Walking in Step With the Spirit',
  'Capstone lesson for Timing & Seasons module. Learning to synchronize your pace with the Holy Spirit''s leading. Integrates seasons, timing, and pace into Spirit-led rhythms.',
  'solavian_core', m.id, m.quarter_id, 4, 'Timing', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-02';

-- =====================================================
-- Q1 ALPHA — MOD-Q1-03 Revelation & Application (L009–L012)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L009', 9,
  'Hearing God Clearly',
  'Establishing biblical foundation for hearing God''s voice. God speaks in multiple ways throughout Scripture, and hearing Him is normative for every believer, not just spiritual elites.',
  'solavian_core', m.id, m.quarter_id, 1, 'Revelation', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-03';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L010', 10,
  'Interpreting Revelation',
  'Developing ability to interpret and understand what God is communicating. Hearing is step one; understanding what He means is step two. Covers literal vs. symbolic interpretation.',
  'solavian_core', m.id, m.quarter_id, 2, 'Revelation', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-03';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L011', 11,
  'Testing Revelation',
  'Learning to test and validate revelation against biblical standards. Scripture commands us to test all things. Students learn to distinguish God''s voice from their own thoughts and demonic deception.',
  'solavian_core', m.id, m.quarter_id, 3, 'Revelation', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-03';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L012', 12,
  'Applying Revelation to Daily Life',
  'Capstone lesson for Q1 Alpha Quarter. Taking revelation from hearing to action—translating God''s voice into obedience, decisions, and lifestyle. Integrates all Q1 learnings.',
  'solavian_core', m.id, m.quarter_id, 4, 'Revelation', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q1-03';

-- =====================================================
-- Q2 FORMATION — MOD-Q2-04 Inner Healing (L013–L016)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L013', 13,
  'Healing the Heart',
  'Introduction to inner healing ministry and God''s heart for emotional and spiritual wholeness. Students learn that healing is part of redemption, that wounded hearts can be restored, and that God invites us into a journey of deep healing.',
  'solavian_core', m.id, m.quarter_id, 1, 'Inner Healing', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-04';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L014', 14,
  'Breaking Agreements & Lies',
  'Learning to identify and break inner vows, agreements, and false beliefs formed through wounding. Students discover how lies become strongholds and develop skills to renounce lies and replace them with God''s truth.',
  'solavian_core', m.id, m.quarter_id, 2, 'Inner Healing', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-04';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L015', 15,
  'Forgiveness & Release',
  'Teaching biblical forgiveness as an act of obedience that brings freedom to the forgiver. Forgiveness is not excusing sin, forgetting, or reconciling—but releasing the offender to God and choosing freedom over bitterness.',
  'solavian_core', m.id, m.quarter_id, 3, 'Inner Healing', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-04';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L016', 16,
  'Restoring Identity After Wounding',
  'Capstone lesson for Inner Healing module. Students learn to rebuild their identity after deep wounding, trauma, or abuse. Integrates Q1 identity foundations with inner healing work.',
  'solavian_core', m.id, m.quarter_id, 4, 'Inner Healing', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-04';

-- =====================================================
-- Q2 FORMATION — MOD-Q2-05 Spiritual Maturity (L017–L020)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L017', 17,
  'Foundations of Spiritual Growth',
  'Establishes biblical foundations for spiritual growth: the necessity of intentionality, the role of spiritual disciplines, and God''s design for progressive transformation.',
  'solavian_core', m.id, m.quarter_id, 1, 'Spiritual Maturity', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-05';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L018', 18,
  'Discernment & Wisdom',
  'Teaching students to distinguish between God''s voice, the enemy''s voice, and their own thoughts. Covers biblical principles of discernment, testing spirits, recognizing deception, and cultivating wisdom.',
  'solavian_core', m.id, m.quarter_id, 2, 'Spiritual Maturity', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-05';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L019', 19,
  'Obedience as Formation',
  'Teaching that obedience is not legalism but the primary pathway to spiritual transformation. Students learn how God uses obedience to shape character, build trust, and develop spiritual maturity.',
  'solavian_core', m.id, m.quarter_id, 3, 'Spiritual Maturity', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-05';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L020', 20,
  'Developing Spiritual Strength',
  'Capstone lesson for Spiritual Maturity module. Teaches students how to build spiritual endurance, resilience, and strength through trials, spiritual disciplines, and perseverance.',
  'solavian_core', m.id, m.quarter_id, 4, 'Spiritual Maturity', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-05';

-- =====================================================
-- Q2 FORMATION — MOD-Q2-06 Emotional Intelligence (L021–L024)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L021', 21,
  'Emotional Awareness',
  'Teaches biblical understanding of emotions as God-given, not sinful. Students learn to identify, name, and manage emotions in healthy ways.',
  'solavian_core', m.id, m.quarter_id, 1, 'Emotional Intelligence', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-06';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L022', 22,
  'Regulating Internal States',
  'Teaching students to heal from deep emotional wounds, childhood trauma, and relational pain. Integrates Q2 Inner Healing work with emotional processing.',
  'solavian_core', m.id, m.quarter_id, 2, 'Emotional Intelligence', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-06';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L023', 23,
  'Healthy Boundaries',
  'Teaching students how to express emotions in healthy ways within relationships. Covers assertive communication, emotional vulnerability, conflict resolution, and setting boundaries.',
  'solavian_core', m.id, m.quarter_id, 3, 'Emotional Intelligence', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-06';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L024', 24,
  'Relational Maturity',
  'Capstone lesson for Emotional Intelligence module and Q2 Formation Quarter. Teaches students to build long-term emotional resilience through spiritual practices, healthy habits, community support, and consistent self-care.',
  'solavian_core', m.id, m.quarter_id, 4, 'Emotional Intelligence', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q2-06';
