# Cinnamon Roll

An interactive cinnamon roll baking game built with React + Vite.

**Live:** https://cinnamon-roll.fly.dev

## About

Walk through 8 steps to bake your own cinnamon rolls:

1. **Make the Dough** — collect required ingredients (flour, butter, egg, milk, yeast, salt, sugar)
2. **Knead & Roll** — rolling pin flattens the dough
3. **Add the Filling** — spread brown sugar and cinnamon, add optional pecans or raisins
4. **Roll it Up** — dough rolls into a log
5. **Slice** — click across the log to cut individual rolls
6. **Bake** — oven heats with sizzle sounds, rolls turn golden
7. **Frost** — mix cream cheese frosting and pour over warm rolls
8. **Serve** — enjoy your finished cinnamon rolls

Ingredients float around the screen with cursor-driven parallax. Sound effects are generated via the Web Audio API (no external files).

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
fly deploy
```
