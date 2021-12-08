// 原型式继承
function object (o) {
  function F () {}
  F.prototype = o
  return new F()
}

// 寄生式组合继承：引用类型继承的最佳模式
function inheritPrototype (subType, superType) {
  // 返回一个superType的副本，因为两者的原型都是引用的同一个
  const prototype = object(superType.prototype)
  // 构造函数指向子类
  prototype.constructor = subType
  // 子类的原型指向superType的副本
  subType.prototype =prototype
}

function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue']
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (name, age) {
  SubType.call(this, name)
  this.age = age
}

inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function () {
  console.log(this.age)
}

const sub = new SuperType()
sub.colors.push('a')
console.log(sub.name, sub.colors)
// undefined [ 'red', 'blue', 'a' ]

const sub2 = new SuperType()
sub2.colors.push('b')
console.log(sub2.name, sub2.colors)
// undefined [ 'red', 'blue', 'b' ]