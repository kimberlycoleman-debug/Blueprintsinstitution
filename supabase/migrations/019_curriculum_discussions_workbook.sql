-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 019 — Discussion Questions & Workbook Elements
-- (All 52 Lessons)
-- =====================================================
-- lesson_discussions columns:
--   lesson_id, group_type (large_group|small_group|partner|individual),
--   question_number, question_text, facilitator_notes
-- lesson_workbook_elements columns:
--   lesson_id, title, element_type
--   (reflection_prompt|worksheet|fill_in|planning_template|
--    scripture_memory|commitment|assignment),
--   instructions, sequence
-- =====================================================

-- =====================================================
-- L001 — Identity: Who You Are in the Kingdom
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What identity have you been living from that is based on performance, approval, or comparison—rather than what God says about you?', 'Encourage vulnerability. Normalize that everyone operates from false identity at times.' from lessons l where l.lesson_code = 'L001' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share one lie about your identity that you have believed for a long time. Where did it come from? What moment or voice planted it?', 'Watch for emotional activation—this can bring up grief or anger. Create safe space.' from lessons l where l.lesson_code = 'L001' union all
select l.id, 'partner'::discussion_group_type, 3, 'Read your identity declaration to your partner. Have them speak it back to you as if they are God saying it. Notice what you feel.', 'Coach students to receive, not deflect. Practice receiving affirmation is key.' from lessons l where l.lesson_code = 'L001' union all
select l.id, 'individual'::discussion_group_type, 4, 'Write one area of your life where your behavior changes based on who is watching. What does that reveal about where your identity is actually rooted?', null from lessons l where l.lesson_code = 'L001';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'My Current Identity Source', 'worksheet'::workbook_element_type, 'Draw a circle. Label the outside with all the sources you currently derive your sense of worth from (achievements, relationships, roles, appearance, etc.). Label the center with what God''s Word says about you. Notice the gap.', 1 from lessons l where l.lesson_code = 'L001' union all
select l.id, 'Scripture Memory: Ephesians 1:4–5', 'scripture_memory'::workbook_element_type, 'Memorize: "For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ." (Eph 1:4–5 NIV)', 2 from lessons l where l.lesson_code = 'L001' union all
select l.id, 'Identity Declaration', 'commitment'::workbook_element_type, 'Write your personal identity declaration (5–7 sentences) in the first person present tense. Begin with "I am..." for each statement. Base every statement on Scripture.', 3 from lessons l where l.lesson_code = 'L001';

-- =====================================================
-- L002 — Authority: What You Carry
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Where have you been operating as a beggar when you are actually an ambassador? What does that gap look like in your daily life?', 'Help students see practical authority: prayer, speech, choices—not just spiritual warfare.' from lessons l where l.lesson_code = 'L002' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What specific spheres has God given you authority over? How consistently are you exercising that authority in prayer and in practice?', 'Push for specificity—avoid vague "God has given me authority over everything."' from lessons l where l.lesson_code = 'L002' union all
select l.id, 'partner'::discussion_group_type, 3, 'What is one area of your life or sphere where you have been passive when you should have been taking authority? What has that passivity cost?', null from lessons l where l.lesson_code = 'L002';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Authority vs. Passivity Audit', 'worksheet'::workbook_element_type, 'Create two columns: areas where you are actively exercising kingdom authority vs. areas where you have been passive. For each passive area, write what exercising authority would look like.', 1 from lessons l where l.lesson_code = 'L002' union all
select l.id, 'Sphere Authority Prayer', 'assignment'::workbook_element_type, 'This week, pray specifically over each of your three named authority spheres every morning. Write what you are declaring, binding, and releasing over each one.', 2 from lessons l where l.lesson_code = 'L002' union all
select l.id, 'Scripture Memory: Luke 10:19', 'scripture_memory'::workbook_element_type, 'Memorize: "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you." (Luke 10:19 NIV)', 3 from lessons l where l.lesson_code = 'L002';

-- =====================================================
-- L003 — Calling: What You're Assigned To
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between a job, a career, a passion, and a calling? Where do each of those overlap or diverge for you right now?', 'Draw the Venn diagram on board if helpful.' from lessons l where l.lesson_code = 'L003' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What recurring themes keep showing up in your life story that might be pointing toward your calling? What do people consistently say you are gifted at?', 'Encourage listening to each other''s stories for calling signals.' from lessons l where l.lesson_code = 'L003' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share your calling statement draft. Ask your partner: "What words feel most true? What feels like you''re still performing or guessing?"', null from lessons l where l.lesson_code = 'L003';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Calling Discovery Map', 'worksheet'::workbook_element_type, 'Draw four quadrants: (1) What breaks my heart, (2) What makes me come alive, (3) What I am gifted at, (4) What my story qualifies me for. Fill in each quadrant. Circle overlapping themes.', 1 from lessons l where l.lesson_code = 'L003' union all
select l.id, 'Calling Statement Draft', 'fill_in'::workbook_element_type, 'Complete: "I am called to _________________________ so that _________________________. This calling is confirmed by _________________________ (Scripture, community, pattern)."', 2 from lessons l where l.lesson_code = 'L003' union all
select l.id, 'Interview Three People', 'assignment'::workbook_element_type, 'Ask three people who know you well: "What do you see as my strongest Kingdom contribution? When do you see me most alive?" Write their answers verbatim. Look for patterns.', 3 from lessons l where l.lesson_code = 'L003';

-- =====================================================
-- L004 — Alignment: Bringing Your Life Into Agreement
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What does misalignment feel like in your body and spirit? What are the warning signs that your life is drifting out of agreement with your calling?', null from lessons l where l.lesson_code = 'L004' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Which area of your life is most misaligned right now? What has it cost you? What would it cost you to bring it into alignment?', 'Normalize grief over misalignment—this is often where God has been speaking.' from lessons l where l.lesson_code = 'L004' union all
select l.id, 'individual'::discussion_group_type, 3, 'What is one commitment you need to release in order to come into alignment? What are you afraid will happen if you release it?', null from lessons l where l.lesson_code = 'L004';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Life Alignment Scorecard', 'worksheet'::workbook_element_type, 'Rate each area 1–10 for alignment with your Kingdom identity and calling: Time, Finances, Relationships, Commitments, Health, Mindset, Vocation. Write one alignment action next to your lowest three.', 1 from lessons l where l.lesson_code = 'L004' union all
select l.id, 'Alignment Declaration', 'fill_in'::workbook_element_type, 'Complete: "I commit to bringing my ______________ into alignment by ______________. The specific action I will take is ______________.  My accountability partner is ______________."', 2 from lessons l where l.lesson_code = 'L004' union all
select l.id, 'Alignment Prayer', 'reflection_prompt'::workbook_element_type, 'Write a prayer surrendering your misaligned areas to God. Be specific—name each area and what you are releasing to Him.', 3 from lessons l where l.lesson_code = 'L004';

-- =====================================================
-- L005 — Understanding Seasons
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What season are you in right now? How does misidentifying your season lead to frustration, striving, or wasted energy?', 'Validate that most people resist their actual season.' from lessons l where l.lesson_code = 'L005' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a previous season—planting, pruning, or waiting—that you resisted at the time. What did it teach you that you only understood in hindsight?', null from lessons l where l.lesson_code = 'L005' union all
select l.id, 'partner'::discussion_group_type, 3, 'What is your current season asking you to stop doing? What is it asking you to embrace that you''ve been avoiding?', null from lessons l where l.lesson_code = 'L005';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Season Identification', 'fill_in'::workbook_element_type, 'My current season is: ______________. Evidence: (1) ______________ (2) ______________ (3) ______________. What this season requires of me: ______________. What I need to release: ______________.', 1 from lessons l where l.lesson_code = 'L005' union all
select l.id, 'Season-Appropriate Prayer', 'reflection_prompt'::workbook_element_type, 'Write a prayer that specifically honors the season you are in—not asking God to speed up the process, but asking for what you need to thrive in this exact season.', 2 from lessons l where l.lesson_code = 'L005' union all
select l.id, 'Scripture Memory: Ecclesiastes 3:1', 'scripture_memory'::workbook_element_type, 'Memorize: "There is a time for everything, and a season for every activity under the heavens." (Eccl 3:1 NIV)', 3 from lessons l where l.lesson_code = 'L005';

-- =====================================================
-- L006 — Discerning Timing
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between God''s timing and your preference for timing? Where have you confused the two?', 'Help students distinguish between genuine discernment and rationalization.' from lessons l where l.lesson_code = 'L006' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a time you moved too early or too late. What were the signs you missed? What would you look for differently now?', null from lessons l where l.lesson_code = 'L006' union all
select l.id, 'individual'::discussion_group_type, 3, 'What is one decision you have been delaying? Is the delay wisdom—or fear? How do you know the difference?', null from lessons l where l.lesson_code = 'L006';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Timing Discernment Grid', 'worksheet'::workbook_element_type, 'For your current decision: Score each indicator 1–5: (1) Inner peace, (2) Open doors, (3) Scripture confirmation, (4) Wise counsel, (5) Fruit of small steps already taken. Total and interpret.', 1 from lessons l where l.lesson_code = 'L006' union all
select l.id, 'Decision Response Statement', 'fill_in'::workbook_element_type, 'Based on my timing discernment, I believe God is calling me to ______________ by ______________. If I am wrong, I trust Him to redirect me because ______________.', 2 from lessons l where l.lesson_code = 'L006' union all
select l.id, 'Historical Timing Reflection', 'reflection_prompt'::workbook_element_type, 'Write about a time God''s timing proved perfect, even though it felt wrong in the moment. What does that experience teach you about trusting His timing now?', 3 from lessons l where l.lesson_code = 'L006';

-- =====================================================
-- L007 — Pace, Rest, and Capacity
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is driving your pace right now—Kingdom assignment or something else (fear, comparison, people-pleasing)? How can you tell the difference?', null from lessons l where l.lesson_code = 'L007' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What does genuine Sabbath rest look like for you—not just a day off, but true rest that restores your soul? When did you last experience it?', null from lessons l where l.lesson_code = 'L007' union all
select l.id, 'partner'::discussion_group_type, 3, 'What is one thing you are carrying that was never yours to carry? What would it look like to set it down this week?', null from lessons l where l.lesson_code = 'L007';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Commitment Audit', 'worksheet'::workbook_element_type, 'List every current commitment. Categorize each: God-given this season (G), Unclear (U), Not mine to carry (N). Then write one action for each N item.', 1 from lessons l where l.lesson_code = 'L007' union all
select l.id, 'Personal Sabbath Design', 'planning_template'::workbook_element_type, 'Design your Sabbath: Day: ____. Start time: ____. What I will do: ____. What I will not do: ____. What this day will protect me from: ____.', 2 from lessons l where l.lesson_code = 'L007' union all
select l.id, 'Scripture Memory: Matthew 11:28–29', 'scripture_memory'::workbook_element_type, 'Memorize: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me." (Matt 11:28–29 NIV)', 3 from lessons l where l.lesson_code = 'L007';

-- =====================================================
-- L008 — Walking in Step With the Spirit
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the most consistent fruit of walking in step with the Spirit in your life? What does it feel like when you get out of step?', null from lessons l where l.lesson_code = 'L008' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share the rhythm that has been most formative in your spiritual life so far. What made it work? What made it break down?', null from lessons l where l.lesson_code = 'L008' union all
select l.id, 'individual'::discussion_group_type, 3, 'What is the single greatest barrier to consistent Spirit-led rhythm in your current life? What is one practical thing you could do to reduce that barrier?', null from lessons l where l.lesson_code = 'L008';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Rule of Life Draft', 'planning_template'::workbook_element_type, 'Complete your personal Rule of Life: Daily anchor (time, practices, duration). Weekly Sabbath (day, activities). Weekly extended prayer (day, duration). Monthly retreat hour (format). Annual retreat (season, length).', 1 from lessons l where l.lesson_code = 'L008' union all
select l.id, 'Fruit Self-Assessment', 'worksheet'::workbook_element_type, 'Rate yourself 1–10 on each fruit of the Spirit (Galatians 5:22–23): Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, Self-Control. Identify your lowest two and write one practical growth practice for each.', 2 from lessons l where l.lesson_code = 'L008' union all
select l.id, 'Rhythm Commitment', 'commitment'::workbook_element_type, 'Write your one most important rhythm to implement this week. Name the day, time, duration, and what you will do. Sign it as a covenant with God.', 3 from lessons l where l.lesson_code = 'L008';

-- =====================================================
-- L009 — Hearing God Clearly
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How do you know when something is God''s voice versus your own mind? What are your personal markers for distinguishing them?', 'Validate diverse experiences—audible, impressions, Scripture, peace, etc.' from lessons l where l.lesson_code = 'L009' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share one time you clearly heard from God. What were the conditions? What was happening in your life? What made it clear?', null from lessons l where l.lesson_code = 'L009' union all
select l.id, 'partner'::discussion_group_type, 3, 'What makes it difficult for you to hear God? Is it busyness, doubt, unconfessed sin, noise—or something else? What would help you hear more clearly?', null from lessons l where l.lesson_code = 'L009';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Listening Prayer Journal', 'reflection_prompt'::workbook_element_type, 'After your weekly listening prayer times, record: what you heard or sensed, the emotion or atmosphere, any Scripture that arose, and one step of response. Keep this journal for 30 days.', 1 from lessons l where l.lesson_code = 'L009' union all
select l.id, 'Hearing God Inventory', 'worksheet'::workbook_element_type, 'List the five primary ways God has spoken to you historically (Scripture, dreams, impressions, others, creation, circumstances, etc.). Rank them by frequency. Write how you will more intentionally cultivate your top two.', 2 from lessons l where l.lesson_code = 'L009' union all
select l.id, 'Scripture Memory: John 10:27', 'scripture_memory'::workbook_element_type, 'Memorize: "My sheep listen to my voice; I know them, and they follow me." (John 10:27 NIV)', 3 from lessons l where l.lesson_code = 'L009';

-- =====================================================
-- L010 — Interpreting Revelation
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why do you think God often communicates through symbols, dreams, and images rather than direct propositions? What does this require of us?', 'Draw out: relationship, engagement, seeking—revelation rewards pursuit.' from lessons l where l.lesson_code = 'L010' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a dream or vision you have received that you never fully understood. Walk it through the interpretation framework together as a group.', 'Coach facilitators: avoid over-interpreting. The goal is principles, not pronouncements.' from lessons l where l.lesson_code = 'L010' union all
select l.id, 'partner'::discussion_group_type, 3, 'What is the difference between interpreting revelation and projecting your own desires onto what you receive? How do you guard against the latter?', null from lessons l where l.lesson_code = 'L010';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Dream/Vision Journal Entry', 'reflection_prompt'::workbook_element_type, 'Record a recent dream, vision, or strong impression. Apply the four-question framework: dominant emotion, prominent symbol, personal mirror, and what God seems to be saying.', 1 from lessons l where l.lesson_code = 'L010' union all
select l.id, 'Symbol Dictionary', 'worksheet'::workbook_element_type, 'Create a personal symbol dictionary: list 10 recurring images, colors, people types, or scenarios that appear in your dreams or visions. Research biblical meaning for each. Write what they have historically meant in your life.', 2 from lessons l where l.lesson_code = 'L010' union all
select l.id, 'Revelation Summary Statement', 'fill_in'::workbook_element_type, 'For your current most significant piece of revelation: "I believe God is saying ______________ because ______________. My response will be ______________.  I will test this by ______________."', 3 from lessons l where l.lesson_code = 'L010';

-- =====================================================
-- L011 — Testing Revelation
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why is testing revelation not a sign of unbelief? Why is the refusal to test revelation actually more dangerous than the revelation itself?', 'Key insight: testing protects the prophetic, it doesn''t limit it.' from lessons l where l.lesson_code = 'L011' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a time you acted on something you thought was from God that turned out not to be. What did that experience cost you? What did it teach you about testing?', 'Create safety for honest stories of failure. This is common and valuable.' from lessons l where l.lesson_code = 'L011' union all
select l.id, 'individual'::discussion_group_type, 3, 'What revelation are you currently holding that needs testing? Which filter are you most tempted to skip—and why?', null from lessons l where l.lesson_code = 'L011';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Revelation Testing Worksheet', 'worksheet'::workbook_element_type, 'Apply all four filters to one current revelation: (1) Scripture Alignment—does it contradict or align? (2) Peace Test—inner peace or anxiety when I imagine obeying? (3) Fruit Test—what would obedience produce? (4) Confirmation—has anyone else received confirmation? Score each 1–5.', 1 from lessons l where l.lesson_code = 'L011' union all
select l.id, 'Testing Verdict', 'fill_in'::workbook_element_type, 'Based on my testing, I believe this revelation is: ______________ (from God / from self / from enemy / needs more testing). My confidence level is __/10. My next step is ______________.', 2 from lessons l where l.lesson_code = 'L011' union all
select l.id, 'Scripture Memory: 1 John 4:1', 'scripture_memory'::workbook_element_type, 'Memorize: "Dear friends, do not believe every spirit, but test the spirits to see whether they are from God." (1 John 4:1 NIV)', 3 from lessons l where l.lesson_code = 'L011';

-- =====================================================
-- L012 — Applying Revelation to Daily Life
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the most common reason we receive revelation but fail to act on it? How do we distinguish wise patience from disobedient delay?', null from lessons l where l.lesson_code = 'L012' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a piece of revelation you have been sitting on. What would it look like to take one concrete step toward obedience this week?', 'Encourage practical, specific steps—not vague spiritual commitments.' from lessons l where l.lesson_code = 'L012' union all
select l.id, 'partner'::discussion_group_type, 3, 'What does your partner''s revelation suggest about their calling, season, and next steps? Reflect back what you hear to them.', null from lessons l where l.lesson_code = 'L012';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Revelation-to-Obedience Bridge', 'planning_template'::workbook_element_type, 'Write your revelation at the top. Below it: What obedience looks like (specific actions). What is blocking obedience (fear, capacity, timing). What obedience requires you to release. Your 30-day action plan with Week 1/2/3/4 milestones.', 1 from lessons l where l.lesson_code = 'L012' union all
select l.id, 'Obedience Reflection', 'reflection_prompt'::workbook_element_type, 'Write about the last time you obeyed a difficult piece of revelation. What did it cost? What did it produce? How does that history inform your willingness to obey now?', 2 from lessons l where l.lesson_code = 'L012' union all
select l.id, 'Obedience Commitment', 'commitment'::workbook_element_type, 'Write your specific obedience commitment: what you will do, by when, and who will hold you accountable. This is your covenant response to what God has said.', 3 from lessons l where l.lesson_code = 'L012';

-- =====================================================
-- L013 — Healing the Heart
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why do you think Christians sometimes resist inner healing? What theologies, fears, or cultural messages make it feel unnecessary or unsafe?', 'Common resistance: "I should be over this," "Jesus already healed me," "It''s weakness."' from lessons l where l.lesson_code = 'L013' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What area of your heart have you most avoided bringing to God? What has that avoidance cost you in your relationships, ministry, and intimacy with Him?', 'Create deep safety. This may need prayer ministry support.' from lessons l where l.lesson_code = 'L013' union all
select l.id, 'individual'::discussion_group_type, 3, 'Write honestly about the wound you most need healed right now. Not to share—just to acknowledge before God that it is real and you need His touch.', 'This is a personal, private exercise. Do not ask students to share this one.' from lessons l where l.lesson_code = 'L013';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Wound Inventory', 'reflection_prompt'::workbook_element_type, 'Write about the three deepest wounds of your life—what happened, who it involved, what it took from you, and how it has shaped your behavior and beliefs since. This is between you and God.', 1 from lessons l where l.lesson_code = 'L013' union all
select l.id, 'Healing Prayer Record', 'assignment'::workbook_element_type, 'Over the next 30 days, bring one wound to God each week in extended prayer time. Write what you heard, sensed, or received from Him for each one. Record the process, not just the outcome.', 2 from lessons l where l.lesson_code = 'L013' union all
select l.id, 'Scripture Memory: Psalm 147:3', 'scripture_memory'::workbook_element_type, 'Memorize: "He heals the brokenhearted and binds up their wounds." (Psalm 147:3 NIV)', 3 from lessons l where l.lesson_code = 'L013';

-- =====================================================
-- L014 — Breaking Agreements & Lies
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How do lies gain and maintain power in our lives? Why is awareness alone often not enough to break them?', 'Key: agreements give lies authority. Breaking the agreement removes the ground.' from lessons l where l.lesson_code = 'L014' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What lie has most consistently limited your calling and your relationships? Where did you first agree with it?', 'Expect deep sharing—create safety and time for this.' from lessons l where l.lesson_code = 'L014' union all
select l.id, 'partner'::discussion_group_type, 3, 'Speak the truth your partner found over them. Let them receive it. Watch what happens in their face and posture when they receive truth instead of lie.', null from lessons l where l.lesson_code = 'L014';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Lie Renunciation Sheet', 'worksheet'::workbook_element_type, 'Create three columns: The Lie I Have Believed | Where It Came From | The Biblical Truth That Replaces It. Fill in at least three rows. Sign the bottom as a declaration that you are breaking these agreements today.', 1 from lessons l where l.lesson_code = 'L014' union all
select l.id, 'Truth Declarations', 'commitment'::workbook_element_type, 'Write five truth declarations—Scripture-based, first-person, present-tense—that directly counter the lies you renounced. Read these aloud every morning for 30 days.', 2 from lessons l where l.lesson_code = 'L014' union all
select l.id, 'Scripture Memory: John 8:32', 'scripture_memory'::workbook_element_type, 'Memorize: "Then you will know the truth, and the truth will set you free." (John 8:32 NIV)', 3 from lessons l where l.lesson_code = 'L014';

-- =====================================================
-- L015 — Forgiveness & Release
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the relationship between unforgiveness and your spiritual authority? Why does holding offense diminish your Kingdom effectiveness?', 'Unforgiveness is a legal ground for the enemy—not a moral judgment.' from lessons l where l.lesson_code = 'L015' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What is the hardest forgiveness you have ever had to extend? What made it so hard? What did you discover on the other side of it?', 'Keep this at a general level—do not press for victim stories in group setting.' from lessons l where l.lesson_code = 'L015' union all
select l.id, 'individual'::discussion_group_type, 3, 'Who are you still holding in the prison of your unforgiveness? Write their name and what it is costing you to keep them there.', null from lessons l where l.lesson_code = 'L015';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Forgiveness Inventory', 'worksheet'::workbook_element_type, 'List every person you have not fully forgiven. Next to each name: the specific offense, how long you''ve carried it, what releasing them would cost you, and one step toward forgiveness.', 1 from lessons l where l.lesson_code = 'L015' union all
select l.id, 'Forgiveness Letter (Unsent)', 'assignment'::workbook_element_type, 'Write a letter to the person you most need to forgive. Say everything. Then end with: "I choose to forgive you for ______. I release you to God. I release myself from this prison." You do not need to send this—it is for you and God.', 2 from lessons l where l.lesson_code = 'L015' union all
select l.id, 'Scripture Memory: Ephesians 4:31–32', 'scripture_memory'::workbook_element_type, 'Memorize: "Get rid of all bitterness, rage and anger... Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." (Eph 4:31–32 NIV)', 3 from lessons l where l.lesson_code = 'L015';

-- =====================================================
-- L016 — Restoring Identity After Wounding
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How do wounds reshape our identity? What false selves do people construct to survive wounding—and what happens when those false selves start running the show?', null from lessons l where l.lesson_code = 'L016' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What false identity has wounding given you that has felt more real than your God-given identity? How has that false self protected you—and what has it cost you?', null from lessons l where l.lesson_code = 'L016' union all
select l.id, 'partner'::discussion_group_type, 3, 'Speak your partner''s restored identity over them as if you were a prophet delivering the word of the Lord. Let them receive it.', 'This can be deeply powerful. Coach students to take it seriously.' from lessons l where l.lesson_code = 'L016';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Before and After Identity Map', 'worksheet'::workbook_element_type, 'Draw a two-column chart. Left: Who I became because of wounding (false self descriptors). Right: Who God says I am (true identity from Scripture). For each false self descriptor, write the true identity that replaces it.', 1 from lessons l where l.lesson_code = 'L016' union all
select l.id, 'Restored Identity Declaration', 'commitment'::workbook_element_type, 'Write a restored identity declaration—like L001 but informed by your healing journey. Begin each statement with "I am no longer ___. I am ___."', 2 from lessons l where l.lesson_code = 'L016' union all
select l.id, 'Scripture Memory: Isaiah 61:3', 'scripture_memory'::workbook_element_type, 'Memorize: "...a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair." (Isaiah 61:3 NIV)', 3 from lessons l where l.lesson_code = 'L016';

-- =====================================================
-- L017 — Foundations of Spiritual Growth
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between spiritual information and spiritual transformation? Why does accumulating knowledge sometimes actually hinder growth?', null from lessons l where l.lesson_code = 'L017' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What is the soil of your spiritual life right now—hard, shallow, thorny, or fertile? What made it that way? What would it take to cultivate it?', 'Reference the Parable of the Sower—Matthew 13.' from lessons l where l.lesson_code = 'L017' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share your growth plan. Ask your partner: "What is missing? What are you most likely to skip when life gets hard?"', null from lessons l where l.lesson_code = 'L017';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Spiritual Growth Scorecard', 'worksheet'::workbook_element_type, 'Rate yourself 1–10 in: Knowledge (head), Character (heart), Skill (hands), Community (together), Obedience (feet). Identify your lowest score and write a 90-day growth practice for it.', 1 from lessons l where l.lesson_code = 'L017' union all
select l.id, '90-Day Growth Plan', 'planning_template'::workbook_element_type, 'Write your 90-day spiritual growth plan: Primary growth area: ____. Three practices: ____. Frequency: ____. Accountability partner: ____. 30/60/90 day milestones: ____.', 2 from lessons l where l.lesson_code = 'L017' union all
select l.id, 'Scripture Memory: 2 Peter 3:18', 'scripture_memory'::workbook_element_type, 'Memorize: "But grow in the grace and knowledge of our Lord and Savior Jesus Christ." (2 Peter 3:18 NIV)', 3 from lessons l where l.lesson_code = 'L017';

-- =====================================================
-- L018 — Discernment & Wisdom
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between intelligence, insight, and biblical wisdom? How does someone grow in wisdom versus just accumulating information?', null from lessons l where l.lesson_code = 'L018' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a time when you had to choose between what seemed right and what was wise. What made those different? What did you choose, and what was the outcome?', null from lessons l where l.lesson_code = 'L018' union all
select l.id, 'individual'::discussion_group_type, 3, 'Where do you most need wisdom right now? Have you asked God for it specifically, as James 1:5 instructs? What would it mean to actually believe He would give it?', null from lessons l where l.lesson_code = 'L018';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Discernment Case Study', 'worksheet'::workbook_element_type, 'Apply the discernment grid to one current situation: What does Scripture say? What do trusted counselors say? What does peace say? What does the fruit tell you? Write your conclusion.', 1 from lessons l where l.lesson_code = 'L018' union all
select l.id, 'Wisdom Prayer', 'reflection_prompt'::workbook_element_type, 'Write a specific prayer asking God for wisdom in your highest-stakes current decision. Be specific about what you need to see, understand, or know.', 2 from lessons l where l.lesson_code = 'L018' union all
select l.id, 'Scripture Memory: James 1:5', 'scripture_memory'::workbook_element_type, 'Memorize: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you." (James 1:5 NIV)', 3 from lessons l where l.lesson_code = 'L018';

-- =====================================================
-- L019 — Obedience as Formation
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How does each act of obedience form us spiritually—beyond the external outcome? What does obedience do to our character even when nothing visible changes?', null from lessons l where l.lesson_code = 'L019' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share the hardest act of obedience you have ever taken. What did it cost? What did it produce in you—not just around you?', null from lessons l where l.lesson_code = 'L019' union all
select l.id, 'partner'::discussion_group_type, 3, 'Name the area where you are most likely to obey in your own way rather than God''s way. What does your customized obedience look like and why do you prefer it?', null from lessons l where l.lesson_code = 'L019';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Obedience Inventory', 'worksheet'::workbook_element_type, 'List every area where you know God has asked something of you that you have not done. For each: what is the specific ask, how long have you delayed, what is the root of the delay (fear/comfort/unbelief/willfulness), and what is the first step.', 1 from lessons l where l.lesson_code = 'L019' union all
select l.id, 'Obedience Commitment', 'commitment'::workbook_element_type, 'Write your obedience commitment for the area God is most pressing: "I will ______________ by ______________. I am choosing obedience over ______________ (fear/comfort/self). My accountability partner is ______________.', 2 from lessons l where l.lesson_code = 'L019' union all
select l.id, 'Scripture Memory: John 14:15', 'scripture_memory'::workbook_element_type, 'Memorize: "If you love me, keep my commands." (John 14:15 NIV)', 3 from lessons l where l.lesson_code = 'L019';

-- =====================================================
-- L020 — Developing Spiritual Strength
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How is spiritual strength different from spiritual success? Can someone appear successful in ministry while being spiritually weak? What does that look like?', null from lessons l where l.lesson_code = 'L020' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What trial, difficulty, or resistance has done the most to develop spiritual strength in you? What did it teach you that ease could not?', null from lessons l where l.lesson_code = 'L020' union all
select l.id, 'partner'::discussion_group_type, 3, 'What is the one area of spiritual life where you give up most easily? What do you think that weakness is meant to develop in you if you stay?', null from lessons l where l.lesson_code = 'L020';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Strength-Building Micro-Practice', 'planning_template'::workbook_element_type, 'Design a 21-day micro-practice for your weakest spiritual area: Practice name: ____. Daily time commitment: ____ minutes. What I will do: ____. When I want to quit, I will ____. Accountability: ____.', 1 from lessons l where l.lesson_code = 'L020' union all
select l.id, 'Endurance Reflection', 'reflection_prompt'::workbook_element_type, 'Write about a moment you almost quit spiritually. What stopped you? What did staying through that moment produce? How does that history speak to you now?', 2 from lessons l where l.lesson_code = 'L020' union all
select l.id, 'Scripture Memory: Isaiah 40:31', 'scripture_memory'::workbook_element_type, 'Memorize: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." (Isaiah 40:31 NIV)', 3 from lessons l where l.lesson_code = 'L020';

-- =====================================================
-- L021 — Emotional Awareness
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why does the church often suppress emotions rather than honor them? What is the cost to community, leadership, and spiritual formation when we emotionally suppress?', 'Validate that suppression is often theological, not just cultural.' from lessons l where l.lesson_code = 'L021' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What emotion do you most consistently suppress or spiritualize away? What happens when you actually feel it? What are you afraid it will do to you or others?', null from lessons l where l.lesson_code = 'L021' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share a recent situation where you had a strong emotional reaction. Walk through it together: what triggered it, what the emotion was, and what it revealed about an unmet need or unhealed wound.', null from lessons l where l.lesson_code = 'L021';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Emotion Journal (One Week)', 'assignment'::workbook_element_type, 'For one week, journal your emotional experience daily: time, trigger, specific emotion (use emotion wheel for precision), where you felt it in your body, what you did with it, and what it may be pointing to.', 1 from lessons l where l.lesson_code = 'L021' union all
select l.id, 'Emotional Pattern Map', 'worksheet'::workbook_element_type, 'Identify your top 3 emotional patterns: emotion you experience most frequently, emotion you suppress most, emotion that most impacts your decisions. For each, write the root and a growth response.', 2 from lessons l where l.lesson_code = 'L021' union all
select l.id, 'Psalm of Lament', 'reflection_prompt'::workbook_element_type, 'Write your own Psalm of Lament. Begin with the pain. Move through wrestling. End with declaration of trust. This is the biblical template for emotional honesty before God.', 3 from lessons l where l.lesson_code = 'L021';

-- =====================================================
-- L022 — Regulating Internal States
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why does emotional dysregulation undermine spiritual authority and relational effectiveness? What does a dysregulated leader look like—and what does it cost those around them?', null from lessons l where l.lesson_code = 'L022' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What are your top two triggers—situations that most reliably dysregulate you? What is the earliest memory that feels similar? What does that connection tell you?', 'This can surface trauma. Have support available and keep it safe.' from lessons l where l.lesson_code = 'L022' union all
select l.id, 'partner'::discussion_group_type, 3, 'Practice teaching your regulation technique to your partner. Explain what it is, how it works, and when you use it. Teaching it reinforces it.', null from lessons l where l.lesson_code = 'L022';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Regulation Toolkit', 'planning_template'::workbook_element_type, 'Build your personal regulation toolkit: Technique 1 (breathing/grounding): ____. When to use: ____. Technique 2 (movement/sensory): ____. When to use: ____. Trigger map: Top triggers and my response plan for each.', 1 from lessons l where l.lesson_code = 'L022' union all
select l.id, 'Regulation Practice Log', 'assignment'::workbook_element_type, 'For two weeks, log every time you use a regulation technique: situation, trigger, technique used, effectiveness (1–10), and what you noticed. Review at the end for patterns.', 2 from lessons l where l.lesson_code = 'L022' union all
select l.id, 'Scripture Memory: Proverbs 25:28', 'scripture_memory'::workbook_element_type, 'Memorize: "Like a city whose walls are broken through is a person who lacks self-control." (Prov 25:28 NIV)', 3 from lessons l where l.lesson_code = 'L022';

-- =====================================================
-- L023 — Healthy Boundaries
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why do people in ministry so often struggle with boundaries? What theologies, fears, or cultural expectations make boundary-setting feel wrong or selfish?', 'Common resistance: "Sacrificial love means no limits." Challenge this biblically.' from lessons l where l.lesson_code = 'L023' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Where in your life have you been living without healthy limits? What has that cost you—in relationships, health, calling, or integrity?', null from lessons l where l.lesson_code = 'L023' union all
select l.id, 'partner'::discussion_group_type, 3, 'Role-play one boundary conversation. Partner plays the other person (gently resistant, not hostile). Practice clear, kind, and firm language.', 'Coach: boundaries are not walls—they are gates you control.' from lessons l where l.lesson_code = 'L023';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Boundary Map', 'worksheet'::workbook_element_type, 'Map your current boundaries across five areas: Time (when you are available), Energy (what you give and to whom), Emotion (what you absorb), Physical (personal space and health), Digital (availability and tech use). Mark where you have no boundary and need one.', 1 from lessons l where l.lesson_code = 'L023' union all
select l.id, 'Boundary Conversation Script', 'planning_template'::workbook_element_type, 'Write the actual conversation you need to have with one person about one boundary. Include: the relationship, the boundary, the language you will use, how you will handle pushback, and the date you will have it.', 2 from lessons l where l.lesson_code = 'L023' union all
select l.id, 'Scripture Memory: Matthew 5:37', 'scripture_memory'::workbook_element_type, 'Memorize: "All you need to say is simply ''Yes'' or ''No''; anything beyond this comes from the evil one." (Matt 5:37 NIV)', 3 from lessons l where l.lesson_code = 'L023';

-- =====================================================
-- L024 — Relational Maturity
-- =====================================================
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How do immature relational patterns limit Kingdom impact? What does spiritual giftedness without relational maturity produce in a leader?', null from lessons l where l.lesson_code = 'L024' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What recurring relational pattern has followed you across multiple relationships? What does that pattern reveal about you—not about the other people?', 'This requires self-awareness and courage. Facilitate gently.' from lessons l where l.lesson_code = 'L024' union all
select l.id, 'partner'::discussion_group_type, 3, 'Ask your partner: "What do you see as my greatest relational strength? What do you observe as my most limiting relational pattern?" Receive both with openness.', null from lessons l where l.lesson_code = 'L024';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Relationship Inventory', 'worksheet'::workbook_element_type, 'Map your 10 most significant relationships. For each: current health (1–10), what you contribute, what you receive, and one growth area in how you show up in this relationship.', 1 from lessons l where l.lesson_code = 'L024' union all
select l.id, 'Relational Maturity Growth Plan', 'planning_template'::workbook_element_type, 'Identify your top 3 relational patterns to grow in. For each: the pattern, its root, the mature alternative, and one practice that will build the new pattern over 90 days.', 2 from lessons l where l.lesson_code = 'L024' union all
select l.id, 'Scripture Memory: Romans 12:18', 'scripture_memory'::workbook_element_type, 'Memorize: "If it is possible, as far as it depends on you, live at peace with everyone." (Romans 12:18 NIV)', 3 from lessons l where l.lesson_code = 'L024';

-- =====================================================
-- L025–L048: Discussions and workbook elements
-- =====================================================

-- L025
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between praying at God and praying with God? What shifts in you when prayer becomes genuine two-way conversation rather than monologue?', null from lessons l where l.lesson_code = 'L025' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What has been your greatest barrier to consistent, intimate prayer? How have you addressed it—or avoided addressing it?', null from lessons l where l.lesson_code = 'L025' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share one thing you heard or sensed from God during today''s listening prayer time. Let your partner pray in response to what you shared.', null from lessons l where l.lesson_code = 'L025';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Personal Prayer Rhythm Design', 'planning_template'::workbook_element_type, 'Design your full prayer rhythm: Daily morning anchor (time, format, duration). Weekly extended prayer (day, duration, location). Monthly solitude hour (format). Fasting rhythm. Journal: what''s working, what to build next.', 1 from lessons l where l.lesson_code = 'L025' union all
select l.id, 'Prayer Journal', 'assignment'::workbook_element_type, 'Keep a prayer journal for 30 days. Log: date, duration, what you brought, what you heard, and your response. Review at Day 30 for patterns in how God is speaking.', 2 from lessons l where l.lesson_code = 'L025' union all
select l.id, 'Scripture Memory: Psalm 46:10', 'scripture_memory'::workbook_element_type, 'Memorize: "Be still, and know that I am God." (Psalm 46:10 NIV)', 3 from lessons l where l.lesson_code = 'L025';

-- L026
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between studying Scripture and meditating on Scripture? What does each produce? Why does the church often default to the former?', null from lessons l where l.lesson_code = 'L026' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What verse or passage has God used most powerfully in your life? Tell the story of how that happened—not just the verse, but the encounter around it.', null from lessons l where l.lesson_code = 'L026' union all
select l.id, 'individual'::discussion_group_type, 3, 'What would it look like for you to have a genuinely transformative relationship with Scripture—not just a disciplined one? What would need to change?', null from lessons l where l.lesson_code = 'L026';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Lectio Divina Practice Log', 'assignment'::workbook_element_type, 'Practice Lectio Divina three times this week with three different passages. Log each: passage, word that stood out, what it touched in you, your prayer response, and your contemplative word at the end.', 1 from lessons l where l.lesson_code = 'L026' union all
select l.id, 'Scripture Memory Plan', 'planning_template'::workbook_element_type, 'Identify five passages to memorize over the next quarter. Write each verse, the reason it matters to you right now, and your memorization strategy.', 2 from lessons l where l.lesson_code = 'L026' union all
select l.id, 'Scripture Memory: Psalm 119:105', 'scripture_memory'::workbook_element_type, 'Memorize: "Your word is a lamp for my feet, a light on my path." (Psalm 119:105 NIV)', 3 from lessons l where l.lesson_code = 'L026';

-- L027
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why does fasting feel so foreign or extreme to Western Christians? What do we reveal about ourselves in our resistance to it?', null from lessons l where l.lesson_code = 'L027' union all
select l.id, 'small_group'::discussion_group_type, 2, 'If you have fasted before, share what happened—not just the external experience, but what God met you with. If you haven''t, share what stops you.', null from lessons l where l.lesson_code = 'L027' union all
select l.id, 'partner'::discussion_group_type, 3, 'What are you believing God for that feels too big for ordinary prayer? How might fasting create the spiritual focus and breakthrough it requires?', null from lessons l where l.lesson_code = 'L027';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Fast Design Plan', 'planning_template'::workbook_element_type, 'Design your fast: Type of fast: ____. Duration: ____. Prayer focus: ____. Prayer schedule during fast: ____. Scripture anchor: ____. What I will do instead of eating/consuming: ____. Accountability partner: ____.', 1 from lessons l where l.lesson_code = 'L027' union all
select l.id, 'Fasting Reflection', 'reflection_prompt'::workbook_element_type, 'After your fast, write: What did hunger reveal about what I depend on? What did God speak? What shifted in my spirit? What will I do differently?', 2 from lessons l where l.lesson_code = 'L027' union all
select l.id, 'Scripture Memory: Isaiah 58:6', 'scripture_memory'::workbook_element_type, 'Memorize: "Is not this the kind of fasting I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke?" (Isaiah 58:6 NIV)', 3 from lessons l where l.lesson_code = 'L027';

-- L028
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What distinguishes a sustainable spiritual life from a sprint followed by burnout? What does long-term, fruitful discipleship require that short-term intensity does not?', null from lessons l where l.lesson_code = 'L028' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share your Rule of Life with the group. What is hardest to protect? What do you most need the community to hold you accountable to?', null from lessons l where l.lesson_code = 'L028' union all
select l.id, 'partner'::discussion_group_type, 3, 'Ask your partner: "What in your Rule of Life do you think is aspirational but not yet realistic? What is the one practice that, if protected, makes everything else possible?"', null from lessons l where l.lesson_code = 'L028';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Rule of Life (Final)', 'planning_template'::workbook_element_type, 'Complete your full Rule of Life. Six columns: Prayer / Scripture / Fasting / Solitude / Worship / Service. For each: specific practice, frequency, duration, and who holds you accountable.', 1 from lessons l where l.lesson_code = 'L028' union all
select l.id, 'Q3 Integration Reflection', 'reflection_prompt'::workbook_element_type, 'Write: What has this quarter most changed in my spiritual practice? What do I now know about God and myself that I didn''t know before? What do I want to carry forward?', 2 from lessons l where l.lesson_code = 'L028' union all
select l.id, 'Scripture Memory: Hebrews 12:1', 'scripture_memory'::workbook_element_type, 'Memorize: "Let us run with perseverance the race marked out for us." (Hebrews 12:1 NIV)', 3 from lessons l where l.lesson_code = 'L028';

-- L029
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How do you know the difference between the calling God has given you and the calling you have invented for yourself? What are the markers?', null from lessons l where l.lesson_code = 'L029' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a season when you felt most alive and most aligned. What were you doing? Who were you with? What was the Kingdom fruit? What does that tell you about your calling?', null from lessons l where l.lesson_code = 'L029' union all
select l.id, 'partner'::discussion_group_type, 3, 'Read your mission statement draft. Ask your partner: "Does this sound like me? Is there anything in my life story that you see in this that I might be missing?"', null from lessons l where l.lesson_code = 'L029';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Personal Mission Statement', 'fill_in'::workbook_element_type, 'Final draft: "I exist to ______________ so that ______________. I will know I am fulfilling this mission when ______________.  The Scripture that anchors this is ______________."', 1 from lessons l where l.lesson_code = 'L029' union all
select l.id, 'Life Story Timeline', 'worksheet'::workbook_element_type, 'Draw your life story as a timeline. Mark significant moments—highs, lows, turns. Above the line: what God produced. Below the line: what you lost or survived. Look for the thread God has been weaving.', 2 from lessons l where l.lesson_code = 'L029' union all
select l.id, 'Scripture Memory: Jeremiah 29:11', 'scripture_memory'::workbook_element_type, 'Memorize: "''For I know the plans I have for you,'' declares the Lord, ''plans to prosper you and not to harm you, plans to give you hope and a future.''" (Jer 29:11 NIV)', 3 from lessons l where l.lesson_code = 'L029';

-- L030
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between a talent, a strength, and a spiritual gift? Why does deploying your spiritual gift feel categorically different from doing something you are just good at?', null from lessons l where l.lesson_code = 'L030' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Speak into one another''s gifts. Tell each person in your group: "The gift I most clearly see in you is ______ and here is what it looks like when it''s operating."', 'This is powerful—most people have never had their gifts spoken over them explicitly.' from lessons l where l.lesson_code = 'L030' union all
select l.id, 'individual'::discussion_group_type, 3, 'Where is your primary gift currently underdeployed—dormant, misapplied, or exercised without Kingdom intentionality? What would it look like at full expression?', null from lessons l where l.lesson_code = 'L030';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Gifts Assessment Results', 'worksheet'::workbook_element_type, 'Record your top 3 spiritual gifts with scores. For each: how it has operated in my past, where it is currently deployed, where I sense God is calling me to exercise it more intentionally.', 1 from lessons l where l.lesson_code = 'L030' union all
select l.id, '90-Day Gifts Deployment Plan', 'planning_template'::workbook_element_type, 'Primary gift: ____. Deployment opportunity: ____. What I will do: ____. With whom: ____. How I will measure fruit: ____. Accountability: ____. 30/60/90 day milestones: ____.', 2 from lessons l where l.lesson_code = 'L030' union all
select l.id, 'Scripture Memory: 1 Peter 4:10', 'scripture_memory'::workbook_element_type, 'Memorize: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God''s grace in its various forms." (1 Pet 4:10 NIV)', 3 from lessons l where l.lesson_code = 'L030';

-- L031
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Which obstacle to purpose do you most commonly face? Why do you think this particular obstacle has been a recurring theme in your life?', null from lessons l where l.lesson_code = 'L031' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a breakthrough you have already experienced over one of these obstacles. What happened? What shifted? What can the group learn from your story?', null from lessons l where l.lesson_code = 'L031' union all
select l.id, 'partner'::discussion_group_type, 3, 'Pray specifically for your partner''s breakthrough. Name the obstacle, the lie underneath it, and declare the breakthrough over them.', null from lessons l where l.lesson_code = 'L031';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Obstacle Analysis', 'worksheet'::workbook_element_type, 'For your primary obstacle: Name it. Trace it to origin. Name the lie underneath it. Write the biblical truth that breaks it. Write the counter-strategy. Identify your support team for the breakthrough.', 1 from lessons l where l.lesson_code = 'L031' union all
select l.id, 'Breakthrough Declaration', 'commitment'::workbook_element_type, 'Write a personal breakthrough declaration over your primary obstacle. Read it daily for 30 days. Include the obstacle, the lie being broken, the truth you are standing on, and the action you are taking.', 2 from lessons l where l.lesson_code = 'L031' union all
select l.id, 'Scripture Memory: Philippians 4:13', 'scripture_memory'::workbook_element_type, 'Memorize: "I can do all this through him who gives me strength." (Phil 4:13 NIV)', 3 from lessons l where l.lesson_code = 'L031';

-- L032
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between a vision and a plan? Why does having a vision without a plan produce frustration, and a plan without a vision produce emptiness?', null from lessons l where l.lesson_code = 'L032' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share your mission activation plan. Where are you most excited? Where are you most afraid? Let the group speak into both.', null from lessons l where l.lesson_code = 'L032' union all
select l.id, 'partner'::discussion_group_type, 3, 'Ask your partner: "What is the one thing that would most accelerate your mission in the next 90 days? What is the one thing most likely to derail it?"', null from lessons l where l.lesson_code = 'L032';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Mission Activation Plan', 'planning_template'::workbook_element_type, 'Write your mission at the top. Three initiatives below it. For your top initiative: Day 1–7 actions, Day 8–30 milestones, Day 31–90 outcomes. Resources needed. Who can help. Launch date.', 1 from lessons l where l.lesson_code = 'L032' union all
select l.id, 'Mission Progress Journal', 'assignment'::workbook_element_type, 'For 90 days, journal weekly: What did I do to advance my mission this week? What worked? What didn''t? What did God say? What is my focus for next week?', 2 from lessons l where l.lesson_code = 'L032' union all
select l.id, 'Scripture Memory: Habakkuk 2:2', 'scripture_memory'::workbook_element_type, 'Memorize: "Write down the revelation and make it plain on tablets so that a herald may run with it." (Hab 2:2 NIV)', 3 from lessons l where l.lesson_code = 'L032';

-- L033
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the connection between self-leadership and organizational leadership? Why does every external leadership problem trace back to an internal leadership deficit?', null from lessons l where l.lesson_code = 'L033' union all
select l.id, 'small_group'::discussion_group_type, 2, 'In which domain (spiritual, emotional, physical, financial) are you leading yourself best? In which are you leading yourself most poorly? Be specific.', null from lessons l where l.lesson_code = 'L033' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share your personal leadership scorecard with your partner. Ask them: "Does this score match what you observe in me? What am I not seeing about myself?"', null from lessons l where l.lesson_code = 'L033';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Personal Leadership Scorecard', 'worksheet'::workbook_element_type, 'Score 1–10 in: Spiritual Health / Emotional Health / Physical Health / Financial Health / Relational Health. For your lowest two: three specific evidences, one growth habit, one accountability structure.', 1 from lessons l where l.lesson_code = 'L033' union all
select l.id, '90-Day Self-Leadership Plan', 'planning_template'::workbook_element_type, 'Focus domain: ____. Current score: __/10. Target score: __/10. Daily habit: ____. Weekly practice: ____. 30/60/90 day check-in milestones. Accountability partner and frequency.', 2 from lessons l where l.lesson_code = 'L033' union all
select l.id, 'Scripture Memory: 1 Corinthians 9:27', 'scripture_memory'::workbook_element_type, 'Memorize: "No, I strike a blow to my body and make it my slave so that after I have preached to others, I myself will not be disqualified for the prize." (1 Cor 9:27 NIV)', 3 from lessons l where l.lesson_code = 'L033';

-- L034
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why do leaders who are insecure tend to control rather than develop? What does the security required to truly empower others come from?', null from lessons l where l.lesson_code = 'L034' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Who invested in you as a leader? What specifically did they do that made the difference? How are you passing that forward?', null from lessons l where l.lesson_code = 'L034' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share the person you are going to delegate to and what you''re going to hand off. Ask your partner: "What do you think will be hardest about letting this go? What is the fear underneath holding on?"', null from lessons l where l.lesson_code = 'L034';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Delegation Plan', 'planning_template'::workbook_element_type, 'Identify 3 items to delegate this quarter. For each: What it is. Who will receive it. Why they are ready. How you will equip them. How you will release without micromanaging. What you will do with the time/energy freed.', 1 from lessons l where l.lesson_code = 'L034' union all
select l.id, 'People Development Inventory', 'worksheet'::workbook_element_type, 'List 5 people in your sphere. For each: their current capacity, their ceiling without investment, what investing in them would cost you, and what Kingdom fruit it could produce.', 2 from lessons l where l.lesson_code = 'L034' union all
select l.id, 'Scripture Memory: 2 Timothy 2:2', 'scripture_memory'::workbook_element_type, 'Memorize: "And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others." (2 Tim 2:2 NIV)', 3 from lessons l where l.lesson_code = 'L034';

-- L035
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between influence earned and influence taken? What does Kingdom influence require that positional authority does not?', null from lessons l where l.lesson_code = 'L035' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Where are you most vulnerable to misusing the influence God has given you? What are the conditions that make you most susceptible?', 'Create safety—this requires honest self-awareness that most avoid.' from lessons l where l.lesson_code = 'L035' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share your integrity commitment. Ask your partner to read it back to you, then to ask: "Do you actually believe you''ll keep this? What would make you break it?"', null from lessons l where l.lesson_code = 'L035';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Influence Integrity Statement', 'commitment'::workbook_element_type, 'Write a personal integrity statement covering your three highest-risk influence areas. Include: the risk, what accountability looks like, and what you will do if you violate this commitment.', 1 from lessons l where l.lesson_code = 'L035' union all
select l.id, 'Accountability Structure Design', 'planning_template'::workbook_element_type, 'Design your accountability structure: Who holds you accountable (name, relationship). Meeting frequency. What they have permission to ask. What you are giving them access to (finances, relationships, ministry decisions, private life).', 2 from lessons l where l.lesson_code = 'L035' union all
select l.id, 'Scripture Memory: Luke 16:10', 'scripture_memory'::workbook_element_type, 'Memorize: "Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much." (Luke 16:10 NIV)', 3 from lessons l where l.lesson_code = 'L035';

-- L036
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the connection between servant leadership and spiritual authority? Why does the one who serves most wield the greatest Kingdom influence?', null from lessons l where l.lesson_code = 'L036' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Who has modeled servant leadership for you? What did they do that others with the same position did not? What did their example produce in you?', null from lessons l where l.lesson_code = 'L036' union all
select l.id, 'individual'::discussion_group_type, 3, 'What position, recognition, or role are you more attached to than you realize? What would it feel like—really feel like—to serve anonymously and excellently in that area?', null from lessons l where l.lesson_code = 'L036';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Hidden Service Record', 'assignment'::workbook_element_type, 'Over the next month, complete three acts of hidden service—done anonymously, with excellence, not to be seen. Journal each one: what you did, what you noticed in your motives, and what God said.', 1 from lessons l where l.lesson_code = 'L036' union all
select l.id, 'Servant Leadership Reflection', 'reflection_prompt'::workbook_element_type, 'Write about the leader you want to be in five years. Specifically describe how they serve, how they lead, and who has been lifted by their leadership. Then write: what needs to change in you right now to become that person.', 2 from lessons l where l.lesson_code = 'L036' union all
select l.id, 'Scripture Memory: Mark 10:45', 'scripture_memory'::workbook_element_type, 'Memorize: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many." (Mark 10:45 NIV)', 3 from lessons l where l.lesson_code = 'L036';

-- L037
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How do you distinguish between your general calling (L003) and your specific seasonal assignment (L037)? What happens when you confuse the two?', null from lessons l where l.lesson_code = 'L037' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share your current assignment statement. Ask the group: "Does this feel season-specific? Is it specific enough to actually guide decisions? What''s missing?"', null from lessons l where l.lesson_code = 'L037' union all
select l.id, 'partner'::discussion_group_type, 3, 'Ask your partner: "Given your history, your gifts, your current season, and what God has been saying—does your assignment statement feel true? Does it sound like you?"', null from lessons l where l.lesson_code = 'L037';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Seasonal Assignment Map', 'worksheet'::workbook_element_type, 'Draw four quadrants: (1) How God made me, (2) What my story qualifies me for, (3) What needs I see that move me, (4) What God is clearly saying now. Write your assignment statement in the center where all four overlap.', 1 from lessons l where l.lesson_code = 'L037' union all
select l.id, 'Assignment Statement', 'fill_in'::workbook_element_type, '"In this season, I am specifically assigned to ______________ for ______________. Evidence: (1) ______________ (2) ______________ (3) ______________. Scripture anchor: ______________."', 2 from lessons l where l.lesson_code = 'L037' union all
select l.id, 'Scripture Memory: Esther 4:14', 'scripture_memory'::workbook_element_type, 'Memorize: "And who knows but that you have come to your royal position for such a time as this?" (Esther 4:14 NIV)', 3 from lessons l where l.lesson_code = 'L037';

-- L038
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between a dream you manufacture and a vision God plants? How do you know which you are carrying?', null from lessons l where l.lesson_code = 'L038' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share your vision sentence. Is it truly from God—or is it you, slightly amplified? How do you know?', null from lessons l where l.lesson_code = 'L038' union all
select l.id, 'partner'::discussion_group_type, 3, 'Ask your partner: "What would it take to make this vision a reality? Who needs to be involved? What is the first thing that needs to happen?"', null from lessons l where l.lesson_code = 'L038';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Vision Clarification Document', 'worksheet'::workbook_element_type, 'Write your vision at the top. Below it: The problem it addresses. The people it serves. The Kingdom outcome. The 3-year target. The 1-year first milestone. What success looks like.', 1 from lessons l where l.lesson_code = 'L038' union all
select l.id, 'Vision Declaration', 'commitment'::workbook_element_type, 'Write your vision as a faith declaration: "I believe God has given me a vision to ______________ by ______________. I commit to pursuing this vision with ______________ (boldness/patience/wisdom). I trust God with the outcome."', 2 from lessons l where l.lesson_code = 'L038' union all
select l.id, 'Scripture Memory: Proverbs 29:18', 'scripture_memory'::workbook_element_type, 'Memorize: "Where there is no revelation, people cast off restraint; but blessed is the one who heeds wisdom''s instruction." (Prov 29:18 NIV)', 3 from lessons l where l.lesson_code = 'L038';

-- L039
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between recklessness and faith? How do you take a genuine faith risk without being naive or irresponsible?', null from lessons l where l.lesson_code = 'L039' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share the faith step you are facing right now. What makes it a risk? What does fear whisper? What does faith say?', null from lessons l where l.lesson_code = 'L039' union all
select l.id, 'partner'::discussion_group_type, 3, 'Pray specifically for your partner''s faith step. Ask God to replace fear with courage, to open the doors that need opening, and to give them a clear first step.', null from lessons l where l.lesson_code = 'L039';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Faith Step Risk Assessment', 'worksheet'::workbook_element_type, 'Name the faith step. Apply the five tests: Scripture alignment, inner peace, fruit of small steps, counsel confirmation, reversibility if wrong. Score each 1–5. Interpret your total.', 1 from lessons l where l.lesson_code = 'L039' union all
select l.id, 'Faith Step Commitment', 'commitment'::workbook_element_type, '"I believe God is calling me to ______________ as a step of faith. My fear says ______________ but my faith says ______________. I will take this step by ______________. If I am wrong, I trust God to redirect me."', 2 from lessons l where l.lesson_code = 'L039' union all
select l.id, 'Scripture Memory: Hebrews 11:1', 'scripture_memory'::workbook_element_type, 'Memorize: "Now faith is confidence in what we hope for and assurance about what we do not see." (Hebrews 11:1 NIV)', 3 from lessons l where l.lesson_code = 'L039';

-- L040
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the relationship between courage and obedience? Is obedience always courageous, or only when it costs you something? What makes the difference?', null from lessons l where l.lesson_code = 'L040' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share the act of courageous obedience you are most avoiding right now. What is the cost of taking it? What is the cost of continuing to delay?', null from lessons l where l.lesson_code = 'L040' union all
select l.id, 'partner'::discussion_group_type, 3, 'Stand facing your partner. Read your courageous obedience declaration to them. Let them be a witness to your commitment.', null from lessons l where l.lesson_code = 'L040';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Courageous Obedience Map', 'worksheet'::workbook_element_type, 'List every area of delayed obedience. For each: what God asked, how long you have delayed, the cost of delay, the root of delay, and the first step. Rank them by urgency.', 1 from lessons l where l.lesson_code = 'L040' union all
select l.id, 'Courageous Obedience Declaration', 'commitment'::workbook_element_type, '"I choose courageous obedience in the area of ______________. Fear has kept me from ______________ for ______________. Starting ______________, I will ______________ regardless of outcome."', 2 from lessons l where l.lesson_code = 'L040' union all
select l.id, 'Scripture Memory: Joshua 1:9', 'scripture_memory'::workbook_element_type, 'Memorize: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." (Joshua 1:9 NIV)', 3 from lessons l where l.lesson_code = 'L040';

-- L041
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between serving with honor and serving out of obligation? How do you cultivate a heart that serves excellently when no one is watching?', null from lessons l where l.lesson_code = 'L041' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Where in your service has attitude or motive been the real issue rather than action? What did that reveal about where your honor was actually rooted?', null from lessons l where l.lesson_code = 'L041' union all
select l.id, 'individual'::discussion_group_type, 3, 'What is one area where you serve visibly and excellently—but your hidden service is lacking? What is God saying about the gap between the two?', null from lessons l where l.lesson_code = 'L041';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Honor Self-Assessment', 'worksheet'::workbook_element_type, 'Rate yourself 1–10 on: Service attitude when unrecognized. Excellence in small tasks. Consistency when leadership is absent. Response to correction. Willingness to serve those with no ability to repay. Write one specific growth commitment for your lowest score.', 1 from lessons l where l.lesson_code = 'L041' union all
select l.id, 'Service Excellence Plan', 'planning_template'::workbook_element_type, 'Identify one area to serve with exceptional excellence this month. Define what "excellent" looks like. Identify any attitude barriers. Write how you will measure fruit. Commit to a 30-day practice of excellence in this area.', 2 from lessons l where l.lesson_code = 'L041' union all
select l.id, 'Scripture Memory: Colossians 3:23', 'scripture_memory'::workbook_element_type, 'Memorize: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." (Col 3:23 NIV)', 3 from lessons l where l.lesson_code = 'L041';

-- L042
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'Why do spiritual gifts atrophy when not used? What does consistent deployment of gifts do to a person''s spiritual confidence and Kingdom impact?', null from lessons l where l.lesson_code = 'L042' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a moment when you exercised your spiritual gift and could feel it operating. What happened? What did you notice in yourself and in the other person?', null from lessons l where l.lesson_code = 'L042' union all
select l.id, 'partner'::discussion_group_type, 3, 'Exercise your gift toward your partner right now. If it is prophecy, speak. If it is teaching, share. If it is healing, pray. If it is encouragement, encourage deeply and specifically.', null from lessons l where l.lesson_code = 'L042';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Gifts Deployment Log', 'assignment'::workbook_element_type, 'Over the next 30 days, deploy your primary gift intentionally at least 10 times. Log each: situation, how you exercised the gift, fruit observed, and what you learned. Review at Day 30.', 1 from lessons l where l.lesson_code = 'L042' union all
select l.id, 'Gift Development Plan', 'planning_template'::workbook_element_type, 'Primary gift: ____. Current level: ____. What full expression looks like: ____. Three practices to develop it: ____. Who will mentor me in this gift: ____. 6-month growth target: ____.', 2 from lessons l where l.lesson_code = 'L042' union all
select l.id, 'Scripture Memory: Romans 12:6', 'scripture_memory'::workbook_element_type, 'Memorize: "We have different gifts, according to the grace given to each of us. If your gift is prophesying, then prophesy in accordance with your faith." (Romans 12:6 NIV)', 3 from lessons l where l.lesson_code = 'L042';

-- L043
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between activity and fruitfulness? How can you be extremely busy in ministry and yet produce very little lasting fruit?', null from lessons l where l.lesson_code = 'L043' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Name someone whose investment in you produced lasting Kingdom fruit. What did they do that produced that outcome? What specific practices or approaches made their investment powerful?', null from lessons l where l.lesson_code = 'L043' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share the names of the 3–5 people you are going to invest in. Tell your partner who they are and why God has put them on your heart.', null from lessons l where l.lesson_code = 'L043';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Fruitfulness Audit', 'worksheet'::workbook_element_type, 'List all current ministry activities. For each: time invested per week, people impacted, depth of transformation, and lasting Kingdom fruit (1–10). Identify what to prune and what to amplify.', 1 from lessons l where l.lesson_code = 'L043' union all
select l.id, 'Depth Investment Plan', 'planning_template'::workbook_element_type, 'Name your 3–5 investment people. For each: their current state, Kingdom potential, what you will pour into them, how often you will meet, what outcomes you believe for, and 12-month milestones.', 2 from lessons l where l.lesson_code = 'L043' union all
select l.id, 'Scripture Memory: John 15:16', 'scripture_memory'::workbook_element_type, 'Memorize: "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last." (John 15:16 NIV)', 3 from lessons l where l.lesson_code = 'L043';

-- L044
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the earliest sign that ministry has shifted from overflow to depletion for you personally? What does your early warning system look like?', null from lessons l where l.lesson_code = 'L044' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share honestly: are you currently ministering from overflow or from emptiness? What got you to where you are now? What would it take to restore your cup?', 'Create radical safety here—many ministry leaders are running on empty and unable to say so.' from lessons l where l.lesson_code = 'L044' union all
select l.id, 'partner'::discussion_group_type, 3, 'Pray for your partner''s restoration. Ask God to fill what has been emptied, to heal what ministry has wounded, and to renew their first love for Him above all else.', null from lessons l where l.lesson_code = 'L044';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Burnout Indicators Assessment', 'worksheet'::workbook_element_type, 'Rate yourself 1–5 on 10 burnout indicators: Resentment / Exhaustion / Cynicism / Lost joy / Prayer dryness / Isolation / Chronic lateness / Performance anxiety / Physical symptoms / Numbness. Total your score. Interpret: 10–20 healthy, 21–35 caution, 36–50 urgent intervention needed.', 1 from lessons l where l.lesson_code = 'L044' union all
select l.id, '30-Day Restoration Plan', 'planning_template'::workbook_element_type, 'Daily restoration practice: ____. Weekly cup-filling activity: ____. One commitment to release this month: ____. One person to share this honestly with: ____. What I will say no to: ____. What I will say yes to: ____.', 2 from lessons l where l.lesson_code = 'L044' union all
select l.id, 'Scripture Memory: Isaiah 40:29', 'scripture_memory'::workbook_element_type, 'Memorize: "He gives strength to the weary and increases the power of the weak." (Isaiah 40:29 NIV)', 3 from lessons l where l.lesson_code = 'L044';

-- L045
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between a career calling, a ministry calling, and a Kingdom calling? Why does collapsing these three lead to confusion about your life''s purpose?', null from lessons l where l.lesson_code = 'L045' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Read your Kingdom calling statement to the group. Ask them: "What do you hear in this that I might be undervaluing? What sounds most true to who you know me to be?"', null from lessons l where l.lesson_code = 'L045' union all
select l.id, 'large_group'::discussion_group_type, 3, 'As a cohort, stand and read your Kingdom calling statements together. Then pray for one another in pairs that each person would walk fully and boldly in the calling God has given them.', 'This is a significant communal moment—give it time and weight.' from lessons l where l.lesson_code = 'L045';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Kingdom Calling Integration', 'worksheet'::workbook_element_type, 'Create a one-page integration document bringing together: Identity (L001), Calling (L003), Assignment (L037), Mission (L029), Vision (L038), Gifts (L030), Legacy (L047 preview). Write the through-line that ties them all together.', 1 from lessons l where l.lesson_code = 'L045' union all
select l.id, 'Kingdom Calling Statement (Final)', 'commitment'::workbook_element_type, 'Write your final, comprehensive Kingdom calling statement—3 to 5 sentences covering identity, assignment, mission, and legacy. This is your governing document for all major decisions going forward.', 2 from lessons l where l.lesson_code = 'L045' union all
select l.id, 'Scripture Memory: Ephesians 2:10', 'scripture_memory'::workbook_element_type, 'Memorize: "For we are God''s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." (Eph 2:10 NIV)', 3 from lessons l where l.lesson_code = 'L045';

-- L046
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the difference between addition and multiplication in Kingdom work? Why does most ministry default to addition—and what would it take to shift to multiplication?', null from lessons l where l.lesson_code = 'L046' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Name your Timothy—the person you are currently most responsible for equipping. What are you actually pouring into them? Is it enough? Is it intentional?', null from lessons l where l.lesson_code = 'L046' union all
select l.id, 'partner'::discussion_group_type, 3, 'Speak over your partner the generational impact you believe their investment in others could produce. Be specific and prophetic.', null from lessons l where l.lesson_code = 'L046';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Discipleship Pipeline', 'planning_template'::workbook_element_type, 'Identify your Paul and your 1–3 Timothies. For each Timothy: their current stage of development, what they need from you, how you will equip them, what you will release them to do, and your 12-month development plan.', 1 from lessons l where l.lesson_code = 'L046' union all
select l.id, 'Generational Impact Vision', 'reflection_prompt'::workbook_element_type, 'Write: "If I invest faithfully in my Timothies, in 20 years the Kingdom impact will include ______. The people they will reach are ______. The movements they could catalyze are ______."', 2 from lessons l where l.lesson_code = 'L046' union all
select l.id, 'Scripture Memory: 2 Timothy 2:2', 'scripture_memory'::workbook_element_type, 'Memorize: "And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others." (2 Tim 2:2 NIV)', 3 from lessons l where l.lesson_code = 'L046';

-- L047
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is the relationship between daily decisions and lasting legacy? How does legacy actually get built—not in grand moments, but in daily consistency?', null from lessons l where l.lesson_code = 'L047' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What do you want to be true of you at the end of your life that is not yet fully true of you now? What gap exists between your current trajectory and that desired legacy?', null from lessons l where l.lesson_code = 'L047' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share your legacy vision statement. Ask your partner: "Does this decision you''re currently facing move toward or away from this legacy? What should you do differently based on this vision?"', null from lessons l where l.lesson_code = 'L047';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Legacy Vision Document', 'planning_template'::workbook_element_type, 'Write a Legacy Vision Document: 30-year vision statement. Three legacy outcomes you are building toward. Current decisions that align with this legacy. Current decisions that contradict it. One decision to change this week.', 1 from lessons l where l.lesson_code = 'L047' union all
select l.id, 'Legacy Self-Assessment', 'worksheet'::workbook_element_type, 'Evaluate your current life trajectory in five areas: Character, Relationships, Faith, Kingdom Contribution, Personal Stewardship. For each: where you are headed vs. where your legacy vision requires you to be.', 2 from lessons l where l.lesson_code = 'L047' union all
select l.id, 'Scripture Memory: Psalm 78:4', 'scripture_memory'::workbook_element_type, 'Memorize: "We will not hide them from their descendants; we will tell the next generation the praiseworthy deeds of the Lord." (Psalm 78:4 NIV)', 3 from lessons l where l.lesson_code = 'L047';

-- L048
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What is your greatest personal threat to finishing well? Be honest—not the socially acceptable answer, but the real one.', 'Hold the space. This question deserves silence before answers.' from lessons l where l.lesson_code = 'L048' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share your biggest transformation from this curriculum. Not the best lesson—but where you most changed as a person. Let others witness your growth.', null from lessons l where l.lesson_code = 'L048' union all
select l.id, 'large_group'::discussion_group_type, 3, 'What have you built together as a cohort? What does this community mean to you? How will you remain accountable to one another beyond the formal curriculum?', 'Give significant time. This is a culminating community moment.' from lessons l where l.lesson_code = 'L048';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Transformation Testimony', 'reflection_prompt'::workbook_element_type, 'Write a full account of your transformation through this curriculum: who you were when you started, the most significant internal shifts, the most important decisions made, and who you are becoming. This is your personal testimony of formation.', 1 from lessons l where l.lesson_code = 'L048' union all
select l.id, 'Finishing Well Covenant', 'commitment'::workbook_element_type, 'Write a personal covenant committing to finish well. Include: your greatest threats, your specific safeguards, your accountability structure, and your declaration of perseverance. Sign and date it.', 2 from lessons l where l.lesson_code = 'L048' union all
select l.id, 'Scripture Memory: 2 Timothy 4:7', 'scripture_memory'::workbook_element_type, 'Memorize: "I have fought the good fight, I have finished the race, I have kept the faith." (2 Tim 4:7 NIV)', 3 from lessons l where l.lesson_code = 'L048';

-- =====================================================
-- L049–L052 — Advanced Track
-- =====================================================

-- L049
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What barrier in your life has God already removed that you have not yet walked through? What are you still waiting for?', null from lessons l where l.lesson_code = 'L049' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a moment when God opened a door you never expected. What did walking through that door require of you? What did it produce?', null from lessons l where l.lesson_code = 'L049' union all
select l.id, 'partner'::discussion_group_type, 3, 'Pray over your partner''s open door. Declare that the barriers are removed, that fear is not a valid reason to stay, and that they have everything they need to walk through.', null from lessons l where l.lesson_code = 'L049';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Open Door Inventory', 'worksheet'::workbook_element_type, 'List every barrier God has already removed in the past 2 years. For each: what the barrier was, when it was removed, whether you have walked through or are still hesitating, and what the next step is.', 1 from lessons l where l.lesson_code = 'L049' union all
select l.id, 'First Step Through the Door', 'commitment'::workbook_element_type, '"The door God has opened for me is ______________. The barrier has been removed—I know this because ______________.  The fear that has kept me from walking through is ______________. My first step is ______________ by ______________."', 2 from lessons l where l.lesson_code = 'L049' union all
select l.id, 'Scripture Memory: Revelation 3:8', 'scripture_memory'::workbook_element_type, 'Memorize: "See, I have placed before you an open door that no one can shut." (Rev 3:8 NIV)', 3 from lessons l where l.lesson_code = 'L049';

-- L050
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What expired authority systems in your life still operate as though they have power over you? How do you know when something''s authority has genuinely expired versus when you are just rebelling against valid authority?', 'Key distinction: expired vs. delegated-but-resisted authority.' from lessons l where l.lesson_code = 'L050' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Share a system, structure, or relationship you needed to release but found it hard to walk away from. What kept you? What finally released you—or what needs to release you still?', null from lessons l where l.lesson_code = 'L050' union all
select l.id, 'partner'::discussion_group_type, 3, 'Pray over each other: "I declare that you are free from the authority of ______. That system no longer has jurisdiction over your identity, your calling, or your direction."', null from lessons l where l.lesson_code = 'L050';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Authority Systems Audit', 'worksheet'::workbook_element_type, 'List every authority system currently operating in your life: churches, organizations, family systems, relational structures, cultural narratives, inner vows. For each: Is this God-ordained and current? Expired but still binding me? Something I need to honor in leaving? Rate each.', 1 from lessons l where l.lesson_code = 'L050' union all
select l.id, 'Release and Alignment Statement', 'fill_in'::workbook_element_type, '"I am released from the authority of ______________. I honor what it was in its season. I release it with gratitude and no bitterness. I now align myself with ______________ as my new covering and community."', 2 from lessons l where l.lesson_code = 'L050' union all
select l.id, 'Scripture Memory: Galatians 5:1', 'scripture_memory'::workbook_element_type, 'Memorize: "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery." (Gal 5:1 NIV)', 3 from lessons l where l.lesson_code = 'L050';

-- L051
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'How do you distinguish between God calling you forward to something new versus you running from something difficult? What are the markers of each?', 'Critical discernment question. Don''t rush this—it requires honest self-reflection.' from lessons l where l.lesson_code = 'L051' union all
select l.id, 'small_group'::discussion_group_type, 2, 'Have you ever stayed in an environment past its season? What was the cost? Have you ever left too early? What did you miss by leaving?', null from lessons l where l.lesson_code = 'L051' union all
select l.id, 'partner'::discussion_group_type, 3, 'Share your provisional next step from the activation. Ask your partner: "Does this sound like wisdom—or does it sound like either avoidance or rushing? What do you observe that I might not see?"', null from lessons l where l.lesson_code = 'L051';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Environment Discernment Document', 'worksheet'::workbook_element_type, 'For your current environment under discernment: Column 1—reasons this might be a growth challenge I''m meant to stay through. Column 2—reasons this might be a genuine release to move forward. Seek counsel from at least two trusted voices before deciding.', 1 from lessons l where l.lesson_code = 'L051' union all
select l.id, 'Transition Plan (If Released)', 'planning_template'::workbook_element_type, 'If discernment leads to transition: How I will honor what this environment has been. How I will communicate my exit. Timeline for transition. What I am moving toward (not just away from). Who I will bring with me and who I will release. How I will maintain blessing posture throughout.', 2 from lessons l where l.lesson_code = 'L051' union all
select l.id, 'Scripture Memory: Isaiah 43:19', 'scripture_memory'::workbook_element_type, 'Memorize: "See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland." (Isaiah 43:19 NIV)', 3 from lessons l where l.lesson_code = 'L051';

-- L052
insert into lesson_discussions (lesson_id, group_type, question_number, question_text, facilitator_notes)
select l.id, 'large_group'::discussion_group_type, 1, 'What grave clothes still cling to you—old labels, old systems, old identities—that need to be shed for you to walk fully in resurrection life?', null from lessons l where l.lesson_code = 'L052' union all
select l.id, 'small_group'::discussion_group_type, 2, 'What has this entire curriculum journey done in you? Describe the person you are now compared to who you were at L001. Be specific and tell the story.', null from lessons l where l.lesson_code = 'L052' union all
select l.id, 'large_group'::discussion_group_type, 3, 'What does the group need to say to one another before you go? Speak life, call out identity, and commission one another into the fullness of everything you have become.', 'Give abundant time. This is the final commissioning moment of the cohort journey.' from lessons l where l.lesson_code = 'L052';

insert into lesson_workbook_elements (lesson_id, title, element_type, instructions, sequence)
select l.id, 'Full Formation Testimony', 'reflection_prompt'::workbook_element_type, 'Write your complete formation testimony across the entire curriculum: the wound you carried in, the lies you renounced, the calling you discovered, the healing you received, the authority you claimed, the mission you activated. This is your story.', 1 from lessons l where l.lesson_code = 'L052' union all
select l.id, 'Solavian Identity Declaration (Final)', 'commitment'::workbook_element_type, 'Write your final, comprehensive Solavian Identity Declaration—integrating everything from the full curriculum. This is your definitive statement of who you are, what you carry, and where you are going. Sign it. Date it. Frame it if you need to.', 2 from lessons l where l.lesson_code = 'L052' union all
select l.id, 'Scripture Memory: 2 Corinthians 5:17', 'scripture_memory'::workbook_element_type, 'Memorize: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" (2 Cor 5:17 NIV)', 3 from lessons l where l.lesson_code = 'L052';
