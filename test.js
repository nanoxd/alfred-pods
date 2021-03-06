import test from 'ava'
import alfyTest from 'alfy-test'

test('Empty Results', async t => {
  const alfy = alfyTest()
  const query = 'REDFASFDLAKJ;FAS'
  const result = await alfy(query)

  t.deepEqual(result, [
    {
      title: 'No Pods Found',
      subtitle: 'Open CocoaPods Search',
      arg: `https://cocoapods.org/?q=${query}`
    }
  ])
})

test('Valid Results', async t => {
  const alfy = alfyTest()
  const query = 'Alamofire'
  const result = await alfy(query)

  const alamofire = result[0]

  t.snapshot(alamofire)
})
