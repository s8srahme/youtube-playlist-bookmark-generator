# 💻 YouTube Playlist Bookmark Generator

> `ypbg` is a CLI tool designed to convert `csv` files with YouTube playlist data into bookmark `html` files that can be imported in Firefox and Chrome.

## 🔋 Tech Stack

> The set of technologies used to develop this tool includes:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [Bash](https://www.gnu.org/software/bash/)
- [Yargs](https://yargs.js.org/)
- [Puppeteer](https://pptr.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📦 Installation

> Once you have `Node.js` runtime environment on your local development machine (Unix system), follow these steps to install the tool globally:

```bash
git clone https://github.com/s8srahme/youtube-playlist-bookmark-generator.git
cd youtube-playlist-bookmark-generator
npm install && npm install -g .
```

> To uninstall this tool, run the following command:

```bash
npm uninstall -g youtube-playlist-bookmark-generator
```

## ⌨️ Usage

> Follow the steps below to export your YouTube playlist data as `csv` files via the Google Takeout feature:

1. Go to the [Google Takeout](https://takeout.google.com/) page.
2. Deselect all and then select only `YouTube and YouTube Music`.
3. Click on `All YouTube data included` and select only `playlists`.
4. Choose your preferred download link (e.g. via email, google drive or dropbox).
5. Click `Create export` and download link will soon appear in your email inbox.
6. Download and unzip the compressed file. Your `csv` playlist files are located under `Takeout -> YouTube and YouTube Music -> playlists`.

> To display the full list of `ypbg` supported options, type the following command:

```bash
$ ypbg --help

ypbg helps you convert YouTube playlists into browser bookmarks.

Usage: -s <source-path> -d <destination-path>

Options:
      --help         Show help                                    [boolean]
      --version      Show version number                          [boolean]
  -s, --source       Absolute source directory path     [string] [required]
  -d, --destination  Absolute destination directory path[string] [required]
  -v, --verbose      Run with verbose logging                     [boolean]
```

> An example command to generate bookmark files will look like:

```bash
$ ypbg -s ~/Downloads/youtube-playlist-bookmark-generator/data/playlists -d ~/Downloads/youtube-playlist-bookmark-generator/data/bookmarks -v
```

> **NOTE:**<br />You must use absolute directory paths in the arguments above. Videos that are private or no longer available will be ignored in the generated bookmark files.

## 🚨 License

> This project is licensed under the GNU General Public License, Copyright (c) 2023 Sabbir Ahmed. For more information see [LICENSE](/LICENSE).
