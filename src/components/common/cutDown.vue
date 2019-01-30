<style lang="scss" rel="stylesheet/scss">

</style>
<template>
  <div>
    <p class="timer-title" v-show="timeStatus=='1'">距离结束</p>
    <p class="timer" v-show="timeStatus=='0'">{{day}}</p>
    <p :class="timeStatus=='1'?'timer':'timer-title'">{{time}}</p>
  </div>
</template>


<script>
  export default{
    data () {
      return {
        time: '',
        day: '',
        flag: false,
        timer:null
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        if (this.flag == true) {
          clearInterval(this.timer)
        }
        this.timeDown()
      }, 500)
    },
    props: {
      endTime: {type: String},
      timeStatus: {type: String},
    },
    methods: {
      timeDown () {
        const endTime = new Date(this.endTime);
        const nowTime = new Date();
        let day = endTime.getUTCDate();
        let nowDay=nowTime.getUTCDate();
        let endDay=day-nowDay;//计算距离结束的天数

        let startTime=this.formate(endTime.getHours()+day*24)+":"+this.formate(endTime.getMinutes());
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)

        let d = parseInt(leftTime / (24 * 60 * 60))
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24)+d*24);
        let m = this.formate(parseInt(leftTime / 60 % 60))
        let s = this.formate(parseInt(leftTime % 60))

        if (leftTime <= 0) {
          if (this.timeStatus == '0') {
            this.flag = true;
            this.time = `倒计时结束`;
            this.day = '';
            this.$emit('second-end');
          } else {
            this.flag = true;
            this.time = `倒计时结束`;
            this.day = '';
            this.$emit('second-end-over');
            return;
          }
        }
        if (d > 0) {
          this.time = `${h}:${m}:${s}`;
          // this.time = `${d}天${h}:${m}:${s}`;
        } else {
          this.time = `${h}:${m}:${s}`;
        }
        if(endDay>0){
          this.day = `${startTime}开抢`;
          // this.day = `${day}日${startTime}开抢`;
          this.$emit('second-start',this.day);
        }else {
          this.day = `${startTime}开抢`;
          // this.day = `今日${startTime}开抢`;
          this.$emit('second-start',this.day);
        }

      },
      formate (time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      }
    }
  }
</script>
