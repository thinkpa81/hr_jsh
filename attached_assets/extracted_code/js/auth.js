/**
 * 코아시아 HR 포털 - 인증 관리
 * JWT 기반 인증 시스템
 */

const Auth = {
  // 현재 로그인한 사용자 정보
  currentUser: null,
  
  // 로컬 스토리지 키
  TOKEN_KEY: 'coasia_hr_token',
  USER_KEY: 'coasia_hr_user',
  
  /**
   * 초기화 - 페이지 로드 시 자동 실행
   */
  init() {
    this.loadUserFromStorage();
    this.updateUI();
  },
  
  /**
   * 로컬 스토리지에서 사용자 정보 불러오기
   */
  loadUserFromStorage() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);
    
    if (token && userStr) {
      try {
        this.currentUser = JSON.parse(userStr);
      } catch (e) {
        console.error('Failed to parse user data:', e);
        this.logout();
      }
    }
  },
  
  /**
   * 로그인
   */
  async login(email, password) {
    try {
      // 사용자 조회
      const response = await fetch(`tables/users?search=${email}&limit=1`);
      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
      
      const user = data.data[0];
      
      // 비밀번호 확인 (실제로는 해시 비교해야 함)
      if (user.password !== this.hashPassword(password)) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
      
      // 이메일 인증 확인
      if (!user.is_email_verified) {
        throw new Error('이메일 인증이 필요합니다. 이메일을 확인해주세요.');
      }
      
      // 토큰 생성 (간단한 버전)
      const token = this.generateToken(user);
      
      // 저장
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      this.currentUser = user;
      this.updateUI();
      
      // 알림 생성
      await this.createNotification(user.id, '로그인 성공', '코아시아 HR 포털에 오신 것을 환영합니다!');
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  /**
   * 회원가입
   */
  async register(userData) {
    try {
      // 이메일 중복 체크
      const checkResponse = await fetch(`tables/users?search=${userData.email}&limit=1`);
      const checkData = await checkResponse.json();
      
      if (checkData.data && checkData.data.length > 0) {
        throw new Error('이미 사용 중인 이메일입니다.');
      }
      
      // 내부 직원 자동 인증 (@coasia.com)
      const isInternal = userData.email.endsWith('@coasia.com');
      const role = isInternal ? 2 : 1; // Level 2: 내부 직원, Level 1: 외부 사용자
      
      // 비밀번호 해싱
      const hashedPassword = this.hashPassword(userData.password);
      
      // 사용자 생성
      const newUser = {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        phone: userData.phone,
        birth_date: userData.birth_date || '',
        gender: userData.gender || '',
        role: role,
        company: isInternal ? '코아시아' : '',
        department: '',
        position: '',
        is_email_verified: false, // 실제로는 이메일 인증 필요
        profile_image: '',
        notification_settings: JSON.stringify({
          recruitment: true,
          education: true,
          hr: true,
          notice: true
        }),
        created_at: new Date().toISOString()
      };
      
      const response = await fetch('tables/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      
      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }
      
      const result = await response.json();
      
      // 환영 이메일 발송 (시뮬레이션)
      console.log(`환영 이메일 발송: ${userData.email}`);
      
      return result;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  
  /**
   * 로그아웃
   */
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser = null;
    this.updateUI();
    window.location.href = '/';
  },
  
  /**
   * 로그인 여부 확인
   */
  isLoggedIn() {
    return this.currentUser !== null;
  },
  
  /**
   * 권한 확인
   */
  hasRole(requiredRole) {
    if (!this.currentUser) return false;
    return this.currentUser.role >= requiredRole;
  },
  
  /**
   * 페이지 접근 권한 확인
   */
  requireAuth(requiredRole = 1) {
    if (!this.isLoggedIn()) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
      return false;
    }
    
    if (requiredRole && !this.hasRole(requiredRole)) {
      alert('접근 권한이 없습니다.');
      window.location.href = '/';
      return false;
    }
    
    return true;
  },
  
  /**
   * UI 업데이트
   */
  updateUI() {
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    
    if (this.isLoggedIn()) {
      // 로그인 상태
      if (loginBtn) loginBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'flex';
      if (userName) userName.textContent = this.currentUser.name;
      if (userAvatar) userAvatar.textContent = this.currentUser.name.charAt(0);
      
      // 알림 개수 업데이트
      this.updateNotificationCount();
    } else {
      // 로그아웃 상태
      if (loginBtn) loginBtn.style.display = 'flex';
      if (userMenu) userMenu.style.display = 'none';
    }
  },
  
  /**
   * 알림 개수 업데이트
   */
  async updateNotificationCount() {
    if (!this.currentUser) return;
    
    try {
      const response = await fetch(`tables/notifications?user_id=${this.currentUser.id}&is_read=false`);
      const data = await response.json();
      
      const badge = document.getElementById('notification-badge');
      if (badge) {
        const count = data.total || 0;
        if (count > 0) {
          badge.textContent = count > 99 ? '99+' : count;
          badge.style.display = 'block';
        } else {
          badge.style.display = 'none';
        }
      }
    } catch (error) {
      console.error('Failed to update notification count:', error);
    }
  },
  
  /**
   * 알림 생성
   */
  async createNotification(userId, title, message, type = 'system', link = '') {
    try {
      const notification = {
        user_id: userId,
        type: type,
        title: title,
        message: message,
        link: link,
        is_read: false,
        created_at: new Date().toISOString()
      };
      
      await fetch('tables/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notification)
      });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  },
  
  /**
   * 비밀번호 해싱 (간단한 버전 - 실제로는 bcrypt 사용)
   */
  hashPassword(password) {
    // 실제로는 서버에서 bcrypt로 해싱해야 함
    return btoa(password); // Base64 인코딩 (데모용)
  },
  
  /**
   * 토큰 생성 (간단한 버전)
   */
  generateToken(user) {
    // 실제로는 JWT 라이브러리 사용
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24시간
    };
    return btoa(JSON.stringify(payload));
  },
  
  /**
   * 사용자 정보 업데이트
   */
  async updateProfile(updates) {
    if (!this.currentUser) return;
    
    try {
      const response = await fetch(`tables/users/${this.currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...this.currentUser,
          ...updates
        })
      });
      
      if (!response.ok) {
        throw new Error('프로필 업데이트에 실패했습니다.');
      }
      
      const updatedUser = await response.json();
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      this.currentUser = updatedUser;
      this.updateUI();
      
      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

// 페이지 로드 시 즉시 초기화 (DOMContentLoaded 이전에도)
if (typeof Auth !== 'undefined') {
  // 스크립트 로드 즉시 localStorage에서 사용자 정보 불러오기
  const token = localStorage.getItem(Auth.TOKEN_KEY);
  const userStr = localStorage.getItem(Auth.USER_KEY);
  
  if (token && userStr) {
    try {
      Auth.currentUser = JSON.parse(userStr);
    } catch (e) {
      console.error('Failed to parse user data:', e);
    }
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});

// 페이지 표시 시에도 초기화 (뒤로가기 등)
window.addEventListener('pageshow', () => {
  Auth.init();
});
