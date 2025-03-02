// Icon components
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = React.useState('k2');
  const [copiedIndex, setCopiedIndex] = React.useState(null);
  const [points, setPoints] = React.useState(0);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [achievements, setAchievements] = React.useState([
    { id: 1, name: "Prompt Beginner", description: "Copy your first prompt", points: 5, unlocked: false, threshold: 1 },
    { id: 2, name: "Prompt Explorer", description: "Copy 5 different prompts", points: 15, unlocked: false, threshold: 5 },
    { id: 3, name: "Prompt Master", description: "Copy 10 different prompts", points: 30, unlocked: false, threshold: 10 },
    { id: 4, name: "Grade Level Explorer", description: "Copy prompts from all grade levels", points: 25, unlocked: false, threshold: 3, special: true }
  ]);
  const [copiedPrompts, setCopiedPrompts] = React.useState([]);
  const [gradeLevelsExplored, setGradeLevelsExplored] = React.useState(new Set());
  const [showAchievement, setShowAchievement] = React.useState(null);
  
  const prompts = {
    k2: [
      {
        title: "Sight Word Activities",
        prompt: "Create 3-5 engaging, hands-on activities to help kindergarten students practice these sight words: [list your sight words]. Each activity should take no more than 10 minutes and use materials commonly found in a classroom.",
        iteration: "I like activity #2. Can you add step-by-step instructions and suggest ways to make it more challenging for students who already know these words?"
      },
      {
        title: "Phonics Games",
        prompt: "Generate 4 fun, interactive phonics games focused on [specific sound or blend] for 1st grade students. Each game should be playable in small groups and include simple instructions that students can understand.",
        iteration: "Could you modify the second game to work as a whole-class activity for my morning meeting?"
      },
      {
        title: "Math Centers",
        prompt: "Suggest 3-4 math center activities for teaching [specific math concept] to 2nd graders. Each center should include a hands-on component, a recording sheet, and a way for students to check their work independently.",
        iteration: "How can I differentiate these centers for students who are still struggling with the basic concept?"
      },
      {
        title: "Reading Response",
        prompt: "Create 4-5 simple reading response activities for K-2 students after read-alouds about [topic/theme]. Activities should be accessible for different reading levels and incorporate drawing along with simple writing.",
        iteration: "Could you provide sentence stems to support my emerging writers with the third activity?"
      },
      {
        title: "SEL Check-ins",
        prompt: "Suggest 5 quick social-emotional check-in activities for K-2 students that can be used at the beginning of the day. Each should help students identify and express their feelings in age-appropriate ways.",
        iteration: "How can I adapt the feeling chart idea for non-verbal students or English language learners?"
      }
    ],
    g35: [
      {
        title: "Reading Comprehension Strategies",
        prompt: "Create 4-5 activities to help 3rd-5th grade students practice [specific comprehension strategy] with our current text about [topic]. Include independent, partner, and small group options that go beyond simple worksheets.",
        iteration: "I like activity #3. Can you suggest ways to scaffold it for my struggling readers while still keeping the same learning objective?"
      },
      {
        title: "Math Problem Solving",
        prompt: "Generate 3-4 real-world math problems involving [math concept] appropriate for 4th graders. For each problem, include a visual component, extension questions, and suggestions for how students can show their thinking.",
        iteration: "These problems are great! Can you create a similar set that incorporates our social studies unit on [topic] to make cross-curricular connections?"
      },
      {
        title: "Vocabulary Development",
        prompt: "Suggest 5 interactive vocabulary activities for teaching these terms from our 5th grade [subject] unit: [list 5-8 vocabulary words]. Activities should help students understand meaning in context and apply the words in different situations.",
        iteration: "Could you modify one of these activities to work as a quick formative assessment that I could use at the end of our lesson?"
      },
      {
        title: "Writing Workshop Mini-Lessons",
        prompt: "Design 3-4 mini-lessons (10-15 minutes each) for teaching [specific writing skill] to 3rd graders. Include a mentor text example for each, guided practice suggestions, and a way for students to apply the skill in their own writing.",
        iteration: "For the second mini-lesson, can you suggest a different mentor text that would work better for students who are interested in [specific topic/genre]?"
      },
      {
        title: "Project-Based Learning",
        prompt: "Design a week-long project-based learning experience for 4th graders centered on [curriculum topic]. Include driving questions, daily activities, necessary resources, and assessment ideas that focus on both content knowledge and collaboration skills.",
        iteration: "I love this PBL plan, but I only have 3 days instead of 5. How would you condense this while keeping the most important learning intact?"
      }
    ],
    g68: [
      {
        title: "Argumentative Writing",
        prompt: "Generate 4-5 engaging argumentative writing prompts connected to our 6th-8th grade unit on [topic]. Include prompts that require research, analysis of multiple perspectives, and clear reasoning. For each prompt, suggest 2-3 potential counterclaims students should address.",
        iteration: "These prompts are excellent. For the second one about [specific prompt], can you suggest credible sources at different reading levels that students could use for their research?"
      },
      {
        title: "Scientific Inquiry Projects",
        prompt: "Design 3 student-driven scientific inquiry projects for middle school students learning about [scientific concept]. Each project should include a driving question, materials list, investigation procedure, data collection method, and extension opportunities.",
        iteration: "I'm concerned about safety with the second project. Can you suggest modifications that would make it safer while still allowing students to investigate the key concept?"
      },
      {
        title: "Text Analysis Strategies",
        prompt: "Suggest 5 analytical approaches to help 7th graders examine [specific text/novel]. For each approach, provide discussion questions, a graphic organizer, and a creative way for students to present their analysis to peers.",
        iteration: "I like the character analysis framework. Could you adapt it specifically for analyzing how the protagonist changes throughout the story?"
      },
      {
        title: "Historical Document Analysis",
        prompt: "Provide 4 strategies for helping 6th-8th graders analyze primary source documents from [historical period]. For each strategy, include specific questions students should consider, a method for recording their analysis, and a way to connect to modern-day relevance.",
        iteration: "Can you modify the SOAPS method you suggested to make it more accessible for my students with reading difficulties while maintaining historical thinking rigor?"
      },
      {
        title: "Performance Assessments",
        prompt: "Suggest 3 alternative assessment options beyond traditional tests for my 7th-8th graders to demonstrate their understanding of [unit topic]. Each assessment should allow for creativity while still rigorously measuring key learning objectives.",
        iteration: "I'm intrigued by the portfolio assessment. Could you provide a more detailed structure, including specific artifacts students should include and reflection prompts to guide their self-assessment?"
      }
    ]
  };

  React.useEffect(() => {
    const checkAchievements = () => {
      let newAchievements = [...achievements];
      let achievementUnlocked = null;
      
      // Check regular count-based achievements
      newAchievements.forEach((achievement, index) => {
        if (!achievement.unlocked && !achievement.special) {
          if (copiedPrompts.length >= achievement.threshold) {
            newAchievements[index] = {...achievement, unlocked: true};
            setPoints(prevPoints => prevPoints + achievement.points);
            achievementUnlocked = achievement;
          }
        }
      });
      
      // Check special grade level explorer achievement
      const specialAchievement = newAchievements.find(a => a.id === 4);
      if (!specialAchievement.unlocked && gradeLevelsExplored.size >= specialAchievement.threshold) {
        const index = newAchievements.findIndex(a => a.id === 4);
        newAchievements[index] = {...specialAchievement, unlocked: true};
        setPoints(prevPoints => prevPoints + specialAchievement.points);
        achievementUnlocked = specialAchievement;
      }
      
      if (achievementUnlocked) {
        setShowAchievement(achievementUnlocked);
        setTimeout(() => {
          setShowAchievement(null);
        }, 3000);
      }
      
      setAchievements(newAchievements);
    };
    
    checkAchievements();
  }, [copiedPrompts, gradeLevelsExplored]);

  const handleCopy = (prompt, index, gradeLevel) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    
    // Update points and track copied prompts
    setPoints(prevPoints => prevPoints + 2);
    setCopiedPrompts(prev => {
      if (!prev.includes(gradeLevel + '-' + index)) {
        return [...prev, gradeLevel + '-' + index];
      }
      return prev;
    });
    
    // Track grade levels explored
    setGradeLevelsExplored(prev => {
      const updated = new Set(prev);
      updated.add(gradeLevel);
      return updated;
    });
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI for GP</h1>
          <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-full">
            <AwardIcon className="w-5 h-5 text-yellow-300" />
            <span className="font-bold">{points} Points</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Teacher AI Prompt Collection</h2>
            <p className="mb-4">
              Welcome to your AI prompt toolkit! Here you'll find carefully crafted prompts for 
              different grade levels. Simply click the copy button next to any prompt to add it to 
              your clipboard, then paste it into your favorite AI assistant. Earn points and 
              achievements as you explore different prompts!
            </p>
            <p className="mb-4">
              <strong>How to use these prompts:</strong> After pasting a prompt, fill in the 
              bracketed information [like this] with your specific content. Once you get a response,
              use the "Iteration" suggestions to refine and improve the AI's output.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button 
                onClick={() => setActiveTab('k2')} 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'k2' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                K-2 Prompts
              </button>
              <button 
                onClick={() => setActiveTab('g35')} 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'g35' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Grades 3-5 Prompts
              </button>
              <button 
                onClick={() => setActiveTab('g68')} 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'g68' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Grades 6-8 Prompts
              </button>
            </nav>
          </div>

          {/* Prompt Cards */}
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prompts[activeTab].map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 p-3 border-b">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                  <div className="p-4">
                    <div className="relative bg-gray-100 p-3 rounded-md mb-3">
                      <p className="pr-10 text-sm">{item.prompt}</p>
                      <button 
                        onClick={() => handleCopy(item.prompt, index, activeTab)}
                        className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-200 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === index ? <CheckIcon className="w-5 h-5 text-green-600" /> : <CopyIcon className="w-5 h-5 text-gray-600" />}
                      </button>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase text-gray-500 mb-1">Iteration Suggestion:</p>
                      <p className="text-sm italic text-gray-700">{item.iteration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AwardIcon className="w-5 h-5 mr-2 text-yellow-500" />
              Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`border rounded-md p-3 ${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-3 ${achievement.unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                      {achievement.unlocked ? <CheckIcon className="w-4 h-4" /> : <AwardIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-blue-600 mt-1">+{achievement.points} points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Achievement popup */}
      {showAchievement && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md shadow-lg flex items-center animate-bounce">
          <AwardIcon className="w-5 h-5 mr-2 text-yellow-500" />
          <div>
            <p className="font-bold">Achievement Unlocked!</p>
            <p className="text-sm">{showAchievement.name} (+{showAchievement.points} points)</p>
          </div>
        </div>
      )}

      {/* Confetti effect for points */}
      {showConfetti && (
        <div className="fixed top-16 right-8">
          <div className="relative">
            <div className="absolute text-green-600 font-bold animate-fade-up">
              +2 points <ArrowUpIcon className="inline w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 border-t p-4 text-center text-gray-500 text-sm">
        AI for GP - Helping teachers leverage AI for better teaching and learning
      </footer>
    </div>
  );
};

// Render the App
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
