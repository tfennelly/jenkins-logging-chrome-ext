import Vue from 'vue'
import Page from './infra/Page.vue'
import { play } from 'vue-play'
import MyButton from './MyButton.vue'

Vue.component('Page', Page);

play('Button')
    .add('with text', h => h(MyButton, 'hello'))
    .add('with emoji', h => h(MyButton, '💫'))