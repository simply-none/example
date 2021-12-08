function A () {
  this.a = ['a']
}

A.prototype.getA = function () {
  return this.a
}

function B () {
  // 为了避免继承中，引用值共用的问题，可以在构造函数中调用父类构造函数并绑定子类的this（盗用构造函数），而不是直接对原型赋值
  // 即：每个实例都会运行父类构造函数的初始化方法，优点是可以通过子类向父类进行传参
  // A.call(this)
  // 通过这样设置，每个实例的a属性都是不一样的

  // 使用盗用构造函数，因为是仅将父类的实例属性移动到了子类中，所以原型还是未改变的，b的原型还是B.prototype

  // 为确保父类构造函数不掩盖子类的属性，所以需要在调用父类之后再给子类赋值（难怪class中，super必须写在第一行）
  this.b = 'b'
}

// b的原型继承a的实例
// B.prototype = new A()
// 由于：a = new A()
// 所以：a.a = 'a'
// 因为：B.prototype = new A()
// 所以a属性，也换到了B.prototype中，
// 即B.prototype.a = 'a'

// 若子类想增加父类没有的方法，或覆盖重写父类的方法，必须在原型继承之后，将该方法添加到子类原型上
// 若这行在继承的前面，则不会有效，执行时会报错：b.getB is not a function
B.prototype.getB = function () {
  return this.b
}

B.prototype.getA = function () {
  return this.a + ' from B!'
}

// 创建b的实例
b = new B()
b1 = new B()

// 因为继承的关系，a属性被添加到了B.prototype中，所以B的所有实例均会共享属性a
// 所以
console.log('判断a属性是否在原型上：', b.a === b1.a)

console.log(b.getA(), b.getB())

// 原型链判定
// instanceof：用于判断左侧值是否是右侧构造函数的实例（包括原型链上的构造函数）
console.log(b instanceof B, b instanceof A, b instanceof Object)
// isPrototypeOf：用于判断左侧对象是否是右侧对象原型链上的某个原型
console.log(B.prototype.isPrototypeOf(b), A.prototype.isPrototypeOf(b), Object.prototype.isPrototypeOf(b))