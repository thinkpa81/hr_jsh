/**
 * 코아시아 HR 포털 - 공통 유틸리티
 */

const Utils = {
  /**
   * 날짜 포맷팅
   */
  formatDate(dateString, format = 'YYYY-MM-DD') {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes);
  },
  
  /**
   * 날짜 차이 계산 (D-day)
   */
  getDDay(dateString) {
    if (!dateString) return null;
    const target = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return '마감';
    if (diff === 0) return 'D-Day';
    return `D-${diff}`;
  },
  
  /**
   * 숫자 포맷팅 (1000 -> 1,000)
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  
  /**
   * 로딩 표시
   */
  showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loading-overlay';
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
  },
  
  /**
   * 로딩 숨기기
   */
  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  },
  
  /**
   * 알림 메시지 표시
   */
  showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <i class="fas fa-${this.getAlertIcon(type)}"></i>
      <span>${message}</span>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  },
  
  /**
   * 알림 아이콘 반환
   */
  getAlertIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || icons.info;
  },
  
  /**
   * 모달 열기
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },
  
  /**
   * 모달 닫기
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },
  
  /**
   * URL 파라미터 가져오기
   */
  getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },
  
  /**
   * 파일 크기 포맷팅
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },
  
  /**
   * 파일을 Base64로 변환
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  },
  
  /**
   * 이메일 유효성 검사
   */
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  /**
   * 전화번호 포맷팅
   */
  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phone;
  },
  
  /**
   * 문자열 자르기
   */
  truncate(str, length) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  },
  
  /**
   * 권한 레벨 이름 반환
   */
  getRoleName(role) {
    const roles = {
      0: '비회원',
      1: '일반 사용자',
      2: '내부 직원',
      3: 'HR 담당자',
      4: '부서 관리자',
      5: '시스템 관리자'
    };
    return roles[role] || '알 수 없음';
  },
  
  /**
   * 지원 상태 뱃지 클래스 반환
   */
  getStatusBadgeClass(status) {
    const classes = {
      '접수완료': 'badge-info',
      '서류검토중': 'badge-warning',
      '서류합격': 'badge-success',
      '서류불합격': 'badge-error',
      '1차면접예정': 'badge-info',
      '1차면접완료': 'badge-success',
      '2차면접예정': 'badge-info',
      '2차면접완료': 'badge-success',
      '최종합격': 'badge-success',
      '최종불합격': 'badge-error',
      '입사포기': 'badge-error'
    };
    return classes[status] || 'badge-primary';
  },
  
  /**
   * 검색 하이라이트
   */
  highlightText(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  },
  
  /**
   * 페이지네이션 생성
   */
  createPagination(currentPage, totalPages, onPageChange) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    // 이전 버튼
    if (currentPage > 1) {
      const prev = document.createElement('button');
      prev.className = 'btn btn-outline btn-sm';
      prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prev.onclick = () => onPageChange(currentPage - 1);
      pagination.appendChild(prev);
    }
    
    // 페이지 번호
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline'}`;
      pageBtn.textContent = i;
      pageBtn.onclick = () => onPageChange(i);
      pagination.appendChild(pageBtn);
    }
    
    // 다음 버튼
    if (currentPage < totalPages) {
      const next = document.createElement('button');
      next.className = 'btn btn-outline btn-sm';
      next.innerHTML = '<i class="fas fa-chevron-right"></i>';
      next.onclick = () => onPageChange(currentPage + 1);
      pagination.appendChild(next);
    }
    
    return pagination;
  },
  
  /**
   * 디바운스 함수
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  /**
   * 로컬 스토리지에 저장
   */
  saveToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  },
  
  /**
   * 로컬 스토리지에서 불러오기
   */
  loadFromLocalStorage(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
      return null;
    }
  }
};

// 전역에서 사용 가능하도록 export
window.Utils = Utils;
