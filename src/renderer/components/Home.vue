<template>
<div class="section">
  <section class="main">
    <div class="hero main">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Splandom!</h1>
          <p class="subtitle">ルール＆ステージ ランダム決定 for スプラトゥーン2</p>
        </div>
      </div>
    </div>
  </section>

  <section class="rule">
    <div class="hero rule">
      <div class="hero-body">
        <h2 class="title">ルール</h2>
        <p class="subtitle">チェックを入れたルールは含まれません</p>
      </div>
    </div>

    <div class="inner rules">
      <div class="columns is-mobile is-multiline">
        <div class="column is-4" v-for="rule in rules" :key="rule.key">
          <label>
            <input type="checkbox" :value="rule.localization.ja" />
            <img :src="'static/img/rules/' + rule.key + '.jpg'" width="100%">
            <span>{{ rule.localization.ja }}</span>
          </label>
        </div>
      </div>

      <div class="result">
        <div id="result_rule" v-show="result_rule != ''">{{ result_rule }}</div>
      </div>

      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <button @click="splandom_rule" class="button is-large is-fullwidth">Splandom!</button>
        </div>
      </div>
    </div>
  </section>

  <section class="stage">
    <div class="hero stage">
      <div class="hero-body">
        <h2 class="title">ステージ</h2>
        <p class="subtitle">チェックを入れたステージは含まれません</p>
      </div>
    </div>

    <div class="inner stages">
      <div class="columns is-mobile is-multiline">
        <div class="column is-3" v-for="stage in stages" :key="stage.id">
          <label>
            <input type="checkbox" class="filled-in" :value="stage.localization.ja" />
            <img :src="'static/img/stages/' + stage.key + '.png'" width="100%">
            <span>{{ stage.localization.ja }}</span>
          </label>
        </div>
      </div>
      <div class="result">
        <div id="result_stage" v-show="result_stage != ''">{{ result_stage }}</div>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <div class="field is-grouped">
            <button @click="splandom_stage" class="button is-large is-fullwidth">Splandom!</button>
          </div>
        </div>
      </div>
    </div>


  </section>
</div>
</template>

<script>
import {TweenMax} from 'gsap'
export default {
  name: 'home',
  data () {
    return {
      result_rule: '',
      result_stage: '',
      stages: require('./db/stages.json'),
      rules: require('./db/rules.json')
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    splandom_rule () {
      const inputs = document.querySelectorAll('.rules input[type=checkbox]')
      const unchecked = [].filter.call(inputs, function (input) {
        return !input.checked
      })
      const i = Math.floor(Math.random() * (unchecked.length - 1))
      this.result_rule = unchecked[i].value
      TweenMax.fromTo('#result_rule', 0.5,
        { fontSize: 0 },
        { fontSize: '6rem' }
      )
    },
    splandom_stage () {
      const inputs = document.querySelectorAll('.stages input[type=checkbox]')
      const unchecked = [].filter.call(inputs, function (input) {
        return !input.checked
      })
      const i = Math.floor(Math.random() * (unchecked.length - 1))
      this.result_stage = unchecked[i].value
      TweenMax.fromTo('#result_stage', 0.5,
        { fontSize: 0 },
        { fontSize: '6rem' }
      )
    }
  }
}
</script>

<style lang="sass">
@font-face
  font-family: 'Splatfont 2'
  src: url('../assets/fonts/Splatfont2.woff2') format('woff2'), url('../assets/fonts/Splatfont2.woff') format('woff'), url('../assets/fonts/Splatfont2.svg#Splatfont2') format('svg')
  font-weight: normal
  font-style: normal

$primary: #64D343
$secondary: #DC417D
$white: #fff
$gray: #ccc

body
  font-family: 'Splatfont 2' !important
  background: url('../assets/images/archives_bg.jpg') left top no-repeat
  background-size: cover

section
  padding-left: 0 !important
  padding-right: 0 !important

label
  font-size: 2rem

button
  font-size: 2rem !important
  font-family: 'Splatfont 2' !important

input[type=checkbox]
  opacity: 0

  &:checked + img
    filter: grayscale(100%)

  &:checked ~ span
    text-shadow: darken($gray, 20%) 2px 2px
  

.inner
  background: url('../assets/images/top_sec01_bg.png') left top no-repeat
  background-size: cover
  margin: 0 !important
  padding: 2rem 2rem 6rem 2rem

  .result
    margin: 2rem 0
    min-height: 10rem
    text-align: center
    font-size: 6rem


  .column
    color: $white
    text-shadow: darken($gray, 20%) 2px 2px
    text-align: center

.hero.main
  .hero-body
    .title, .subtitle
      color: $white
      text-shadow: darken($gray, 20%) 2px 2px
    .title
      font-size: 3rem

.hero.rule
  .hero-body
    background-color: $primary
    .title, .subtitle
      color: $white
      text-shadow: darken($primary, 20%) 2px 2px

.hero.stage
  .hero-body
    background-color: $secondary
    .title, .subtitle
      color: $white
      text-shadow: darken($secondary, 20%) 2px 2px

.rules
  label
    span
      text-shadow: darken($primary, 20%) 2px 2px
  .result
    color: $primary
    text-shadow: $white 2px 2px

.stages
  label
    span
      text-shadow: darken($secondary, 20%) 2px 2px
  .result
    color: $secondary
    text-shadow: $white 2px 2px
</style>
