/**
 * Host bootstrap loaded automatically when the panel opens.
 * Individual button scripts live in host/scripts/ and are executed on demand.
 */
(function () {
  if (typeof $.global.epCepPanel === 'undefined') {
    $.global.epCepPanel = {
      version: '1.0.0'
    };
  }
})();
