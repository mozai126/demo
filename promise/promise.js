  class Promise2 {
  state = 'pending'
  succeed = null
  fail = null
   
  resolve(result){
  setTimeout(() => {
    this.state ='fulfilled'
    this.succeed(result)
  })
}

  reject(reason){
  setTimeout(() => {
    this.state = 'rejected'
    this.fail(reason)
  })
}

  constructor(fn){
  fn(this.resolve.bind(this),this.reject.bind(this))
 }
  then(succeed,fail){
  this.succeed =succeed
  this.fail = fail
}
}


const getWeather = city =>{
  return new Promise2((resolve,reject) => {
    let xhr =new XMLHttpRequest()
    let url = 'http://rap2api.taobao.org/app/mock/244238/weather?city=' + city
    xhr.open('GET',url,true)
    xhr.onload = () => resolve( JSON.parse(xhr.responseText) )
    xhr.onerror = () => reject('接口异常')
    xhr.send()
  })
}

getWeather('北京').then(data => {
  console.log(data)
})
