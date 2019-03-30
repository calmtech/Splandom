<template>
<div class="section has-navbar-fixed-top">
  <nav class="navbar is-fixed-top is-light">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <router-link to="/">
          <img :src="'static/img/logo.png'" alt="Splandom: Randomizer for Splatoon2" height="100%">
        </router-link>
      </a>
      <div @click="burger" class="navbar-burger burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" id="navMenu">
      <div class="navbar-item">
        <router-link class="navbar-item" to="/">ルール＆ステージ</router-link>
      </div>
      <div class="navbar-item">
        <router-link class="navbar-item" to="/entry">プレイヤー登録＆チーム分け</router-link>
      </div>
    </div>

  </nav>

  <section class="main">
    <div class="hero main">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Splandom!</h1>
          <p class="subtitle">Randomizer for Splatoon 2</p>
        </div>
      </div>
    </div>
  </section>

  <section class="rule">
    <div class="hero rule primary">
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
      
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <button @click="splandom_rule" class="button is-large is-fullwidth">Splandom!</button>
        </div>
      </div>

      <div class="result">
        <div id="result_rule" v-show="result_rule != ''">{{ result_rule }}</div>
      </div>
    </div>
  </section>

  <section class="stage">
    <div class="hero stage secondary">
      <div class="hero-body">
        <h2 class="title">ステージ</h2>
        <p class="subtitle">チェックを入れたステージは含まれません</p>
      </div>
    </div>

    <div class="inner stages">
      <div class="columns is-mobile is-multiline">
        <div class="column is-4" v-for="stage in stages" :key="stage.id">
          <label>
            <input type="checkbox" class="filled-in" :value="stage.localization.ja" />
            <img :src="'static/img/stages/' + stage.key + '.png'" width="100%">
            <span>{{ stage.localization.ja }}</span>
          </label>
        </div>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <div class="field is-grouped">
            <button @click="splandom_stage" class="button is-large is-fullwidth">Splandom!</button>
          </div>
        </div>
      </div>
      <div class="result">
        <div id="result_stage" v-show="result_stage != ''">{{ result_stage }}</div>
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
    },
    burger () {
      const nav = document.querySelector('.navbar-burger')
      const target = nav.dataset.target
      const targetOn = document.getElementById(target)
      nav.classList.toggle('is-active')
      targetOn.classList.toggle('is-active')
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
$tertiary: adjust-hue($primary, 135deg)
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
  font-size: 2em

button
  font-size: 2rem !important
  font-family: 'Splatfont 2' !important

input[type=checkbox]
  opacity: 0

  &:checked + img
    filter: grayscale(100%)
    opacity: .5

  &:checked ~ span
    text-shadow: darken($gray, 20%) 2px 2px
    color: $gray

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

    #result_team
      font-size: 1.5rem
      table
        width: 100%
        collapse: table-collapse
        font-size: 2rem
        td
          border: solid 1px $white
          padding: .5em

          &.position, &.style, &.summary
            text-align: center
  .column
    color: $white
    text-shadow: darken($gray, 20%) 2px 2px
    text-align: center

.notes
  font-size: 1.25rem
  .item
    display: inline-block
    margin-right: 1em
    i
      display: inline-block
      margin-right: .5em
      font-style: normal
      &:after
        content: " :"

.hero
  .hero-body
    .title, .subtitle
      color: $white
      text-shadow: darken($gray, 40%) 2px 2px

.hero.main
  .hero-body
    .title
      font-size: 3rem

.hero.primary
  .hero-body
    background-color: $primary
    .title, .subtitle
      color: $white
      text-shadow: darken($primary, 20%) 2px 2px

.hero.secondary
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
