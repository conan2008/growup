<template>
  <div>
    <div class="item">下面是获取的异步数据</div>

    <div v-for="user in users">
      <p class="name">{{user.name}}</p>
      <div class="desr">{{ user.desr }}</div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";

const fetchInitialData = ({ store, route }) => {
  console.log("获取的路由数据", route.params.id);
  return store.dispatch(`getUsers`);
};
export default {
  asyncData: fetchInitialData,
  computed: {
    ...mapGetters({
      users: "getUsers"
    })
  },
  mounted() {
    fetchInitialData({ store: this.$store, route: this.$route });
  }
};
</script>
<style>
:root {
  --mainColor: yellowgreen;
  --nameColor: orange;
  --desrColor: #999999;
}
.item {
  color: var(--mainColor);
}

.name {
  color: var(--nameColor);
}

.desr {
  color: var(--desrColor);
}
</style>
