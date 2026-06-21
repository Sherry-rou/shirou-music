// 全局变量
let isLoggedIn = false;

// DOM元素
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
const loginBtn = document.querySelector('.login-btn');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    addEventListeners();
});

// 初始化登录
function initializeLogin() {
    // 检查是否已登录
    checkLoginStatus();
    
    // 检查是否有记住的用户名
    const savedUsername = localStorage.getItem('qqmusic_username');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        document.querySelector('input[name="remember"]').checked = true;
    }
    
    // 添加输入验证
    addInputValidation();
}

// 添加事件监听器
function addEventListeners() {
    // 表单提交事件
    loginForm.addEventListener('submit', handleLogin);
    
    // 密码显示切换
    passwordInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            document.querySelector('.toggle-password').style.display = 'block';
        } else {
            document.querySelector('.toggle-password').style.display = 'none';
        }
    });
    
    // 回车键登录
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    });
    
    // 点击背景关闭模态（如果有）
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-background')) {
            // 如果有模态框背景，点击关闭
        }
    });
}

// 登录处理
async function handleLogin(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = document.querySelector('input[name="remember"]').checked;
    
    // 验证输入
    if (!validateInputs(username, password)) {
        return;
    }
    
    // 显示加载状态
    showLoading(true);
    
    try {
        // 模拟登录请求
        await simulateLogin(username, password);
        
        // 登录成功
        handleLoginSuccess(username, remember);
        
    } catch (error) {
        // 登录失败
        handleLoginError(error.message);
    } finally {
        showLoading(false);
    }
}

// 输入验证
function validateInputs(username, password) {
    let isValid = true;
    
    // 清除之前的错误状态
    clearErrors();
    
    // 验证用户名
    if (!username) {
        showError('username', '请输入用户名');
        isValid = false;
    } else if (username.length < 3) {
        showError('username', '用户名至少3个字符');
        isValid = false;
    }
    
    // 验证密码
    if (!password) {
        showError('password', '请输入密码');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', '密码至少6个字符');
        isValid = false;
    }
    
    return isValid;
}

// 显示错误
function showError(field, message) {
    const inputWrapper = document.querySelector(`#${field}`).parentElement;
    inputWrapper.classList.add('error');
    
    // 移除之前的错误消息
    const existingError = inputWrapper.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加新的错误消息
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    inputWrapper.parentElement.appendChild(errorDiv);
}

// 清除错误
function clearErrors() {
    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
        wrapper.classList.remove('error', 'success');
    });
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
}

// 模拟登录
function simulateLogin(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟登录逻辑
            if (username === 'admin' && password === '123456') {
                resolve({ username, token: 'mock-jwt-token' });
            } else if (username === 'test' && password === 'test123') {
                resolve({ username, token: 'mock-jwt-token-test' });
            } else {
                reject(new Error('用户名或密码错误'));
            }
        }, 1500); // 模拟网络延迟
    });
}

// 登录成功处理
function handleLoginSuccess(username, remember) {
    isLoggedIn = true;
    
    // 保存登录状态到localStorage
    localStorage.setItem('qqmusic_isLoggedIn', 'true');
    localStorage.setItem('qqmusic_username', username);
    localStorage.setItem('qqmusic_loginTime', Date.now().toString());
    
    // 如果选择了记住我，保存相关信息
    if (remember) {
        localStorage.setItem('qqmusic_remember', 'true');
    }
    
    // 显示成功消息
    showNotification('登录成功！正在跳转...', 'success');
    
    // 2秒后跳转到主页
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// 登录错误处理
function handleLoginError(message) {
    isLoggedIn = false;
    
    // 显示错误消息
    showNotification(message, 'error');
    
    // 清除记住状态
    localStorage.removeItem('qqmusic_isLoggedIn');
    localStorage.removeItem('qqmusic_remember');
}

// 检查登录状态
function checkLoginStatus() {
    const isLogged = localStorage.getItem('qqmusic_isLoggedIn');
    const loginTime = localStorage.getItem('qqmusic_loginTime');
    
    if (isLogged && loginTime) {
        const timeDiff = Date.now() - parseInt(loginTime);
        const dayInMs = 24 * 60 * 60 * 1000;
        
        // 如果登录时间超过7天，重新登录
        if (timeDiff > dayInMs * 7) {
            logout();
        } else {
            isLoggedIn = true;
        }
    }
}

// 密码显示切换
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        eyeIcon.className = 'fas fa-eye';
    }
}

// 社交登录
function socialLogin(platform) {
    showNotification(`${platform === 'wechat' ? '微信' : 'QQ'}登录功能开发中...`, 'info');
    
    // 这里可以集成真实的社交登录SDK
    setTimeout(() => {
        showNotification('请使用用户名密码登录体验完整功能', 'info');
    }, 2000);
}

// 显示注册页面
function showRegister() {
    showNotification('注册功能开发中，敬请期待！', 'info');
}

// 显示加载状态
function showLoading(isLoading) {
    const loginBtn = document.querySelector('.login-btn');
    
    if (isLoading) {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
    } else {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> 立即登录';
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
    `;
    
    // 根据类型设置颜色
    const colors = {
        success: 'linear-gradient(135deg, #81c784, #66bb6a)',
        error: 'linear-gradient(135deg, #f44336, #da190b)',
        info: 'linear-gradient(135deg, #2196F3, #1976d2)',
        warning: 'linear-gradient(135deg, #ff9800, #f57c00)'
    };
    notification.style.background = colors[type] || colors.info;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 点击关闭
    notification.addEventListener('click', function() {
        removeNotification(this);
    });
    
    // 自动移除
    setTimeout(() => {
        removeNotification(notification);
    }, 4000);
}

// 移除通知
function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// 添加通知动画样式
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

// 输入验证实时反馈
function addInputValidation() {
    usernameInput.addEventListener('input', function() {
        validateField('username', this.value);
    });
    
    passwordInput.addEventListener('input', function() {
        validateField('password', this.value);
    });
}

function validateField(field, value) {
    const inputWrapper = document.querySelector(`#${field}`).parentElement;
    
    if (field === 'username') {
        if (value.length >= 3) {
            inputWrapper.classList.remove('error');
            inputWrapper.classList.add('success');
        } else if (value.length > 0) {
            inputWrapper.classList.remove('success');
            inputWrapper.classList.remove('error');
        } else {
            inputWrapper.classList.remove('success', 'error');
        }
    } else if (field === 'password') {
        if (value.length >= 6) {
            inputWrapper.classList.remove('error');
            inputWrapper.classList.add('success');
        } else if (value.length > 0) {
            inputWrapper.classList.remove('success');
            inputWrapper.classList.remove('error');
        } else {
            inputWrapper.classList.remove('success', 'error');
        }
    }
}

// 记住密码功能增强
document.querySelector('input[name="remember"]').addEventListener('change', function() {
    if (this.checked) {
        showNotification('已启用记住我功能', 'info');
    }
});

// 忘记密码功能
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    if (!username) {
        showNotification('请先输入用户名', 'warning');
        usernameInput.focus();
        return;
    }
    
    // 模拟找回密码流程
    showNotification('密码重置邮件已发送至您的邮箱', 'success');
});

// 全局函数导出
window.togglePassword = togglePassword;
window.socialLogin = socialLogin;
window.showRegister = showRegister;