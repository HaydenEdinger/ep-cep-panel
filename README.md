# EP Script Panel

A dockable Adobe Illustrator CEP panel with icon buttons that run ExtendScript (`.jsx`) files on click.

## Features

- Dockable panel in Illustrator (`Window > Extensions > EP Script Panel`)
- Icon button grid tied to individual ExtendScript files
- Easy configuration: add buttons by editing one JavaScript file
- Sample scripts included for common Illustrator tasks
- Status feedback in the panel footer after each script run

## Project structure

```
ep-cep-panel/
├── .debug                    # Debug port config for unsigned development
├── CSXS/
│   └── manifest.xml          # CEP extension manifest
├── client/
│   ├── index.html            # Panel UI
│   ├── css/styles.css
│   ├── icons/panel-icon.png
│   └── js/
│       ├── CSInterface.js    # Adobe CEP bridge library
│       ├── main.js           # Button rendering and script execution
│       └── scripts-config.js # Button-to-script mapping
└── host/
    ├── index.jsx             # Loaded when the panel opens
    └── scripts/              # ExtendScript files run by buttons
        ├── center-artboard.jsx
        ├── document-info.jsx
        ├── fit-artboard-to-selection.jsx
        ├── select-all-on-artboard.jsx
        └── unlock-all-layers.jsx
```

## Requirements

- Adobe Illustrator 2024 or later (CEP 12, host ID `ILST`)
- For unsigned development: PlayerDebugMode enabled (see below)

## Installation

### 1. Copy the extension

Copy this entire folder into the CEP extensions directory:

**macOS**

```bash
cp -R ep-cep-panel "/Library/Application Support/Adobe/CEP/extensions/com.ep.cep-panel"
```

**Windows**

```text
C:\Program Files\Common Files\Adobe\CEP\extensions\com.ep.cep-panel
```

The folder name on disk can differ, but keeping it aligned with the bundle ID avoids confusion.

### 2. Enable unsigned extensions (development only)

During development, enable debug mode so Illustrator loads unsigned panels.

**macOS**

```bash
defaults write com.adobe.CSXS.12 PlayerDebugMode 1
```

**Windows (Registry)**

```text
HKEY_CURRENT_USER\Software\Adobe\CSXS.12
  PlayerDebugMode = "1" (String)
```

Restart Illustrator after changing this setting.

### 3. Open the panel

In Illustrator: **Window > Extensions > EP Script Panel**

The panel can be docked, floated, and saved in workspaces like any native panel.

## Adding a new script button

1. Place your ExtendScript file in `host/scripts/`, for example `my-script.jsx`.
2. Add a button entry in `client/js/scripts-config.js`:

```javascript
{
  id: 'my-script',
  label: 'My Script',
  tooltip: 'Runs my custom Illustrator script',
  script: 'my-script.jsx',
  icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5z"/></svg>'
}
```

3. Restart the panel (close and reopen from **Window > Extensions**) or restart Illustrator.

## Included sample scripts

| Button | Script | Description |
|--------|--------|-------------|
| Center Artboard | `center-artboard.jsx` | Centers the view on the active artboard |
| Unlock Layers | `unlock-all-layers.jsx` | Unlocks all layers in the document |
| Fit to Selection | `fit-artboard-to-selection.jsx` | Resizes the active artboard to the selection |
| Select All | `select-all-on-artboard.jsx` | Selects objects on the active artboard |
| Document Info | `document-info.jsx` | Shows a summary alert for the active document |

## How script execution works

1. The panel UI is HTML/CSS/JavaScript (CEP).
2. Clicking a button calls `CSInterface.evalScript()` with ExtendScript that runs `$.evalFile()` on the target `.jsx` file.
3. Scripts execute in Illustrator’s ExtendScript engine with full DOM access (`app`, documents, layers, etc.).

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Panel not in Extensions menu | Confirm install path, manifest host `ILST`, and `PlayerDebugMode` |
| Script file not found | Check filename in `scripts-config.js` matches `host/scripts/` |
| Button does nothing | Open Chrome DevTools for the panel (CEP debug) and check console errors |
| Panel loads but scripts fail | Ensure a document is open when required by the script |

### CEP remote debugging

With `.debug` configured (port `8088`), you can attach a Chromium debugger to inspect the panel UI while Illustrator is running.

## Production signing

For distribution outside your machine, package and sign the extension with `[ZXPSignCmd](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD)` and distribute a `.zxp` installer. Unsigned extensions require `PlayerDebugMode` on each user machine.

## License

Use and modify freely for your own Illustrator workflows.
