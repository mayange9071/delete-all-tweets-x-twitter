# Delete All Tweets on X (Twitter): Free Script to Remove Posts, Retweets and Likes

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![No API key](https://img.shields.io/badge/API%20key-not%20needed-blue)
![Runs in browser](https://img.shields.io/badge/runs%20in-your%20browser-orange)

**Bulk delete all your tweets, undo every retweet and unlike all liked posts on X (formerly Twitter)** with one copy-paste script. It runs in your own logged-in browser tab, so there is no API key, no third-party app, no password sharing and nothing to install.

[Türkçe açıklama aşağıda](#türkçe-tüm-tweetleri-silme-scripti)

## Features

- **Delete all tweets** from your profile, including replies
- **Remove all retweets** (reposts) in bulk
- **Unlike all tweets** from your likes page
- **Protect specific posts** so they are never touched
- Free, open source and MIT licensed
- Works from the browser console: no X API access, no account connection, no data leaves your browser
- Built-in delay to reduce the chance of rate limiting

## Before you start

- **Deleted posts cannot be recovered.** Download your data archive first: *Settings > Your account > Download an archive of your data*.
- Automated actions may be limited by X. If you see a lock or verification warning, stop and wait.
- **Reload and re-run regularly.** In practice the script stops finding posts after roughly **40 to 50 actions**. When the console shows no new `removed` lines, reload the page and paste the script again. Repeat until nothing is left.
- **This project is shared for educational purposes only.** The author accepts no responsibility for any deleted content, lost data, account limitation or other loss resulting from its use.

## Quick start

1. Log in to [x.com](https://x.com) in Chrome, Edge, Brave or Firefox.
2. Open the page for what you want to remove:

   | To remove | Open |
   |---|---|
   | Your posts and retweets | `https://x.com/YOUR_USERNAME` |
   | Your replies | `https://x.com/YOUR_USERNAME/with_replies` |
   | Your likes | `https://x.com/YOUR_USERNAME/likes` |

3. Press **F12** (or right click > Inspect) and open the **Console** tab.
4. Open [`delete-all-tweets.js`](delete-all-tweets.js), copy the **whole file**, paste it into the console and press **Enter**.
   If the browser blocks pasting, type `allow pasting`, press Enter, then paste again.
5. Watch the console: it prints `posts removed: 1, 2, 3...` or `likes removed: ...`.
6. **To stop at any time, reload the page.**
7. **About every 40 to 50 removals, reload the page and paste the script again.** The page stops loading new posts after a while, so the script needs a fresh start to continue.

Run it on each page you want to clean. The script detects the likes page automatically.

### Try it on a few posts first

Change `const MAX = 4000;` to `const MAX = 3;`, run it, and check that three posts disappeared. Then run it again with the original value.

## Protect posts you want to keep

Put the post IDs in the `PROTECT` list at the top of the script. The ID is the number after `/status/` in a post URL.

```js
const PROTECT = ['1234567890123456789', '9876543210987654321'];
```

Protected posts are never deleted, un-retweeted or unliked. The console prints `Protected post skipped` when one is passed.

## Settings

| Setting | Default | Meaning |
|---|---|---|
| `MAX` | `4000` | Maximum number of actions in one run |
| `WAIT` | `1500` | Pause in milliseconds after each action. Increase it if X starts limiting you |
| `PROTECT` | `[]` | Post IDs that must never be touched |

## How it works

The script uses the same buttons you would click by hand:

- **Posts:** opens the post menu, chooses **Delete** and confirms. Posts without a Delete option are not yours and are skipped.
- **Retweets:** clicks **Undo repost** and confirms.
- **Likes:** clicks the like button to unlike.
- When nothing is left on screen it scrolls to load more, and stops after several empty scrolls.

## Limitations

- X shows only a limited number of recent posts on a profile, so very old posts may not load and cannot be reached this way.
- The likes page may not list every like you ever made.
- X changes its interface from time to time. If the script stops finding buttons, please [open an issue](../../issues).
- The post menu is matched by its **Delete** label. Tested with the Turkish interface; English and several other languages are included but not all were tested.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Uncaught SyntaxError` | Part of the file was not copied. Clear the console and paste the whole file again |
| Pasting is blocked | Type `allow pasting` in the console and press Enter |
| Nothing gets deleted | Make sure you are on your own profile. The interface may have changed: open an issue |
| It stops after about 40 to 50 posts | Expected. Reload the page and run the script again |
| Account locked or verification asked | Stop, wait, and use a larger `WAIT` value |

## FAQ

**How do I delete all my tweets at once?**
Open your profile on x.com, paste `delete-all-tweets.js` into the browser console and press Enter. Repeat on the replies page.

**How do I remove all retweets?**
Run the same script on your profile. Retweets are undone automatically.

**How do I unlike all tweets?**
Open `x.com/YOUR_USERNAME/likes` and run the script there.

**Do I need the X API or a developer account?**
No. The script runs in your browser session and uses the normal interface.

**Is it safe? Does it send my data anywhere?**
The script makes no network requests of its own and sends nothing to third parties. It only clicks buttons on the page you have open. Read the source: it is one short file.

**Can I undo a deletion?**
No. X does not restore deleted posts. Download your archive before running it.

## Türkçe: Tüm tweetleri silme scripti

X (Twitter) hesabındaki **tüm gönderileri silmek, retweetleri geri almak ve beğenileri kaldırmak** için ücretsiz tarayıcı scripti. API anahtarı, uygulama ya da şifre gerekmez; kendi açık oturumunda çalışır.

1. `x.com/KULLANICI_ADIN` sayfasını aç (gönderiler ve retweetler). Yanıtlar için `/with_replies`, beğeniler için `/likes` sayfasını aç.
2. **F12** ile **Console** sekmesine geç.
3. [`delete-all-tweets.js`](delete-all-tweets.js) dosyasının tamamını kopyala, yapıştır ve Enter'a bas. Yapıştırma engellenirse önce `allow pasting` yaz.
4. Durdurmak için sayfayı yenile.
5. **Ortalama her 40 ile 50 gönderide bir sayfayı yenileyip scripti tekrar yapıştırman gerekir.** Sayfa bir süre sonra yeni gönderi yüklemeyi bırakıyor; kaldığı yerden devam etmek için script yeniden başlatılmalı.

Silmek istemediğin gönderilerin numaralarını (URL'deki `/status/` sonrasındaki sayı) scriptin başındaki `PROTECT` listesine ekle. **Silinen gönderiler geri gelmez;** başlamadan önce X arşivini indir.

> **Sorumluluk reddi:** Bu proje yalnızca **eğitim amaçlı** paylaşılmıştır. Kullanımından doğabilecek silinen içerik, veri kaybı, hesap kısıtlaması ya da başka herhangi bir kayıptan yazar sorumlu değildir.

## Disclaimer

This project is shared **for educational purposes only**. It is not affiliated with, endorsed by or connected to X Corp. Use it on your own account and at your own risk. **The author is not responsible for any deleted content, data loss, account restriction or other damage** caused by using it. You are responsible for complying with the X Terms of Service.

## License

[MIT](LICENSE) © 2026 Efe Çam
