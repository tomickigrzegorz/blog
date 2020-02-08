--- 
layout: null 
sitemap: 
exclude: 'yes'
--- 

  window.addEventListener('DOMContentLoaded', ()=> {

    const panelCover=document.querySelector('.panel-cover');
    const blogButton=document.querySelector('.blog-button');
    const contentWrapper=document.querySelector('.content-wrapper');

    blogButton.addEventListener('click', ()=> {
      if (panelCover.className.indexOf('panel-cover--collapsed') >=0) return;
      const currentWidth=panelCover.offsetWidth;

      if (currentWidth < 960) {
        panelCover.classList.add('panel-cover--collapsed');
        contentWrapper.classList.add('animated', 'slideInRight');
      } else {
        panelCover.style.maxWidth=currentWidth + 'px';
        panelCover.classList.add('swing-animation');
      }
    });

    if (window.location.hash && window.location.hash=='#blog') {
      panelCover.classList.add('panel-cover--collapsed');
    }

    if (window.location.pathname !=='{{ site.baseurl }}/'&& window.location.pathname !=='{{ site.baseurl }}/index.html') {
      panelCover.classList.add('panel-cover--collapsed');
    }

    const toggleClasses=(el, ...cls)=> cls.map(cl=> el.classList.toggle(cl));

    const btnMobileMenu=document.querySelector('.btn-mobile-menu');
    const navigationWrapper=document.querySelector('.navigation-wrapper');
    const btnMobileMenuIcon=document.querySelector('.btn-mobile-menu__icon');

    btnMobileMenu.addEventListener('click', ()=> {
      toggleClasses(navigationWrapper, 'visible', 'animated', 'bounceInDown');
      toggleClasses(btnMobileMenuIcon, 'icon-list', 'icon-x-circle', 'animated', 'fadeIn');
    });
    
    blogButton.addEventListener('click', ()=> {
      navigationWrapper.classList.toggle('visible');
      toggleClasses(btnMobileMenuIcon, 'icon-list', 'icon-x-circle', 'animated', 'fadeIn');
    });
  }

)