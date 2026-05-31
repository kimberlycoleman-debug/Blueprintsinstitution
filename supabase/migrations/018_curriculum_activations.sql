-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 018 — Activation Exercises (All 52 Lessons)
-- =====================================================
-- Pattern: Insert into lesson_activations, capture id via CTE,
-- then insert activation_steps referencing that id.
-- Each lesson has one activation with 3–4 steps.
-- =====================================================

-- =====================================================
-- L001 — Identity: Who You Are in the Kingdom
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Kingdom Identity Declaration', 'Students renounce performance-based identity and declare their true kingdom identity aloud.', 20
  from lessons l where l.lesson_code = 'L001'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Write the Lie', 'On an index card, write down the most persistent lie you have believed about your identity—something you''ve agreed with that contradicts who God says you are.', 5 from act union all
select act.id, 2, 'Renounce It Aloud', 'Stand and read the lie aloud, then say: "This is a lie. I renounce this agreement. It has no authority over my identity."', 3 from act union all
select act.id, 3, 'Declare the Truth', 'Flip the card over and write a Scripture-based identity truth on the back. Read it aloud three times with increasing volume and conviction.', 5 from act union all
select act.id, 4, 'Destroy the Lie', 'Tear up or fold away the lie side. Keep the truth side somewhere visible this week.', 2 from act;

-- =====================================================
-- L002 — Authority: What You Carry
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Authority Walk', 'Students practice walking and speaking from a posture of delegated kingdom authority.', 15
  from lessons l where l.lesson_code = 'L002'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Identify Your Sphere', 'Write down three specific areas where God has given you authority—your family, your workplace, your ministry sphere, etc.', 4 from act union all
select act.id, 2, 'Declare Your Authority', 'Stand up and read aloud: "As a kingdom citizen seated with Christ in heavenly realms, I have been given authority over [name your sphere]. I walk in this authority with humility and accountability."', 3 from act union all
select act.id, 3, 'Intercede', 'Pray specifically over each sphere you named, speaking blessing, protection, and kingdom advancement over it from a posture of delegated authority.', 8 from act;

-- =====================================================
-- L003 — Calling: What You're Assigned To
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Calling Discovery Inventory', 'Students identify key calling indicators through structured self-reflection.', 20
  from lessons l where l.lesson_code = 'L003'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Three Questions', 'Write your answers to: (1) What breaks my heart? (2) What makes me come alive? (3) What do others consistently say I am gifted at?', 8 from act union all
select act.id, 2, 'Find the Thread', 'Look at your three answers and circle any repeating themes. Write one sentence: "The thread running through my calling is ______."', 5 from act union all
select act.id, 3, 'Draft a Calling Statement', 'Write a first draft calling statement: "I am called to ______ so that ______." Keep it to one sentence.', 5 from act union all
select act.id, 4, 'Share with a Partner', 'Share your calling statement with one other person. Receive their reflection: "What I hear in this is..."', 2 from act;

-- =====================================================
-- L004 — Alignment: Bringing Your Life Into Agreement
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Life Alignment Audit', 'Students audit key life areas and create a concrete alignment action step.', 20
  from lessons l where l.lesson_code = 'L004'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Score Each Area', 'On a scale of 1–10, score alignment between your kingdom identity/calling and each area: Relationships, Time Use, Finances, Health, Commitments, Mindset.', 5 from act union all
select act.id, 2, 'Identify the Lowest', 'Circle your lowest-scoring area. Write: "This area is misaligned because ______."', 4 from act union all
select act.id, 3, 'Identify One Action', 'Write one specific, concrete step you will take in the next 7 days to bring this area into alignment.', 4 from act union all
select act.id, 4, 'Accountability Commitment', 'Share your one action step with the group and name who will hold you accountable for it.', 7 from act;

-- =====================================================
-- L005 — Understanding Seasons
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Season Identification Exercise', 'Students identify their current spiritual season and what it requires of them.', 15
  from lessons l where l.lesson_code = 'L005'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name Your Season', 'Review the five seasons (planting, growing, pruning, waiting, harvest). Write which season you are in and list three evidences from your life that confirm it.', 6 from act union all
select act.id, 2, 'What This Season Requires', 'Write: "This season is asking me to _______ and to stop ______."', 4 from act union all
select act.id, 3, 'Pray Into the Season', 'Close with a prayer of surrender to the season God has you in, releasing frustration about what it is not and embracing what it is.', 5 from act;

-- =====================================================
-- L006 — Discerning Timing
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Timing Discernment Map', 'Students apply timing indicators to one active decision they are currently facing.', 20
  from lessons l where l.lesson_code = 'L006'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Decision', 'Write one decision you are currently wrestling with timing on.', 2 from act union all
select act.id, 2, 'Run the Indicators', 'Score 1–5 on each timing indicator: Peace (inner), Open Doors (external), Scripture Confirmation, Wise Counsel, Fruit of Movement. Total the scores.', 8 from act union all
select act.id, 3, 'Interpret the Score', 'Below 15: Wait. 15–20: Proceed with prayer. Above 20: Move. Write what this score is telling you.', 5 from act union all
select act.id, 4, 'Commit to a Response', 'Write one sentence: "Based on this discernment, I will _______ regarding this decision."', 5 from act;

-- =====================================================
-- L007 — Pace, Rest, and Capacity
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Capacity Audit & Pruning List', 'Students conduct a capacity audit and identify what to prune.', 20
  from lessons l where l.lesson_code = 'L007'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'List Everything', 'Write every commitment, role, and recurring obligation you currently carry—personal, ministry, professional, relational.', 6 from act union all
select act.id, 2, 'Categorize Each', 'Next to each item write: G (God-given this season), U (Unsure), N (Not mine to carry right now).', 5 from act union all
select act.id, 3, 'Identify One to Release', 'Circle one N item. Write how and when you will step back from it within the next 30 days.', 5 from act union all
select act.id, 4, 'Design a Rest Practice', 'Write one weekly rest practice you will protect starting this week. Name the day, time, and what it will look like.', 4 from act;

-- =====================================================
-- L008 — Walking in Step With the Spirit
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Rule of Life Draft', 'Students draft a personal Rule of Life capturing Spirit-led daily and weekly rhythms.', 20
  from lessons l where l.lesson_code = 'L008'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Morning Anchor', 'Write what your ideal Spirit-led morning will look like: time, practices, duration.', 5 from act union all
select act.id, 2, 'Evening Wind-Down', 'Write what your ideal Spirit-led evening will look like: reflection, prayer, release of the day.', 5 from act union all
select act.id, 3, 'Weekly Rhythm', 'Identify your Sabbath day and two other rhythms you will protect weekly (e.g., fasting, solitude, community).', 5 from act union all
select act.id, 4, 'Name Your One Change', 'Of everything you''ve written, identify the single most important rhythm to implement first. Write it as a commitment: "Starting this week, I will ______."', 5 from act;

-- =====================================================
-- L009 — Hearing God Clearly
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Listening Prayer Exercise', 'Students practice sustained listening prayer and record what they hear.', 20
  from lessons l where l.lesson_code = 'L009'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Settle and Invite', 'Sit in silence. Take three deep breaths. Pray: "Holy Spirit, I quiet my mind and open my heart. Speak, Lord—your servant is listening."', 3 from act union all
select act.id, 2, 'Listen for 10 Minutes', 'Remain in silence for 10 minutes. Write down anything that comes—words, images, scriptures, impressions. Do not filter or evaluate yet.', 10 from act union all
select act.id, 3, 'Review and Discern', 'Review what you wrote. Circle anything that brought peace, aligned with Scripture, or felt like it came from outside yourself.', 4 from act union all
select act.id, 4, 'Share One Impression', 'Share one impression with a partner and receive brief prayer in response.', 3 from act;

-- =====================================================
-- L010 — Interpreting Revelation
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Revelation Interpretation Workshop', 'Students apply an interpretation framework to a dream, vision, or impression they have received.', 20
  from lessons l where l.lesson_code = 'L010'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Describe the Revelation', 'Write a brief description of a dream, vision, or strong impression you have received in the past year.', 4 from act union all
select act.id, 2, 'Ask the Four Questions', 'Answer: (1) What is the dominant emotion or atmosphere? (2) What is the most prominent symbol or image? (3) Does anything here mirror my current situation? (4) What would God say about this?', 8 from act union all
select act.id, 3, 'Identify Literal vs. Symbolic', 'Label each element of your revelation: L (likely literal) or S (likely symbolic). Then interpret each S element.', 5 from act union all
select act.id, 4, 'Write a Summary', 'Write one paragraph: "I believe God is saying _______ through this revelation."', 3 from act;

-- =====================================================
-- L011 — Testing Revelation
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Revelation Testing Lab', 'Students apply the four testing filters to a piece of revelation they currently hold.', 15
  from lessons l where l.lesson_code = 'L011'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'State the Revelation', 'Write down a word, dream, or impression you currently believe may be from God.', 3 from act union all
select act.id, 2, 'Apply Four Filters', 'Score 1–5 on each: Scripture Alignment, Inner Peace, Fruit if Obeyed, Confirmation from Others. Write notes under each.', 8 from act union all
select act.id, 3, 'Verdict and Response', 'Write your conclusion: "I believe this is (from God / my own thoughts / needs more testing / not from God) because ______." Then write your response.', 4 from act;

-- =====================================================
-- L012 — Applying Revelation to Daily Life
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, '30-Day Obedience Plan', 'Students create a concrete obedience plan for one revelation they have received.', 20
  from lessons l where l.lesson_code = 'L012'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Revelation', 'Write one piece of revelation from God that you have received but not yet fully acted on.', 3 from act union all
select act.id, 2, 'Identify the Obedience Gap', 'Write: "I know God said ______ but I have not yet ______ because ______."', 4 from act union all
select act.id, 3, 'Create a 30-Day Plan', 'Write three specific actions—Week 1, Week 2–3, Week 4—that will close the obedience gap.', 8 from act union all
select act.id, 4, 'Accountability', 'Share your plan with one person and ask them to follow up with you at the 30-day mark.', 5 from act;

-- =====================================================
-- L013 — Healing the Heart
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Invitation to Healing Prayer', 'Students invite Jesus into one specific area of unhealed pain through guided prayer.', 20
  from lessons l where l.lesson_code = 'L013'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Wound', 'In your journal, name one area of unhealed pain—a loss, betrayal, trauma, or relational wound you have been carrying.', 4 from act union all
select act.id, 2, 'Invite Jesus In', 'Close your eyes. Imagine bringing that wound to Jesus. Ask: "Lord Jesus, where were you in that moment? What do you want to say to me about it?" Write what you sense.', 10 from act union all
select act.id, 3, 'Receive His Response', 'Read what you wrote. Circle anything that brought comfort, surprise, or tears. These are often the places Jesus is touching.', 3 from act union all
select act.id, 4, 'Declare Your Desire', 'Write: "Lord, I want to be whole in this area. I invite your healing into ______."', 3 from act;

-- =====================================================
-- L014 — Breaking Agreements & Lies
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Lie Renunciation & Truth Activation', 'Students identify, renounce, and replace core lies with Scripture-based truth.', 20
  from lessons l where l.lesson_code = 'L014'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Identify Three Lies', 'Write three lies you have believed—about God, yourself, or others. Trace each lie to where it came from (an experience, a voice, a moment).', 6 from act union all
select act.id, 2, 'Renounce Each Lie', 'For each lie, stand and say aloud: "I renounce the lie that ______. I break this agreement now in the name of Jesus Christ."', 6 from act union all
select act.id, 3, 'Replace with Truth', 'For each lie, write the corresponding biblical truth. Find a specific Scripture verse for at least two of them.', 5 from act union all
select act.id, 4, 'Declare the Truth', 'Read each truth aloud, saying: "The truth is: ______. I receive this as my reality."', 3 from act;

-- =====================================================
-- L015 — Forgiveness & Release
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Forgiveness Prayer Exercise', 'Students walk through a guided forgiveness prayer releasing one person or offense to God.', 20
  from lessons l where l.lesson_code = 'L015'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Person', 'Write the name (or initials) of one person you need to forgive. Name the specific offense.', 3 from act union all
select act.id, 2, 'Acknowledge the Pain', 'Write honestly: "What this did to me was ______. The impact I still carry is ______."', 5 from act union all
select act.id, 3, 'Choose to Forgive', 'Pray aloud: "Lord, I choose to forgive ______ for ______. I release them from my debt. I release the pain to you. I trust you as the just judge."', 7 from act union all
select act.id, 4, 'Declare Your Freedom', 'Write: "I release ______ and I release myself from the prison of unforgiveness. I am free."', 5 from act;

-- =====================================================
-- L016 — Restoring Identity After Wounding
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Identity Restoration Prayer', 'Students receive prayer restoring their God-given identity after wounding.', 20
  from lessons l where l.lesson_code = 'L016'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the False Identity', 'Write the false identity that wounding created: "Because of what happened, I came to believe I was ______."', 5 from act union all
select act.id, 2, 'Renounce the False Self', 'Pray aloud: "I renounce the identity of ______. That is not who God made me. That was a wound speaking, not truth."', 4 from act union all
select act.id, 3, 'Receive Your True Identity', 'Ask God: "Lord, who do YOU say I am?" Write whatever comes. Anchor it to a Scripture.', 7 from act union all
select act.id, 4, 'Declare Your Restored Identity', 'Using your L001 declarations, read them aloud—but this time as someone who has walked through healing, not just received information.', 4 from act;

-- =====================================================
-- L017 — Foundations of Spiritual Growth
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Spiritual Growth Plan Creation', 'Students create a personal spiritual growth plan with three intentional practices.', 20
  from lessons l where l.lesson_code = 'L017'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Assess Your Current Growth', 'Rate yourself 1–10 on five growth indicators: Knowledge of Scripture, Prayer Consistency, Obedience, Community Depth, Service. Total your score.', 5 from act union all
select act.id, 2, 'Identify Your Lowest', 'Circle your lowest score. Write: "My growth is most hindered in ______ because ______."', 4 from act union all
select act.id, 3, 'Design Three Practices', 'Write three specific, repeatable practices that will address your growth gap over the next 90 days.', 7 from act union all
select act.id, 4, 'Share and Commit', 'Share one practice with a partner and commit to a 30-day check-in with them.', 4 from act;

-- =====================================================
-- L018 — Discernment & Wisdom
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Discernment Framework Application', 'Students apply a discernment framework to one current decision or situation.', 20
  from lessons l where l.lesson_code = 'L018'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Situation', 'Write one situation where you are unsure whether something is from God, from yourself, or from the enemy.', 3 from act union all
select act.id, 2, 'Apply the Discernment Grid', 'Evaluate: Does it align with Scripture? Does it produce peace or anxiety? Does it point to Jesus or to self? Does it bear good fruit? Write notes on each.', 10 from act union all
select act.id, 3, 'Seek Input', 'Identify one trusted, spiritually mature person you will share this with before making a decision. Write their name.', 3 from act union all
select act.id, 4, 'Provisional Response', 'Write your provisional response to the situation based on your discernment: "I believe the wise course of action is ______."', 4 from act;

-- =====================================================
-- L019 — Obedience as Formation
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Obedience Inventory', 'Students identify areas of delayed obedience and commit to one immediate step.', 15
  from lessons l where l.lesson_code = 'L019'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'List Areas of Delayed Obedience', 'Write every area where you know God has asked you to do something and you have not yet done it. Be specific.', 5 from act union all
select act.id, 2, 'Identify the Root', 'For each item, write the root of the delay: Fear / Comfort / Unbelief / Busyness / Willfulness.', 4 from act union all
select act.id, 3, 'Choose One to Act On', 'Circle the one God is most pressing you about. Write the first step you can take in the next 24 hours.', 3 from act union all
select act.id, 4, 'Pray and Commit', 'Pray: "Lord, I choose obedience over comfort in this area. I will ______ by [date]. Hold me to this."', 3 from act;

-- =====================================================
-- L020 — Developing Spiritual Strength
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Spiritual Strength Builder', 'Students identify a weak area and create a focused strength-building practice.', 15
  from lessons l where l.lesson_code = 'L020'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Identify Your Weak Area', 'Name the area of spiritual life where you most consistently struggle or give up: Prayer / Scripture / Fasting / Obedience / Community / Endurance under trial.', 3 from act union all
select act.id, 2, 'Trace the Pattern', 'Write: "When I encounter ______, I tend to ______. The root of this pattern seems to be ______."', 5 from act union all
select act.id, 3, 'Build a Micro-Practice', 'Design one small, repeatable daily practice that will build strength in this specific area over 21 days.', 4 from act union all
select act.id, 4, 'Accountability Partner', 'Share your micro-practice with one person and ask them to check in with you in 21 days.', 3 from act;

-- =====================================================
-- L021 — Emotional Awareness
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Emotion Naming Exercise', 'Students practice naming and sitting with a difficult emotion without suppressing or acting on it.', 15
  from lessons l where l.lesson_code = 'L021'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Emotion', 'Think of a situation from the past week that triggered a strong emotional response. Using an emotion wheel, identify the specific emotion—not just "angry" or "sad" but the precise word.', 4 from act union all
select act.id, 2, 'Locate It in Your Body', 'Close your eyes and notice where you feel this emotion physically. Write: "I feel ______ in my ______."', 3 from act union all
select act.id, 3, 'Sit With It', 'Remain with the emotion for 3 minutes without trying to fix, suppress, or spiritualize it away. Just observe it.', 3 from act union all
select act.id, 4, 'Bring It to God', 'Write a three-sentence prayer bringing the emotion honestly to God: "Lord, I feel ______. This matters because ______. I bring this to you."', 5 from act;

-- =====================================================
-- L022 — Regulating Internal States
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Grounding & Regulation Practice', 'Students learn and practice two regulation techniques in real time.', 15
  from lessons l where l.lesson_code = 'L022'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Box Breathing', 'Inhale 4 counts, hold 4 counts, exhale 4 counts, hold 4 counts. Repeat 4 times. Notice what shifts in your body.', 4 from act union all
select act.id, 2, '5-4-3-2-1 Grounding', 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Write them down.', 4 from act union all
select act.id, 3, 'Identify Your Trigger', 'Write one recurring situation that consistently dysregulates you. Identify the earliest memory that feels similar.', 4 from act union all
select act.id, 4, 'Practice Plan', 'Write: "When I feel ______, I will use ______ technique before responding."', 3 from act;

-- =====================================================
-- L023 — Healthy Boundaries
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Boundary-Setting Role Play', 'Students practice assertive boundary-setting language in a realistic scenario.', 20
  from lessons l where l.lesson_code = 'L023'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Identify the Relationship', 'Write one relationship where you consistently over-extend, over-accommodate, or lose yourself.', 3 from act union all
select act.id, 2, 'Write the Boundary', 'Write the specific boundary you need to set: "In this relationship, I need to ______. I am not willing to continue ______."', 5 from act union all
select act.id, 3, 'Practice the Language', 'With a partner, role-play setting the boundary. Use: "I care about this relationship. I also need to be honest: ______. Going forward, I am going to ______."', 8 from act union all
select act.id, 4, 'Commit to the Conversation', 'Write when and how you will have this actual conversation. Share this commitment with your partner.', 4 from act;

-- =====================================================
-- L024 — Relational Maturity
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Relational Inventory & Growth Plan', 'Students assess relational maturity and create a growth plan for one relationship.', 20
  from lessons l where l.lesson_code = 'L024'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Map Your Relationships', 'Draw three circles: Inner (1–3 people), Middle (4–10), Outer (11+). Place key relationships in each circle based on current depth.', 5 from act union all
select act.id, 2, 'Identify One Growth Relationship', 'Choose one relationship God is calling you to invest in more deeply. Write their name and what makes this relationship Kingdom-significant.', 4 from act union all
select act.id, 3, 'Identify Your Pattern', 'Write one recurring pattern in your relationships that has prevented depth or caused damage.', 5 from act union all
select act.id, 4, 'Create a Growth Commitment', 'Write a specific monthly practice for investing in your chosen relationship over the next quarter.', 6 from act;

-- =====================================================
-- L025 — Prayer & Intimacy with God
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Contemplative Prayer Practice', 'Students practice 15 minutes of unstructured listening prayer and design a personal prayer rhythm.', 20
  from lessons l where l.lesson_code = 'L025'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Settle', 'Sit comfortably. Release the agenda. Pray: "Father, I am here. Not to get something—but to be with You."', 2 from act union all
select act.id, 2, 'Listen', 'Remain in silence and receptivity for 10–12 minutes. Write anything that surfaces—words, images, impressions, Scripture.', 12 from act union all
select act.id, 3, 'Review and Respond', 'Read what you wrote. Respond to God in 3–5 sentences about what you noticed.', 3 from act union all
select act.id, 4, 'Design Your Prayer Rhythm', 'Write: morning anchor (time, duration, practices), one weekly extended prayer time, and one monthly retreat hour.', 3 from act;

-- =====================================================
-- L026 — Scripture Meditation & Study
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Lectio Divina Practice', 'Students practice the four movements of Lectio Divina with a selected passage.', 20
  from lessons l where l.lesson_code = 'L026'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Lectio (Read)', 'Read Psalm 23 slowly, aloud, twice. After the second reading, write the word or phrase that stood out most.', 4 from act union all
select act.id, 2, 'Meditatio (Meditate)', 'Sit with the word or phrase. Repeat it slowly. Let it interact with your life. Write what it is touching in you.', 5 from act union all
select act.id, 3, 'Oratio (Pray)', 'Let the meditation become prayer. Write a prayer that flows naturally from what you just received.', 5 from act union all
select act.id, 4, 'Contemplatio (Rest)', 'Release the words. Simply rest in God''s presence for 3 minutes. Afterward, write one word that captures the experience.', 6 from act;

-- =====================================================
-- L027 — Fasting & Spiritual Hunger
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Fast Planning Session', 'Students design a personal fast with a specific prayer focus and timeline.', 15
  from lessons l where l.lesson_code = 'L027'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Identify Your Prayer Focus', 'Write what you are believing God for that requires a heightened level of seeking. Be specific.', 4 from act union all
select act.id, 2, 'Choose Your Fast Type', 'Review the types (full fast, partial fast, Daniel fast, media fast, social fast). Choose one that is realistic for your current capacity.', 4 from act union all
select act.id, 3, 'Set the Parameters', 'Write: start date, end date, what you will abstain from, how often you will pray during the fast, and your prayer focus Scripture.', 5 from act union all
select act.id, 4, 'Share with Accountability', 'Tell one person about your fast (without boasting). Ask them to pray for you during it.', 2 from act;

-- =====================================================
-- L028 — Worship & Spiritual Rhythms
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Rule of Life Completion', 'Students complete a personal Rule of Life integrating all Q3 spiritual disciplines.', 20
  from lessons l where l.lesson_code = 'L028'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Complete the Six Columns', 'Fill in your Rule of Life for: Prayer, Scripture, Fasting, Solitude, Worship, Service—including frequency, duration, and specific practices for each.', 10 from act union all
select act.id, 2, 'Identify Your Anchor Practice', 'Circle the single most important practice that, when consistent, makes all others easier. This is your anchor.', 3 from act union all
select act.id, 3, 'Build the Week', 'Map your six practices onto the days of your week. Be realistic about what each day can hold.', 4 from act union all
select act.id, 4, 'Share and Receive Blessing', 'Share your Rule of Life with the group. Receive prayer that it takes root and bears fruit.', 3 from act;

-- =====================================================
-- L029 — Discovering Your Calling
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Personal Mission Statement Workshop', 'Students draft a personal mission statement through a guided discovery process.', 25
  from lessons l where l.lesson_code = 'L029'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Life Story Thread', 'Write three pivotal moments in your life story that shaped who you are. Look for repeating themes across all three.', 8 from act union all
select act.id, 2, 'The Intersection', 'Write answers to: What breaks my heart? What makes me come alive? What do others confirm in me? Where do I naturally create impact?', 7 from act union all
select act.id, 3, 'Draft the Statement', 'Write a first-draft mission statement using: "I exist to ______ so that ______." Keep it to two sentences max.', 7 from act union all
select act.id, 4, 'Refine with Feedback', 'Share your draft with two people. Receive their reflections. Revise if needed.', 3 from act;

-- =====================================================
-- L030 — Gifts & Strengths Assessment
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Gifts Deployment Plan', 'Students identify their primary gifts and create a 90-day deployment plan.', 20
  from lessons l where l.lesson_code = 'L030'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Self-Assessment', 'Rate yourself 1–5 on each spiritual gift category. Circle your top three.', 5 from act union all
select act.id, 2, 'Community Confirmation', 'Ask two people in the room: "What gifts do you see most strongly operating in me?" Write their answers.', 5 from act union all
select act.id, 3, 'Identify a Deployment Opportunity', 'Write one specific current opportunity where you could exercise your primary gift in the next 30 days.', 5 from act union all
select act.id, 4, 'Create a 90-Day Plan', 'Write: how you will exercise this gift, with whom, and what accountability will look like over 90 days.', 5 from act;

-- =====================================================
-- L031 — Overcoming Obstacles to Purpose
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Obstacle Breakthrough Map', 'Students identify their primary obstacle and create a breakthrough strategy.', 20
  from lessons l where l.lesson_code = 'L031'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name Your Primary Obstacle', 'Of the five obstacles (fear, comparison, lack, opposition, past failure), write which one most consistently stops you. Give a specific example.', 5 from act union all
select act.id, 2, 'Trace the Root', 'Write: "This obstacle was formed when ______. The lie underneath it is ______."', 5 from act union all
select act.id, 3, 'Counter-Strategy', 'For your specific obstacle, write a concrete counter-strategy: the Scripture you will stand on, the action you will take, and who will support you.', 7 from act union all
select act.id, 4, 'Declare Breakthrough', 'Stand and declare aloud: "The obstacle of ______ no longer has authority over my movement. I choose to advance."', 3 from act;

-- =====================================================
-- L032 — Activating Your Mission
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Mission Activation Sprint', 'Students create a concrete mission action plan with 7-day first steps.', 20
  from lessons l where l.lesson_code = 'L032'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'State Your Mission', 'Write your finalized mission statement from L029 at the top of the page.', 2 from act union all
select act.id, 2, 'Identify Three Initiatives', 'List three specific initiatives that would advance your mission in the next 90 days.', 6 from act union all
select act.id, 3, 'SMART First Steps', 'For your top initiative, write three SMART (Specific, Measurable, Achievable, Relevant, Time-bound) action steps for Days 1–7, Days 8–30, and Days 31–90.', 8 from act union all
select act.id, 4, 'Launch Commitment', 'Share your Day 1–7 action with the group and name the date you will begin.', 4 from act;

-- =====================================================
-- L033 — Leading Yourself
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Personal Leadership Scorecard', 'Students create a personal leadership scorecard and a 90-day improvement plan.', 20
  from lessons l where l.lesson_code = 'L033'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Score the Four Domains', 'Rate yourself 1–10 in: Spiritual Health, Emotional Health, Physical Health, Financial Health. Be ruthlessly honest.', 4 from act union all
select act.id, 2, 'Identify the Lowest Domain', 'Circle your lowest score. Write three specific evidences that confirm this score.', 5 from act union all
select act.id, 3, 'Design One Habit', 'For your lowest domain, design one daily habit that, if sustained 90 days, would raise your score by at least 2 points.', 6 from act union all
select act.id, 4, 'Commit Publicly', 'Share your habit with a partner. Agree on a 30-day, 60-day, and 90-day check-in date.', 5 from act;

-- =====================================================
-- L034 — Leading Others
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Delegation & Development Exercise', 'Students identify what they are holding too tightly and practice releasing it.', 20
  from lessons l where l.lesson_code = 'L034'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'List What You Control', 'Write every responsibility, task, or decision you currently own in your sphere of influence.', 5 from act union all
select act.id, 2, 'Identify What to Delegate', 'Circle 2–3 items that could be done by someone else—someone who would grow by doing it.', 4 from act union all
select act.id, 3, 'Name the Person and Plan', 'For each item, write: the person you would hand it to, why they are ready, and how you would equip them to succeed.', 7 from act union all
select act.id, 4, 'Commit to One Delegation', 'Choose one item to hand off this week. Write the conversation you will have.', 4 from act;

-- =====================================================
-- L035 — Influence & Responsibility
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Influence Audit', 'Students audit their sphere of influence and create an integrity commitment.', 20
  from lessons l where l.lesson_code = 'L035'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Map Your Influence', 'List the people and systems most affected by your decisions. Identify your top 3 influence spheres.', 5 from act union all
select act.id, 2, 'Assess Current Impact', 'For each sphere, write: Is my current influence building people up or creating dependency? Is it Kingdom-driven or ego-driven?', 7 from act union all
select act.id, 3, 'Identify Risk Areas', 'Write 2–3 areas where you are most vulnerable to misusing your influence: power, money, recognition, relationships.', 5 from act union all
select act.id, 4, 'Integrity Commitment', 'Write a personal integrity statement covering your highest-risk area. Share it with a trusted accountability partner.', 3 from act;

-- =====================================================
-- L036 — Servant Leadership
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Hidden Service Assignment', 'Students commit to one act of servant leadership done in secret.', 15
  from lessons l where l.lesson_code = 'L036'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Identify a Need', 'Think of one person in your sphere who has a specific, practical need—something you could meet quietly without recognition.', 4 from act union all
select act.id, 2, 'Design the Act', 'Write exactly what you will do, when, and how you will ensure no one knows it was you.', 4 from act union all
select act.id, 3, 'Examine Your Motive', 'Ask honestly: "Am I doing this from love and Kingdom values, or is part of me hoping to be noticed?" Write the honest answer.', 4 from act union all
select act.id, 4, 'Commit and Execute', 'Commit to completing this act of service within the next 48 hours. This is a private commitment between you and God.', 3 from act;

-- =====================================================
-- L037 — Understanding Your Assignment
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Assignment Statement Workshop', 'Students write a specific, season-appropriate Kingdom assignment statement.', 20
  from lessons l where l.lesson_code = 'L037'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Identify the Four Convergences', 'Write your answers to: (1) How has God uniquely made me? (2) What does my story qualify me for? (3) What needs do I see that move me? (4) What is God clearly saying to me now?', 8 from act union all
select act.id, 2, 'Find the Overlap', 'Circle themes that appear in more than one answer. Write: "The convergence point is ______."', 4 from act union all
select act.id, 3, 'Draft Your Assignment', 'Write: "In this season, I am specifically assigned to ______ for ______."', 5 from act union all
select act.id, 4, 'Test and Refine', 'Share with a partner. Receive their question: "Does this feel specific enough? Is there anything missing?" Refine if needed.', 3 from act;

-- =====================================================
-- L038 — Vision & Direction
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Vision Clarification Exercise', 'Students produce a single clear vision sentence for the next 12 months.', 20
  from lessons l where l.lesson_code = 'L038'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Write the Vision You Have', 'Write the vision or direction you sense God has given you, as freely and completely as you can. Do not edit.', 6 from act union all
select act.id, 2, 'Test It', 'Apply four tests: Does it align with Scripture? Does it build the Kingdom or your name? Do you have peace? Has it been confirmed by others?', 5 from act union all
select act.id, 3, 'Distill to One Sentence', 'Reduce your vision to one clear sentence that answers: What am I building, for whom, and why?', 6 from act union all
select act.id, 4, 'Declare It', 'Read your vision sentence aloud to the group as a declaration of faith and direction.', 3 from act;

-- =====================================================
-- L039 — Faith & Risk
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Faith Step Commitment', 'Students identify and commit to one specific faith risk in the next 30 days.', 15
  from lessons l where l.lesson_code = 'L039'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Fear', 'Write one specific thing God has been nudging you toward that fear has prevented you from doing.', 3 from act union all
select act.id, 2, 'Run the Risk Assessment', 'Evaluate: Is there a Scripture for this? Is there peace underneath the fear? Have others confirmed it? Is it reversible if wrong? Score each 1–5.', 5 from act union all
select act.id, 3, 'Define the Step', 'Write the smallest possible first step that would constitute genuine obedience in this area.', 4 from act union all
select act.id, 4, 'Set a Date and Accountability', 'Write: "I will take this step by [date]. [Name] will hold me accountable."', 3 from act;

-- =====================================================
-- L040 — Courage & Obedience
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Courageous Obedience Declaration', 'Students identify delayed obedience and take a first step this week.', 15
  from lessons l where l.lesson_code = 'L040'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Inventory Delayed Obedience', 'Write every area where you know God has asked something of you that you have not done due to fear, doubt, or comfort.', 4 from act union all
select act.id, 2, 'Select the Most Pressing', 'Circle the one God is most pressing you on right now. Write: "I know He is asking me to ______. I have delayed because ______."', 4 from act union all
select act.id, 3, 'Identify the First Step', 'Write one specific, concrete action you can take this week that begins obedience in this area.', 3 from act union all
select act.id, 4, 'Declare Aloud', 'Stand and declare to the group: "I will ______ by [date]. Fear will not stop me."', 4 from act;

-- =====================================================
-- L041 — Serving with Honor
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Secret Service Assignment', 'Students identify and execute one act of hidden, excellent service this week.', 15
  from lessons l where l.lesson_code = 'L041'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Find the Unnoticed Need', 'Identify one specific task, role, or person in your sphere that has gone unserved or unnoticed and where you could add genuine value.', 5 from act union all
select act.id, 2, 'Examine Your Motives', 'Ask: "Would I still do this if no one ever found out? Would I do this with equal excellence if my leader were watching versus if no one was?" Write honestly.', 5 from act union all
select act.id, 3, 'Plan the Excellence', 'Write specifically how you will serve in this area with excellence—what it will look like done at your highest level.', 3 from act union all
select act.id, 4, 'Commit to Execution', 'Write: "I will complete this act of hidden excellence by [date]." This is between you and God.', 2 from act;

-- =====================================================
-- L042 — Spiritual Gifts in Operation
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Live Gifts Deployment', 'Students exercise their primary gift in a low-stakes setting during or following the session.', 20
  from lessons l where l.lesson_code = 'L042'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'State Your Gift', 'Write your top 1–2 spiritual gifts confirmed through self-assessment and community feedback.', 3 from act union all
select act.id, 2, 'Identify the Opportunity', 'Write one person in the room or in your immediate community who could be served by your gift right now.', 3 from act union all
select act.id, 3, 'Deploy', 'Exercise your gift toward that person: pray for them, encourage them, serve them, teach them, or prophesy over them—according to your gift.', 10 from act union all
select act.id, 4, 'Debrief', 'Write: "What did I notice in myself? What fruit did I see in the other person? What do I want to do differently?"', 4 from act;

-- =====================================================
-- L043 — Impact & Fruitfulness
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Depth Investment Plan', 'Students identify 3–5 people to intentionally pour into and create a quarterly investment plan.', 20
  from lessons l where l.lesson_code = 'L043'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Fruitfulness Audit', 'List all your current ministry activities. Rate each 1–10 on actual Kingdom fruit (transformed lives, multiplication, lasting change).', 6 from act union all
select act.id, 2, 'Identify the 3–5', 'Write the names of 3–5 people God is calling you to pour into with depth this season. Why each one?', 5 from act union all
select act.id, 3, 'Design the Investment', 'For each person, write: how often you will meet, what you will pour into them, and what Kingdom outcome you are believing for.', 6 from act union all
select act.id, 4, 'Prune One Commitment', 'Identify one current commitment that produces noise rather than fruit. Write how and when you will release it to make room for depth.', 3 from act;

-- =====================================================
-- L044 — Ministry as Overflow
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Overflow Assessment & Rest Plan', 'Students assess their current ministry posture and create a restoration plan.', 20
  from lessons l where l.lesson_code = 'L044'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Burnout Indicators Check', 'Rate yourself honestly 1–5 on ten burnout indicators: resentment, exhaustion, chronic lateness, cynicism, physical symptoms, prayer dryness, isolation, lost joy, performance anxiety, numbness. Total your score.', 5 from act union all
select act.id, 2, 'What Fills Your Cup', 'Write at least five specific activities, relationships, or experiences that genuinely restore you—not just distract you.', 5 from act union all
select act.id, 3, 'What Drains Your Cup', 'Write the top three current ministry activities or commitments that are draining more than they are producing life.', 4 from act union all
select act.id, 4, 'Design a Rest Plan', 'Create a 30-day restoration plan: one thing daily, one thing weekly, one thing this month that fills your cup.', 6 from act;

-- =====================================================
-- L045 — Kingdom Calling
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Kingdom Calling Statement', 'Students write and declare their comprehensive Kingdom calling statement in community.', 25
  from lessons l where l.lesson_code = 'L045'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Calling Inventory', 'Review your identity (L001), calling (L003), assignment (L037), mission (L029), and vision (L038). Write the through-line: "Across everything I have learned, the Kingdom calling running through me is ______."', 8 from act union all
select act.id, 2, 'Write the Statement', 'Write a comprehensive Kingdom calling statement (3–5 sentences) that integrates identity, gifts, assignment, mission, and legacy.', 8 from act union all
select act.id, 3, 'Refine and Own It', 'Read it silently. Ask: "Does this sound like me? Is it eternity-minded? Is it specific enough to guide decisions?" Revise if needed.', 5 from act union all
select act.id, 4, 'Declare in Community', 'Stand and read your Kingdom calling statement aloud to the group. Receive commissioning prayer.', 4 from act;

-- =====================================================
-- L046 — Multiplication Mindset
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Discipleship Pipeline Design', 'Students create a personal discipleship pipeline and generational impact vision.', 20
  from lessons l where l.lesson_code = 'L046'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Who Poured Into You', 'Name the people who most shaped your spiritual formation. What did they do for you? How have you passed that forward?', 4 from act union all
select act.id, 2, 'Identify Your Paul and Your Timothy', 'Write: Who is your Paul (someone further ahead spiritually pouring into you)? Who are your Timothies (1–3 people you are intentionally equipping)?', 5 from act union all
select act.id, 3, 'Design Your Pipeline', 'Write a 12-month plan for equipping your Timothies: what you will teach, model, release, and celebrate.', 7 from act union all
select act.id, 4, 'Generational Vision', 'Write: "The people I invest in will go on to ______. In 20 years, the Kingdom impact of my investment will include ______."', 4 from act;

-- =====================================================
-- L047 — Building a Lasting Legacy
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Legacy Vision Statement', 'Students write a 20-year legacy vision and evaluate a current decision against it.', 20
  from lessons l where l.lesson_code = 'L047'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'The Funeral Exercise', 'Imagine your memorial service 30 years from now. What do you want people to say? Write three sentences they would speak about your Kingdom impact.', 6 from act union all
select act.id, 2, 'Write Your Legacy Vision', 'Write a legacy vision statement: "In 20 years, I want to have ______ so that ______."', 5 from act union all
select act.id, 3, 'Current Decision Filter', 'Name one current decision you are facing. Ask: "Does this decision move me toward or away from my legacy vision?" Write the honest answer.', 5 from act union all
select act.id, 4, 'Legacy Action Step', 'Write one decision you will make this week that is eternity-minded rather than immediately comfortable.', 4 from act;

-- =====================================================
-- L048 — Finishing Well
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Finishing Well Declaration', 'Students name their primary threats to finishing well and declare their commitment to endurance.', 20
  from lessons l where l.lesson_code = 'L048'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name Your Threats', 'Write your top 3 personal threats to finishing well—the patterns, temptations, or tendencies most likely to derail you.', 5 from act union all
select act.id, 2, 'Design Your Safeguards', 'For each threat, write a specific safeguard: an accountability structure, a spiritual practice, or a community commitment that will protect you.', 7 from act union all
select act.id, 3, 'Articulate Your Transformation', 'Write one paragraph describing who you were when you started and who you are becoming through this curriculum.', 5 from act union all
select act.id, 4, 'Finishing Well Vow', 'Stand and read aloud: "I commit to finishing well. I will not quit, shrink back, or abandon my calling. I will run my race to completion for the glory of God."', 3 from act;

-- =====================================================
-- L049 — The Stone Rolled Away
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Barrier Release Declaration', 'Students identify a removed barrier and take a first step through it.', 20
  from lessons l where l.lesson_code = 'L049'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Barrier', 'Write one external barrier that others assumed would contain you but that God has already removed or is in the process of removing.', 5 from act union all
select act.id, 2, 'Evidence of Removal', 'Write three evidences that this barrier has been rolled away—things you can see, even if small.', 5 from act union all
select act.id, 3, 'Name the Hesitation', 'Write honestly: "Even though the barrier is removed, I have not walked through because ______."', 4 from act union all
select act.id, 4, 'Take the First Step', 'Write one concrete step you will take in the next 7 days that walks through the opened door.', 6 from act;

-- =====================================================
-- L050 — The Guards Couldn't Contain Him
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Jurisdiction Release Prayer', 'Students declare their freedom from expired authority structures.', 20
  from lessons l where l.lesson_code = 'L050'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Old System', 'Write the name or description of an authority structure—a church system, family pattern, professional culture, or relationship dynamic—that has been operating as though it still has jurisdiction over you.', 5 from act union all
select act.id, 2, 'Discern Its Status', 'Ask: Is this still God-ordained authority I am to submit to, or has it expired? Write what you sense and any Scripture that speaks to it.', 6 from act union all
select act.id, 3, 'Declaration Prayer', 'If it has expired, pray aloud: "I declare that ______ no longer has jurisdiction over my identity or direction. I am released. I walk in my new identity free from this system."', 5 from act union all
select act.id, 4, 'Define New Alignment', 'Write what new authority structure or covering you are aligning with in its place.', 4 from act;

-- =====================================================
-- L051 — The Grave Couldn't Hold Him
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Environment Discernment Map', 'Students discern whether God is releasing them from a current environment.', 20
  from lessons l where l.lesson_code = 'L051'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Environment', 'Write one environment—a church, organization, relationship, city, or role—that you sense may have become too small for who you are becoming.', 4 from act union all
select act.id, 2, 'Test the Signal', 'Answer: Is this spiritual discomfort (God stretching you) or a genuine release signal (God moving you)? List the evidences for each column.', 7 from act union all
select act.id, 3, 'Blessing Posture', 'Write what it would look like to leave this environment—if God is releasing you—with honor, blessing, and no bitterness.', 5 from act union all
select act.id, 4, 'Next Steps', 'Write your provisional next step: stay and grow, begin a transition, or seek counsel before deciding.', 4 from act;

-- =====================================================
-- L052 — The Grave Clothes Left Behind
-- =====================================================
with act as (
  insert into lesson_activations (lesson_id, title, purpose, duration_minutes)
  select l.id, 'Solavian Freedom Declaration', 'Students shed old identity markers and declare the Solavian Freedom Declaration as the capstone of their journey.', 25
  from lessons l where l.lesson_code = 'L052'
  returning id
)
insert into activation_steps (activation_id, step_number, title, instructions, duration_minutes)
select act.id, 1, 'Name the Grave Clothes', 'Write 3–5 old identity markers you are ready to shed: labels, fears, narratives from others, limitations you have outgrown.', 6 from act union all
select act.id, 2, 'Renunciation Ritual', 'For each item, say aloud: "I lay down the grave cloth of ______. It does not belong on me anymore. I leave it here."', 6 from act union all
select act.id, 3, 'Declare the New Identity', 'Write your new identity in 5–7 sentences integrating everything you have learned across the full curriculum.', 7 from act union all
select act.id, 4, 'Solavian Freedom Declaration', 'Stand. Read the Solavian Freedom Declaration aloud as the final declaration of your identity transformation journey.', 6 from act;
