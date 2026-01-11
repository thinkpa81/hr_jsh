/**
 * 공통 헤더 로더
 * 모든 페이지에서 동일한 헤더를 사용하기 위한 유틸리티
 */

class HeaderLoader {
  /**
   * 헤더를 로드하고 DOM에 삽입
   * @param {string} headerPath - 헤더 HTML 파일 경로 (기본값: '/includes/header.html')
   */
  static async load(headerPath = '/includes/header.html') {
    try {
      // 현재 페이지의 깊이를 계산하여 상대 경로 조정
      const depth = window.location.pathname.split('/').filter(p => p).length - 1;
      const relativePath = depth > 0 ? '../'.repeat(depth) + 'includes/header.html' : 'includes/header.html';
      
      const response = await fetch(relativePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load header: ${response.status}`);
      }
      
      const headerHTML = await response.text();
      
      // body의 첫 번째 자식으로 헤더 삽입
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = headerHTML;
      
      const headerElement = tempDiv.querySelector('header');
      if (headerElement) {
        document.body.insertBefore(headerElement, document.body.firstChild);
        
        // 스크립트 태그 실행
        const scripts = tempDiv.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          document.body.appendChild(newScript);
        });
        
        console.log('✅ Header loaded successfully');
      } else {
        console.error('❌ Header element not found in the loaded content');
      }
    } catch (error) {
      console.error('❌ Error loading header:', error);
    }
  }
  
  /**
   * 현재 페이지에 맞게 활성 메뉴 설정
   */
  static setActiveMenu() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    
    menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href)) {
        link.classList.add('active-page');
        
        // 부모 메뉴도 활성화
        const parentNavItem = link.closest('.nav-item');
        if (parentNavItem) {
          const parentLink = parentNavItem.querySelector('.nav-link');
          if (parentLink) {
            parentLink.classList.add('active-page');
          }
        }
      }
    });
  }
}

// 페이지 로드 시 자동으로 헤더 로드
document.addEventListener('DOMContentLoaded', async () => {
  await HeaderLoader.load();
  HeaderLoader.setActiveMenu();
});
