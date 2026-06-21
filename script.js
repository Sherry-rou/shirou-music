// 全局变量
let currentSlide = 0;
let currentSongIndex = 0;
let isPlaying = false;
let currentAudio = null;
let isLoggedIn = false;

// 音乐播放列表
const musicPlaylist = [
    {
        id: 'song1',
        title: '不能说的秘密',
        artist: '周杰伦',
        cover: 'image/不能说的秘密.jpg',
        audio: 'music/周杰伦 - 不能说的秘密_L.ogg'
    },
    {
        id: 'song2',
        title: '再见只是陌生人',
        artist: '庄心妍',
        cover: 'image/再见只是陌生人.jpg',
        audio: 'music/庄心妍 - 再见只是陌生人_L.ogg'
    },
    {
        id: 'song3',
        title: '修炼爱情',
        artist: '林俊杰',
        cover: 'image/修炼爱情.jpg',
        audio: 'music/林俊杰 - 修炼爱情_L.ogg'
    },
    {
        id: 'song4',
        title: '我们的明天',
        artist: '鹿晗',
        cover: 'image/我们的明天.jpg',
        audio: 'music/鹿晗 - 我们的明天_L.ogg'
    },
    {
        id: 'top1',
        title: '星辰大海',
        artist: '黄霄雲',
        cover: 'image/周杰伦.jpg',
        audio: 'music/黄霄雲 - 星辰大海_L.ogg'
    },
    {
        id: 'top2',
        title: '不能说的秘密',
        artist: '周杰伦',
        cover: 'image/不能说的秘密.jpg',
        audio: 'music/周杰伦 - 不能说的秘密_L.ogg'
    },
    {
        id: 'top3',
        title: '再见只是陌生人',
        artist: '庄心妍',
        cover: 'image/再见只是陌生人.jpg',
        audio: 'music/庄心妍 - 再见只是陌生人_L.ogg'
    },
    {
        id: 'top4',
        title: '修炼爱情',
        artist: '林俊杰',
        cover: 'image/修炼爱情.jpg',
        audio: 'music/林俊杰 - 修炼爱情_L.ogg'
    }
];

// DOM 元素 - 初始化为null，将在DOMContentLoaded中获取
let loadingScreen = null;
let audioPlayer = null;
let currentTitle = null;
let currentArtist = null;
let currentCover = null;
let playIcon = null;
let currentTime = null;
let totalTime = null;
let progressBar = null;
let volumeIcon = null;
let audioWave = null;
// 登录相关元素已移至单独的login.html页面
const loginModal = null;
const loginForm = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    loadingScreen = document.getElementById('loadingScreen');
    audioPlayer = document.getElementById('audioPlayer');
    currentTitle = document.getElementById('currentTitle');
    currentArtist = document.getElementById('currentArtist');
    currentCover = document.getElementById('currentCover');
    playIcon = document.getElementById('playIcon');
    currentTime = document.getElementById('currentTime');
    totalTime = document.getElementById('totalTime');
    progressBar = document.getElementById('progressBar');
    volumeIcon = document.getElementById('volumeIcon');
    audioWave = document.querySelector('.audio-wave');
    
    // 验证关键元素是否存在
    if (!audioPlayer) {
        console.error('未找到音频播放器元素(audioPlayer)');
        return;
    }
    
    if (!currentTitle || !currentArtist || !currentCover) {
        console.error('未找到播放器显示元素');
        return;
    }
    
    // 模拟页面加载完成后隐藏加载屏幕
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
        }
    }, 500); // 减少加载动画时间，从1.5秒改为0.5秒
    
    initializeCarousel();
    initializeEventListeners();
    updateLoginStatus();
    initializeScrollAnimations();
    initializeScrollEffects();
    lazyLoadImages(); // 添加图片懒加载
});

// 初始化滚动效果
function initializeScrollEffects() {
    // 监听滚动事件，为导航栏添加动画效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const musicPlayer = document.querySelector('.music-player');
        
        if (window.scrollY > 50) {
            // 滚动超过50px时，增强导航栏的透明度和阴影
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            
            // 增强音乐播放器的透明度和阴影
            musicPlayer.style.background = 'rgba(255, 255, 255, 0.98)';
            musicPlayer.style.boxShadow = '0 -4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            // 滚动回到顶部时，恢复原始样式
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            
            musicPlayer.style.background = 'rgba(255, 255, 255, 0.95)';
            musicPlayer.style.boxShadow = '0 -4px 30px rgba(0, 0, 0, 0.1)';
        }
    });
}

// 轮播图功能
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // 自动轮播
    setInterval(() => {
        changeSlide(1);
    }, 4000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // 移除当前活动状态
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // 更新索引
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    // 添加新的活动状态
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function currentSlideIndex(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // 移除当前活动状态
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // 设置新的活动状态
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// 音乐播放器功能
// 定义音频事件处理函数（移到外部，避免作用域问题）
function onAudioLoaded() {
    console.log('音频加载完成');
}

function onAudioError(e) {
    console.error('音频错误事件:', e);
    
    // 只有当确实发生错误且音乐未在播放时才显示错误
    if (e.target.error && e.target.error.code !== 2) { // 2表示ABORTED（中止），通常是用户操作导致
        console.error('错误代码:', e.target.error.code);
        console.error('错误消息:', e.target.error.message);
        
        let errorMessage = '音频加载失败';
        switch (e.target.error.code) {
            case e.target.error.NETWORK_ERROR:
                errorMessage = '网络错误';
                break;
            case e.target.error.DECODE_ERROR:
                errorMessage = '音频解码错误';
                break;
            case e.target.error.NOT_SUPPORTED:
                errorMessage = '不支持的音频格式';
                break;
            default:
                return; // 忽略其他错误类型
        }
        
        if (!isPlaying) {
            updatePlayIcon();
            showNotification('无法播放音乐：' + errorMessage, 'error');
        }
    }
}

function playMusic(songId, title, audioSrc) {
    console.log('开始播放音乐，songId:', songId, 'title:', title, 'audioSrc:', audioSrc);
    
    // 移除所有音乐卡片的播放状态指示器
    document.querySelectorAll('.playing-indicator').forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // 为当前音乐卡片添加播放状态指示器
    const currentCard = document.querySelector(`[data-song="${songId}"]`);
    if (currentCard) {
        let indicator = currentCard.querySelector('.playing-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'playing-indicator';
            currentCard.appendChild(indicator);
        }
        indicator.classList.add('active');
    }
    
    // 显示当前播放音乐的加载状态
    if (currentCard) {
        let loadingOverlay = currentCard.querySelector('.loading-overlay');
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="small-spinner"></div>';
            currentCard.appendChild(loadingOverlay);
        }
        loadingOverlay.classList.add('active');
    }
    
    // 查找歌曲信息 - 首先尝试从musicPlaylist中查找
    let song = musicPlaylist.find(s => s.id === songId);
    
    // 如果没有找到，尝试从全局musicData中查找（排行榜数据）
    if (!song && window.musicData) {
        for (const category in window.musicData) {
            song = window.musicData[category].find(m => m.id == songId);
            if (song) break;
        }
    }
    
    console.log('找到的歌曲信息:', song);
    
    // 更新当前歌曲索引
    currentSongIndex = musicPlaylist.findIndex(s => s.id === songId);
    
    // 更新播放器信息
    if (song) {
        currentTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        currentCover.src = song.cover || 'https://via.placeholder.com/60x60/666/999';
    } else {
        // 如果没有找到歌曲，使用传入的标题
        currentTitle.textContent = title || '未知歌曲';
        currentArtist.textContent = '未知艺术家';
        currentCover.src = 'https://via.placeholder.com/60x60/666/999';
    }
    
    // 设置音频源，优先使用传入的audioSrc，如果没有则使用song.audio或song.url（同时支持两种属性名）
    let audioUrl = audioSrc || (song ? (song.audio || song.url) : '');
    if (!audioUrl) {
        console.error('没有找到有效的音频源');
        showNotification('无法播放音乐：没有找到有效的音频源', 'error');
        return;
    }
    
    // 确保音频URL是正确的相对路径
    if (!audioUrl.startsWith('http') && !audioUrl.startsWith('data:')) {
        // 如果不是绝对URL，确保路径以music/开头
        if (!audioUrl.startsWith('music/')) {
            audioUrl = 'music/' + audioUrl;
        }
    }
    
    console.log('最终音频URL:', audioUrl);
    
    try {
        // 清除之前的事件监听器
        audioPlayer.removeEventListener('loadeddata', onAudioLoaded);
        audioPlayer.removeEventListener('error', onAudioError);
        
        // 添加新的事件监听器
        audioPlayer.addEventListener('loadeddata', onAudioLoaded);
        audioPlayer.addEventListener('error', onAudioError);
        
        // 设置音频源并加载
        audioPlayer.src = audioUrl;
        audioPlayer.load(); // 显式调用load()确保重新加载音频
        currentAudio = audioPlayer;
        
        // 播放音乐 - 直接尝试播放，不依赖loadeddata事件，因为用户已经交互
        audioPlayer.play().then(() => {
            console.log('音频播放成功启动');
            isPlaying = true;
            updatePlayIcon();
            
            // 隐藏加载覆盖层
            if (currentCard) {
                const loadingOverlay = currentCard.querySelector('.loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.classList.remove('active');
                }
            }
        }).catch(error => {
            console.error('播放失败:', error);
            
            // 只有当确实发生错误时才显示错误提示
            if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                isPlaying = false;
                updatePlayIcon();
                showNotification('无法播放音乐：' + error.message, 'error');
            }
            
            // 隐藏加载覆盖层
            if (currentCard) {
                const loadingOverlay = currentCard.querySelector('.loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.classList.remove('active');
                }
            }
        });
    } catch (error) {
        console.error('播放音乐时发生未捕获的错误:', error);
        
        // 只有当确实发生错误时才显示错误提示
        if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
            isPlaying = false;
            updatePlayIcon();
            showNotification('播放音乐时发生错误：' + error.message, 'error');
        }
        
        // 隐藏加载覆盖层
        if (currentCard) {
            const loadingOverlay = currentCard.querySelector('.loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }
        }
    }
    
    // 添加播放事件监听器
    setupAudioEventListeners();
}

function togglePlay() {
    if (!currentAudio) {
        // 如果没有选择歌曲，播放第一首
        playMusic('song1', '热门单曲1', musicPlaylist[0].audio);
        return;
    }
    
    if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
        if (audioWave) {
            audioWave.classList.remove('active');
        }
    } else {
        currentAudio.play();
        isPlaying = true;
        if (audioWave) {
            audioWave.classList.add('active');
        }
    }
    updatePlayIcon();
}

function previousTrack() {
    if (musicPlaylist.length === 0) return;
    
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = musicPlaylist.length - 1;
    }
    
    const song = musicPlaylist[currentSongIndex];
    playMusic(song.id, song.title, song.audio);
}

function nextTrack() {
    if (musicPlaylist.length === 0) return;
    
    currentSongIndex++;
    if (currentSongIndex >= musicPlaylist.length) {
        currentSongIndex = 0;
    }
    
    const song = musicPlaylist[currentSongIndex];
    playMusic(song.id, song.title, song.audio);
}

function updatePlayIcon() {
    if (isPlaying) {
        playIcon.className = 'fas fa-pause';
    } else {
        playIcon.className = 'fas fa-play';
    }
}

function setupAudioEventListeners() {
    if (!currentAudio) return;
    
    currentAudio.addEventListener('loadedmetadata', () => {
        totalTime.textContent = formatTime(currentAudio.duration);
    });
    
    currentAudio.addEventListener('timeupdate', () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = progress + '%';
        currentTime.textContent = formatTime(currentAudio.currentTime);
    });
    
    currentAudio.addEventListener('ended', () => {
        nextTrack();
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 进度条控制
const progressBarElement = document.querySelector('.progress-bar');
if (progressBarElement) {
    progressBarElement.addEventListener('click', function(e) {
        if (!currentAudio) return;
        
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        currentAudio.currentTime = percent * currentAudio.duration;
    });
}

// 音量控制
function setVolume(value) {
    if (audioPlayer) {
        audioPlayer.volume = value / 100;
        updateVolumeIcon(value);
    }
}

function toggleMute() {
    if (audioPlayer) {
        audioPlayer.muted = !audioPlayer.muted;
        updateVolumeIcon(audioPlayer.muted ? 0 : audioPlayer.volume * 100);
    }
}

function updateVolumeIcon(volume) {
    if (volume === 0 || audioPlayer.muted) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 50) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// 登录功能
function showLogin() {
    // 已改为使用单独的login.html页面
    window.location.href = 'login.html';
}

function hideLogin() {
    // 已改为使用单独的login.html页面
    if (loginModal) {
        loginModal.style.display = 'none';
    }
}

// 更新登录状态显示
function updateLoginStatus() {
    const loginBtn = document.querySelector('.user-actions .login-btn');
    const userProfile = document.querySelector('.user-actions .user-profile');
    
    if (loginBtn && userProfile) {
        if (isLoggedIn) {
            // 显示用户信息
            loginBtn.style.display = 'none';
            userProfile.style.display = 'flex';
            const usernameDisplay = userProfile.querySelector('.username');
            if (usernameDisplay) {
                usernameDisplay.textContent = localStorage.getItem('qqmusic_username') || '用户';
            }
        } else {
            // 显示登录按钮
            loginBtn.style.display = 'inline-block';
            userProfile.style.display = 'none';
        }
    }
}

function logout() {
    isLoggedIn = false;
    updateLoginStatus();
    showNotification('已成功退出登录', 'success');
}

// 登录表单处理已移至login.html页面
// 检查是否已记住用户名已移至login.html页面
// 社交登录功能已移至login.html页面

// 通知功能
function showNotification(message, type = 'info') {
    // 检查是否已存在相同类型的通知
    const existingNotification = document.querySelector(`.${type}-state`);
    if (existingNotification) {
        return;
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `${type}-state`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // 自动移除
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// 添加滑入滑出动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 滚动动画函数
function initializeScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    }
    
    // 初始化检查
    checkReveal();
    
    // 滚动时检查
    window.addEventListener('scroll', checkReveal);
}

// 事件监听器
function initializeEventListeners() {
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            hideLogin();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideLogin();
        }
    });
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT') return; // 在输入框中不触发
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousTrack();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextTrack();
                break;
        }
    });
    
    // 音乐卡片点击事件
    document.querySelectorAll('.music-card').forEach(card => {
        card.addEventListener('click', function() {
            const songId = this.dataset.song;
            const song = musicPlaylist.find(s => s.id === songId);
            if (song) {
                playMusic(song.id, song.title, song.audio);
            }
        });
    });
    
    // 排行榜项点击事件
    document.querySelectorAll('.ranking-item').forEach(item => {
        item.addEventListener('click', function() {
            const songId = this.dataset.song || this.getAttribute('onclick').match(/'([^']+)'/)[1];
            const song = musicPlaylist.find(s => s.id === songId);
            if (song) {
                playMusic(song.id, song.title, song.audio);
            }
        });
    });
}

// 搜索功能
document.querySelector('.search-btn').addEventListener('click', function() {
    showNotification('搜索功能开发中...', 'info');
});

// 平滑滚动
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 懒加载图片
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 页面可见性变化时暂停/恢复播放
document.addEventListener('visibilitychange', function() {
    if (document.hidden && isPlaying && currentAudio) {
        currentAudio.pause();
    } else if (!document.hidden && isPlaying && currentAudio) {
        currentAudio.play();
    }
});

// 导出全局函数供HTML调用
window.changeSlide = changeSlide;
window.currentSlide = currentSlideIndex;
window.playMusic = playMusic;
window.togglePlay = togglePlay;
window.previousTrack = previousTrack;
window.nextTrack = nextTrack;
window.setVolume = setVolume;
window.toggleMute = toggleMute;
window.showLogin = showLogin;
window.hideLogin = hideLogin;

// 全局播放控制函数，供其他页面调用
function updateGlobalPlayer(music) {
    if (music && music.id) {
        // 同时支持url和audio属性，提高兼容性
        const audioUrl = music.audio || music.url;
        if (audioUrl) {
            // 使用音乐对象中的实际URL播放音乐
            playMusic(music.id, music.title, audioUrl);
        }
    }
}

window.updateGlobalPlayer = updateGlobalPlayer;