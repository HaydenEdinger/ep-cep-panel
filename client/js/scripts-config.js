/**
 * Script button configuration.
 *
 * Add entries to this array to create new icon buttons. Each button runs the
 * matching .jsx file from host/scripts/ when clicked.
 *
 * Fields:
 * - id: unique identifier
 * - label: text shown under the icon
 * - tooltip: hover description
 * - script: filename inside host/scripts/
 * - icon: inline SVG markup (paste directly from lucide.dev)
 *
 * Lucide icons: paste the full <svg> from lucide.dev into icon. The panel
 * auto-normalizes Lucide markup (removes width/height/class, fixes stroke color).
 *
 * Ideal minimal format after cleanup:
 * icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="..."/></svg>'
 */
var SCRIPT_BUTTONS = [
  {
    id: 'center-artboard',
    label: 'Center Artboard',
    tooltip: 'Center the view on the active artboard',
    script: 'center-artboard.jsx',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm5 2h2v8h-2V8zm-3 3h2v2H8v-2zm6 0h2v2h-2v-2z"/></svg>'
  },
  {
    id: 'unlock-layers',
    label: 'Unlock Layers',
    tooltip: 'Unlock all layers in the active document',
    script: 'unlock-all-layers.jsx',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-3 0h-4V7a2 2 0 0 1 4 0v2z"/></svg>'
  },
  {
    id: 'fit-artboard',
    label: 'Fit to Selection',
    tooltip: 'Resize the active artboard to fit the current selection',
    script: 'fit-artboard-to-selection.jsx',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5v4h2V7h2V5H3zm16 0v2h2v2h2V5h-4zM3 15v4h4v-2H5v-2H3zm16 4v-2h-2v-2h-2v4h4zM8 8h8v8H8V8z"/></svg>'
  },
  {
    id: 'select-all',
    label: 'Select All',
    tooltip: 'Select all objects on the active artboard',
    script: 'select-all-on-artboard.jsx',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm1 1h10v10H7V7z"/></svg>'
  },
  {
    id: 'document-info',
    label: 'Document Info',
    tooltip: 'Show a summary alert for the active document',
    script: 'document-info.jsx',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-7a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/></svg>'
  }
];
