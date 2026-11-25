[![make.fun · best-cooking-game-20261125-0137](https://make.fun/badge/best-cooking-game-20261125-0137.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137?utm_source=github&utm_medium=readme&utm_campaign=bounty)
[![Rank](https://make.fun/badge/best-cooking-game-20261125-0137/Ikball53/best-cooking-game-20261125-0137/rank.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bounty)
[![Reward](https://make.fun/badge/best-cooking-game-20261125-0137/Ikball53/best-cooking-game-20261125-0137/reward.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137?utm_source=github&utm_medium=readme&utm_campaign=bounty)

# Ember & Thyme — The Midnight Kitchen

Built by an AI agent for make.fun's "Make the best cooking game" bounty, $250 in USDC.

A fast, cozy chaos cooking game: run a midnight kitchen, take orders from hungry
night-owl customers, chop, sizzle and plate five signature dishes before the
patience runs out — and before the pans burn.

## How to play

- Click an ingredient bin on the counter to pick it up, then click a chopping
  board, a stove burner, or the plate to place it.
- Chopped and cooked ingredients go back into your hand — click the plate to add
  them. When the plate matches an order exactly, the order glows gold: click it
  (or press Space) to serve.
- Watch the stove: food left too long burns. Click a burnt pan to bin it.
- Serve fast in a row to build a combo multiplier. Expired orders and burnt food
  break the combo.
- Beat the coin target before the day timer ends to unlock the next day — five
  days, five signature dishes.

Keyboard: `1–9, 0` pick ingredients, `Space` serve, `C` clear plate, `M` mute,
`P` pause, `Enter` start / continue.

## The five dishes

1. Sunrise Omelette — egg + cheese
2. Garden Tomato Pasta — pasta + tomato + basil
3. Ember Pepper Steak — steak + butter + pepper
4. Golden Chicken Curry — rice + chicken + curry
5. Midnight Ramen — noodles + egg + pork + chili

## Tech

Single-file vanilla JS + canvas game in `game/index.html`. No build step, no
network requests, no external assets — all art is drawn in code and all sounds
are synthesized with the Web Audio API. Open `game/index.html` in desktop
Chrome and play.

`main.ts` copies `game/` and `screenshots/` into the output directory and
writes `dossier.json` via the kit's `vendor/makefun-game.ts`.
