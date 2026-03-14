import { load } from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE_URL = 'https://npb.jp/preseason/2026/schedule_detail.html'
const OUTPUT_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/data/games-2026-preseason.json',
)

const TEAM_NAME_MAP = {
  楽天: '東北楽天ゴールデンイーグルス',
  ロッテ: '千葉ロッテマリーンズ',
  西武: '埼玉西武ライオンズ',
  オリックス: 'オリックス・バファローズ',
  ソフトバンク: '福岡ソフトバンクホークス',
  日本ハム: '北海道日本ハムファイターズ',
  ヤクルト: '東京ヤクルトスワローズ',
  巨人: '読売ジャイアンツ',
  阪神: '阪神タイガース',
  広島: '広島東洋カープ',
  中日: '中日ドラゴンズ',
  DeNA: '横浜DeNAベイスターズ',
}

const TEAM_CODE_MAP = {
  楽天: 'eagles',
  ロッテ: 'marines',
  西武: 'lions',
  オリックス: 'buffaloes',
  ソフトバンク: 'hawks',
  日本ハム: 'fighters',
  ヤクルト: 'swallows',
  巨人: 'giants',
  阪神: 'tigers',
  広島: 'carp',
  中日: 'dragons',
  DeNA: 'baystars',
}

const WEEKDAY_MAP = ['日', '月', '火', '水', '木', '金', '土']

function normalizeText(value) {
  return value.replace(/\u3000/g, '').replace(/\s+/g, ' ').trim()
}

function toIsoDate(dateLabel) {
  const matched = dateLabel.match(/(\d{1,2})\/(\d{1,2})/u)

  if (!matched) {
    throw new Error(`日付の解析に失敗しました: ${dateLabel}`)
  }

  const [, month, day] = matched
  return `2026-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function getWeekday(date) {
  return WEEKDAY_MAP[new Date(`${date}T00:00:00+09:00`).getDay()]
}

function parseScore(value) {
  const normalized = normalizeText(value)
  return /^\d+$/u.test(normalized) ? Number(normalized) : null
}

function getStatus(score1, score2, note) {
  if (note.includes('中止')) {
    return '中止'
  }

  if (score1 !== null && score2 !== null) {
    return '終了'
  }

  return '試合前'
}

function getResult(rakutenScore, opponentScore, status) {
  if (status !== '終了' || rakutenScore === null || opponentScore === null) {
    return null
  }

  if (rakutenScore === opponentScore) {
    return 'Draw'
  }

  return rakutenScore > opponentScore ? 'Win' : 'Lose'
}

function buildGameId(date, opponentTeam, href, index) {
  if (href) {
    return href.split('/').filter(Boolean).at(-1) ?? `${date}-${index}`
  }

  const opponentCode = TEAM_CODE_MAP[opponentTeam] ?? `game-${index}`
  return `${date}-${opponentCode}`
}

async function main() {
  const response = await fetch(SOURCE_URL)

  if (!response.ok) {
    throw new Error(`データ取得に失敗しました: ${response.status}`)
  }

  const html = await response.text()
  const $ = load(html)
  const games = []
  let currentDateLabel = ''

  $('table tbody tr').each((index, row) => {
    const $row = $(row)
    const dateCell = $row.find('th').first()

    if (dateCell.length > 0) {
      currentDateLabel = normalizeText(dateCell.text())
    }

    const team1 = normalizeText($row.find('.team1').text())
    const team2 = normalizeText($row.find('.team2').text())

    if (team1 !== '楽天' && team2 !== '楽天') {
      return
    }

    const isRakutenFirst = team1 === '楽天'
    const opponentTeam = isRakutenFirst ? team2 : team1
    const date = toIsoDate(currentDateLabel)
    const score1 = parseScore($row.find('.score1').text())
    const score2 = parseScore($row.find('.score2').text())
    const rakutenScore = isRakutenFirst ? score1 : score2
    const opponentScore = isRakutenFirst ? score2 : score1
    const note = normalizeText($row.find('.comment').text())
    const status = getStatus(score1, score2, note)
    const href = $row.find('a').attr('href')

    games.push({
      id: buildGameId(date, opponentTeam, href, index),
      date,
      weekday: getWeekday(date),
      category: 'オープン戦',
      opponent: TEAM_NAME_MAP[opponentTeam] ?? opponentTeam,
      venue: normalizeText($row.find('.place').text()),
      homeAway: isRakutenFirst ? 'ホーム' : 'ビジター',
      startTime: normalizeText($row.find('.time').text()),
      status,
      rakutenScore,
      opponentScore,
      result: getResult(rakutenScore, opponentScore, status),
      note,
      sourceUrl: href ? new URL(href, SOURCE_URL).toString() : SOURCE_URL,
    })
  })

  const payload = {
    season: '2026',
    updatedAt: new Date().toISOString(),
    games,
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`Updated ${games.length} games`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
