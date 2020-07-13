<template>
    <div>
        <h1>IndexPlan- test:</h1>
        <hr />
        <hr />
        <button v-on:click="test1()">[ test1 ]</button>
        <hr />
        plan : 
        <ul v-for='category in categorys' v-bind:key="category.name">
            <li>
                {{ category.name }}
                <ul>
                    <li v-for="(animal , index) in category.animals" v-bind:key="index">{{ animal }}</li>
                </ul>
            </li>
        </ul>
        <hr />
        <ul v-for="week in weeks" v-bind:key="week.no">
            <li>
                {{ week.no }}
                {{ week.weekItem[0].day }}<br />
                {{ week.weekItem[1].day }}<br />
                {{ week.weekItem[2].day }}<br />
                {{ week.weekItem[3].day }}<br />
                {{ week.weekItem[4].day }}<br />
                {{ week.weekItem[5].day }}<br />
                {{ week.weekItem[6].day }}<br />
            </li>
        </ul>

    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibPlan from '@/libs/LibPlan';
import moment from 'moment'

var db = null;
//
export default {
    mixins:[Mixin],
    created() {
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(
        this.sysConst.DEXIE_DB_STORE ); 
        //
        var dt = moment()
        this.weeks = LibPlan.get_week_items( dt )              
console.log( this.weeks )
    },
    data() {
        return {
//            user : [],
            weeks :[],
            object: {
                title: 'How to do lists in Vue',
                author: 'Jane Doe',
                publishedAt: '2016-04-10'
            },
            items: [
                { message: 'Foo' },
                { message: 'Bar' }
            ],                         
            categorys:[
                {name:'哺乳類', animals:['人', 'ねこ', 'さる', 'パンダ']},
                {name:'鳥類', animals: ['ニワトリ', 'アヒル', 'カラス', 'すずめ']},
                {name:'爬虫類', animals: ['わに', 'トカゲ', 'へび', 'かめ']}
            ],

        }
    },
    methods: {
        test1(){
console.log("# test1=")
            LibPlan.test1()
        },
        getTasks(){
        },
        get_items(){
            db.friends
                .toArray()
                .then(function (items ) {
                    console.log( items );
                });
        },

    }
}
</script>

