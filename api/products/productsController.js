module.exports.name = 'productsController'
module.exports.dependencies = ['router', 'searchProducts', 'getProduct','getFive']
module.exports.factory = function (
  router,
  { searchProducts, bindToManyProducts},
  { getProduct, bindToProduct },
  {getFive, bindToManyProductss}) 
  {
  router.get('/products', function (req, res) {
    console.log('search many products')
    Promise.resolve(req.query.q)
      .then(query => new Promise(searchProducts(query)))
      .then(docs => new Promise(bindToManyProducts(docs)))
      .then(products => {
        res.send(products)
      }).catch(err => {
        console.log(err)
        res.status(400).send({ messages: [err.message] })
      })
  })

  router.get('/products/:uid', function (req, res) {
    console.log('search a product')
    Promise.resolve(req.params.uid)
      .then(query => new Promise(getProduct(query)))
      .then(docs => new Promise(bindToProduct(docs)))
      .then(product => {
        res.send(product)
      }).catch(err => {
        console.log(err)
        res.status(400).send({ messages: [err.message] })
      })
  })
  
    router.get('/top', function (req,res) {
    Promise.resolve(req)
      .then(query => new Promise(getFive(query)))
      .then(docs => new Promise(bindToManyProductss(docs)))
      .then(products => {
        res.send(products)
      }).catch(err => {
        console.log(err)
        res.status(400).send({ messages: [err.message] })
      })
  })

  return router
}
