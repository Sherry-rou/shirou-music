// 修复后的搜索脚本

const searchData = {
    songs: [
        {
            id: 1,
            title: "晴天",
            artist: "周杰伦",
            album: "叶惠美",
            cover: "image/叶惠美.jpg",
            duration: "04:29",
            year: "2003"
        },
        {
            id: 2,
            title: "稻香",
            artist: "周杰伦",
            album: "魔杰座",
            cover: "image/魔杰座.jpg",
            duration: "03:45",
            year: "2008"
        },
        {
            id: 3,
            title: "青花瓷",
            artist: "周杰伦",
            album: "我很忙",
            cover: "image/我很忙.jpg",
            duration: "04:23",
            year: "2007"
        },
        {
            id: 4,
            title: "夜曲",
            artist: "周杰伦",
            album: "十一月的萧邦",
            cover: "image/十一月的萧邦.jpg",
            duration: "03:48",
            year: "2005"
        },
        {
            id: 5,
            title: "简单爱",
            artist: "周杰伦",
            album: "范特西",
            cover: "image/范特西.jpg",
            duration: "04:28",
            year: "2001"
        },
        {
            id: 6,
            title: "七月的雨",
            artist: "易烊千玺",
            album: "七月的雨",
            cover: "image/我们的明天.jpg",
            duration: "03:56",
            year: "2024"
        },
        {
            id: 7,
            title: "星辰大海",
            artist: "黄子韬",
            album: "星海",
            cover: "image/星辰大海.jpg",
            duration: "04:12",
            year: "2024"
        },
        {
            id: 8,
            title: "光年之外",
            artist: "邓紫棋",
            album: "新的心跳",
            cover: "image/轮播图2.png",
            duration: "04:21",
            year: "2016"
        },
        {
            id: 9,
            title: "成都",
            artist: "赵雷",
            album: "无法长大",
            cover: "image/成都.jpg",
            duration: "05:28",
            year: "2016"
        },
        {
            id: 10,
            title: "后来",
            artist: "刘若英",
            album: "我等你",
            cover: "image/再见只是陌生人.jpg",
            duration: "05:31",
            year: "1999"
        },
        {
            id: 11,
            title: "不能说的秘密",
            artist: "周杰伦",
            album: "不能说的秘密",
            cover: "image/不能说的秘密.jpg",
            duration: "04:56",
            year: "2007"
        },
        {
            id: 12,
            title: "七里香",
            artist: "周杰伦",
            album: "七里香",
            cover: "image/七里香.jpg",
            duration: "04:59",
            year: "2004"
        },
        {
            id: 13,
            title: "东风破",
            artist: "周杰伦",
            album: "叶惠美",
            cover: "image/叶惠美.jpg",
            duration: "05:13",
            year: "2003"
        },
        {
            id: 14,
            title: "小幸运",
            artist: "田馥甄",
            album: "我的少女时代 电影原声带",
            cover: "image/轮播图2.png",
            duration: "04:20",
            year: "2015"
        },
        {
            id: 15,
            title: "像我这样的人",
            artist: "毛不易",
            album: "平凡的一天",
            cover: "image/轮播图3.png",
            duration: "03:39",
            year: "2017"
        },
        {
            id: 16,
            title: "起风了",
            artist: "买辣椒也用券",
            album: "起风了",
            cover: "image/轮播图3.png",
            duration: "05:25",
            year: "2018"
        },
        {
            id: 17,
            title: "芒种",
            artist: "音阙诗听",
            album: "芒种",
            cover: "image/轮播图2.png",
            duration: "03:36",
            year: "2019"
        },
        {
            id: 18,
            title: "少年",
            artist: "梦然",
            album: "少年",
            cover: "image/轮播图3.png",
            duration: "03:58",
            year: "2020"
        },
        {
            id: 19,
            title: "成都",
            artist: "赵雷",
            album: "无法长大",
            cover: "image/成都.jpg",
            duration: "05:28",
            year: "2016"
        },
        {
            id: 20,
            title: "南方姑娘",
            artist: "赵雷",
            album: "赵小雷",
            cover: "image/轮播图2.png",
            duration: "04:51",
            year: "2011"
        }
    ],
    artists: [
        {
            id: 1,
            name: "周杰伦",
            avatar: "image/周杰伦.jpg",
            songs: 100,
            fans: "10亿",
            description: "华语流行音乐歌手、作曲家、演员"
        },
        {
            id: 2,
            name: "邓紫棋",
            avatar: "https://p1.music.126.net/7C2Z8Z2Y1W3xYvH1Z2W8A8w==/109951163085912007.jpg",
            songs: 80,
            fans: "5000万",
            description: "华语流行音乐歌手、词曲创作人"
        },
        {
            id: 3,
            name: "赵雷",
            avatar: "https://p1.music.126.net/AC2Z8Z2Y1W3xYvH1Z2W8B1w==/109951163085912010.jpg",
            songs: 50,
            fans: "2000万",
            description: "民谣歌手、音乐人"
        },
        {
            id: 4,
            name: "刘若英",
            avatar: "https://p1.music.126.net/EC2Z8Z2Y1W3xYvH1Z2W8B5w==/109951163085912014.jpg",
            songs: 120,
            fans: "3000万",
            description: "华语流行音乐歌手、演员"
        },
        {
            id: 5,
            name: "易烊千玺",
            avatar: "https://p1.music.126.net/5C2Z8Z2Y1W3xYvH1Z2W8A6w==/109951163085912005.jpg",
            songs: 30,
            fans: "8000万",
            description: "中国内地男歌手、舞者、演员"
        },
        {
            id: 6,
            name: "黄子韬",
            avatar: "https://p1.music.126.net/6C2Z8Z2Y1W3xYvH1Z2W8A7w==/109951163085912006.jpg",
            songs: 40,
            fans: "6000万",
            description: "中国内地男歌手、演员"
        },
        {
            id: 7,
            name: "田馥甄",
            avatar: "https://p1.music.126.net/FC2Z8Z2Y1W3xYvH1Z2W8B6w==/109951163085912015.jpg",
            songs: 70,
            fans: "4000万",
            description: "华语流行音乐歌手、演员"
        },
        {
            id: 8,
            name: "毛不易",
            avatar: "https://p1.music.126.net/1C2Z8Z2Y1W3xYvH1Z2W8B0w==/109951163085912009.jpg",
            songs: 50,
            fans: "3000万",
            description: "中国内地男歌手、词曲创作人"
        },
        {
            id: 9,
            name: "买辣椒也用券",
            avatar: "https://p1.music.126.net/BC2Z8Z2Y1W3xYvH1Z2W8B2w==/109951163085912011.jpg",
            songs: 20,
            fans: "2000万",
            description: "中国内地女歌手"
        },
        {
            id: 10,
            name: "音阙诗听",
            avatar: "https://p1.music.126.net/JC2Z8Z2Y1W3xYvH1Z2W8C1w==/109951163085912019.jpg",
            songs: 60,
            fans: "3000万",
            description: "中国内地音乐团队"
        }
    ],
    albums: [
        {
            id: 1,
            title: "叶惠美",
            artist: "周杰伦",
            cover: "image/叶惠美.jpg",
            songs: 12,
            year: "2003",
            genre: "流行"
        },
        {
            id: 2,
            title: "魔杰座",
            artist: "周杰伦",
            cover: "image/魔杰座.jpg",
            songs: 10,
            year: "2008",
            genre: "流行"
        },
        {
            id: 3,
            title: "我很忙",
            artist: "周杰伦",
            cover: "image/我很忙.jpg",
            songs: 10,
            year: "2007",
            genre: "流行"
        },
        {
            id: 4,
            title: "十一月的萧邦",
            artist: "周杰伦",
            cover: "image/十一月的萧邦.jpg",
            songs: 11,
            year: "2005",
            genre: "流行"
        },
        {
            id: 5,
            title: "范特西",
            artist: "周杰伦",
            cover: "image/范特西.jpg",
            songs: 12,
            year: "2001",
            genre: "流行"
        },
        {
            id: 6,
            title: "七月的雨",
            artist: "易烊千玺",
            cover: "https://p1.music.126.net/5C2Z8Z2Y1W3xYvH1Z2W8A6w==/109951163085912005.jpg",
            songs: 1,
            year: "2024",
            genre: "流行"
        },
        {
            id: 7,
            title: "星辰大海",
            artist: "黄霄云",
            cover: "image/星辰大海.jpg",
            songs: 8,
            year: "2024",
            genre: "流行"
        },
        {
            id: 8,
            title: "新的心跳",
            artist: "邓紫棋",
            cover: "https://p1.music.126.net/7C2Z8Z2Y1W3xYvH1Z2W8A8w==/109951163085912007.jpg",
            songs: 10,
            year: "2015",
            genre: "流行"
        },
        {
            id: 9,
            title: "无法长大",
            artist: "赵雷",
            cover: "https://p1.music.126.net/AC2Z8Z2Y1W3xYvH1Z2W8B1w==/109951163085912010.jpg",
            songs: 10,
            year: "2016",
            genre: "民谣"
        },
        {
            id: 10,
            title: "我等你",
            artist: "刘若英",
            cover: "https://p1.music.126.net/EC2Z8Z2Y1W3xYvH1Z2W8B5w==/109951163085912014.jpg",
            songs: 10,
            year: "1999",
            genre: "流行"
        },
        {
            id: 11,
            title: "不能说的秘密",
            artist: "周杰伦",
            cover: "image/不能说的秘密.jpg",
            songs: 1,
            year: "2007",
            genre: "流行"
        },
        {
            id: 12,
            title: "七里香",
            artist: "周杰伦",
            cover: "image/七里香.jpg",
            songs: 10,
            year: "2004",
            genre: "流行"
        },
        {
            id: 13,
            title: "我的少女时代 电影原声带",
            artist: "田馥甄",
            cover: "https://p1.music.126.net/FC2Z8Z2Y1W3xYvH1Z2W8B6w==/109951163085912015.jpg",
            songs: 5,
            year: "2015",
            genre: "流行"
        },
        {
            id: 14,
            title: "平凡的一天",
            artist: "毛不易",
            cover: "https://p1.music.126.net/1C2Z8Z2Y1W3xYvH1Z2W8B0w==/109951163085912009.jpg",
            songs: 11,
            year: "2017",
            genre: "民谣"
        },
        {
            id: 15,
            title: "赵小雷",
            artist: "赵雷",
            cover: "https://p1.music.126.net/BC2Z8Z2Y1W3xYvH1Z2W8B2w==/109951163085912011.jpg",
            songs: 10,
            year: "2011",
            genre: "民谣"
        }
    ]
};

// 以下是原搜索脚本的其他部分
let currentSearchQuery = '';
let currentFilter = 'all';
let currentMusicId = null;
let favorites = JSON.parse(localStorage.getItem('search_favorites')) || [];
let searchHistory = JSON.parse(localStorage.getItem('search_history')) || [];

document.addEventListener('DOMContentLoaded', function() {
    initializeSearchPage();
});

function initializeSearchPage() {
    // 初始化页面元素
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // 绑定搜索按钮点击事件
    searchBtn.addEventListener('click', handleSearch);
    
    // 绑定回车键事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // 绑定输入事件，显示搜索建议
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value;
        showSuggestions(query);
    });
    
    // 绑定其他事件
    bindSuggestionEvents();
    bindFilterEvents();
    bindCategoryEvents();
}

function bindEventListeners() {
    // 绑定事件监听器
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function bindSuggestionEvents() {
    // 绑定搜索建议点击事件
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const keyword = this.getAttribute('data-keyword');
            const searchInput = document.getElementById('searchInput');
            searchInput.value = keyword;
            performSearch(keyword);
        });
    });
}

function bindFilterEvents() {
    // 绑定筛选按钮点击事件
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            // 更新当前筛选条件
            currentFilter = this.getAttribute('data-filter');
            // 如果有当前搜索查询，重新显示结果
            if (currentSearchQuery) {
                displaySearchResults(currentSearchQuery);
            }
        });
    });
}

function bindCategoryEvents() {
    // 绑定分类卡片点击事件
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            let keyword = '';
            
            switch(category) {
                case 'hot':
                    keyword = '热门歌曲';
                    break;
                case 'new':
                    keyword = '新歌';
                    break;
                case 'chinese':
                    keyword = '华语歌曲';
                    break;
                case 'western':
                    keyword = '欧美歌曲';
                    break;
                case 'japanese':
                    keyword = '日语歌曲';
                    break;
                case 'korean':
                    keyword = '韩语歌曲';
                    break;
            }
            
            if (keyword) {
                const searchInput = document.getElementById('searchInput');
                searchInput.value = keyword;
                performSearch(keyword);
            }
        });
    });
}

function handleSearch() {
    // 处理搜索
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        performSearch(query);
    }
}

function performSearch(query) {
    // 执行搜索
    currentSearchQuery = query;
    
    // 添加到搜索历史
    addToSearchHistory(query);
    
    // 显示加载状态
    showLoadingState();
    
    // 显示搜索结果
    setTimeout(() => {
        displaySearchResults(query);
        hideLoadingState();
    }, 300);
}

function displaySearchResults(query) {
    // 显示搜索结果
    const results = getSearchResults(query);
    const resultsContent = document.getElementById('resultsContent');
    const resultsHeader = document.getElementById('resultsHeader');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    
    // 更新结果标题和数量
    resultsTitle.textContent = `搜索 "${query}"`;
    resultsCount.textContent = `共找到 ${results.total} 个结果`;
    
    // 显示结果头部
    resultsHeader.style.display = 'flex';
    
    // 生成结果内容
    let contentHTML = '';
    
    if (results.total === 0) {
        // 没有找到结果
        contentHTML = generateEmptyState(query);
    } else {
        // 有结果
        if (currentFilter === 'all' || currentFilter === 'song') {
            if (results.songs.length > 0) {
                contentHTML += generateSongsSection(results.songs);
            }
        }
        
        if (currentFilter === 'all' || currentFilter === 'singer') {
            if (results.artists.length > 0) {
                contentHTML += generateArtistsSection(results.artists);
            }
        }
        
        if (currentFilter === 'all' || currentFilter === 'album') {
            if (results.albums.length > 0) {
                contentHTML += generateAlbumsSection(results.albums);
            }
        }
    }
    
    // 更新结果内容
    resultsContent.innerHTML = contentHTML;
    
    // 更新筛选按钮数量
    updateFilterCounts(results);
    
    // 绑定结果事件
    bindResultEvents();
}

function getSearchResults(query) {
    // 获取搜索结果
    if (!query) return { songs: [], artists: [], albums: [], total: 0 };
    
    const lowerQuery = query.toLowerCase();
    
    // 搜索歌曲
    const songs = searchData.songs.filter(song => {
        return song.title.toLowerCase().includes(lowerQuery) ||
               song.artist.toLowerCase().includes(lowerQuery) ||
               song.album.toLowerCase().includes(lowerQuery);
    });
    
    // 搜索歌手
    const artists = searchData.artists.filter(artist => {
        return artist.name.toLowerCase().includes(lowerQuery);
    });
    
    // 搜索专辑
    const albums = searchData.albums.filter(album => {
        return album.title.toLowerCase().includes(lowerQuery) ||
               album.artist.toLowerCase().includes(lowerQuery);
    });
    
    return {
        songs: songs,
        artists: artists,
        albums: albums,
        total: songs.length + artists.length + albums.length
    };
}

function generateSongsSection(songs) {
    // 生成歌曲列表
    let html = '<section class="section songs-section"><h3 class="section-title">歌曲</h3><ul class="songs-list">';
    
    songs.forEach(song => {
        const isFavorite = favorites.includes(song.id);
        const isPlaying = currentMusicId === song.id;
        
        html += `<li class="result-item" data-id="${song.id}">`;
        html += `<div class="result-cover">`;
        html += `<img src="${song.cover}" alt="${song.title}" onerror="this.src='image/周杰伦.jpg'; this.onerror=null;">`;
        html += `<div class="result-play ${isPlaying ? 'playing' : ''}">`;
        html += `<i class="fas fa-play"></i>`;
        html += `</div>`;
        html += `</div>`;
        html += `<div class="result-info">`;
        html += `<h4 class="result-title">${song.title}</h4>`;
        html += `<p class="result-artist">${song.artist}</p>`;
        html += `<p class="result-duration">${song.album}</p>`;
        html += `</div>`;
        html += `<div class="result-actions">`;
        html += `<span class="song-duration">${song.duration}</span>`;
        html += `<button class="action-btn ${isFavorite ? 'active' : ''} favorite-btn" data-action="favorite" data-id="${song.id}">`;
        html += `<i class="fas fa-heart"></i>`;
        html += `</button>`;
        html += `<button class="action-btn play-btn" data-action="play" data-id="${song.id}">`;
        html += `<i class="fas fa-play"></i>`;
        html += `</button>`;
        html += `</div>`;
        html += `</li>`;
    });
    
    html += '</ul></section>';
    return html;
}

function generateArtistsSection(artists) {
    // 生成歌手列表
    let html = '<section class="section artists-section"><h3 class="section-title">歌手</h3><ul class="artists-list">';
    
    artists.forEach(artist => {
        html += `<li class="result-item" data-id="${artist.id}">`;
        html += `<div class="result-cover">`;
        html += `<img src="${artist.avatar}" alt="${artist.name}" onerror="this.src='image/周杰伦.jpg'; this.onerror=null;">`;
        html += `</div>`;
        html += `<div class="result-info">`;
        html += `<h4 class="result-title">${artist.name}</h4>`;
        html += `<p class="result-artist">${artist.songs} 首歌曲 · ${artist.fans} 粉丝</p>`;
        html += `<p class="result-duration">${artist.description}</p>`;
        html += `</div>`;
        html += `<div class="result-actions">`;
        html += `</div>`;
        html += `</li>`;
    });
    
    html += '</ul></section>';
    return html;
}

function generateAlbumsSection(albums) {
    // 生成专辑列表
    let html = '<section class="section albums-section"><h3 class="section-title">专辑</h3><ul class="albums-list">';
    
    albums.forEach(album => {
        html += `<li class="result-item" data-id="${album.id}">`;
        html += `<div class="result-cover">`;
        html += `<img src="${album.cover}" alt="${album.title}" onerror="this.src='image/周杰伦.jpg'; this.onerror=null;">`;
        html += `</div>`;
        html += `<div class="result-info">`;
        html += `<h4 class="result-title">${album.title}</h4>`;
        html += `<p class="result-artist">${album.artist}</p>`;
        html += `<p class="result-duration">${album.year} · ${album.genre} · ${album.songs} 首歌曲</p>`;
        html += `</div>`;
        html += `<div class="result-actions">`;
        html += `</div>`;
        html += `</li>`;
    });
    
    html += '</ul></section>';
    return html;
}

function generateEmptyState(query) {
    // 生成空状态
    return `<div class="empty-state">` +
           `<div class="empty-icon">` +
           `<i class="fas fa-search"></i>` +
           `</div>` +
           `<h3>未找到结果</h3>` +
           `<p>没有找到与 "${query}" 相关的音乐</p>` +
           `<p>尝试使用其他关键词搜索</p>` +
           `</div>`;
}

function updateFilterCounts(results) {
    // 更新筛选按钮的数量
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        let count = 0;
        
        switch(filter) {
            case 'all':
                count = results.total;
                break;
            case 'song':
                count = results.songs.length;
                break;
            case 'singer':
                count = results.artists.length;
                break;
            case 'album':
                count = results.albums.length;
                break;
        }
        
        // 更新按钮上的数量
        let btnText = btn.textContent.replace(/\(\d+\)/, '');
        btnText = btnText.trim();
        btn.textContent = `${btnText} (${count})`;
    });
}

function bindResultEvents() {
    // 绑定结果事件
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('data-action');
            const id = parseInt(this.getAttribute('data-id'));
            
            handleAction(action, id);
        });
    });
    
    // 绑定歌曲项点击事件
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach(item => {
        item.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            playSong(id);
        });
    });
}

function playSong(songId) {
    // 播放歌曲
    currentMusicId = songId;
    
    // 更新播放状态
    updatePlayingState(songId);
    
    // 这里可以添加实际的音频播放逻辑
    console.log('播放歌曲:', songId);
}

function toggleFavorite(songId) {
    // 切换收藏状态
    const index = favorites.indexOf(songId);
    
    if (index === -1) {
        // 添加到收藏
        favorites.push(songId);
    } else {
        // 从收藏中移除
        favorites.splice(index, 1);
    }
    
    // 保存到本地存储
    localStorage.setItem('search_favorites', JSON.stringify(favorites));
    
    // 更新收藏状态
    updateFavoriteState(songId);
}

function updatePlayingState(songId) {
    // 更新播放状态
    const playIcons = document.querySelectorAll('.song-play-icon');
    playIcons.forEach(icon => {
        icon.classList.remove('playing');
    });
    
    const songItem = document.querySelector(`.song-item[data-id="${songId}"]`);
    if (songItem) {
        const playIcon = songItem.querySelector('.song-play-icon');
        if (playIcon) {
            playIcon.classList.add('playing');
        }
    }
}

function updateFavoriteState(songId) {
    // 更新收藏状态
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        const id = parseInt(btn.getAttribute('data-id'));
        if (id === songId) {
            btn.classList.toggle('active');
        }
    });
}

function handleAction(action, id) {
    // 处理操作
    switch(action) {
        case 'play':
            playSong(id);
            break;
        case 'favorite':
            toggleFavorite(id);
            break;
    }
}

function showSuggestions(query) {
    // 显示搜索建议
    // 这里可以添加搜索建议的逻辑
}

function hideSuggestions() {
    // 隐藏搜索建议
    // 这里可以添加隐藏搜索建议的逻辑
}

function addToSearchHistory(query) {
    // 添加到搜索历史
    const index = searchHistory.indexOf(query);
    
    if (index !== -1) {
        // 如果已经存在，移到最前面
        searchHistory.splice(index, 1);
    }
    
    // 添加到最前面
    searchHistory.unshift(query);
    
    // 限制历史记录数量
    if (searchHistory.length > 10) {
        searchHistory.pop();
    }
    
    // 保存到本地存储
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
}

function loadSearchHistory() {
    // 加载搜索历史
    return JSON.parse(localStorage.getItem('search_history')) || [];
}

function searchFromHistory(query) {
    // 从历史记录中搜索
    const searchInput = document.getElementById('searchInput');
    searchInput.value = query;
    performSearch(query);
}

function clearSearchHistory() {
    // 清除搜索历史
    searchHistory = [];
    localStorage.removeItem('search_history');
}

function showLoadingState() {
    // 显示加载状态
    const resultsContent = document.getElementById('resultsContent');
    resultsContent.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p>正在搜索...</p></div>';
}

function hideLoadingState() {
    // 隐藏加载状态
    // 这里可以添加隐藏加载状态的逻辑
}

function showNotification(message) {
    // 显示通知
    // 这里可以添加显示通知的逻辑
}