// 个人音乐中心页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initializeProfilePage();
    
    // 绑定事件监听器
    bindEventListeners();
});

// 初始化页面功能
function initializeProfilePage() {
    // 清除localStorage中的旧头像数据
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        delete userData.avatar;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        updateUserDisplay(userData);
    }
    
    // 确保userPlaylists数组存在于localStorage中
    if (!localStorage.getItem('userPlaylists')) {
        localStorage.setItem('userPlaylists', JSON.stringify([]));
        console.log('已初始化空的歌单数组到localStorage');
    }
    
    // 初始化标签页
    initializeTabs();
    
    // 初始化音乐播放器
    initializePlayer();
    
    // 加载用户数据
    loadUserData();
    
    console.log('歌单功能初始化完成');
}

// 更新用户显示信息
function updateUserDisplay(userData) {
    const userNameElements = document.querySelectorAll('#userName, #profileName');
    userNameElements.forEach(element => {
        if (element) element.textContent = userData.username;
    });
    
    // 更新用户头像
    const avatarElements = document.querySelectorAll('#userAvatar, #profileAvatar');
    avatarElements.forEach(element => {
        if (element) {
            element.src = 'image/音乐爱好者头像.png';
        }
    });
}

// 初始化标签页功能
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 初始化音乐播放器
function initializePlayer() {
    const playerElements = {
        playPauseBtn: document.getElementById('playPauseBtn'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        progressFill: document.getElementById('progressFill'),
        currentTime: document.getElementById('currentTime'),
        totalTime: document.getElementById('totalTime'),
        volumeBtn: document.getElementById('volumeBtn'),
        favoriteBtn: document.getElementById('favoriteBtn')
    };
    
    // 播放/暂停按钮
    if (playerElements.playPauseBtn) {
        playerElements.playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    // 上一首/下一首
    if (playerElements.prevBtn) {
        playerElements.prevBtn.addEventListener('click', playPrevious);
    }
    
    if (playerElements.nextBtn) {
        playerElements.nextBtn.addEventListener('click', playNext);
    }
    
    // 音量控制
    if (playerElements.volumeBtn) {
        playerElements.volumeBtn.addEventListener('click', toggleMute);
    }
    
    // 收藏功能
    if (playerElements.favoriteBtn) {
        playerElements.favoriteBtn.addEventListener('click', toggleFavorite);
    }
}

// 绑定所有事件监听器
function bindEventListeners() {
    // 编辑资料相关
    bindEditProfileEvents();
    
    // 歌单相关
    bindPlaylistEvents();
    
    // 音乐相关
    bindMusicEvents();
    
    // 统计相关
    bindStatisticsEvents();
}

// 绑定编辑资料相关事件
function bindEditProfileEvents() {
    const editProfileBtn = document.getElementById('editProfile');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditProfile = document.getElementById('closeEditProfile');
    const cancelEdit = document.getElementById('cancelEdit');
    const profileForm = document.getElementById('profileForm');
    
    // 打开编辑模态框
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            editProfileModal.style.display = 'block';
            // 填充当前用户信息
            fillProfileForm();
        });
    }
    
    // 关闭模态框
    if (closeEditProfile) {
        closeEditProfile.addEventListener('click', function() {
            editProfileModal.style.display = 'none';
        });
    }
    
    if (cancelEdit) {
        cancelEdit.addEventListener('click', function() {
            editProfileModal.style.display = 'none';
        });
    }
    
    // 点击模态框外部关闭
    if (editProfileModal) {
        editProfileModal.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                editProfileModal.style.display = 'none';
            }
        });
    }
    
    // 保存用户信息
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileData();
            editProfileModal.style.display = 'none';
            showNotification('资料更新成功！', 'success');
        });
    }
}

// 填充用户信息表单
function fillProfileForm() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        document.getElementById('editName').value = userData.username || '音乐爱好者';
    }
}

// 保存用户信息
function saveProfileData() {
    const formData = {
        username: document.getElementById('editName').value,
        bio: document.getElementById('editBio').value,
        location: document.getElementById('editLocation').value
    };
    
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        currentUser = JSON.parse(currentUser);
        Object.assign(currentUser, formData);
    } else {
        currentUser = formData;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserDisplay(currentUser);
}

// 绑定歌单相关事件
function bindPlaylistEvents() {
    const createPlaylistBtn = document.getElementById('createPlaylist');
    const createPlaylistModal = document.getElementById('createPlaylistModal');
    const closeCreatePlaylist = document.getElementById('closeCreatePlaylist');
    const cancelCreate = document.getElementById('cancelCreate');
    const playlistForm = document.getElementById('playlistForm');
    
    // 创建歌单
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', function() {
            createPlaylistModal.style.display = 'block';
        });
    }
    
    // 关闭模态框
    if (closeCreatePlaylist) {
        closeCreatePlaylist.addEventListener('click', function() {
            createPlaylistModal.style.display = 'none';
        });
    }
    
    if (cancelCreate) {
        cancelCreate.addEventListener('click', function() {
            createPlaylistModal.style.display = 'none';
        });
    }
    
    // 点击外部关闭
    if (createPlaylistModal) {
        createPlaylistModal.addEventListener('click', function(e) {
            if (e.target === createPlaylistModal) {
                createPlaylistModal.style.display = 'none';
            }
        });
    }
    
    // 创建歌单
    if (playlistForm) {
        playlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createPlaylist();
            createPlaylistModal.style.display = 'none';
            showNotification('歌单创建成功！', 'success');
        });
    }
}

// 创建歌单
function createPlaylist() {
    const playlistName = document.getElementById('playlistName').value;
    const playlistDescription = document.getElementById('playlistDescription').value;
    const playlistPrivacy = document.getElementById('playlistPrivacy').value;
    
    // 统一使用歌单默认封面
    const defaultCover = 'image/歌单默认封面.png';
    
    const newPlaylist = {
        id: Date.now(),
        name: playlistName,
        description: playlistDescription,
        privacy: playlistPrivacy,
        cover: defaultCover,
        songCount: 0,
        createdAt: new Date().toISOString()
    };
    
    // 保存到本地存储
    let playlists = JSON.parse(localStorage.getItem('userPlaylists') || '[]');
    playlists.push(newPlaylist);
    localStorage.setItem('userPlaylists', JSON.stringify(playlists));

    // 更新歌单数量统计
    let userStats = JSON.parse(localStorage.getItem('userStats') || '{"playlistCount": "3"}');
    // 安全地获取当前歌单数量并增加1
    const currentCount = parseInt(userStats.playlistCount) || 3;
    userStats.playlistCount = (currentCount + 1).toString();
    localStorage.setItem('userStats', JSON.stringify(userStats));
    updateStatistics(userStats);
    
    // 更新创建歌单数统计
    updatePlaylistCount(playlists.length);
    
    // 动态添加新歌单到UI
    addPlaylistToUI(newPlaylist);
    
    // 重置表单
    document.getElementById('playlistForm').reset();
    
    showNotification('歌单创建成功！', 'success');
}

// 更新歌单数量统计
function updatePlaylistCount(count) {
    const playlistCountElement = document.querySelector('.stat-card:has(.fa-list) .stat-value');
    if (playlistCountElement) {
        playlistCountElement.textContent = count;
    }
    
    // 更新用户统计信息
    let userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    userStats.playlistCount = count;
    localStorage.setItem('userStats', JSON.stringify(userStats));
}

// 动态添加歌单到UI
function addPlaylistToUI(playlist) {
    const playlistsGrid = document.querySelector('.playlists-grid');
    if (!playlistsGrid) return;
    
    // 创建歌单元素
    const playlistItem = document.createElement('div');
    playlistItem.className = 'playlist-item';
    playlistItem.dataset.id = playlist.id;
    
    // 设置歌单内容
    playlistItem.innerHTML = `
        <div class="playlist-cover">
            <img src="${playlist.cover}" alt="${playlist.name}歌单封面">
            <div class="playlist-overlay">
                <button class="play-btn">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
        <h3 class="playlist-title">${playlist.name}</h3>
        <p class="playlist-count">${playlist.songCount}首歌曲</p>
    `;
    
    // 添加到歌单网格（插入到第二个位置，因为第一个通常是"我喜欢的音乐"）
    const firstPlaylist = playlistsGrid.querySelector('.playlist-item');
    if (firstPlaylist) {
        playlistsGrid.insertBefore(playlistItem, firstPlaylist.nextSibling);
    } else {
        playlistsGrid.appendChild(playlistItem);
    }
    
    // 为新添加的播放按钮添加事件监听
    const playBtn = playlistItem.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            playMusic(playlist.name, '歌单');
        });
    }
    
    // 添加悬停效果动画
    setTimeout(() => {
        playlistItem.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            playlistItem.style.transform = 'translateY(0)';
        }, 300);
    }, 10);
}

// 绑定音乐相关事件
function bindMusicEvents() {
    // 播放按钮
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const musicItem = this.closest('.playlist-item');
            if (musicItem) {
                const title = musicItem.querySelector('.playlist-title').textContent;
                playMusic(title, '未知艺术家');
            }
        });
    });
    
    // 收藏按钮 - 修复状态不更新问题
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    
    // 初始化收藏状态
    favoriteButtons.forEach(button => {
        const icon = button.querySelector('i');
        if (icon) {
            const songItem = button.closest('.music-item');
            if (songItem && songItem.dataset.songId) {
                const songId = songItem.dataset.songId;
                if (savedFavorites[songId]) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#e74c3c'; // 设置红色
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = ''; // 重置颜色
                }
            }
        }
    });
    
    // 添加点击事件监听器
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const musicItem = this.closest('.music-item');
            if (icon && musicItem && musicItem.dataset.songId) {
                const songId = musicItem.dataset.songId;
                const songTitle = musicItem.querySelector('.music-title').textContent;
                const songArtist = musicItem.querySelector('.music-artist').textContent;
                
                // 切换图标和颜色
                const isFavorited = icon.classList.contains('fas');
                if (isFavorited) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = ''; // 重置颜色
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#e74c3c'; // 设置红色
                }
                
                // 保存状态到localStorage
                if (!isFavorited) {
                    savedFavorites[songId] = {
                        title: songTitle,
                        artist: songArtist,
                        timestamp: new Date().toISOString()
                    };
                } else {
                    delete savedFavorites[songId];
                }
                localStorage.setItem('favorites', JSON.stringify(savedFavorites));
                
                // 显示通知
                showNotification(
                    !isFavorited ? `已添加到喜欢: ${songTitle}` : `已从喜欢中移除: ${songTitle}`,
                    'success'
                );
            }
        });
    });
    
    // 移除收藏
    const removeFavoriteButtons = document.querySelectorAll('.remove-favorite');
    removeFavoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const musicItem = this.closest('.music-item');
            if (musicItem && confirm('确定要从喜欢中移除这首歌吗？')) {
                musicItem.remove();
                showNotification('已从喜欢中移除', 'success');
            }
        });
    });
    
    // 全部播放
    const playAllBtn = document.getElementById('playAll');
    if (playAllBtn) {
        playAllBtn.addEventListener('click', function() {
            playAllFavoriteMusic();
        });
    }
    
    // 清空最近播放
    const clearRecentBtn = document.getElementById('clearRecent');
    if (clearRecentBtn) {
        clearRecentBtn.addEventListener('click', function() {
            if (confirm('确定要清空最近播放记录吗？')) {
                clearRecentPlay();
            }
        });
    }
}

// 绑定统计相关事件
function bindStatisticsEvents() {
    // 图表悬停效果
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// 播放音乐
function playMusic(title, artist) {
    // 使用默认的音频URL进行播放
    const audioUrl = 'https://www.soundjay.com/misc/sounds-1/beep-07a.wav';
    
    // 如果全局updateGlobalPlayer函数存在，使用它
    if (window.updateGlobalPlayer) {
        // 创建一个模拟的音乐对象
        const music = {
            id: 'profile-' + Date.now(),
            title: title,
            artist: artist
        };
        window.updateGlobalPlayer(music);
    } else if (window.playMusic) {
        // 如果直接有全局的playMusic函数，使用它
        window.playMusic('profile-' + Date.now(), title, audioUrl);
    } else {
        // 否则只更新UI
        const playerElements = {
            cover: document.getElementById('playerCover'),
            title: document.getElementById('playerTitle'),
            artist: document.getElementById('playerArtist'),
            playPauseBtn: document.getElementById('playPauseBtn')
        };
        
        if (playerElements.title) {
            playerElements.title.textContent = title;
        }
        if (playerElements.artist) {
            playerElements.artist.textContent = artist;
        }
        if (playerElements.playPauseBtn) {
            playerElements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    showNotification(`正在播放：${title}`, 'info');
}

// 切换播放/暂停
function togglePlayPause() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const icon = playPauseBtn.querySelector('i');
    
    if (icon.classList.contains('fa-play')) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        showNotification('音乐播放', 'info');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        showNotification('音乐暂停', 'info');
    }
}

// 播放上一首
function playPrevious() {
    showNotification('播放上一首', 'info');
}

// 播放下一首
function playNext() {
    showNotification('播放下一首', 'info');
}

// 切换静音
function toggleMute() {
    const volumeBtn = document.getElementById('volumeBtn');
    const icon = volumeBtn.querySelector('i');
    
    if (icon.classList.contains('fa-volume-up')) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
        showNotification('已静音', 'info');
    } else {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
        showNotification('取消静音', 'info');
    }
}

// 切换收藏状态
function toggleFavorite() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const icon = favoriteBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('已添加到喜欢', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = ''; // 重置为默认颜色
        showNotification('已从喜欢中移除', 'success');
    }
}

// 播放所有喜欢的音乐
function playAllFavoriteMusic() {
    showNotification('开始播放所有喜欢音乐', 'info');
    // 这里可以实现播放列表功能
}

// 清空最近播放
function clearRecentPlay() {
    const recentList = document.querySelector('.recent-list');
    if (recentList) {
        recentList.innerHTML = '<div class="no-music"><p>暂无播放记录</p></div>';
    }
    showNotification('已清空播放记录', 'success');
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // 添加样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// 获取通知颜色
function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// 设置用户统计数据
function setUserStatistics() {
    // 处理现有统计数据，确保歌单数量初始值正确
    const existingStats = localStorage.getItem('userStats');
    if (!existingStats) {
        // 没有现有数据时设置初始值
        const stats = {
            totalPlays: '15,678',
            totalTime: '2,345小时',
            favoriteCount: '892',
            playlistCount: '3'
        };
        
        localStorage.setItem('userStats', JSON.stringify(stats));
        updateStatistics(stats);
    } else {
        // 有现有数据时检查并修正歌单数量初始值
        const stats = JSON.parse(existingStats);
        // 处理字符串或数字类型的旧默认值23
        if (stats.playlistCount === '23' || parseInt(stats.playlistCount) === 23) {
            // 重置旧默认值为3
            stats.playlistCount = '3';
            localStorage.setItem('userStats', JSON.stringify(stats));
            updateStatistics(stats);
        }
    }
}

// 加载用户数据
function loadUserData() {
    // 设置并显示统计数据
    setUserStatistics();
    
    // 加载歌单数据
    const playlists = JSON.parse(localStorage.getItem('userPlaylists') || '[]');
    if (playlists.length > 0) {
        updatePlaylistsDisplay(playlists);
    }
    
    // 加载最近播放数据
    const recentPlays = JSON.parse(localStorage.getItem('recentPlays') || '[]');
    if (recentPlays.length > 0) {
        updateRecentPlaysDisplay(recentPlays);
    }
}

// 更新统计数据显示
function updateStatistics(stats) {
    // 更新统计卡片中的数字
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const valueElement = card.querySelector('.stat-value');
        
        switch(title) {
            case '总播放次数':
                valueElement.textContent = stats.totalPlays || '0';
                break;
            case '累计听歌时间':
                valueElement.textContent = stats.totalTime || '0小时';
                break;
            case '收藏歌曲数':
                valueElement.textContent = stats.favoriteCount || '0';
                break;
            case '创建歌单数':
                valueElement.textContent = stats.playlistCount || '0';
                break;
        }
    });
}

// 更新歌单显示
function updatePlaylistsDisplay(playlists) {
    // 这里可以实现动态更新歌单列表的逻辑
    console.log('更新歌单显示:', playlists);
}

// 更新最近播放显示
function updateRecentPlaysDisplay(recentPlays) {
    const recentList = document.querySelector('.recent-list');
    if (!recentList) return;
    
    // 清空现有内容
    recentList.innerHTML = '';
    
    // 获取保存的收藏状态
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    
    if (recentPlays.length === 0) {
        recentList.innerHTML = '<p class="no-recent-plays">暂无最近播放记录</p>';
        return;
    }
    
    // 动态生成最近播放列表
    recentPlays.forEach(play => {
        const isFavorite = savedFavorites[play.songId];
        
        const musicItem = document.createElement('div');
        musicItem.className = 'music-item';
        musicItem.dataset.songId = play.songId;
        
        musicItem.innerHTML = `
            <div class="music-cover">
                <img src="${play.cover}" alt="${play.title}封面">
            </div>
            <div class="music-info">
                <h4 class="music-title">${play.title}</h4>
                <p class="music-artist">${play.artist}</p>
            </div>
            <div class="music-time">${play.duration}</div>
            <button class="favorite-btn">
                <i class="${isFavorite ? 'fas' : 'far'} fa-heart" style="${isFavorite ? 'color: #e74c3c;' : ''}"></i>
            </button>
        `;
        
        recentList.appendChild(musicItem);
    });
    
    // 重新绑定收藏按钮事件
    bindFavoriteButtonEvents();
    console.log('已更新最近播放显示');
}

// 绑定收藏按钮事件（提取为独立函数）
function bindFavoriteButtonEvents() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    
    favoriteButtons.forEach(button => {
        // 先移除可能存在的事件监听器，避免重复绑定
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const musicItem = this.closest('.music-item');
            if (icon && musicItem && musicItem.dataset.songId) {
                const songId = musicItem.dataset.songId;
                const songTitle = musicItem.querySelector('.music-title').textContent;
                const songArtist = musicItem.querySelector('.music-artist').textContent;
                
                // 切换图标和颜色
                const isFavorited = icon.classList.contains('fas');
                if (isFavorited) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = ''; // 重置颜色
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#e74c3c'; // 设置红色
                }
                
                // 保存状态到localStorage
                if (!isFavorited) {
                    savedFavorites[songId] = {
                        title: songTitle,
                        artist: songArtist,
                        timestamp: new Date().toISOString()
                    };
                } else {
                    delete savedFavorites[songId];
                }
                localStorage.setItem('favorites', JSON.stringify(savedFavorites));
                
                // 显示通知
                showNotification(
                    !isFavorited ? `已添加到喜欢: ${songTitle}` : `已从喜欢中移除: ${songTitle}`,
                    'success'
                );
            }
        });
    });
}