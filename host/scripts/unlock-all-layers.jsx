#target illustrator

(function () {
  if (app.documents.length === 0) {
    alert('Open a document first.');
    return;
  }

  var doc = app.activeDocument;

  function unlockLayers(layers) {
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      layer.locked = false;
      if (layer.layers && layer.layers.length > 0) {
        unlockLayers(layer.layers);
      }
    }
  }

  unlockLayers(doc.layers);
})();
