// 排行榜页面JavaScript功能

// 音乐数据 - 使用所有实际存在的歌曲文件
// 将musicData暴露为全局变量，以便其他脚本可以访问
window.musicData = {
    hot: [
        {
            id: 1,
            title: "不能说的秘密",
            artist: "周杰伦",
            cover: "image/不能说的秘密.jpg",
            playCount: "9800万",
            duration: "04:17",
            new: false,
            url: "music/周杰伦 - 不能说的秘密_L.ogg"
        },
        {
            id: 2,
            title: "再见只是陌生人",
            artist: "庄心妍",
            cover: "image/再见只是陌生人.jpg",
            playCount: "8200万",
            duration: "04:23",
            new: false,
            url: "music/庄心妍 - 再见只是陌生人_L.ogg"
        },
        {
            id: 3,
            title: "修炼爱情",
            artist: "林俊杰",
            cover: "image/修炼爱情.jpg",
            playCount: "7500万",
            duration: "04:46",
            new: false,
            url: "music/林俊杰 - 修炼爱情_L.ogg"
        },
        {
            id: 4,
            title: "我们的明天",
            artist: "鹿晗",
            cover: "image/我们的明天.jpg",
            playCount: "7300万",
            duration: "04:04",
            new: false,
            url: "music/鹿晗 - 我们的明天_L.ogg"
        },
        {
            id: 5,
            title: "星辰大海",
            artist: "黄霄雲",
            cover: "image/星辰大海.jpg",
            playCount: "7000万",
            duration: "03:28",
            new: true,
            url: "music/黄霄雲 - 星辰大海_L.ogg"
        },
        {
            id: 6,
            title: "给我一个理由忘记",
            artist: "A-Lin",
            cover: "image/给我一个理由忘记.jpg",
            playCount: "6500万",
            duration: "04:37",
            new: false,
            url: "music/A-Lin - 给我一个理由忘记_L.ogg"
        },
        {
            id: 7,
            title: "新地球",
            artist: "林俊杰",
            cover: "image/新地球.jpg",
            playCount: "6000万",
            duration: "04:29",
            new: false,
            url: "music/林俊杰 - 新地球_L.ogg"
        },
        {
            id: 8,
            title: "大眠",
            artist: "王心凌",
            cover: "image/大眠.jpg",
            playCount: "5900万",
            duration: "04:43",
            new: false,
            url: "music/王心凌 - 大眠_L.ogg"
        },
        {
            id: 9,
            title: "日不落",
            artist: "蔡依林",
            cover: "image/日不落.png",
            playCount: "5800万",
            duration: "03:48",
            new: false,
            url: "music/蔡依林 - 日不落_L.ogg"
        }
    ]
}

// 当前播放的音乐ID
let currentMusicId = null;
// 确保favorites数组中的ID都是数字类型
let favorites = JSON.parse(localStorage.getItem('rank_favorites')) || [];
favorites = favorites.map(id => parseInt(id));
// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeRankPage();
    loadMusicList('hot');
    updateFavoriteStatus();
    
    // 为"全部播放"按钮添加事件监听
    const playAllBtn = document.getElementById('playAllHot');
    if (playAllBtn) {
        playAllBtn.addEventListener('click', function() {
            // 播放热门榜的第一首歌
            if (musicData.hot && musicData.hot.length > 0) {
                rankPlayMusic(musicData.hot[0].id);
            }
        });
    }
    
    // 为"添加到歌单"按钮添加事件监听
    const collectBtn = document.getElementById('collectHot');
    if (collectBtn) {
        collectBtn.addEventListener('click', function() {
            showNotification('已添加到歌单');
        });
    }
});

// 初始化排行榜页面
function initializeRankPage() {
    // 为榜单分类按钮添加点击事件
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchCategory(category);
        });
    });

    // 为播放按钮添加点击事件
    const playButtons = document.querySelectorAll('.rank-play, .music-cover');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const rankId = this.getAttribute('data-rank-id') || 
                          this.getAttribute('data-music-id');
            rankPlayMusic(rankId);
        });
    });

    // 为收藏按钮添加点击事件
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const musicId = this.getAttribute('data-music-id');
            toggleFavorite(musicId);
        });
    });

    // 为操作按钮添加点击事件
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('data-action');
            const musicId = this.getAttribute('data-music-id');
            handleAction(action, musicId);
        });
    });
}

// 切换榜单分类
function switchCategory(category) {
    // 更新按钮状态
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });

    // 更新榜单列表
    const rankLists = document.querySelectorAll('.rank-list');
    rankLists.forEach(list => {
        list.classList.remove('active');
        if (list.getAttribute('data-rank-type') === category) {
            list.classList.add('active');
        }
    });

    // 加载音乐列表
    loadMusicList(category);

    // 显示通知
    showNotification(`已切换到${getCategoryName(category)}榜单`);
}

// 加载音乐列表
function loadMusicList(category) {
    const musicList = musicData[category] || [];
    const rankListElement = document.querySelector(`.rank-list[data-rank-type="${category}"]`);
    
    if (!rankListElement) return;
    
    const musicListElement = rankListElement.querySelector('.music-list');
    if (!musicListElement) return;

    let html = '';
    musicList.forEach((music, index) => {
        const isTop = index < 3;
        const topClass = index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : '';
        const isFavorited = favorites.includes(music.id);
        const playIcon = isFavorited ? 'fas fa-heart' : 'far fa-heart';

        html += `
            <div class="music-item ${topClass}" data-song="${music.id}">
                <div class="rank-number">${index + 1}</div>
                <div class="music-cover" data-music-id="${music.id}">
                    <img src="${music.cover}" alt="${music.title}" onerror="this.src='image/周杰伦.jpg'; this.onerror=null;">
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="music-info">
                    <h3 class="music-title">
                        ${music.title}
                        ${music.new ? '<span class="new-tag">NEW</span>' : ''}
                    </h3>
                    <p class="music-artist">${music.artist}</p>
                </div>
                <div class="music-stats">
                    <div class="play-count">
                        <i class="fas fa-headphones"></i>
                        ${music.playCount}
                    </div>
                </div>
                <div class="music-actions">
                    <button class="favorite-btn ${isFavorited ? 'active' : ''}" 
                            data-music-id="${music.id}">
                        <i class="${playIcon}"></i>
                    </button>
                    <button class="action-btn" data-action="download" data-music-id="${music.id}">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn" data-action="share" data-music-id="${music.id}">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="action-btn" data-action="more" data-music-id="${music.id}">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>
        `;
    });

    musicListElement.innerHTML = html;
    
    // 重新绑定事件监听器，确保动态生成的元素也能响应点击
    initializeRankPage();
}

// 获取榜单分类名称
function getCategoryName(category) {
    const categoryNames = {
        hot: '热门',
        new: '新歌',
        original: '原创'
    };
    return categoryNames[category] || '未知';
}

// 播放音乐 
function rankPlayMusic(musicId) {
    // 查找音乐信息
    let music = null;
    for (const category in musicData) {
        music = musicData[category].find(m => m.id == musicId);
        if (music) break;
    }

    if (music) {
        // 更新当前播放状态
        updateCurrentPlaying(musicId);

        // 显示播放通知
        showNotification(`正在播放：${music.title} - ${music.artist}`);
        
        // 添加播放统计
        music.playCount = (parseInt(music.playCount) + 1).toLocaleString() + '万';
        
        // 直接使用全局的playMusic函数播放音乐
        if (window.playMusic) {
            console.log('使用全局playMusic函数播放音乐');
            window.playMusic(musicId, music.title, music.url);
        } else if (window.updateGlobalPlayer) {
            console.log('使用全局updateGlobalPlayer函数播放音乐');
            window.updateGlobalPlayer(music);
        } else {
            console.error('未找到全局音乐播放函数');
            showNotification('播放失败：未找到播放器功能');
        }
    } else {
        console.error('未找到音乐信息，ID:', musicId);
        showNotification('播放失败：未找到音乐信息');
    }
}

// 更新当前播放状态
function updateCurrentPlaying(musicId) {
    // 移除之前的播放状态
    document.querySelectorAll('.music-item').forEach(item => {
        item.classList.remove('currently-playing');
        const icon = item.querySelector('.play-overlay i');
        if (icon) icon.className = 'fas fa-play';
    });

    // 添加当前播放状态
    const currentItem = document.querySelector(`[data-music-id="${musicId}"]`)?.closest('.music-item');
    if (currentItem) {
        currentItem.classList.add('currently-playing');
        const icon = currentItem.querySelector('.play-overlay i');
        if (icon) icon.className = 'fas fa-pause';
    }

    currentMusicId = musicId;
}

// 切换收藏状态
function toggleFavorite(musicId) {
    // 确保musicId是数字类型
    const numMusicId = parseInt(musicId);
    const index = favorites.indexOf(numMusicId);
    const isFavorited = index !== -1;

    if (isFavorited) {
        favorites.splice(index, 1);
        showNotification('已取消收藏');
    } else {
        favorites.push(numMusicId);
        showNotification('已添加到收藏');
    }

    // 保存到本地存储
    localStorage.setItem('rank_favorites', JSON.stringify(favorites));

    // 更新收藏状态显示
    updateFavoriteStatus();
}

// 更新所有收藏状态
function updateFavoriteStatus() {
    // 确保从localStorage获取的ID都是数字类型
    favorites = JSON.parse(localStorage.getItem('rank_favorites')) || [];
    favorites = favorites.map(id => parseInt(id));
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        const musicId = parseInt(btn.getAttribute('data-music-id'));
        const isFavorited = favorites.includes(musicId);
        const icon = btn.querySelector('i');
        
        if (icon) {
            icon.className = isFavorited ? 'fas fa-heart' : 'far fa-heart';
        }
        btn.classList.toggle('active', isFavorited);
    });
}

// 处理操作按钮点击
function handleAction(action, musicId) {
    const music = getMusicById(musicId);
    
    switch (action) {
        case 'download':
            showNotification(`开始下载：${music.title}`);
            break;
        case 'share':
            shareMusic(music);
            break;
        case 'more':
            showMoreOptions(music);
            break;
        default:
            console.log('未知操作:', action);
    }
}

// 根据ID获取音乐信息
function getMusicById(musicId) {
    for (const category in musicData) {
        const music = musicData[category].find(m => m.id == musicId);
        if (music) return music;
    }
    return null;
}

// 分享音乐
function shareMusic(music) {
    if (navigator.share) {
        navigator.share({
            title: music.title,
            text: `推荐歌曲：${music.title} - ${music.artist}`,
            url: window.location.href
        });
    } else {
        // 复制链接到剪贴板
        const url = `${window.location.href}?music=${music.id}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('分享链接已复制到剪贴板');
        });
    }
}

// 显示更多选项
function showMoreOptions(music) {
    // 这里可以显示一个模态框，包含更多选项
    const options = [
        `添加到歌单`,
        `设置为铃声`,
        `查看MV`,
        `相似推荐`
    ];
    
    // 简单的实现，显示通知
    showNotification(`${music.title} - 更多选项将在后续版本中提供`);
}

// 显示通知
function showNotification(message) {
    // 检查是否已经存在通知
    const existingNotification = document.querySelector('.rank-notification');
    if (existingNotification) {
        // 如果存在，更新消息并重置显示时间
        existingNotification.textContent = message;
        existingNotification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            existingNotification.style.transform = 'translateX(0)';
        }, 100);
        
        // 重置自动隐藏计时器
        clearTimeout(existingNotification.dataset.hideTimer);
        const hideTimer = setTimeout(() => {
            existingNotification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (existingNotification.parentNode) {
                    existingNotification.parentNode.removeChild(existingNotification);
                }
            }, 300);
        }, 3000);
        existingNotification.dataset.hideTimer = hideTimer;
        return;
    }

    // 创建新的通知元素
    const notification = document.createElement('div');
    notification.className = 'rank-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #81c784, #a5d6a7);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    const hideTimer = setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    notification.dataset.hideTimer = hideTimer;
}