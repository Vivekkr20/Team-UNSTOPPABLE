# Kiwix Onboarding — real ZIM download + reader integration

A plain HTML/CSS/JavaScript onboarding prototype with an additional **Real ZIM library** flow.

## Run
- For the original demo: open `index.html` in a browser.
- For the embedded Kiwix JS reader, use a local web server or HTTPS hosting (recommended): from this folder run `python -m http.server 8000`, then visit `http://localhost:8000`.

## Real archive flow
1. Choose **Real ZIM library** on the first choice screen.
2. Download one of the genuine `.zim` archives from the Kiwix download server.
3. Choose **Open reader here** / **Launch embedded Kiwix reader**.
4. In the embedded official Kiwix JS PWA, select/open the downloaded `.zim` file using the reader's file picker.

The app links to real files, not the original simulated-download catalogue. The original recommendation/download progress demo remains available separately and is still simulated.

## Important browser limitation
A normal website cannot silently read files from the Downloads folder. The user must select the downloaded archive in Kiwix JS. The embedded reader is served by the official Kiwix PWA at `https://pwa.kiwix.org/`; browsers or the remote site may restrict embedding in some configurations, in which case use **Open reader in a new tab**. Use localhost or HTTPS for best compatibility; opening the HTML directly as `file://` is not recommended for service-worker-based reading.

## Archive links
The curated starter archive links are direct `.zim` downloads from `https://download.kiwix.org/zim/wikipedia/`. The full catalogue is at `https://library.kiwix.org/`.
