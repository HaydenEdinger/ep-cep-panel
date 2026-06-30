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
  var width = Math.abs(rect[2] - rect[0]);
  var height = Math.abs(rect[1] - rect[3]);
  var selectionCount = doc.selection ? doc.selection.length : 0;

  alert(
    'Document: ' + doc.name + '\n' +
    'Artboards: ' + doc.artboards.length + '\n' +
    'Active artboard: ' + (index + 1) + '\n' +
    'Artboard size: ' + Math.round(width) + ' x ' + Math.round(height) + ' pt\n' +
    'Current selection: ' + selectionCount + ' item(s)'
  );
})();
