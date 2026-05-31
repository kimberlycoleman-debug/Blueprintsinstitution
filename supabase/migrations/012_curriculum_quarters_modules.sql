-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 012 — Replace Curriculum: Quarters & Modules
-- =====================================================
-- Removes old 16-module scaffold, installs the official
-- 13-module Phase 16 curriculum (Q1–Q4 + Advanced Track).
-- Cascade delete clears modules, lessons, and all sub-tables.
-- =====================================================

-- Clear existing seed data (cascades to all child tables)
delete from quarters;

-- =====================================================
-- QUARTERS
-- =====================================================

insert into quarters (quarter_code, name, theme, description, sequence) values
  ('Q1', 'Alpha',    'Identity',          'Establishing kingdom identity, spiritual authority, calling, and life alignment in Christ.', 1),
  ('Q2', 'Formation','Formation',         'Healing the heart, developing spiritual maturity, and building emotional intelligence.',      2),
  ('Q3', 'Practice', 'Practice',          'Deepening spiritual disciplines, discovering mission, and developing kingdom leadership.',    3),
  ('Q4', 'Ministry', 'Ministry',          'Activating assignment, launching ministry, building legacy and multiplying disciples.',      4),
  ('QA', 'Advanced', 'Advanced Formation','Advanced identity work using resurrection architecture for spiritual emergence.',            5);

-- =====================================================
-- MODULES — Q1 Alpha Quarter
-- =====================================================

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q1-01', 'Identity Foundation',
  'Foundational module establishing kingdom identity in Christ. Dismantles performance-based thinking and establishes identity as the foundation for all spiritual growth.',
  1, 1, id,
  ARRAY['Understand identity as foundation', 'Walk in spiritual authority', 'Discern calling', 'Bring life into alignment']
from quarters where quarter_code = 'Q1';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q1-02', 'Timing & Seasons',
  'Teaches students to recognize and navigate God''s seasons, discern His timing, manage their pace, and synchronize with the Holy Spirit''s leading. Addresses burnout and helps establish sustainable rhythms.',
  2, 2, id,
  ARRAY['Recognize their season', 'Discern divine timing', 'Establish sustainable rhythms', 'Develop Spirit-sensitivity']
from quarters where quarter_code = 'Q1';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q1-03', 'Revelation & Application',
  'Capstone module for Q1 that teaches students to hear God''s voice clearly, interpret what He''s saying, test revelation against Scripture, and translate it into daily obedience and lifestyle transformation.',
  3, 3, id,
  ARRAY['Hear God''s voice', 'Interpret correctly', 'Test against Scripture', 'Translate revelation into obedience']
from quarters where quarter_code = 'Q1';

-- =====================================================
-- MODULES — Q2 Formation Quarter
-- =====================================================

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q2-04', 'Inner Healing',
  'Introduction to inner healing ministry and God''s heart for emotional and spiritual wholeness. Students learn that healing is part of redemption, that wounded hearts can be restored, and that God invites us into a journey of deep healing.',
  4, 1, id,
  ARRAY['Understand God as Healer', 'Renounce lies and receive truth', 'Forgive those who wounded them', 'Reclaim identity in Christ']
from quarters where quarter_code = 'Q2';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q2-05', 'Spiritual Maturity',
  'Establishes biblical foundations for spiritual growth: the necessity of intentionality, the role of spiritual disciplines, and God''s design for progressive transformation.',
  5, 2, id,
  ARRAY['Commit to intentional growth', 'Develop discernment', 'Practice radical obedience', 'Build spiritual endurance']
from quarters where quarter_code = 'Q2';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q2-06', 'Emotional Intelligence',
  'Teaches biblical understanding of emotions as God-given, not sinful. Students learn to identify, name, and manage emotions in healthy ways while building long-term emotional resilience.',
  6, 3, id,
  ARRAY['Identify and manage emotions', 'Heal emotional wounds', 'Express emotions healthily', 'Build emotional resilience']
from quarters where quarter_code = 'Q2';

-- =====================================================
-- MODULES — Q3 Practice Quarter
-- =====================================================

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q3-07', 'Spiritual Disciplines',
  'Teaches foundational spiritual disciplines that deepen intimacy with God and cultivate spiritual hunger. Students learn to integrate prayer, Scripture, fasting, and worship into sustainable rhythms.',
  7, 1, id,
  ARRAY['Develop consistent prayer life', 'Meditate on Scripture', 'Practice fasting for breakthrough', 'Integrate worship into daily rhythms']
from quarters where quarter_code = 'Q3';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q3-08', 'Mission & Purpose',
  'Helps students discover their God-given calling, assess their gifts and strengths, overcome obstacles, and activate their mission with clarity and confidence.',
  8, 2, id,
  ARRAY['Discover unique calling', 'Identify spiritual gifts', 'Overcome obstacles to purpose', 'Create actionable mission plans']
from quarters where quarter_code = 'Q3';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q3-09', 'Leadership',
  'Develops leadership capacity starting with self-leadership, then progressing to leading others with humility, stewarding influence wisely, and embracing servant leadership as a lifestyle.',
  9, 3, id,
  ARRAY['Lead themselves with discipline', 'Empower others', 'Steward influence wisely', 'Embrace servant leadership']
from quarters where quarter_code = 'Q3';

-- =====================================================
-- MODULES — Q4 Ministry Quarter
-- =====================================================

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q4-10', 'Purpose & Assignment',
  'Helps students understand their specific Kingdom assignment, receive clear vision and direction, take risks of faith, and obey God courageously.',
  10, 1, id,
  ARRAY['Clarify their assignment', 'Receive vision', 'Step out in faith', 'Obey courageously']
from quarters where quarter_code = 'Q4';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q4-11', 'Ministry & Service',
  'Teaches students to serve with honor and excellence, operate in their spiritual gifts, focus on fruitfulness over busyness, and minister from overflow rather than emptiness.',
  11, 2, id,
  ARRAY['Serve with excellence', 'Deploy spiritual gifts effectively', 'Measure true impact', 'Minister from fullness']
from quarters where quarter_code = 'Q4';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-Q4-12', 'Legacy & Multiplication',
  'Capstone module that helps students embrace their Kingdom calling, develop a multiplication mindset, build a lasting legacy, and commit to finishing well with eternal intentionality.',
  12, 3, id,
  ARRAY['Embrace Kingdom calling', 'Shift to multiplication mindset', 'Build lasting legacy', 'Commit to finishing well']
from quarters where quarter_code = 'Q4';

-- =====================================================
-- MODULES — Advanced Track
-- =====================================================

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id, learning_outcomes)
select 'MOD-ADV-13', 'The Resurrection Identity Protocol',
  'Advanced identity work using the resurrection narrative as architectural map for spiritual formation and identity emergence. Four stages: stone rolled away, guards couldn''t contain, grave couldn''t hold, grave clothes left behind.',
  13, 1, id,
  ARRAY['Recognize when God has shifted their identity', 'Navigate transitions from old to new', 'Experience complete freedom from containment', 'Understand resurrection as identity architecture']
from quarters where quarter_code = 'QA';
