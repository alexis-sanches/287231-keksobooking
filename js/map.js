var announceArr = [{
  'author': {
    'avatar': 'img/avatars/user{{01}}.png'
  },

  'offer': {
    'title': 'Большая уютная квартира',
    'address': '{{location.x}}, {{location.y}}',
    'price': Math.floor(Math.random() * 999000 + 1000),
    'type': 'flat',
    'rooms': Math.floor(Math.random() * 4 + 1),
    'guests': Math.floor(Math.random() * 9 + 1),
    'checkin': '13:00',
    'checkout': '12:00',
    'features': массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
    'description': '',
    'photos': []
  },

  'location': {
    'x': Math.floor(Math.random() * 600 - 300),
    'y': Math.floor(Math.random() * 400 - 100)
  }
},
]
