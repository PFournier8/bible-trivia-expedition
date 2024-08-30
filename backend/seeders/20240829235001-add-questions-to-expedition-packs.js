'use strict';

const questionsData = {
  "Bible Basics": [
    {
      "questions": [
        {
          "questionText": "Who was the first man created according to the Bible?",
          "questionType": "multiplechoice",
          "correctAnswer": "Adam",
          "wrongAnswers": ["Noah", "Abraham", "Moses"],
          "difficulty": 1
        },
        {
          "questionText": "What was the first miracle performed by Jesus according to the Bible?",
          "questionType": "multiplechoice",
          "correctAnswer": "Turning water into wine",
          "wrongAnswers": ["Feeding the 5,000", "Healing the blind man", "Walking on water"],
          "difficulty": 2
        },
        {
          "questionText": "The Bible consists of how many books?",
          "questionType": "multiplechoice",
          "correctAnswer": "66",
          "wrongAnswers": ["72", "58", "39"],
          "difficulty": 3
        },
        {
          "questionText": "The Book of Genesis is the first book in the New Testament.",
          "questionType": "truefalse",
          "correctAnswer": "false",
          "wrongAnswers": ["true"],
          "difficulty": 1
        },
        {
          "questionText": "Which king was known for his wisdom and built the Temple in Jerusalem?",
          "questionType": "multiplechoice",
          "correctAnswer": "Solomon",
          "wrongAnswers": ["David", "Saul", "Hezekiah"],
          "difficulty": 2
        },
        {
          "questionText": "Moses received the Ten Commandments on Mount Sinai.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "How many days and nights did it rain during the Great Flood?",
          "questionType": "multiplechoice",
          "correctAnswer": "40 days and 40 nights",
          "wrongAnswers": ["30 days and 30 nights", "50 days and 50 nights", "70 days and 70 nights"],
          "difficulty": 2
        },
        {
          "questionText": "Who was swallowed by a great fish or whale according to the Bible?",
          "questionType": "multiplechoice",
          "correctAnswer": "Jonah",
          "wrongAnswers": ["Elijah", "Daniel", "Samson"],
          "difficulty": 1
        },
        {
          "questionText": "The Bible was originally written in Latin.",
          "questionType": "truefalse",
          "correctAnswer": "false",
          "wrongAnswers": ["true"],
          "difficulty": 4
        },
        {
          "questionText": "Which apostle is known for doubting Jesus' resurrection until he saw Him?",
          "questionType": "multiplechoice",
          "correctAnswer": "Thomas",
          "wrongAnswers": ["Peter", "James", "John"],
          "difficulty": 3
        }
      ]
    }    
  ],
  "New Testament": [
    {
      "questions": [
        {
          "questionText": "Who baptized Jesus in the Jordan River?",
          "questionType": "multiplechoice",
          "correctAnswer": "John the Baptist",
          "wrongAnswers": ["Peter", "Paul", "James"],
          "difficulty": 1
        },
        {
          "questionText": "Which book of the New Testament is contains the 'Sermon on the Mount'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Matthew",
          "wrongAnswers": ["Mark", "Luke", "John"],
          "difficulty": 2
        },
        {
          "questionText": "In which city was Jesus born?",
          "questionType": "multiplechoice",
          "correctAnswer": "Bethlehem",
          "wrongAnswers": ["Jerusalem", "Nazareth", "Capernaum"],
          "difficulty": 1
        },
        {
          "questionText": "The apostle Paul was originally known as Saul.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which of the following is not one of the Gospels?",
          "questionType": "multiplechoice",
          "correctAnswer": "Acts",
          "wrongAnswers": ["Matthew", "Mark", "Luke"],
          "difficulty": 2
        },
        {
          "questionText": "What is the last book of the New Testament?",
          "questionType": "multiplechoice",
          "correctAnswer": "Revelation",
          "wrongAnswers": ["Jude", "Hebrews", "James"],
          "difficulty": 1
        },
        {
          "questionText": "The New Testament contains 27 books.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which disciple denied Jesus three times?",
          "questionType": "multiplechoice",
          "correctAnswer": "Peter",
          "wrongAnswers": ["John", "James", "Andrew"],
          "difficulty": 2
        },
        {
          "questionText": "The 'Lord's Prayer' is found in which book of the New Testament?",
          "questionType": "multiplechoice",
          "correctAnswer": "Matthew",
          "wrongAnswers": ["Luke", "John", "Mark"],
          "difficulty": 3
        },
        {
          "questionText": "Jesus turned water into wine at a wedding in Cana.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which apostle is known for his missionary journeys?",
          "questionType": "multiplechoice",
          "correctAnswer": "Paul",
          "wrongAnswers": ["Peter", "John", "James"],
          "difficulty": 2
        },
        {
          "questionText": "In the New Testament, who is referred to as the 'Beloved Disciple'?",
          "questionType": "multiplechoice",
          "correctAnswer": "John",
          "wrongAnswers": ["Peter", "James", "Thomas"],
          "difficulty": 3
        },
        {
          "questionText": "Which book of the New Testament is addressed to Theophilus?",
          "questionType": "multiplechoice",
          "correctAnswer": "Luke",
          "wrongAnswers": ["Acts", "John", "Romans"],
          "difficulty": 3
        },
        {
          "questionText": "The 'Fruit of the Spirit' is mentioned in which New Testament book?",
          "questionType": "multiplechoice",
          "correctAnswer": "Galatians",
          "wrongAnswers": ["Ephesians", "Philippians", "Colossians"],
          "difficulty": 4
        },
        {
          "questionText": "Who wrote the majority of the books in the New Testament?",
          "questionType": "multiplechoice",
          "correctAnswer": "Paul",
          "wrongAnswers": ["Peter", "John", "James"],
          "difficulty": 2
        },
        {
          "questionText": "The New Testament was originally written in Hebrew.",
          "questionType": "truefalse",
          "correctAnswer": "false",
          "wrongAnswers": ["true"],
          "difficulty": 3
        },
        {
          "questionText": "Which book in the New Testament is known for its focus on faith and works?",
          "questionType": "multiplechoice",
          "correctAnswer": "James",
          "wrongAnswers": ["Romans", "Hebrews", "Ephesians"],
          "difficulty": 3
        },
        {
          "questionText": "Which New Testament book contains the 'Armor of God' passage?",
          "questionType": "multiplechoice",
          "correctAnswer": "Ephesians",
          "wrongAnswers": ["Philippians", "Colossians", "Galatians"],
          "difficulty": 3
        },
        {
          "questionText": "Who betrayed Jesus for thirty pieces of silver?",
          "questionType": "multiplechoice",
          "correctAnswer": "Judas Iscariot",
          "wrongAnswers": ["Peter", "James", "John"],
          "difficulty": 1
        },
        {
          "questionText": "Which New Testament book was written by a physician?",
          "questionType": "multiplechoice",
          "correctAnswer": "Luke",
          "wrongAnswers": ["Mark", "Matthew", "John"],
          "difficulty": 3
        }
      ]
    }    
  ],
  "Old Testament": [
    {
      "questions": [
        {
          "questionText": "Who led the Israelites out of Egypt?",
          "questionType": "multiplechoice",
          "correctAnswer": "Moses",
          "wrongAnswers": ["Abraham", "Joseph", "David"],
          "difficulty": 1
        },
        {
          "questionText": "What is the first book of the Old Testament?",
          "questionType": "multiplechoice",
          "correctAnswer": "Genesis",
          "wrongAnswers": ["Exodus", "Leviticus", "Numbers"],
          "difficulty": 1
        },
        {
          "questionText": "Which Old Testament figure was thrown into a den of lions?",
          "questionType": "multiplechoice",
          "correctAnswer": "Daniel",
          "wrongAnswers": ["David", "Elijah", "Samson"],
          "difficulty": 2
        },
        {
          "questionText": "The Old Testament was originally written in Hebrew.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Who was the first king of Israel?",
          "questionType": "multiplechoice",
          "correctAnswer": "Saul",
          "wrongAnswers": ["David", "Solomon", "Samuel"],
          "difficulty": 2
        },
        {
          "questionText": "What was the name of the giant slain by David?",
          "questionType": "multiplechoice",
          "correctAnswer": "Goliath",
          "wrongAnswers": ["Samson", "Absalom", "Gideon"],
          "difficulty": 1
        },
        {
          "questionText": "The story of Noah's Ark is found in the Book of Genesis.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which Old Testament book tells the story of the fall of Jericho?",
          "questionType": "multiplechoice",
          "correctAnswer": "Joshua",
          "wrongAnswers": ["Judges", "Ruth", "Deuteronomy"],
          "difficulty": 3
        },
        {
          "questionText": "Who was swallowed by a great fish in the Old Testament?",
          "questionType": "multiplechoice",
          "correctAnswer": "Jonah",
          "wrongAnswers": ["Elijah", "Moses", "Elisha"],
          "difficulty": 2
        },
        {
          "questionText": "Which prophet confronted King Ahab and Queen Jezebel about their sins?",
          "questionType": "multiplechoice",
          "correctAnswer": "Elijah",
          "wrongAnswers": ["Isaiah", "Jeremiah", "Ezekiel"],
          "difficulty": 3
        },
        {
          "questionText": "The Ten Commandments were given to Moses on Mount Sinai.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "What is the longest book in the Old Testament?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalms",
          "wrongAnswers": ["Isaiah", "Jeremiah", "Genesis"],
          "difficulty": 2
        },
        {
          "questionText": "Which Old Testament book focuses on the suffering of Job?",
          "questionType": "multiplechoice",
          "correctAnswer": "Job",
          "wrongAnswers": ["Proverbs", "Ecclesiastes", "Psalms"],
          "difficulty": 2
        },
        {
          "questionText": "In the Old Testament, who was the father of Isaac?",
          "questionType": "multiplechoice",
          "correctAnswer": "Abraham",
          "wrongAnswers": ["Jacob", "Joseph", "Noah"],
          "difficulty": 1
        },
        {
          "questionText": "The Old Testament has 39 books.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "Which book of the Old Testament contains the story of the creation of the world?",
          "questionType": "multiplechoice",
          "correctAnswer": "Genesis",
          "wrongAnswers": ["Exodus", "Leviticus", "Numbers"],
          "difficulty": 1
        },
        {
          "questionText": "Which Old Testament character interpreted dreams for Pharaoh?",
          "questionType": "multiplechoice",
          "correctAnswer": "Joseph",
          "wrongAnswers": ["Daniel", "Moses", "David"],
          "difficulty": 2
        },
        {
          "questionText": "The Book of Ruth is part of the Old Testament.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which Old Testament prophet was taken up to heaven in a whirlwind?",
          "questionType": "multiplechoice",
          "correctAnswer": "Elijah",
          "wrongAnswers": ["Isaiah", "Jeremiah", "Ezekiel"],
          "difficulty": 3
        },
        {
          "questionText": "The Book of Psalms is a collection of songs and prayers.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        }
      ]
    }    
  ],
  "The Prophets": [
    {
      "questions": [
        {
          "questionText": "Which prophet was swallowed by a great fish?",
          "questionType": "multiplechoice",
          "correctAnswer": "Jonah",
          "wrongAnswers": ["Elijah", "Isaiah", "Jeremiah"],
          "difficulty": 1
        },
        {
          "questionText": "Who prophesied the coming of a 'suffering servant' who would bear the sins of many?",
          "questionType": "multiplechoice",
          "correctAnswer": "Isaiah",
          "wrongAnswers": ["Ezekiel", "Jeremiah", "Daniel"],
          "difficulty": 3
        },
        {
          "questionText": "The prophet Elijah was taken up to heaven in a whirlwind.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which prophet confronted King Ahab and Queen Jezebel for their wickedness?",
          "questionType": "multiplechoice",
          "correctAnswer": "Elijah",
          "wrongAnswers": ["Elisha", "Isaiah", "Hosea"],
          "difficulty": 2
        },
        {
          "questionText": "Who was the prophet that interpreted King Nebuchadnezzar's dreams?",
          "questionType": "multiplechoice",
          "correctAnswer": "Daniel",
          "wrongAnswers": ["Jeremiah", "Ezekiel", "Isaiah"],
          "difficulty": 2
        },
        {
          "questionText": "The prophet Hosea was commanded by God to marry a prostitute as a symbol of Israel's unfaithfulness.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 4
        },
        {
          "questionText": "Which prophet saw a vision of a valley full of dry bones coming to life?",
          "questionType": "multiplechoice",
          "correctAnswer": "Ezekiel",
          "wrongAnswers": ["Jeremiah", "Isaiah", "Daniel"],
          "difficulty": 3
        },
        {
          "questionText": "Jonah was glad when God showed mercy to Nineveh after they repented.",
          "questionType": "truefalse",
          "correctAnswer": "false",
          "wrongAnswers": ["true"],
          "difficulty": 3
        },
        {
          "questionText": "Who is known as the 'weeping prophet'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Jeremiah",
          "wrongAnswers": ["Isaiah", "Ezekiel", "Amos"],
          "difficulty": 2
        },
        {
          "questionText": "Which prophet was thrown into a lions' den but was unharmed?",
          "questionType": "multiplechoice",
          "correctAnswer": "Daniel",
          "wrongAnswers": ["Jeremiah", "Ezekiel", "Isaiah"],
          "difficulty": 1
        },
        {
          "questionText": "The prophet Micah foretold that the Messiah would be born in Bethlehem.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "Which prophet was called by God as a boy while he was serving in the temple under Eli?",
          "questionType": "multiplechoice",
          "correctAnswer": "Samuel",
          "wrongAnswers": ["Isaiah", "Jeremiah", "Hosea"],
          "difficulty": 2
        },
        {
          "questionText": "The prophet Amos was originally a shepherd before he was called by God.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 4
        },
        {
          "questionText": "Which prophet was known for challenging the prophets of Baal on Mount Carmel?",
          "questionType": "multiplechoice",
          "correctAnswer": "Elijah",
          "wrongAnswers": ["Elisha", "Isaiah", "Jeremiah"],
          "difficulty": 2
        },
        {
          "questionText": "Which prophet was thrown into a cistern by King Zedekiah’s officials?",
          "questionType": "multiplechoice",
          "correctAnswer": "Jeremiah",
          "wrongAnswers": ["Isaiah", "Ezekiel", "Daniel"],
          "difficulty": 3
        },
        {
          "questionText": "The prophet Isaiah foretold the virgin birth of the Messiah.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "Which prophet saw a vision of the Lord seated on a throne, high and exalted, with the train of His robe filling the temple?",
          "questionType": "multiplechoice",
          "correctAnswer": "Isaiah",
          "wrongAnswers": ["Ezekiel", "Jeremiah", "Daniel"],
          "difficulty": 4
        },
        {
          "questionText": "The prophet Jonah was sent to the city of Nineveh to call the people to repentance.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which prophet was known for having visions of future kingdoms and the 'Ancient of Days'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Daniel",
          "wrongAnswers": ["Ezekiel", "Jeremiah", "Isaiah"],
          "difficulty": 4
        },
        {
          "questionText": "The prophet Malachi is the last book of the Old Testament.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        }
      ]
    }    
  ],
  "The Parables of Jesus": [
    {
      "questions": [
        {
          "questionText": "In the Parable of the Sower, what does the seed represent?",
          "questionType": "multiplechoice",
          "correctAnswer": "The Word of God",
          "wrongAnswers": ["Faith", "The Holy Spirit", "Good Deeds"],
          "difficulty": 2
        },
        {
          "questionText": "Which parable tells of a man who found a treasure hidden in a field?",
          "questionType": "multiplechoice",
          "correctAnswer": "The Parable of the Hidden Treasure",
          "wrongAnswers": ["The Parable of the Pearl of Great Price", "The Parable of the Lost Coin", "The Parable of the Mustard Seed"],
          "difficulty": 3
        },
        {
          "questionText": "In the Parable of the Lost Sheep, how many sheep did the shepherd leave to find the one that was lost?",
          "questionType": "multiplechoice",
          "correctAnswer": "99",
          "wrongAnswers": ["100", "50", "10"],
          "difficulty": 1
        },
        {
          "questionText": "The Parable of the Good Samaritan teaches us to love our neighbors.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "In the Parable of the Prodigal Son, what does the father do when his son returns?",
          "questionType": "multiplechoice",
          "correctAnswer": "He runs to him and welcomes him back",
          "wrongAnswers": ["He scolds him", "He ignores him", "He sends him away"],
          "difficulty": 2
        },
        {
          "questionText": "The Parable of the Pharisee and the Tax Collector contrasts pride and humility.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In the Parable of the Talents, how many talents did the master give to the servant who buried his talent?",
          "questionType": "multiplechoice",
          "correctAnswer": "1",
          "wrongAnswers": ["5", "10", "3"],
          "difficulty": 2
        },
        {
          "questionText": "The Parable of the Mustard Seed describes the Kingdom of Heaven as starting small and growing large.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "In the Parable of the Wise and Foolish Virgins, what did the foolish virgins forget to bring?",
          "questionType": "multiplechoice",
          "correctAnswer": "Oil for their lamps",
          "wrongAnswers": ["Food", "Water", "Money"],
          "difficulty": 3
        },
        {
          "questionText": "The Parable of the Rich Fool teaches about the dangers of greed.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In the Parable of the Wedding Feast, what happens to the guest who is not wearing wedding clothes?",
          "questionType": "multiplechoice",
          "correctAnswer": "He is thrown out into the darkness",
          "wrongAnswers": ["He is seated at the lowest place", "He is ignored", "He is forgiven"],
          "difficulty": 4
        },
        {
          "questionText": "The Parable of the Unforgiving Servant teaches the importance of forgiving others.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In the Parable of the Wheat and the Tares, what do the tares represent?",
          "questionType": "multiplechoice",
          "correctAnswer": "The children of the evil one",
          "wrongAnswers": ["The righteous", "The angels", "The saints"],
          "difficulty": 3
        },
        {
          "questionText": "The Parable of the Net describes the separation of the wicked from the righteous.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "In the Parable of the Two Sons, which son did the will of his father?",
          "questionType": "multiplechoice",
          "correctAnswer": "The one who initially refused but later obeyed",
          "wrongAnswers": ["The one who said 'yes' but did not go", "Neither of them", "Both of them"],
          "difficulty": 3
        },
        {
          "questionText": "In the Parable of the Rich Man and Lazarus, where does the rich man go after death?",
          "questionType": "multiplechoice",
          "correctAnswer": "Hell",
          "wrongAnswers": ["Heaven", "Purgatory", "A place of rest"],
          "difficulty": 4
        },
        {
          "questionText": "The Parable of the Fig Tree that bore no fruit is a lesson about repentance.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In the Parable of the Lost Coin, how many coins did the woman have before losing one?",
          "questionType": "multiplechoice",
          "correctAnswer": "10",
          "wrongAnswers": ["5", "20", "12"],
          "difficulty": 1
        },
        {
          "questionText": "In the Parable of the Unjust Judge, who persistently asks for justice?",
          "questionType": "multiplechoice",
          "correctAnswer": "A widow",
          "wrongAnswers": ["A servant", "A rich man", "A soldier"],
          "difficulty": 3
        },
        {
          "questionText": "The Parable of the Ten Minas teaches that faithfulness in small things leads to greater responsibility.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "In the Parable of the Workers in the Vineyard, what do all the workers receive at the end of the day?",
          "questionType": "multiplechoice",
          "correctAnswer": "A denarius",
          "wrongAnswers": ["Two denarii", "A shekel", "A talent"],
          "difficulty": 2
        },
        {
          "questionText": "The Parable of the Wise and Foolish Builders contrasts building on a rock versus building on sand.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "In the Parable of the Leaven, what does the leaven represent?",
          "questionType": "multiplechoice",
          "correctAnswer": "The Kingdom of Heaven",
          "wrongAnswers": ["Faith", "The Holy Spirit", "Righteousness"],
          "difficulty": 2
        },
        {
          "questionText": "The Parable of the Sheep and the Goats teaches about the final judgment.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In the Parable of the Ten Virgins, what happens to the foolish virgins who run out of oil?",
          "questionType": "multiplechoice",
          "correctAnswer": "They are shut out of the wedding feast",
          "wrongAnswers": ["They are forgiven", "They are punished", "They receive more oil"],
          "difficulty": 4
        }
      ]
    }    
  ],
  "The Psalms": [
    {
      "questions": [
        {
          "questionText": "Which Psalm begins with 'The Lord is my shepherd; I shall not want'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalm 23",
          "wrongAnswers": ["Psalm 1", "Psalm 27", "Psalm 91"],
          "difficulty": 1
        },
        {
          "questionText": "The Psalms are traditionally attributed to which biblical figure?",
          "questionType": "multiplechoice",
          "correctAnswer": "David",
          "wrongAnswers": ["Moses", "Solomon", "Elijah"],
          "difficulty": 1
        },
        {
          "questionText": "In which Psalm does it say, 'Create in me a clean heart, O God'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalm 51",
          "wrongAnswers": ["Psalm 25", "Psalm 19", "Psalm 103"],
          "difficulty": 2
        },
        {
          "questionText": "Psalm 119 is the longest chapter in the Bible.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which Psalm contains the verse 'Be still, and know that I am God'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalm 46",
          "wrongAnswers": ["Psalm 34", "Psalm 91", "Psalm 27"],
          "difficulty": 3
        },
        {
          "questionText": "In Psalm 1, the righteous are compared to what kind of tree?",
          "questionType": "multiplechoice",
          "correctAnswer": "A tree planted by streams of water",
          "wrongAnswers": ["A cedar of Lebanon", "An olive tree", "A fig tree"],
          "difficulty": 2
        },
        {
          "questionText": "The Psalms are part of the Old Testament.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which Psalm is often called the 'Shepherd Psalm'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalm 23",
          "wrongAnswers": ["Psalm 27", "Psalm 34", "Psalm 121"],
          "difficulty": 1
        },
        {
          "questionText": "In Psalm 100, we are instructed to 'Enter His gates with ________ and His courts with praise.'",
          "questionType": "multiplechoice",
          "correctAnswer": "thanksgiving",
          "wrongAnswers": ["joy", "reverence", "singing"],
          "difficulty": 2
        },
        {
          "questionText": "Psalm 150 focuses on praising God with various musical instruments.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which Psalm is a prayer of repentance after David's sin with Bathsheba?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalm 51",
          "wrongAnswers": ["Psalm 32", "Psalm 6", "Psalm 38"],
          "difficulty": 3
        },
        {
          "questionText": "In Psalm 27, what does David say he seeks from the Lord?",
          "questionType": "multiplechoice",
          "correctAnswer": "To dwell in the house of the Lord all the days of his life",
          "wrongAnswers": ["To defeat his enemies", "To gain wealth", "To live a long life"],
          "difficulty": 3
        },
        {
          "questionText": "The Psalms are divided into how many books?",
          "questionType": "multiplechoice",
          "correctAnswer": "5",
          "wrongAnswers": ["3", "7", "10"],
          "difficulty": 4
        },
        {
          "questionText": "Psalm 91 is often referred to as a Psalm of protection.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "In Psalm 19, the heavens are said to declare what?",
          "questionType": "multiplechoice",
          "correctAnswer": "The glory of God",
          "wrongAnswers": ["The majesty of the earth", "The power of the Lord", "The wisdom of God"],
          "difficulty": 2
        },
        {
          "questionText": "Which Psalm begins with 'Blessed is the man who does not walk in the counsel of the wicked'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalm 1",
          "wrongAnswers": ["Psalm 15", "Psalm 23", "Psalm 27"],
          "difficulty": 2
        },
        {
          "questionText": "In Psalm 139, where does David say God knit him together?",
          "questionType": "multiplechoice",
          "correctAnswer": "In his mother's womb",
          "wrongAnswers": ["In the garden", "In the temple", "In heaven"],
          "difficulty": 2
        },
        {
          "questionText": "Psalm 100 encourages people to serve the Lord with ________.",
          "questionType": "multiplechoice",
          "correctAnswer": "gladness",
          "wrongAnswers": ["fear", "obedience", "sacrifice"],
          "difficulty": 2
        },
        {
          "questionText": "Psalm 150 mentions praising God with the sound of what musical instrument?",
          "questionType": "multiplechoice",
          "correctAnswer": "Trumpet",
          "wrongAnswers": ["Harp", "Cymbals", "Flute"],
          "difficulty": 3
        },
        {
          "questionText": "The verse 'The Lord is my light and my salvation; whom shall I fear?' is found in which Psalm?",
          "questionType": "multiplechoice",
          "correctAnswer": "Psalm 27",
          "wrongAnswers": ["Psalm 23", "Psalm 46", "Psalm 91"],
          "difficulty": 2
        },
        {
          "questionText": "Psalm 136 repeats the phrase 'His love endures forever' in each verse.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "In Psalm 42, what animal is mentioned in the comparison of longing for God?",
          "questionType": "multiplechoice",
          "correctAnswer": "A deer",
          "wrongAnswers": ["A lion", "A sheep", "A dove"],
          "difficulty": 2
        },
        {
          "questionText": "The Psalms are often referred to as the hymnal of the Bible.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In Psalm 34, we are told to 'Taste and see that the Lord is ________.'",
          "questionType": "multiplechoice",
          "correctAnswer": "good",
          "wrongAnswers": ["great", "mighty", "just"],
          "difficulty": 1
        },
        {
          "questionText": "Psalm 103 calls on all creation to praise the Lord.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        }
      ]
    }    
  ],
  "Women of the Bible": [
    {
      "questions": [
        {
          "questionText": "Who was the first woman created according to the Bible?",
          "questionType": "multiplechoice",
          "correctAnswer": "Eve",
          "wrongAnswers": ["Sarah", "Rachel", "Leah"],
          "difficulty": 1
        },
        {
          "questionText": "Which woman was known for her loyalty to her mother-in-law Naomi?",
          "questionType": "multiplechoice",
          "correctAnswer": "Ruth",
          "wrongAnswers": ["Esther", "Hannah", "Deborah"],
          "difficulty": 2
        },
        {
          "questionText": "Which queen saved her people by approaching the king uninvited?",
          "questionType": "multiplechoice",
          "correctAnswer": "Esther",
          "wrongAnswers": ["Bathsheba", "Vashti", "Jezebel"],
          "difficulty": 2
        },
        {
          "questionText": "Deborah was a judge and a prophetess in Israel.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which woman prayed silently for a son and was later blessed with Samuel?",
          "questionType": "multiplechoice",
          "correctAnswer": "Hannah",
          "wrongAnswers": ["Sarah", "Rebekah", "Leah"],
          "difficulty": 2
        },
        {
          "questionText": "Which woman became the mother of Jesus?",
          "questionType": "multiplechoice",
          "correctAnswer": "Mary",
          "wrongAnswers": ["Martha", "Elizabeth", "Anna"],
          "difficulty": 1
        },
        {
          "questionText": "Rahab helped the Israelite spies in Jericho.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "Which woman was turned into a pillar of salt for looking back at Sodom?",
          "questionType": "multiplechoice",
          "correctAnswer": "Lot's wife",
          "wrongAnswers": ["Sarah", "Hagar", "Rachel"],
          "difficulty": 2
        },
        {
          "questionText": "Which woman is known for her faith when she touched Jesus' garment to be healed?",
          "questionType": "multiplechoice",
          "correctAnswer": "The woman with the issue of blood",
          "wrongAnswers": ["Mary Magdalene", "Martha", "Joanna"],
          "difficulty": 3
        },
        {
          "questionText": "Mary Magdalene was the first to see Jesus after His resurrection.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which sister of Moses led the women of Israel in song after crossing the Red Sea?",
          "questionType": "multiplechoice",
          "correctAnswer": "Miriam",
          "wrongAnswers": ["Zipporah", "Deborah", "Naomi"],
          "difficulty": 2
        },
        {
          "questionText": "Which woman anointed Jesus' feet with expensive perfume?",
          "questionType": "multiplechoice",
          "correctAnswer": "Mary of Bethany",
          "wrongAnswers": ["Martha", "Joanna", "Susanna"],
          "difficulty": 3
        },
        {
          "questionText": "Bathsheba became the wife of which king after the death of her first husband?",
          "questionType": "multiplechoice",
          "correctAnswer": "David",
          "wrongAnswers": ["Saul", "Solomon", "Hezekiah"],
          "difficulty": 2
        },
        {
          "questionText": "Jezebel was a queen known for promoting the worship of Baal.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which woman hid the Hebrew spies in Jericho and later became part of Jesus' lineage?",
          "questionType": "multiplechoice",
          "correctAnswer": "Rahab",
          "wrongAnswers": ["Ruth", "Tamar", "Bathsheba"],
          "difficulty": 3
        },
        {
          "questionText": "Which queen was deposed for refusing to appear before King Xerxes?",
          "questionType": "multiplechoice",
          "correctAnswer": "Vashti",
          "wrongAnswers": ["Esther", "Jezebel", "Athaliah"],
          "difficulty": 3
        },
        {
          "questionText": "Which woman did Isaac marry after his father's servant found her at a well?",
          "questionType": "multiplechoice",
          "correctAnswer": "Rebekah",
          "wrongAnswers": ["Rachel", "Leah", "Hagar"],
          "difficulty": 2
        },
        {
          "questionText": "Sarah laughed when she was told she would have a son in her old age.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which two sisters were married to Jacob?",
          "questionType": "multiplechoice",
          "correctAnswer": "Rachel and Leah",
          "wrongAnswers": ["Rebekah and Hannah", "Naomi and Ruth", "Miriam and Deborah"],
          "difficulty": 2
        },
        {
          "questionText": "Which woman was healed of her demonic possession by Jesus and became one of His followers?",
          "questionType": "multiplechoice",
          "correctAnswer": "Mary Magdalene",
          "wrongAnswers": ["Martha", "Joanna", "Susanna"],
          "difficulty": 2
        },
        {
          "questionText": "The wife of which prophet is known as 'Gomer'?",
          "questionType": "multiplechoice",
          "correctAnswer": "Hosea",
          "wrongAnswers": ["Isaiah", "Jeremiah", "Amos"],
          "difficulty": 4
        },
        {
          "questionText": "Which Old Testament judge led Israel to victory over the Canaanites and was supported by the prophetess Deborah?",
          "questionType": "multiplechoice",
          "correctAnswer": "Jael",
          "wrongAnswers": ["Huldah", "Abigail", "Delilah"],
          "difficulty": 3
        },
        {
          "questionText": "Who was the sister of Lazarus and known for sitting at Jesus' feet to listen to His teaching?",
          "questionType": "multiplechoice",
          "correctAnswer": "Mary of Bethany",
          "wrongAnswers": ["Martha", "Salome", "Joanna"],
          "difficulty": 2
        },
        {
          "questionText": "Which woman served as a deaconess in the early church, mentioned in Romans 16?",
          "questionType": "multiplechoice",
          "correctAnswer": "Phoebe",
          "wrongAnswers": ["Priscilla", "Lydia", "Tabitha"],
          "difficulty": 3
        },
        {
          "questionText": "Delilah betrayed which judge of Israel by revealing the secret of his strength?",
          "questionType": "multiplechoice",
          "correctAnswer": "Samson",
          "wrongAnswers": ["Gideon", "Ehud", "Jephthah"],
          "difficulty": 1
        }
      ]
    }    
  ],
  "The Miracles of Jesus": [
    {
      "questions": [
        {
          "questionText": "What was the first miracle that Jesus performed?",
          "questionType": "multiplechoice",
          "correctAnswer": "Turning water into wine",
          "wrongAnswers": ["Feeding the 5,000", "Walking on water", "Healing the blind man"],
          "difficulty": 1
        },
        {
          "questionText": "Jesus fed 5,000 men with five loaves and two fish.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Who did Jesus raise from the dead after four days in the tomb?",
          "questionType": "multiplechoice",
          "correctAnswer": "Lazarus",
          "wrongAnswers": ["Jairus' daughter", "The widow's son", "Tabitha"],
          "difficulty": 2
        },
        {
          "questionText": "Jesus healed a man born blind by spitting on the ground, making mud with the saliva, and putting it on the man's eyes.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In the miracle of the calming of the storm, what did Jesus say to the wind and the sea?",
          "questionType": "multiplechoice",
          "correctAnswer": "'Peace, be still!'",
          "wrongAnswers": ["'Be calm!'","'Cease!'","'Quiet!'"],
          "difficulty": 2
        },
        {
          "questionText": "Jesus healed ten lepers, but only one returned to thank Him.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "What miracle did Jesus perform at the wedding in Cana?",
          "questionType": "multiplechoice",
          "correctAnswer": "Turning water into wine",
          "wrongAnswers": ["Feeding the 5,000", "Healing a leper", "Walking on water"],
          "difficulty": 1
        },
        {
          "questionText": "Jesus walked on the Sea of Galilee to reach His disciples.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Who touched Jesus' garment and was healed of her bleeding?",
          "questionType": "multiplechoice",
          "correctAnswer": "A woman who had been bleeding for 12 years",
          "wrongAnswers": ["A Samaritan woman", "A Roman centurion's wife", "Mary Magdalene"],
          "difficulty": 3
        },
        {
          "questionText": "Jesus healed a paralytic man who was lowered through a roof by his friends.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Jesus cursed a fig tree because it bore no fruit, and it withered immediately.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "At the Pool of Bethesda, how many years had the invalid been sick before Jesus healed him?",
          "questionType": "multiplechoice",
          "correctAnswer": "38 years",
          "wrongAnswers": ["12 years", "7 years", "24 years"],
          "difficulty": 4
        },
        {
          "questionText": "Jesus raised Jairus' daughter from the dead by saying 'Talitha cumi,' which means 'Little girl, I say to you, arise.'",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "What did Jesus use to heal a blind man in Bethsaida?",
          "questionType": "multiplechoice",
          "correctAnswer": "Spit on his eyes",
          "wrongAnswers": ["Mud", "Touching his forehead", "A spoken word"],
          "difficulty": 3
        },
        {
          "questionText": "In the miracle of feeding the 4,000, how many loaves did Jesus use?",
          "questionType": "multiplechoice",
          "correctAnswer": "Seven",
          "wrongAnswers": ["Five", "Three", "Twelve"],
          "difficulty": 2
        },
        {
          "questionText": "Jesus' first miracle was healing a blind man.",
          "questionType": "truefalse",
          "correctAnswer": "false",
          "wrongAnswers": ["true"],
          "difficulty": 1
        },
        {
          "questionText": "What did Jesus do to heal the man with a withered hand?",
          "questionType": "multiplechoice",
          "correctAnswer": "He told him to stretch out his hand",
          "wrongAnswers": ["He touched it", "He prayed over it", "He anointed it with oil"],
          "difficulty": 3
        },
        {
          "questionText": "Jesus healed Peter's mother-in-law who was sick with a fever.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "In the miracle of the coin in the fish's mouth, who did Jesus send to catch the fish?",
          "questionType": "multiplechoice",
          "correctAnswer": "Peter",
          "wrongAnswers": ["John", "James", "Andrew"],
          "difficulty": 2
        },
        {
          "questionText": "Jesus turned stones into bread during His temptation in the wilderness.",
          "questionType": "truefalse",
          "correctAnswer": "false",
          "wrongAnswers": ["true"],
          "difficulty": 2
        },
        {
          "questionText": "How many demons were cast out of Mary Magdalene by Jesus?",
          "questionType": "multiplechoice",
          "correctAnswer": "Seven",
          "wrongAnswers": ["Two", "Ten", "Twelve"],
          "difficulty": 3
        },
        {
          "questionText": "Jesus healed the blind Bartimaeus outside of Jericho.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which miracle did Jesus perform on the Sabbath that angered the Pharisees?",
          "questionType": "multiplechoice",
          "correctAnswer": "Healing a man with a withered hand",
          "wrongAnswers": ["Feeding the 5,000", "Calming the storm", "Walking on water"],
          "difficulty": 3
        },
        {
          "questionText": "After Jesus fed the 5,000, there were twelve baskets of leftovers.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "What did Jesus use to heal the deaf and mute man in Decapolis?",
          "questionType": "multiplechoice",
          "correctAnswer": "He touched his ears and tongue",
          "wrongAnswers": ["He anointed him with oil", "He prayed over him", "He used mud"],
          "difficulty": 3
        }
      ]
    }    
  ],
  "The Ten Commandments": [
    {
      "questions": [
        {
          "questionText": "Where did Moses receive the Ten Commandments?",
          "questionType": "multiplechoice",
          "correctAnswer": "Mount Sinai",
          "wrongAnswers": ["Mount Horeb", "Mount Zion", "Mount Carmel"],
          "difficulty": 1
        },
        {
          "questionText": "The first commandment is 'You shall have no other gods before me.'",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which commandment instructs us to honor our father and mother?",
          "questionType": "multiplechoice",
          "correctAnswer": "The fifth commandment",
          "wrongAnswers": ["The fourth commandment", "The sixth commandment", "The seventh commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The second commandment prohibits the making of graven images.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which commandment forbids stealing?",
          "questionType": "multiplechoice",
          "correctAnswer": "The eighth commandment",
          "wrongAnswers": ["The sixth commandment", "The ninth commandment", "The tenth commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The fourth commandment instructs us to keep the Sabbath day holy.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which commandment forbids bearing false witness against your neighbor?",
          "questionType": "multiplechoice",
          "correctAnswer": "The ninth commandment",
          "wrongAnswers": ["The eighth commandment", "The tenth commandment", "The seventh commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The tenth commandment forbids coveting anything that belongs to your neighbor.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which commandment instructs us not to commit adultery?",
          "questionType": "multiplechoice",
          "correctAnswer": "The seventh commandment",
          "wrongAnswers": ["The sixth commandment", "The eighth commandment", "The ninth commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The sixth commandment is 'You shall not kill.'",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which commandment is focused on not taking the Lord's name in vain?",
          "questionType": "multiplechoice",
          "correctAnswer": "The third commandment",
          "wrongAnswers": ["The first commandment", "The second commandment", "The fourth commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The first four commandments deal with our relationship with God.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "The Ten Commandments were written on two tablets of stone.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which commandment focuses on not coveting your neighbor's wife?",
          "questionType": "multiplechoice",
          "correctAnswer": "The tenth commandment",
          "wrongAnswers": ["The seventh commandment", "The eighth commandment", "The ninth commandment"],
          "difficulty": 3
        },
        {
          "questionText": "The Ten Commandments are found in the Book of Exodus.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 1
        },
        {
          "questionText": "Which commandment is about not making idols or graven images?",
          "questionType": "multiplechoice",
          "correctAnswer": "The second commandment",
          "wrongAnswers": ["The first commandment", "The third commandment", "The fourth commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The commandment to keep the Sabbath day holy is the longest of the Ten Commandments.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        },
        {
          "questionText": "Which commandment prohibits lying?",
          "questionType": "multiplechoice",
          "correctAnswer": "The ninth commandment",
          "wrongAnswers": ["The seventh commandment", "The eighth commandment", "The tenth commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The fifth commandment is the only commandment with a promise attached to it.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which of the following is NOT one of the Ten Commandments?",
          "questionType": "multiplechoice",
          "correctAnswer": "You shall love your neighbor as yourself",
          "wrongAnswers": ["You shall not commit adultery", "You shall not steal", "You shall not covet"],
          "difficulty": 3
        },
        {
          "questionText": "The Ten Commandments were given to Moses on Mount Zion.",
          "questionType": "truefalse",
          "correctAnswer": "false",
          "wrongAnswers": ["true"],
          "difficulty": 1
        },
        {
          "questionText": "The commandment to honor your father and mother includes a promise of long life.",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 2
        },
        {
          "questionText": "Which commandment is often summarized as 'You shall not lie'?",
          "questionType": "multiplechoice",
          "correctAnswer": "The ninth commandment",
          "wrongAnswers": ["The eighth commandment", "The sixth commandment", "The seventh commandment"],
          "difficulty": 2
        },
        {
          "questionText": "The commandment 'You shall not murder' comes before the commandment 'You shall not commit adultery.'",
          "questionType": "truefalse",
          "correctAnswer": "true",
          "wrongAnswers": ["false"],
          "difficulty": 3
        }
      ]
    }    
  ]
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const [packName, questions] of Object.entries(questionsData)) {
      try {
        const pack = await queryInterface.sequelize.query(
          `SELECT id FROM "ExpeditionPacks" WHERE name = :packName LIMIT 1;`,
          {
            replacements: { packName },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        if (pack.length > 0) {
          const packId = pack[0].id;
          const formattedQuestions = questions[0].questions.map(q => ({
            packId: packId,
            questionText: q.questionText,
            questionType: q.questionType,
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.questionType === 'truefalse' ? '{}' : `{${q.wrongAnswers.map(a => `"${a}"`).join(',')}}`,
            difficulty: q.difficulty,
            createdAt: new Date()
          }));

          await queryInterface.bulkInsert('questions', formattedQuestions, {});
          console.log(`Successfully inserted questions for pack: ${packName}`);
        } else {
          console.warn(`Warning: Pack "${packName}" not found in the database.`);
        }
      } catch (error) {
        console.error(`Error processing pack "${packName}":`, error);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (const packName of Object.keys(questionsData)) {
      try {
        const pack = await queryInterface.sequelize.query(
          `SELECT id FROM "ExpeditionPacks" WHERE name = :packName LIMIT 1;`,
          {
            replacements: { packName },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        if (pack.length > 0) {
          const packId = pack[0].id;
          await queryInterface.bulkDelete('questions', { packId: packId }, {});
          console.log(`Successfully deleted questions for pack: ${packName}`);
        } else {
          console.warn(`Warning: Pack "${packName}" not found in the database.`);
        }
      } catch (error) {
        console.error(`Error deleting questions for pack "${packName}":`, error);
      }
    }
  }
};