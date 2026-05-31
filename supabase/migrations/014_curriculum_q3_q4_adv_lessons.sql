-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 014 — Lesson Records: Q3 + Q4 + Advanced (Lessons 25–52)
-- =====================================================

-- =====================================================
-- Q3 PRACTICE — MOD-Q3-07 Spiritual Disciplines (L025–L028)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L025', 25,
  'Prayer & Intimacy with God',
  'Teaches foundational principles of prayer as intimate communion with God, not just religious duty. Students learn to develop consistent prayer life and deepen intimacy with God.',
  'solavian_core', m.id, m.quarter_id, 1, 'Spiritual Disciplines', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-07';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L026', 26,
  'Scripture Meditation & Study',
  'Teaches the difference between reading Scripture for information versus meditating on it for transformation. Students learn Lectio Divina and Scripture memory techniques.',
  'solavian_core', m.id, m.quarter_id, 2, 'Spiritual Disciplines', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-07';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L027', 27,
  'Fasting & Spiritual Hunger',
  'Teaches biblical fasting as a spiritual discipline to deepen dependence on God, break strongholds, and pursue breakthrough. Students learn various types of fasts.',
  'solavian_core', m.id, m.quarter_id, 3, 'Spiritual Disciplines', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-07';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L028', 28,
  'Worship & Spiritual Rhythms',
  'Capstone lesson for Spiritual Disciplines module. Teaches worship as lifestyle. Students create a Rule of Life integrating prayer, Scripture, fasting, solitude, worship, and service.',
  'solavian_core', m.id, m.quarter_id, 4, 'Spiritual Disciplines', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-07';

-- =====================================================
-- Q3 PRACTICE — MOD-Q3-08 Mission & Purpose (L029–L032)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L029', 29,
  'Discovering Your Calling',
  'Helps students discover their unique calling by examining how God made them, what moves their heart, their sphere of influence, and what God is saying. Students create a personal mission statement.',
  'solavian_core', m.id, m.quarter_id, 1, 'Mission & Purpose', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-08';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L030', 30,
  'Gifts & Strengths Assessment',
  'Helps students identify their spiritual gifts and natural strengths. Teaches the difference between gifts, talents, and skills. Students take assessments and begin using their gifts.',
  'solavian_core', m.id, m.quarter_id, 2, 'Mission & Purpose', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-08';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L031', 31,
  'Overcoming Obstacles to Purpose',
  'Identifies common obstacles that prevent people from walking in their purpose: fear, comparison, perceived lack of resources, opposition, and past failures. Students develop strategies to overcome each.',
  'solavian_core', m.id, m.quarter_id, 3, 'Mission & Purpose', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-08';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L032', 32,
  'Activating Your Mission',
  'Capstone lesson for Mission & Purpose module. Students finalize their mission statement and create a concrete action plan with SMART goals for the week, quarter, and year.',
  'solavian_core', m.id, m.quarter_id, 4, 'Mission & Purpose', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-08';

-- =====================================================
-- Q3 PRACTICE — MOD-Q3-09 Leadership (L033–L036)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L033', 33,
  'Leading Yourself',
  'Teaches that all leadership begins with self-leadership. Students assess their spiritual, emotional, time management, and physical/financial health and create a self-leadership plan.',
  'solavian_core', m.id, m.quarter_id, 1, 'Leadership', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-09';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L034', 34,
  'Leading Others',
  'Teaches principles of leading and empowering others. Students learn to delegate effectively, develop others, create healthy team culture, and avoid controlling leadership.',
  'solavian_core', m.id, m.quarter_id, 2, 'Leadership', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-09';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L035', 35,
  'Influence & Responsibility',
  'Teaches that with influence comes responsibility. Students audit their current influence, learn to steward it wisely, recognize potential for abuse of power, and commit to leading with integrity.',
  'solavian_core', m.id, m.quarter_id, 3, 'Leadership', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-09';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L036', 36,
  'Servant Leadership',
  'Capstone lesson for Leadership module and Q3 Practice Quarter. Teaches Jesus'' model of servant leadership: leading by serving, not being served. Students practice humility and leading from below.',
  'solavian_core', m.id, m.quarter_id, 4, 'Leadership', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q3-09';

-- =====================================================
-- Q4 MINISTRY — MOD-Q4-10 Purpose & Assignment (L037–L040)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L037', 37,
  'Understanding Your Assignment',
  'Helps students clarify their specific Kingdom assignment by examining how God made them, what He''s done in them, the needs they see, and what God is saying. Students write an assignment statement.',
  'solavian_core', m.id, m.quarter_id, 1, 'Purpose & Assignment', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-10';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L038', 38,
  'Vision & Direction',
  'Teaches students how to receive and clarify God''s vision for their assignment. Covers discerning direction, confirming vision through multiple means, and taking the next step without seeing the whole path.',
  'solavian_core', m.id, m.quarter_id, 2, 'Purpose & Assignment', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-10';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L039', 39,
  'Faith & Risk',
  'Teaches that faith requires risk and stepping out when God says ''Come.'' Students learn to distinguish between foolish risks and faith-filled risks, overcome fear, and take calculated steps of obedience.',
  'solavian_core', m.id, m.quarter_id, 3, 'Purpose & Assignment', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-10';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L040', 40,
  'Courage & Obedience',
  'Capstone lesson for Purpose & Assignment module. Teaches that courage is not absence of fear but obedience in the face of fear. Students identify areas of delayed obedience and commit to immediate obedience.',
  'solavian_core', m.id, m.quarter_id, 4, 'Purpose & Assignment', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-10';

-- =====================================================
-- Q4 MINISTRY — MOD-Q4-11 Ministry & Service (L041–L044)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L041', 41,
  'Serving with Honor',
  'Teaches that all ministry is service and should be done with excellence and honor, serving God rather than seeking recognition. Students learn faithfulness in small things.',
  'solavian_core', m.id, m.quarter_id, 1, 'Ministry & Service', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-11';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L042', 42,
  'Spiritual Gifts in Operation',
  'Teaches students to identify, develop, and deploy their spiritual gifts for building up the body of Christ. Covers various spiritual gifts, how to grow in them, and avoiding misuse or neglect.',
  'solavian_core', m.id, m.quarter_id, 2, 'Ministry & Service', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-11';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L043', 43,
  'Impact & Fruitfulness',
  'Teaches students to distinguish between busyness and fruitfulness. Students learn to measure true Kingdom impact, focus on depth over breadth, and identify 3–5 people to pour into intentionally.',
  'solavian_core', m.id, m.quarter_id, 3, 'Ministry & Service', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-11';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L044', 44,
  'Ministry as Overflow',
  'Capstone lesson for Ministry & Service module. Teaches that sustainable ministry flows from fullness, not emptiness. Students assess burnout, identify what fills their cup, and create rest plans.',
  'solavian_core', m.id, m.quarter_id, 4, 'Ministry & Service', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-11';

-- =====================================================
-- Q4 MINISTRY — MOD-Q4-12 Legacy & Multiplication (L045–L048)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L045', 45,
  'Kingdom Calling',
  'Helps students embrace their Kingdom calling with eternal intentionality. Students conduct a calling inventory and write a Kingdom calling statement that integrates all they have learned.',
  'solavian_core', m.id, m.quarter_id, 1, 'Legacy & Multiplication', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-12';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L046', 46,
  'Multiplication Mindset',
  'Teaches students to shift from doing ministry to equipping others for ministry. Students learn 2 Timothy 2:2 multiplication, create discipleship pipelines, and think generationally about Kingdom impact.',
  'solavian_core', m.id, m.quarter_id, 2, 'Legacy & Multiplication', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-12';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L047', 47,
  'Building a Lasting Legacy',
  'Teaches students to build a legacy that outlasts them by living with eternity in mind, stewarding influence wisely, and making God-honoring decisions. Students create a legacy vision.',
  'solavian_core', m.id, m.quarter_id, 3, 'Legacy & Multiplication', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-12';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L048', 48,
  'Finishing Well',
  'Capstone lesson for the entire 48-lesson core curriculum. Teaches students to finish their race well by avoiding pitfalls, persevering through trials, keeping their eyes on Jesus, and staying faithful to the end.',
  'solavian_core', m.id, m.quarter_id, 4, 'Legacy & Multiplication', 'embodiment', 90, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-Q4-12';

-- =====================================================
-- ADVANCED TRACK — MOD-ADV-13 Resurrection Identity Protocol (L049–L052)
-- =====================================================

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L049', 49,
  'The Stone Rolled Away — The Barrier Removed',
  'Foundation lesson for the Resurrection Identity Protocol. Teaches students how to recognize when God has removed external barriers that others assumed would keep them contained, and how to walk in the freedom of divine identity shifts.',
  'solavian_advanced', m.id, m.quarter_id, 1, 'Advanced Identity Work', 'foundation', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-ADV-13';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L050', 50,
  'The Guards Couldn''t Contain Him — The Old System Lost Jurisdiction',
  'Discernment lesson for the Resurrection Identity Protocol. Teaches students how to recognize when old authority structures and systems have lost jurisdiction over their new identity.',
  'solavian_advanced', m.id, m.quarter_id, 2, 'Advanced Identity Work', 'discernment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-ADV-13';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L051', 51,
  'The Grave Couldn''t Hold Him — The Environment Was Too Small',
  'Practice lesson for the Resurrection Identity Protocol. Teaches students how to recognize when they have outgrown their current environment, and how to navigate the transition to spaces that match their new identity.',
  'solavian_advanced', m.id, m.quarter_id, 3, 'Advanced Identity Work', 'practice', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-ADV-13';

insert into lessons (lesson_code, lesson_number, title, description, track, module_id, quarter_id, sequence_in_module, category, depth_level, duration_minutes, content_status, status)
select 'L052', 52,
  'The Grave Clothes Left Behind — The Old Identity Is Finished',
  'Capstone lesson of the Resurrection Identity Protocol. Teaches students how to shed old identity markers, step fully into new identity, and declare the Solavian Freedom Declaration.',
  'solavian_advanced', m.id, m.quarter_id, 4, 'Advanced Identity Work', 'embodiment', 75, 'complete', 'ready_to_teach'
from modules m where m.module_code = 'MOD-ADV-13';
