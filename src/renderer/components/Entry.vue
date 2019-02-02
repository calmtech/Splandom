<template>
<div class="section has-navbar-fixed-top">
  <nav class="navbar is-fixed-top is-light">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img :src="'static/img/logo.png'" alt="Splandom: Randomizer for Splatoon2" height="100%">
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

  <section class="entry">
    <div class="hero entry primary">
      <div class="hero-body">
        <h2 class="title">プレイヤー登録</h2>
        <p class="subtitle">プレイヤーはウデマエを元にチーム分けされます</p>
      </div>
    </div>

    <div class="inner">
      <div class="message">
        <div class="message-header">使い方</div>
        <div class="message-body">
          <ul>
            <li>プレイヤーネームや各ルールのウデマエをテキストで貼り付けてください</li>
            <li>「プレイヤーネーム,ガチエリア,ガチヤグラ,ガチホコバトル,ガチアサリ」の順でプレイヤー情報を並べてください</li>
            <li>ウデマエXのルールは、Xパワーを指定します。未プレイの場合はC-を指定してください</li>
            <li>チームは4人単位のみ対応しているので、4で割り切れる人数で入力してください</li>
            <li>区切り文字がプレイヤー名などに含まれている場合、正常に登録できないのでご注意ください</li>
          </ul>
        </div>
      </div>
      <div class="message">
        <div class="message-header">入力例</div>
        <div class="message-body">
          <ul>
            <li>プレイヤー1,S+0,A+,S+2,S</li>
            <li>プレイヤー2,2055.5,2017,S+8,2108.2</li>
            <li>プレイヤー3,2055.5,S+3,A-,C-</li>
            <li>プレイヤー4,S+0,S+8,A+,A-</li>
          </ul>
        </div>
      </div>

      <div class="message">
        <div class="message-header">エントリー</div>
        <div class="message-body">
          <div class="field">
            <label class="label">区切り文字</label>
            <div class="control">
              <label class="radio">
                <input type="radio" name="delimiter" value="TAB" v-model="delimeter">
                タブ(\t)
              </label>
              <label class="radio">
                <input type="radio" name="delimiter" value="," v-model="delimeter">
                カンマ(,)
              </label>
              <label class="radio">
                <input type="radio" name="delimiter" value=";" v-model="delimeter">
                セミコロン(;)
              </label>
              <label class="radio">
                <input type="radio" name="delimiter" value="、" v-model="delimeter">
                読点(、)
              </label>
              <label class="radio">
                <input type="radio" name="delimiter" value="・" v-model="delimeter">
                中黒(・)
              </label>
            </div>
          </div>
          <div class="field">
            <label class="label">プレイヤーリスト</label>
            <textarea id="entry" class="textarea" ref="entry" v-model="entry" autofocus></textarea>
          </div>
        </div>
      </div>

      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <div class="field is-grouped">
            <button @click="entryPlayers" class="button is-large is-fullwidth">Entry!</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="player" v-if="players != ''">
    <div class="hero player">
      <div class="hero-body">
        <h2 class="title">プレイヤー</h2>
      </div>
    </div>

    <div class="inner players">
      <div class="columns is-mobile is-multiline">
        <div class="column is-3" v-for="player in players" :key="player.name">
          <p>{{ player.name }}</p>
          <p>{{ player.real_power }}</p>
          <p>{{ player.rate }}</p>
        </div>
      </div>

      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <div class="field is-grouped" v-show="players != ''">
            <button @click="splandom_team" class="button is-large is-fullwidth">Splandom!</button>
          </div>
        </div>
      </div>
      <div class="result">
        <div id="result_team" class="columns is-mobile is-multiline" v-show="result_team != ''">
          <div class="column is-4" v-for="team in result_team" v-bind:key="team">
            <table>
              <tr>
                <td class="name">{{ team[0].name }}</td>
                <td class="real_power">{{ team[0].real_power }}</td>
                <td class="rate">{{ team[0].rate }}</td>
              </tr>
              <tr>
                <td class="name">{{ team[1].name }}</td>
                <td class="real_power">{{ team[1].real_power }}</td>
                <td class="rate">{{ team[1].rate }}</td>
              </tr>
              <tr>
                <td class="name">{{ team[2].name }}</td>
                <td class="real_power">{{ team[2].real_power }}</td>
                <td class="rate">{{ team[2].rate }}</td>
              </tr>
              <tr>
                <td class="name">{{ team[3].name }}</td>
                <td class="real_power">{{ team[3].real_power }}</td>
                <td class="rate">{{ team[3].rate }}</td>
              </tr>
              <tr>
                <td colspan="3" class="summary">{{ sumRate(team) }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {TweenMax} from 'gsap'
const _ = window.lodash
export default {
  data () {
    return {
      delimeter: 'TAB',
      entry: '',
      result_team: [],
      players: [],
      countMax: 100
    }
  },
  methods: {
    entryPlayers: function () {
      const ranks = require('./db/ranks.json')
      let playerList = []
      for (let row of this.entry.trim().split(/\r\n|\r|\n/)) {
        const delim = this.delimeter === 'TAB' ? /\t/ : this.delimeter
        const field = row.split(delim)
        const player = {
          name: field[0],
          power: {
            splat_zones: field[1].trim(),
            tower_control: field[2].trim(),
            rainmaker: field[3].trim(),
            clam_blitz: field[4].trim()
          }
        }
        playerList.push(player)
      }
      playerList = playerList.map(function (player) {
        const playerPower = Object.values(player.power).map(function (power) {
          return isNaN(power) ? ranks[power] : power
        })
        player.max_power = parseFloat(playerPower.reduce((a, b) => a >= b ? a : b))
        player.average_power = playerPower.reduce((sum, power) => parseFloat(sum) + parseFloat(power)) / playerPower.length
        return player
      })
      const average = playerList.map((player) =>
        player.average_power
      ).reduce((sum, power) =>
        parseFloat(sum) + parseFloat(power)
      ) / playerList.length
      const standardDeviation = Math.sqrt(
        playerList.map((player) =>
          parseFloat(player.average_power)
        ).map((power) =>
          (power - average) ** 2
        ).reduce((prev, current) =>
          prev + current
        ) / playerList.length
      )
      playerList = playerList.map(function (player) {
        const max = parseFloat(player.max_power)
        const average = parseFloat(player.average_power)
        let realPower = 0
        let rate = 0
        if ((max - average) >= standardDeviation) {
          realPower = Math.round((average + Math.sqrt((max - average) * standardDeviation)) * 10) / 10
        } else if ((max - average) >= 100) {
          realPower = Math.round((average + Math.sqrt((max - average) / 4 * standardDeviation)) * 10) / 10
        } else {
          realPower = Math.round(average * 10) / 10
        }
        rate = Math.floor(realPower / 400 * 10) / 10
        player.real_power = realPower
        player.rate = rate
        return player
      })
      playerList.sort((a, b) => b.real_power - a.real_power)
      this.players = playerList
      // const fs = require('fs')
      // try {
      //   fs.writeFileSync('./db/players.json', JSON.stringify(this.players), 'utf-8')
      // } catch (e) {
      //   console.log('failed to save the file')
      // }
    },
    splandom_team () {
      let randomTeam = []
      let randomizeCount = 0
      const teamCount = this.players.length % 4 === 0 ? this.players.length / 4 : parseInt(this.players.length / 4 + 1)
      do {
        const groups = _.chunk(this.players, teamCount).map((group) => _.shuffle(group))
        randomTeam = []
        for (let i = 0; i < teamCount; i++) {
          let team = []
          groups.forEach(function (group) {
            team.push(group[i])
          })
          randomTeam.push(team)
        }

        var teamPowers = randomTeam.map((team) =>
          team.map((player) =>
            player.rate
          ).reduce((sum, rate) =>
            sum + rate
          )
        ).sort((a, b) => b - a)
        randomizeCount++
        if (randomizeCount > this.countMax) {
          break
        }
      }
      while (teamPowers[0] - teamPowers[teamPowers.length - 1] > 0.2)

      this.result_team = randomTeam

      TweenMax.fromTo('#result_team table', 0.5,
        { fontSize: 0 },
        { fontSize: '2rem' }
      )
    },
    power: function (power) {
      let stringPower = ''
      if (isNaN(power)) {
        stringPower = power
      } else {
        stringPower = 'X(' + power + ')'
      }
      return stringPower
    },
    sumRate: function (team) {
      return team.map((player) =>
        parseInt(player.rate * 10)
      ).reduce((sum, rate) =>
        sum + rate
      ) / 10
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
        td
          font-size: 1.5rem
          border: solid 1px $white
          padding: .25em .5em

          &.rate, &.real_power
            text-align: right
  .column
    color: $white
    text-shadow: darken($gray, 20%) 2px 2px
    text-align: center

.message
  .message-header
    font-size: 2rem
  .message-body
    font-size: 1.5rem

.field
  label
    font-size: 2rem

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

.players
  p
    font-size: 2rem
  .result
    min-height: 36rem

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
.entry
  textarea
    width: 100%
    height: 40rem
    font-size: 2rem
</style>
