'use strict'
const alfy = require('alfy')
const R = require('ramda')

const q = alfy.input

const queryURL = (query) => `https://search.cocoapods.org/api/v1/pods.picky.hash.json?query=${query}&ids=10&offset=0&sort=quality`

const getPods = R.compose(
  R.nth(5),
  R.head,
  R.prop('allocations')
)

const podStanza = pod => `pod '${pod.id}'`
const podPage = pod => `https://cocoapods.org/pods/${pod.id}`

const mapToCell = pods => pods.map(pod => ({
  title: `${pod.id} (${pod.version})`,
  subtitle: pod.summary,
  arg: podPage(pod),
  mods: {
    alt: {
      arg: pod.link,
      subtitle: `Open Repo: ${pod.link}`
    }
  },
  text: {
    copy: podStanza(pod)
  }
}))

const noItemCell = q => [{
  title: 'No Pods Found',
  subtitle: 'Open CocoaPods Search',
  arg: `https://cocoapods.org/?q=${q}`
}]

const isNotEmpty = R.compose(R.not, R.isEmpty)

const displayCells = R.ifElse(
  isNotEmpty,
  mapToCell,
  R.always(noItemCell(q))
)

alfy
  .fetch(queryURL(q))
  .then(getPods)
  .then(displayCells)
  .then(alfy.output)
  .catch(error => {
    alfy.output(noItemCell(q))
  })
