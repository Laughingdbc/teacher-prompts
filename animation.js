// Animation Script for AI Prompt Iteration Tutorial
document.addEventListener('DOMContentLoaded', function() {
  const setupAnimation = () => {
    const showAnimationBtn = document.getElementById('show-animation');
    const animationContainer = document.getElementById('animation-container');
    const closeAnimationBtn = document.getElementById('close-animation');
    const replayAnimationBtn = document.getElementById('replay-animation');
    
    const thoughtBubble = document.getElementById('thought-bubble');
    const thoughtText = document.getElementById('thought-text');
    const responseBubble = document.getElementById('response-bubble');
    const responseText = document.getElementById('response-text');
    
    const teacherMouth = document.getElementById('teacher-mouth');
    const aiMouth = document.getElementById('ai-mouth');
    
    const animationStep = document.getElementById('animation-step');
    const animationCaption = document.getElementById('animation-caption');
    
    let animationTimeline = [];
    let currentStep = 0;
    let animationInterval = null;
    
    // Define the animation steps
    const setupAnimationTimeline = () => {
      animationTimeline = [
        {
          step: 1,
          caption: "Teacher creates initial prompt",
          thought: "I need activities for teaching sight words to kindergartners...",
          response: "",
          teacherExpression: "M40 50 Q50 55 60 50", // thoughtful expression
          aiExpression: "M50 55 Q60 55 70 55", // neutral expression
          delay: 2000
        },
        {
          step: 2,
          caption: "Teacher refines their prompt with specific details",
          thought: "Create 3-5 hands-on activities to help kindergarten students practice these sight words: the, and, is, you, that",
          response: "",
          teacherExpression: "M40 50 Q50 55 60 50", // concentrated
          aiExpression: "M50 55 Q60 55 70 55", // neutral
          delay: 3000
        },
        {
          step: 3,
          caption: "AI responds with initial suggestions",
          thought: "These look promising, but I need more specific instructions for Activity #2",
          response: "Here are 5 activities for kindergarten sight words:\n1. Sight Word Hopscotch\n2. Memory Matching Game\n3. Salt Tray Writing\n4. Sight Word Bingo\n5. Mystery Bag Drawing",
          teacherExpression: "M40 50 Q50 55 60 50", // reading
          aiExpression: "M50 55 Q60 65 70 55", // happy
          delay: 4000
        },
        {
          step: 4,
          caption: "Teacher asks for specific improvements",
          thought: "I like activity #2. Can you add step-by-step instructions and suggest ways to make it challenging for students who already know these words?",
          response: "",
          teacherExpression: "M40 50 Q50 60 60 50", // excited expression
          aiExpression: "M50 55 Q60 55 70 55", // neutral expression
          delay: 3000
        },
        {
          step: 5,
          caption: "AI provides improved, detailed response",
          thought: "Perfect! Now I have a differentiated activity that all my students can use!",
          response: "Memory Matching Game - Detailed Steps:\n1. Create word cards with sight words\n2. Create matching picture cards\n3. Place face down in grid\n4. Students turn over two cards\n5. Match word to picture\n\nFor advanced students: Add challenge cards with sentences using multiple sight words.",
          teacherExpression: "M40 50 Q50 65 60 50", // very happy
          aiExpression: "M50 55 Q60 65 70 55", // happy
          delay: 4000
        }
      ];
    };
    
    // Run a single step of the animation
    const runAnimationStep = (stepIndex) => {
      if (stepIndex >= animationTimeline.length) {
        clearInterval(animationInterval);
        animationInterval = null;
        return;
      }
      
      const step = animationTimeline[stepIndex];
      
      // Update step indicator and caption
      animationStep.textContent = `Step ${step.step}:`;
      animationCaption.textContent = step.caption;
      
      // Update character expressions
      teacherMouth.setAttribute('d', step.teacherExpression);
      aiMouth.setAttribute('d', step.aiExpression);
      
      // Show/hide thought bubbles
      if (step.thought) {
        thoughtText.textContent = step.thought;
        thoughtBubble.style.opacity = '1';
      } else {
        thoughtBubble.style.opacity = '0';
      }
      
      if (step.response) {
        responseText.textContent = step.response;
        responseBubble.style.opacity = '1';
      } else {
        responseBubble.style.opacity = '0';
      }
      
      currentStep = stepIndex;
    };
    
    // Start or restart the animation
    const startAnimation = () => {
      // Reset and setup the timeline
      setupAnimationTimeline();
      currentStep = 0;
      
      // Clear any existing interval
      if (animationInterval) {
        clearInterval(animationInterval);
      }
      
      // Initial step
      runAnimationStep(0);
      
      // Set up the interval for advancing steps
      let nextStepIndex = 1;
      animationInterval = setInterval(() => {
        if (nextStepIndex >= animationTimeline.length) {
          clearInterval(animationInterval);
          animationInterval = null;
          return;
        }
        
        runAnimationStep(nextStepIndex);
        nextStepIndex++;
      }, 5000); // Change step every 5 seconds
    };
    
    // Event listeners
    if (showAnimationBtn) {
      showAnimationBtn.addEventListener('click', () => {
        animationContainer.style.display = 'flex';
        startAnimation();
      });
    }
    
    if (closeAnimationBtn) {
      closeAnimationBtn.addEventListener('click', () => {
        animationContainer.style.display = 'none';
        if (animationInterval) {
          clearInterval(animationInterval);
          animationInterval = null;
        }
      });
    }
    
    if (replayAnimationBtn) {
      replayAnimationBtn.addEventListener('click', () => {
        startAnimation();
      });
    }
  };
  
  // Try to set up the animation immediately
  setupAnimation();
});
