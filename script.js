// 颜色单词和对应的颜色值 - 标准中文色卡
const colorWords = {
    // 第一行
    "嫩黄": "#FFE500",
    "胭脂红": "#C2185B",
    "琥珀": "#FF8F00",
    "象牙白": "#FFFFF0",
    "柳黄色": "#E6CE36",
    "朱红色": "#E53935",
    "桔色": "#FF7043",
    "白雪色": "#FAFAFA",
    "莺黄色": "#FFF59D",
    "妃红色": "#D81B60",
    "橙色": "#FF9800",
    "月白": "#F0F8FF",
    "绿色": "#4CAF50",
    "褐色": "#8D6E63",
    "秋香色": "#D4AF37",
    "素白色": "#F5F5F5",
    "湖蓝色": "#4FC3F7",
    "棕色": "#795548",
    "金色": "#FFD700",
    "盘色": "#F5F5F5",
    "明黄色": "#FFEB3B",
    "橙色": "#FF9800",
    "浅蓝色": "#2196F3",
    "牙色": "#FFE0B2",
    "鸦青色": "#455A64",
    "橄榄色": "#8D6E63",
    "靛青色": "#1A237E",
    "铂色": "#E5E4E2",
    "铜绿色": "#00C853",
    "桔红色": "#FF6F00",
    "湖蓝色": "#4FC3F7",
    "玄色": "#424242",
    "豆绿色": "#A5D6A7",
    "橘黄色": "#FFAB40",
    "蓝灰色": "#90A4AE",
    "乌云": "#455A64",
    "松绿色": "#4CAF50",
    "橘红色": "#FF6F00",
    "藏蓝色": "#0D47A1",
    "墨黑": "#212121",
    "松花色": "#F0F4C3",
    "黄色": "#FFEB3B",
    "藏青色": "#0D47A1",
    "墨绿": "#2E7D32",
    "妃色": "#D81B60",
    "驼色": "#8D6E63",
    "紫色": "#7B1FA2",
    "黑灰色": "#616161",
    "品红色": "#E91E63",
    "棕色": "#795548",
    "雪青色": "#673AB7",
    "黝色": "#424242",
    "海棠红": "#E53935",
    "褐色": "#8D6E63",
    "青莲": "#673AB7",
    "黧色": "#424242",
    "石榴红": "#C62828",
    "棕色": "#795548",
    "雪青": "#64B5F6",
    "苍色": "#90A4AE",
    "大红色": "#F44336",
    "棕褐色": "#5D4037",
    "藕荷色": "#E1BEE7",
    "老色": "#90A4AE"
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
        colors: ["#F44336", "#4CAF50", "#2196F3", "#FFEB3B"] // 大红色, 绿色, 浅蓝色, 黄色
    },
    medium: {
        colors: ["#F44336", "#4CAF50", "#2196F3", "#FFEB3B", "#FF9800", "#7B1FA2", "#424242", "#FAFAFA", "#E91E63", "#4FC3F7", "#795548", "#90A4AE", "#FFD700", "#E5E4E2", "#8D6E63", "#0D47A1", "#C2185B", "#00C853", "#FF6F00", "#673AB7"]
    },
    hard: {
        colors: Object.values(colorWords) // 使用所有颜色值
    }
};
// 当前使用的颜色集
let currentColorSet = colorSets.medium;

// 确保页面刷新时游戏状态正确重置
window.addEventListener('load', function() {
    // 重置游戏设置
    resetGameSettings();
    // 确保初始界面正确显示
    startScreen.style.display = 'block';
    difficultyScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    customOptions.style.display = 'none';
});

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
        let buttonColorNames = buttonColors.map(color => getColorName(color));
        
        // 有正确答案：从按钮颜色中选择
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
            buttonColorNames = buttonColors.map(color => getColorName(color));
            correctColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
            availableWords = buttonColorNames.filter(name => getColorName(correctColor) !== name);
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
        
        // 有正确答案：从按钮颜色中选择
        correctColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
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