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

  doc.views[0].centerPoint = [
    (rect[0] + rect[2]) / 2,
    (rect[1] + rect[3]) / 2
  ];
})();
