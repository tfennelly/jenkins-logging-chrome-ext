// ./play/index.js
import { play } from 'vue-play'
import MyButton from './MyButton.vue'

play('Button')
    .add('with text', h => h(MyButton, 'hello'))
    .add('with emoji', h => h(MyButton, '💫'))