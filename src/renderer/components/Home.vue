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
            <input type="checkbox" class="filled-in" :value="rule.localization.ja" />
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
        <div class="column is-4" v-for="stage in stages" :key="stage.id">
          <label>
            <input type="checkbox" class="filled-in" :value="stage.localization.ja" />
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
// import DB from 'nedb'
// var stageDB = new DB({
//   filename: './db/stage.json',
//   autoload: true
// })
import {TweenMax} from 'gsap'
export default {
  name: 'home',
  data () {
    return {
      result_rule: '',
      result_stage: '',
      stages: [
        {
          'id': 7,
          'key': 'port_mackerel',
          'localization': {
            'de': 'Heilbutt-Hafen',
            'en': 'Port Mackerel',
            'es-419': 'Puerto Jurel',
            'es-es': 'Puerto Jurel',
            'fr-ca': 'Docks Haddock',
            'fr-fr': 'Docks Haddock',
            'it': 'Porto Polpo',
            'ja': 'ホッケふ頭',
            'nl': 'Hamerhaaihaven',
            'ru': 'Порт «Корюшка'
          }
        },
        {
          'id': 8,
          'key': 'moray_towers',
          'localization': {
            'de': 'Muränentürme',
            'en': 'Moray Towers',
            'es-419': 'Torres Merluza',
            'es-es': 'Torres Merluza',
            'fr-ca': 'Tours Girelle',
            'fr-fr': 'Tours Girelle',
            'it': 'Torri cittadine',
            'ja': 'タチウオパーキング',
            'nl': 'Tonijntorens',
            'ru': 'Муренские башн'
          }
        },
        {
          'id': 0,
          'key': 'the_reef',
          'localization': {
            'de': 'Korallenviertel',
            'en': 'The Reef',
            'es-419': 'Barrio Congrio',
            'es-es': 'Barrio Congrio',
            'fr-ca': 'Allées salées',
            'fr-fr': 'Allées salées',
            'it': 'Rione Storione',
            'ja': 'バッテラストリート',
            'nl': 'Sushistraat',
            'ru': 'Ри'
          }
        },
        {
          'id': 1,
          'key': 'musselforge_fitness',
          'localization': {
            'de': 'Molluskelbude',
            'en': 'Musselforge Fitness',
            'es-419': 'Gimnasio Mejillón',
            'es-es': 'Gimnasio Mejillón',
            'fr-ca': 'Gymnase Ancrage',
            'fr-fr': 'Gymnase Ancrage',
            'it': 'Centro polpisportivo',
            'ja': 'フジツボスポーツクラブ',
            'nl': 'Vinvis Fitness',
            'ru': 'Спортзал «Кревед!'
          }
        },
        {
          'id': 2,
          'key': 'starfish_mainstage',
          'localization': {
            'de': 'Seeigel-Rockbühne',
            'en': 'Starfish Mainstage',
            'es-419': 'Auditorio Erizo',
            'es-es': 'Auditorio Erizo',
            'fr-ca': 'Scène Sirène',
            'fr-fr': 'Scène Sirène',
            'it': 'Palco Plancton',
            'ja': 'ガンガゼ野外音楽堂',
            'nl': 'Zeesterrenstage',
            'ru': 'КЗ «Иглокожий'
          }
        },
        {
          'id': 3,
          'key': 'sturgeon_shipyard',
          'localization': {
            'de': 'Störwerft',
            'en': 'Sturgeon Shipyard',
            'es-419': 'Astillero Beluga',
            'es-es': 'Astillero Beluga',
            'fr-ca': 'Chantier Narval',
            'fr-fr': 'Chantier Narval',
            'it': 'Cantiere Pinnenere',
            'ja': 'チョウザメ造船',
            'nl': 'Walruswerf',
            'ru': 'Осетровые верф'
          }
        },
        {
          'id': 4,
          'key': 'inkblot_art_academy',
          'localization': {
            'de': 'Perlmutt-Akademie',
            'en': 'Inkblot Art Academy',
            'es-419': 'Instituto Coralino',
            'es-es': 'Instituto Coralino',
            'fr-ca': 'Institut Calmarts',
            'fr-fr': 'Institut Calamarts',
            'it': 'Campus Hippocampus',
            'ja': '海女美術大学',
            'nl': 'Koraalcampus',
            'ru': 'Академия «Лепота'
          }
        },
        {
          'id': 5,
          'key': 'humpback_pump_track',
          'localization': {
            'de': 'Buckelwal-Piste',
            'en': 'Humpback Pump Track',
            'es-419': 'Tiburódromo',
            'es-es': 'Tiburódromo',
            'fr-ca': 'Piste Méroule',
            'fr-fr': 'Piste Méroule',
            'it': 'Tintodromo Montecarpa',
            'ja': 'コンブトラック',
            'nl': 'Lekkerbektrack',
            'ru': 'Велозал «9-й вал'
          }
        },
        {
          'id': 6,
          'key': 'manta_maria',
          'localization': {
            'de': 'Manta Maria',
            'en': 'Manta Maria',
            'es-419': 'Corbeta Corvina',
            'es-es': 'Corbeta Corvina',
            'fr-ca': 'Manta Maria',
            'fr-fr': 'Manta Maria',
            'it': 'Manta Maria',
            'ja': 'マンタマリア号',
            'nl': 'Klipvisklipper',
            'ru': '«Манта-Мария'
          }
        },
        {
          'id': 9,
          'key': 'snapper_canal',
          'localization': {
            'de': 'Grätenkanal',
            'en': 'Snapper Canal',
            'es-419': 'Canal Cormorán',
            'es-es': 'Canal Cormorán',
            'fr-ca': 'Canalmar',
            'fr-fr': 'Canalamar',
            'it': 'Canale Cannolicchio',
            'ja': 'エンガワ河川敷',
            'nl': 'Moeraalkanaal',
            'ru': 'Подмостовь'
          }
        },
        {
          'id': 10,
          'key': 'kelp_dome',
          'localization': {
            'de': 'Tümmlerkuppel',
            'en': 'Kelp Dome',
            'es-419': 'Jardín botánico',
            'es-es': 'Jardín botánico',
            'fr-ca': 'Serre Goémon',
            'fr-fr': 'Serre Goémon',
            'it': 'Serra di alghe',
            'ja': 'モズク農園',
            'nl': 'Kelpwierkas',
            'ru': 'Ферма ламинари'
          }
        },
        {
          'id': 11,
          'key': 'blackbelly_skatepark',
          'localization': {
            'de': 'Punkasius-Skatepark',
            'en': 'Blackbelly Skatepark',
            'es-419': 'Parque Lubina',
            'es-es': 'Parque Lubina',
            'fr-ca': 'Plancho Mako',
            'fr-fr': 'Skatepark Mako',
            'it': 'Pista Polposkate',
            'ja': 'Bバスパーク',
            'nl': 'Snoekduik-skatepark',
            'ru': 'Скейт-парк «Скат'
          }
        },
        {
          'id': 12,
          'key': 'shellendorf_institute',
          'localization': {
            'de': 'Abyssal-Museum',
            'en': 'Shellendorf Institute',
            'es-419': 'Galería Raspa',
            'es-es': 'Galería Raspa',
            'fr-ca': 'Galerie des abysses',
            'fr-fr': 'Galerie des abysses',
            'it': 'Museo paleontonnologico',
            'ja': 'デボン海洋博物館',
            'nl': 'Vistorisch museum',
            'ru': 'Музей «Мезозой'
          }
        },
        {
          'id': 13,
          'key': 'makomart',
          'localization': {
            'de': 'Cetacea-Markt',
            'en': 'MakoMart',
            'es-419': 'Ultramarinos Orca',
            'es-es': 'Ultramarinos Orca',
            'fr-ca': 'Supermarché Cétacé',
            'fr-fr': 'Supermarché Cétacé',
            'it': 'Mercatotano',
            'ja': 'ザトウマーケット',
            'nl': 'Bultrugbazaar',
            'ru': '«Горбуша-Маркет'
          }
        },
        {
          'id': 14,
          'key': 'walleye_warehouse',
          'localization': {
            'de': 'Kofferfisch-Lager',
            'en': 'Walleye Warehouse',
            'es-419': 'Almacén Rodaballo',
            'es-es': 'Almacén Rodaballo',
            'fr-ca': 'Encrepôt',
            'fr-fr': 'Encrepôt',
            'it': 'Magazzino',
            'ja': 'ハコフグ倉庫',
            'nl': 'Zeeleeuwloods',
            'ru': 'Инкрабскла'
          }
        },
        {
          'id': 15,
          'key': 'arowana_mall',
          'localization': {
            'de': 'Arowana-Center',
            'en': 'Arowana Mall',
            'es-419': 'Plazuela del Calamar',
            'es-es': 'Plazuela del Calamar',
            'fr-ca': 'Centre Arowana',
            'fr-fr': 'Centre Arowana',
            'it': 'Centro commerciale',
            'ja': 'アロワナモール',
            'nl': 'Piranha Plaza',
            'ru': 'Тц «Аравана'
          }
        },
        {
          'id': 16,
          'key': 'camp_triggerfish',
          'localization': {
            'de': 'Camp Schützenfisch',
            'en': 'Camp Triggerfish',
            'es-419': 'Campamento Arowana',
            'es-es': 'Campamento Arowana',
            'fr-ca': 'Hippo-Camping',
            'fr-fr': 'Hippo-Camping',
            'it': 'Campeggio Totan',
            'ja': 'モンガラキャンプ場',
            'nl': 'Kamp Karper',
            'ru': 'База «Спинорог'
          }
        },
        {
          'id': 17,
          'key': 'piranha_pit',
          'localization': {
            'de': 'Steinköhler-Grube',
            'en': 'Piranha Pit',
            'es-419': 'Cantera Tintorera',
            'es-es': 'Cantera Tintorera',
            'fr-ca': 'Carrières Caviar',
            'fr-fr': 'Carrière Caviar',
            'it': 'Miniera dOrata',
            'ja': 'ショッツル鉱山',
            'nl': 'Grondelgroeve',
            'ru': 'Пираньев карье'
          }
        },
        {
          'id': 18,
          'key': 'goby_arena',
          'localization': {
            'de': 'Backfisch-Stadion',
            'en': 'Goby Arena',
            'es-419': 'Estadio Ajolote',
            'es-es': 'Estadio Ajolote',
            'fr-ca': 'Stade Bernique',
            'fr-fr': 'Stade Bernique',
            'it': 'Arena Sardina',
            'ja': 'アジフライスタジアム',
            'nl': 'Planktonstadion',
            'ru': 'Арена «Лужа'
          }
        },
        {
          'id': 19,
          'key': 'new_albacore_hotel',
          'localization': {
            'de': 'Hotel Neothun',
            'en': 'New Albacore Hotel',
            'es-419': 'Gran Hotel Caviar',
            'es-es': 'Gran Hotel Caviar',
            'fr-ca': 'Hôtel Atoll',
            'fr-fr': 'Hôtel Atoll',
            'it': 'Hotel Tellina',
            'ja': 'ホテルニューオートロ',
            'nl': 'Hotel de Keizersvis',
            'ru': 'Отель «Прибой'
          }
        },
        {
          'id': 20,
          'key': 'wahoo_world',
          'localization': {
            'de': 'Flunder-Funpark',
            'en': 'Wahoo World',
            'es-419': 'Pirañalandia',
            'es-es': 'Pirañalandia',
            'fr-ca': 'Parc Carapince',
            'fr-fr': 'Parc Carapince',
            'it': 'Soglioland',
            'ja': 'スメーシーワールド',
            'nl': 'Waterwonderland',
            'ru': 'Луна-парк «Язь'
          }
        },
        {
          'id': 21,
          'key': 'anchov_games',
          'localization': {
            'de': 'Anchobit Games HQ',
            'en': 'Ancho-V Games',
            'es-419': 'Estadio Ajolote',
            'es-es': 'Estadio Ajolote',
            'fr-ca': 'Tentatec Studio',
            'fr-fr': 'Tentatec Studio',
            'it': 'Acciugames',
            'ja': 'アンチョビットゲームズ',
            'nl': 'Ansjobit-gamestudio',
            'ru': '«Гуппи-Геймдев'
          }
        },
        {
          'id': 22,
          'key': 'skipper_pavilion',
          'localization': {
            'de': 'Grundel-Pavillon',
            'en': 'Skipper Pavilion',
            'es-419': 'Puerta del Gobio',
            'es-es': 'Puerta del Gobio',
            'fr-ca': 'Lagune aux gobies',
            'fr-fr': 'Lagune aux gobies',
            'it': 'Padiglione Capitone',
            'ja': 'ムツゴ楼',
            'nl': 'Palingpaviljoen',
            'ru': 'Парк «Во Сток!'
          }
        }
      ],
      rules: [
        {
          'key': 'turf_war',
          'localization': {
            'de': 'Revierkampf',
            'en': 'Turf War',
            'es-419': 'Territorial',
            'es-es': 'Territorial',
            'fr-ca': 'Guerre de territoire',
            'fr-fr': 'Guerre de territoire',
            'it': 'Mischia mollusca',
            'ja': 'ナワバリバトル',
            'nl': 'Grondoorlog',
            'ru': 'Бой за район'
          },
          'multiline': {
            'de': 'Revier-\nkampf',
            'en': 'Turf\nWar',
            'es-419': 'Combate\nterritorial',
            'es-es': 'Territorial',
            'fr-ca': 'Guerre de\nterritoire',
            'fr-fr': 'Guerre de\nterritoire',
            'it': 'Mischia\nmollusca',
            'ja': 'ナワバリ\nバトル',
            'nl': 'Grond-\noorlog',
            'ru': 'Бой за\nрайон'
          }
        },
        {
          'key': 'rainmaker',
          'localization': {
            'de': 'Operation Goldfisch',
            'en': 'Rainmaker',
            'es-419': 'Pez dorado',
            'es-es': 'Pez dorado',
            'fr-ca': 'Mission bazookarpe',
            'fr-fr': 'Mission Bazookarpe',
            'it': 'Bazookarp',
            'ja': 'ガチホコバトル',
            'nl': 'Bazookarper',
            'ru': 'Мегакарп'
          },
          'multiline': {
            'de': 'Operation\nGoldfisch',
            'en': 'Rainmaker',
            'es-419': 'Pez\ndorado',
            'es-es': 'Pez\ndorado',
            'fr-ca': 'Mission\nbazookarpe',
            'fr-fr': 'Mission\nBazookarpe',
            'it': 'Bazookarp',
            'ja': 'ガチホコ\nバトル',
            'nl': 'Bazookarper',
            'ru': 'Мегакарп'
          }
        },
        {
          'key': 'splat_zones',
          'localization': {
            'de': 'Herrschaft',
            'en': 'Splat Zones',
            'es-419': 'Pintazonas',
            'es-es': 'Pintazonas',
            'fr-ca': 'Défense de zone',
            'fr-fr': 'Défense de zone',
            'it': 'Zona splat',
            'ja': 'ガチエリア',
            'nl': 'Spetterzone',
            'ru': 'Бой за зоны'
          },
          'multiline': {
            'de': 'Herrschaft',
            'en': 'Splat\nZones',
            'es-419': 'Pintazonas',
            'es-es': 'Pintazonas',
            'fr-ca': 'Défense\nde zone',
            'fr-fr': 'Défense\nde zone',
            'it': 'Zona\nsplat',
            'ja': 'ガチ\nエリア',
            'nl': 'Spetter-\nzone',
            'ru': 'Бой за\nзоны'
          }
        },
        {
          'key': 'tower_control',
          'localization': {
            'de': 'Turm-Kommando',
            'en': 'Tower Control',
            'es-419': 'Torreón',
            'es-es': 'Torre',
            'fr-ca': 'Expédition risquée',
            'fr-fr': 'Expédition risquée',
            'it': 'Torre mobile',
            'ja': 'ガチヤグラ',
            'nl': 'Torentwist',
            'ru': 'Бой за башню'
          },
          'multiline': {
            'de': 'Turm-\nKommando',
            'en': 'Tower\nControl',
            'es-419': 'Torreón',
            'es-es': 'Torre',
            'fr-ca': 'Expédition\nrisquée',
            'fr-fr': 'Expédition\nrisquée',
            'it': 'Torre\nmobile',
            'ja': 'ガチ\nヤグラ',
            'nl': 'Toren-\ntwist',
            'ru': 'Бой за\nбашню'
          }
        },
        {
          'key': 'clam_blitz',
          'localization': {
            'de': 'Turm-Kommando',
            'en': 'Tower Control',
            'es-419': 'Torreón',
            'es-es': 'Torre',
            'fr-ca': 'Expédition risquée',
            'fr-fr': 'Expédition risquée',
            'it': 'Torre mobile',
            'ja': 'ガチアサリ',
            'nl': 'Torentwist',
            'ru': 'Бой за башню'
          },
          'multiline': {
            'de': 'Turm-\nKommando',
            'en': 'Tower\nControl',
            'es-419': 'Torreón',
            'es-es': 'Torre',
            'fr-ca': 'Expédition\nrisquée',
            'fr-fr': 'Expédition\nrisquée',
            'it': 'Torre\nmobile',
            'ja': 'ガチ\nアサリ',
            'nl': 'Toren-\ntwist',
            'ru': 'Бой за\nбашню'
          }
        }
      ]
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    splandom_rule () {
      const inputRules = document.querySelectorAll('.rules input[type=checkbox]')
      const uncheckedRules = [].filter.call(inputRules, function (elm) {
        return !elm.checked
      })

      const i = Math.floor(Math.random() * (uncheckedRules.length - 1))
      this.result_rule = uncheckedRules[i].value
      TweenMax.fromTo('#result_rule', 0.5,
        { fontSize: 0 },
        { fontSize: '6rem' }
      )
    },
    splandom_stage () {
      const inputStages = document.querySelectorAll('.stages input[type=checkbox]')
      const uncheckedStages = [].filter.call(inputStages, function (elm) {
        return !elm.checked
      })
      const i = Math.floor(Math.random() * (this.stages.length - 1))
      this.result_stage = uncheckedStages[i].value
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
  .result
    color: $primary
    text-shadow: $white 2px 2px

.stage
  .result
    color: $secondary
    text-shadow: $white 2px 2px
</style>
