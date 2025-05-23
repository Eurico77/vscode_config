function updateTabsPadding() {
  const hasSidebarDisabled = !!document.querySelector('.nosidebar');
  const root = document.querySelector('.file-icons-enabled');
  if (!root) return;

  const tabsContainer = root.querySelector('.tabs-container');
  if (!tabsContainer) return;

  tabsContainer.style.paddingLeft = hasSidebarDisabled ? '60px' : '0px';
}

function setupObserver() {
  const root = document.querySelector('.file-icons-enabled');
  if (!root) {
    requestAnimationFrame(setupObserver);
    return;
  }
  const classObserver = new MutationObserver(updateTabsPadding);
  classObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
  });

  const tabsObserver = new MutationObserver(() => {
    const tabsContainer = root.querySelector('.tabs-container');
    if (tabsContainer) {
      updateTabsPadding();
    }
  });

  tabsObserver.observe(root, {
    childList: true,
    subtree: true,
  });
  updateTabsPadding();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupObserver);
} else {
  setupObserver();
}
