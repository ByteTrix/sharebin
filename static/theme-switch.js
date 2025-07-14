(({ cmEditor }) => {
  const themeStorageKey = 'theme-preference';
  
  // Get all theme toggle buttons (navbar and standalone)
  const themeToggles = [
    document.getElementById('navbarThemeToggle'),
    document.getElementById('themeToggle')
  ].filter(Boolean);

  const setMode = mode => {
    localStorage.setItem(themeStorageKey, mode);
    
    // Update body attribute
    if (mode === 'auto') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', mode);
    }

    // Update CodeMirror theme if present
    if (cmEditor) {
      const isDark = mode === 'd' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      cmEditor.setOption("theme", isDark ? 'material' : 'default');
    }

    // Update icon visibility for all toggles
    updateThemeIcons(mode);
  };

  const updateThemeIcons = (mode) => {
    themeToggles.forEach(toggle => {
      if (!toggle) return;
      
      const autoIcon = toggle.querySelector('.theme-auto');
      const lightIcon = toggle.querySelector('.theme-light');
      const darkIcon = toggle.querySelector('.theme-dark');
      
      // Hide all icons first
      [autoIcon, lightIcon, darkIcon].forEach(icon => {
        if (icon) icon.style.display = 'none';
      });
      
      // Show the appropriate icon based on mode
      if (mode === 'auto' && autoIcon) {
        autoIcon.style.display = 'block';
      } else if (mode === 'l' && lightIcon) {
        lightIcon.style.display = 'block';
      } else if (mode === 'd' && darkIcon) {
        darkIcon.style.display = 'block';
      }
    });
  };

  const getNextMode = (currentMode) => {
    const modes = ['auto', 'l', 'd'];
    const currentIndex = modes.indexOf(currentMode);
    return modes[(currentIndex + 1) % modes.length];
  };

  // Initialize theme
  let currentMode = localStorage.getItem(themeStorageKey) || 'auto';
  setMode(currentMode);

  // Add click listeners to theme toggles
  // Handle standalone theme toggle (cycles through modes)
  const standaloneToggle = document.getElementById('themeToggle');
  if (standaloneToggle) {
    standaloneToggle.addEventListener('click', () => {
      currentMode = getNextMode(currentMode);
      setMode(currentMode);
    });
  }

  // Handle navbar theme toggle (shows dropdown)
  const navbarToggle = document.getElementById('navbarThemeToggle');
  if (navbarToggle) {
    navbarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      // This should only toggle the dropdown, not change theme
      // The dropdown functionality is handled in templates.ts
    });
  }

  // Listen for system theme changes when in auto mode
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (currentMode === 'auto') {
        // Refresh CodeMirror theme
        if (cmEditor) {
          cmEditor.setOption("theme", e.matches ? 'material' : 'default');
        }
      }
    });
  }

  // Make setMode available globally for dropdown selections
  window.setThemeMode = setMode;
  window.getCurrentTheme = () => currentMode;
})(window);