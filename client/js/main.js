(function () {
  'use strict';

  var csInterface = new CSInterface();
  var statusEl = document.getElementById('status-message');
  var buttonsContainer = document.getElementById('script-buttons');
  var statusTimeoutId = null;

  function setStatus(message, type) {
    if (!statusEl) {
      return;
    }

    statusEl.textContent = message || '';
    statusEl.className = 'status-message';

    if (type) {
      statusEl.classList.add('is-' + type);
    }

    if (statusTimeoutId) {
      clearTimeout(statusTimeoutId);
      statusTimeoutId = null;
    }

    if (message) {
      statusTimeoutId = setTimeout(function () {
        statusEl.textContent = '';
        statusEl.className = 'status-message';
      }, 4000);
    }
  }

  function escapeForExtendScript(value) {
    return String(value)
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');
  }

  function getScriptPath(scriptFileName) {
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION);
    var separator = extensionRoot.indexOf('\\') >= 0 ? '\\' : '/';
    return extensionRoot + separator + 'host' + separator + 'scripts' + separator + scriptFileName;
  }

  function runExtendScript(scriptFileName, buttonEl) {
    if (!scriptFileName) {
      setStatus('No script file configured for this button.', 'error');
      return;
    }

    var scriptPath = escapeForExtendScript(getScriptPath(scriptFileName));
    var evalSource = [
      '(function () {',
      '  try {',
      '  if (typeof app === "undefined" || !app.documents) {',
      '    return "ERROR: Illustrator is not available.";',
      '  }',
      '  var file = new File("' + scriptPath + '");',
      '  if (!file.exists) {',
      '    return "ERROR: Script file not found: ' + scriptPath + '";',
      '  }',
      '  $.evalFile(file);',
      '  return "OK";',
      '  } catch (error) {',
      '    return "ERROR: " + error.toString();',
      '  }',
      '})();'
    ].join('\n');

    if (buttonEl) {
      buttonEl.classList.add('is-running');
    }

    setStatus('Running ' + scriptFileName + '...', null);

    csInterface.evalScript(evalSource, function (result) {
      if (buttonEl) {
        buttonEl.classList.remove('is-running');
      }

      if (!result) {
        setStatus('Script finished with no response.', 'success');
        return;
      }

      if (result.indexOf('ERROR:') === 0) {
        setStatus(result, 'error');
        return;
      }

      setStatus('Ran ' + scriptFileName, 'success');
    });
  }

  function createButton(config) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'script-button';
    button.id = 'script-button-' + config.id;
    button.title = config.tooltip || config.label || config.id;
    button.setAttribute('aria-label', config.tooltip || config.label || config.id);

    var icon = document.createElement('span');
    icon.className = 'script-button__icon';
    icon.innerHTML = config.icon || '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5z"/></svg>';

    var label = document.createElement('span');
    label.className = 'script-button__label';
    label.textContent = config.label || config.id;

    button.appendChild(icon);
    button.appendChild(label);

    button.addEventListener('click', function () {
      runExtendScript(config.script, button);
    });

    return button;
  }

  function renderButtons() {
    if (!buttonsContainer) {
      return;
    }

    buttonsContainer.innerHTML = '';

    if (!Array.isArray(SCRIPT_BUTTONS) || SCRIPT_BUTTONS.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No scripts configured. Edit client/js/scripts-config.js to add buttons.';
      buttonsContainer.appendChild(empty);
      return;
    }

    SCRIPT_BUTTONS.forEach(function (config) {
      buttonsContainer.appendChild(createButton(config));
    });
  }

  function applyTheme() {
    var hostEnv = csInterface.hostEnvironment;
    if (!hostEnv || !hostEnv.appSkinInfo) {
      return;
    }

    var panelBg = hostEnv.appSkinInfo.panelBackgroundColor.color;
    if (!panelBg) {
      return;
    }

    document.documentElement.style.setProperty('--bg', toHex(panelBg));
  }

  function toHex(color) {
    function component(value) {
      var hex = Math.round(value).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }

    return '#' + component(color.red) + component(color.green) + component(color.blue);
  }

  renderButtons();
  applyTheme();
})();
