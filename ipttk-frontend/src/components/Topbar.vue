<template>
  <div class="topbar">
    <h1>
    <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.51 45.56">
      <path fill="#fff" d="M41.2 29.81l2.56-14.2L31 10.02l-4.22 1.74a9.37 9.37 0 0 1-.67 1.8l3.2-1.32-2.01 13.79.03.74-9.57.94-.86 1.5 10.5-1.03.55 12.34 1.4-.06-.56-12.42.13-.02 10.81 1.95.04-.2.92 13.9-11.2-3.21-14.9 2.03-.12-.03 1.98-12.53v-.08l-.03-.47-1.63-3.69.14 2.29-.33.03-10.43-2.18.09-.51-.95-12.8 7.2 3.5-.56-1.25a9.63 9.63 0 0 1-.5-.82l-7.72-3.75 1.11 15.05-.05.3h-.03L2.5 26.9l.07.01L.23 40.45l14.3 3.46 14.87-2.03 12.84 3.67zM28.98 26.6l-.25.02-.02-.53 2.11-14.49.17-.07 11.18 4.93-2.2 12.12zM13.1 42.12L1.83 39.4l2.11-12.18 10.6 2.21.48-.05.03.48zm3.48-12.38l-.16-.37v-.13l.48-.05zm-5.47-16.12l5.56 12.57 6.77-11.79a8.04 8.04 0 1 0-12.3-.78zm6.77-9.7a4.95 4.95 0 1 1-5.2 4.68 4.95 4.95 0 0 1 5.2-4.68z" data-name="Path 1"/>
    </svg> <span>iPTTK {{ title }}</span></h1>
    <div class="user" v-if="isAuthorized">
      <img :src="userPhoto" alt="">
      <p class="user-name">Witaj, {{ userName }}!</p>
      <router-link to="/logout">[wyloguj]</router-link>
    </div>
    <div class="user" v-else>
      <router-link to="/login">Zaloguj</router-link>
    </div>
  </div>
</template>

<script>
import { USER_TYPES } from '@/consts'
const placeholderImage = 'data:image/png;base64,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'

export default {
  name: 'topbar',
  props: {
    userName: String,
    userType: Number,
    isAuthorized: Boolean,
    userPhoto: {
      type: String,
      default: placeholderImage
    }
  },
  computed: {
    title () {
      if (this.userType === USER_TYPES.leader) {
        return ' - panel przodownika'
      } else if (this.userType === USER_TYPES.worker) {
        return ' - panel pracownika'
      }
      return ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .topbar {
    position: fixed;
    background: var(--primary-color);
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: var(--white);
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08);
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }

  h1 span {
    padding: 10px 10px 0;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .user img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border-radius: 50%;
  }

  .user-name {
    margin: 0 5px;
  }

  a {
    color: var(--white);
  }

  .logo {
    height: 60%;
  }
</style>
