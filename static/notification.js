/**
 * Global Notification System
 * Provides a consistent notification system across all pages
 */
(function() {
  // Global notification function
  window.showNotification = function(message, type = 'info', duration = 4000) {
    // Create notification container if it doesn't exist
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 11000;
        pointer-events: none;
        max-width: 400px;
        width: auto;
      `;
      document.body.appendChild(container);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      background: var(--bg-color);
      color: var(--color);
      padding: 0.75rem 1rem;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.875rem;
      font-weight: 500;
      max-width: 100%;
      margin-bottom: 0.5rem;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
      pointer-events: auto;
      position: relative;
      word-wrap: break-word;
    `;

    // Type-specific styling
    if (type === 'success') {
      notification.style.background = '#f0f9ff';
      notification.style.color = '#0369a1';
      notification.style.borderColor = '#7dd3fc';
    } else if (type === 'error') {
      notification.style.background = '#fef2f2';
      notification.style.color = '#dc2626';
      notification.style.borderColor = '#fca5a5';
    } else if (type === 'warning') {
      notification.style.background = '#fffbeb';
      notification.style.color = '#d97706';
      notification.style.borderColor = '#fbbf24';
    }

    // Dark mode adjustments
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'd';
    if (isDarkMode) {
      if (type === 'success') {
        notification.style.background = '#0c4a6e';
        notification.style.color = '#7dd3fc';
        notification.style.borderColor = '#0369a1';
      } else if (type === 'error') {
        notification.style.background = '#7f1d1d';
        notification.style.color = '#fca5a5';
        notification.style.borderColor = '#dc2626';
      } else if (type === 'warning') {
        notification.style.background = '#78350f';
        notification.style.color = '#fbbf24';
        notification.style.borderColor = '#d97706';
      }
    }

    // Add to container
    container.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Hide and remove notification
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        if (container.contains(notification)) {
          container.removeChild(notification);
        }
        // Remove container if empty
        if (container.children.length === 0) {
          document.body.removeChild(container);
        }
      }, 300);
    }, duration);

    return notification;
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Global notification system initialized
    });
  } else {
    // Global notification system initialized
  }
})();
