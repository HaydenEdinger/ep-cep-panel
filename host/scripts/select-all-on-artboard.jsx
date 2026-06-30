#target illustrator

(function () {
  if (app.documents.length === 0) {
    alert('Open a document first.');
    return;
  }

  var doc = app.activeDocument;
  var index = doc.artboards.getActiveArtboardIndex();
  var artboard = doc.artboards[index];
  var rect = artboard.artboardRect;
  var items = [];

  function collectItems(container) {
    for (var i = 0; i < container.pageItems.length; i++) {
      items.push(container.pageItems[i]);
    }

    for (var j = 0; j < container.layers.length; j++) {
      collectItems(container.layers[j]);
    }
  }

  for (var k = 0; k < doc.layers.length; k++) {
    collectItems(doc.layers[k]);
  }

  var selected = [];

  for (var n = 0; n < items.length; n++) {
    var item = items[n];
    var center = item.geometricBounds;
    var x = (center[0] + center[2]) / 2;
    var y = (center[1] + center[3]) / 2;

    if (x >= rect[0] && x <= rect[2] && y <= rect[1] && y >= rect[3]) {
      selected.push(item);
    }
  }

  if (selected.length === 0) {
    alert('No objects found on the active artboard.');
    return;
  }

  doc.selection = null;

  for (var m = 0; m < selected.length; m++) {
    selected[m].selected = true;
  }
})();
