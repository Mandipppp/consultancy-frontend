// postcss.config.js
import postcssTailwind from '@tailwindcss/postcss'
import autoprefixer     from 'autoprefixer'

export default {
  plugins: [
    postcssTailwind(),    // ← uses the new @tailwindcss/postcss package
    autoprefixer(),       // ← autoprefixer as usual
  ],
}
