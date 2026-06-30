#target illustrator

(function () {
  if (app.documents.length === 0) {
    alert('Open a document first.');
    return;
  }

  if (app.activeDocument.selection.length === 0) {
    alert('Select one or more objects first.');
    return;
  }

  var doc = app.activeDocument;
  var bounds = doc.selection[0].visibleBounds.slice(0);

  for (var i = 1; i < doc.selection.length; i++) {
    var itemBounds = doc.selection[i].visibleBounds;
    bounds[0] = Math.min(bounds[0], itemBounds[0]);
    bounds[1] = Math.max(bounds[1], itemBounds[1]);
    bounds[2] = Math.max(bounds[2], itemBounds[2]);
    bounds[3] = Math.min(bounds[3], itemBounds[3]);
  }

  var padding = 12;
  var index = doc.artboards.getActiveArtboardIndex();
  var artboard = doc.artboards[index];

  artboard.artboardRect = [
    bounds[0] - padding,
    bounds[1] + padding,
    bounds[2] + padding,
    bounds[3] - padding
  ];
})();
