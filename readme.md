# custom-ui-vscode.css and custom-ui.js

```css
.monaco-workbench {
  --activitybar-width: 77px;
  --titlebar-height: 37px;
}

.monaco-workbench .label-name {
  font-size: 14px !important;
}

.monaco-workbench .part.sidebar.left .composite.title,
.monaco-workbench .part.sidebar.left .composite.title .title-actions,
.monaco-workbench .part.sidebar.left .composite.title .global-actions,
.monaco-workbench .part.sidebar.left .composite.title .monaco-toolbar {
  height: var(--titlebar-height);
}
.monaco-workbench .part.sidebar.left .composite.title .title-label {
  line-height: var(--titlebar-height);
}

.monaco-workbench .title.tabs {
  --editor-group-tab-height: var(--titlebar-height) !important;
}

/* div#workbench\.parts\.sidebar.part.sidebar.left.pane-composite-part {
  padding-left: 58px !important;
} */

.monaco-workbench .split-view-view:has(> .part.activitybar.left),
.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  .part.activitybar.left,
.monaco-workbench .split-view-view:has(> .part.activitybar.left) .content {
  min-width: var(--activitybar-width);
}

.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child {
  width: auto;
  margin-right: var(--offset);
}

.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child
  .content,
.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child
  .content
  .split-view-view,
.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child
  .content
  .split-view-view
  .monaco-editor,
.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child
  .content
  .split-view-view
  .monaco-editor
  .overflow-guard,
.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child
  .content
  .split-view-view
  .monaco-editor
  .overlayWidgets,
.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child
  .content
  .split-view-view
  .monaco-editor
  .overlayWidgets
  .monaco-scrollable-element,
.monaco-workbench
  .split-view-view:has(> .part.activitybar.left)
  + .split-view-view.visible
  > *:first-child
  .content
  .split-view-view
  .monaco-editor
  .overlayWidgets
  .sticky-widget {
  width: unset !important;
  left: 0;
  right: 0;
}

canvas.decorationsOverviewRuler {
  display: none !important;
}

.explorer-folders-view .monaco-list-row {
  padding-left: 6px;
}

.monaco-workbench .sticky-widget {
  right: 14px !important;
}

.monaco-workbench .search-view .search-widget .replace-container {
  width: calc(100% - 18px);
}
.monaco-workbench .search-view .search-widget .replace-container .replace-input,
.monaco-workbench
  .search-view
  .search-widget
  .replace-container
  .replace-input
  .monaco-findInput {
  width: 100% !important;
}

.monaco-workbench .part.activitybar.left .monaco-action-bar .action-label {
  width: var(--activitybar-width);
}

.monaco-workbench:not(.fullscreen) .part.activitybar.left > .content {
  padding-top: var(--titlebar-height); /* Espaço para os botões de janela */
}

.monaco-workbench:not(.fullscreen):has(.sidebar.right)
  .monaco-split-view2.horizontal
  .split-view-view:not(.visible)
  + .split-view-view.visible
  .editor
  .title
  .tabs-and-actions-container {
  padding-left: var(--activitybar-width);
}

.monaco-workbench:not(.fullscreen):has(.sidebar.right)
  .auxiliarybar.left
  .composite.title {
  padding-left: var(--activitybar-width);
}

.monaco-workbench:not(.fullscreen) .activitybar,
.monaco-workbench:not(.fullscreen) .statusbar,
.monaco-workbench:not(.fullscreen) .tabs-container,
.monaco-workbench:not(.fullscreen) .sidebar .composite.title {
  -webkit-app-region: drag;
}

.monaco-workbench:not(.fullscreen) .content .monaco-action-bar,
.monaco-workbench:not(.fullscreen) .statusbar-item,
.monaco-workbench:not(.fullscreen) .tab,
.monaco-workbench:not(.fullscreen) .title .title-actions .action-label {
  -webkit-app-region: no-drag;
}

.monaco-workbench
  .statusbar
  > .items-container
  > .statusbar-item.left.first-visible-item {
  padding-left: 0; /* Sem indentação no primeiro item da esquerda */
}
.monaco-workbench .statusbar #status\\.host {
  display: block !important;
  width: calc(
    var(--activitybar-width) - 1px
  ); /* Mesma largura da activitybar */
}
.monaco-workbench .statusbar #status\\.host .codicon {
  margin: 0 auto;
}
}
```

```js
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
```

*install custom-ui-style extension, and create path files in you settings.json >*

```json
"custom-ui-style.external.imports": [
    "file:///Users/{youUser}/custom-ui-vscode.css",
    "file:///Users/{youUser}/custom-ui.js",
  ],
}
```
