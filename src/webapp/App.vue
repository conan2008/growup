<template>
    <div id="app">
        <h4>喂，动物园吗？🐱</h4>
        <nav>
            <ul>
                <ol><router-link to="/home" exact>一条小蛇🐍</router-link></ol>
                <ol><router-link to="/index">一只小绵羊🐑</router-link></ol>
                <ol><router-link to="/item">一个大灰狼🐺</router-link></ol>
            </ul>
        </nav>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style>
ul > ol {
  font-size: 28px;
  color: darksalmon;
}
</style>


