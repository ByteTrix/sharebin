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
        z-index: 99999;
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
      z-index: 99999 !important;
    `;

    // Type-specific styling - simple black and white with emojis
    let emoji = '';
    if (type === 'success') {
      emoji = '✅ ';
      notification.style.background = 'var(--bg-color)';
      notification.style.color = 'var(--color)';
      notification.style.borderColor = 'var(--border-color)';
    } else if (type === 'error') {
      emoji = '❌ ';
      notification.style.background = 'var(--bg-color)';
      notification.style.color = 'var(--color)';
      notification.style.borderColor = 'var(--border-color)';
    } else if (type === 'warning') {
      emoji = '⚠️ ';
      notification.style.background = 'var(--bg-color)';
      notification.style.color = 'var(--color)';
      notification.style.borderColor = 'var(--border-color)';
    } else if (type === 'info') {
      emoji = 'ℹ️ ';
      notification.style.background = 'var(--bg-color)';
      notification.style.color = 'var(--color)';
      notification.style.borderColor = 'var(--border-color)';
    }
    
    // Add emoji to message
    notification.textContent = emoji + message;

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
