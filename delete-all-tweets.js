/*
 * Delete all tweets, undo all retweets and unlike all likes on X (Twitter).
 * Runs in your own logged-in browser tab. No API key, no password, no install.
 *
 * Usage:
 *   1. Open https://x.com/YOUR_USERNAME (posts and retweets),
 *      https://x.com/YOUR_USERNAME/with_replies (replies) or
 *      https://x.com/YOUR_USERNAME/likes (likes).
 *   2. Open DevTools (F12), go to Console, paste this file, press Enter.
 *   3. To stop, reload the page.
 *   4. About every 40 to 50 removals, reload the page and run it again.
 *
 * WARNING: deleted posts cannot be recovered. Download your X archive first.
 * Shared for educational purposes only. The author is not responsible for
 * any deleted content, data loss, account restriction or other loss.
 * https://github.com/the-arma-of-owl/delete-all-tweets-x-twitter
 * MIT License
 */
(async () => {
  // Post IDs that must never be touched, e.g. ['1234567890123456789'].
  // The ID is the number after /status/ in the post URL.
  const PROTECT = [];

  const MAX = 4000;   // maximum actions in one run
  const WAIT = 1500;  // pause after each action in ms; raise it if X limits you

  const path = location.pathname;
  const MODE = path.endsWith('/likes') ? 'likes' : 'posts';
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = () => document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
  );
  const protRe = PROTECT.map(
    (id) => new RegExp('/status/' + id + '(?:[/?#]|$)')
  );
  const isProtected = (art) => protRe.length > 0 &&
    [...art.querySelectorAll('a[href]')].some(
      (a) => protRe.some((re) => re.test(a.getAttribute('href')))
    );
  // Label of the "Delete" item in the post menu, by interface language.
  const DELETE_LABEL = /^(Delete|Sil|Eliminar|Excluir|Supprimer|Löschen|Elimina|Verwijderen|Usuń|Удалить|削除|삭제|删除|刪除)(?:\s|$)/i;
  const articles = () => [
    ...document.querySelectorAll('article[data-testid="tweet"]')
  ];
  let done = 0;
  let idle = 0;
  let skipped = 0;

  while (done < MAX && idle < 8) {
    let acted = false;

    for (const art of articles()) {
      if (art.dataset.done) continue;
      if (isProtected(art)) {
        art.dataset.done = '1';
        skipped++;
        console.log('Protected post skipped');
        continue;
      }

      if (MODE === 'likes') {
        const b = art.querySelector('[data-testid="unlike"]');
        art.dataset.done = '1';
        if (!b) continue;
        b.scrollIntoView({ block: 'center' });
        b.click();
        acted = true;
        break;
      }

      const rt = art.querySelector('[data-testid="unretweet"]');
      if (rt) {
        art.dataset.done = '1';
        rt.scrollIntoView({ block: 'center' });
        rt.click();
        await sleep(600);
        const ok = document.querySelector('[data-testid="unretweetConfirm"]');
        if (ok) {
          ok.click();
          acted = true;
        } else {
          esc();
        }
        break;
      }

      art.dataset.done = '1';
      const caret = art.querySelector('[data-testid="caret"]');
      if (!caret) continue;
      caret.scrollIntoView({ block: 'center' });
      caret.click();
      await sleep(600);
      const items = document.querySelectorAll('[role="menuitem"]');
      const del = [...items].find((m) => DELETE_LABEL.test(m.innerText.trim()));
      if (!del) {
        // Not your post (no Delete option): close the menu and move on.
        esc();
        await sleep(300);
        continue;
      }
      del.click();
      await sleep(600);
      const ok = document.querySelector(
        '[data-testid="confirmationSheetConfirm"]'
      );
      if (ok) {
        ok.click();
        acted = true;
      }
      break;
    }

    if (acted) {
      done++;
      idle = 0;
      console.log(MODE, 'removed:', done);
      await sleep(WAIT);
    } else {
      idle++;
      window.scrollBy(0, 1500);
      await sleep(2500);
    }
  }
  console.log('Done.', MODE, 'removed:', done, 'protected skipped:', skipped);
})();
