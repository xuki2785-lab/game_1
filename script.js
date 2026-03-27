// 颜色单词和对应的颜色值
const colorWords = {
    // 红色系
    "红色": "#FF0000",
    "深红": "#8B0000",
    "粉红": "#FFC0CB",
    "玫红": "#FF69B4",
    "砖红": "#B22222",
    "橙红": "#FF4500",
    "浅红": "#FF6347",
    "酒红": "#722F37",
    "朱红": "#DC143C",
    "海棠红": "#FF6B6B",
    
    // 蓝色系
    "蓝色": "#0000FF",
    "深蓝": "#00008B",
    "浅蓝": "#87CEEB",
    "湖蓝": "#00BFFF",
    "天蓝": "#87CEEB",
    "海蓝": "#0066CC",
    "钴蓝": "#0047AB",
    "靛蓝": "#4B0082",
    "宝蓝": "#0000CD",
    "孔雀蓝": "#008080",
    
    // 黄色系
    "黄色": "#FFFF00",
    "金黄": "#FFD700",
    "柠檬黄": "#FFFFE0",
    "土黄": "#D2B48C",
    "橙黄": "#FFA500",
    "米黄": "#F5DEB3",
    "姜黄": "#DAA520",
    "暗黄": "#9E9E20",
    "浅黄": "#FFFFE0",
    "杏黄": "#FBB917",
    
    // 绿色系
    "绿色": "#00FF00",
    "深绿": "#006400",
    "浅绿": "#90EE90",
    "草绿": "#32CD32",
    "橄榄绿": "#808000",
    "墨绿": "#006400",
    "翠绿": "#00FF7F",
    "黄绿": "#9ACD32",
    "蓝绿": "#20B2AA",
    "森林绿": "#228B22",
    
    // 紫色系
    "紫色": "#800080",
    "深紫": "#4B0082",
    "浅紫": "#E6E6FA",
    "紫罗兰": "#EE82EE",
    "薰衣草紫": "#9370DB",
    "葡萄紫": "#663399",
    "藕荷紫": "#D8BFD8",
    "木槿紫": "#8A2BE2",
    "紫蓝": "#8A2BE2",
    "紫粉": "#CBC3E3",
    
    // 橙色系
    "橙色": "#FFA500",
    "深橙": "#FF8C00",
    "浅橙": "#FFB347",
    "橙红": "#FF4500",
    "橙黄": "#FFD700",
    "琥珀橙": "#FFBF00",
    "珊瑚橙": "#FF7F50",
    "杏子橙": "#E6A23C",
    "南瓜橙": "#FF6600",
    "甜橙": "#FF9900",
    
    // 其他颜色
    "黑色": "#000000",
    "白色": "#FFFFFF",
    "灰色": "#808080",
    "浅灰": "#D3D3D3",
    "深灰": "#696969",
    "棕色": "#A52A2A",
    "深棕": "#8B4513",
    "浅棕": "#D2B48C",
    "金色": "#FFD700",
    "银色": "#C0C0C0",
    "青色": "#00FFFF",
    "藏青色": "#000080",
    "珊瑚色": "#FF7F50",
    "米色": "#F5F5DC",
    "象牙白": "#FFFFF0",
    "亚麻色": "#FAF0E6",
    "驼色": "#D2B48C",
    "卡其色": "#F0DC82",
    "豆沙色": "#CD9575",
    "砖色": "#CD5C5C",
    "巧克力色": "#D2691E"
};

// 所有颜色单词
const words = Object.keys(colorWords);
// 所有颜色值
const colors = Object.values(colorWords);

// 音效系统
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 生成按钮点击音效（细腻的"嗒"声）
function playClickSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// 生成正确答案音效（木琴/马林巴琴短促上升音阶）
function playCorrectSound() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + index * 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.15);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + index * 0.1 + 0.15);
    });
}

// 生成错误答案音效（软木塞拔出的"噗"声）
function playErrorSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// DOM元素
const startScreen = document.getElementById('start-screen');
const difficultyScreen = document.getElementById('difficulty-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const customBtn = document.getElementById('custom-btn');
const startCustomBtn = document.getElementById('start-custom-btn');
const customOptions = document.getElementById('custom-options');
const countdownTimeInput = document.getElementById('countdown-time');
const totalQuestionsInput = document.getElementById('total-questions');
const errorPenaltySelect = document.getElementById('error-penalty');
const wordElement = document.getElementById('word');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerBarElement = document.getElementById('timer-bar');
const timerCharacterElement = document.getElementById('timer-character');
const ruleIndicator = document.getElementById('rule-indicator');
const ruleIcon = document.getElementById('rule-icon');
const ruleText = document.getElementById('rule-text');
const dualTaskCounter = document.getElementById('dual-task-counter');
const redButtonCountElement = document.getElementById('red-button-count');
const buttons = [
    document.getElementById('btn1'),
    document.getElementById('btn2'),
    document.getElementById('btn3'),
    document.getElementById('btn4'),
    document.getElementById('btn5'),
    document.getElementById('btn6')
];

// 当前正确答案的颜色值
let correctColor;
// 倒计时相关变量
let countdown;
let countdownTime = 3;

// 困难模式相关变量
let currentRule = 'color'; // 'color' 或 'meaning'
let redButtonCount = 0;
let dualTaskEnabled = false;
let questionsSinceLastDualTask = 0;
let matchQuestionCounter = 0; // 计数器，用于控制颜色与文字匹配的频率

// 游戏设置
let gameSettings = {
    difficulty: 'medium',
    totalQuestions: 20,
    currentQuestion: 0,
    score: 0,
    errorPenalty: false
};
// 常见词汇数组，用于生成题目文字
const commonWords = ["苹果", "香蕉", "猫咪", "狗狗", "太阳", "月亮", "星星", "花朵", "树木", "河流", "海洋", "山脉", "天空", "大地", "电脑", "手机", "书本", "铅笔", "学校", "家庭", "朋友", "快乐", "悲伤", "愤怒", "惊讶", "喜欢", "讨厌", "希望", "梦想", "时间", "空间"];

// 不同难度的颜色集
const colorSets = {
    easy: {
        colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]
    },
    medium: {
        colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#000000", "#FFFFFF", "#FFC0CB", "#00FFFF", "#A52A2A", "#808080", "#FFD700", "#C0C0C0", "#808000", "#000080", "#FF69B4", "#00BFFF", "#FF7F50", "#EE82EE"]
    },
    hard: {
        colors: Object.values(colorWords) // 使用所有颜色值
    }
};
// 当前使用的颜色集
let currentColorSet = colorSets.medium;

// 初始化游戏
function initGame() {
    // 检查是否达到题目总数
    if (gameSettings.currentQuestion >= gameSettings.totalQuestions) {
        endGame();
        return;
    }
    
    // 清除之前的倒计时
    clearInterval(countdown);
    
    // 初始化倒计时条和小狗
    timerBarElement.style.width = '100%';
    timerBarElement.setAttribute('data-age', 'young');
    
    // 隐藏规则提示和双重任务计数器
    ruleIndicator.style.display = 'none';
    dualTaskCounter.style.display = 'none';
    
    // 生成按钮数量：困难模式6个，其他模式4个
    const buttonCount = gameSettings.difficulty === 'hard' ? 6 : 4;
    
    // 生成不同的颜色按钮
    const buttonColors = [];
    while (buttonColors.length < buttonCount) {
        const randomColor = currentColorSet.colors[Math.floor(Math.random() * currentColorSet.colors.length)];
        if (!buttonColors.includes(randomColor)) {
            buttonColors.push(randomColor);
        }
    }
    
    // 打乱按钮颜色顺序
    buttonColors.sort(() => Math.random() - 0.5);
    
    // 生成题目文字和颜色
    let randomWord;
    if (gameSettings.difficulty === 'hard') {
        // 困难模式：使用颜色词作为文字，但文字和颜色不匹配
        // 获取按钮颜色名称
        const buttonColorNames = buttonColors.map(color => getColorName(color));
        
        // 先选择文本颜色（正确答案），确保它在按钮中
        correctColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
        
        // 确保文字和颜色不相同：选择一个与颜色不同的颜色词
        let availableWords = buttonColorNames.filter(name => getColorName(correctColor) !== name);
        // 如果过滤后没有可用词汇，则重新生成按钮直到有可用词汇
        while (availableWords.length === 0) {
            // 重新生成一组按钮
            buttonColors.length = 0;
            while (buttonColors.length < buttonCount) {
                const randomColor = currentColorSet.colors[Math.floor(Math.random() * currentColorSet.colors.length)];
                if (!buttonColors.includes(randomColor)) {
                    buttonColors.push(randomColor);
                }
            }
            buttonColors.sort(() => Math.random() - 0.5);
            const newButtonColorNames = buttonColors.map(color => getColorName(color));
            correctColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
            availableWords = newButtonColorNames.filter(name => getColorName(correctColor) !== name);
        }
        randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    } else {
        // 普通模式：随机选择文本（普通词汇或中性词）
        // 20%概率出现中性词
        if (Math.random() < 0.2) {
            // 中性词："文字"或"颜色"
            const neutralWords = ["文字", "颜色"];
            randomWord = neutralWords[Math.floor(Math.random() * neutralWords.length)];
            // 中性词加粗
            wordElement.style.fontWeight = 'bold';
        } else {
            // 普通词汇 - 排除颜色相关词汇，避免颜色与文字匹配
            const nonColorWords = ["苹果", "香蕉", "猫咪", "狗狗", "太阳", "月亮", "星星", "花朵", "树木", "河流", "海洋", "山脉", "天空", "大地", "电脑", "手机", "书本", "铅笔", "学校", "家庭", "朋友", "快乐", "悲伤", "愤怒", "惊讶", "喜欢", "讨厌", "希望", "梦想", "时间", "空间"];
            randomWord = nonColorWords[Math.floor(Math.random() * nonColorWords.length)];
            // 恢复正常字体粗细
            wordElement.style.fontWeight = 'normal';
        }
        
        // 普通模式：随机选择一个颜色作为文本颜色
        correctColor = currentColorSet.colors[Math.floor(Math.random() * currentColorSet.colors.length)];
    }
    
    // 设置文本和颜色
    wordElement.textContent = randomWord;
    // 如果颜色是白色，改为浅灰色以确保在白色背景上可见
    if (correctColor === '#FFFFFF') {
        wordElement.style.color = '#E0E0E0';
    } else {
        wordElement.style.color = correctColor;
    }
    
    // 清空反馈
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    
    // 重置红色按钮计数显示
    if (dualTaskEnabled) {
        redButtonCountElement.textContent = redButtonCount;
    }
    
    // 设置按钮文字和点击事件
    buttons.forEach((button, index) => {
        if (index < buttonCount) {
            // 显示按钮
            button.style.display = 'flex';
            // 按钮文字
            const colorName = getColorName(buttonColors[index]);
            button.textContent = colorName;
            
            // 双重任务：计数红色按钮出现次数
            if (dualTaskEnabled && colorName === '红色') {
                redButtonCount++;
                redButtonCountElement.textContent = redButtonCount;
            }
            
            // 移除之前的点击事件
            button.onclick = null;
            // 添加新的点击事件
            button.onclick = function() {
                // 播放按钮点击音效
                playClickSound();
                checkAnswer(buttonColors[index]);
            };
        } else {
            // 隐藏多余的按钮
            button.style.display = 'none';
        }
    });
    
    // 启动倒计时
    startCountdown();
}

// 更新规则提示
function updateRuleIndicator() {
    ruleIndicator.style.display = 'flex';
    if (currentRule === 'color') {
        ruleIcon.style.backgroundColor = '#4CAF50';
        ruleText.textContent = '点击文字显示的颜色';
    } else {
        ruleIcon.style.backgroundColor = '#FF9800';
        ruleText.textContent = '点击文字本身的含义';
    }
}

// 双重任务提问
function askDualTaskQuestion() {
    const userAnswer = prompt('红色按钮出现了多少次？');
    const correctAnswer = redButtonCount;
    
    if (parseInt(userAnswer) === correctAnswer) {
        // 回答正确
        feedbackElement.textContent = '双重任务正确！';
        feedbackElement.className = 'feedback correct';
    } else {
        // 回答错误，扣分
        feedbackElement.textContent = `双重任务错误！正确答案是 ${correctAnswer}`;
        feedbackElement.className = 'feedback incorrect';
        gameSettings.score = Math.max(0, gameSettings.score - 5);
        scoreElement.textContent = gameSettings.score;
    }
    
    // 重置红色按钮计数
    redButtonCount = 0;
    redButtonCountElement.textContent = redButtonCount;
}

// 游戏结束
function endGame() {
    clearInterval(countdown);
    wordElement.textContent = `游戏结束！`;
    wordElement.style.color = '#333333';
    feedbackElement.textContent = `得分：${gameSettings.score}/${gameSettings.totalQuestions}`;
    feedbackElement.className = 'feedback';
    
    // 禁用按钮
    buttons.forEach(button => {
        button.onclick = null;
        button.style.opacity = '0.5';
    });
    
    // 移除已有的返回按钮（如果存在）
    const existingBackBtn = gameScreen.querySelector('.back-to-start-btn');
    if (existingBackBtn) {
        existingBackBtn.remove();
    }
    
    // 显示返回按钮
    const backToStartBtn = document.createElement('button');
    backToStartBtn.textContent = '返回开始';
    backToStartBtn.className = 'start-btn back-to-start-btn';
    backToStartBtn.style.marginTop = '20px';
    backToStartBtn.onclick = function() {
        // 播放按钮点击音效
        playClickSound();
        // 重置游戏设置
        resetGameSettings();
        // 返回开始界面
        gameScreen.style.display = 'none';
        startScreen.style.display = 'block';
        // 移除返回按钮
        backToStartBtn.remove();
    };
    
    // 添加返回按钮到游戏界面
    gameScreen.appendChild(backToStartBtn);
}

// 重置游戏设置
function resetGameSettings() {
    gameSettings = {
        difficulty: 'medium',
        totalQuestions: 20,
        currentQuestion: 0,
        score: 0,
        errorPenalty: false
    };
    currentColorSet = colorSets.medium;
    countdownTime = 10;
    
    // 重置得分显示
    if (scoreElement) {
        scoreElement.textContent = '0';
    }
    
    // 恢复按钮状态
    buttons.forEach(button => {
        button.style.opacity = '1';
    });
}

// 启动倒计时
function startCountdown() {
    let timeLeft = countdownTime;
    let totalTime = countdownTime;
    let startTime = Date.now();
    
    // 初始化倒计时条和小狗
    timerBarElement.style.width = '100%';
    timerBarElement.setAttribute('data-age', 'young');
    
    // 根据难度设置倒计时条颜色
    if (gameSettings.difficulty === 'hard') {
        // 困难模式：橙黄 → 浅橙
        timerBarElement.style.background = 'linear-gradient(90deg, #FFC107, #FFB347)';
    } else {
        // 其他模式：草绿 → 橙黄
        timerBarElement.style.background = 'linear-gradient(90deg, #4CAF50, #FFC107)';
    }
    
    countdown = setInterval(() => {
        // 计算实际经过的时间，确保动画同步
        const elapsedTime = (Date.now() - startTime) / 1000;
        const remainingTime = Math.max(0, totalTime - elapsedTime);
        
        // 更新倒计时条宽度
        const progress = (remainingTime / totalTime) * 100;
        timerBarElement.style.width = `${progress}%`;
        
        // 更新小人物年龄状态
        if (progress > 66) {
            timerBarElement.setAttribute('data-age', 'young');
        } else if (progress > 33) {
            timerBarElement.setAttribute('data-age', 'adult');
        } else {
            timerBarElement.setAttribute('data-age', 'old');
        }
        
        if (remainingTime <= 0) {
            clearInterval(countdown);
            // 确保进度条完全走完
            timerBarElement.style.width = '0%';
            timerBarElement.setAttribute('data-age', 'old');
            
            feedbackElement.textContent = '时间到！';
            feedbackElement.className = 'feedback incorrect';
            // 屏幕边缘闪烁（错误闪淡橙）
            document.body.style.boxShadow = 'inset 0 0 50px rgba(255, 152, 0, 0.5)';
            setTimeout(() => {
                document.body.style.boxShadow = 'none';
            }, 300);
            // 如果开启了错误惩罚，减少分数
            if (gameSettings.errorPenalty) {
                if (gameSettings.difficulty === 'hard') {
                    // 困难模式-10分
                    gameSettings.score = Math.max(0, gameSettings.score - 10);
                } else if (gameSettings.difficulty === 'medium') {
                    // 中等模式-5分
                    gameSettings.score = Math.max(0, gameSettings.score - 5);
                } else {
                    // 简单模式-1分
                    gameSettings.score = Math.max(0, gameSettings.score - 1);
                }
                // 更新得分显示
                scoreElement.textContent = gameSettings.score;
            }
            // 增加当前题目数
            gameSettings.currentQuestion++;
            // 延迟1秒后进入下一题
            setTimeout(initGame, 1000);
        }
    }, 50); // 增加更新频率，使动画更平滑
}

// 检查答案
function checkAnswer(selectedColor) {
    // 清除倒计时
    clearInterval(countdown);
    
    // 所有模式：点击文字显示的颜色
    const isCorrect = selectedColor === correctColor;
    
    if (isCorrect) {
        // 正确答案
        feedbackElement.textContent = '正确！';
        feedbackElement.className = 'feedback correct';
        // 播放正确答案音效
        playCorrectSound();
        // 增加分数
        if (gameSettings.difficulty === 'hard') {
            // 困难模式+15分
            gameSettings.score += 15;
        } else if (gameSettings.difficulty === 'medium') {
            // 中等模式+10分
            gameSettings.score += 10;
        } else {
            // 简单模式+1分
            gameSettings.score++;
        }
        // 更新得分显示
        scoreElement.textContent = gameSettings.score;
        // 屏幕边缘闪烁（正确闪淡绿）
        document.body.style.boxShadow = 'inset 0 0 50px rgba(76, 175, 80, 0.5)';
        setTimeout(() => {
            document.body.style.boxShadow = 'none';
        }, 300);
    } else {
        // 错误答案
        // 正确答案是文字显示的颜色
        const correctAnswerText = getColorName(correctColor);
        
        feedbackElement.textContent = `错误！正确答案是：${correctAnswerText}`;
        feedbackElement.className = 'feedback incorrect';
        // 播放错误答案音效
        playErrorSound();
        // 如果开启了错误惩罚，减少分数
        if (gameSettings.errorPenalty) {
            if (gameSettings.difficulty === 'hard') {
                // 困难模式-10分
                gameSettings.score = Math.max(0, gameSettings.score - 10);
            } else if (gameSettings.difficulty === 'medium') {
                // 中等模式-5分
                gameSettings.score = Math.max(0, gameSettings.score - 5);
            } else {
                // 简单模式-1分
                gameSettings.score = Math.max(0, gameSettings.score - 1);
            }
            // 更新得分显示
            scoreElement.textContent = gameSettings.score;
        }
        // 屏幕边缘闪烁（错误闪淡橙）
        document.body.style.boxShadow = 'inset 0 0 50px rgba(255, 152, 0, 0.5)';
        setTimeout(() => {
            document.body.style.boxShadow = 'none';
        }, 300);
    }
    
    // 增加当前题目数
    gameSettings.currentQuestion++;
    
    // 延迟1秒后进入下一题
    setTimeout(initGame, 1000);
}

// 判断颜色是否为浅色（用于设置按钮文字颜色）
function isLightColor(color) {
    // 移除#号
    color = color.replace('#', '');
    // 转换为RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    // 计算亮度
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
}

// 根据颜色值获取颜色名称
function getColorName(color) {
    // 标准化颜色值（转为大写）
    const normalizedColor = color.toUpperCase();
    for (const [name, value] of Object.entries(colorWords)) {
        if (value.toUpperCase() === normalizedColor) {
            return name;
        }
    }
    // 如果找不到，返回颜色值本身作为备用
    console.warn('未找到颜色名称:', color);
    return color;
}

// 添加开始按钮点击事件
startBtn.addEventListener('click', function() {
    // 播放按钮点击音效
    playClickSound();
    // 隐藏开始界面，显示难度选择界面
    startScreen.style.display = 'none';
    difficultyScreen.style.display = 'block';
});

// 添加返回按钮点击事件
backBtn.addEventListener('click', function() {
    // 播放按钮点击音效
    playClickSound();
    // 隐藏难度选择界面，显示开始界面
    difficultyScreen.style.display = 'none';
    startScreen.style.display = 'block';
    // 隐藏自定义选项
    customOptions.style.display = 'none';
});

// 添加简单模式按钮点击事件
easyBtn.addEventListener('click', function() {
    // 播放按钮点击音效
    playClickSound();
    // 设置游戏设置
    gameSettings.difficulty = 'easy';
    gameSettings.totalQuestions = 20;
    gameSettings.currentQuestion = 0;
    gameSettings.score = 0;
    gameSettings.errorPenalty = false;
    // 设置倒计时时间
    countdownTime = 5;
    // 设置颜色集
    currentColorSet = colorSets.easy;
    // 隐藏难度选择界面，显示游戏界面
    difficultyScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    // 启动游戏
    initGame();
});

// 添加中等模式按钮点击事件
mediumBtn.addEventListener('click', function() {
    // 播放按钮点击音效
    playClickSound();
    // 设置游戏设置
    gameSettings.difficulty = 'medium';
    gameSettings.totalQuestions = 20;
    gameSettings.currentQuestion = 0;
    gameSettings.score = 0;
    gameSettings.errorPenalty = true; // 启用错误惩罚
    // 设置倒计时时间
    countdownTime = 3.5;
    // 设置颜色集
    currentColorSet = colorSets.medium;
    // 隐藏难度选择界面，显示游戏界面
    difficultyScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    // 启动游戏
    initGame();
});

// 添加困难模式按钮点击事件
hardBtn.addEventListener('click', function() {
    // 播放按钮点击音效
    playClickSound();
    // 设置游戏设置
    gameSettings.difficulty = 'hard';
    gameSettings.totalQuestions = 20;
    gameSettings.currentQuestion = 0;
    gameSettings.score = 0;
    gameSettings.errorPenalty = true; // 启用错误惩罚
    // 设置倒计时时间
    countdownTime = 2.5;
    // 设置颜色集
    currentColorSet = colorSets.hard;
    // 重置困难模式相关变量
    currentRule = 'color';
    redButtonCount = 0;
    dualTaskEnabled = false; // 禁用双重任务
    questionsSinceLastDualTask = 0;
    // 隐藏双重任务计数器
    dualTaskCounter.style.display = 'none';
    // 隐藏难度选择界面，显示游戏界面
    difficultyScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    // 启动游戏
    initGame();
});

// 添加自定义模式按钮点击事件
customBtn.addEventListener('click', function() {
    // 播放按钮点击音效
    playClickSound();
    // 显示自定义选项
    customOptions.style.display = 'block';
});

// 添加自定义开始按钮点击事件
startCustomBtn.addEventListener('click', function() {
    // 播放按钮点击音效
    playClickSound();
    // 设置游戏设置
    gameSettings.difficulty = 'custom';
    gameSettings.totalQuestions = parseInt(totalQuestionsInput.value);
    gameSettings.currentQuestion = 0;
    gameSettings.score = 0;
    gameSettings.errorPenalty = errorPenaltySelect.value === 'yes';
    // 设置倒计时时间
    countdownTime = parseInt(countdownTimeInput.value);
    // 设置颜色集（使用困难模式的颜色集）
    currentColorSet = colorSets.hard;
    // 隐藏难度选择界面，显示游戏界面
    difficultyScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    // 启动游戏
    initGame();
});