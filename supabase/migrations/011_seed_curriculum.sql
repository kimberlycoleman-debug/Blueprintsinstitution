-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 011 — Seed Quarters and Modules
-- =====================================================
-- Populates the curriculum structure for all 4 quarters
-- and 16 modules. Lessons remain empty for content import.
-- =====================================================

-- =====================================================
-- QUARTERS
-- =====================================================

insert into quarters (quarter_code, name, theme, description, sequence) values
  ('Q1', 'Alpha', 'Identity', 'Discovering Who You Are in Christ — biblical foundation for identity, God''s intentional design, and core identity in Christ.', 1),
  ('Q2', 'Formation', 'Spiritual Maturity', 'Developing Spiritual Maturity and Character — sustainable spiritual practices, emotional health, biblical worldview, and identity in community.', 2),
  ('Q3', 'Maturity', 'Inner Healing', 'Experiencing Inner Healing and Wholeness — inner healing foundations, breaking cycles and strongholds, emotional restoration, and holistic wellness.', 3),
  ('Q4', 'Ministry', 'Activation', 'Stepping Into Calling and Kingdom Assignment — calling discovery, gifts and anointing, ministry launch planning, and commissioning.', 4);

-- =====================================================
-- MODULES (16 total — 4 per quarter)
-- =====================================================

-- Q1: ALPHA / IDENTITY
insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q1-01', 'Identity Foundations', 'Biblical foundation for identity, God''s intentional design, and core identity in Christ.', 1, 1, id
from quarters where quarter_code = 'Q1';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q1-02', 'CliftonStrengths & Spiritual Wiring', 'Discovering your unique strengths and how God designed you.', 2, 2, id
from quarters where quarter_code = 'Q1';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q1-03', 'Biblical Parallels & Purpose Patterns', 'Finding biblical figures who reflect your purpose and identifying life themes.', 3, 3, id
from quarters where quarter_code = 'Q1';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q1-04', 'The Identity Blueprint', 'Creating your comprehensive Identity Blueprint Statement.', 4, 4, id
from quarters where quarter_code = 'Q1';

-- Q2: FORMATION / SPIRITUAL MATURITY
insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q2-05', 'Spiritual Formation & Daily Rhythms', 'Establishing sustainable spiritual practices and disciplines.', 5, 1, id
from quarters where quarter_code = 'Q2';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q2-06', 'Emotional Intelligence & Inner Maturity', 'Growing in self-awareness, emotional health, and relational maturity.', 6, 2, id
from quarters where quarter_code = 'Q2';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q2-07', 'Biblical Worldview & Kingdom Thinking', 'Renewing the mind with biblical truth and kingdom perspective.', 7, 3, id
from quarters where quarter_code = 'Q2';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q2-08', 'Identity in Community', 'Living out identity in authentic community with vulnerability and accountability.', 8, 4, id
from quarters where quarter_code = 'Q2';

-- Q3: MATURITY / HEALING
insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q3-09', 'Inner Healing Foundations', 'Understanding God''s heart for healing and receiving prayer ministry.', 9, 1, id
from quarters where quarter_code = 'Q3';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q3-10', 'Breaking Cycles & Strongholds', 'Breaking generational patterns, spiritual strongholds, and bondage.', 10, 2, id
from quarters where quarter_code = 'Q3';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q3-11', 'Emotional Healing & Restoration', 'Processing grief, overcoming shame, and establishing boundaries.', 11, 3, id
from quarters where quarter_code = 'Q3';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q3-12', 'Wellness & Wholeness', 'Pursuing holistic health in spirit, soul, and body.', 12, 4, id
from quarters where quarter_code = 'Q3';

-- Q4: MINISTRY / ACTIVATION
insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q4-13', 'Calling & Purpose', 'Discovering calling, identifying passions and burdens, creating purpose statement.', 13, 1, id
from quarters where quarter_code = 'Q4';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q4-14', 'Gifts, Anointing & Ministry Expression', 'Identifying spiritual gifts, receiving anointing, and operating in gifts.', 14, 2, id
from quarters where quarter_code = 'Q4';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q4-15', 'Blueprint to Assignment', 'Translating identity and calling into ministry plans with teams and resources.', 15, 3, id
from quarters where quarter_code = 'Q4';

insert into modules (module_code, name, description, module_number, sequence_in_quarter, quarter_id)
select 'MOD-Q4-16', 'Commissioning & Launch', 'Receiving commissioning, sustaining calling, and graduating with celebration.', 16, 4, id
from quarters where quarter_code = 'Q4';
